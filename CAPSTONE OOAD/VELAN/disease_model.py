import hashlib
import io
import math
import warnings
from functools import lru_cache
from pathlib import Path

from PIL import Image, ImageOps, UnidentifiedImageError


MAX_IMAGE_BYTES = 5 * 1024 * 1024
MAX_IMAGE_PIXELS = 20_000_000
Image.MAX_IMAGE_PIXELS = MAX_IMAGE_PIXELS

MODEL_ID = "onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX"
MODEL_REVISION = "95110a1ffcc188d1b5a36524d52e303e40c2403d"
MODEL_FILENAME = "model.onnx"
MODEL_SHA256 = "c209f96f0a87a265b0ff6765c2e84d48038a7d8b8692d7629445b4513c344eb7"

LABELS = (
    "Apple Scab",
    "Apple with Black Rot",
    "Cedar Apple Rust",
    "Healthy Apple",
    "Healthy Blueberry Plant",
    "Cherry with Powdery Mildew",
    "Healthy Cherry Plant",
    "Corn (Maize) with Cercospora and Gray Leaf Spot",
    "Corn (Maize) with Common Rust",
    "Corn (Maize) with Northern Leaf Blight",
    "Healthy Corn (Maize) Plant",
    "Grape with Black Rot",
    "Grape with Esca (Black Measles)",
    "Grape with Isariopsis Leaf Spot",
    "Healthy Grape Plant",
    "Orange with Citrus Greening",
    "Peach with Bacterial Spot",
    "Healthy Peach Plant",
    "Bell Pepper with Bacterial Spot",
    "Healthy Bell Pepper Plant",
    "Potato with Early Blight",
    "Potato with Late Blight",
    "Healthy Potato Plant",
    "Healthy Raspberry Plant",
    "Healthy Soybean Plant",
    "Squash with Powdery Mildew",
    "Strawberry with Leaf Scorch",
    "Healthy Strawberry Plant",
    "Tomato with Bacterial Spot",
    "Tomato with Early Blight",
    "Tomato with Late Blight",
    "Tomato with Leaf Mold",
    "Tomato with Septoria Leaf Spot",
    "Tomato with Spider Mites or Two-spotted Spider Mite",
    "Tomato with Target Spot",
    "Tomato Yellow Leaf Curl Virus",
    "Tomato Mosaic Virus",
    "Healthy Tomato Plant",
)

LABEL_CROPS = (
    "Apple", "Apple", "Apple", "Apple",
    "Blueberry",
    "Cherry", "Cherry",
    "Corn", "Corn", "Corn", "Corn",
    "Grape", "Grape", "Grape", "Grape",
    "Orange",
    "Peach", "Peach",
    "Bell Pepper", "Bell Pepper",
    "Potato", "Potato", "Potato",
    "Raspberry",
    "Soybean",
    "Squash",
    "Strawberry", "Strawberry",
    "Tomato", "Tomato", "Tomato", "Tomato", "Tomato",
    "Tomato", "Tomato", "Tomato", "Tomato", "Tomato",
)
MODEL_CROPS = tuple(dict.fromkeys(LABEL_CROPS))


class InvalidCropImage(ValueError):
    pass


def crop_for_label(label):
    try:
        return LABEL_CROPS[LABELS.index(label)]
    except ValueError:
        return None


def decode_crop_image(data):
    if not data:
        raise InvalidCropImage("empty")
    if len(data) > MAX_IMAGE_BYTES:
        raise InvalidCropImage("too_large")

    try:
        with warnings.catch_warnings():
            warnings.simplefilter("error", Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(data)) as source:
                if source.format not in {"JPEG", "PNG", "WEBP"}:
                    raise InvalidCropImage("unsupported")
                source.verify()
            with Image.open(io.BytesIO(data)) as source:
                source.load()
                image = ImageOps.exif_transpose(source).convert("RGB")
    except InvalidCropImage:
        raise
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError, Image.DecompressionBombWarning) as error:
        raise InvalidCropImage("corrupt") from error

    if image.width * image.height > MAX_IMAGE_PIXELS:
        raise InvalidCropImage("too_large")
    if min(image.size) < 64:
        raise InvalidCropImage("too_small")

    if max(image.size) > 1600:
        scale = 1600 / max(image.size)
        size = (max(1, round(image.width * scale)), max(1, round(image.height * scale)))
        image = image.resize(size, Image.Resampling.LANCZOS)

    saved = io.BytesIO()
    image.save(saved, format="JPEG", quality=88, optimize=True)
    return image, saved.getvalue()


def _model_image(image):
    scale = 256 / min(image.size)
    size = (round(image.width * scale), round(image.height * scale))
    resized = image.resize(size, Image.Resampling.BILINEAR)
    left = round((resized.width - 224) / 2)
    top = round((resized.height - 224) / 2)
    cropped = resized.crop((left, top, left + 224, top + 224))

    import numpy as np

    values = np.asarray(cropped, dtype=np.float32) / 255.0
    values = (values - 0.5) / 0.5
    return np.transpose(values, (2, 0, 1))[None, ...]


@lru_cache(maxsize=2)
def _session_for(model_path):
    import onnxruntime

    return onnxruntime.InferenceSession(
        model_path,
        providers=["CPUExecutionProvider"],
    )


def predict(image, model_path):
    model_path = Path(model_path)
    if not model_path.is_file():
        return None
    digest = hashlib.sha256(model_path.read_bytes()).hexdigest()
    if digest != MODEL_SHA256:
        raise RuntimeError("The configured model file does not match the pinned model revision.")

    import numpy as np

    session = _session_for(str(model_path.resolve()))
    input_name = session.get_inputs()[0].name
    outputs = session.run(None, {input_name: _model_image(image)})
    logits = np.asarray(outputs[0], dtype=np.float64).reshape(-1)
    if logits.size != len(LABELS) or not np.isfinite(logits).all():
        raise RuntimeError("The configured model returned an invalid output.")

    logits -= logits.max()
    probabilities = np.exp(logits)
    probabilities /= probabilities.sum()
    best_index = int(probabilities.argmax())
    confidence = float(probabilities[best_index])
    if not math.isfinite(confidence):
        raise RuntimeError("The configured model returned an invalid score.")
    return {
        "label": LABELS[best_index],
        "detected_crop": LABEL_CROPS[best_index],
        "confidence": confidence,
        "model_id": MODEL_ID,
    }

import hmac
import hashlib
import io
import os
import re
import secrets
import sqlite3
import urllib.error
import urllib.request
import uuid
from pathlib import Path

import click
from flask import Flask, abort, flash, get_flashed_messages, jsonify, redirect, render_template, request, send_file, session, url_for
from PIL import Image
from werkzeug.security import check_password_hash, generate_password_hash

from disease_model import (
    MODEL_FILENAME,
    MODEL_ID,
    MODEL_REVISION,
    MODEL_SHA256,
    InvalidCropImage,
    MODEL_CROPS,
    crop_for_label,
    decode_crop_image,
    predict,
)


ROOT = Path(__file__).resolve().parent
INSTANCE = ROOT / "instance"
DATABASE = Path(os.environ.get("VELAN_DATABASE", INSTANCE / "velan.db"))
REPORT_IMAGES = Path(
    os.environ.get("VELAN_REPORT_IMAGES", INSTANCE / "report_images")
)
MODEL_PATH = Path(os.environ.get("VELAN_MODEL_PATH", INSTANCE / "models" / "model.onnx"))
INSTANCE.mkdir(exist_ok=True)
DATABASE.parent.mkdir(parents=True, exist_ok=True)
REPORT_IMAGES.mkdir(exist_ok=True)

ADVISORY_GUIDE = {
    "Tea": {
        "symptoms": "Tea leaves may show yellowing, spotting, and weak growth under stress. Watch for leaf distortion, curling, and sudden changes in canopy colour.",
        "causes": "Stress from moisture imbalance, poor air movement, nutrient shortage, and pest pressure can weaken leaf health and encourage disease.",
        "organic": "Prune affected leaves promptly, maintain good shade balance, improve drainage, and reduce overlapping foliage. Remove diseased debris from the field and clean tools between plots.",
        "chemical": "Any chemical treatment must match the crop and local product registration. Follow the label for target pests, protective equipment, pre-harvest intervals, and re-entry requirements.",
        "prevention": "Keep the plantation well spaced, monitor leaf health regularly, and avoid excess irrigation or water pooling around the root zone.",
        "care": "Use balanced nutrition and record field changes so local extension staff can guide the next response.",
    },
    "Tomato": {
        "symptoms": "Leaf lesions, yellowing, fruit spotting, wilting, or a sudden collapse of older foliage may appear depending on the disease.",
        "causes": "Wet weather, dense foliage, poor ventilation, contaminated tools, and disease pressure can create conditions for infection and spread.",
        "organic": "Remove heavily affected leaves, improve airflow, avoid overhead watering late in the day, and keep crop debris away from healthy plants.",
        "chemical": "Only use registered crop-protection products for the target disease and follow the local label instructions, PPE, re-entry, and pre-harvest intervals.",
        "prevention": "Mulch or stake plants carefully, rotate crops when feasible, and inspect fields regularly for early symptoms.",
        "care": "Maintain balanced feeding and monitor fruit quality so treatment decisions are based on repeat observations rather than a single spot.",
    },
    "Rice": {
        "symptoms": "Sheath, leaf, or panicle symptoms can include lesions, yellowing, reduced tillering, and uneven grain formation.",
        "causes": "Humidity, high plant density, poor drainage, and field stress can favor fungal and bacterial outbreaks.",
        "organic": "Keep field water managed well, remove heavily infected residue, and reduce dense canopy conditions through spacing and timely weeding.",
        "chemical": "Follow the local crop label, target disease, and registered product timings. Never treat without the product label and local extension guidance.",
        "prevention": "Use healthy seeds, maintain proper field drainage, and inspect standing water and crop canopy regularly.",
        "care": "Check fertility and irrigation schedules so plant stress does not mask early disease symptoms.",
    },
    "Potato": {
        "symptoms": "Leaf spots, yellowing, wilting, and lesions on stems or leaf tissue often appear before decline in crop condition.",
        "causes": "Cool, humid weather, poor air movement, and infected residue can increase the spread of foliar diseases.",
        "organic": "Remove infected foliage, avoid moving soil and plant material between plots, and keep rows open for airflow.",
        "chemical": "Any fungicidal decision must follow product registration and crop labels, plus protective equipment and timing requirements.",
        "prevention": "Use clean seed, rotate fields, and monitor the crop frequently during periods of high humidity.",
        "care": "Keep hilling and nutrient balance consistent so plants remain strong and stress is reduced.",
    },
    "Cotton": {
        "symptoms": "Leaf damage, fruiting-structure problems, yellowing, or irregular growth may occur with disease or stress.",
        "causes": "Wet weather, nutrient imbalance, pest pressure, and poor canopy management can worsen disease or stress symptoms.",
        "organic": "Improve field hygiene, avoid excess moisture stress, and remove severely affected plants or crop residue from the affected zone.",
        "chemical": "Apply only registered products and use the label, local agronomic advice, and safe handling instructions before treatment.",
        "prevention": "Keep fields well monitored, avoid dense canopy conditions, and manage irrigation and nutrients consistently.",
        "care": "Regular scouting helps catch issues early and supports timely local extension decisions.",
    },
}


def load_secret_key():
    configured_key = os.environ.get("VELAN_SECRET_KEY")
    if configured_key:
        return configured_key

    secret_file = INSTANCE / "secret_key"
    if secret_file.exists():
        return secret_file.read_text(encoding="utf-8").strip()

    secret = secrets.token_urlsafe(48)
    secret_file.write_text(secret, encoding="utf-8")
    return secret


app = Flask(
    __name__,
    static_folder=str(ROOT / "assets"),
    static_url_path="/assets",
    template_folder=str(ROOT / "templates"),
)
app.config.update(
    SECRET_KEY=load_secret_key(),
    DATABASE=str(DATABASE),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=os.environ.get("VELAN_HTTPS", "").lower() == "true",
    MAX_CONTENT_LENGTH=6 * 1024 * 1024,
    MODEL_PATH=str(MODEL_PATH),
    REPORT_IMAGES=str(REPORT_IMAGES),
)

SCHEMA = """
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL COLLATE NOCASE UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'farmer' CHECK (role IN ('farmer', 'expert')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farmer_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    mobile TEXT NOT NULL UNIQUE,
    village TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS disease_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmer_id INTEGER NOT NULL REFERENCES farmer_profiles(id) ON DELETE CASCADE,
    crop_type TEXT,
    description TEXT,
    image_path TEXT,
    status TEXT NOT NULL DEFAULT 'submitted',
    submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    prediction TEXT,
    confidence REAL,
    model_id TEXT,
    ai_status TEXT NOT NULL DEFAULT 'unavailable',
    expert_response TEXT,
    expert_id INTEGER REFERENCES users(id),
    expert_reviewed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_disease_reports_farmer_id
    ON disease_reports(farmer_id);
"""


def connect_db():
    connection = sqlite3.connect(app.config["DATABASE"])
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("PRAGMA busy_timeout = 5000")
    return connection


def init_db():
    connection = connect_db()
    try:
        connection.executescript(SCHEMA)
        columns = {
            row["name"]
            for row in connection.execute("PRAGMA table_info(disease_reports)")
        }
        additions = {
            "prediction": "TEXT",
            "confidence": "REAL",
            "model_id": "TEXT",
            "ai_status": "TEXT NOT NULL DEFAULT 'unavailable'",
            "expert_response": "TEXT",
            "expert_id": "INTEGER REFERENCES users(id)",
            "expert_reviewed_at": "TEXT",
        }
        for column, definition in additions.items():
            if column not in columns:
                connection.execute(
                    f"ALTER TABLE disease_reports ADD COLUMN {column} {definition}"
                )
        connection.commit()
    finally:
        connection.close()


init_db()


@app.cli.command("create-expert")
@click.option("--email", prompt=True, help="Email address for the expert account.")
def create_expert(email):
    email = email.strip().lower()
    if not valid_email(email):
        raise click.ClickException("Enter a valid email address.")
    password = click.prompt(
        "Expert password",
        hide_input=True,
        confirmation_prompt=True,
    )
    if len(password) < 12 or len(password) > 256:
        raise click.ClickException("Use an expert password between 12 and 256 characters.")

    connection = connect_db()
    try:
        with connection:
            connection.execute(
                "INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'expert')",
                (email, generate_password_hash(password)),
            )
    except sqlite3.IntegrityError as error:
        raise click.ClickException("That email address already has an account.") from error
    finally:
        connection.close()
    click.echo(f"Expert account created for {email}.")


@app.cli.command("download-model")
def download_model():
    click.echo(f"Model: {MODEL_ID}")
    click.echo(f"Revision: {MODEL_REVISION}")
    click.echo("Model card license metadata is 'other'; review the model and dataset terms before continuing.")
    if not click.confirm("Do you have permission to use this model and accept its terms?", default=False):
        raise click.ClickException("Model download cancelled.")

    url = (
        f"https://huggingface.co/{MODEL_ID}/resolve/{MODEL_REVISION}/"
        f"onnx/{MODEL_FILENAME}?download=true"
    )
    model_path = Path(app.config["MODEL_PATH"])
    model_path.parent.mkdir(parents=True, exist_ok=True)
    temporary_path = model_path.with_suffix(model_path.suffix + ".part")
    try:
        with urllib.request.urlopen(url, timeout=60) as response:
            data = response.read(10 * 1024 * 1024 + 1)
        if len(data) > 10 * 1024 * 1024:
            raise click.ClickException("The model file exceeded the expected size limit.")
        if hashlib.sha256(data).hexdigest() != MODEL_SHA256:
            raise click.ClickException("The downloaded model did not match its pinned checksum.")
        temporary_path.write_bytes(data)
        os.replace(temporary_path, model_path)
    except urllib.error.URLError as error:
        temporary_path.unlink(missing_ok=True)
        raise click.ClickException(f"Could not download the model: {error.reason}") from error
    except OSError as error:
        temporary_path.unlink(missing_ok=True)
        raise click.ClickException(f"Could not save the model: {error}") from error
    click.echo(f"Verified model saved to {model_path}.")


def csrf_token():
    token = session.get("_csrf_token")
    if token is None:
        token = secrets.token_urlsafe(32)
        session["_csrf_token"] = token
    return token


def crop_advisory_payload(crop_type, disease_name=None):
    selected_crop = crop_type or "Tomato"
    crop_data = ADVISORY_GUIDE.get(selected_crop, {
        "symptoms": "Symptoms differ by crop and disease. Record the affected plant parts and how the changes are spreading.",
        "causes": "A model label cannot confirm the cause. Disease, pests, weather, and nutrition can produce similar signs.",
        "organic": "Remove severely affected material when appropriate, clean tools between plots, and seek local crop-specific extension guidance.",
        "chemical": "No product or dose is prescribed. Use only locally registered products and follow the label and qualified local advice.",
        "prevention": "Use healthy planting material, field hygiene, regular scouting, and crop-specific practices recommended locally.",
        "care": "Record symptoms and field conditions; confirm the problem with a qualified local agricultural professional before treatment.",
    })
    disease_label = (disease_name or selected_crop).strip()
    disease_summary = "General field monitoring is recommended. Use the actual crop symptoms and local extension advice to confirm the issue."
    if disease_label and disease_label != selected_crop:
        disease_summary = f"The detected disease label is {disease_label}. Treat this as a preliminary screening result and confirm with local agronomic advice before applying any crop protection measure."
    return {
        "crop": selected_crop,
        "disease": disease_label,
        "disclaimer": "This advisory is general educational information, not an expert diagnosis or field-specific treatment plan.",
        "symptoms": crop_data["symptoms"],
        "causes": crop_data["causes"],
        "organic": crop_data["organic"],
        "chemical": crop_data["chemical"],
        "prevention": crop_data["prevention"],
        "care": crop_data["care"],
        "diagnosis_note": disease_summary,
    }


def build_pdf_report(report, image_bytes=None):
    lines = [
        "VELAN AI Disease Report",
        f"Farmer: {report['farmer_name']}",
        f"Email: {report['farmer_email']}",
        f"Crop: {report['crop_type']}",
        f"Submitted: {report['submitted_at']}",
        f"AI status: {report['ai_status']}",
        f"Prediction: {report['prediction'] or 'No AI result'}",
        f"Confidence: {report['confidence'] * 100:.1f}%" if report['confidence'] is not None else "Confidence: Not available",
        f"Expert response: {report['expert_response'] or 'No response yet'}",
        f"Review status: {report['status']}",
        "",
        "General advisory note: AI findings are screening suggestions, not confirmed diagnoses.",
    ]
    if report.get("description"):
        lines.extend(["", "Farmer observation:", report["description"]])
    if report.get("expert_response"):
        lines.extend(["", "Expert advisory:", report["expert_response"]])

    text_objects = []
    y = 760
    for line in lines:
        safe_line = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        text_objects.append(f"BT /F1 12 Tf 50 {y} Td ({safe_line}) Tj ET")
        y -= 18

    pdf = bytearray(b"%PDF-1.4\n%\xE2\xE3\xCF\xD3\n")
    objects = [None]
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> /XObject << /Im0 5 0 R >> >> /Contents 6 0 R >>")
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    content_stream = "\n".join(text_objects).encode("latin-1", "replace")
    if image_bytes:
        try:
            with Image.open(io.BytesIO(image_bytes)) as image:
                width, height = image.size
                if width > 220 or height > 180:
                    scale = min(220 / width, 180 / height)
                    width = max(1, int(round(width * scale)))
                    height = max(1, int(round(height * scale)))
                image_obj = (
                    b"<< /Type /XObject /Subtype /Image /Width "
                    + str(width).encode("ascii")
                    + b" /Height "
                    + str(height).encode("ascii")
                    + b" /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length "
                    + str(len(image_bytes)).encode("ascii")
                    + b" >>\nstream\n"
                    + image_bytes
                    + b"\nendstream"
                )
                objects.append(image_obj)
                content_stream += (
                    f"\nq {width} 0 0 {height} 330 110 cm /Im0 Do Q".encode("latin-1", "replace")
                )
        except Exception:
            objects.append(b"<< /Type /XObject /Subtype /Image /Width 1 /Height 1 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length 1 >>\nstream\n\nendstream")
    else:
        objects.append(b"<< /Type /XObject /Subtype /Image /Width 1 /Height 1 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length 1 >>\nstream\n\nendstream")
    objects.append(b"<< /Length " + str(len(content_stream)).encode("ascii") + b" >>\nstream\n" + content_stream + b"\nendstream")

    offsets = [0]
    for index, obj in enumerate(objects[1:], start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{index} 0 obj\n".encode("ascii"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")
    xref_start = len(pdf)
    pdf.extend(f"xref\n0 {len(objects)}\n".encode("ascii"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    pdf.extend(f"trailer\n<< /Size {len(objects)} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode("ascii"))
    return bytes(pdf)


def validate_csrf():
    supplied = request.form.get("csrf_token", "")
    expected = session.get("_csrf_token", "")
    if not supplied or not expected or not hmac.compare_digest(supplied, expected):
        abort(400, description="The form expired. Reload the page and try again.")


def current_farmer():
    user_id = session.get("user_id")
    if not user_id:
        return None

    connection = connect_db()
    try:
        return connection.execute(
            """
            SELECT users.id AS user_id, users.email, users.created_at,
                   farmer_profiles.id AS farmer_id, farmer_profiles.full_name,
                   farmer_profiles.mobile, farmer_profiles.village,
                   farmer_profiles.district, farmer_profiles.state
            FROM users
            JOIN farmer_profiles ON farmer_profiles.user_id = users.id
            WHERE users.id = ? AND users.role = 'farmer'
            """,
            (user_id,),
        ).fetchone()
    finally:
        connection.close()


def current_expert():
    user_id = session.get("user_id")
    if not user_id:
        return None

    connection = connect_db()
    try:
        return connection.execute(
            "SELECT id, email FROM users WHERE id = ? AND role = 'expert'",
            (user_id,),
        ).fetchone()
    finally:
        connection.close()


def current_state(form_values=None, messages=None):
    farmer = current_farmer()
    user = None
    role = "farmer" if farmer else None
    expert = current_expert() if not farmer else None
    if expert:
        role = "expert"
        user = {"email": expert["email"], "role": "expert"}
    report_count = 0
    if farmer:
        connection = connect_db()
        try:
            report_count = connection.execute(
                "SELECT COUNT(*) FROM disease_reports WHERE farmer_id = ?",
                (farmer["farmer_id"],),
            ).fetchone()[0]
            reports = connection.execute(
                """
                SELECT id, crop_type, prediction, confidence, ai_status, status,
                       submitted_at, expert_reviewed_at
                FROM disease_reports
                WHERE farmer_id = ?
                ORDER BY submitted_at DESC, id DESC
                LIMIT 5
                """,
                (farmer["farmer_id"],),
            ).fetchall()
        finally:
            connection.close()
        user = {
            "name": farmer["full_name"],
            "email": farmer["email"],
            "mobile": farmer["mobile"],
            "village": farmer["village"],
            "district": farmer["district"],
            "state": farmer["state"],
            "member_since": farmer["created_at"][:10],
            "report_count": report_count,
            "reports": [dict(report) for report in reports],
        }

    return {
        "user": user,
        "role": role,
        "csrf_token": csrf_token(),
        "form_values": form_values or {},
        "messages": messages or [],
    }


def render_page(page, title, form_values=None, messages=None, extra_state=None):
    if messages is None:
        messages = [
            {"key": message, "category": category}
            for category, message in get_flashed_messages(with_categories=True)
        ]
    state = current_state(form_values=form_values, messages=messages)
    if extra_state:
        state.update(extra_state)
    return render_template(
        "site.html",
        page=page,
        title=title,
        state=state,
    )


def take_form_values():
    return session.pop("form_values", {})


def add_form_error(message_key, values=None):
    flash(message_key, "error")
    if values:
        session["form_values"] = values


def normalize_mobile(value):
    digits = re.sub(r"\D", "", value)
    if len(digits) == 12 and digits.startswith("91"):
        return digits[2:]
    if len(digits) == 11 and digits.startswith("0"):
        return digits[1:]
    return digits


def valid_email(value):
    return len(value) <= 254 and re.fullmatch(
        r"[^@\s]{1,64}@[^@\s.]+(?:\.[^@\s.]+)+", value
    ) is not None


def validate_farmer_fields(values, include_password=False):
    errors = []
    full_name = values["full_name"]
    mobile = values["mobile"]
    email = values["email"]
    village = values["village"]
    district = values["district"]
    state = values["state"]

    if not 2 <= len(full_name) <= 120:
        errors.append("invalidName")
    if not re.fullmatch(r"\+?[0-9][0-9\s()-]*", mobile) or not 8 <= len(normalize_mobile(mobile)) <= 15:
        errors.append("invalidMobile")
    if not valid_email(email):
        errors.append("invalidEmail")
    if not 1 <= len(village) <= 120:
        errors.append("invalidVillage")
    if not 1 <= len(district) <= 120:
        errors.append("invalidDistrict")
    if not 1 <= len(state) <= 80:
        errors.append("invalidState")

    if include_password:
        password = values["password"]
        if len(password) < 8 or len(password) > 256:
            errors.append("invalidPassword")
        if password != values["confirm_password"]:
            errors.append("passwordMismatch")
    return errors


def registration_values():
    return {
        "full_name": request.form.get("full_name", "").strip(),
        "mobile": request.form.get("mobile", "").strip(),
        "email": request.form.get("email", "").strip().lower(),
        "village": request.form.get("village", "").strip(),
        "district": request.form.get("district", "").strip(),
        "state": request.form.get("state", "").strip(),
        "password": request.form.get("password", ""),
        "confirm_password": request.form.get("confirm_password", ""),
    }


def profile_values():
    return {
        "full_name": request.form.get("full_name", "").strip(),
        "mobile": request.form.get("mobile", "").strip(),
        "email": request.form.get("email", "").strip().lower(),
        "village": request.form.get("village", "").strip(),
        "district": request.form.get("district", "").strip(),
        "state": request.form.get("state", "").strip(),
    }


@app.before_request
def ensure_database_exists():
    if not Path(app.config["DATABASE"]).exists():
        init_db()


@app.get("/")
def home():
    return render_page("home", "VELAN AI")


@app.route("/farmer/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        if current_farmer():
            return redirect(url_for("dashboard"))
        values = take_form_values()
        return render_page("register", "Farmer Registration", form_values=values)

    validate_csrf()
    values = registration_values()
    errors = validate_farmer_fields(values, include_password=True)
    if errors:
        add_form_error(errors[0], {key: value for key, value in values.items() if key not in {"password", "confirm_password"}})
        return redirect(url_for("register"))

    connection = connect_db()
    try:
        duplicate = connection.execute(
            """
            SELECT users.email, farmer_profiles.mobile
            FROM users
            JOIN farmer_profiles ON farmer_profiles.user_id = users.id
            WHERE users.email = ? COLLATE NOCASE OR farmer_profiles.mobile = ?
            """,
            (values["email"], normalize_mobile(values["mobile"])),
        ).fetchone()
        if duplicate:
            add_form_error("duplicateAccount", {key: value for key, value in values.items() if key not in {"password", "confirm_password"}})
            return redirect(url_for("register"))

        with connection:
            cursor = connection.execute(
                "INSERT INTO users (email, password_hash) VALUES (?, ?)",
                (values["email"], generate_password_hash(values["password"])),
            )
            connection.execute(
                """
                INSERT INTO farmer_profiles
                    (user_id, full_name, mobile, village, district, state)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    cursor.lastrowid,
                    values["full_name"],
                    normalize_mobile(values["mobile"]),
                    values["village"],
                    values["district"],
                    values["state"],
                ),
            )
    except sqlite3.IntegrityError:
        add_form_error("duplicateAccount", {key: value for key, value in values.items() if key not in {"password", "confirm_password"}})
        return redirect(url_for("register"))
    finally:
        connection.close()

    flash("registrationSuccess", "success")
    return redirect(url_for("login"))


@app.route("/farmer/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        if current_farmer():
            return redirect(url_for("dashboard"))
        return render_page("login", "Farmer Login")

    validate_csrf()
    identifier = request.form.get("identifier", "").strip()
    password = request.form.get("password", "")
    if not identifier or not password:
        add_form_error("loginRequired")
        return redirect(url_for("login"))

    if "@" in identifier:
        query = """
            SELECT users.id, users.password_hash
            FROM users JOIN farmer_profiles ON farmer_profiles.user_id = users.id
            WHERE users.email = ? COLLATE NOCASE AND users.role = 'farmer'
        """
        lookup_value = identifier.lower()
    else:
        query = """
            SELECT users.id, users.password_hash
            FROM users JOIN farmer_profiles ON farmer_profiles.user_id = users.id
            WHERE farmer_profiles.mobile = ? AND users.role = 'farmer'
        """
        lookup_value = normalize_mobile(identifier)

    connection = connect_db()
    try:
        user = connection.execute(query, (lookup_value,)).fetchone()
    finally:
        connection.close()

    if not user or not check_password_hash(user["password_hash"], password):
        add_form_error("loginFailed")
        return redirect(url_for("login"))

    session.clear()
    session["user_id"] = user["id"]
    csrf_token()
    flash("loginSuccess", "success")
    return redirect(url_for("dashboard"))


@app.post("/farmer/logout")
def logout():
    validate_csrf()
    session.clear()
    flash("logoutSuccess", "success")
    return redirect(url_for("home"))


@app.get("/farmer/dashboard")
def dashboard():
    if not current_farmer():
        flash("loginRequired", "error")
        return redirect(url_for("login"))
    return render_page("dashboard", "Farmer Dashboard")


@app.route("/farmer/profile", methods=["GET", "POST"])
def profile():
    farmer = current_farmer()
    if not farmer:
        flash("loginRequired", "error")
        return redirect(url_for("login"))

    if request.method == "GET":
        return render_page("profile", "Farmer Profile", form_values=take_form_values())

    validate_csrf()
    values = profile_values()
    errors = validate_farmer_fields(values)
    if errors:
        add_form_error(errors[0], values)
        return redirect(url_for("profile"))

    connection = connect_db()
    try:
        duplicate = connection.execute(
            """
            SELECT users.id
            FROM users
            JOIN farmer_profiles ON farmer_profiles.user_id = users.id
            WHERE (users.email = ? COLLATE NOCASE OR farmer_profiles.mobile = ?)
              AND users.id != ?
            """,
            (values["email"], normalize_mobile(values["mobile"]), farmer["user_id"]),
        ).fetchone()
        if duplicate:
            add_form_error("duplicateAccount", values)
            return redirect(url_for("profile"))
        with connection:
            connection.execute(
                "UPDATE users SET email = ? WHERE id = ?",
                (values["email"], farmer["user_id"]),
            )
            connection.execute(
                """
                UPDATE farmer_profiles
                SET full_name = ?, mobile = ?, village = ?, district = ?, state = ?
                WHERE user_id = ?
                """,
                (
                    values["full_name"],
                    normalize_mobile(values["mobile"]),
                    values["village"],
                    values["district"],
                    values["state"],
                    farmer["user_id"],
                ),
            )
    except sqlite3.IntegrityError:
        add_form_error("duplicateAccount", values)
        return redirect(url_for("profile"))
    finally:
        connection.close()

    flash("profileUpdated", "success")
    return redirect(url_for("profile"))


@app.route("/farmer/reports", methods=["GET", "POST"])
def reports():
    farmer = current_farmer()
    if not farmer:
        flash("loginRequired", "error")
        return redirect(url_for("login"))

    if request.method == "POST":
        validate_csrf()
        crop_type = request.form.get("crop_type", "").strip()
        description = request.form.get("description", "").strip()
        upload = request.files.get("crop_image")
        if crop_type not in set(MODEL_CROPS) | {"Tea", "Rice", "Cotton"}:
            flash("invalidCrop", "error")
            return redirect(url_for("disease_detection"))
        if len(description) > 1000:
            flash("invalidDescription", "error")
            return redirect(url_for("disease_detection"))
        if not upload or not upload.filename:
            flash("imageRequired", "error")
            return redirect(url_for("disease_detection"))

        try:
            image_data = upload.stream.read(5 * 1024 * 1024 + 1)
        finally:
            upload.close()
        try:
            image, cleaned_image = decode_crop_image(image_data)
        except InvalidCropImage as error:
            message = {
                "empty": "imageRequired",
                "too_large": "imageTooLargeServer",
                "too_small": "imageTooSmallServer",
                "unsupported": "imageUnsupported",
                "corrupt": "imageInvalid",
            }[str(error)]
            flash(message, "error")
            return redirect(url_for("disease_detection"))

        prediction = None
        ai_status = "unsupported_crop"
        supported_crops = set(MODEL_CROPS)
        if crop_type in supported_crops:
            if not Path(app.config["MODEL_PATH"]).is_file():
                ai_status = "model_unavailable"
            else:
                try:
                    prediction = predict(image, app.config["MODEL_PATH"])
                    if not prediction:
                        ai_status = "model_unavailable"
                    else:
                        detected_crop = prediction.get("detected_crop") or crop_for_label(
                            prediction["label"]
                        )
                        if detected_crop == crop_type:
                            ai_status = "predicted"
                        else:
                            prediction = None
                            ai_status = "crop_mismatch"
                except (ImportError, OSError, RuntimeError) as error:
                    app.logger.exception("Crop model inference failed")
                    ai_status = "inference_error"

        image_name = f"{uuid.uuid4().hex}.jpg"
        image_path = Path(app.config["REPORT_IMAGES"]) / image_name
        try:
            image_path.parent.mkdir(parents=True, exist_ok=True)
            image_path.write_bytes(cleaned_image)
            connection = connect_db()
            try:
                with connection:
                    cursor = connection.execute(
                        """
                        INSERT INTO disease_reports
                            (farmer_id, crop_type, description, image_path, status,
                             prediction, confidence, model_id, ai_status)
                        VALUES (?, ?, ?, ?, 'pending_review', ?, ?, ?, ?)
                        """,
                        (
                            farmer["farmer_id"],
                            crop_type,
                            description,
                            image_name,
                            prediction["label"] if prediction else None,
                            prediction["confidence"] if prediction else None,
                            prediction["model_id"] if prediction else None,
                            ai_status,
                        ),
                    )
                    report_id = cursor.lastrowid
            finally:
                connection.close()
        except OSError:
            image_path.unlink(missing_ok=True)
            app.logger.exception("Could not save uploaded report image")
            abort(500, description="The report image could not be saved.")
        except sqlite3.Error:
            image_path.unlink(missing_ok=True)
            app.logger.exception("Could not save crop report")
            abort(500, description="The crop report could not be saved.")

        flash("reportSubmitted", "success")
        if ai_status == "model_unavailable":
            flash("modelUnavailable", "info")
        elif ai_status == "unsupported_crop":
            flash("cropNotSupported", "info")
        elif ai_status == "inference_error":
            flash("inferenceUnavailable", "info")
        elif ai_status == "crop_mismatch":
            flash("cropMismatchNotice", "info")
        return redirect(url_for("report_detail", report_id=report_id))

    return render_page("history", "Report History")


def fetch_report(report_id):
    connection = connect_db()
    try:
        return connection.execute(
            """
            SELECT disease_reports.*, farmer_profiles.user_id AS owner_user_id,
                   farmer_profiles.full_name AS farmer_name,
                   farmer_profiles.village, farmer_profiles.district,
                   farmer_profiles.state, users.email AS farmer_email
            FROM disease_reports
            JOIN farmer_profiles ON farmer_profiles.id = disease_reports.farmer_id
            JOIN users ON users.id = farmer_profiles.user_id
            WHERE disease_reports.id = ?
            """,
            (report_id,),
        ).fetchone()
    finally:
        connection.close()


def report_for_state(report):
    data = dict(report)
    data["image_url"] = url_for("report_image", report_id=report["id"])
    data["detected_crop"] = crop_for_label(report["prediction"]) if report["prediction"] else None
    data["confidence_percent"] = (
        round(report["confidence"] * 100, 1)
        if report["confidence"] is not None
        else None
    )
    return data


@app.get("/farmer/reports/<int:report_id>")
def report_detail(report_id):
    farmer = current_farmer()
    if not farmer:
        if current_expert():
            return redirect(url_for("expert_report_detail", report_id=report_id))
        flash("loginRequired", "error")
        return redirect(url_for("login"))
    report = fetch_report(report_id)
    if not report or report["owner_user_id"] != farmer["user_id"]:
        abort(404)
    return render_page(
        "report",
        "Disease Report",
        extra_state={"report": report_for_state(report)},
    )


@app.get("/reports/<int:report_id>/image")
def report_image(report_id):
    report = fetch_report(report_id)
    if not report:
        abort(404)
    farmer = current_farmer()
    expert = current_expert()
    if not expert and (not farmer or farmer["user_id"] != report["owner_user_id"]):
        abort(404)
    filename = report["image_path"]
    if not filename or Path(filename).name != filename:
        abort(404)
    image_path = Path(app.config["REPORT_IMAGES"]) / filename
    if not image_path.is_file():
        abort(404)
    return send_file(image_path, mimetype="image/jpeg", max_age=0)


@app.get("/disease-detection")
def disease_detection():
    if not current_farmer():
        flash("loginRequired", "error")
        return redirect(url_for("login"))
    return render_page("detection", "Disease Detection")


@app.get("/api/advisory")
def api_advisory():
    crop_type = request.args.get("crop", "Tomato").strip() or "Tomato"
    disease_name = request.args.get("disease", "").strip()
    return jsonify(crop_advisory_payload(crop_type, disease_name))


@app.get("/advisory")
def advisory():
    return render_page("advisory", "Agricultural Advisory")


@app.get("/expert-dashboard")
def expert_dashboard():
    expert = current_expert()
    if not expert:
        if current_farmer():
            abort(403)
        return redirect(url_for("expert_login"))

    connection = connect_db()
    try:
        reports = connection.execute(
            """
            SELECT disease_reports.id, disease_reports.crop_type,
                   disease_reports.prediction, disease_reports.confidence,
                   disease_reports.ai_status, disease_reports.status,
                   disease_reports.submitted_at, farmer_profiles.full_name AS farmer_name,
                   farmer_profiles.village, farmer_profiles.district
            FROM disease_reports
            JOIN farmer_profiles ON farmer_profiles.id = disease_reports.farmer_id
            ORDER BY disease_reports.submitted_at DESC, disease_reports.id DESC
            LIMIT 100
            """
        ).fetchall()
    finally:
        connection.close()
    return render_page(
        "expert",
        "Expert Dashboard",
        extra_state={"reports": [dict(row) for row in reports]},
    )


@app.route("/expert/login", methods=["GET", "POST"])
def expert_login():
    if request.method == "GET":
        if current_expert():
            return redirect(url_for("expert_dashboard"))
        if current_farmer():
            abort(403)
        return render_page("expert_login", "Expert Login")

    validate_csrf()
    identifier = request.form.get("identifier", "").strip().lower()
    password = request.form.get("password", "")
    connection = connect_db()
    try:
        expert = connection.execute(
            "SELECT id, password_hash FROM users WHERE email = ? COLLATE NOCASE AND role = 'expert'",
            (identifier,),
        ).fetchone()
    finally:
        connection.close()
    if not expert or not check_password_hash(expert["password_hash"], password):
        flash("loginFailed", "error")
        return redirect(url_for("expert_login"))
    session.clear()
    session["user_id"] = expert["id"]
    csrf_token()
    flash("loginSuccess", "success")
    return redirect(url_for("expert_dashboard"))


@app.post("/expert/logout")
def expert_logout():
    if not current_expert():
        abort(403)
    validate_csrf()
    session.clear()
    flash("logoutSuccess", "success")
    return redirect(url_for("home"))


@app.get("/expert/reports/<int:report_id>")
def expert_report_detail(report_id):
    if not current_expert():
        if current_farmer():
            abort(403)
        return redirect(url_for("expert_login"))
    report = fetch_report(report_id)
    if not report:
        abort(404)
    return render_page(
        "report",
        "Disease Report",
        extra_state={"report": report_for_state(report), "expert_view": True},
    )


@app.get("/farmer/reports/<int:report_id>/pdf")
def report_pdf(report_id):
    farmer = current_farmer()
    if not farmer:
        flash("loginRequired", "error")
        return redirect(url_for("login"))
    report = fetch_report(report_id)
    if not report or report["owner_user_id"] != farmer["user_id"]:
        abort(404)

    image_bytes = None
    image_path = Path(app.config["REPORT_IMAGES"]) / report["image_path"]
    if report["image_path"] and image_path.is_file():
        image_bytes = image_path.read_bytes()

    pdf_bytes = build_pdf_report(dict(report), image_bytes=image_bytes)
    filename = f"velan-report-{report_id}.pdf"
    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype="application/pdf",
        as_attachment=True,
        download_name=filename,
    )


@app.post("/expert/reports/<int:report_id>/response")
def expert_report_response(report_id):
    expert = current_expert()
    if not expert:
        if current_farmer():
            abort(403)
        return redirect(url_for("expert_login"))
    validate_csrf()
    response_text = request.form.get("expert_response", "").strip()
    if not 10 <= len(response_text) <= 5000:
        flash("invalidExpertResponse", "error")
        return redirect(url_for("expert_report_detail", report_id=report_id))

    connection = connect_db()
    try:
        with connection:
            cursor = connection.execute(
                """
                UPDATE disease_reports
                SET expert_response = ?, expert_id = ?, expert_reviewed_at = CURRENT_TIMESTAMP,
                    status = 'reviewed'
                WHERE id = ?
                """,
                (response_text, expert["id"], report_id),
            )
            if cursor.rowcount == 0:
                abort(404)
    finally:
        connection.close()
    flash("expertResponseSaved", "success")
    return redirect(url_for("expert_report_detail", report_id=report_id))


@app.errorhandler(400)
def handle_bad_request(error):
    return render_template(
        "error.html",
        title="Request could not be completed",
        message="The form expired or the request was invalid. Reload the page and try again.",
        state=current_state(),
    ), 400


@app.errorhandler(413)
def handle_large_request(_error):
    return render_template(
        "error.html",
        title="Request too large",
        message="The submitted form is too large. Please shorten the information and try again.",
        state=current_state(),
    ), 413


if __name__ == "__main__":
    app.run(
        host=os.environ.get("VELAN_HOST", "127.0.0.1"),
        port=int(os.environ.get("PORT", "5000")),
        debug=os.environ.get("VELAN_DEBUG", "").lower() == "true",
    )

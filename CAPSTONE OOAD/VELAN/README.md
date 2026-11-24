# VELAN AI — Stage 3: AI + Advisory

**Healthy Crops. Smarter Farming.**  
AI-Enabled Crop Disease Reporting and Agricultural Advisory System

Stage 3 adds private crop-report uploads, optional ONNX image screening, farmer-owned report history, and authenticated expert review. It preserves the Stage 1 visual design and the Stage 2 farmer accounts, profiles, and SQLite database.

## Run locally on Windows

1. Open the `Velan` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Create and activate a virtual environment:

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

   If PowerShell blocks activation, run `.\.venv\Scripts\python.exe` instead of `python` in the following commands.

4. Install the app and image/model dependencies:

   ```powershell
   python -m pip install -r requirements.txt
   ```

5. Start the local website:

   ```powershell
   python app.py
   ```

6. Open **http://127.0.0.1:5000**. Keep the terminal open while using the site. Press `Ctrl+C` to stop it.

Open the Flask URL rather than opening an HTML file directly or using Live Server: Flask handles accounts, report uploads, SQLite storage, and protected pages.

## Farmer workflow

1. Select **Farmer Registration** and enter your name, mobile number, email, password, village, district, and state. Passwords must be at least 8 characters and the confirmation must match.
2. After registration, the site confirms success and takes you to the login page.
3. Log in using the registered email **or** mobile number and password.
4. Open **Farmer Dashboard** to view your saved account details and report count.
5. Select **Farmer Profile** to edit your details. Changes are saved to SQLite.
6. Open **Disease Detection**, choose a crop and a JPG, PNG, or WEBP photo (up to 5 MB), optionally add observations, and submit. The app saves the report and shows its actual model status, any expert reply, and the uploaded image.
7. Open **Report History** to search and view your reports. Only the owning farmer and authorized experts can view a report image or report details.
8. Use **Log out** in the navigation. Farmer pages and report operations require a signed-in farmer session.

English, Tamil, and Hindi are available throughout the website. The language selector remembers the choice in browser storage.

## AI model: coverage and limits

The model integration uses the pinned **float32 ONNX MobileNetV2** from [ONNX Community](https://huggingface.co/onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX), revision `95110a1ffcc188d1b5a36524d52e303e40c2403d`. It was fine-tuned on the Kaggle New Plant Diseases dataset, based on PlantVillage, with 38 labels across Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Bell Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, and Tomato. Tea, Rice, and Cotton are outside its label set and reports for those crops are saved without a model result. If the top model class maps to a different crop than the farmer selected, the app discards that result and asks the farmer to check the crop/photo.

The app intentionally uses the float32 export rather than the repository's int8 export. In one smoke check, the float32 export matched all 15 labels in a selected sample (three each from tomato healthy, tomato early blight, potato late blight, apple scab, and corn common rust) and all 14 labels in a separate sample with one labeled image from each supported crop. The int8 export matched only 1 of the first 15 images with the same preprocessing, so it is not used. These small, selected samples are **not** representative accuracy evaluations; the model card separately reports 95.41% on its evaluation set, which is not independently verified here.

No model weights are bundled. The model card's license metadata is `other`, and permission to use the model/data has not been established by this project. Review the model card and applicable dataset terms yourself before proceeding. If you have permission, run:

```powershell
python app.py download-model
```

The command asks you to confirm permission, downloads only the pinned file, and verifies its SHA-256 before saving it to `instance/models/model.onnx`. Do not confirm unless you have checked the terms. You can instead configure a permitted compatible file with `VELAN_MODEL_PATH`; the app still requires the pinned checksum.

The inference path validates image format, file size, pixel dimensions and minimum side length with Pillow, converts the image to RGB, resizes/crops to the model's 224×224 input, normalizes it, and runs on CPU with ONNX Runtime. The displayed value is the model's top-class softmax score, **not** a calibrated probability or accuracy estimate. PlantVillage photos were collected in controlled conditions; this model has not been validated on local field photos. It is a fixed-label classifier and cannot reliably reject unrelated photos or every out-of-domain field image. The page warns users to check the selected crop; mismatched crop results are not saved as diagnoses. A model class is a screening result, not a confirmed diagnosis. Without the permitted model file, reports are saved with an explicit no-model status and no prediction.

## Expert review

Expert accounts cannot be created through public registration. In a second terminal, create one with:

```powershell
python app.py create-expert
```

Follow the prompts for the expert email and a password of at least 12 characters. The expert signs in through **Expert Login**, reviews submitted reports and photos, then saves an advisory response. Farmers see responses only on their own report pages. Expert credentials are stored as password hashes and expert routes require the expert role.

## Database and private files

The app creates `instance/velan.db` automatically and migrates an existing Stage 2 report table without deleting its records. It contains:

- `users` — unique email, password hash, farmer/expert role, and creation time.
- `farmer_profiles` — account link, name, unique mobile number, village, district, and state.
- `disease_reports` — crop and farmer notes, private generated image filename, model prediction/score/status, and expert response/reviewer/time.

Passwords use Werkzeug's scrypt hash. SQL uses parameterized values; forms use CSRF tokens; the session cookie is HTTP-only. Uploaded images are decoded, size-limited, normalized to JPEG, assigned random names, and stored under `instance/report_images/`. Report images and the model/database/secret files are excluded from Git. Back up `instance/velan.db` and its private report images together if you need to preserve reports.

To inspect non-password records with Python:

```powershell
python -c "import sqlite3; c=sqlite3.connect('instance/velan.db'); print('Farmers:', c.execute('SELECT u.email,p.full_name,p.mobile,p.village,p.district,p.state FROM users u JOIN farmer_profiles p ON p.user_id=u.id WHERE u.role=\"farmer\"').fetchall()); print('Reports:', c.execute('SELECT id,farmer_id,crop_type,prediction,confidence,ai_status,expert_response,submitted_at FROM disease_reports').fetchall()); c.close()"
```

You can also install a SQLite viewer extension in VS Code and open `instance/velan.db`. Do not share the database file or the private `instance/secret_key` file.

## Advisory safety

The disease descriptions are general label information, not a diagnosis. Report pages indicate when AI screening is missing and whether an expert has replied. Guidance avoids specific product/dose prescriptions: follow only locally registered product labels, protective-equipment requirements, re-entry and pre-harvest intervals, and qualified local extension advice. Severity is not assessed by the model.

## Tests

Run the automated workflow and security-boundary tests from the project folder:

```powershell
python -m unittest discover -s tests -v
```

The tests cover farmer registration/login/profile/logout, password hashing, duplicate checks, CSRF, old-database migration, corrupt/oversized images, private report storage, report ownership, missing-model behavior, safe handling of crop-mismatched model labels, and expert-only response persistence. Model-output tests use a test double; they do not claim an actual model prediction was evaluated.

## Current limitations

- Model labels cover 14 crops and 38 classes. Tea, Rice, and Cotton reports can be submitted for expert review but do not get model predictions.
- A model file is not included or installed until its license/data terms are checked and the user explicitly consents to the download.
- Only a small 15-image smoke check was run; it is not an accuracy evaluation. No field validation has been conducted. Never treat a model result as an expert-confirmed diagnosis.
- The fixed-label model cannot reliably recognize arbitrary unrelated images; clear crop photographs and checking the selected crop are important.
- Expert review is a local workflow and does not verify the expert's real-world credentials or send notifications.
- Advisory material is conservative, general information, not a location-specific prescription. Disease severity is not provided.
- For deployment beyond local development, set a strong `VELAN_SECRET_KEY`, use HTTPS (`VELAN_HTTPS=true`), and use a production WSGI server. The built-in Flask server is for local development only.

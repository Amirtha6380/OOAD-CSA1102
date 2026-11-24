import io
import re
import sqlite3
import tempfile
import unittest
from contextlib import closing
from pathlib import Path
from unittest.mock import patch

from app import app, init_db
from disease_model import LABELS, MODEL_CROPS, crop_for_label
from PIL import Image
from werkzeug.security import generate_password_hash


class FarmerWorkflowTests(unittest.TestCase):
    def test_every_model_label_maps_to_a_supported_crop(self):
        self.assertEqual(len(MODEL_CROPS), 14)
        self.assertTrue(all(crop_for_label(label) for label in LABELS))

    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.database_path = Path(self.temporary_directory.name) / "test-velan.db"
        app.config.update(
            TESTING=True,
            DATABASE=str(self.database_path),
            MODEL_PATH=str(Path(self.temporary_directory.name) / "missing.onnx"),
            REPORT_IMAGES=str(Path(self.temporary_directory.name) / "report_images"),
        )
        init_db()
        self.client = app.test_client()

    def tearDown(self):
        self.temporary_directory.cleanup()

    def csrf_token(self, path):
        response = self.client.get(path)
        self.assertEqual(response.status_code, 200)
        match = re.search(rb'name="csrf-token" content="([^"]+)"', response.data)
        self.assertIsNotNone(match)
        return match.group(1).decode("ascii")

    def registration_data(self, **overrides):
        values = {
            "full_name": "Test Farmer",
            "mobile": "9876543210",
            "email": "farmer@example.test",
            "village": "Green Village",
            "district": "Sample District",
            "state": "Tamil Nadu",
            "password": "secure-pass-123",
            "confirm_password": "secure-pass-123",
        }
        values.update(overrides)
        values["csrf_token"] = self.csrf_token("/farmer/register")
        return values

    def register_farmer(self):
        response = self.client.post(
            "/farmer/register",
            data=self.registration_data(),
            follow_redirects=True,
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"key": "registrationSuccess"', response.data)

    def login_farmer(self):
        token = self.csrf_token("/farmer/login")
        return self.client.post(
            "/farmer/login",
            data={
                "csrf_token": token,
                "identifier": "farmer@example.test",
                "password": "secure-pass-123",
            },
            follow_redirects=True,
        )

    def png_upload(self):
        image = Image.new("RGB", (160, 120), (55, 125, 60))
        data = io.BytesIO()
        image.save(data, format="PNG")
        data.seek(0)
        return data

    def submit_report(self, crop_type="Tea", upload=None, client=None):
        client = client or self.client
        token = self.csrf_token("/farmer/dashboard")
        response = client.post(
            "/farmer/reports",
            data={
                "csrf_token": token,
                "crop_type": crop_type,
                "description": "Leaves show spots.",
                "crop_image": (upload or self.png_upload(), "crop.png"),
            },
            content_type="multipart/form-data",
        )
        response.request.environ["wsgi.input"].close()
        response.close()
        return response

    def test_registration_hashes_password_and_saves_profile(self):
        response = self.client.post(
            "/farmer/register",
            data=self.registration_data(),
            follow_redirects=True,
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"key": "registrationSuccess"', response.data)

        with closing(sqlite3.connect(self.database_path)) as connection:
            user = connection.execute(
                "SELECT email, password_hash FROM users"
            ).fetchone()
            profile = connection.execute(
                "SELECT full_name, mobile, village, district, state FROM farmer_profiles"
            ).fetchone()
        self.assertEqual(user[0], "farmer@example.test")
        self.assertNotEqual(user[1], "secure-pass-123")
        self.assertTrue(user[1].startswith("scrypt:"))
        self.assertEqual(
            profile,
            ("Test Farmer", "9876543210", "Green Village", "Sample District", "Tamil Nadu"),
        )

    def test_registration_rejects_duplicate_email_and_mobile(self):
        self.register_farmer()
        for duplicate in (
            {"email": "FARMER@example.test", "mobile": "9123456780"},
            {"email": "other@example.test", "mobile": "+91 (987) 654-3210"},
        ):
            response = self.client.post(
                "/farmer/register",
                data=self.registration_data(**duplicate),
                follow_redirects=True,
            )
            self.assertIn(b'"key": "duplicateAccount"', response.data)

        with closing(sqlite3.connect(self.database_path)) as connection:
            self.assertEqual(connection.execute("SELECT COUNT(*) FROM users").fetchone()[0], 1)

    def test_login_dashboard_protection_profile_update_and_logout(self):
        response = self.client.get("/farmer/dashboard", follow_redirects=True)
        self.assertEqual(response.request.path, "/farmer/login")
        self.assertIn(b'"key": "loginRequired"', response.data)

        self.register_farmer()
        response = self.login_farmer()
        self.assertIn(b'"name": "Test Farmer"', response.data)
        self.assertIn(b'"village": "Green Village"', response.data)
        self.assertIn(b'"report_count": 0', response.data)

        profile_token = self.csrf_token("/farmer/profile")
        response = self.client.post(
            "/farmer/profile",
            data={
                "csrf_token": profile_token,
                "full_name": "Updated Farmer",
                "mobile": "9123456780",
                "email": "updated@example.test",
                "village": "New Village",
                "district": "New District",
                "state": "Karnataka",
            },
            follow_redirects=True,
        )
        self.assertIn(b'"key": "profileUpdated"', response.data)
        self.assertIn(b'"name": "Updated Farmer"', response.data)
        self.assertIn(b'"village": "New Village"', response.data)

        with closing(sqlite3.connect(self.database_path)) as connection:
            self.assertEqual(
                connection.execute(
                    "SELECT email FROM users"
                ).fetchone()[0],
                "updated@example.test",
            )
            self.assertEqual(
                connection.execute(
                    "SELECT full_name, mobile, village, district, state FROM farmer_profiles"
                ).fetchone(),
                ("Updated Farmer", "9123456780", "New Village", "New District", "Karnataka"),
            )

        logout_token = self.csrf_token("/farmer/dashboard")
        response = self.client.post(
            "/farmer/logout",
            data={"csrf_token": logout_token},
            follow_redirects=True,
        )
        self.assertIn(b'"key": "logoutSuccess"', response.data)

        mobile_login_token = self.csrf_token("/farmer/login")
        response = self.client.post(
            "/farmer/login",
            data={
                "csrf_token": mobile_login_token,
                "identifier": "+91 9123456780",
                "password": "secure-pass-123",
            },
            follow_redirects=True,
        )
        self.assertIn(b'"name": "Updated Farmer"', response.data)
        final_logout_token = self.csrf_token("/farmer/dashboard")
        self.client.post(
            "/farmer/logout",
            data={"csrf_token": final_logout_token},
            follow_redirects=True,
        )
        response = self.client.get("/farmer/profile", follow_redirects=True)
        self.assertEqual(response.request.path, "/farmer/login")

    def test_wrong_password_is_rejected_and_reports_table_is_empty(self):
        self.register_farmer()
        token = self.csrf_token("/farmer/login")
        response = self.client.post(
            "/farmer/login",
            data={
                "csrf_token": token,
                "identifier": "farmer@example.test",
                "password": "wrong-password",
            },
            follow_redirects=True,
        )
        self.assertIn(b'"key": "loginFailed"', response.data)
        with closing(sqlite3.connect(self.database_path)) as connection:
            self.assertEqual(
                connection.execute("SELECT COUNT(*) FROM disease_reports").fetchone()[0],
                0,
            )

    def test_invalid_csrf_is_rejected(self):
        response = self.client.post(
            "/farmer/register",
            data={"csrf_token": "invalid"},
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn(b"The form expired", response.data)

    def test_crop_report_is_stored_without_fabricating_unsupported_prediction(self):
        self.register_farmer()
        self.login_farmer()

        response = self.submit_report()
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.headers["Location"], "/farmer/reports/1")

        with closing(sqlite3.connect(self.database_path)) as connection:
            report = connection.execute(
                "SELECT crop_type, prediction, confidence, ai_status, image_path FROM disease_reports"
            ).fetchone()
        self.assertEqual(report[:4], ("Tea", None, None, "unsupported_crop"))
        stored_image = Path(app.config["REPORT_IMAGES"]) / report[4]
        self.assertTrue(stored_image.is_file())

        response = self.client.get("/farmer/reports/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"report_count": 1', response.data)
        image_response = self.client.get("/reports/1/image")
        self.assertEqual(image_response.status_code, 200)
        self.assertEqual(image_response.mimetype, "image/jpeg")
        image_response.close()

        other_client = app.test_client()
        other_registration = {
            "full_name": "Other Farmer",
            "mobile": "9876543211",
            "email": "other@example.test",
            "village": "Green Village",
            "district": "Sample District",
            "state": "Tamil Nadu",
            "password": "secure-pass-123",
            "confirm_password": "secure-pass-123",
            "csrf_token": self.csrf_token_for(other_client, "/farmer/register"),
        }
        other_client.post(
            "/farmer/register",
            data=other_registration,
            follow_redirects=True,
        )
        other_client.post(
            "/farmer/login",
            data={
                "csrf_token": self.csrf_token_for(other_client, "/farmer/login"),
                "identifier": "other@example.test",
                "password": "secure-pass-123",
            },
        )
        self.assertEqual(other_client.get("/farmer/reports/1").status_code, 404)
        self.assertEqual(other_client.get("/reports/1/image").status_code, 404)

    def csrf_token_for(self, client, path):
        response = client.get(path)
        self.assertEqual(response.status_code, 200)
        match = re.search(rb'name="csrf-token" content="([^"]+)"', response.data)
        self.assertIsNotNone(match)
        return match.group(1).decode("ascii")

    def test_model_unavailable_saves_report_without_prediction(self):
        self.register_farmer()
        self.login_farmer()
        app.config["MODEL_PATH"] = str(Path(self.temporary_directory.name) / "missing.onnx")

        response = self.submit_report(crop_type="Tomato")
        self.assertEqual(response.status_code, 302)
        with closing(sqlite3.connect(self.database_path)) as connection:
            report = connection.execute(
                "SELECT prediction, confidence, model_id, ai_status FROM disease_reports"
            ).fetchone()
        self.assertEqual(report, (None, None, None, "model_unavailable"))

    def test_model_result_is_recorded_only_when_selected_crop_matches(self):
        self.register_farmer()
        self.login_farmer()
        model_path = Path(self.temporary_directory.name) / "present.onnx"
        model_path.write_bytes(b"test marker")
        app.config["MODEL_PATH"] = str(model_path)
        prediction = {
            "label": "Tomato with Early Blight",
            "confidence": 0.75,
            "model_id": "test-model",
        }

        with patch("app.predict", return_value=prediction):
            response = self.submit_report(crop_type="Tomato")
        self.assertEqual(response.status_code, 302)
        with closing(sqlite3.connect(self.database_path)) as connection:
            report = connection.execute(
                "SELECT prediction, confidence, model_id, ai_status FROM disease_reports"
            ).fetchone()
        self.assertEqual(
            report,
            ("Tomato with Early Blight", 0.75, "test-model", "predicted"),
        )

        with patch(
            "app.predict",
            return_value={**prediction, "label": "Potato with Early Blight"},
        ):
            response = self.submit_report(crop_type="Tomato")
        self.assertEqual(response.status_code, 302)
        with closing(sqlite3.connect(self.database_path)) as connection:
            report = connection.execute(
                "SELECT prediction, confidence, ai_status FROM disease_reports ORDER BY id DESC LIMIT 1"
            ).fetchone()
        self.assertEqual(report, (None, None, "crop_mismatch"))

    def test_model_supported_crop_beyond_tomato_and_potato_is_accepted(self):
        self.register_farmer()
        self.login_farmer()
        model_path = Path(self.temporary_directory.name) / "present.onnx"
        model_path.write_bytes(b"test marker")
        app.config["MODEL_PATH"] = str(model_path)

        with patch(
            "app.predict",
            return_value={
                "label": "Apple with Black Rot",
                "confidence": 0.81,
                "model_id": "test-model",
            },
        ):
            response = self.submit_report(crop_type="Apple")

        self.assertEqual(response.status_code, 302)
        with closing(sqlite3.connect(self.database_path)) as connection:
            report = connection.execute(
                "SELECT prediction, confidence, ai_status FROM disease_reports"
            ).fetchone()
        self.assertEqual(report, ("Apple with Black Rot", 0.81, "predicted"))
        self.assertEqual(crop_for_label("Apple with Black Rot"), "Apple")
        self.assertIn("Apple", MODEL_CROPS)

    def test_corrupt_and_oversized_images_are_rejected(self):
        self.register_farmer()
        self.login_farmer()

        response = self.submit_report(upload=io.BytesIO(b"not an image"))
        self.assertEqual(response.status_code, 302)
        self.assertIn("/disease-detection", response.headers["Location"])
        response = self.submit_report(upload=io.BytesIO(b"x" * (5 * 1024 * 1024 + 1)))
        self.assertEqual(response.status_code, 302)

        with closing(sqlite3.connect(self.database_path)) as connection:
            self.assertEqual(connection.execute("SELECT COUNT(*) FROM disease_reports").fetchone()[0], 0)

    def test_images_smaller_than_model_minimum_are_rejected(self):
        self.register_farmer()
        self.login_farmer()
        small_image = Image.new("RGB", (48, 96), (55, 125, 60))
        buffer = io.BytesIO()
        small_image.save(buffer, format="PNG")
        buffer.seek(0)

        response = self.submit_report(upload=buffer)
        self.assertEqual(response.status_code, 302)
        with closing(sqlite3.connect(self.database_path)) as connection:
            self.assertEqual(connection.execute("SELECT COUNT(*) FROM disease_reports").fetchone()[0], 0)

    def test_expert_authorization_and_response_persistence(self):
        self.register_farmer()
        self.login_farmer()
        self.submit_report()

        self.assertEqual(self.client.get("/expert-dashboard").status_code, 403)
        self.assertEqual(
            self.client.post("/expert/reports/1/response").status_code,
            403,
        )
        token = self.csrf_token("/farmer/dashboard")
        with closing(sqlite3.connect(self.database_path)) as connection:
            connection.execute(
                "INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'expert')",
                ("expert@example.test", generate_password_hash("expert-password-123")),
            )
            connection.commit()

        response = self.client.post(
            "/expert/login",
            data={
                "csrf_token": token,
                "identifier": "expert@example.test",
                "password": "expert-password-123",
            },
            follow_redirects=True,
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"role": "expert"', response.data)
        image_response = self.client.get("/reports/1/image")
        self.assertEqual(image_response.status_code, 200)
        image_response.close()
        response = self.client.post(
            "/expert/reports/1/response",
            data={
                "csrf_token": self.csrf_token("/expert-dashboard"),
                "expert_response": "Please consult your local extension officer for crop-specific guidance.",
            },
            follow_redirects=True,
        )
        self.assertIn(b"expertResponseSaved", response.data)

        with closing(sqlite3.connect(self.database_path)) as connection:
            saved_response = connection.execute(
                "SELECT expert_response, status FROM disease_reports WHERE id = 1"
            ).fetchone()
        self.assertEqual(
            saved_response,
            (
                "Please consult your local extension officer for crop-specific guidance.",
                "reviewed",
            ),
        )

    def test_stage_two_database_migrates_report_columns(self):
        legacy_path = Path(self.temporary_directory.name) / "legacy.db"
        with closing(sqlite3.connect(legacy_path)) as connection:
            connection.executescript(
                """
                CREATE TABLE users (id INTEGER PRIMARY KEY);
                CREATE TABLE farmer_profiles (id INTEGER PRIMARY KEY);
                CREATE TABLE disease_reports (
                    id INTEGER PRIMARY KEY,
                    farmer_id INTEGER,
                    crop_type TEXT,
                    description TEXT,
                    image_path TEXT,
                    status TEXT,
                    submitted_at TEXT
                );
                """
            )

        app.config["DATABASE"] = str(legacy_path)
        try:
            init_db()
            with closing(sqlite3.connect(legacy_path)) as connection:
                columns = {
                    row[1]
                    for row in connection.execute("PRAGMA table_info(disease_reports)")
                }
            self.assertTrue(
                {
                    "prediction",
                    "confidence",
                    "model_id",
                    "ai_status",
                    "expert_response",
                    "expert_id",
                    "expert_reviewed_at",
                }.issubset(columns)
            )
        finally:
            app.config["DATABASE"] = str(self.database_path)


if __name__ == "__main__":
    unittest.main()

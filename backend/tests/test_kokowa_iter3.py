"""Iteration 3: CSV export, digest, subscribers."""
import os
import csv
import io
from pathlib import Path
import pytest
from dotenv import load_dotenv

# Ensure ADMIN_TOKEN is loaded for tests
load_dotenv(Path(__file__).resolve().parents[1] / ".env")

ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "kokowa-admin-2026")


# --- CSV Export ---
class TestCSVExport:
    def test_export_no_token_returns_401(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications/export.csv")
        assert r.status_code == 401

    def test_export_with_token_returns_csv(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications/export.csv",
                           params={"admin_token": ADMIN_TOKEN})
        assert r.status_code == 200
        ctype = r.headers.get("content-type", "")
        assert "text/csv" in ctype
        cdisp = r.headers.get("content-disposition", "")
        assert "attachment" in cdisp.lower()
        # Validate header row using csv reader (QUOTE_ALL)
        reader = csv.reader(io.StringIO(r.text))
        header = next(reader)
        expected = [
            "created_at", "status", "name", "email", "company", "website",
            "stage", "situation", "urgency", "commitment", "budget", "challenge", "id",
        ]
        assert header == expected
        # Confirm QUOTE_ALL: raw header text starts with double quote
        assert r.text.startswith('"created_at"')


# --- Digest ---
class TestDigest:
    def test_digest_no_token_401(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications/digest")
        assert r.status_code == 401

    def test_digest_hours_zero_400(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications/digest",
                           params={"admin_token": ADMIN_TOKEN, "hours": 0})
        assert r.status_code == 400

    def test_digest_hours_too_large_400(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications/digest",
                           params={"admin_token": ADMIN_TOKEN, "hours": 9999})
        assert r.status_code == 400

    def test_digest_valid_returns_keys(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications/digest",
                           params={"admin_token": ADMIN_TOKEN, "hours": 168})
        assert r.status_code == 200
        data = r.json()
        for k in ["window_hours", "since", "total", "by_status", "by_stage", "by_urgency", "highlights"]:
            assert k in data, f"missing key {k}"
        assert data["window_hours"] == 168
        assert isinstance(data["highlights"], list)
        assert isinstance(data["by_status"], dict)


# --- Subscribers ---
class TestSubscribers:
    EMAIL = "TEST_iter3_subscriber@example.com"

    def test_post_valid_email_ok(self, api_client, base_url):
        r = api_client.post(f"{base_url}/api/subscribers",
                            json={"email": self.EMAIL, "source": "test"})
        assert r.status_code == 200
        assert r.json() == {"ok": True}

    def test_post_idempotent_upsert(self, api_client, base_url):
        # Post the same email a second time
        r = api_client.post(f"{base_url}/api/subscribers",
                            json={"email": self.EMAIL})
        assert r.status_code == 200
        # Verify only one record via admin list
        r2 = api_client.get(f"{base_url}/api/subscribers",
                            params={"admin_token": ADMIN_TOKEN})
        assert r2.status_code == 200
        rows = r2.json()
        matches = [x for x in rows if x.get("email") == self.EMAIL.lower()]
        assert len(matches) == 1, f"expected 1 record, got {len(matches)}"

    def test_post_invalid_email_422(self, api_client, base_url):
        r = api_client.post(f"{base_url}/api/subscribers",
                            json={"email": "not-an-email"})
        assert r.status_code == 422

    def test_get_subscribers_no_token_401(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/subscribers")
        assert r.status_code == 401

    def test_get_subscribers_with_token(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/subscribers",
                           params={"admin_token": ADMIN_TOKEN})
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        for row in rows:
            assert "_id" not in row
            assert "email" in row

"""Backend tests for new admin/intake-load endpoints (iteration 2)."""
import os
import pytest
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).resolve().parents[1] / ".env")
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "kokowa-admin-2026")


def _valid_payload(**overrides):
    p = {
        "name": "TEST_Admin Sample",
        "email": "TEST_admin_sample@example.com",
        "company": "TEST_AdminCo",
        "website": "https://example.com",
        "stage": "Scaling",
        "situation": "Repositioning an existing brand",
        "challenge": "We need to reposition our specialty brand to defend pricing and grow wholesale margins.",
        "urgency": "1 to 3 months",
        "commitment": "Yes. Ready to commit if there is fit.",
        "budget": "15k to 40k",
    }
    p.update(overrides)
    return p


# --- GET /api/applications/intake-load ---
class TestIntakeLoad:
    def test_intake_load_no_auth_required(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications/intake-load")
        assert r.status_code == 200, r.text
        d = r.json()
        # Required keys
        for k in ("in_review_this_week", "remaining_slots_this_month", "monthly_slots"):
            assert k in d, f"Missing key {k}"
            assert isinstance(d[k], int), f"{k} should be int, got {type(d[k])}"
        # Sanity ranges
        assert d["monthly_slots"] == 6
        assert d["remaining_slots_this_month"] >= 1
        assert d["remaining_slots_this_month"] <= d["monthly_slots"]
        assert d["in_review_this_week"] >= 0

    def test_intake_load_response_no_pii(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications/intake-load")
        assert r.status_code == 200
        d = r.json()
        # Only count fields, no PII keys
        forbidden = {"name", "email", "company", "applications", "items"}
        assert set(d.keys()).isdisjoint(forbidden)


# --- PATCH /api/applications/{id}/status ---
class TestApplicationStatusPatch:
    @pytest.fixture
    def created_app_id(self, api_client, base_url):
        """Create an application and return its id."""
        r = api_client.post(f"{base_url}/api/applications", json=_valid_payload(email="TEST_patch_target@example.com"))
        assert r.status_code == 200, r.text
        return r.json()["id"]

    def test_patch_without_token_returns_401(self, api_client, base_url, created_app_id):
        r = api_client.patch(
            f"{base_url}/api/applications/{created_app_id}/status",
            json={"status": "qualified"},
        )
        assert r.status_code == 401

    def test_patch_with_invalid_token_returns_401(self, api_client, base_url, created_app_id):
        r = api_client.patch(
            f"{base_url}/api/applications/{created_app_id}/status",
            json={"status": "qualified"},
            params={"admin_token": "wrong"},
        )
        assert r.status_code == 401

    def test_patch_with_invalid_status_returns_400(self, api_client, base_url, created_app_id):
        r = api_client.patch(
            f"{base_url}/api/applications/{created_app_id}/status",
            json={"status": "bogus_status"},
            params={"admin_token": ADMIN_TOKEN},
        )
        assert r.status_code == 400

    def test_patch_nonexistent_id_returns_404(self, api_client, base_url):
        r = api_client.patch(
            f"{base_url}/api/applications/non-existent-id-xyz/status",
            json={"status": "qualified"},
            params={"admin_token": ADMIN_TOKEN},
        )
        assert r.status_code == 404

    def test_patch_qualified_persists(self, api_client, base_url, created_app_id):
        # PATCH to qualified
        r = api_client.patch(
            f"{base_url}/api/applications/{created_app_id}/status",
            json={"status": "qualified"},
            params={"admin_token": ADMIN_TOKEN},
        )
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["id"] == created_app_id
        assert d["status"] == "qualified"

        # Verify via GET list
        r2 = api_client.get(f"{base_url}/api/applications", params={"admin_token": ADMIN_TOKEN})
        assert r2.status_code == 200
        rows = r2.json()
        match = next((x for x in rows if x["id"] == created_app_id), None)
        assert match is not None, "Created application not returned by list"
        assert match["status"] == "qualified"

    def test_patch_declined_then_back_to_pending(self, api_client, base_url, created_app_id):
        # qualified -> declined
        r = api_client.patch(
            f"{base_url}/api/applications/{created_app_id}/status",
            json={"status": "declined"},
            params={"admin_token": ADMIN_TOKEN},
        )
        assert r.status_code == 200
        assert r.json()["status"] == "declined"

        # declined -> pending_review
        r2 = api_client.patch(
            f"{base_url}/api/applications/{created_app_id}/status",
            json={"status": "pending_review"},
            params={"admin_token": ADMIN_TOKEN},
        )
        assert r2.status_code == 200
        assert r2.json()["status"] == "pending_review"

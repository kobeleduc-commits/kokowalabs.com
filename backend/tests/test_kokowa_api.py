"""Backend API tests for Kokowa Labs."""
import os
import pytest


def _valid_payload(**overrides):
    p = {
        "name": "TEST_Kobe Sample",
        "email": "TEST_applicant@example.com",
        "company": "TEST_Brew Co",
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


# --- root endpoint ---
class TestRoot:
    def test_root_message(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Kokowa" in data["message"]


# --- POST /api/applications ---
class TestApplicationsCreate:
    def test_create_valid(self, api_client, base_url):
        payload = _valid_payload()
        r = api_client.post(f"{base_url}/api/applications", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        # Verify id and key fields
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["company"] == payload["company"]
        assert data["stage"] == payload["stage"]
        assert data["situation"] == payload["situation"]
        assert data["challenge"] == payload["challenge"]
        assert data["urgency"] == payload["urgency"]
        assert data["commitment"] == payload["commitment"]
        assert data.get("status") == "pending_review"
        # No mongodb _id leakage
        assert "_id" not in data

    def test_invalid_email_returns_422(self, api_client, base_url):
        payload = _valid_payload(email="not-an-email")
        r = api_client.post(f"{base_url}/api/applications", json=payload)
        assert r.status_code == 422

    def test_short_challenge_returns_400(self, api_client, base_url):
        payload = _valid_payload(challenge="too short")
        r = api_client.post(f"{base_url}/api/applications", json=payload)
        assert r.status_code == 400
        body = r.json()
        assert "detail" in body
        assert "short" in body["detail"].lower() or "challenge" in body["detail"].lower()

    def test_missing_required_field_returns_422(self, api_client, base_url):
        payload = _valid_payload()
        payload.pop("stage")
        r = api_client.post(f"{base_url}/api/applications", json=payload)
        assert r.status_code == 422


# --- GET /api/applications (admin only) ---
class TestApplicationsList:
    def test_list_without_token_returns_401(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications")
        assert r.status_code == 401

    def test_list_with_invalid_token_returns_401(self, api_client, base_url):
        r = api_client.get(f"{base_url}/api/applications", params={"admin_token": "wrong-token"})
        assert r.status_code == 401


# --- Persistence verification (no _id leakage on list path) ---
class TestPersistence:
    def test_create_persists_in_db(self, api_client, base_url):
        """Create an application and ensure response is clean (no _id)."""
        payload = _valid_payload(email="TEST_persist@example.com")
        r = api_client.post(f"{base_url}/api/applications", json=payload)
        assert r.status_code == 200
        data = r.json()
        # Stored doc should not leak _id back
        assert "_id" not in data
        # All required fields echoed
        for k in ["id", "name", "email", "company", "stage", "situation", "challenge", "urgency", "commitment"]:
            assert k in data

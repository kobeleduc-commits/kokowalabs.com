from fastapi import FastAPI, APIRouter, HTTPException, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import csv
import io
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Kokowa Labs API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    website: Optional[str] = ""
    stage: str
    situation: str
    challenge: str
    urgency: str
    commitment: str
    budget: Optional[str] = ""


class Application(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str
    website: str = ""
    stage: str
    situation: str
    challenge: str
    urgency: str
    commitment: str
    budget: str = ""
    status: str = "pending_review"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "Kokowa Labs API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


@api_router.post("/applications", response_model=Application)
async def create_application(payload: ApplicationCreate):
    app_obj = Application(
        name=payload.name.strip(),
        email=str(payload.email).strip(),
        company=payload.company.strip(),
        website=(payload.website or "").strip(),
        stage=payload.stage,
        situation=payload.situation,
        challenge=payload.challenge.strip(),
        urgency=payload.urgency,
        commitment=payload.commitment,
        budget=(payload.budget or "").strip(),
    )

    if len(app_obj.challenge) < 20:
        raise HTTPException(status_code=400, detail="Challenge description is too short.")

    doc = app_obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.applications.insert_one(doc)

    webhook_url = os.environ.get("MAKE_WEBHOOK_URL", "").strip()
    if webhook_url:
        try:
            async with httpx.AsyncClient(timeout=8.0) as http:
                await http.post(webhook_url, json=doc)
        except Exception as e:
            logger.warning(f"Webhook forward failed: {e}")

    return app_obj


@api_router.get("/applications/intake-load")
async def intake_load():
    now = datetime.now(timezone.utc)
    week_ago = (now - timedelta(days=7)).isoformat()
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0).isoformat()

    week_count = await db.applications.count_documents({"created_at": {"$gte": week_ago}})
    month_count = await db.applications.count_documents({"created_at": {"$gte": month_start}})

    monthly_slots = 6
    remaining = max(1, monthly_slots - month_count)

    return {
        "in_review_this_week": week_count,
        "remaining_slots_this_month": remaining,
        "monthly_slots": monthly_slots,
    }


@api_router.get("/applications", response_model=List[Application])
async def list_applications(admin_token: Optional[str] = None):
    expected = os.environ.get("ADMIN_TOKEN", "").strip()
    if not expected or admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    rows = await db.applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get("created_at"), str):
            r["created_at"] = datetime.fromisoformat(r["created_at"])
    return rows


@api_router.patch("/applications/{app_id}/status")
async def update_application_status(app_id: str, body: dict, admin_token: Optional[str] = None):
    expected = os.environ.get("ADMIN_TOKEN", "").strip()
    if not expected or admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    new_status = (body or {}).get("status", "").strip()
    if new_status not in {"pending_review", "qualified", "declined"}:
        raise HTTPException(status_code=400, detail="Invalid status")

    res = await db.applications.update_one({"id": app_id}, {"$set": {"status": new_status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")

    return {"id": app_id, "status": new_status}


@api_router.get("/applications/export.csv")
async def export_applications_csv(admin_token: Optional[str] = None):
    expected = os.environ.get("ADMIN_TOKEN", "").strip()
    if not expected or admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    rows = await db.applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)

    columns = [
        "created_at", "status", "name", "email", "company", "website",
        "stage", "situation", "urgency", "commitment", "budget", "challenge", "id",
    ]

    buf = io.StringIO()
    writer = csv.DictWriter(buf, fieldnames=columns, extrasaction="ignore", quoting=csv.QUOTE_ALL)
    writer.writeheader()

    for r in rows:
        flat = {k: r.get(k, "") for k in columns}
        if isinstance(flat.get("challenge"), str):
            flat["challenge"] = flat["challenge"].replace("\r", " ").replace("\n", " ").strip()
        writer.writerow(flat)

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    return Response(
        content=buf.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="kokowa-applications-{today}.csv"'},
    )


@api_router.get("/applications/digest")
async def applications_digest(admin_token: Optional[str] = None, hours: int = 24):
    expected = os.environ.get("ADMIN_TOKEN", "").strip()
    if not expected or admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if hours <= 0 or hours > 24 * 30:
        raise HTTPException(status_code=400, detail="hours must be 1..720")

    since = (datetime.now(timezone.utc) - timedelta(hours=hours)).isoformat()

    rows = await db.applications.find(
        {"created_at": {"$gte": since}},
        {
            "_id": 0,
            "id": 1,
            "name": 1,
            "company": 1,
            "stage": 1,
            "urgency": 1,
            "status": 1,
            "created_at": 1,
        },
    ).sort("created_at", -1).to_list(500)

    by_status = {"pending_review": 0, "qualified": 0, "declined": 0}
    by_stage = {}
    by_urgency = {}

    for r in rows:
        by_status[r.get("status", "pending_review")] = by_status.get(r.get("status", "pending_review"), 0) + 1
        by_stage[r.get("stage", "")] = by_stage.get(r.get("stage", ""), 0) + 1
        by_urgency[r.get("urgency", "")] = by_urgency.get(r.get("urgency", ""), 0) + 1

    return {
        "window_hours": hours,
        "since": since,
        "total": len(rows),
        "by_status": by_status,
        "by_stage": by_stage,
        "by_urgency": by_urgency,
        "highlights": [
            {
                "id": r.get("id"),
                "name": r.get("name"),
                "company": r.get("company"),
                "stage": r.get("stage"),
                "urgency": r.get("urgency"),
                "status": r.get("status"),
                "created_at": r.get("created_at"),
            }
            for r in rows[:10]
        ],
    }


class SubscribeCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "site"


@api_router.post("/subscribers")
async def create_subscriber(payload: SubscribeCreate):
    email = str(payload.email).strip().lower()
    now = datetime.now(timezone.utc).isoformat()

    await db.subscribers.update_one(
        {"email": email},
        {
            "$setOnInsert": {
                "id": str(uuid.uuid4()),
                "email": email,
                "created_at": now,
            },
            "$set": {
                "last_seen_at": now,
                "source": payload.source or "site",
            },
        },
        upsert=True,
    )

    return {"ok": True}


@api_router.get("/subscribers")
async def list_subscribers(admin_token: Optional[str] = None):
    expected = os.environ.get("ADMIN_TOKEN", "").strip()
    if not expected or admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    rows = await db.subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return rows


app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

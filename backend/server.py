from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Kokowa Labs API")
api_router = APIRouter(prefix="/api")


# --- Models ---
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


# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Kokowa Labs API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
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
    doc['created_at'] = doc['created_at'].isoformat()
    await db.applications.insert_one(doc)

    # Forward to Make/Zapier webhook if configured
    webhook_url = os.environ.get('MAKE_WEBHOOK_URL', '').strip()
    if webhook_url:
        try:
            async with httpx.AsyncClient(timeout=8.0) as http:
                await http.post(webhook_url, json=doc)
        except Exception as e:
            logger.warning(f"Webhook forward failed: {e}")

    return app_obj


@api_router.get("/applications", response_model=List[Application])
async def list_applications(admin_token: Optional[str] = None):
    expected = os.environ.get('ADMIN_TOKEN', '').strip()
    if not expected or admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")
    rows = await db.applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

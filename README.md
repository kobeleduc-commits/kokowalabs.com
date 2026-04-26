# Kokowa Labs

Strategic Architecture Partner for serious specialty coffee founders.

> Premium intake system. Filtered access to high-value strategic time. Not a booking funnel.

---

## Stack

- **Frontend**: React 19 + React Router 7 + Tailwind 3 + Craco. Fraunces (display) + Manrope (body).
- **Backend**: FastAPI + Motor (async MongoDB driver) + Pydantic 2.
- **Database**: MongoDB. Local in dev, MongoDB Atlas (free M0) in production.
- **Forms**: native multi-step Apply form posting to `POST /api/applications`.
- **Webhook bridge**: optional `MAKE_WEBHOOK_URL` env var forwards every application to a Make.com / Zapier scenario.

## Routes

| Path | Purpose |
|---|---|
| `/` | Marketing home (8 sections, hero through final CTA) |
| `/approach` | Operating principles |
| `/work-with-us` | Offer stack + process + final CTA |
| `/insights` | Field notes index + Strategic Question of the Month + newsletter |
| `/insights/:slug` | Long-form field note |
| `/case-studies` | 3 anonymized engagements (footer-linked) |
| `/about` | Founder authority + curated testimonials |
| `/apply` | 7-step diagnostic application |
| `/thank-you` | Confirmation |
| `/admin` | Operator console (token-gated) |

## Backend API

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/` | none | health |
| `POST` | `/api/applications` | none | submit application + Make forward |
| `GET` | `/api/applications` | admin | list |
| `PATCH` | `/api/applications/{id}/status` | admin | qualify / decline / pending |
| `GET` | `/api/applications/intake-load` | none | public counter (no PII) |
| `GET` | `/api/applications/export.csv` | admin | CSV export |
| `GET` | `/api/applications/digest?hours=N` | admin | Make-ready summary |
| `POST` | `/api/subscribers` | none | newsletter capture (idempotent upsert) |
| `GET` | `/api/subscribers` | admin | list |

---

## Free deployment guide (recommended path)

This project is built to deploy free on this stack:

| Layer | Provider | Free tier |
|---|---|---|
| Frontend | **Vercel** | unlimited static hosting, CI/CD from GitHub |
| Backend | **Render** | one free Python web service (sleeps after 15 min idle) |
| Database | **MongoDB Atlas** | 512 MB free M0 cluster |

GitHub Pages alone is **not** sufficient because the backend is a FastAPI service. Pages can host the frontend only.

### 0. Push to GitHub

Use the **"Save to GitHub"** button in the chat input. It pushes the full repository (with all the configs below already in place) to your GitHub account.

### 1. MongoDB Atlas (database)

1. Sign up at https://www.mongodb.com/cloud/atlas (free)
2. Create an **M0 free cluster** (any region)
3. **Database Access** → Add Database User → save the username and password
4. **Network Access** → Add IP Address → `0.0.0.0/0` (allow all, simplest for free tier)
5. **Connect** → Drivers → copy the connection string. Looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 2. Render (backend)

1. Sign up at https://render.com (free, GitHub login)
2. **New** → **Blueprint** → connect your GitHub repo
3. Render reads `render.yaml` and proposes the `kokowa-labs-api` service
4. Set the env vars in the Render dashboard:
   - `MONGO_URL` = your Atlas connection string
   - `DB_NAME` = `kokowa_labs_prod`
   - `CORS_ORIGINS` = `https://YOUR-FRONTEND.vercel.app` (set after step 3, comma-separated)
   - `ADMIN_TOKEN` = a strong random string (rotate from the dev value)
   - `MAKE_WEBHOOK_URL` = optional, leave empty if no Make scenario yet
5. Deploy. Note the URL Render gives you (`https://kokowa-labs-api.onrender.com`).
6. Test: `curl https://kokowa-labs-api.onrender.com/api/` → `{"message":"Kokowa Labs API"}`

> **Free-tier note**: Render free services sleep after 15 min of inactivity. The first request after a sleep takes ~30 seconds to wake. For a low-traffic intake site this is acceptable. If you ever want zero cold starts, upgrade Render to the $7/month Starter plan.

### 3. Vercel (frontend)

1. Sign up at https://vercel.com (free, GitHub login)
2. **Add New Project** → import your GitHub repo
3. Vercel auto-detects React. **Important: set `Root Directory` to `frontend`** in the project setup.
4. Build settings (auto-filled from `frontend/vercel.json`):
   - **Build command**: `yarn build`
   - **Output directory**: `build`
   - **Install command**: `yarn install --frozen-lockfile`
5. Set the env var:
   - `REACT_APP_BACKEND_URL` = the Render URL from step 2 (`https://kokowa-labs-api.onrender.com`)
6. Deploy. Vercel gives you a URL like `https://kokowa-labs.vercel.app`.

### 4. Tighten CORS

Once you know the Vercel URL, go back to Render and set:

```
CORS_ORIGINS=https://kokowa-labs.vercel.app
```

Save. Render auto-redeploys.

### 5. (Optional) Custom domain

- **Vercel** dashboard → Domains → add `kokowalabs.com`. Vercel gives you DNS records.
- Configure DNS at your registrar (see "Email domain" section below for SPF / DKIM / DMARC).
- Update `CORS_ORIGINS` on Render to include `https://kokowalabs.com`.

---

## Files added for external deployment

| File | Purpose |
|---|---|
| `frontend/vercel.json` | Vercel build config + SPA rewrites + asset cache headers |
| `render.yaml` | Render Blueprint Infrastructure as Code |
| `backend/.env.example` | Backend env template (commit this; never commit real `.env`) |
| `frontend/.env.example` | Frontend env template |
| `.gitignore` updates | Excludes `.env` files everywhere; keeps `.env.example` |
| `scripts/check-no-emdash.sh` | CI guard: rejects em-dash characters in source (brand rule) |

## Build commands and outputs

### Frontend

```
cd frontend
yarn install --frozen-lockfile
yarn build
```

Output folder: `frontend/build/`

### Backend

```
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8000
```

There is no build step for the backend; FastAPI runs from source.

---

## Required environment variables

### Backend (Render)
| Var | Required | Example |
|---|---|---|
| `MONGO_URL` | yes | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `DB_NAME` | yes | `kokowa_labs_prod` |
| `CORS_ORIGINS` | yes | `https://kokowa-labs.vercel.app` |
| `ADMIN_TOKEN` | yes | a strong random string |
| `MAKE_WEBHOOK_URL` | no | empty unless Make.com scenario is live |

### Frontend (Vercel)
| Var | Required | Example |
|---|---|---|
| `REACT_APP_BACKEND_URL` | yes | `https://kokowa-labs-api.onrender.com` |

---

## Local development

```
# Backend
cd backend
cp .env.example .env       # edit values
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend (separate terminal)
cd frontend
cp .env.example .env       # edit REACT_APP_BACKEND_URL=http://localhost:8001
yarn install
yarn start
```

---

## Funnel system (operator)

```
Application -> POST /api/applications
            -> MongoDB (applications collection)
            -> MAKE_WEBHOOK_URL (Make.com scenario, if configured)
                 - Qualified  -> approval email + hidden Calendly link
                 - Unqualified -> polite decline email
```

The Calendly link is **never** in the codebase. It lives only inside the Make.com approval template.
Suggested Calendly event title: **Strategic Session** (distinct from Strategic Diagnostic Intensive).

## Email domain (DNS)

Set on the registrar / DNS provider:

- **SPF**: `v=spf1 include:_spf.google.com include:sendgrid.net -all` (adjust to email provider)
- **DKIM**: TXT record provided by the email provider (Google Workspace / SendGrid / Resend)
- **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:dmarc@kokowalabs.com; adkim=s; aspf=s`

Recommended sender pattern: `kobe@kokowalabs.com`, `hello@kokowalabs.com`.

## Email flows (templates live in Make.com)

- **Approval**: subject "You're invited to a strategic session"
- **Rejection**: respectful, selective tone
- **Pre-call**: preparation instructions
- **Post-call**: summary + next steps

## SEO

- `Organization` JSON-LD in `frontend/public/index.html` (founder = Kobe Leduc)
- Open Graph tags
- Premium meta description

## Brand rules (locked, do not violate)

- Positioning: **Strategic Architecture Partner**, not consultant
- Tagline: **The New Game of Coffee™** (used once, with TM)
- No em-dashes anywhere in copy. Enforced by `scripts/check-no-emdash.sh`.
- No fluff, no startup language
- Tone: calm authority, selective, intelligent, premium
- Top nav locked: Approach / Work With Us / Insights / About + sticky Apply

## Admin access

- URL: `/admin`
- Token: set on Render as `ADMIN_TOKEN`
- First-use convenience: `/admin?token=...` (token is then moved to localStorage and removed from the URL)
- Tabs: Applications / Subscribers / 7-day Digest

## Brand guard

```
bash scripts/check-no-emdash.sh
```

Runs in <1 second. Fails the build if any em-dash slipped into source.

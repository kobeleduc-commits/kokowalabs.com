# Kokowa Labs

Strategic Architecture Partner for serious specialty coffee founders.

## Stack

- **Frontend**: React 19 + React Router 7 + Tailwind + Fraunces / Manrope
- **Backend**: FastAPI + Motor (MongoDB)
- **Forms**: Native multi-step Apply form posting to `POST /api/applications`
- **Webhook bridge**: Optional `MAKE_WEBHOOK_URL` env var forwards every application to Make/Zapier

## Routes

- `/` Home (hero + problem + new game + positioning + offer stack + process + scarcity + final CTA)
- `/approach`
- `/work-with-us`
- `/insights`
- `/about`
- `/apply` (7-step diagnostic application)
- `/thank-you`

## Backend API

| Method | Path                     | Description                                   |
|--------|--------------------------|-----------------------------------------------|
| GET    | `/api/`                  | Health                                        |
| POST   | `/api/applications`      | Public. Submit application. Forwards to Make. |
| GET    | `/api/applications`      | Admin. Requires `?admin_token=...` matching `ADMIN_TOKEN` env. |

## Environment variables (backend/.env)

```
MONGO_URL=...                 # provided
DB_NAME=...                   # provided
MAKE_WEBHOOK_URL=             # optional Make.com / Zapier inbound webhook
ADMIN_TOKEN=                  # optional. Required to read /api/applications
```

## Funnel system

```
Application → POST /api/applications
            → MongoDB (applications)
            → MAKE_WEBHOOK_URL  (Make scenario)
                 ├─ Qualified  → approval email + hidden Calendly link
                 └─ Unqualified → polite decline email
```

The Calendly link is **hidden**: not exposed publicly, sent only by Make after approval.
Suggested page title in Calendly: **Strategic Session** (distinct from Strategic Diagnostic Intensive).

## Email domain (DNS to set on the domain registrar)

To make outbound emails feel premium and not land in spam:

- **SPF**:    `v=spf1 include:_spf.google.com include:sendgrid.net -all` (adjust to provider)
- **DKIM**:   public key TXT record provided by the email provider (Google Workspace / SendGrid / Resend)
- **DMARC**:  `v=DMARC1; p=quarantine; rua=mailto:dmarc@kokowalabs.com; adkim=s; aspf=s`

Recommended sender pattern: `kobe@kokowalabs.com`, `hello@kokowalabs.com`.

## Email flows (templates copy lives in Make)

- **Approval**: subject "You're invited to a strategic session"
- **Rejection**: respectful, selective tone
- **Pre-call**: preparation instructions
- **Post-call**: summary + next steps

## SEO

- `Organization` JSON-LD in `public/index.html` (founder = Kobe Leduc)
- Open Graph tags
- Premium meta description

## Brand rules (locked)

- Positioning: **Strategic Architecture Partner**, not consultant
- Tagline: **The New Game of Coffee™** (used once, with TM)
- No em-dashes anywhere in copy
- No fluff, no startup language
- Tone: calm authority, selective, intelligent, premium

## Local dev

Backend and frontend are managed by supervisor. Hot reload is enabled.

```
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

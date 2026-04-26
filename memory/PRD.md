# Kokowa Labs — PRD

## Original problem statement
Build a high-end strategic advisory site for **Kokowa Labs** (founder: Kobe Leduc), positioned as a **Strategic Architecture Partner** for serious specialty coffee founders, not a generic consultant. Premium, McKinsey-grade intake feel. NOT a booking funnel — a **filtered access system** to high-value strategic time.

## Core positioning (locked)
- 15+ years across the full value chain (origin to crema)
- Strategic Architecture Partner, not consultant
- Audience: serious founders only
- Tone: calm authority, selective, intelligent, premium
- Tagline: **The New Game of Coffee™** (used once, with TM)
- No em-dashes anywhere in copy (CI guard at `scripts/check-no-emdash.sh`)

## Architecture
- React 19 + React Router 7 + Tailwind + craco
- Fraunces (display) + Manrope (body)
- Cream `#F2EBDF` / espresso ink `#1A1410` / copper `#B0653F` / gold `#C8A26A`
- FastAPI backend + Motor MongoDB
- `ADMIN_TOKEN` env-var protected operator console
- Optional `MAKE_WEBHOOK_URL` forward on every new application

## Routes
| Path | Purpose |
|---|---|
| `/` | Marketing home (8 sections) |
| `/approach` | Operating principles |
| `/work-with-us` | Offer stack + process + final CTA |
| `/insights` | Field notes index + Strategic Question of the Month + newsletter |
| `/insights/:slug` | Long-form field note |
| `/case-studies` | 3 anonymized engagements (linked from footer only) |
| `/about` | Founder authority + curated testimonials |
| `/apply` | 7-step diagnostic application |
| `/thank-you` | Confirmation |
| `/admin` | Operator console (token-gated) |

## Backend API
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET    | `/api/` | none | health |
| POST   | `/api/applications` | none | submit application + Make forward |
| GET    | `/api/applications` | admin | list |
| PATCH  | `/api/applications/{id}/status` | admin | qualify / decline / pending |
| GET    | `/api/applications/intake-load` | none | public counter (no PII) |
| GET    | `/api/applications/export.csv` | admin | CSV export |
| GET    | `/api/applications/digest?hours=N` | admin | Make-ready summary |
| POST   | `/api/subscribers` | none | newsletter capture (idempotent upsert) |
| GET    | `/api/subscribers` | admin | list |

## Iterations

### Iteration 1 (2026-04-26) — Marketing foundation
Marketing site, 8-section home, sticky Apply CTA, Apply form, SEO JSON-LD, README. 100% / 100% green.

### Iteration 2 (2026-04-26) — Operations and authority
Live intake counter pill, /admin with token gate + filter + drawer + status mutation, /insights/:slug detail pages with 4 long-form field notes. 100% / 100% green.

### Iteration 3 (2026-04-26) — Backlog completion
- **CSV export** of applications from /admin
- **Newsletter system**: POST /api/subscribers (idempotent), wired from /insights, viewable in /admin Subscribers tab
- **Anonymous case studies** at /case-studies (3 engagements, footer-linked, top nav locked)
- **Make-ready digest endpoint** GET /api/applications/digest, viewable in /admin Digest tab with copy-paste Make snippet
- **Strategic Question of the Month** featured block at top of /insights
- **CI guard**: `scripts/check-no-emdash.sh` blocks future em-dash regressions
- 100% / 100% green (27 backend pytest, 14 frontend assertions)

## Constraints respected (verified)
- 0 em-dashes anywhere in rendered text (audited on / /insights /case-studies /admin)
- "The New Game of Coffee™" used exactly once
- Top nav locked: Approach / Work With Us / Insights / About + sticky Apply (Case Studies is footer-only)
- No testimonial submission form
- All offers framed as outcomes
- All admin endpoints token-gated

## Backlog (require external assets, ready to plug in)
- Real `MAKE_WEBHOOK_URL` plug-in (env-driven, ready)
- Real founder portrait file (drop into `frontend/src/lib/images.js` `founder` key)
- Live Calendly hidden link (referenced inside Make's approval template only)
- DNS records on kokowalabs.com (SPF/DKIM/DMARC documented in README)
- SMTP provider for actual sending of approval/decline/pre-call/post-call templates (currently those live as Make templates, not in code)

## Notable design decisions
- `monthly_slots = 6` is a brand promise; public counter clamps remaining ≥ 1
- Calendly link never lives in code — only in Make
- Admin token: URL param accepted once, then moved to localStorage and stripped from URL
- Subscribers `email` is normalized to lowercase + upsert keyed on email (no duplicates)
- Top nav locked at 4 items by brand brief; new sections (Case Studies) reach via footer

# Kokowa Labs — PRD

## Original problem statement
Build a high-end strategic advisory site for **Kokowa Labs** (founder: Kobe Leduc), positioned as a **Strategic Architecture Partner** for serious specialty coffee founders, not a generic consultant. Premium, McKinsey-grade intake feel. NOT a booking funnel — a **filtered access system** to high-value strategic time.

## Core positioning (locked)
- 15+ years across the full value chain (origin to crema)
- Strategic Architecture Partner, not consultant
- Audience: serious founders only
- Tone: calm authority, selective, intelligent, premium
- Tagline: **The New Game of Coffee™** (used once, with TM)
- No em-dashes anywhere in copy

## Architecture
- React 19 + React Router 7 + Tailwind + craco
- Fraunces (display) + Manrope (body) — deliberately avoiding AI-slop fonts
- Color palette: cream `#F2EBDF` / espresso ink `#1A1410` / copper accent `#B0653F` / gold `#C8A26A`
- Grain texture overlay, premium whitespace, minimalist motion
- FastAPI backend + Motor MongoDB
- Native multi-step Apply form → POST /api/applications → optional Make.com webhook forward
- Admin gate via `ADMIN_TOKEN` env var, persisted in localStorage on the client

## What's been implemented

### Iteration 1 (2026-04-26)
- Full marketing site (Approach / Work With Us / Insights / About / Apply / Thank-you)
- 8-section home (Hero / Problem / New Game / Positioning / Offer Stack / Process / Scarcity / Final CTA)
- Sticky Apply CTA, all required strict copy enforced
- Backend: POST /api/applications with optional MAKE_WEBHOOK_URL forward
- SEO: Organization JSON-LD with founder Kobe Leduc, OG tags
- README with DNS (SPF/DKIM/DMARC) and funnel documentation
- 100% backend + 100% frontend testing_agent_v3 iteration_1

### Iteration 2 (2026-04-26)
- **Live intake counter**: `GET /api/applications/intake-load` (public, no PII) + animated "Currently reviewing X applications this week" pill in Scarcity + "remaining slots" stat — reinforces filtered-access positioning
- **Operational admin dashboard** at `/admin`:
  - Token gate (URL param accepted once then moved to localStorage and stripped from URL — no leak via history/Referer)
  - Filter pills (All / Pending / Qualified / Declined) with live counts
  - Detail drawer with full application context
  - PATCH `/api/applications/{id}/status` to mark qualified or declined
  - Standalone shell — no marketing nav/footer leakage
- **Real `/insights/:slug` detail pages** with 4 written field notes (Positioning / Economics / Sequencing / Differentiation), each with cover image, multi-section body, "Continue reading" next link, and Apply CTA
- 100% backend + 100% frontend testing_agent_v3 iteration_2 (16 backend tests, 14 frontend assertions, em-dash policy enforced across all surfaces)

## Constraints respected
- No em-dashes anywhere in user-facing copy (verified by tests on / /insights /insights/:slug /admin)
- "The New Game of Coffee™" used exactly once
- No testimonial submission form (only curated)
- No purple/violet AI-slop gradient
- All offers framed as outcomes, not services

## Backlog

### P1 — needs external input
- Plug real `MAKE_WEBHOOK_URL` (Make scenario inbound) into `backend/.env`
- Replace Unsplash founder portrait with Kobe's actual photo
- Configure DNS (SPF/DKIM/DMARC) on `kokowalabs.com`
- Set up the hidden Calendly "Strategic Session" event and reference inside Make's approval template

### P2 — content & polish
- Strategic Diagnostic anonymous case-study page (proof without breaking selectivity)
- Newsletter capture wired to Resend / ConvertKit (currently UI only)
- Application export (CSV) from /admin
- Email digest of new applications to Kobe (daily summary via Make)

### P3 — engagement depth
- Gated long-form Insights (PDF download in exchange for email)
- Founder video introduction in About hero
- "Strategic question of the month" companion to each Insight

## Notable design decisions
- `monthly_slots = 6` is the static brand promise. The public `intake-load` endpoint clamps `remaining` to a minimum of 1 so the live pill never reads 0 or negative.
- The Calendly link is intentionally never exposed in the codebase. It belongs only inside the Make approval template.
- Admin token can be passed once via `?token=...` for first-use convenience, then it is moved into `localStorage` and the URL is cleaned. No long-term leak vector.

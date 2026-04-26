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
- Fraunces (display, distinctive serif) + Manrope (body) — deliberately avoiding Inter/Roboto AI-slop fonts
- Color palette: cream `#F2EBDF` / espresso ink `#1A1410` / copper accent `#B0653F` / gold `#C8A26A`
- Grain texture overlay, premium whitespace, minimalist motion
- FastAPI backend + Motor MongoDB
- Native multi-step Apply form → POST /api/applications → optional Make.com webhook forward

## What's been implemented (2026-04-26)
- Full nav: Approach / Work With Us / Insights / About + sticky **Apply** CTA (header-apply-cta)
- Home page with all required sections in order:
  - Hero (exact headline + subheadline + 'See How It Works' anchor + 'Apply for Strategic Diagnostic')
  - Problem (4 bullets + 'Passion is not enough. Precision is.')
  - New Game ('The Rules Have Changed.' + 'Quality is expected. Strategy is rare.')
  - Positioning ('We Don't Consult. We Architect.' + comparison grid)
  - Offer Stack (3 cards: Strategic Diagnostic Intensive / Coffee Business Architecture Sprint / Strategic Advisory; framed as outcomes)
  - Process (4 steps: Apply / Qualification / Strategic Session / Deeper Engagement + 'This is not a sales call. This is a strategic working session.')
  - Scarcity ('We only work with a limited number of founders per month.')
  - Final CTA (dark cinematic)
- Approach page (4 operating principles + origin-to-crema)
- Work With Us page (re-uses Offer Stack + Process + Scarcity + Final CTA)
- Insights page (4 field notes + newsletter)
- About page (founder portrait + curated testimonials only — no submission form)
- Apply page (7-step structured form: Identity / Stage / Situation / Challenge / Urgency / Commitment / Budget) with confidentiality note
- Thank-you page ('We review every application carefully. If there is a strong fit, you will receive a personal invitation.')
- Backend: POST /api/applications (validation + persistence + optional Make webhook), GET /api/applications (token-protected)
- SEO: Organization JSON-LD with founder Kobe Leduc, OG tags, premium meta description
- README with DNS (SPF/DKIM/DMARC) and funnel documentation
- 100% backend + 100% frontend test coverage (testing_agent_v3 iteration_1)

## Constraints respected
- No em-dashes anywhere in user-facing copy (verified by tests)
- 'The New Game of Coffee™' used exactly once
- No testimonial submission form (only curated)
- No purple/violet AI-slop gradient
- All offers framed as outcomes, not services

## P1 backlog
- Real Tally/Typeform option behind feature flag (currently native form is preferred for control)
- Insights detail pages (`/insights/:slug`) once content is written
- Real founder portrait (currently Unsplash placeholder)
- Connect Make.com webhook + Calendly hidden link in production

## P2 backlog
- Newsletter capture wired to ConvertKit / Resend audience
- Gated long-form Insights (PDF download in exchange for email)
- Strategic Diagnostic case-study page (anonymous results)
- /admin protected dashboard for browsing applications

## Deferred
- Email template copy lives in Make (not the website itself)
- DNS setup is the operator's responsibility (documented in README)

## Known notes
- `MAKE_WEBHOOK_URL` and `ADMIN_TOKEN` env vars are optional. App functions without them.

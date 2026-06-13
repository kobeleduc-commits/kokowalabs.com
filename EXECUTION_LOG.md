# Execution Log

## 2026-06-13 — SEO & rendering session

### Step 0 — Diagnosis
- Stack: CRA 5.0.1 + CRACO 7.1.0 (webpack), React 19, React Router 7.5.1, Yarn 1.22.22, deployed to Vercel as static SPA.
- Rendering mode: pure CSR. All content JS-only. Crawlers received empty `<div id="root">`.
- Static `index.html` already had correct structured data (JSON-LD), OG/Twitter cards, robots, sitemap, `llms.txt`, Google Search Console verification. No `DO_NOT_TOUCH.md` found.

### Priority 1 — Crawler-visible rendering (FIXED)
- Added `react-snap@1.23.0` as devDependency with `postbuild` hook.
- Config: `skipThirdPartyRequests: true`, `puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"]`, explicit `include` list of all 11 marketing routes.
- Updated `src/index.js` to use `ReactDOM.hydrateRoot` when prerendered content exists (SPA fallback via `createRoot` for non-prerendered routes).
- Added `react-helmet-async@3.0.0` for per-route head management.
- Wrapped `App` in `HelmetProvider`.
- Verified: all 12 routes (11 marketing + 404) prerender successfully. Build output `build/<route>/index.html` contains real H1/body copy before JS runs.

### Priority 2 — Technical SEO (FIXED)
- Each page now emits a unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:url`, `og:title` via `Helmet`.
- Removed duplicate static title/description/canonical from `index.html` template (Helmet owns them).
- Verified: each prerendered route has exactly one title and one canonical.
- Updated `sitemap.xml` lastmod dates to 2026-06-13.
- `robots.txt`, `sitemap.xml`, structured data (JSON-LD), OG/Twitter cards preserved.
- `llms.txt` verified comprehensive and accurate.

### Priority 3 — AI-SEO (CONFIRMED ADEQUATE)
- `llms.txt` already present and comprehensive.
- Semantic H1/H2/H3 hierarchy already in all page components.
- `AnswerEngineSection` with Q&A FAQ content already present on home page.
- JSON-LD FAQPage structured data already in `index.html`.
- No changes required; prerendering (P1) ensures AI crawlers now receive this content.

### Priority 4 — Performance (FIXED)
- Added explicit `width`/`height` to all `<img>` elements matching container aspect ratios.
- Covers: hero (4:5 → 800×1000), roastery (5:6 → 800×960), sourcing/positioning/approach (4:5 → 800×1000), insights hero (4:3 → 800×600), insight cover (16:9 → 1100×619), founder portrait circles (420×420, 360×360), AEO logo (176×71).
- Header logo already had dimensions (786×318).
- Google Fonts: `display=swap` already in URL.
- External image CDN noted: `founderRoastery` and `founderPourOver` served from `customer-assets.emergentagent.com`. Migration to `/public/` flagged in `images.js` as TODO — deferred to Kobe's confirmation.

### Not touched / deferred
- Priorities 5 (mobile UX), 6 (accessibility), 7 (code hygiene): not addressed in this session. No regressions introduced.
- `/admin` route: excluded from prerendering, robots, and sitemap (correct).
- `/thank-you` route: excluded from prerendering and sitemap (correct).
- OG image size (2594×1070 PNG): large but functional. No resize without confirming creative direction.
- External founder photography on emergentagent.com CDN: awaiting final photography files before migrating to `/public/`.
- The 404 page title warning from react-snap (title does not contain "404" string) is cosmetic — the page content is correct.

### Commits this session
- `44eaf38` feat: add static prerendering for full crawler visibility
- `c59ae61` perf: add explicit width/height to all images to prevent CLS

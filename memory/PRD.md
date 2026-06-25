# Kokowa Labs — kokowalabs.com

## Probleem (diagnose 2026-06-24/25)
Live site www.kokowalabs.com toonde een blanco pagina.
Root cause: JS runtime-fout `CaseStudies is not defined` — in frontend/src/App.js
werd `<CaseStudies />` (route /case-studies) gebruikt zonder import.
React crashte daardoor volledig (lege #root).

## Fix
- frontend/src/App.js: ontbrekende `import CaseStudies from "@/pages/CaseStudies";` toegevoegd.
- Geverifieerd op preview: homepage + /case-studies renderen correct, geen console-fouten.

## Bron
Echte broncode opgehaald uit GitHub repo: kobeleduc-commits/kokowalabs.com
(workspace bevatte voorheen alleen Emergent-boilerplate).

## Next
- Fix moet naar GitHub gepusht + opnieuw gedeployed worden op Vercel om live te gaan.

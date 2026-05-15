# DO_NOT_TOUCH.md

Compact boundaries for Kokowa repositories so Claude Code avoids costly changes without explicit approval.

## Do not touch
- **Config & secrets:** .env files, environment variables, render.yaml, .gitkeep/.gitconfig/.gitignore, and any secret keys.
- **Core code & assets:** all files in `backend`, `frontend`, `scripts`, `tests`, `test_reports`, `memory`, `.emergent` or any compiled/static assets.
- **Infrastructure & integrations:** DNS records, auth modules, payment flows, database schemas, serverless functions and external API keys.
- **Build descriptors:** `package.json`, lock files, build scripts, Dockerfiles, deployment descriptors and any configuration under `/config`.
- **Routes & endpoints:** API definitions or anything controlling routing.
- **Context documents:** `CLAUDE.md`, this file and any existing boundary docs.

## Risky changes
- Deleting or rewriting routes, controllers or middlewares.
- Editing payment, auth or database logic.
- Adding/removing dependencies or changing build tools.
- Modifying domains, DNS, env variables or secrets.
- Renaming/removing project directories.

## Approval required
- Architectural or database migrations.
- Dependency upgrades or third‑party integrations.
- CI/CD, deployment or infrastructure changes.
- Changes to production content, pricing or legal text.

## Rollback discipline
- Work in feature branches; keep commits small and revertible.
- Use clear commit messages; avoid bundling unrelated changes.
- Test locally before PRs; never push to main directly.
- Revert promptly and document when issues occur.

## Token efficiency
- Inspect only relevant files for each task; avoid scanning entire modules.
- Summarize necessary context instead of loading large code blocks.
- When unsure, ask for clarity rather than exploring the whole repo.

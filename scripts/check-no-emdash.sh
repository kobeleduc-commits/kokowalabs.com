#!/usr/bin/env bash
# Kokowa Labs brand guard.
# Fails if any em-dash (U+2014) is present in user-facing source.
# Run locally:    bash scripts/check-no-emdash.sh
# Hook into CI to prevent regressions of the strict brand rule.

set -e

if grep -rn $'\u2014' /app/frontend/src/ /app/backend/server.py 2>/dev/null; then
  echo ""
  echo "ERROR: em-dash character found in source. Brand rule: no em-dashes in copy."
  exit 1
fi

echo "OK: 0 em-dashes in source."

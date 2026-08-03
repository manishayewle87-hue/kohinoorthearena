#!/usr/bin/env bash
# Performance audit using Lighthouse (mobile & desktop)
# Starts the dev server, waits for it, runs Lighthouse, saves reports, then shuts down.

# Start dev server in background
npm run dev &
DEV_PID=$!

# Wait for server to be ready (max 30s)
timeout 30s bash -c "while ! curl -s http://localhost:3000 > /dev/null; do sleep 1; done"

# Run mobile Lighthouse
npx lighthouse http://localhost:3000 \
  --output=json --output=html --quiet \
  --chrome-flags='--headless' \
  --output-path=audit-reports/lighthouse-mobile.json

# Run desktop Lighthouse
npx lighthouse http://localhost:3000 \
  --output=json --output=html --quiet \
  --chrome-flags='--headless' \
  --preset=desktop \
  --output-path=audit-reports/lighthouse-desktop.json

# Kill dev server
kill $DEV_PID

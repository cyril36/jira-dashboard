#!/bin/sh
# Replace the build-time placeholder with the runtime INTERNAL_API_URL.
# When INTERNAL_API_URL is set, Next.js fallback rewrites proxy API calls
# to the internal backend service (no external route needed).
if [ -n "$INTERNAL_API_URL" ]; then
  echo "Enabling API proxy → $INTERNAL_API_URL"
  find /app/.next -name '*.json' -exec \
    sed -i "s|http://__INTERNAL_API_PLACEHOLDER__|${INTERNAL_API_URL}|g" {} +
fi

exec node server.js

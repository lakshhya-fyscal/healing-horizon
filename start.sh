#!/bin/bash

cd "$(dirname "$0")"

echo "Starting GTM Collateral Studio..."

# Start Docker if not running
if ! docker info > /dev/null 2>&1; then
  echo "Starting Docker..."
  open -a Docker
  echo "Waiting for Docker..."
  until docker info > /dev/null 2>&1; do sleep 2; done
  echo "Docker ready."
fi

# Start containers
docker compose up -d

# Wait for healthy
echo "Waiting for Postgres and Redis..."
until docker compose ps | grep -q "(healthy)"; do sleep 2; done
echo "Containers ready."

# Start dev servers
npm run dev:all &

# Wait then open browser
sleep 4
open http://localhost:5173/gtm-studio.html

echo ""
echo "GTM Studio is running at http://localhost:5173/gtm-studio.html"
echo "Press Ctrl+C to stop."
wait

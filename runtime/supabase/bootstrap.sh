#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENDOR_DIR="${ROOT_DIR}/vendor"
mkdir -p "${VENDOR_DIR}"

COMPOSE_URL="https://raw.githubusercontent.com/supabase/supabase/master/docker/docker-compose.yml"
ENV_URL="https://raw.githubusercontent.com/supabase/supabase/master/docker/.env.example"
VECTOR_CONFIG_URL="https://raw.githubusercontent.com/supabase/supabase/master/docker/volumes/logs/vector.yml"

echo "[abay] Downloading Supabase self-hosted compose + env template..."
# Download files only if they don't exist to avoid write conflicts
if [[ ! -f "${VENDOR_DIR}/docker-compose.yml" ]]; then
  curl -fsSL "${COMPOSE_URL}" -o "${VENDOR_DIR}/docker-compose.yml.tmp" && mv "${VENDOR_DIR}/docker-compose.yml.tmp" "${VENDOR_DIR}/docker-compose.yml"
fi
if [[ ! -f "${VENDOR_DIR}/.env.example" ]]; then
  curl -fsSL "${ENV_URL}" -o "${VENDOR_DIR}/.env.example.tmp" && mv "${VENDOR_DIR}/.env.example.tmp" "${VENDOR_DIR}/.env.example"
fi

# Ensure vector.yml config exists (required for vector service)
mkdir -p "${VENDOR_DIR}/volumes/logs"
if [[ ! -f "${VENDOR_DIR}/volumes/logs/vector.yml" ]]; then
  curl -fsSL "${VECTOR_CONFIG_URL}" -o "${VENDOR_DIR}/volumes/logs/vector.yml.tmp" && mv "${VENDOR_DIR}/volumes/logs/vector.yml.tmp" "${VENDOR_DIR}/volumes/logs/vector.yml"
  echo "[abay] Created ${VENDOR_DIR}/volumes/logs/vector.yml"
fi

# Ensure database initialization SQL files exist
mkdir -p "${VENDOR_DIR}/volumes/db"
DB_FILES=("_supabase.sql" "logs.sql" "pooler.sql" "realtime.sql" "roles.sql" "webhooks.sql" "jwt.sql")
for file in "${DB_FILES[@]}"; do
  if [[ ! -f "${VENDOR_DIR}/volumes/db/${file}" ]]; then
    curl -fsSL "https://raw.githubusercontent.com/supabase/supabase/master/docker/volumes/db/${file}" -o "${VENDOR_DIR}/volumes/db/${file}.tmp" && mv "${VENDOR_DIR}/volumes/db/${file}.tmp" "${VENDOR_DIR}/volumes/db/${file}"
    echo "[abay] Created ${VENDOR_DIR}/volumes/db/${file}"
  fi
done

if [[ ! -f "${VENDOR_DIR}/.env" ]]; then
  cp "${VENDOR_DIR}/.env.example" "${VENDOR_DIR}/.env"
  echo "[abay] Created ${VENDOR_DIR}/.env from .env.example"
  echo "[abay] IMPORTANT: edit secrets in ${VENDOR_DIR}/.env before production use."
fi

echo "[abay] Supabase vendor files ready at ${VENDOR_DIR}"

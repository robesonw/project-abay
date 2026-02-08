# Supabase runtime (Option A)

We use the official Supabase self-hosted Docker Compose setup, but we **download upstream files**
to avoid hardcoding them in Abay.

Sources:
- Supabase self-hosting docs: https://supabase.com/docs/guides/self-hosting/docker
- Official docker compose: https://raw.githubusercontent.com/supabase/supabase/master/docker/docker-compose.yml

After bootstrap, files are stored in:
- `runtime/supabase/vendor/docker-compose.yml`
- `runtime/supabase/vendor/.env`

Ports (default):
- Studio via Kong gateway: http://localhost:8000

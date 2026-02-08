# Project Abay (working name)

Spec-first, local-first SaaS compiler. **AI proposes intent → AppSpec becomes truth → deterministic generators create a runnable SaaS stack**.

This repo is the **Phase 0/Phase 1 starter**:
- AppSpec v0.1 (draft) + JSON schema
- CLI skeleton (`abay`) with commands: init / prompt (stub) / generate (stub) / up / down / status
- Local runtime: **Supabase self-hosted (Docker Compose)** bootstrapped from official upstream files

> Note: We intentionally download the official Supabase Compose + env template at runtime so we don't hardcode a giant vendor file in this repo.

---

## Prereqs
- Node.js 18+ (or 20+)
- Docker Desktop (or Docker Engine + Compose)
- git (optional)

---

## Quick start (local runtime only)
```bash
# 1) install CLI deps
cd cli
npm install

# 2) run from source (dev)
npm run dev -- init ../demo
npm run dev -- up ../demo

# 3) open Supabase Studio
# http://localhost:8000  (default from Supabase compose)
```

---

## Project layout
- `cli/` - Abay CLI (TypeScript)
- `schemas/` - AppSpec schema (JSON Schema)
- `examples/` - example AppSpec(s)
- `runtime/` - runtime bootstrappers (Supabase docker compose download + helpers)

---

## Phase 0 decisions baked into this starter
- **Option A runtime**: Supabase self-hosted Docker Compose (official)
- **Spec-first**: `appspec.yaml` is the source of truth
- **AI boundaries**: AI generates/repairs spec only (codegen remains deterministic)

---

## Next milestones
1. Implement `prompt` (AI provider abstraction + BYOK + managed)
2. Implement deterministic `generate` (Next.js CRUD app + migrations)
3. Implement `plan/apply` upgrade workflow (diff + migrations + regen safety)

# Project Abay Phases (high-level)

## Phase 0 - Charter & boundaries (done in conversation)
- Spec-first, deterministic generation
- Supabase self-hosted runtime (Option A)
- AI proposes spec only
- BYOK supported

## Phase 1 - AppSpec v0.1 + CLI skeleton (this repo)
- app spec example + schema
- CLI init/up/down/status
- runtime bootstrap downloads official Supabase compose

## Phase 2 - AI Prompt -> AppSpec (next)
- provider abstraction (OpenAI/Azure/Anthropic/OpenRouter) + BYOK
- prompt templates + repair loop
- store assumptions/confidence

## Phase 3 - Deterministic generate (Next.js + migrations)
- generate CRUD pages
- generate SQL migrations (RLS-ready)
- repeatable output

## Phase 4 - Lifecycle: plan/apply upgrades
- diff spec -> DB + code changes
- drift detection and locks

## Phase 5 - SaaS primitives pack
- workflow + approvals + audit baseline

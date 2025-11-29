# Worklog / Handover (MVP - 2025-11-29)

## Latest Commits
- `5b775c2` feat: add autosave ui and mutation wiring
- `f5861e4` chore: switch prisma seed to tsx and update lockfile
- `ecc08fd` feat: add mutation APIs and fallback identity

## Backend / DB
- Prisma schema + initial migration (create-only) committed: `prisma/migrations/20251129093229_init/`.
- Seed runs with `npm run prisma:seed` (uses `tsx prisma/seed.ts`). Requires `DATABASE_URL`.
- API routes:
  - Profile: GET/PATCH `/api/profile` (fallback user `user-1`, mock if no DB).
  - Races: GET/POST `/api/races`, PATCH `/api/races/[id]`.
  - Sessions: GET/POST `/api/sessions`, PATCH `/api/sessions/[id]`.
  - Guards: if `DATABASE_URL` missing, return mocks to avoid crashes.
- Supabase ready: need `prisma migrate deploy` on the real DB, then `npm run prisma:seed` if mock data desired.

## Frontend / Auto-save UX
- Profile: `app/profile/profile-form.tsx` — client component, debounced auto-save on change, optimistic.
- Races: `app/races/race-list.tsx` — add/edit races, auto-save via API, optimistic update.
- Sessions: `app/sessions/session-list.tsx` — add/edit session meta, auto-save; set editing still pending.
- Pages wired to use these components (`app/profile/page.tsx`, `app/races/page.tsx`, `app/sessions/page.tsx`).
- UI notes updated in `UI_DESIGN_NOTES.md`.

## Identity / Auth
- MVP: single fallback user (`user-1`) without auth.
- Next step (planned): add Google login to allow device migration; current APIs assume single user.

## Logs / Notes
- Thought logs: `.codex/thlog.md` (root and app) updated.
- DB/Env: `.env.example` provided; `.gitignore` allows it. Vercel needs `DATABASE_URL` (Supabase) and optionally `NEXT_PUBLIC_APP_URL`.

## Pending / Next Steps
- Apply migration to Supabase: `npx prisma migrate deploy` with `DATABASE_URL`.
- Seed if needed: `npm run prisma:seed`.
- Implement set editing and error toasts.
- Consider NextAuth/Google sign-in to replace fallback identity.

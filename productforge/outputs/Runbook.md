# Release Runbook (Blue/Green Deployment)

## Phase 1: Pre-Check
- [ ] All Unit Tests passed?
- [ ] Linting Clean?
- [ ] Build succeeds locally?
- [ ] Database Migrations tested on Staging?

## Phase 2: Deployment
- [ ] Push to `main` branch (Triggers Vercel Build).
- [ ] Apply Supabase Migrations (Production).
- [ ] Verify Critical Flows (Login, Create Task).

## Phase 3: Rollback Plan
- [ ] If Critical Error > 5%: Revert Vercel deployment to previous hash.
- [ ] If Database Error: Restore from Point-in-Time Backup (PITR).

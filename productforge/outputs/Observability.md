# Observability Plan

## 1. Logging
*   **Tools:** Supabase Logs, Vercel Logs.
*   **Events to Log:** Auth failures, Payment errors, RPC function errors.

## 2. Monitoring
*   **Uptime:** Vercel Status.
*   **Performance:** Core Web Vitals (LCP, CLS).

## 3. Alerting
*   **Critical:** Database downtime (Email/SMS to Admin).
*   **Warning:** Unusual spike in "Task Creation" (Potential botting).

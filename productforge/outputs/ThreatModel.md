# Threat Model: Kumbo

## Methodology: STRIDE
Analysis of potential security threats to the application and user data.

## 1. Spoofing (Identity)
*   **Threat:** A child guessing a parent's PIN to approve their own tasks.
*   **Mitigation:** 
    *   Enforce 4-digit PIN for "Parent Mode".
    *   Auth Protection on sensitive endpoints (Approve Task).

## 2. Tampering (Data)
*   **Threat:** User modifying API requests to increase their own balance.
*   **Mitigation:** 
    *   Supabase RLS (Row Level Security) prevents users from writing to `balance` columns directly. Only allowing RPC functions (`increment_balance`) controlled by server-side logic.

## 3. Repudiation (Action Deniability)
*   **Threat:** Parent denies approving a 500 TL reward.
*   **Mitigation:** 
    *   Audit Logs in `transactions` table (who performed action, timestamp, IP).

## 4. Information Disclosure (Privacy)
*   **Threat:** Leaking child's saving data to public.
*   **Mitigation:** 
    *   Strict RLS: `family_id` isolation. Users can ONLY see data belonging to their family ID.

## 5. Denial of Service
*   **Threat:** API spamming to incur costs.
*   **Mitigation:** 
    *   Rate limiting on API routes (Upstash/Redis).

## 6. Elevation of Privilege
*   **Threat:** Child promotes themselves to Parent.
*   **Mitigation:** 
    *   `role` column in `profiles` is protected. Only adjustable via initial Family Creation or specific Invite flow.

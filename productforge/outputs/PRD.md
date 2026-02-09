# Product Requirements Document (PRD): Kumbo MVP

## 1. Product Overview
**Kumbo** is a gamified financial companion for families. It helps children learn to earn, save, and spend wisely through a simulated digital wallet managed by parents.

## 2. Strategic Goal
Launch a "Simulated Wallet" MVP that requires **no banking integration** (Zero-KYC), allowing rapid adoption and testing of the "Education Loop" before handling real money.

## 3. Core User Roles
1.  **Parent (Admin):** Sets up family, creates tasks, approves actions, acts as the "Bank".
2.  **Child (Player):** Completes tasks, sets goals, tracks progress, explicitly "claims" rewards.

## 4. Feature Requirements (MVP)

### A. Onboarding (Zero Friction)
*   **P1:** Create Family account with just email/password.
*   **P1:** Create Child profiles (Avatar, Name, Age) - No ID required.
*   **P1:** Invite Code system for second parent or child device login.

### B. Core Loop: Earning (Work -> Reward)
*   **P1:** Parent Create Task (Title, Reward Amount, Frequency).
*   **P1:** Child View Task List.
*   **P1:** Child Mark "Complete" (with optional Photo Proof).
*   **P1:** Parent Review (Approve/Reject).
*   **P1:** **Auto-Deposit:** Approved tasks automatically increase Child's "Digital Balance".

### C. Core Loop: Saving (Goal-Based)
*   **P1:** Create Goal (Title, Target Amount, Photo).
*   **P1:** "Add Money" to Goal (Transfers from Main Balance to Goal Pot).
*   **P2:** Visual Progress Bar (The "Health Bar" of the goal).
*   **P2:** "Smash the Piggy Bank" animation when goal reached.

### D. The Wallet (Hybrid)
*   **P1:** **Digital Balance:** IOUs from parent (Task rewards, automated allowance).
*   **P2:** **Cash Balance:** Manual entry log. "Grandma gave 50 TL".
*   **P1:** Transaction History (Ledger).

### E. Gamification (The Sticky Factor)
*   **P1:** XP System (1 TL earned = 1 XP).
*   **P2:** Badges (First Task, First Goal, Saver Streak).
*   **P3:** Leaderboard (Family internal).

## 5. Non-Functional Requirements
*   **Platform:** PWA (Progressive Web App) optimized for Mobile.
*   **Performance:** <1s load time for dashboard.
*   **Security:** RLS (Row Level Security) on all Family data.
*   **Language:** Turkish (TR) initially.

## 6. Success Metrics (MVP)
*   **Activation:** % of families who complete 1 full Task loop (Create -> Do -> Approve) in first 24h.
*   **Retention:** % of children logging in 3+ times/week.

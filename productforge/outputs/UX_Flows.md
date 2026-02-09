# UX Flows & User Stories

## Flow 1: The "Earning" Loop (Task Completion)

### User Story
"As a Child, I want to see what chores I need to do so I can earn money for my LEGO set."

### Flow Steps
1.  **Parent Dashboard:** Clicks "Add Task" -> Inputs "Tidy Room", "20 TL".
2.  **System:** Notification/Update sent to Child.
3.  **Child Dashboard:** Sees "Tidy Room (20 TL)" in "To Do" list.
4.  **Child Action:** Cleans room. Clicks circle button to "Complete".
5.  **Child UI:** Task moves to "Pending Approval" (Clock icon).
6.  **Parent Dashboard:** Sees badge "1 Task Pending".
7.  **Parent Action:** Checks room. Clicks "Approve" (Green Check).
8.  **System:**
    *   Transfers 20 TL to Child Digital Balance.
    *   Adds 20 XP to Child Profile.
    *   Records Transaction: "Task Reward: Tidy Room".
9.  **Child Dashboard:** Balance updates. "Cha-ching!" sound/animation.

---

## Flow 2: The "Saving" Loop (Goal contribution)

### User Story
"As a Child, I want to put my task money into my Goal Jar so I don't accidentally spend it."

### Flow Steps
1.  **Child Dashboard:** Views "Total Balance: 100 TL".
2.  **Child Action:** Clicks "My Goals" -> Selects "LEGO Set (Target: 500, Current: 150)".
3.  **Child Action:** Clicks "Add Money".
4.  **Modal:** "How much?" -> Enters "20 TL".
5.  **System:**
    *   Deducts 20 TL from "Available Balance".
    *   Adds 20 TL to "Goal: LEGO Set".
6.  **UI Feedback:** Progress bar fills slightly. Character says "Great job! Only 330 TL to go!".

---

## Flow 3: The "Onboarding" Loop

### User Story
"As a Parent, I want to set up my family quickly without giving my ID card."

### Flow Steps
1.  **Landing:** "Start Free".
2.  **Auth:** Sign up with Email/Password (Supabase Auth).
3.  **Screen:** "Create your Family". Inputs "Gökçe Ailesi".
4.  **Action:** Generates Invite Code "XYZ-123".
5.  **Screen:** "Add your first Child". Inputs Name "Can", Age "8", Avatar "Space Helmet".
6.  **Result:** Dashboard opens. Parent is ready to add tasks.

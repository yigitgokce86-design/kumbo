# Kumbo - UX User Flows

## Flow 1: Child "Earn & Progress" Loop
**Actor**: Child (Age 8)
**Trigger**: Comes home from school, completes chore.

1.  **Open App**: Child taps Kumbo icon.
2.  **Dashboard**: Sees "Current Goal: LEGO Set" (65% full).
3.  **Task List**: Sees "Make Bed" (Pending).
4.  **Action**: Taps circle to mark "Make Bed" as Done.
5.  **Feedback**: Button turns green, sound effect ("Ding!"), "Waiting for Approval" badge appears.
6.  **Progress**: (Later, after parent approval) Notification: "Mom approved +10 TL!".
7.  **Reward**: App opens, coins fly into Goal Jar. Progress bar updates to 70%.

## Flow 2: Parent "Approve & Manage" Loop
**Actor**: Parent
**Trigger**: Notification "Efe completed 'Make Bed'".

1.  **Notification tap**: Opens "Approvals" tab directly.
2.  **Review**: Sees photo (optional) or just task name.
3.  **Action**: Taps "Approve All" (or swipes right on specific task).
4.  **Confirmation**: Funds deducted from Parent Wallet (virtual) -> Added to Child Wallet.
5.  **Optional**: Parent taps "Add Bonus" -> Enters 20 TL -> Selects reason "Good grade".

## Flow 3: "Grandma Gift" (Cash Entry)
**Actor**: Parent or Child (with approval)
**Trigger**: Grandma gives 100 TL cash for birthday.

1.  **Open Wallet**: Tap "Add Money".
2.  **Source Select**: Select "Physical Cash / Gift".
3.  **Input**: Enter "100".
4.  **Effect**: Digital Balance increases by 100.
5.  **Prompt**: "Do you want to allocate this to a Goal?"
6.  **Allocation**: User selects "LEGO Goal".
7.  **Result**: 100 TL added to Goal progress. Cash stays in physical jar, but app tracks it.

## Flow 4: Experience Switch (Onboarding)
**Actor**: Parent
**Trigger**: Setting up profile for 12-year-old.

1.  **Profile Setup**: Enter Age: 12.
2.  **System Logic**: Detected Age > 11.
3.  **Prompt**: "Enable Pro Mode? (Better for 11+)"
4.  **Preview**: Shows darker, cleaner UI preview vs. colorful character UI.
5.  **Selection**: Parent selects "Pro Mode".
6.  **Result**: Child dashboard instantiates with "Teen" theme.

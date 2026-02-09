# Kumbo - UI Specifications (UISpec)

## Design System Overview
**Name**: Kumbo Visual Language
**Philosophy**: "Playful for Kids, Reassuring for Parents, Cool for Tweens."

## Color Palette (Derived from Branding Assets)
*Referencing `KUMBO Branding/assets/Asset 1@2x.png` etc.*

| Role | Color Name | Hex Code (Approx) | Usage |
|------|------------|-------------------|-------|
| **Primary** | Kumbo Purple | `#6C5CE7` | Primary buttons, active states, branding |
| **Secondary** | Vibrant Teal | `#00CEC9` | Progress bars, success states, positive cash flow |
| **Accent** | Sunny Yellow | `#FDCB6E` | Coins, stars, gamification elements |
| **Danger** | Soft Red | `#FF7675` | Delete, spend, negative cash flow |
| **Neutral** | Slate | `#2D3436` | Text, headings |
| **Background** | Off-White | `#F5F6FA` | App background |

## Typography
**Font Family**: `Nunito` (Rounded, friendly) for Titles; `Inter` or `Roboto` for Body text.
- **H1**: Nunito ExtraBold, 32px
- **H2**: Nunito Bold, 24px
- **Body**: Inter Regular, 16px
- **Label**: Inter Medium, 12px (Uppercase)

## UI Components

### 1. Progress Circles (The Core Visual)
- **Usage**: Displaying goal progress.
- **Behavior**: Animates from 0 to current %. "Fills up" like liquid.
- **State**:
    - Empty: Grey stroke.
    - Filling: Teal fill.
    - Full: Gold glow effect + Confetti animation.

### 2. Task Cards
- **Usage**: List of chores.
- **Layout**: Icon (left), Title (center), Reward Value (right).
- **Interaction**: Tap to "Complete". Card flips or turns green.
- **Child View**: Large, colorful.
- **Parent View**: Condensed list with checkboxes.

### 3. The "Wallet"
- **Hybrid View**: Toggle between "Digital" and "Cash Jar".
- **Visual**:
    - Digital: Credit card metaphor or simple number.
    - Cash Jar: Skeuomorphic glass jar with coins inside (visualize quantity).

### 4. Mode Switcher (The "Skin")
- **Play Mode (Default <11)**:
    - Larger corner radii (20px).
    - Bouncy animations.
    - Mascot (Kumbo Character) visible.
- **Pro Mode (Default >11)**:
    - Smaller corner radii (8px).
    - Dark mode support.
    - Charts/Graphs instead of metaphors.
    - No Mascot.

## Asset Mapping
*Use files from `KUMBO Branding/assets/`:*
- `Asset 1@2x.png`: Main App Logo / Splash Screen.
- `Asset 2@2x.png`: Coin Icon.
- `Asset 3@2x.png`: "Goal Reached" Badge.
- `Asset 4@2x.png`: Task Complete Checkmark.

## Accessibility
- **Contrast**: AA compliant for text.
- **Touch Targets**: Minimum 44x44px (larger for Play Mode).
- **Text-to-Speech**: Support for pre-readers (6yo) on task names.

# UI Rules

Concise UI rules for the Task Management Application. These rules are written for Codex/AI agents so the interface stays consistent across sessions.

---

## Core Visual Direction

The UI should feel calm, focused, and productivity-oriented. Use a clean task-app layout inspired by Todoist-style side navigation, but with this project's own green primary color.

Primary brand color:

```txt
#55ca8d
```

Use this color for primary actions, active states, selected sidebar items, focus states, and important positive accents.

Do not use the red accent from the visual reference. Replace it with the project primary green.

---

## Font

Use Inter through `next/font/google` in the root layout.

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
```

Apply the font variable class to the `<html>` tag in `frontend/app/layout.tsx`.

Rules:

- Inter is the primary font.
- Do not use system fonts as the primary font.
- Do not import fonts inside individual components.

---

## Layout

The authenticated app uses a sidebar layout.

```txt
Sidebar width: 280px desktop
Main content: fills remaining width
Page padding: 32px desktop, 20px tablet, 16px mobile
Section gap: 24px
Maximum content width: 1120px where needed
```

Public and auth pages do not use the sidebar.

Routes:

```txt
/              → public landing page
/login         → auth page
/signup        → auth page
/inbox         → protected page with sidebar
/today         → protected page with sidebar
/calendar      → protected page with sidebar
```

---

## Sidebar

The sidebar is the main navigation for authenticated pages.

Location:

```txt
frontend/components/layout/Sidebar.tsx
```

Sidebar items:

```txt
Add task
Search
Inbox
Today
Calendar
Filters & Labels
Reporting
```

Only these pages are currently implemented:

```txt
/inbox
/today
/calendar
```

`Filters & Labels` and `Reporting` are visual/navigation placeholders for now unless explicitly implemented later.

### Sidebar item behavior

- Active item has a soft green background.
- Active item text uses the primary green.
- Inactive item text uses the default foreground color.
- Hover item uses a subtle muted background.
- Sidebar item height should be around 40px.
- Sidebar item radius should be 8px.
- Sidebar item horizontal padding should be 12px.
- Use icon + label alignment consistently.
- Count badges appear on the right side, only when relevant.

Recommended active style:

```txt
background: color-mix(in oklab, var(--color-primary) 12%, white)
color: var(--color-primary)
```

Recommended hover style:

```txt
background: var(--color-muted)
```

### Sidebar icons

Use HugeIcons for sidebar icons.

Examples:

```tsx
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AddCircleIcon,
  Search01Icon,
  InboxIcon,
  Calendar02Icon,
  FilterIcon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons";
```

Required mapping:

```txt
Add task         → AddCircleIcon
Search           → Search01Icon
Inbox            → InboxIcon
Today            → Calendar02Icon
Calendar         → Calendar02Icon
Filters & Labels → FilterIcon
Reporting        → Analytics01Icon
```

If an exact icon is unavailable, choose the closest HugeIcons equivalent, but do not switch to another icon library unless the dependency decision is updated.

---

## Header / Page Title Area

Protected pages should use a simple page title area inside the main content.

Examples:

```txt
Inbox
Today
Calendar
```

Rules:

- Page title: 28px, font-weight 600.
- Optional subtitle: 14px muted text.
- Keep title area minimal.
- Do not add a second top navbar inside protected pages unless needed later.

---

## Homepage

Homepage is public and does not use the sidebar.

UI:

- Minimal navbar with logo and `Start for free` button.
- Hero headline: `Clarity, finally`
- Hero subheadline should communicate that the app helps simplify work and life.
- Include an image/product preview section below the hero.

Logic:

- `Get Started` and `Start for free` actions:
  - unauthenticated user → `/login`
  - authenticated user → `/inbox`

---

## Cards

Cards are used for task groups, forms, modal content, and calendar sections.

```txt
background: var(--color-card)
border: 1px solid var(--color-border)
border-radius: 16px
padding: 24px
box-shadow: var(--shadow-card)
```

Rules:

- Do not use strong colored card backgrounds.
- Color should appear in badges, icons, active states, and buttons.
- Keep cards visually light.

---

## Typography

Use a simple three-level hierarchy.

### Page title

```txt
font-size: 28px
font-weight: 600
line-height: 36px
color: var(--color-foreground)
```

### Section heading

```txt
font-size: 16px
font-weight: 600
line-height: 24px
color: var(--color-foreground)
```

### Body text

```txt
font-size: 14px
font-weight: 400 or 500
line-height: 20px
color: var(--color-foreground)
```

### Muted text

```txt
font-size: 13px
font-weight: 400
line-height: 18px
color: var(--color-muted-foreground)
```

---

## Buttons

### Primary button

Use for main actions like Add Task, Create Task, Save Task, Login, Signup.

```txt
background: var(--color-primary)
color: var(--color-primary-foreground)
border-radius: 8px
padding: 8px 16px
font-size: 14px
font-weight: 500
```

### Secondary button

Use for cancel actions, filter toggles, and non-primary actions.

```txt
background: var(--color-background)
border: 1px solid var(--color-border)
color: var(--color-foreground)
border-radius: 8px
padding: 8px 16px
font-size: 14px
font-weight: 500
```

### Destructive button

Use only for delete confirmation.

```txt
background: var(--color-destructive)
color: var(--color-destructive-foreground)
```

Rules:

- Do not use red for normal primary actions.
- Add Task uses the project primary green.
- Buttons must have visible disabled and loading states.

---

## Form Inputs

Inputs are used in login, signup, task forms, filters, and search.

```txt
background: var(--color-background)
border: 1px solid var(--color-border)
border-radius: 8px
padding: 8px 12px
font-size: 14px
color: var(--color-foreground)
placeholder: var(--color-muted-foreground)
focus: ring-1 using var(--color-primary)
```

Rules:

- Use React Hook Form with Zod for forms.
- Show validation errors below fields.
- Validation messages must be human-readable.
- Do not show raw backend errors directly.

---

## Task List UI

Task lists are used in Inbox and Today.

Task card/row should show:

```txt
Completion checkbox
Task title
Description preview if available
Priority badge
Status badge
Due date if available
Quick actions: view, edit, delete
```

Rules:

- Inbox shows all non-completed tasks.
- Today shows tasks with due date equal to today only.
- Completed tasks should not appear in Inbox unless the user changes filters later.
- Empty state must be shown when no tasks exist.

---

## Task Modals

Task create, edit, and detail views use modals.

Location:

```txt
frontend/components/modals/TaskFormModal.tsx
frontend/components/modals/TaskDetailModal.tsx
```

Rules:

- Create and edit use `TaskFormModal`.
- View/details use `TaskDetailModal`.
- Do not create `/tasks/new`, `/tasks/[id]`, or `/tasks/[id]/edit` pages for now.
- Modal should be centered on desktop.
- Modal should be full-width or bottom-sheet style on small screens.
- Closing a modal should not lose saved data.
- Unsaved form changes may be discarded unless explicit confirmation is added later.

---

## Calendar Page

The Calendar page shows completed and upcoming tasks in a calendar-style view.

Route:

```txt
/calendar
```

Rules:

- Calendar is not only upcoming tasks.
- Calendar may include completed, pending, and in-progress tasks.
- Tasks should be grouped by date or displayed in a monthly calendar layout.
- Completed tasks should be visually distinguishable from active tasks.
- Do not overbuild drag-and-drop calendar behavior unless explicitly added later.

---

## Status and Priority

Task statuses:

```txt
TODO
IN_PROGRESS
COMPLETED
```

Task priorities:

```txt
LOW
MEDIUM
HIGH
```

Use badges for both.

Priority visual guidance:

```txt
LOW    → muted/neutral
MEDIUM → warning/soft amber
HIGH   → destructive/soft red
```

Status visual guidance:

```txt
TODO        → neutral
IN_PROGRESS → primary/soft green or blue
COMPLETED   → success/green with completed visual treatment
```

Keep badge colors subtle. Avoid heavy saturated backgrounds.

---

## Loading States

Every async area must have a loading state.

Examples:

- Sidebar count loading can be omitted or shown as skeleton.
- Task list should show `TaskLoadingState`.
- Calendar should show calendar skeleton or simple loading card.
- Buttons should show disabled loading text while submitting.

Do not leave blank screens while loading.

---

## Empty States

Every empty section must have an empty state.

Examples:

Inbox empty:

```txt
No active tasks yet.
Create your first task to get started.
```

Today empty:

```txt
No tasks due today.
Enjoy the clear day.
```

Calendar empty:

```txt
No scheduled tasks yet.
Add due dates to tasks to see them here.
```

Rules:

- Empty states should be short.
- Include a CTA when there is a logical next action.

---

## Error States

Every failed data fetch must show a human-readable error.

Examples:

```txt
Could not load tasks. Please try again.
Could not save task. Please check the form and retry.
```

Rules:

- Never expose raw error messages from backend responses.
- Show retry button where useful.
- Log technical details in development only.

---

## Responsive Behavior

Desktop:

- Sidebar visible on the left.
- Main content fills remaining width.

Tablet/mobile:

- Sidebar can collapse or move into a drawer.
- Main content uses 16px padding.
- Task rows may become cards.
- Modals should not overflow the viewport.

Do not use horizontal scrolling for normal task lists on mobile.

---

## Tailwind v4 Tokens

This project uses Tailwind v4 tokens in `globals.css` through `@theme`.

Required tokens:

```css
@theme {
  --font-sans: var(--font-sans);

  --color-background: #ffffff;
  --color-foreground: #101828;

  --color-card: #ffffff;
  --color-border: #e7eaf3;

  --color-primary: #55ca8d;
  --color-primary-foreground: #ffffff;

  --color-muted: #f5f5f4;
  --color-muted-foreground: #6a7282;

  --color-destructive: #dc2626;
  --color-destructive-foreground: #ffffff;

  --shadow-card:
    0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}
```

Rules:

- Do not define project colors in `tailwind.config.ts`.
- Do not use random Tailwind color classes like `bg-red-500`, `text-gray-600`, or `bg-green-400`.
- Use project tokens instead.

---

## Do Nots

- Do not use the red primary color from the reference image.
- Do not store JWT in localStorage.
- Do not build task detail pages unless scope changes.
- Do not add bonus features unless explicitly approved.
- Do not add gradients to cards.
- Do not use raw backend errors in the UI.
- Do not mix multiple icon libraries for sidebar navigation.
- Do not use fixed positioning for normal layout unless necessary for modal overlays.
- Do not use hardcoded colors inside components when a token exists.

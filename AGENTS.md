<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This project uses Next.js 16 with the App Router. APIs, conventions, routing behavior, and file conventions may differ from older Next.js versions.

Before writing or changing any Next.js-specific code, inspect the installed project docs or package files when available. Pay attention to deprecation notices, especially around route protection. This project uses `frontend/proxy.ts`, not `middleware.ts`, for the frontend route guard.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Instructions for AI coding agents working on this Task Management Application.

This project is a full-stack task management assessment app built with:

- Frontend: Next.js 16, React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL with Prisma
- Auth: JWT stored in HTTP-only cookies
- Data fetching: TanStack Query on the frontend

The agent must follow the project context files exactly. Do not invent architecture, routes, UI patterns, or bonus features unless the user explicitly approves them.

---

## Read Before Anything Else

Read these files in this exact order before any implementation:

1. `context/project-overview.md`
2. `context/architecture.md`
3. `context/ui-rules.md`
4. `context/code-standards.md`
5. `context/library-docs.md`
6. `context/build-plan.md`
7. `context/progress-tracker.md`

If a file is missing, stop and ask before proceeding. Do not silently continue with assumptions.

---

## Project Scope

Build only the agreed core assessment application.

In scope:

- Public landing page
- Signup and login
- HTTP-only cookie authentication
- Protected app routes
- Inbox page
- Today page
- Calendar page
- Task create/edit modal
- Task detail modal
- Task CRUD API
- Status filtering
- Search by title
- Sort by due date, priority, and created date
- Pagination
- PostgreSQL persistence
- Input validation
- User-owned task access only
- At least 3 meaningful tests
- README and `.env.example`

Out of scope for now:

- Admin role
- Real-time updates
- Optimistic UI
- Attachments
- Activity log
- Docker setup
- CI pipeline
- Dark mode
- Projects/teams implementation beyond static sidebar UI
- Comments/subtasks/reminders/location implementation beyond UI placeholders

Do not add bonus features unless the user explicitly asks.

---

## Final Routes

Public routes:

```txt
/        → landing page
/login   → login page
/signup  → signup page
```

Protected routes:

```txt
/inbox     → all non-completed tasks
/today     → tasks due today only
/calendar  → calendar-style view showing completed and upcoming tasks
```

Route groups must be used like this:

```txt
frontend/app/(auth)/login/page.tsx
frontend/app/(auth)/signup/page.tsx
frontend/app/(protected)/inbox/page.tsx
frontend/app/(protected)/today/page.tsx
frontend/app/(protected)/calendar/page.tsx
```

`(auth)` and `(protected)` must not appear in the URL.

---

## Route Protection

Frontend route guarding uses:

```txt
frontend/proxy.ts
```

Do not create `middleware.ts` unless the user changes the Next.js strategy.

Protection rule:

- If user visits `/inbox`, `/today`, or `/calendar` without an auth cookie, redirect to `/login`.
- If user visits `/login` or `/signup` with an auth cookie, redirect to `/inbox`.

Important: frontend route protection is not enough. Backend API routes must verify the JWT cookie and enforce task ownership on every protected task route.

---

## Authentication Rules

Use JWT stored in an HTTP-only cookie.

Never store tokens in:

- `localStorage`
- `sessionStorage`
- client-side global state
- URL query params

Frontend requests must use:

```ts
credentials: "include";
```

Backend auth middleware must read the token from cookies, verify it, attach the authenticated user to the request, and reject unauthenticated requests.

---

## UI Direction

The UI is inspired by a clean Todoist-style task manager but must use this project’s own identity and primary color.

Primary color:

```txt
#55ca8d
```

Use this as the main action/accent color for:

- Primary buttons
- Active sidebar items
- Add task actions
- Selected calendar day
- Positive status accents

Do not use Todoist red as the app theme.

Protected app layout uses a left sidebar.

Core sidebar items:

```txt
Add task
Search
Inbox
Today
Calendar
Filters & Labels
Reporting
```

Only these pages are functional for now:

```txt
Inbox
Today
Calendar
```

Other sidebar items may exist visually but should not become full features unless requested.

---

## Icon Rules

Use HugeIcons for sidebar and task UI icons when available.

Confirmed icons:

```tsx
<HugeiconsIcon icon={InboxIcon} />
<HugeiconsIcon icon={Calendar02Icon} />
```

Mapping:

```txt
Inbox    → InboxIcon
Today    → Calendar02Icon
Calendar → Calendar02Icon or a more specific calendar icon if available
```

If a specific HugeIcon is unavailable, use the closest matching icon from the same library. Do not mix icon libraries without a reason.

---

## Task Page Behavior

Inbox:

```txt
Show all non-completed tasks.
```

Today:

```txt
Show tasks where dueDate is today only.
Do not include overdue tasks unless the user later asks for that behavior.
```

Calendar:

```txt
Show completed and upcoming tasks in a calendar-style date grouping.
```

Task create/edit/detail:

```txt
Use modals.
Do not create /tasks/new, /tasks/[id], or /tasks/[id]/edit pages unless the user changes the plan.
```

---

## Backend API Rules

Required API routes:

```txt
POST   /auth/signup
POST   /auth/login
POST   /auth/logout
GET    /auth/me

POST   /tasks
GET    /tasks
GET    /tasks/:id
PATCH  /tasks/:id
DELETE /tasks/:id
```

Every task route must be protected.

Every task query must be scoped to the authenticated user.

Never fetch or mutate a task by `id` alone. Always include `userId`.

Correct:

```txt
where id = taskId and userId = currentUser.id
```

Wrong:

```txt
where id = taskId
```

---

## API Response Format

Success response:

```json
{
  "success": true,
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Human readable error message",
  "errors": []
}
```

Never expose raw internal errors to the frontend.

---

## Search, Filter, Sort, Pagination

These must work together on `GET /tasks`.

Supported query params:

```txt
status
search
sortBy
sortOrder
page
limit
view
```

Expected behavior:

- `search` searches task title.
- `status` filters by task status.
- `sortBy` supports `dueDate`, `priority`, and `createdAt`.
- `sortOrder` supports `asc` and `desc`.
- `page` and `limit` control pagination.
- `view=inbox` returns non-completed tasks.
- `view=today` returns tasks due today.
- `view=calendar` returns calendar-relevant completed and upcoming tasks.

Do not filter only on the frontend. The backend must support the combined query.

---

## Database Rules

Use PostgreSQL with Prisma.

Core models:

```txt
User
Task
```

Required task fields:

```txt
id
title
description
status
priority
dueDate
userId
createdAt
updatedAt
```

Status values:

```txt
TODO
IN_PROGRESS
COMPLETED
```

Priority values:

```txt
LOW
MEDIUM
HIGH
```

Passwords must be hashed before storing.

Never store plaintext passwords.

---

## Frontend Data Rules

Use TanStack Query for server state:

- current user
- task list
- single task
- create task
- update task
- delete task

Do not use TanStack Query for simple local UI state:

- modal open/close
- current input typing state
- sidebar collapse state

All frontend API calls must go through:

```txt
frontend/lib/api.ts
```

Auth API helpers go in:

```txt
frontend/lib/auth.ts
```

Task hooks go in:

```txt
frontend/hooks/useTasks.ts
```

---

## Validation Rules

Use Zod on both frontend and backend.

Frontend validation is for user experience.
Backend validation is mandatory for security and correctness.

Every write endpoint must validate input:

```txt
signup
login
create task
update task
```

---

## Rules That Never Change

- Read context files before implementation.
- Build only the current feature from `build-plan.md`.
- Do not add unapproved bonus features.
- Never use localStorage for auth tokens.
- Never skip backend authorization checks.
- Never query tasks without user ownership filtering.
- Never expose raw errors to users.
- Never hardcode secrets, database URLs, or JWT secrets.
- Update `context/progress-tracker.md` after every completed feature.
- Keep code simple, readable, and assessment-friendly.

---

## When Unsure

Stop and ask if any of these are unclear:

- Whether a feature is in scope
- Whether a UI element should be functional or visual-only
- Whether a new dependency is allowed
- Whether a route should be public or protected
- Whether a database field is needed
- Whether a bonus feature should be started

Do not guess.

---

## Suggested Agent Workflow

For every feature:

1. Read `context/progress-tracker.md`.
2. Read the relevant section in `context/build-plan.md`.
3. Check `context/architecture.md` for file placement and system boundaries.
4. Check `context/code-standards.md` for coding rules.
5. Check `context/library-docs.md` before using any third-party library.
6. Implement only the current feature.
7. Run the relevant checks.
8. Update `context/progress-tracker.md` with completed work, decisions, and notes.

---

## Quality Checks

Before marking a feature complete, run the relevant checks.

Frontend:

```bash
npm run lint
npm run build
```

Backend:

```bash
npm run lint
npm test
```

If the monorepo uses workspace commands, use the root scripts defined in `package.json`.

If checks fail, fix the issue before updating progress.

---

## Recovery Rule

If the same issue remains after one attempted fix:

1. Stop changing code.
2. Write down what failed.
3. Identify the exact file/function involved.
4. Ask the user before trying a different approach.

Do not keep making blind changes.

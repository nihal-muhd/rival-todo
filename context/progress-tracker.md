# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, what decisions were made, and what should happen next.

---

## Current Status

**Phase:** Phase 5 — Frontend API Wiring  
**Last completed:** 12 Task API  
**In progress:** 15 Task Data Wiring — Inbox create, edit, complete, and list connected
**Next:** Complete the Task Detail modal

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth Pages
- [x] 03 Route Protection
- [x] 04 Database Schema
- [x] 05 Backend Foundation

### Phase 2 — Inbox and Today

- [x] 06 Protected App Layout
- [x] 07 Inbox Page — UI with mock data
- [ ] 08 Today Page — UI with mock data
- [ ] 09 Task Modals

### Phase 3 — Calendar

- [ ] 10 Calendar Page — UI with mock data

### Phase 4 — Backend Auth and Task API

- [x] 11 Auth API
- [x] 12 Task API
- [ ] 13 Search, Filter, Sort, Pagination API

### Phase 5 — Frontend API Wiring

- [x] 14 Auth UI Wiring
- [ ] 15 Task Data Wiring
- [ ] 16 Search, Filter, Sort, Pagination Wiring

### Phase 6 — Final Quality Pass

- [ ] 17 Tests
- [ ] 18 README and Environment Files
- [ ] 19 Final Polish

---

## Feature Details

### 01 Homepage

**Status:** Completed

**Expected UI:**

- Public landing page at `/`
- Navbar with logo and Start for free button
- Hero headline: `Clarity, finally`
- Hero subheadline based on: `who simplify work and life with the world's...`
- Hero image/preview section
- Responsive layout for mobile and desktop

**Expected Logic:**

- Start for free / Get Started action:
  - unauthenticated user → `/login`
  - authenticated user → `/inbox`

**Verification:**

- `/` loads successfully
- CTA route behavior works
- Homepage is responsive

---

### 02 Auth Pages

**Status:** Completed

**Expected UI:**

- `/login`
- `/signup`
- Shared `(auth)/layout.tsx`
- `AuthCard.tsx`
- `LoginForm.tsx`
- `SignupForm.tsx`
- Form-level loading, error, and validation states

**Expected Logic:**

- Signup with name, email, password
- Login with email and password
- Passwords are never stored or handled in plaintext beyond request processing
- Successful login redirects to `/inbox`
- Auth state persists after page refresh through HTTP-only cookie

**Verification:**

- User can create account
- User can log in
- Invalid credentials show readable error
- Refresh after login keeps user authenticated

**Implementation notes (2026-06-13):**

- Signup form uses React Hook Form with the shared frontend Zod schema.
- Signup calls `POST /api/auth/signup` through `frontend/lib/api.ts` with `credentials: "include"`.
- Login calls `POST /api/auth/login` through the same cookie-aware API layer.
- TanStack Query owns the signup mutation and redirects successful requests to `/inbox`.
- TanStack Query owns the login mutation and redirects successful requests to `/inbox`.
- Field validation, pending state, and readable backend errors are connected.
- Live verification returned `201`, created a user, and stored the auth cookie.
- Live login verification returned `200` and stored the auth cookie; invalid credentials return a generic `401`.
- Logout clears the HTTP-only cookie and redirects to `/login`.
- Current-user restoration uses `GET /api/auth/me` through TanStack Query.
- The protected layout waits for session restoration before rendering authenticated UI.

---

### 03 Route Protection

**Status:** Completed

**Expected Files:**

- `frontend/proxy.ts`
- `frontend/app/(protected)/layout.tsx`

**Expected Logic:**

- Protect `/inbox`, `/today`, and `/calendar`
- Unauthenticated protected route request redirects to `/login`
- Authenticated user visiting `/login` or `/signup` redirects to `/inbox`
- Do not place `proxy.ts` inside `frontend/app`

**Verification:**

- Direct visit to `/inbox` without login redirects to `/login`
- Direct visit to `/today` without login redirects to `/login`
- Direct visit to `/calendar` without login redirects to `/login`

---

### 04 Database Schema

**Status:** Completed

**Expected Schema:**

- `users`
- `tasks`

**Users table/model:**

- id
- name
- email
- passwordHash
- createdAt
- updatedAt

**Tasks table/model:**

- id
- userId
- title
- description
- status
- priority
- dueDate
- createdAt
- updatedAt

**Enums:**

- status: `TODO`, `IN_PROGRESS`, `COMPLETED`
- priority: `LOW`, `MEDIUM`, `HIGH`

**Verification:**

- Prisma schema is valid
- Migration runs successfully
- PostgreSQL database contains expected tables

---

### 05 Backend Foundation

**Status:** Completed

**Expected Files:**

- `backend/src/server.ts`
- `backend/src/app.ts`
- `backend/src/config/env.ts`
- `backend/src/lib/prisma.ts`
- `backend/src/utils/api-response.ts`
- `backend/src/utils/pagination.ts`
- `backend/src/middleware/error.middleware.ts`
- `backend/src/middleware/validate.middleware.ts`

**Expected Logic:**

- Express app starts correctly
- CORS configured for frontend origin with credentials enabled
- Cookie parser enabled
- JSON body parser enabled
- Environment variables validated
- Global error handler configured
- Consistent API response format used

**Verification:**

- Backend starts without error
- Health check works if added
- Invalid routes/errors do not crash the server

---

### 06 Protected App Layout

**Status:** Completed

**Expected UI:**

- Shared protected layout for authenticated pages
- Sidebar navigation
- Navbar or top bar if needed
- Links:
  - Inbox
  - Today
  - Calendar
  - Logout
- Mobile-friendly navigation

**Expected Logic:**

- Layout wraps `/inbox`, `/today`, and `/calendar`
- Active route is visually highlighted
- Logout clears session and redirects to `/login`

**Verification:**

- Authenticated pages share the same app shell
- Sidebar works on mobile and desktop

---

### 07 Inbox Page — UI with Mock Data

**Status:** Completed — approved focused scope with five mock tasks

**Expected Route:**

- `/inbox`

**Expected UI:**

- Page title
- Task search
- Status filter
- Sort control
- Pagination
- Task list/cards
- Empty state
- Loading state
- Error state
- Add task action opens `TaskFormModal`
- Clicking a task opens `TaskDetailModal`

**Expected Data Rule:**

- Inbox shows all non-completed tasks only

**Verification:**

- UI works with mock tasks
- Completed tasks are not shown in Inbox mock view
- Modal interactions work visually before API wiring

---

### 08 Today Page — UI with Mock Data

**Status:** Not started

**Expected Route:**

- `/today`

**Expected UI:**

- Page title
- Task list/cards
- Search/filter/sort controls if reused from Inbox
- Empty state for no due-today tasks
- Add task action opens `TaskFormModal`
- Task click opens `TaskDetailModal`

**Expected Data Rule:**

- Today shows tasks where `dueDate` is today only

**Verification:**

- UI works with mock tasks
- Only today's tasks are shown in mock view

---

### 09 Task Modals

**Status:** In progress — create/edit task modal complete; detail modal pending

**Expected Components:**

- `TaskFormModal.tsx`
- `TaskDetailModal.tsx`
- `TaskForm.tsx`

**Expected UI:**

- Add task modal
- Edit task modal
- Task detail modal
- Client-side validation errors
- Save/cancel buttons
- Delete action
- Mark complete action

**Expected Logic:**

- Create and edit use the same form component
- Task detail modal can open edit mode or open edit modal
- No `/tasks/new`, `/tasks/[id]`, or `/tasks/[id]/edit` pages for now

**Verification:**

- Modal open/close works
- Form validation works with mock submit
- Detail view displays all task fields

---

### 10 Calendar Page — UI with Mock Data

**Status:** Not started

**Expected Route:**

- `/calendar`

**Expected UI:**

- Calendar-style task view
- Current month by default
- Completed and upcoming tasks visible
- Task indicators by date
- Clicking a task opens `TaskDetailModal`
- Add task action opens `TaskFormModal`
- Empty date states handled gracefully

**Expected Data Rule:**

- Calendar shows completed and upcoming tasks grouped by due date

**Verification:**

- Calendar renders with mock tasks
- Completed and future tasks are visible
- Modal interactions work from calendar items

---

### 11 Auth API

**Status:** Completed

**Expected Endpoints:**

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

**Expected Logic:**

- Validate request bodies with Zod
- Hash password with bcrypt before storing
- Login verifies password
- JWT stored in HTTP-only cookie
- Logout clears cookie
- `/auth/me` returns current user from cookie session

**Verification:**

- Signup works
- Login sets cookie
- Logout clears cookie
- `/auth/me` works after refresh
- Password hash is stored, not raw password

---

### 12 Task API

**Status:** Completed

**Expected Endpoints:**

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

**Expected Logic:**

- All task routes protected
- User can only access own tasks
- Validate all write endpoints with Zod
- Return proper HTTP status codes
- Return consistent error responses

**Verification:**

- User can create, read, update, and delete own tasks
- User cannot access another user's tasks
- Invalid task input returns validation error

---

### 13 Search, Filter, Sort, Pagination API

**Status:** In progress — Inbox view and pagination foundation complete

**Expected Query Params:**

- `search`
- `status`
- `sortBy`
- `sortOrder`
- `page`
- `limit`
- optional page view mode: `view=inbox|today|calendar`

**Expected Logic:**

- Search by task title
- Filter by status
- Sort by due date, priority, and created date
- Pagination applied on backend
- Filters, search, sort, and pagination work together
- Inbox API behavior returns non-completed tasks
- Today API behavior returns due-today tasks
- Calendar API behavior supports completed and upcoming tasks by due date

**Verification:**

- Combined query works, for example:
  - `/tasks?search=design&status=TODO&sortBy=dueDate&sortOrder=asc&page=1&limit=10`
- Pagination metadata is returned

---

### 14 Auth UI Wiring

**Status:** Completed

**Expected Logic:**

- Login form calls backend login API
- Signup form calls backend signup API
- Auth requests use `credentials: "include"`
- Successful login/signup redirects to `/inbox`
- Logout calls backend logout API
- Current user fetched with `/auth/me`

**Verification:**

- Full auth flow works from browser
- Cookie session persists refresh
- Auth errors are shown in the UI

---

### 15 Task Data Wiring

**Status:** In progress — Inbox create, edit, complete, and list connected

**Expected Logic:**

- Inbox page fetches real tasks from backend
- Today page fetches real tasks from backend
- Calendar page fetches real tasks from backend
- Add task modal creates real task
- Edit task modal updates real task
- Delete action deletes real task
- Mark complete updates task status to `COMPLETED`
- TanStack Query invalidates/refetches task queries after mutations

**Verification:**

- UI updates after create/edit/delete/complete
- No full page refresh required
- Loading, error, and empty states work with real API

---

### 16 Search, Filter, Sort, Pagination Wiring

**Status:** Not started

**Expected Logic:**

- Search input updates task API query
- Status filter updates task API query
- Sort dropdown updates task API query
- Pagination controls update task API query
- Search/filter/sort reset page to 1 when changed
- Query state remains predictable

**Verification:**

- Search, filter, sort, and pagination work together from UI
- Browser does not show stale task data after mutation

---

### 17 Tests

**Status:** Not started

**Expected Tests:**

- Auth test: signup stores hashed password and login works
- Authorization test: user cannot access another user's task
- Task list test: search, filter, sort, and pagination work together

**Verification:**

- Test command passes
- Tests are meaningful and documented in README

---

### 18 README and Environment Files

**Status:** Not started

**Expected Files:**

- `README.md`
- `.env.example`

**Expected README Sections:**

- Project overview
- Tech stack
- Features
- Architecture decisions
- Assumptions and trade-offs
- Local setup
- Environment variables
- API documentation
- Test instructions
- Deployment links if available

**Verification:**

- A reviewer can run the app from README instructions
- `.env.example` lists required frontend and backend variables

---

### 19 Final Polish

**Status:** Not started

**Expected Work:**

- Check responsive UI
- Check form validation messages
- Check empty/loading/error states
- Check HTTP status codes
- Check protected routes
- Check task ownership rules
- Check README accuracy
- Remove unused code
- Remove console logs except intentional server-side error logs
- Ensure clean commit history

**Verification:**

- Frontend builds
- Backend builds
- Tests pass
- No known critical bugs remain

---

## Decisions Made During Build

Add decisions here as implementation progresses.

Initial confirmed decisions:

- Project is a monorepo.
- Frontend uses Next.js App Router.
- Backend uses Node.js with Express.
- Database is PostgreSQL through Prisma.
- Auth uses JWT stored in HTTP-only cookies.
- No JWT token is stored in localStorage.
- `frontend/proxy.ts` is used for frontend route guarding.
- `proxy.ts` must live directly under `frontend/`, not inside `frontend/app/`.
- `/inbox` is the authenticated landing page after login.
- `/inbox` shows all non-completed tasks.
- `/today` shows tasks due today only.
- `/calendar` shows completed and upcoming tasks in a calendar-style view.
- Task create, edit, and detail views are handled through modals.
- No `/tasks/new`, `/tasks/[id]`, or `/tasks/[id]/edit` pages are included for now.
- Bonus features are excluded from the initial build plan.

---

## Notes

Add implementation notes, bugs, fixes, and verification results here.

Example note format:

```txt
- Feature 01: Homepage UI completed. Verified `/` loads on desktop and mobile widths. CTA redirects still pending auth implementation.
```

- Feature 01: Homepage completed in `frontend/app/page.tsx` using the provided `frontend/public/today.png` preview image. Root layout restored in `frontend/app/layout.tsx` with Inter and project metadata.
- Feature 01 verification: `npm.cmd run lint` passes. `http://localhost:3000/` returns 200 from the already-running dev server.
- Feature 01 verification note: `npm.cmd run build` is blocked before compilation by `EPERM: operation not permitted, unlink 'frontend/.next/trace'`, likely because an existing Node/Next process has the trace file open.
- Feature 06: Added the responsive protected layout sidebar from `context/designs/sidebar.png`. Inbox, Today, and Calendar are active links; the remaining sidebar controls and project rows are visual-only placeholders.
- Feature 06: Added HugeIcons dependencies and used the approved icon library throughout the sidebar. User identity and counts remain mock data until current-user and task API wiring are completed.
- Build-order decision: Sidebar and Inbox UI work may proceed before Feature 03 route protection. Auth restoration and `frontend/proxy.ts` remain required immediately afterward.
- Feature 06 verification: frontend lint and TypeScript checks pass. The running development server returns `200` for `/inbox` and renders the sidebar shell.
- Feature 06 build verification: `npm.cmd run build` remains blocked before compilation by the existing `frontend/.next/trace` file lock.
- Feature 07: Built the Inbox task list from `context/designs/inbox (2).png` with five mock active tasks. Edit appears on hover/focus, completing a task removes it from Inbox, and an empty state appears after all tasks are completed.
- Feature 07: Added local protected-layout task state so the sidebar and Inbox Add task actions open the same modal. Added tasks and edits update the list immediately without API calls or persistence.
- Feature 09 partial: Built the create/edit task modal from `context/designs/add-modal.png` with only title, description, date, priority, Cancel, and Add task/Save changes actions. Title validation uses the shared frontend Zod schema.
- Feature 07/09 verification: frontend lint and TypeScript checks pass, and the running development server returns `200` for `/inbox`.
- Feature 03: Added `frontend/proxy.ts` using the Next.js 16 Proxy convention. `/inbox`, `/today`, and `/calendar` redirect unauthenticated requests to `/login`; authenticated requests to `/login` and `/signup` redirect to `/inbox`.
- Feature 11: Added backend JWT cookie middleware, `GET /api/auth/me`, and `POST /api/auth/logout`. Invalid tokens are rejected with `401`, and logout clears the HTTP-only cookie.
- Feature 14: Added current-user restoration and logout mutations through TanStack Query. The protected auth boundary recovers stale sessions by clearing the cookie and returning the user to `/login`.
- Feature 06: Sidebar now displays the authenticated user's name/initial and includes a working Logout button with pending state.
- Auth verification: guest `/inbox` returned `307` to `/login`; signup returned `201`; `/auth/me` returned `200`; authenticated `/inbox` returned `200`; authenticated `/login` returned `307` to `/inbox`; logout returned `200`, removed the cookie, and `/inbox` again returned `307` to `/login`.
- Auth checks: backend typecheck/build and frontend lint/typecheck pass. Frontend production build remains blocked by the existing `.next/trace` lock.
- Feature 04 verification: Prisma reports the PostgreSQL schema is valid, the initial migration is applied, and the database schema is up to date.
- Feature 05 verification: backend health, environment validation, CORS credentials, cookie parsing, request validation, centralized errors, and production TypeScript build are working.
- Feature 12: Added protected task create, list, detail, update, and delete endpoints. Every read and mutation is scoped by both task id and authenticated `userId`; cross-user reads, updates, and deletes return `404`.
- Feature 12: Backend Zod validation covers task writes, UUID params, and Inbox pagination query values. New tasks default to `TODO`, and due dates are persisted at UTC midnight from `YYYY-MM-DD` input.
- Feature 13 partial: `GET /api/tasks` supports backend pagination metadata and `view=inbox`, returning only non-completed tasks ordered by newest first. Search, status/priority filters, and selectable sorting remain pending.
- Feature 15 partial: Replaced mock Inbox state with TanStack Query. Create, edit, and complete mutations persist through the API and invalidate task queries; Inbox now has real loading, error, empty, submit-pending, and mutation-error states.
- Task API verification: create returned `201`, list returned the owned task, edit returned `200`, completion persisted `COMPLETED` and removed the task from Inbox, unauthenticated list returned `401`, invalid input returned `400`, and cross-user get/update/delete returned `404`.
- Task wiring checks: backend build, frontend lint, and frontend TypeScript checks pass. Frontend production build remains blocked before compilation by the existing `.next/trace` lock.

---

## Known Issues

- `npm.cmd run build` cannot complete while `frontend/.next/trace` is locked by an existing process. Stop the running Next/Node dev process or clear the locked `.next` artifact, then rerun the build.

---

## Next Agent Instructions

Before implementing anything:

1. Read `AGENTS.md`.
2. Read this file.
3. Implement only the feature marked as `Next` in Current Status.
4. After completing a feature, update:
   - Current Status
   - Progress checkbox
   - Decisions Made During Build, if any new decision was made
   - Notes
   - Known Issues, if any

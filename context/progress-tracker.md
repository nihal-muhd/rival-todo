# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, what decisions were made, and what should happen next.

---

## Current Status

**Phase:** Phase 1 — Foundation  
**Last completed:** Not started  
**Next:** 01 Homepage

---

## Progress

### Phase 1 — Foundation

- [ ] 01 Homepage
- [ ] 02 Auth Pages
- [ ] 03 Route Protection
- [ ] 04 Database Schema
- [ ] 05 Backend Foundation

### Phase 2 — Inbox and Today

- [ ] 06 Protected App Layout
- [ ] 07 Inbox Page — UI with mock data
- [ ] 08 Today Page — UI with mock data
- [ ] 09 Task Modals

### Phase 3 — Calendar

- [ ] 10 Calendar Page — UI with mock data

### Phase 4 — Backend Auth and Task API

- [ ] 11 Auth API
- [ ] 12 Task API
- [ ] 13 Search, Filter, Sort, Pagination API

### Phase 5 — Frontend API Wiring

- [ ] 14 Auth UI Wiring
- [ ] 15 Task Data Wiring
- [ ] 16 Search, Filter, Sort, Pagination Wiring

### Phase 6 — Final Quality Pass

- [ ] 17 Tests
- [ ] 18 README and Environment Files
- [ ] 19 Final Polish

---

## Feature Details

### 01 Homepage

**Status:** Not started

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

**Status:** Not started

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

---

### 03 Route Protection

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

**Status:** Not started

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

---

## Known Issues

No known issues yet.

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

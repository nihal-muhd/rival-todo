# Build Plan

## Core Principle

Build visible UI first with mock data, verify the page visually, then wire backend logic step by step. Every feature must be visible and testable before moving to the next. Avoid hidden backend-only phases unless they are required for the next visible feature.

This project is a full-stack task management application using:

- Frontend: Next.js 16 App Router
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL with Prisma
- Auth: JWT stored in HTTP-only cookies
- UI: Tailwind CSS + shadcn/ui
- Data fetching: TanStack Query

---

## Phase 1 — Foundation

### 01 Homepage

Build the complete public homepage UI.

**UI:**

- Navbar — logo, Start for free button
- Hero section — headline: `Clarity, finally`
- Hero subheadline — short message around simplifying work and life
- Image/preview section — simple task dashboard preview or product mockup
- Clean responsive layout for desktop and mobile

**Logic:**

- Start for free button:
  - If not authenticated → `/login`
  - If authenticated → `/inbox`
- Public homepage must be accessible without login

---

### 02 Auth Pages

Build login and signup UI inside the `(auth)` route group.

**UI:**

- Common auth layout for `/login` and `/signup`
- Centered `AuthCard` component
- Login form — email, password, submit button
- Signup form — name, email, password, submit button
- Link from login to signup
- Link from signup to login
- Loading and error states on submit

**Logic:**

- `POST /auth/signup` creates a new user
- `POST /auth/login` authenticates user
- Backend sets JWT in HTTP-only cookie
- No token stored in localStorage
- After login/signup → redirect to `/inbox`
- `POST /auth/logout` clears auth cookie
- `GET /auth/me` returns current authenticated user

---

### 03 Route Protection

Protect authenticated app pages.

**UI:**

- Protected pages use the shared protected app layout
- Protected layout includes sidebar/navigation shell

**Logic:**

- `frontend/proxy.ts` checks for the auth cookie
- If unauthenticated user visits protected routes → redirect to `/login`
- If authenticated user visits `/login` or `/signup` → redirect to `/inbox`
- Protected routes:
  - `/inbox`
  - `/today`
  - `/calendar`
- Backend must still validate JWT on all protected API routes

---

### 04 Database Schema

Create the initial PostgreSQL schema using Prisma.

**Logic:**

- Create `users` table/model:
  - id
  - name
  - email
  - passwordHash
  - createdAt
  - updatedAt
- Create `tasks` table/model:
  - id
  - userId
  - title
  - description
  - status
  - priority
  - dueDate
  - createdAt
  - updatedAt
- Add relation:
  - One user has many tasks
  - One task belongs to one user
- Create Prisma migration
- Add Prisma client setup in `backend/src/lib/prisma.ts`

**Enums:**

- Task status:
  - `TODO`
  - `IN_PROGRESS`
  - `COMPLETED`
- Task priority:
  - `LOW`
  - `MEDIUM`
  - `HIGH`

---

### 05 Backend Foundation

Set up the backend server structure.

**Logic:**

- Express app setup in `backend/src/app.ts`
- Server entry in `backend/src/server.ts`
- Environment validation in `backend/src/config/env.ts`
- Global error middleware
- Validation middleware
- Cookie parser setup
- CORS configured for frontend origin with credentials enabled
- Consistent API response shape

**Response format:**

```json
{
  "success": true,
  "data": {}
}
```

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

## Phase 2 — Inbox and Today

### 06 Protected App Layout

Build the main authenticated application layout.

**UI:**

- Sidebar with navigation links:
  - Inbox
  - Today
  - Calendar
- Navbar or top bar with app name/user/logout action
- Main content area
- Mobile-friendly layout
- Active navigation state

**Logic:**

- Logout button calls `POST /auth/logout`
- On logout → redirect to `/login`
- Layout should only render inside `(protected)` routes

---

### 07 Inbox Page — Full UI With Mock Data

Build the complete Inbox page UI first using mock tasks.

**UI:**

- Page title: `Inbox`
- Task controls row:
  - Search input
  - Status filter
  - Priority filter
  - Sort dropdown
- Task list section
- Task card showing:
  - Title
  - Description preview
  - Status
  - Priority
  - Due date
  - Complete action
  - Edit action
  - Delete action
- Add task button
- Pagination controls
- Empty state
- Loading state
- Error state

**Page rule:**

- Inbox shows all non-completed tasks.

**Logic:**

- No real API wiring yet
- Use mock data to verify layout and states
- Add task opens `TaskFormModal`
- Edit task opens `TaskFormModal` with selected task data
- Clicking task opens `TaskDetailModal`

---

### 08 Today Page — Full UI With Mock Data

Build the complete Today page UI using mock tasks.

**UI:**

- Page title: `Today`
- Short helper text showing today’s date
- Task list for tasks due today
- Same task card component reused from Inbox
- Add task button
- Empty state for no tasks due today
- Loading state
- Error state

**Page rule:**

- Today shows tasks where `dueDate` is today only.
- Overdue tasks are not included unless their due date is today.

**Logic:**

- No real API wiring yet
- Use mock data filtered to today’s date
- Add/edit/detail flows use the same modals as Inbox

---

### 09 Task Modals

Build reusable task modals used by Inbox, Today, and Calendar.

**UI:**

- `TaskFormModal`:
  - Used for both add and edit
  - Fields:
    - Title
    - Description
    - Status
    - Priority
    - Due date
  - Save button
  - Cancel button
  - Client-side validation messages
- `TaskDetailModal`:
  - Title
  - Description
  - Status
  - Priority
  - Due date
  - Created date
  - Edit button
  - Delete button
  - Mark complete button

**Logic:**

- Use React Hook Form + Zod for validation
- Modal form should support create mode and edit mode
- No API wiring yet in this step

---

## Phase 3 — Calendar

### 10 Calendar Page — Full UI With Mock Data

Build the complete Calendar page UI using mock data.

**UI:**

- Page title: `Calendar`
- Calendar/month-style task view
- Tasks grouped by date
- Show completed and upcoming tasks
- Visual status indicator for each task
- Priority indicator
- Empty date state
- Task click opens `TaskDetailModal`
- Add task button opens `TaskFormModal`

**Page rule:**

- Calendar shows tasks by due date.
- Calendar can show completed, pending, in-progress, and upcoming tasks.

**Logic:**

- No real API wiring yet
- Use mock data grouped by date
- Reuse existing task components where possible

---

## Phase 4 — Backend Auth and Task API

### 11 Auth API

Implement backend authentication.

**Logic:**

- `POST /auth/signup`
  - Validate input
  - Check if email already exists
  - Hash password using bcrypt
  - Create user
  - Set JWT in HTTP-only cookie
- `POST /auth/login`
  - Validate input
  - Verify email/password
  - Set JWT in HTTP-only cookie
- `POST /auth/logout`
  - Clear auth cookie
- `GET /auth/me`
  - Return current authenticated user
- Add auth middleware that reads JWT from HTTP-only cookie

**Security rules:**

- Never return password hash
- Never store JWT in localStorage
- Use HTTP-only cookie for auth persistence

---

### 12 Task API

Implement protected task CRUD endpoints.

**Logic:**

- `POST /tasks` — create task
- `GET /tasks` — list current user’s tasks
- `GET /tasks/:id` — fetch single task owned by current user
- `PATCH /tasks/:id` — update task owned by current user
- `DELETE /tasks/:id` — delete task owned by current user

**Validation:**

- Validate all write endpoints with Zod
- Required fields:
  - title
  - status
  - priority
- Optional fields:
  - description
  - dueDate

**Authorization rules:**

- All task routes require authentication
- Users can only view and modify their own tasks
- Every task query must be scoped by `userId`

---

### 13 Search, Filter, Sort, and Pagination API

Add query support to `GET /tasks`.

**Logic:**

- Status filter
- Priority filter
- Search by title
- Sort by:
  - due date
  - priority
  - created date
- Pagination:
  - page
  - limit
  - total count
  - total pages

**Example:**

```txt
GET /tasks?status=TODO&priority=HIGH&search=design&sortBy=dueDate&sortOrder=asc&page=1&limit=10
```

**Important rule:**

- Filtering, search, sort, and pagination must work together in one backend query.

---

## Phase 5 — Frontend API Wiring

### 14 Auth UI Wiring

Connect auth pages to the backend.

**Logic:**

- Login form calls `POST /auth/login`
- Signup form calls `POST /auth/signup`
- Auth requests use `credentials: "include"`
- Current user loaded using `GET /auth/me`
- Login/signup success redirects to `/inbox`
- Logout redirects to `/login`
- Show loading and error states

---

### 15 Task Data Wiring

Connect task pages and modals to the backend.

**Logic:**

- Inbox fetches non-completed tasks
- Today fetches tasks due today
- Calendar fetches tasks grouped by due date
- Add task calls `POST /tasks`
- Edit task calls `PATCH /tasks/:id`
- Delete task calls `DELETE /tasks/:id`
- Mark complete calls `PATCH /tasks/:id`
- Refresh task list after create/update/delete

**TanStack Query:**

- Use `useTasks` for task list queries
- Use mutations for create/update/delete/complete
- Invalidate task queries after successful mutation

---

### 16 Search, Filter, Sort, Pagination Wiring

Connect frontend controls to backend query params.

**UI:**

- Search input filters by task title
- Status filter
- Priority filter
- Sort dropdown
- Pagination controls

**Logic:**

- Query params update when controls change
- API receives combined filters
- Task list reloads with correct results
- Empty state appears when no task matches filters

---

## Phase 6 — Final Quality Pass

### 17 Tests

Add at least 3 meaningful tests.

**Backend tests:**

- Signup creates a user with hashed password
- Login sets auth cookie for valid credentials
- User cannot access another user’s task
- `GET /tasks` supports filtering, search, sort, and pagination together

**Minimum requirement:**

- At least 3 meaningful tests must pass

---

### 18 README and Environment Files

Write final project documentation.

**README must include:**

- Project overview
- Tech stack
- Features implemented
- Folder structure
- Local setup instructions
- Backend setup
- Frontend setup
- Database migration commands
- Test commands
- API documentation
- Assumptions and trade-offs

**Environment files:**

- Root `.env.example`
- Frontend env example
- Backend env example

---

### 19 Final Polish

Final review before submission.

**Checklist:**

- Homepage responsive
- Auth flow works after refresh
- Protected routes redirect correctly
- Inbox shows non-completed tasks
- Today shows tasks due today only
- Calendar shows completed and upcoming tasks by due date
- Task create/edit/detail modals work
- Search, filter, sort, and pagination work together
- Proper empty/loading/error states
- Backend returns consistent errors
- Tests pass
- README is clear
- No unused files
- No console errors

---

## Feature Count

| Phase     | Area            | Features |
| --------- | --------------- | -------- |
| Phase 1   | Foundation      | 5        |
| Phase 2   | Inbox + Today   | 4        |
| Phase 3   | Calendar        | 1        |
| Phase 4   | Backend APIs    | 3        |
| Phase 5   | Frontend Wiring | 3        |
| Phase 6   | Final Quality   | 3        |
| **Total** |                 | **19**   |

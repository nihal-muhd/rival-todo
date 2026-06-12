# Architecture

## Project

Task Management Application — full-stack developer assessment project.

The app is built as a monorepo with a Next.js frontend, a Node.js REST API backend, and PostgreSQL for persistence. The goal is to deliver a clean, secure, maintainable task management system that satisfies the required assessment features first.

Bonus features are intentionally not included in this architecture yet. They can be added later after the core implementation is reviewed and stable.

---

## Product Scope

### Core User Flow

```txt
User visits public landing page
        ↓
User signs up or logs in
        ↓
Backend sets JWT in HTTP-only cookie
        ↓
User is redirected to /inbox
        ↓
User can create, view, edit, complete, delete, search, filter, sort, and paginate tasks
```

### Main Pages

| Route       | Access      | Purpose                                                               |
| ----------- | ----------- | --------------------------------------------------------------------- |
| `/`         | Public      | Landing page for the application                                      |
| `/login`    | Public only | Login page                                                            |
| `/signup`   | Public only | Signup page                                                           |
| `/inbox`    | Protected   | Main authenticated landing page. Shows all non-completed tasks        |
| `/today`    | Protected   | Shows tasks with due date equal to today                              |
| `/calendar` | Protected   | Calendar-style task view showing completed and upcoming tasks by date |

### Task Interaction Model

Task creation, editing, and detail viewing are handled through modals instead of dedicated task pages.

| Interaction       | Component             |
| ----------------- | --------------------- |
| Create task       | `TaskFormModal.tsx`   |
| Edit task         | `TaskFormModal.tsx`   |
| View task details | `TaskDetailModal.tsx` |
| Mark complete     | Task card/list action |
| Delete task       | Task card/list action |

No dedicated frontend routes are planned for `/tasks/new`, `/tasks/[id]`, or `/tasks/[id]/edit` in the current version.

---

## Stack

| Layer             | Tool                             | Purpose                                                                                          |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Repository        | Monorepo                         | One GitHub repo containing frontend, backend, context docs, Docker files, and setup instructions |
| Frontend          | Next.js 16 App Router            | Client application, route groups, protected pages, layouts, task UI                              |
| Frontend Language | TypeScript strict                | Type-safe frontend code                                                                          |
| Styling           | Tailwind CSS + shadcn/ui         | Responsive UI and reusable components                                                            |
| Forms             | React Hook Form + Zod            | Client-side form handling and validation                                                         |
| Data Fetching     | TanStack Query                   | API fetching, caching, loading/error states, pagination, refetching after mutations              |
| Backend           | Node.js + Express.js             | REST API server                                                                                  |
| Backend Language  | TypeScript strict                | Type-safe backend code                                                                           |
| ORM               | Prisma                           | PostgreSQL schema, migrations, and type-safe queries                                             |
| Database          | PostgreSQL                       | Persistent storage for users and tasks                                                           |
| Authentication    | JWT in HTTP-only cookie + bcrypt | Signup, login, password hashing, persistent auth, protected API routes                           |
| Validation        | Zod                              | Backend request validation for all write endpoints                                               |
| Testing           | Vitest/Jest + Supertest          | Backend API tests                                                                                |
| Package Manager   | npm or pnpm                      | Dependency management; use one consistently across the repo                                      |

---

## Folder Structure

```txt
/
├── AGENTS.md
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── build-plan.md
│   ├── code-standards.md
│   └── progress-tracker.md
│
├── frontend/
│   ├── proxy.ts                         # Next.js 16 route guard
│   ├── app/
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Public landing page
│   │   ├── (auth)/
│   │   │   ├── layout.tsx               # Common auth layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx             # /login
│   │   │   └── signup/
│   │   │       └── page.tsx             # /signup
│   │   └── (protected)/
│   │       ├── layout.tsx               # Protected app layout
│   │       ├── inbox/
│   │       │   └── page.tsx             # /inbox
│   │       ├── today/
│   │       │   └── page.tsx             # /today
│   │       └── calendar/
│   │           └── page.tsx             # /calendar
│   │
│   ├── components/
│   │   ├── ui/                          # shadcn/ui components only
│   │   ├── providers/
│   │   │   └── QueryProvider.tsx        # TanStack Query provider
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ProtectedLayout.tsx
│   │   ├── auth/
│   │   │   ├── AuthCard.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── tasks/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskFilters.tsx
│   │   │   ├── TaskSearch.tsx
│   │   │   ├── TaskSort.tsx
│   │   │   ├── TaskPagination.tsx
│   │   │   ├── TaskEmptyState.tsx
│   │   │   ├── TaskLoadingState.tsx
│   │   │   └── TaskErrorState.tsx
│   │   └── modals/
│   │       ├── TaskFormModal.tsx
│   │       └── TaskDetailModal.tsx
│   │
│   ├── lib/
│   │   ├── api.ts                       # Fetch wrapper with credentials: "include"
│   │   ├── auth.ts                      # Login/signup/logout/me API functions
│   │   ├── query-client.ts              # TanStack Query client config
│   │   ├── validations.ts               # Frontend Zod schemas
│   │   └── utils.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                   # Auth mutations and current user query
│   │   └── useTasks.ts                  # Task queries and mutations
│   │
│   └── types/
│       └── index.ts
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── .env
│   ├── src/
│   │   ├── server.ts                    # Starts Express server
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.validation.ts
│   │   │   │   └── auth.types.ts
│   │   │   │
│   │   │   └── tasks/
│   │   │       ├── task.routes.ts
│   │   │       ├── task.controller.ts
│   │   │       ├── task.service.ts
│   │   │       ├── task.validation.ts
│   │   │       └── task.types.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts       # Reads JWT from HTTP-only cookie
│   │   │   ├── error.middleware.ts
│   │   │   └── validate.middleware.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── prisma.ts
│   │   │   ├── jwt.ts
│   │   │   └── password.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── api-response.ts
│   │   │   └── pagination.ts
│   │   │
│   │   └── tests/
│   │       ├── auth.test.ts
│   │       └── tasks.test.ts
│   │
├── docker-compose.yml
├── README.md
├── .env.example
└── package.json
```

---

## System Boundaries

| Folder                        | Owns                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| `frontend/app/`               | Route-level UI and layouts only. No direct database logic.                            |
| `frontend/proxy.ts`           | Frontend route guard for public/auth/protected page access.                           |
| `frontend/components/ui/`     | shadcn/ui primitives only. Do not place business-specific components here.            |
| `frontend/components/layout/` | Navbar, sidebar, and protected layout shell.                                          |
| `frontend/components/auth/`   | Login/signup UI components.                                                           |
| `frontend/components/tasks/`  | Task list, cards, filters, search, sort, pagination, empty/loading/error states.      |
| `frontend/components/modals/` | Task create/edit modal and task detail modal.                                         |
| `frontend/hooks/`             | Frontend data-fetching and mutation hooks.                                            |
| `frontend/lib/`               | API client, auth API helpers, query client, validation schemas, utility functions.    |
| `backend/src/modules/`        | Feature modules. Each module owns routes, controller, service, validation, and types. |
| `backend/src/middleware/`     | Cross-cutting Express middleware: auth, validation, error handling.                   |
| `backend/src/lib/`            | Shared backend clients/helpers such as Prisma, JWT, and password hashing.             |
| `backend/prisma/`             | Database schema and migrations only.                                                  |
| `context/`                    | Project context files for AI coding agents and human reviewers.                       |

---

## Frontend Route Groups

Route groups are used only for organization and shared layouts. They do not change the URL path.

```txt
app/(auth)/login/page.tsx       -> /login
app/(auth)/signup/page.tsx      -> /signup
app/(protected)/inbox/page.tsx  -> /inbox
app/(protected)/today/page.tsx  -> /today
app/(protected)/calendar/page.tsx -> /calendar
```

### `(auth)` Group

The `(auth)` group contains unauthenticated pages.

- Uses a common centered auth layout.
- Contains login and signup pages.
- If an authenticated user visits `/login` or `/signup`, `proxy.ts` redirects them to `/inbox`.

### `(protected)` Group

The `(protected)` group contains logged-in application pages.

- Uses the protected app layout.
- Contains sidebar, navbar, and main content area.
- Requires an authentication cookie checked by `proxy.ts`.
- Backend still performs the real authorization check on API requests.

---

## Data Flow

### Authentication Flow

```txt
User submits signup/login form
        ↓
Frontend validates form with Zod
        ↓
Frontend sends request to backend auth API using credentials: "include"
        ↓
Backend validates request body
        ↓
Signup: password is hashed with bcrypt
Login: password is compared with bcrypt
        ↓
Backend signs JWT
        ↓
Backend sets JWT in HTTP-only cookie
        ↓
Frontend redirects user to /inbox
        ↓
On refresh, /api/auth/me restores current user state
```

Frontend must not store JWT in localStorage or sessionStorage.

### Frontend Route Protection Flow

```txt
User requests protected page such as /inbox
        ↓
frontend/proxy.ts checks accessToken cookie
        ↓
No cookie: redirect to /login
        ↓
Cookie exists: allow page request
        ↓
Protected layout renders app shell
        ↓
Page fetches current user/tasks through backend API
```

`proxy.ts` is a user-experience guard, not the final security layer.

### Backend API Protection Flow

```txt
Frontend sends API request with credentials: "include"
        ↓
Browser includes HTTP-only cookie automatically
        ↓
Backend auth middleware reads JWT from cookie
        ↓
JWT is verified
        ↓
Current user id is attached to request
        ↓
Controller/service uses current user id for all task queries
```

The backend authorization check is the real security layer.

### Task List Flow

```txt
User opens /inbox, /today, or /calendar
        ↓
Page decides task view type
        ↓
TanStack Query calls GET /api/tasks with query params
        ↓
Backend auth middleware extracts current user from cookie JWT
        ↓
Task service builds Prisma query scoped to current user_id
        ↓
PostgreSQL returns matching tasks
        ↓
Backend returns consistent paginated response
        ↓
Frontend renders loading, error, empty, or task list/calendar state
```

### Task Mutation Flow

```txt
User creates, edits, completes, or deletes a task
        ↓
Frontend validates form/action data
        ↓
Frontend sends request to protected task endpoint
        ↓
Backend validates request with Zod
        ↓
Backend checks task ownership through current user_id
        ↓
Backend writes to PostgreSQL through Prisma
        ↓
Backend returns consistent API response
        ↓
Frontend invalidates/refetches affected task queries
```

---

## Page-Level Data Rules

### `/inbox`

Shows all non-completed tasks for the current user.

Backend query meaning:

```txt
status != COMPLETED
```

Recommended default sort:

```txt
priority desc, dueDate asc, createdAt desc
```

### `/today`

Shows tasks with `dueDate` equal to the current date.

Backend query meaning:

```txt
dueDate >= startOfToday AND dueDate <= endOfToday
```

This page should show tasks due today. Overdue tasks are not automatically included unless a later product decision changes this.

### `/calendar`

Shows calendar-style task data, including completed and upcoming tasks.

Backend query meaning:

```txt
tasks within selected date range
```

The calendar page may request tasks by month or visible date range.

Example:

```txt
GET /api/tasks?view=calendar&from=2026-06-01&to=2026-06-30
```

Calendar visibility:

- Completed tasks
- Non-completed tasks
- Future tasks
- Tasks grouped by due date

Tasks without a due date should not appear in the calendar unless a separate "No due date" section is intentionally added later.

---

## REST API

### Auth Routes

| Method | Route              | Auth Required | Purpose                                  |
| ------ | ------------------ | ------------- | ---------------------------------------- |
| POST   | `/api/auth/signup` | No            | Create a new user account                |
| POST   | `/api/auth/login`  | No            | Login user and set HTTP-only auth cookie |
| POST   | `/api/auth/logout` | Yes           | Clear HTTP-only auth cookie              |
| GET    | `/api/auth/me`     | Yes           | Return current authenticated user        |

### Task Routes

| Method | Route            | Auth Required | Purpose                                                                                    |
| ------ | ---------------- | ------------- | ------------------------------------------------------------------------------------------ |
| POST   | `/api/tasks`     | Yes           | Create a task                                                                              |
| GET    | `/api/tasks`     | Yes           | List current user's tasks with filters, search, sort, pagination, and view-specific params |
| GET    | `/api/tasks/:id` | Yes           | Fetch a single task owned by current user                                                  |
| PATCH  | `/api/tasks/:id` | Yes           | Update a task owned by current user                                                        |
| DELETE | `/api/tasks/:id` | Yes           | Delete a task owned by current user                                                        |

### Task List Query Params

Required list behavior from assessment:

```txt
GET /api/tasks?page=1&limit=10&status=TODO&search=design&sortBy=dueDate&sortOrder=asc
```

Supported params:

| Param       | Values                             | Purpose                         |
| ----------- | ---------------------------------- | ------------------------------- |
| `page`      | number                             | Current page number             |
| `limit`     | number                             | Number of tasks per page        |
| `status`    | `TODO`, `IN_PROGRESS`, `COMPLETED` | Filter by task status           |
| `search`    | string                             | Search by task title            |
| `sortBy`    | `dueDate`, `priority`, `createdAt` | Sort field                      |
| `sortOrder` | `asc`, `desc`                      | Sort direction                  |
| `view`      | `inbox`, `today`, `calendar`       | Optional frontend view mode     |
| `from`      | ISO date                           | Start date for date-range views |
| `to`        | ISO date                           | End date for date-range views   |

Filters, search, sort, and pagination must work together in the backend query.

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "message": "Request successful"
}
```

For paginated lists:

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 0,
      "totalPages": 0,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

All backend errors should use this shape where possible.

---

## Database Schema

### `users`

| Column          | Type        | Notes                  |
| --------------- | ----------- | ---------------------- |
| `id`            | uuid        | Primary key            |
| `name`          | text        | User display name      |
| `email`         | text        | Unique email           |
| `password_hash` | text        | bcrypt-hashed password |
| `created_at`    | timestamptz | Created timestamp      |
| `updated_at`    | timestamptz | Updated timestamp      |

### `tasks`

| Column        | Type             | Notes                              |
| ------------- | ---------------- | ---------------------------------- |
| `id`          | uuid             | Primary key                        |
| `user_id`     | uuid             | References `users.id`              |
| `title`       | text             | Required                           |
| `description` | text             | Optional                           |
| `status`      | enum/text        | `TODO`, `IN_PROGRESS`, `COMPLETED` |
| `priority`    | enum/text        | `LOW`, `MEDIUM`, `HIGH`            |
| `due_date`    | timestamptz/date | Optional due date                  |
| `created_at`  | timestamptz      | Created timestamp                  |
| `updated_at`  | timestamptz      | Updated timestamp                  |

### Enums

```txt
TaskStatus = TODO | IN_PROGRESS | COMPLETED
TaskPriority = LOW | MEDIUM | HIGH
```

---

## Frontend Libraries and Responsibilities

### `frontend/lib/api.ts`

Owns the shared frontend HTTP wrapper.

Rules:

- Uses `NEXT_PUBLIC_API_URL` as base URL.
- Sends `credentials: "include"` on every request.
- Does not read or write JWT tokens.
- Parses backend response.
- Throws consistent frontend errors for failed API responses.

### `frontend/lib/auth.ts`

Owns auth-related API functions only.

Functions:

```txt
signupUser(input)
loginUser(input)
logoutUser()
getCurrentUser()
```

Rules:

- Does not store tokens.
- Does not read cookies directly.
- Uses `api.ts` for requests.
- Auth persistence is handled by HTTP-only cookies set by the backend.

### `frontend/lib/query-client.ts`

Owns TanStack Query client configuration.

Rules:

- One QueryClient instance should be provided through `QueryProvider.tsx`.
- Do not create new QueryClient instances inside pages or task components.
- Query defaults should be conservative and predictable.

### `frontend/lib/validations.ts`

Owns frontend Zod schemas.

Schemas:

```txt
loginSchema
signupSchema
taskSchema
```

Frontend validation improves user experience only. Backend validation remains mandatory.

### `frontend/hooks/useAuth.ts`

Owns auth hooks.

Responsibilities:

- Current user query using `/api/auth/me`
- Login mutation
- Signup mutation
- Logout mutation
- Redirect to `/inbox` after successful login/signup
- Redirect to `/login` after logout

### `frontend/hooks/useTasks.ts`

Owns task hooks.

Responsibilities:

- Fetch task list with filters/search/sort/pagination/view params
- Fetch single task for detail modal
- Create task mutation
- Update task mutation
- Delete task mutation
- Mark complete mutation
- Invalidate task queries after successful mutations

---

## Authentication and Authorization

### Cookie-Based JWT Auth

JWT is stored in an HTTP-only cookie set by the backend.

Cookie requirements:

```txt
httpOnly: true
secure: true in production
sameSite: lax or none depending on deployment domains
maxAge: defined session duration
```

If frontend and backend are deployed on different domains, CORS and cookie settings must be configured carefully.

### Backend Middleware

`auth.middleware.ts` must:

1. Read JWT from `req.cookies.accessToken`.
2. Verify JWT signature.
3. Attach current user info to the request.
4. Reject unauthenticated requests with `401 Unauthorized`.

### Ownership Rule

Users can only view and modify their own tasks.

Every task query must include the current user id.

Correct:

```txt
where: { id: taskId, userId: currentUser.id }
```

Incorrect:

```txt
where: { id: taskId }
```

---

## Backend Module Responsibilities

### Auth Module

| File                 | Responsibility                                         |
| -------------------- | ------------------------------------------------------ |
| `auth.routes.ts`     | Defines auth endpoints                                 |
| `auth.controller.ts` | Handles request/response logic                         |
| `auth.service.ts`    | Business logic for signup, login, logout, current user |
| `auth.validation.ts` | Zod schemas for signup/login                           |
| `auth.types.ts`      | Auth-specific TypeScript types                         |

### Task Module

| File                 | Responsibility                                                        |
| -------------------- | --------------------------------------------------------------------- |
| `task.routes.ts`     | Defines task endpoints                                                |
| `task.controller.ts` | Handles request/response logic                                        |
| `task.service.ts`    | Business logic for CRUD, filters, search, sort, pagination, ownership |
| `task.validation.ts` | Zod schemas for task writes and query params                          |
| `task.types.ts`      | Task-specific TypeScript types                                        |

---

## Validation Rules

### Signup

- `name` required
- `email` required and valid email
- `password` required
- Password should have minimum length, preferably 8+ characters

### Login

- `email` required and valid email
- `password` required

### Task Create

- `title` required
- `description` optional
- `status` required or default to `TODO`
- `priority` required or default to `MEDIUM`
- `dueDate` optional

### Task Update

- Partial update allowed
- If present, each field must be valid
- Empty update body should return validation error

---

## Sorting Rules

Supported sort fields:

```txt
dueDate
priority
createdAt
```

Supported sort orders:

```txt
asc
desc
```

Priority order should be deterministic:

```txt
HIGH > MEDIUM > LOW
```

If Prisma enum sorting does not match product priority order, implement a controlled mapping or raw ordering carefully.

Default sort:

```txt
createdAt desc
```

Recommended inbox sort:

```txt
priority desc, dueDate asc, createdAt desc
```

---

## UI State Requirements

Every task list view should handle:

- Loading state
- Empty state
- Error state
- Paginated state
- Search state
- Filtered state
- Form validation errors
- API failure messages

Task modals should handle:

- Create mode
- Edit mode
- Detail mode
- Submit loading state
- Validation errors
- Close/reset behavior after success

---

## Invariants

Rules the coding agent must not violate:

- `frontend/proxy.ts` must live directly under `frontend/`, not inside `frontend/app/`.
- Route groups `(auth)` and `(protected)` must not appear in the URL.
- Authenticated landing page is `/inbox`, not `/dashboard`.
- `/inbox` shows non-completed tasks only.
- `/today` shows tasks due today only.
- `/calendar` shows calendar-style task data including completed and upcoming tasks.
- No `/tasks/new`, `/tasks/[id]`, or `/tasks/[id]/edit` frontend pages in the current version.
- Task create/edit/detail interactions use modals.
- Frontend must not store JWT in localStorage or sessionStorage.
- Frontend API requests must use `credentials: "include"`.
- Backend auth middleware must read JWT from HTTP-only cookie.
- Backend task queries must always be scoped to the current user id.
- Components must not directly call the database.
- Frontend pages/components must not manually build security decisions based only on local state.
- Backend validation is mandatory even if frontend validation exists.
- Error responses must be consistent.
- Search, filter, sort, and pagination must work together from the backend.
- Do not add bonus features until core implementation is complete and reviewed.

---

## Testing Plan

At least three meaningful tests are required.

Recommended backend tests:

1. Signup creates a user and stores a hashed password, not the raw password.
2. Login sets an HTTP-only auth cookie and `/api/auth/me` returns the current user.
3. A user cannot fetch, update, or delete another user's task.
4. `GET /api/tasks` supports combined filtering, search, sort, and pagination.

Only three are required, but four gives stronger assessment coverage.

---

## Environment Variables

### Root `.env.example`

```txt
# Backend
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d
COOKIE_NAME=accessToken
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Deployment Assumptions

- Frontend can be deployed to Vercel.
- Backend can be deployed to Render, Railway, Fly.io, or similar Node hosting.
- PostgreSQL can be hosted on Neon, Supabase, Railway, Render, or similar.
- If frontend and backend are on different domains, backend must configure CORS with credentials enabled.
- Cookie `sameSite` and `secure` options must match the deployment setup.

---

## Current Trade-Offs

- Task detail/create/edit routes are removed for now in favor of modals. This simplifies navigation and creates a faster app-like user experience.
- Calendar is included as a core page because it replaces the earlier upcoming page and gives clearer meaning for completed and future dated tasks.
- JWT is stored in HTTP-only cookies rather than localStorage for safer auth persistence.
- Bonus features are excluded from this architecture until the core assessment requirements are stable.

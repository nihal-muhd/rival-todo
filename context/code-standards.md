# Code Standards

Implementation rules and conventions for the Task Management Application. The AI agent must follow these rules in every session to keep the project consistent, readable, and assessment-ready.

---

## Engineering Mindset

The AI agent on this project operates as a senior engineer. This means:

- **Think before implementing** — understand what is being built and why before writing a single line
- **Read context files first** — never assume, always verify against architecture.md and project-overview.md
- **Scope is sacred** — only build what the current feature requires. Never go beyond scope even if it seems helpful
- **Every feature must be testable** — if it cannot be verified immediately after implementation, it is incomplete
- **Clean over clever** — simple readable code that a junior developer can understand is always preferred over clever abstractions
- **One thing at a time** — complete one feature fully before touching the next
- **Failures are expected** — wrap agent operations in try/catch, log failures, never let one failure crash everything

---

## TypeScript

- Strict mode enabled in tsconfig.json — no exceptions
- Never use `any` — use `unknown` and narrow the type
- Never use type assertions (`as SomeType`) unless absolutely necessary and commented why
- All function parameters and return types must be explicitly typed
- Use `type` for object shapes and unions — use `interface` only for extendable component props
- All async functions must have proper error handling — never let promises float unhandled
- Use `const` by default — only use `let` when reassignment is necessary

---

## Monorepo Rules

The repository is a simple monorepo.

```txt
/
├── AGENTS.md
├── context/
├── frontend/
├── backend/
├── README.md
├── .env.example
└── package.json
```

- Frontend code stays inside `frontend/`.
- Backend code stays inside `backend/`.
- Shared planning/context files stay inside `context/`.
- Do not import frontend files into backend.
- Do not import backend internals into frontend.
- Frontend communicates with backend only through HTTP API calls.

---

## Frontend Standards

### Next.js

- Use App Router only.
- Do not use Pages Router.
- Use route groups for layout separation:

```txt
frontend/app/
├── page.tsx
├── (auth)/
│   ├── layout.tsx
│   ├── login/page.tsx
│   └── signup/page.tsx
└── (protected)/
    ├── layout.tsx
    ├── inbox/page.tsx
    ├── today/page.tsx
    └── calendar/page.tsx
```

- `frontend/proxy.ts` is used for frontend route guarding.
- `proxy.ts` must be placed directly inside `frontend/`, not inside `frontend/app/`.
- Use Server Components by default.
- Add `"use client"` only when the component needs:
  - React state.
  - React effects.
  - Browser APIs.
  - Event handlers.
  - TanStack Query hooks.
  - Form libraries.
- Do not add `"use client"` to layout files unless absolutely necessary.

---

## Route Protection

Route protection has three layers:

1. `frontend/proxy.ts` redirects unauthenticated users away from protected pages.
2. Protected frontend layout provides the authenticated app shell.
3. Backend auth middleware verifies the JWT cookie on every protected API request.

The real security is always in the backend.

Protected frontend routes:

```txt
/inbox
/today
/calendar
```

Auth routes:

```txt
/login
/signup
```

Rules:

- If an unauthenticated user opens a protected route, redirect to `/login`.
- If an authenticated user opens `/login` or `/signup`, redirect to `/inbox`.
- Do not rely only on client-side `useEffect` redirects.
- Backend must still verify every protected API request.

---

## Authentication Rules

Authentication uses JWT stored in an HTTP-only cookie.

Required behavior:

- Signup creates a user with a hashed password.
- Login verifies credentials and sets an HTTP-only cookie.
- Logout clears the cookie.
- `/auth/me` returns the current authenticated user.
- Frontend auth state is restored after refresh using `/auth/me`.

Strict rules:

- Never store JWT in localStorage.
- Never store JWT in sessionStorage.
- Never manually expose JWT to frontend JavaScript.
- Frontend requests must use `credentials: "include"`.
- Backend reads the token from cookies, not from localStorage or browser state.
- Passwords must be hashed with bcrypt before storing.

Cookie settings:

```ts
httpOnly: true;
secure: process.env.NODE_ENV === "production";
sameSite: "lax";
```

---

## Frontend Folder Naming

- Folders use kebab-case where applicable.
- Component files use PascalCase.
- Hook files use camelCase and start with `use`.
- Utility files use camelCase.
- One component per file unless the extra component is tiny and private to the file.
- Do not use barrel exports outside `components/ui/` unless there is a clear reason.

Examples:

```txt
components/layout/Sidebar.tsx
components/auth/LoginForm.tsx
components/tasks/TaskList.tsx
components/modals/TaskFormModal.tsx
hooks/useTasks.ts
lib/query-client.ts
```

---

## Frontend Component Structure

Use this order:

```tsx
"use client"; // only when needed

// 1. External imports
import { useState } from "react";

// 2. Internal imports
import { Button } from "@/components/ui/button";

// 3. Types
type Props = {
  taskId: string;
};

// 4. Component
export function ComponentName({ taskId }: Props) {
  // state
  // derived values
  // handlers
  // return JSX
}
```

Rules:

- Prefer named exports for components.
- Define props type directly above the component unless reused elsewhere.
- Keep components focused on UI.
- Components should not contain raw API request logic.
- Use hooks such as `useTasks` and `useAuth` for data operations.
- No inline styles. Use Tailwind classes.

---

## Frontend Data Fetching

Use TanStack Query for frontend API state.

Use TanStack Query for:

- Current user query.
- Task list query.
- Single task query if needed by modal.
- Create task mutation.
- Update task mutation.
- Delete task mutation.
- Mark complete mutation.

Do not use TanStack Query for:

- Modal open or close state.
- Sidebar state.
- Form input state before submit.
- Simple local UI toggles.

Rules:

- `lib/query-client.ts` defines QueryClient configuration.
- `components/providers/QueryProvider.tsx` wraps the app.
- `hooks/useTasks.ts` owns task queries and mutations.
- `hooks/useAuth.ts` owns auth queries and mutations.
- Query keys must be stable and explicit.

Example query keys:

```ts
["auth", "me"][("tasks", filters)][("tasks", "detail", taskId)];
```

---

## Frontend API Client

All frontend API calls go through `frontend/lib/api.ts`.

Rules:

- Always use `credentials: "include"`.
- Always parse the standard API response shape.
- Throw a readable error when the response is not OK.
- Do not call `fetch` directly inside components.

Standard frontend request behavior:

```ts
fetch(`${API_BASE_URL}${endpoint}`, {
  ...options,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    ...options.headers,
  },
});
```

---

## Frontend Validation

Use Zod schemas in `frontend/lib/validations.ts`.

Required schemas:

- Login form schema.
- Signup form schema.
- Create task schema.
- Update task schema.
- Task filter schema if useful.

Rules:

- Frontend validation improves UX only.
- Backend validation is still required and is the source of truth.
- Error messages should be short and user-friendly.

---

## Backend Standards

### Express Structure

Backend uses feature modules.

```txt
backend/src/
├── server.ts
├── app.ts
├── config/
├── modules/
│   ├── auth/
│   └── tasks/
├── middleware/
├── lib/
├── utils/
└── tests/
```

Rules:

- `server.ts` starts the HTTP server only.
- `app.ts` configures Express middleware and routes.
- Routes define endpoints only.
- Controllers handle request and response mapping.
- Services contain business logic.
- Validation files contain Zod schemas.
- Middleware contains cross-cutting concerns such as auth, validation, and error handling.
- Prisma access should happen in services, not controllers.

---

## Backend Route Standards

Required routes:

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

Rules:

- All task routes are protected.
- Auth routes should return consistent response shapes.
- Write routes must validate request body.
- ID params must be validated.
- Do not return password hashes in any response.

---

## API Response Shape

All API responses must use a consistent shape.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Human readable error message"
}
```

Validation error:

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

Rules:

- Never return raw Prisma errors.
- Never return raw Zod errors directly.
- Never expose stack traces to the frontend.
- Use proper HTTP status codes.

---

## HTTP Status Codes

Use these consistently:

```txt
200 OK                 Successful read/update/delete where body is returned
201 Created            Successful create
204 No Content          Successful delete without body, if chosen
400 Bad Request         Invalid input
401 Unauthorized        Not logged in or invalid token
403 Forbidden           Authenticated but not allowed
404 Not Found           Resource does not exist or does not belong to user
409 Conflict            Email already exists
500 Internal Error      Unexpected server error
```

For task ownership failures, prefer `404 Not Found` so users cannot infer another user's task exists.

---

## Backend Validation

Use Zod for backend validation.

Required validation files:

```txt
backend/src/modules/auth/auth.validation.ts
backend/src/modules/tasks/task.validation.ts
```

Rules:

- Validate signup body.
- Validate login body.
- Validate create task body.
- Validate update task body.
- Validate task list query params.
- Validate `id` params.
- Never trust frontend validation.

---

## Prisma and Database Rules

Prisma is the only database access layer.

Rules:

- Use Prisma migrations for schema changes.
- Do not manually change the database schema outside migrations.
- Keep model names singular where appropriate: `User`, `Task`.
- Use enums for task status and priority.
- Add indexes for common filters.
- Every task query must be scoped by `userId`, except future approved admin features.
- Do not hard-delete users in this assessment unless explicitly required.

Required task ownership rule:

```ts
where: {
  id: taskId,
  userId: currentUser.id,
}
```

Never do this for protected task access:

```ts
where: {
  id: taskId,
}
```

---

## Task Domain Rules

Task fields:

```txt
title
description
status
priority
dueDate
userId
createdAt
updatedAt
```

Allowed statuses:

```txt
TODO
IN_PROGRESS
COMPLETED
```

Allowed priorities:

```txt
LOW
MEDIUM
HIGH
```

Page rules:

- Inbox returns all tasks where status is not `COMPLETED`.
- Today returns tasks where due date is today.
- Calendar returns tasks grouped or displayed by due date, including completed and upcoming tasks.
- Tasks without due date should not appear in Today.
- Tasks without due date may appear in Inbox if not completed.

---

## Search, Filter, Sort, Pagination Rules

`GET /tasks` must support these query params:

```txt
status
search
sortBy
sortOrder
page
limit
view
```

Recommended `view` values:

```txt
inbox
today
calendar
```

Search:

- Search by task title.
- Case-insensitive.
- Works together with filters, sort, and pagination.

Filter:

- Filter by status.
- Optional priority filter can be added only if already planned.

Sort:

Allowed fields:

```txt
dueDate
priority
createdAt
```

Rules:

- Validate sort fields to avoid unsafe dynamic queries.
- Default sort should be predictable.
- Pagination is backend-driven, not frontend-only.
- Response should include items and pagination metadata.

---

## Error Handling

Backend:

- Use centralized error middleware.
- Controllers should pass unexpected errors to the error middleware.
- Log server errors with context.
- Return generic messages for unexpected errors.

Frontend:

- Show loading states during API calls.
- Show empty states when no tasks exist.
- Show human-readable error states when requests fail.
- Do not display raw backend errors unless they are safe validation messages.

No empty catch blocks are allowed.

---

## Testing Standards

At least 3 meaningful tests are required.

Recommended backend tests:

1. Signup creates a user and stores a hashed password.
2. Login sets an HTTP-only cookie.
3. A user cannot access another user's task.
4. `GET /tasks` supports search, filter, sort, and pagination together.

Rules:

- Tests should verify real assessment requirements.
- Do not write only shallow tests.
- Test names should describe behavior clearly.
- Test database data must be isolated or cleaned between tests.

---

## Environment Variables

All required variables must appear in `.env.example`.

Root or backend variables:

```txt
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
CLIENT_URL=
NODE_ENV=
PORT=
```

Frontend variables:

```txt
NEXT_PUBLIC_API_URL=
```

Rules:

- Never hardcode secrets.
- Never commit real `.env` files.
- Do not expose backend secrets with `NEXT_PUBLIC_`.
- Only values needed in the browser may use `NEXT_PUBLIC_`.

---

## Import Rules

Frontend:

- Use `@/` alias inside the frontend app.
- Avoid long relative imports like `../../../components/...`.

Backend:

- Use clean relative imports or configure a backend alias if the setup supports it.
- Keep imports directed inward:
  - routes may import controllers.
  - controllers may import services.
  - services may import Prisma/lib utilities.
  - services should not import controllers or routes.

---

## Comments

- Do not add comments explaining obvious code.
- Comments should explain why a non-obvious decision exists.
- Do not leave TODO comments in committed code.
- Do not leave commented-out code.

---

## Approved Dependencies

Do not install new packages without a clear reason.

Frontend approved dependencies:

- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `shadcn/ui` components
- `lucide-react`
- `zod`
- `react-hook-form`
- `@hookform/resolvers`
- `@tanstack/react-query`

Backend approved dependencies:

- `express`
- `cors`
- `cookie-parser`
- `dotenv`
- `zod`
- `bcryptjs` or `bcrypt`
- `jsonwebtoken`
- `prisma`
- `@prisma/client`

Testing approved dependencies:

- `vitest` or `jest`
- `supertest`

Rules:

- Prefer built-in platform features where practical.
- Do not add state management libraries unless the plan changes.
- Do not add UI libraries beyond shadcn/ui unless explicitly approved.

---

## Definition of Done

A feature is done only when:

- UI is implemented and responsive.
- Loading, empty, and error states are handled where applicable.
- Backend logic is implemented if the feature requires data.
- Input validation exists on frontend and backend where applicable.
- Auth and ownership rules are respected.
- Code follows this standards file.
- The feature can be manually tested.
- Tests are added when the feature touches important backend behavior.

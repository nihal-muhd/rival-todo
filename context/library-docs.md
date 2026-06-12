# Library Docs

Project-specific usage patterns for third-party libraries used in the Task Management Application.

This file is for the Codex agent. It does not replace official documentation. Before implementing a feature, read the relevant section here, then verify library-specific API details from official docs if there is any uncertainty.

---

## Before Using Any Library

Before adding or using a library:

1. Check `AGENTS.md` for project-specific instructions.
2. Check `context/architecture.md` for approved architecture.
3. Check `context/code-standards.md` for implementation rules.
4. Use this file for project-specific library patterns.
5. Do not add new packages unless the project clearly needs them.

Order of authority:

```txt
AGENTS.md → architecture.md → code-standards.md → library-docs.md → official docs → general knowledge
```

---

## Next.js 16

Used in: `frontend/`

Purpose:

- Frontend application framework
- App Router routing
- Route groups for auth/protected layouts
- Proxy-based route guard

### App Router Rules

Use App Router only.

Allowed route structure:

```txt
frontend/
├── proxy.ts
└── app/
    ├── layout.tsx
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

Route groups must not affect URLs:

```txt
(auth)/login/page.tsx       → /login
(protected)/inbox/page.tsx  → /inbox
```

### Server and Client Components

All components are Server Components by default.

Use `"use client"` only when the file needs:

- `useState`
- `useEffect`
- React event handlers
- browser APIs
- TanStack Query hooks
- form state
- modal state

Do not add `"use client"` to layout files unless required.

### Proxy Route Guard

Use `frontend/proxy.ts`, not `middleware.ts`.

`proxy.ts` checks whether the HTTP-only auth cookie exists before allowing protected pages.

Protected routes:

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

- Unauthenticated user visiting protected route → redirect to `/login`
- Authenticated user visiting `/login` or `/signup` → redirect to `/inbox`
- Proxy is only a frontend route guard
- Backend auth middleware is still required for real API security

Example:

```typescript
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/inbox", "/today", "/calendar"];
const authRoutes = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/inbox", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/inbox/:path*",
    "/today/:path*",
    "/calendar/:path*",
    "/login",
    "/signup",
  ],
};
```

---

## React Hook Form

Used in:

- `LoginForm.tsx`
- `SignupForm.tsx`
- `TaskForm.tsx`
- `TaskFormModal.tsx`

Purpose:

- Form state management
- Client-side validation integration with Zod
- Clean form submit handling

Rules:

- Use React Hook Form for all non-trivial forms.
- Use Zod schemas from `frontend/lib/validations.ts`.
- Do not duplicate validation rules inside components.
- Show field-level errors below fields.
- Disable submit button during submit.

Example:

```typescript
const form = useForm<TaskFormValues>({
  resolver: zodResolver(taskSchema),
  defaultValues: {
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
  },
});
```

---

## Zod

Used in:

- Frontend form validation
- Backend request body validation
- Environment variable validation

Purpose:

- Runtime validation
- Type inference
- Consistent validation rules

### Frontend

File:

```txt
frontend/lib/validations.ts
```

Use for:

- login schema
- signup schema
- task create/edit schema

### Backend

Files:

```txt
backend/src/modules/auth/auth.validation.ts
backend/src/modules/tasks/task.validation.ts
backend/src/config/env.ts
```

Rules:

- Every write endpoint must validate input.
- Never trust frontend validation alone.
- Return a consistent validation error response.
- Keep frontend and backend schemas similar, but do not import frontend schemas into backend.

Example:

```typescript
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).default("TODO"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  dueDate: z.string().datetime().optional(),
});
```

---

## TanStack Query

Used in:

- `frontend/lib/query-client.ts`
- `frontend/components/providers/QueryProvider.tsx`
- `frontend/hooks/useAuth.ts`
- `frontend/hooks/useTasks.ts`

Purpose:

- Server-state management
- Task fetching
- Auth user fetching
- Mutations
- Cache invalidation
- Loading/error states

### Query Client

Create one shared query client.

```typescript
"use client";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
    },
  },
});
```

### Provider

```typescript
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

### Query Keys

Use stable query keys:

```typescript
["current-user"][("tasks", filters)][("task", taskId)];
```

Rules:

- Use TanStack Query for API server state.
- Do not use it for local UI state like modal open/close.
- After create/update/delete task, invalidate `['tasks']`.
- For optimistic UI, always include rollback on error if added later.

---

## Fetch API

Used in:

- `frontend/lib/api.ts`

Purpose:

- Shared frontend API request wrapper
- Send cookies with requests
- Normalize errors

Rules:

- Do not call `fetch()` directly from components.
- Components call hooks.
- Hooks call functions in `lib/auth.ts` or `useTasks.ts`.
- `api.ts` must use `credentials: "include"`.
- Do not manually attach JWT tokens.
- Do not use localStorage for auth.

Example:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data as T;
}
```

---

## Express

Used in: `backend/`

Purpose:

- REST API server
- Auth routes
- Task routes
- Error handling
- Validation middleware

### App Setup

File:

```txt
backend/src/app.ts
```

Rules:

- Keep server startup in `server.ts`.
- Keep Express app configuration in `app.ts`.
- Use route modules, not route definitions inside `app.ts`.
- Every route should return the shared API response format.

Recommended middleware order:

```typescript
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware);
```

Rules:

- Enable CORS credentials because auth uses HTTP-only cookies.
- Never use `origin: "*"` with credentials.
- Use one trusted frontend origin from environment variables.
- Never expose raw errors to the frontend.

---

## cookie-parser

Used in:

- `backend/src/app.ts`
- `backend/src/middleware/auth.middleware.ts`

Purpose:

- Parse cookies from incoming requests
- Read `accessToken` cookie in auth middleware

Rules:

- Use HTTP-only cookie named `accessToken`.
- Backend reads cookie using `req.cookies.accessToken`.
- Frontend never reads or stores the token.
- Clear cookie during logout.

Login cookie example:

```typescript
res.cookie("accessToken", token, {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

Logout example:

```typescript
res.clearCookie("accessToken", {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
});
```

Important:

- If frontend and backend are deployed on different domains, production cookies may need `sameSite: "none"` and `secure: true`.
- If running locally on localhost, `sameSite: "lax"` is usually simpler.

---

## jsonwebtoken

Used in:

- `backend/src/lib/jwt.ts`
- `backend/src/modules/auth/auth.service.ts`
- `backend/src/middleware/auth.middleware.ts`

Purpose:

- Sign JWT after login/signup
- Verify JWT for protected API routes

Rules:

- JWT contains only minimum data.
- Include `userId` in payload.
- Do not include password, password hash, or sensitive data.
- Use one helper to sign tokens.
- Use one helper to verify tokens.
- Read JWT from cookie, not Authorization header.

Payload shape:

```typescript
type JwtPayload = {
  userId: string;
};
```

---

## bcrypt

Used in:

- `backend/src/lib/password.ts`
- `backend/src/modules/auth/auth.service.ts`

Purpose:

- Hash user passwords before storing
- Compare login password against stored hash

Rules:

- Never store plain-text passwords.
- Never return password hash in API responses.
- Use a password helper file.
- Use bcrypt salt rounds from environment or a constant.

Example:

```typescript
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function comparePassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}
```

---

## Prisma ORM

Used in:

- `backend/prisma/schema.prisma`
- `backend/src/lib/prisma.ts`
- backend services
- backend tests

Purpose:

- PostgreSQL schema management
- Type-safe DB access
- Migrations

### Prisma Client

File:

```txt
backend/src/lib/prisma.ts
```

Use a single shared Prisma client instance.

```typescript
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

Rules:

- Services use Prisma.
- Controllers do not call Prisma directly.
- Never query tasks without ownership filter.
- Never expose password hash.
- Use Prisma migrations for schema changes.

### Task Ownership

Every task read/update/delete must include the authenticated user ID.

Correct:

```typescript
await prisma.task.findFirst({
  where: {
    id: taskId,
    userId,
  },
});
```

Wrong:

```typescript
await prisma.task.findUnique({
  where: { id: taskId },
});
```

### Search, Filter, Sort, Pagination

All list behavior must happen in the database query.

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

View-specific behavior:

```txt
view=inbox     → status != COMPLETED
view=today     → dueDate is today
view=calendar  → completed + upcoming tasks grouped by date on frontend
```

Rules:

- Do not fetch all tasks and filter only on frontend.
- Always include `userId` in `where`.
- Use `skip` and `take` for pagination.
- Return total count for pagination UI.
- Validate `sortBy` and `sortOrder` before using in Prisma.

---

## shadcn/ui

Used in:

- `frontend/components/ui/`
- form components
- buttons
- inputs
- cards
- modals/dialogs

Purpose:

- Consistent UI primitives

Rules:

- shadcn/ui components live only in `components/ui/`.
- Do not edit generated shadcn components heavily.
- Compose feature components outside `components/ui/`.
- Use Dialog for `TaskFormModal` and `TaskDetailModal`.
- Use Card for auth cards and task cards.
- Use Button/Input/Select/Textarea for forms.

---

## lucide-react

Used in frontend components for icons.

Rules:

- Use simple icons only when they improve clarity.
- Do not overuse icons.
- Keep icon size consistent.
- Do not import the whole icon package.

Example:

```typescript
import { Calendar, Inbox, Search } from "lucide-react";
```

---

## Tailwind CSS

Used in frontend styling.

Rules:

- Use Tailwind classes for styling.
- Keep components responsive by default.
- Do not use inline styles.
- Do not hardcode repeated arbitrary values if a reusable class/component is better.
- Keep UI simple, polished, and readable.

Responsive expectations:

```txt
Mobile: single-column task layout
Desktop: sidebar + main content layout
```

---

## Testing Libraries

Used in backend tests.

Recommended:

- Vitest or Jest
- Supertest for Express API tests

Required meaningful tests:

1. Signup/login creates user and sets auth cookie.
2. User cannot access another user's task.
3. Task listing supports search + filter + sort + pagination together.

Rules:

- Tests should run from the backend package.
- Use a separate test database if configured.
- Do not test implementation details.
- Test real API behavior.
- At least 3 tests must be included before final submission.

---

## Approved Dependencies

Frontend:

```txt
next
react
react-dom
@tanstack/react-query
react-hook-form
@hookform/resolvers
zod
lucide-react
class-variance-authority
clsx
tailwind-merge
shadcn/ui components
tailwindcss
```

Backend:

```txt
express
cors
cookie-parser
jsonwebtoken
bcrypt
zod
prisma
@prisma/client
```

Testing:

```txt
vitest or jest
supertest
```

Do not add new dependencies without updating this file and `code-standards.md`.

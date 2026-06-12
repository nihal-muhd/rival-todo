# Project Overview

## About the Project

This project is a full-stack task management application built for a developer assessment. It helps users manage personal tasks with authentication, task ownership, filtering, search, sorting, pagination, and a clean responsive interface.

The application uses a separate frontend and backend inside one monorepo:

- Frontend: Next.js 16 App Router
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT stored in HTTP-only cookies

The goal is to build a simple, reliable, production-style task app rather than an over-engineered feature-heavy app.

---

## The Problem It Solves

People need a clear way to capture, review, and complete tasks without losing track of what is due today or what is coming later.

This app separates work into three practical views:

- Inbox: active tasks that are not completed
- Today: tasks due today
- Calendar: date-based view of completed and upcoming tasks

The app focuses on clarity, ownership, and correctness. Each user can only access their own tasks.

---

## Pages

```txt
/             → Public homepage
/login        → Login page
/signup       → Signup page
/inbox        → Authenticated landing page after login; shows all non-completed tasks
/today        → Shows tasks due today only
/calendar     → Calendar-style view showing completed and upcoming tasks
```

Task create, edit, and detail views are handled through modals, not separate pages.

```txt
TaskFormModal       → Create and edit tasks
TaskDetailModal     → View task details
```

---

## Navigation

Authenticated app pages use a sidebar-based layout.

Primary navigation items:

```txt
Inbox
Today
Calendar
```

Public pages use a simple top navbar.

Homepage navbar:

```txt
Logo
Start for free button
```

---

## Core User Flow

### Homepage

- User lands on `/`
- Homepage shows a simple marketing layout
- Navbar has logo and Start for free button
- Hero section includes:
  - Headline: `Clarity, finally`
  - Subheadline: focused on simplifying work and life
  - Image/preview section
- Get Started / Start for free behavior:
  - Logged out user → `/login`
  - Logged in user → `/inbox`

### Authentication

- User can sign up with name, email, and password
- User can log in with email and password
- Backend hashes passwords before storing them
- Backend issues a JWT after successful login
- JWT is stored in an HTTP-only cookie
- Frontend does not store tokens in localStorage
- Page refresh should keep the user logged in
- Logout clears the auth cookie

### Route Protection

- Public routes:

```txt
/
/login
/signup
```

- Protected routes:

```txt
/inbox
/today
/calendar
```

- Next.js `frontend/proxy.ts` redirects unauthenticated users away from protected pages
- Backend auth middleware verifies the JWT cookie for every protected API route
- Backend ownership checks ensure users can only access their own tasks

### Inbox

- `/inbox` is the main page after successful login
- Shows all non-completed tasks
- Supports:
  - Search by title
  - Filter by status
  - Sort by due date, priority, or created date
  - Pagination
  - Mark task as complete
  - Delete task
  - Open task detail modal
  - Open create/edit task modal

### Today

- `/today` shows tasks where the due date is today
- It does not include overdue tasks by default
- Supports the same task actions as Inbox:
  - View details
  - Create task
  - Edit task
  - Mark complete
  - Delete task

### Calendar

- `/calendar` shows tasks grouped by date
- It includes completed and upcoming tasks
- It is a planning/history view, not only an upcoming-task list
- Users should be able to visually understand what is completed and what is scheduled later

### Task Modals

Task creation, editing, and detail viewing happen through modals.

#### Add/Edit Task Modal

Fields:

```txt
Title
Description
Status
Priority
Due date
```

Rules:

- Client-side validation with Zod
- Backend validation with Zod
- Title is required
- Status and priority must use approved enum values
- Form shows loading, error, and success states where needed

#### Task Detail Modal

Displays:

```txt
Title
Description
Status
Priority
Due date
Created date
Updated date
```

Actions:

```txt
Edit
Mark complete
Delete
Close
```

---

## Backend API

### Auth Routes

```txt
POST /auth/signup     → Create user
POST /auth/login      → Log in user and set HTTP-only cookie
POST /auth/logout     → Clear auth cookie
GET  /auth/me         → Return current authenticated user
```

### Task Routes

```txt
POST   /tasks         → Create task
GET    /tasks         → List tasks with filters, search, sort, and pagination
GET    /tasks/:id     → Fetch single task
PATCH  /tasks/:id     → Update task
DELETE /tasks/:id     → Delete task
```

All task routes are protected.

All task queries must be scoped by the authenticated user's ID.

---

## Task List Behavior

The task list endpoint supports all of these working together:

```txt
status filter
search by title
sort by due date, priority, or created date
pagination
```

Example query:

```txt
GET /tasks?status=TODO&search=design&sortBy=dueDate&sortOrder=asc&page=1&limit=10
```

The backend is responsible for applying filters, search, sorting, and pagination. The frontend should not fetch all tasks and filter everything locally.

---

## Data Architecture

### users

Stores registered users.

```txt
id
name
email
passwordHash
createdAt
updatedAt
```

### tasks

Stores user-owned tasks.

```txt
id
userId
title
description
status
priority
dueDate
createdAt
updatedAt
```

### Enums

Status:

```txt
TODO
IN_PROGRESS
COMPLETED
```

Priority:

```txt
LOW
MEDIUM
HIGH
```

---

## Frontend Architecture

Final frontend route structure:

```txt
frontend/
├── proxy.ts
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── (protected)/
│       ├── layout.tsx
│       ├── inbox/page.tsx
│       ├── today/page.tsx
│       └── calendar/page.tsx
├── components/
├── lib/
├── hooks/
└── types/
```

Route groups are used for layout organization only. They do not affect the URL.

---

## Features In Scope

- Public homepage
- Signup and login with email/password
- JWT auth using HTTP-only cookies
- Password hashing before storage
- Auth persistence after page refresh
- Protected frontend routes
- Protected backend task routes
- User task ownership
- Inbox page for all non-completed tasks
- Today page for tasks due today only
- Calendar page for completed and upcoming tasks
- Task create/edit/detail modals
- Create task
- List tasks
- View single task
- Update task
- Delete task
- Mark task as complete
- Search tasks by title
- Filter tasks by status
- Sort tasks by due date, priority, and created date
- Pagination
- Loading states
- Empty states
- Error states
- Responsive layout for mobile and desktop
- README with setup instructions
- `.env.example`
- At least 3 meaningful tests

---

## Features Out of Scope For Initial Build

These are intentionally excluded from the first build to keep the assessment focused and stable:

- Admin role
- Real-time updates
- File attachments
- Activity log
- Docker setup
- CI pipeline
- Dark mode
- Team accounts
- Notifications
- Mobile app
- Separate task detail page
- Separate task create page
- Separate task edit page

These can be added later as bonus features only after the core app is complete and stable.

---

## Target User

A user who wants a simple and reliable task manager to:

- Capture tasks quickly
- Track active work
- See what is due today
- Review upcoming and completed work in a calendar-style view
- Use the app securely with their own account

---

## Success Criteria

The project is successful when:

- A user can sign up, log in, refresh the page, and stay authenticated
- Passwords are hashed before storage
- JWT is stored in an HTTP-only cookie, not localStorage
- Unauthenticated users cannot access `/inbox`, `/today`, or `/calendar`
- Authenticated users can create, edit, complete, delete, and view tasks
- Users can only view and modify their own tasks
- `/inbox` shows all non-completed tasks
- `/today` shows only tasks due today
- `/calendar` shows completed and upcoming tasks grouped by date
- Search, filter, sort, and pagination work together
- UI handles loading, empty, and error states cleanly
- App works on mobile and desktop
- README clearly explains setup and environment variables
- At least 3 meaningful tests pass

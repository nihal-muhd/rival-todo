# Task Management Application

A full-stack task management application built as part of a Full-Stack Developer assessment.

The project is structured as a monorepo with a separate frontend and backend.

```txt
/
├── frontend/   # Next.js application
├── backend/    # Express API
├── context/    # Project planning and agent context files
└── README.md
```

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma
- PostgreSQL

### Database

- Neon PostgreSQL

---

## Why Prisma is used

Prisma is used as the layer between the backend and PostgreSQL.

It helps us:

- Define the database schema in one place
- Create and track database migrations
- Write cleaner database queries
- Get TypeScript support for database models

Without Prisma, we would need to manually write raw SQL queries and maintain database changes separately. Prisma keeps the database structure and backend code easier to manage for this assessment project.

## Project Setup

Install dependencies separately for frontend and backend.

```bash
cd frontend
npm install
```

```bash
cd backend
npm install
```

---

## Environment Variables

Create `.env` files where needed.

### Backend `.env`

Create:

```txt
backend/.env
```

Example:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL="your_neon_database_url"

JWT_SECRET="replace_with_a_long_secret"
JWT_EXPIRES_IN="7d"

FRONTEND_URL="http://localhost:3000"
```

### Frontend `.env.local`

Create:

```txt
frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

Do not commit real `.env` files.

---

## Database Setup

Run Prisma migration from the backend folder:

```bash
cd backend
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

Optional: open Prisma Studio.

```bash
npx prisma studio
```

---

## Run the Project

### Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

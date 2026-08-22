# Chandogya Prodigies

Gurukul-inspired learning platform built with Next.js, Prisma, NextAuth, and Razorpay.

## Local Setup

```bash
npm install
npm run db:setup
npm run dev
```

Open `http://localhost:3000`.

Default local admin:

```txt
Email: admin@chandogyaprodigies.com
Password: Admin@12345
```

Override those with `ADMIN_EMAIL` and `ADMIN_PASSWORD` before running `npm run db:setup`.

## Required Environment

Copy `.env.example` to `.env` and set:

```txt
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
```

For production:

```txt
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="use-a-long-generated-secret"
DATABASE_URL="your-production-database-url"
RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_SECRET="..."
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_..."
```

## Database

The current local database is SQLite through Prisma and `better-sqlite3`.

Useful commands:

```bash
npm run db:generate
npm run db:bootstrap
npm run db:seed:admin
npm run db:seed:courses
npm run db:setup
```

`npm run db:setup` runs all database setup steps in order.

For production scale, move from local SQLite to a hosted database before launch. The Prisma schema already includes users, courses, lessons, contact messages, newsletter subscribers, enrollments, payment orders, and password reset tokens.

## Auth And Admin

- `/signup` creates student accounts.
- `/login` uses email or username credentials.
- `/forgot-password` creates a secure reset token.
- `/reset-password` updates the password with a valid token.
- `/dashboard` shows enrolled courses.
- `/admin` and `/admin/courses` require an admin session.

Password reset email delivery is not connected yet. The reset request API returns a local reset link for development. Connect SMTP or a transactional email provider before production launch.

## Payments

Paid course checkout is wired through Razorpay order creation and signature verification. Set Razorpay keys before testing paid enrollments.

Free course enrollment works without Razorpay.

## Verification

```bash
npm run lint
npm run build
```

Run both before deployment.

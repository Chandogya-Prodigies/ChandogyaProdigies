import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const rawPath = databaseUrl.startsWith("file:")
  ? databaseUrl.slice("file:".length)
  : "prisma/dev.db";
const dbPath = resolve(root, rawPath);

const db = new Database(dbPath);

function addColumnIfMissing(table, column, definition) {
  const columns = db.pragma(`table_info("${table}")`);
  const exists = columns.some((item) => item.name === column);

  if (!exists) {
    db.exec(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${definition}`);
  }
}

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL UNIQUE,
    "username" TEXT UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'student',
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL UNIQUE,
    "expiresAt" DATETIME NOT NULL,
    "usedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS "PasswordResetToken_email_idx"
    ON "PasswordResetToken" ("email");

  CREATE TABLE IF NOT EXISTS "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'paid',
    "category" TEXT NOT NULL DEFAULT 'General',
    "ageGroup" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'Beginner',
    "level" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "mentor" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "priceAmountPaise" INTEGER NOT NULL DEFAULT 0,
    "discountLabel" TEXT,
    "image" TEXT NOT NULL,
    "previewVideoUrl" TEXT,
    "description" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "CourseLesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "videoUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CourseLesson_courseId_fkey"
      FOREIGN KEY ("courseId") REFERENCES "Course" ("id")
      ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE INDEX IF NOT EXISTS "CourseLesson_courseId_idx" ON "CourseLesson" ("courseId");

  CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "reason" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "Enrollment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "Enrollment_userEmail_courseSlug_key"
    ON "Enrollment" ("userEmail", "courseSlug");

  CREATE TABLE IF NOT EXISTS "PaymentOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "provider" TEXT NOT NULL DEFAULT 'razorpay',
    "providerOrderId" TEXT,
    "providerPaymentId" TEXT,
    "providerSignature" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorEmail" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "details" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS "AuditLog_actorEmail_idx" ON "AuditLog" ("actorEmail");
  CREATE INDEX IF NOT EXISTS "AuditLog_entity_idx" ON "AuditLog" ("entity");
`);

addColumnIfMissing("User", "status", "TEXT NOT NULL DEFAULT 'active'");
addColumnIfMissing("Course", "category", "TEXT NOT NULL DEFAULT 'General'");
addColumnIfMissing("Course", "ageGroup", "TEXT");
addColumnIfMissing("Course", "difficulty", "TEXT NOT NULL DEFAULT 'Beginner'");
addColumnIfMissing("Course", "priceAmountPaise", "INTEGER NOT NULL DEFAULT 0");
addColumnIfMissing("Course", "discountLabel", "TEXT");
addColumnIfMissing("Course", "previewVideoUrl", "TEXT");
addColumnIfMissing("Course", "featured", "BOOLEAN NOT NULL DEFAULT false");
addColumnIfMissing("PaymentOrder", "providerPaymentId", "TEXT");
addColumnIfMissing("PaymentOrder", "providerSignature", "TEXT");

db.close();

console.log(`Database ready at ${dbPath}`);

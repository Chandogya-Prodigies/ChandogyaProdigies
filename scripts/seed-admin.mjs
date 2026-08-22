import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const scryptAsync = promisify(scrypt);
const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adminEmail = process.env.ADMIN_EMAIL ?? "admin@chandogyaprodigies.com";
const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@12345";

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);

  return `${salt}:${derivedKey.toString("hex")}`;
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

try {
  const passwordHash = await hashPassword(adminPassword);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: "admin",
      status: "active",
    },
    create: {
      email: adminEmail,
      username: "admin",
      name: "Chandogya Admin",
      passwordHash,
      role: "admin",
      status: "active",
    },
  });

  console.log(`Admin ready: ${adminEmail}`);
} finally {
  await prisma.$disconnect();
}

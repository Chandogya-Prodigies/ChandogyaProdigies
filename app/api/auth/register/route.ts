import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(180),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(40)
    .regex(/^[a-z0-9._-]+$/i, "Use letters, numbers, dot, dash or underscore")
    .optional()
    .or(z.literal("")),
  password: z.string().min(8, "Password must be at least 8 characters").max(120),
});

export async function POST(request: Request) {
  const payload = registerSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: "Please check the signup form.", issues: payload.error.flatten() },
      { status: 400 },
    );
  }

  const email = payload.data.email.toLowerCase();
  const username = payload.data.username
    ? payload.data.username.toLowerCase()
    : null;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, ...(username ? [{ username }] : [])],
    },
    select: { email: true, username: true },
  });

  if (existingUser) {
    const field =
      existingUser.email === email ? "email address" : "username";

    return NextResponse.json(
      { error: `This ${field} is already registered.` },
      { status: 409 },
    );
  }

  const user = await prisma.user.create({
    data: {
      name: payload.data.name,
      email,
      username,
      passwordHash: await hashPassword(payload.data.password),
      role: "student",
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return NextResponse.json({
    ok: true,
    user,
    message: "Account created. You can log in now.",
  });
}

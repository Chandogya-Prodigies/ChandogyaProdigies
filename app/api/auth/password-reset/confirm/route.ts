import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

const confirmSchema = z.object({
  email: z.string().trim().email("Valid email is required").max(180),
  token: z.string().trim().min(32, "Reset token is missing"),
  password: z.string().min(8, "Password must be at least 8 characters").max(120),
});

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: Request) {
  const payload = confirmSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: "Please check the reset form.", issues: payload.error.flatten() },
      { status: 400 },
    );
  }

  const email = payload.data.email.toLowerCase();
  const token = await prisma.passwordResetToken.findFirst({
    where: {
      email,
      tokenHash: hashToken(payload.data.token),
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
  });

  if (!token) {
    return NextResponse.json(
      { error: "This reset link is invalid or expired." },
      { status: 400 },
    );
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { email },
      data: { passwordHash: await hashPassword(payload.data.password) },
    }),
    prisma.passwordResetToken.update({
      where: { id: token.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    message: "Password updated. You can log in now.",
  });
}

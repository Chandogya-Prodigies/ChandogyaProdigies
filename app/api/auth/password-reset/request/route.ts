import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const requestSchema = z.object({
  email: z.string().trim().email("Valid email is required").max(180),
});

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: Request) {
  const payload = requestSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const email = payload.data.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true },
  });

  if (!user) {
    return NextResponse.json({
      ok: true,
      message: "If that email exists, a reset link will be available.",
    });
  }

  await prisma.passwordResetToken.updateMany({
    where: { email, usedAt: null },
    data: { usedAt: new Date() },
  });

  const token = randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: {
      email,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    },
  });

  return NextResponse.json({
    ok: true,
    resetPath: `/reset-password?email=${encodeURIComponent(email)}&token=${token}`,
    message: "Reset link created. Email delivery can be connected next.",
  });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const newsletterSchema = z.object({
  email: z.string().trim().email("Valid email is required").max(180),
  source: z.string().trim().max(80).optional(),
});

export async function POST(request: Request) {
  const payload = newsletterSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const subscriber = await prisma.newsletterSubscriber.upsert({
    where: { email: payload.data.email },
    update: {
      source: payload.data.source,
    },
    create: payload.data,
  });

  return NextResponse.json({
    ok: true,
    id: subscriber.id,
    message: "You are subscribed.",
  });
}

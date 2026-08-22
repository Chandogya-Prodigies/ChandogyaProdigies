import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().max(80).optional(),
  email: z.string().trim().email("Valid email is required").max(180),
  phone: z.string().trim().max(40).optional(),
  reason: z.string().trim().min(1).max(120),
  message: z.string().trim().min(8, "Message is too short").max(2000),
});

export async function POST(request: Request) {
  const payload = contactSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: "Please check the form fields.", issues: payload.error.flatten() },
      { status: 400 },
    );
  }

  const message = await prisma.contactMessage.create({
    data: payload.data,
  });

  return NextResponse.json({
    ok: true,
    id: message.id,
    message: "Thank you. Your enquiry has been saved.",
  });
}

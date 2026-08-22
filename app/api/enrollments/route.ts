import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getPublicCourseBySlug } from "@/lib/course-service";
import { prisma } from "@/lib/prisma";

const enrollmentSchema = z.object({
  courseSlug: z.string().trim().min(1),
  amountPaise: z.coerce.number().int().min(100).optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Login required." }, { status: 401 });
  }

  const payload = enrollmentSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid enrollment request." }, { status: 400 });
  }

  const course = await getPublicCourseBySlug(payload.data.courseSlug);

  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  if (course.type === "free") {
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userEmail_courseSlug: {
          userEmail: email,
          courseSlug: course.slug,
        },
      },
      update: { status: "active" },
      create: {
        userEmail: email,
        courseSlug: course.slug,
        courseTitle: course.title,
        status: "active",
      },
    });

    return NextResponse.json({ ok: true, enrollment });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payment keys are not configured yet." },
      { status: 503 },
    );
  }

  const amountPaise = payload.data.amountPaise ?? course.priceAmountPaise ?? 99900;
  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
  const providerOrder = await razorpay.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: `${course.slug}-${Date.now()}`.slice(0, 40),
    notes: {
      courseSlug: course.slug,
      userEmail: email,
    },
  });

  const order = await prisma.paymentOrder.create({
    data: {
      userEmail: email,
      courseSlug: course.slug,
      courseTitle: course.title,
      amountPaise,
      currency: "INR",
      providerOrderId: providerOrder.id,
      status: "created",
    },
  });

  return NextResponse.json({
    ok: true,
    order,
    providerOrder,
    razorpayKeyId: keyId,
  });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const verificationSchema = z.object({
  paymentOrderId: z.string().trim().min(1),
  razorpay_order_id: z.string().trim().min(1),
  razorpay_payment_id: z.string().trim().min(1),
  razorpay_signature: z.string().trim().min(1),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Login required." }, { status: 401 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return NextResponse.json(
      { error: "Payment keys are not configured yet." },
      { status: 503 },
    );
  }

  const payload = verificationSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid payment payload." }, { status: 400 });
  }

  const order = await prisma.paymentOrder.findFirst({
    where: {
      id: payload.data.paymentOrderId,
      userEmail: email,
      providerOrderId: payload.data.razorpay_order_id,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Payment order not found." }, { status: 404 });
  }

  const valid = validatePaymentVerification(
    {
      order_id: payload.data.razorpay_order_id,
      payment_id: payload.data.razorpay_payment_id,
    },
    payload.data.razorpay_signature,
    keySecret,
  );

  if (!valid) {
    await prisma.paymentOrder.update({
      where: { id: order.id },
      data: { status: "failed" },
    });

    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  await prisma.paymentOrder.update({
    where: { id: order.id },
    data: {
      status: "paid",
      providerPaymentId: payload.data.razorpay_payment_id,
      providerSignature: payload.data.razorpay_signature,
    },
  });

  const enrollment = await prisma.enrollment.upsert({
    where: {
      userEmail_courseSlug: {
        userEmail: email,
        courseSlug: order.courseSlug,
      },
    },
    update: { status: "active" },
    create: {
      userEmail: email,
      courseSlug: order.courseSlug,
      courseTitle: order.courseTitle,
      status: "active",
    },
  });

  return NextResponse.json({ ok: true, enrollment });
}

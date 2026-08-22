"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    throw new Error("Admin access required.");
  }

  return session.user.email ?? "admin";
}

async function writeAudit(
  actorEmail: string,
  action: string,
  entity: string,
  entityId?: string,
  details?: string,
) {
  await prisma.auditLog.create({
    data: {
      actorEmail,
      action,
      entity,
      entityId,
      details,
    },
  });
}

export async function updateContactStatus(formData: FormData) {
  const actorEmail = await requireAdmin();

  const id = z.string().trim().min(1).parse(formData.get("id"));
  const status = z
    .enum(["new", "contacted", "closed"])
    .parse(formData.get("status"));

  await prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
  await writeAudit(actorEmail, "update_status", "contact_message", id, status);

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function deleteSubscriber(formData: FormData) {
  const actorEmail = await requireAdmin();

  const id = z.string().trim().min(1).parse(formData.get("id"));
  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: { id },
    select: { email: true },
  });

  await prisma.newsletterSubscriber.delete({
    where: { id },
  });
  await writeAudit(
    actorEmail,
    "delete",
    "newsletter_subscriber",
    id,
    subscriber?.email,
  );

  revalidatePath("/admin");
  revalidatePath("/admin/newsletter");
}

export async function deleteContactMessage(formData: FormData) {
  const actorEmail = await requireAdmin();
  const id = z.string().trim().min(1).parse(formData.get("id"));
  const message = await prisma.contactMessage.findUnique({
    where: { id },
    select: { email: true, reason: true },
  });

  await prisma.contactMessage.delete({ where: { id } });
  await writeAudit(
    actorEmail,
    "delete",
    "contact_message",
    id,
    message ? `${message.email} - ${message.reason}` : undefined,
  );

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function updateUserAccess(formData: FormData) {
  const actorEmail = await requireAdmin();
  const id = z.string().trim().min(1).parse(formData.get("id"));
  const role = z.enum(["student", "admin"]).parse(formData.get("role"));
  const status = z
    .enum(["active", "suspended"])
    .parse(formData.get("status"));
  const user = await prisma.user.findUnique({
    where: { id },
    select: { email: true },
  });

  if (user?.email === actorEmail && (role !== "admin" || status !== "active")) {
    throw new Error("You cannot remove your own active admin access.");
  }

  await prisma.user.update({
    where: { id },
    data: { role, status },
  });
  await writeAudit(
    actorEmail,
    "update_access",
    "user",
    id,
    `${user?.email ?? "user"} -> ${role}/${status}`,
  );

  revalidatePath("/admin");
  revalidatePath("/admin/users");
}

export async function updateEnrollmentStatus(formData: FormData) {
  const actorEmail = await requireAdmin();
  const id = z.string().trim().min(1).parse(formData.get("id"));
  const status = z
    .enum(["active", "paused", "completed", "cancelled"])
    .parse(formData.get("status"));

  await prisma.enrollment.update({
    where: { id },
    data: { status },
  });
  await writeAudit(actorEmail, "update_status", "enrollment", id, status);

  revalidatePath("/admin");
  revalidatePath("/admin/enrollments");
  revalidatePath("/dashboard");
}

export async function updatePaymentStatus(formData: FormData) {
  const actorEmail = await requireAdmin();
  const id = z.string().trim().min(1).parse(formData.get("id"));
  const status = z
    .enum(["created", "paid", "failed", "refunded", "cancelled"])
    .parse(formData.get("status"));

  await prisma.paymentOrder.update({
    where: { id },
    data: { status },
  });
  await writeAudit(actorEmail, "update_status", "payment_order", id, status);

  revalidatePath("/admin");
  revalidatePath("/admin/payments");
}

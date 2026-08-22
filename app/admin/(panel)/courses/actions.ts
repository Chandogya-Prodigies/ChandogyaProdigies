"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const courseSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a URL-safe slug."),
  type: z.enum(["paid", "free"]),
  category: z.string().trim().min(2).max(80).default("General"),
  ageGroup: z.string().trim().max(80).optional(),
  difficulty: z.string().trim().min(2).max(80).default("Beginner"),
  level: z.string().trim().min(2).max(80),
  duration: z.string().trim().min(2).max(80),
  hours: z.string().trim().min(2).max(80),
  mentor: z.string().trim().min(2).max(120),
  price: z.string().trim().min(2).max(80),
  priceAmountPaise: z.coerce.number().int().min(0).max(10_000_000).default(0),
  discountLabel: z.string().trim().max(80).optional(),
  image: z.string().trim().min(2).max(260),
  previewVideoUrl: z.string().trim().max(500).optional(),
  description: z.string().trim().min(20).max(1400),
  published: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
});

const lessonSchema = z.object({
  courseId: z.string().trim().min(1),
  title: z.string().trim().min(3).max(160),
  duration: z.string().trim().min(1).max(40),
  summary: z.string().trim().min(8).max(700),
  videoUrl: z.string().trim().max(500).optional(),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

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

export async function createCourse(formData: FormData) {
  const actorEmail = await requireAdmin();

  const payload = courseSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    type: formData.get("type"),
    category: formData.get("category"),
    ageGroup: formData.get("ageGroup"),
    difficulty: formData.get("difficulty"),
    level: formData.get("level"),
    duration: formData.get("duration"),
    hours: formData.get("hours"),
    mentor: formData.get("mentor"),
    price: formData.get("price"),
    priceAmountPaise: formData.get("priceAmountPaise"),
    discountLabel: formData.get("discountLabel"),
    image: formData.get("image"),
    previewVideoUrl: formData.get("previewVideoUrl"),
    description: formData.get("description"),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  });

  const course = await prisma.course.create({
    data: {
      ...payload,
      ageGroup: payload.ageGroup || null,
      discountLabel: payload.discountLabel || null,
      previewVideoUrl: payload.previewVideoUrl || null,
    },
  });
  await writeAudit(actorEmail, "create", "course", course.id, course.title);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function updateCourse(formData: FormData) {
  const actorEmail = await requireAdmin();

  const id = z.string().trim().min(1).parse(formData.get("id"));
  const payload = courseSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    type: formData.get("type"),
    category: formData.get("category"),
    ageGroup: formData.get("ageGroup"),
    difficulty: formData.get("difficulty"),
    level: formData.get("level"),
    duration: formData.get("duration"),
    hours: formData.get("hours"),
    mentor: formData.get("mentor"),
    price: formData.get("price"),
    priceAmountPaise: formData.get("priceAmountPaise"),
    discountLabel: formData.get("discountLabel"),
    image: formData.get("image"),
    previewVideoUrl: formData.get("previewVideoUrl"),
    description: formData.get("description"),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  });

  await prisma.course.update({
    where: { id },
    data: {
      ...payload,
      ageGroup: payload.ageGroup || null,
      discountLabel: payload.discountLabel || null,
      previewVideoUrl: payload.previewVideoUrl || null,
    },
  });
  await writeAudit(actorEmail, "update", "course", id, payload.title);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function deleteCourse(formData: FormData) {
  const actorEmail = await requireAdmin();

  const id = z.string().trim().min(1).parse(formData.get("id"));
  const course = await prisma.course.findUnique({
    where: { id },
    select: { title: true },
  });

  await prisma.course.delete({
    where: { id },
  });
  await writeAudit(actorEmail, "delete", "course", id, course?.title);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function createLesson(formData: FormData) {
  const actorEmail = await requireAdmin();

  const payload = lessonSchema.parse({
    courseId: formData.get("courseId"),
    title: formData.get("title"),
    duration: formData.get("duration"),
    summary: formData.get("summary"),
    videoUrl: formData.get("videoUrl"),
    sortOrder: formData.get("sortOrder"),
  });

  const lesson = await prisma.courseLesson.create({
    data: {
      ...payload,
      videoUrl: payload.videoUrl || null,
    },
  });
  await writeAudit(actorEmail, "create", "lesson", lesson.id, lesson.title);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function updateLesson(formData: FormData) {
  const actorEmail = await requireAdmin();

  const id = z.string().trim().min(1).parse(formData.get("id"));
  const payload = lessonSchema.parse({
    courseId: formData.get("courseId"),
    title: formData.get("title"),
    duration: formData.get("duration"),
    summary: formData.get("summary"),
    videoUrl: formData.get("videoUrl"),
    sortOrder: formData.get("sortOrder"),
  });

  await prisma.courseLesson.update({
    where: { id },
    data: {
      ...payload,
      videoUrl: payload.videoUrl || null,
    },
  });
  await writeAudit(actorEmail, "update", "lesson", id, payload.title);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function deleteLesson(formData: FormData) {
  const actorEmail = await requireAdmin();

  const id = z.string().trim().min(1).parse(formData.get("id"));
  const lesson = await prisma.courseLesson.findUnique({
    where: { id },
    select: { title: true },
  });

  await prisma.courseLesson.delete({
    where: { id },
  });
  await writeAudit(actorEmail, "delete", "lesson", id, lesson?.title);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

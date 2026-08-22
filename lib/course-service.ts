import type { Course, CourseType } from "@/lib/courses";
import { prisma } from "@/lib/prisma";

type DbCourse = Awaited<ReturnType<typeof getDatabaseCourses>>[number];

function mapDatabaseCourse(course: DbCourse): Course {
  const lessons =
    course.lessons.length > 0
      ? course.lessons.map((lesson) => ({
          title: lesson.title,
          duration: lesson.duration,
          summary: lesson.summary,
        }))
      : [
          {
            title: "Course Introduction",
            duration: course.duration,
            summary: course.description,
          },
        ];

  return {
    slug: course.slug,
    title: course.title,
    type: course.type === "free" ? "free" : "paid",
    level: course.level,
    duration: course.duration,
    hours: course.hours,
    likes: "New",
    enrolled: "Open",
    mentor: course.mentor,
    rating: "New",
    reviews: "No Reviews",
    price: course.price,
    priceAmountPaise: course.priceAmountPaise,
    category: course.category,
    ageGroup: course.ageGroup ?? undefined,
    difficulty: course.difficulty,
    discountLabel: course.discountLabel ?? undefined,
    previewVideoUrl: course.previewVideoUrl ?? undefined,
    featured: course.featured,
    image: course.image,
    description: course.description,
    lessons,
    notes: [
      "This course is managed from the admin dashboard.",
      "Lesson content can be expanded with notes and video modules.",
      "Enrollment details will connect after the payment flow is added.",
    ],
  };
}

async function getDatabaseCourses() {
  return prisma.course.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      lessons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getPublicCourses(type: CourseType | "all" = "all") {
  const databaseCourses = (await getDatabaseCourses()).map(mapDatabaseCourse);

  return type === "all"
    ? databaseCourses
    : databaseCourses.filter((course) => course.type === type);
}

export async function getPublicCourseBySlug(slug: string) {
  const databaseCourse = await prisma.course.findFirst({
    where: { slug, published: true },
    include: {
      lessons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return databaseCourse ? mapDatabaseCourse(databaseCourse) : undefined;
}

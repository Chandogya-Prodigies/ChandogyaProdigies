import { notFound } from "next/navigation";
import CourseDetailClient from "@/component/course-detail-client";
import { getPublicCourseBySlug } from "@/lib/course-service";

type CourseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getPublicCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}

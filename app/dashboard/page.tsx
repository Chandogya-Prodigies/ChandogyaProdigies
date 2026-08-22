import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { userEmail: email },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-[#F7F1EA] px-5 py-12 text-[#2A211B] dark:bg-[#160C07] dark:text-[#F8EBCF] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[28px] border border-[#E1D4C8] bg-white p-7 shadow-[0_24px_80px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-10">
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
            Student Dashboard
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-tight">
            Welcome back, {session.user?.name ?? "learner"}.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#75695F] dark:text-[#CDBB9E]">
            Continue your enrolled courses, revisit lessons and keep your
            learning rhythm steady.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C]">
            <GraduationCap className="h-8 w-8 text-[#C18A4A] dark:text-[#D4A72C]" />
            <p className="mt-5 text-5xl font-bold">{enrollments.length}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#8B7C70] dark:text-[#BBA98D]">
              Active Courses
            </p>
            <Link
              href="/courses"
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#315C45] px-6 text-sm font-semibold uppercase tracking-[0.12em] text-white"
            >
              Explore More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>

          <section className="rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-[#C18A4A] dark:text-[#D4A72C]" />
              <h2 className="font-serif text-3xl font-semibold">
                My Courses
              </h2>
            </div>

            <div className="mt-6 grid gap-4">
              {enrollments.length === 0 ? (
                <div className="rounded-2xl bg-[#FFF8E6] p-6 text-[#75695F] dark:bg-[#160C07] dark:text-[#CDBB9E]">
                  <p className="text-base leading-7">
                    You have not enrolled in a course yet. Explore the course
                    page and start with a free or premium programme.
                  </p>
                </div>
              ) : (
                enrollments.map((enrollment) => (
                  <Link
                    key={enrollment.id}
                    href={`/courses/${enrollment.courseSlug}`}
                    className="group rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold">
                          {enrollment.courseTitle}
                        </h3>
                        <p className="mt-1 text-sm text-[#8B7C70] dark:text-[#BBA98D]">
                          /courses/{enrollment.courseSlug}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#D4A72C]/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A3E20] dark:text-[#D4A72C]">
                        {enrollment.status}
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#315C45] dark:text-[#D4A72C]">
                      Continue learning
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

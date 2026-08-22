import { BookOpenCheck, GraduationCap, PauseCircle, Trophy } from "lucide-react";
import {
  AdminPageHeader,
  AdminStatCard,
  EmptyAdminState,
} from "@/component/admin/admin-primitives";
import { prisma } from "@/lib/prisma";
import { updateEnrollmentStatus } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminEnrollmentsPage() {
  const enrollments = await prisma.enrollment.findMany({
    orderBy: { createdAt: "desc" },
  });
  const activeCount = enrollments.filter((item) => item.status === "active").length;
  const pausedCount = enrollments.filter((item) => item.status === "paused").length;
  const completedCount = enrollments.filter((item) => item.status === "completed").length;

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Learning Records"
        title="Enrollments"
        description="Track which students are enrolled in which courses and adjust learning status when needed."
      />

      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        <AdminStatCard icon={BookOpenCheck} label="Active" value={activeCount} detail="Currently learning" />
        <AdminStatCard icon={PauseCircle} label="Paused" value={pausedCount} detail="Temporarily stopped" />
        <AdminStatCard icon={Trophy} label="Completed" value={completedCount} detail="Finished courses" />
      </section>

      <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
        <div className="grid gap-4">
          {enrollments.length === 0 ? (
            <EmptyAdminState label="No enrollments yet." />
          ) : (
            enrollments.map((enrollment) => (
              <article
                key={enrollment.id}
                className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">
                      {enrollment.courseTitle}
                    </h2>
                    <p className="mt-1 text-sm text-[#75695F] dark:text-[#CDBB9E]">
                      {enrollment.userEmail} - /courses/{enrollment.courseSlug}
                    </p>
                  </div>
                  <form action={updateEnrollmentStatus} className="flex flex-col gap-3 sm:flex-row">
                    <input type="hidden" name="id" value={enrollment.id} />
                    <select
                      name="status"
                      defaultValue={enrollment.status}
                      className="h-11 rounded-full border border-[#E1D4C8] bg-white px-4 text-sm outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
                    >
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#315C45] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      <GraduationCap className="h-4 w-4" />
                      Update
                    </button>
                  </form>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

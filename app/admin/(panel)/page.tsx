import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Inbox,
  Newspaper,
  ReceiptText,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    courseCount,
    publishedCourseCount,
    messageCount,
    newMessageCount,
    subscriberCount,
    userCount,
    enrollmentCount,
    paymentOrders,
  ] = await Promise.all([
    prisma.course.count(),
    prisma.course.count({ where: { published: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.newsletterSubscriber.count(),
    prisma.user.count(),
    prisma.enrollment.count(),
    prisma.paymentOrder.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const paidTotal = paymentOrders
    .filter((order) => order.status === "paid")
    .reduce((total, order) => total + order.amountPaise, 0);

  const stats = [
    {
      label: "Courses",
      value: courseCount,
      detail: `${publishedCourseCount} published`,
      href: "/admin/courses",
      icon: BookOpen,
    },
    {
      label: "Messages",
      value: messageCount,
      detail: `${newMessageCount} new`,
      href: "/admin/messages",
      icon: Inbox,
    },
    {
      label: "Users",
      value: userCount,
      detail: "Students and admins",
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "Enrollments",
      value: enrollmentCount,
      detail: "Active learning records",
      href: "/admin/enrollments",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
            Admin Dashboard
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight">
            Operations Overview
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#75695F] dark:text-[#CDBB9E]">
            A calm command center for courses, users, leads, enrollments and
            payment activity.
          </p>
        </div>

        <Link
          href="/admin/courses"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#315C45] px-6 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_32px_rgba(49,92,69,0.18)]"
        >
          Create Course
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(64,45,30,0.12)] dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
            >
              <div className="flex items-center justify-between gap-4">
                <Icon className="h-6 w-6 text-[#C18A4A] dark:text-[#D4A72C]" />
                <ArrowRight className="h-4 w-4 text-[#315C45] opacity-0 transition group-hover:opacity-100 dark:text-[#D4A72C]" />
              </div>
              <p className="mt-5 text-4xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#8B7C70] dark:text-[#BBA98D]">
                {stat.label}
              </p>
              <p className="mt-3 text-sm text-[#75695F] dark:text-[#CDBB9E]">
                {stat.detail}
              </p>
            </Link>
          );
        })}
      </section>

      <section className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
          <div className="flex items-center gap-3">
            <ReceiptText className="h-6 w-6 text-[#C18A4A] dark:text-[#D4A72C]" />
            <h2 className="font-serif text-3xl font-semibold">
              Payment Snapshot
            </h2>
          </div>
          <p className="mt-6 text-5xl font-bold">
            INR {(paidTotal / 100).toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
            Revenue from the latest paid orders shown in the dashboard.
          </p>
          <Link
            href="/admin/payments"
            className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#315C45]/18 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#315C45] dark:border-[#D4A72C]/18 dark:text-[#D4A72C]"
          >
            View payments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        <article className="rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
          <div className="flex items-center gap-3">
            <Newspaper className="h-6 w-6 text-[#C18A4A] dark:text-[#D4A72C]" />
            <h2 className="font-serif text-3xl font-semibold">
              Growth Signals
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <SignalCard label="Newsletter Subscribers" value={subscriberCount} />
            <SignalCard label="Recent Payment Orders" value={paymentOrders.length} />
          </div>
        </article>
      </section>
    </div>
  );
}

function SignalCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 dark:border-[#D4A72C]/16 dark:bg-[#160C07]">
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#8B7C70] dark:text-[#BBA98D]">
        {label}
      </p>
    </div>
  );
}

import { Activity, Database, KeyRound, Mail, Settings } from "lucide-react";
import {
  AdminPageHeader,
  AdminStatCard,
  EmptyAdminState,
} from "@/component/admin/admin-primitives";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 40,
  });
  const checks = [
    {
      label: "Database",
      value: process.env.DATABASE_URL ? "Configured" : "Missing",
      icon: Database,
    },
    {
      label: "Auth Secret",
      value: process.env.NEXTAUTH_SECRET ? "Configured" : "Missing",
      icon: KeyRound,
    },
    {
      label: "Email SMTP",
      value: process.env.SMTP_HOST ? "Configured" : "Pending",
      icon: Mail,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Production Controls"
        title="Settings"
        description="Review environment readiness and recent admin activity. Sensitive keys stay in environment variables, not in the browser."
      />

      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        {checks.map((check) => (
          <AdminStatCard
            key={check.label}
            icon={check.icon}
            label={check.label}
            value={check.value}
            detail="Environment status"
          />
        ))}
      </section>

      <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-[#C18A4A] dark:text-[#D4A72C]" />
          <h2 className="font-serif text-3xl font-semibold">Audit Log</h2>
        </div>
        <div className="mt-6 grid gap-3">
          {auditLogs.length === 0 ? (
            <EmptyAdminState label="No admin activity has been recorded yet." />
          ) : (
            auditLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {log.action} {log.entity}
                    </p>
                    <p className="mt-1 text-sm text-[#75695F] dark:text-[#CDBB9E]">
                      {log.actorEmail}
                      {log.details ? ` - ${log.details}` : ""}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#D4A72C]/18 px-3 py-1 text-xs font-semibold text-[#7A3E20] dark:text-[#D4A72C]">
                    {log.createdAt.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-[#C18A4A] dark:text-[#D4A72C]" />
          <h2 className="font-serif text-3xl font-semibold">
            Production Notes
          </h2>
        </div>
        <div className="mt-5 grid gap-3 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
          <p>Connect SMTP before launch so password reset links are emailed.</p>
          <p>Use live Razorpay keys only after payment testing is complete.</p>
          <p>Move SQLite to a hosted production database before real traffic.</p>
        </div>
      </section>
    </div>
  );
}

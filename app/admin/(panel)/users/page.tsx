import { ShieldCheck, UserCheck, UserX, Users } from "lucide-react";
import {
  AdminPageHeader,
  AdminStatCard,
  EmptyAdminState,
} from "@/component/admin/admin-primitives";
import { prisma } from "@/lib/prisma";
import { updateUserAccess } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  const adminCount = users.filter((user) => user.role === "admin").length;
  const activeCount = users.filter((user) => user.status === "active").length;
  const suspendedCount = users.filter((user) => user.status === "suspended").length;

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Access Control"
        title="Users"
        description="Manage student and admin access. Suspended users cannot log in until reactivated."
      />

      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        <AdminStatCard icon={Users} label="Users" value={users.length} detail="All accounts" />
        <AdminStatCard icon={UserCheck} label="Active" value={activeCount} detail="Can sign in" />
        <AdminStatCard icon={UserX} label="Suspended" value={suspendedCount} detail={`${adminCount} admin accounts`} />
      </section>

      <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
        <div className="grid gap-4">
          {users.length === 0 ? (
            <EmptyAdminState label="No users yet." />
          ) : (
            users.map((user) => (
              <article
                key={user.id}
                className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">
                      {user.name ?? user.username ?? user.email}
                    </h2>
                    <p className="mt-1 text-sm text-[#75695F] dark:text-[#CDBB9E]">
                      {user.email}
                      {user.username ? ` - ${user.username}` : ""}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#315C45]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#315C45] dark:bg-[#D4A72C]/12 dark:text-[#D4A72C]">
                        {user.role}
                      </span>
                      <span className="rounded-full bg-[#D4A72C]/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A3E20] dark:text-[#D4A72C]">
                        {user.status}
                      </span>
                    </div>
                  </div>
                  <form action={updateUserAccess} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                    <input type="hidden" name="id" value={user.id} />
                    <select
                      name="role"
                      defaultValue={user.role}
                      className="h-11 rounded-full border border-[#E1D4C8] bg-white px-4 text-sm outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                    <select
                      name="status"
                      defaultValue={user.status}
                      className="h-11 rounded-full border border-[#E1D4C8] bg-white px-4 text-sm outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#315C45] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      <ShieldCheck className="h-4 w-4" />
                      Save
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

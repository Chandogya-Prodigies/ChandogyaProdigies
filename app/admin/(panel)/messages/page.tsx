import { Inbox, Mail, MessageSquareText } from "lucide-react";
import {
  AdminPageHeader,
  AdminStatCard,
  EmptyAdminState,
} from "@/component/admin/admin-primitives";
import { prisma } from "@/lib/prisma";
import { deleteContactMessage, updateContactStatus } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const [messages, newCount, contactedCount, closedCount] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.contactMessage.count({ where: { status: "contacted" } }),
    prisma.contactMessage.count({ where: { status: "closed" } }),
  ]);

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Lead Inbox"
        title="Contact Messages"
        description="Review parent, student and school enquiries, update their status, and keep follow-up work clean."
      />

      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        <AdminStatCard icon={Inbox} label="New" value={newCount} detail="Needs response" />
        <AdminStatCard icon={Mail} label="Contacted" value={contactedCount} detail="Follow-up started" />
        <AdminStatCard icon={MessageSquareText} label="Closed" value={closedCount} detail="Resolved conversations" />
      </section>

      <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
        <div className="grid gap-4">
          {messages.length === 0 ? (
            <EmptyAdminState label="No contact messages yet." />
          ) : (
            messages.map((message) => (
              <article
                key={message.id}
                className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">
                      {message.firstName} {message.lastName}
                    </h2>
                    <a
                      href={`mailto:${message.email}`}
                      className="mt-1 block text-sm font-semibold text-[#315C45] dark:text-[#D4A72C]"
                    >
                      {message.email}
                    </a>
                  </div>
                  <span className="rounded-full bg-[#D4A72C]/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A3E20] dark:text-[#D4A72C]">
                    {message.status}
                  </span>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7C70] dark:text-[#BBA98D]">
                  {message.reason}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
                  {message.message}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <form action={updateContactStatus} className="flex flex-col gap-3 sm:flex-row">
                    <input type="hidden" name="id" value={message.id} />
                    <select
                      name="status"
                      defaultValue={message.status}
                      className="h-11 rounded-full border border-[#E1D4C8] bg-white px-4 text-sm outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button className="h-11 rounded-full bg-[#315C45] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      Update
                    </button>
                  </form>
                  <form action={deleteContactMessage}>
                    <input type="hidden" name="id" value={message.id} />
                    <button className="h-11 rounded-full border border-red-500/20 bg-red-50 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 dark:border-red-400/20 dark:bg-red-950/20 dark:text-red-200">
                      Delete
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

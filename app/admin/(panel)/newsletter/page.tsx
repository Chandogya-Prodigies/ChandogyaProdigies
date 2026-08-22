import { MailPlus, Newspaper, Users } from "lucide-react";
import {
  AdminPageHeader,
  AdminStatCard,
  EmptyAdminState,
} from "@/component/admin/admin-primitives";
import { prisma } from "@/lib/prisma";
import { deleteSubscriber } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
  const sources = new Set(subscribers.map((item) => item.source ?? "unknown"));

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Audience"
        title="Newsletter"
        description="Manage subscribers collected from footer and campaign forms. Email broadcast tooling can connect here next."
      />

      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        <AdminStatCard icon={Users} label="Subscribers" value={subscribers.length} detail="Total saved emails" />
        <AdminStatCard icon={MailPlus} label="Sources" value={sources.size} detail="Known signup locations" />
      </section>

      <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
        <div className="flex items-center gap-3">
          <Newspaper className="h-6 w-6 text-[#C18A4A] dark:text-[#D4A72C]" />
          <h2 className="font-serif text-3xl font-semibold">Subscriber List</h2>
        </div>
        <div className="mt-6 grid gap-4">
          {subscribers.length === 0 ? (
            <EmptyAdminState label="No newsletter subscribers yet." />
          ) : (
            subscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="flex flex-col gap-3 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 dark:border-[#D4A72C]/16 dark:bg-[#160C07] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <a
                    href={`mailto:${subscriber.email}`}
                    className="font-semibold text-[#315C45] dark:text-[#D4A72C]"
                  >
                    {subscriber.email}
                  </a>
                  <p className="mt-1 text-sm text-[#8B7C70] dark:text-[#BBA98D]">
                    Source: {subscriber.source ?? "unknown"}
                  </p>
                </div>
                <form action={deleteSubscriber}>
                  <input type="hidden" name="id" value={subscriber.id} />
                  <button className="h-10 rounded-full border border-red-500/20 bg-red-50 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 dark:border-red-400/20 dark:bg-red-950/20 dark:text-red-200">
                    Remove
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

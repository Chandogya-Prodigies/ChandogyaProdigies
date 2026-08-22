import { CircleDollarSign, ReceiptText, RotateCcw, WalletCards } from "lucide-react";
import {
  AdminPageHeader,
  AdminStatCard,
  EmptyAdminState,
} from "@/component/admin/admin-primitives";
import { prisma } from "@/lib/prisma";
import { updatePaymentStatus } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const orders = await prisma.paymentOrder.findMany({
    orderBy: { createdAt: "desc" },
  });
  const paidTotal = orders
    .filter((order) => order.status === "paid")
    .reduce((total, order) => total + order.amountPaise, 0);
  const createdCount = orders.filter((order) => order.status === "created").length;
  const refundedCount = orders.filter((order) => order.status === "refunded").length;

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="Finance"
        title="Payments"
        description="Review Razorpay orders, manual payment status, refunds and enrollment payment history."
      />

      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        <AdminStatCard icon={CircleDollarSign} label="Paid Total" value={`INR ${(paidTotal / 100).toLocaleString("en-IN")}`} detail="Confirmed revenue" />
        <AdminStatCard icon={WalletCards} label="Open Orders" value={createdCount} detail="Created but not paid" />
        <AdminStatCard icon={RotateCcw} label="Refunded" value={refundedCount} detail="Marked refunded" />
      </section>

      <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
        <div className="grid gap-4">
          {orders.length === 0 ? (
            <EmptyAdminState label="No payment orders yet." />
          ) : (
            orders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">
                      {order.courseTitle}
                    </h2>
                    <p className="mt-1 text-sm text-[#75695F] dark:text-[#CDBB9E]">
                      {order.userEmail} - {order.currency}{" "}
                      {(order.amountPaise / 100).toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-xs text-[#8B7C70] dark:text-[#BBA98D]">
                      Provider order: {order.providerOrderId ?? "not created"}
                    </p>
                  </div>
                  <form action={updatePaymentStatus} className="flex flex-col gap-3 sm:flex-row">
                    <input type="hidden" name="id" value={order.id} />
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="h-11 rounded-full border border-[#E1D4C8] bg-white px-4 text-sm outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
                    >
                      <option value="created">Created</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#315C45] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      <ReceiptText className="h-4 w-4" />
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

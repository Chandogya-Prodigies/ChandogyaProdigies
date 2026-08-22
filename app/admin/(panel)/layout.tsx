import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import AdminShell from "@/component/admin/admin-shell";
import { authOptions } from "@/lib/auth";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  if (session.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminShell
      adminName={session.user.name ?? "Admin"}
      adminEmail={session.user.email ?? "admin"}
    >
      {children}
    </AdminShell>
  );
}

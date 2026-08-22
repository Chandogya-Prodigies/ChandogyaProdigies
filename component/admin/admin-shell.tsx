"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LogOut,
  Newspaper,
  ReceiptText,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

type AdminShellProps = {
  children: React.ReactNode;
  adminName: string;
  adminEmail: string;
};

const navItems: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Messages", href: "/admin/messages", icon: Inbox },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
  { label: "Payments", href: "/admin/payments", icon: ReceiptText },
  { label: "Newsletter", href: "/admin/newsletter", icon: Newspaper },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminShell({
  children,
  adminName,
  adminEmail,
}: AdminShellProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <main className="min-h-[calc(100svh-5rem)] bg-[#F4EFE7] text-[#25170F] dark:bg-[#120A06] dark:text-[#F8EBCF]">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-20 z-30 hidden h-[calc(100svh-5rem)] border-r border-[#E1D4C8] bg-[#FFFDF7]/92 px-4 py-5 backdrop-blur-xl dark:border-[#D4A72C]/14 dark:bg-[#1A0F09]/94 lg:block">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-2xl bg-[#315C45] px-4 py-4 text-white shadow-[0_16px_36px_rgba(49,92,69,0.2)]"
          >
            <ShieldCheck className="h-6 w-6" />
            <span>
              <span className="block font-serif text-xl font-semibold">
                Admin Panel
              </span>
              <span className="text-xs text-white/72">
                Chandogya Operations
              </span>
            </span>
          </Link>

          <nav className="mt-6 grid gap-1" aria-label="Admin navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#F2E3C7] text-[#315C45] dark:bg-[#D4A72C]/14 dark:text-[#D4A72C]"
                      : "text-[#6F5B4B] hover:bg-[#F8E7CF] hover:text-[#2E2118] dark:text-[#CDBB9E] dark:hover:bg-white/6 dark:hover:text-[#F8EBCF]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-[#E1D4C8] bg-white p-4 dark:border-[#D4A72C]/14 dark:bg-[#21130C]">
            <p className="text-sm font-semibold">{adminName}</p>
            <p className="mt-1 truncate text-xs text-[#75695F] dark:text-[#CDBB9E]">
              {adminEmail}
            </p>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[#315C45]/18 text-xs font-semibold uppercase tracking-[0.12em] text-[#315C45] transition hover:bg-[#315C45] hover:text-white dark:border-[#D4A72C]/18 dark:text-[#D4A72C] dark:hover:bg-[#D4A72C] dark:hover:text-[#160C07]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-20 z-20 border-b border-[#E1D4C8] bg-[#FFFDF7]/90 px-4 py-3 backdrop-blur-xl dark:border-[#D4A72C]/14 dark:bg-[#1A0F09]/92 lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/admin" className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#315C45] dark:text-[#D4A72C]" />
                <span className="font-serif text-lg font-semibold">
                  Admin
                </span>
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex h-10 items-center gap-2 rounded-full bg-[#315C45] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white"
              >
                <LogOut className="h-4 w-4" />
                Exit
              </button>
            </div>
            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-semibold ${
                      active
                        ? "bg-[#315C45] text-white"
                        : "bg-[#F8E7CF] text-[#6F5B4B] dark:bg-white/8 dark:text-[#CDBB9E]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </header>

          <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

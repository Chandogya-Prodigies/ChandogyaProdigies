import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Inbox,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { authOptions } from "@/lib/auth";
import AdminLoginForm from "@/component/admin/admin-login-form";

const adminFeatures = [
  {
    label: "Create courses",
    icon: BookOpen,
  },
  {
    label: "Add lessons and modules",
    icon: ClipboardList,
  },
  {
    label: "Upload thumbnails/media",
    icon: Upload,
  },
  {
    label: "Track enrollments",
    icon: GraduationCap,
  },
  {
    label: "Review enquiries",
    icon: Inbox,
  },
];

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  return (
    <main className="min-h-[calc(100svh-5rem)] bg-[#F7F1EA] px-4 py-12 text-[#25170F] dark:bg-[#160C07] dark:text-[#F8EBCF] sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100svh-11rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.92fr_0.88fr]">
        <div className="relative overflow-hidden rounded-[34px] border border-[#E0C7A8] bg-[#FFF9EE] p-7 shadow-[0_24px_70px_rgba(72,40,14,0.12)] dark:border-[#D4A72C]/18 dark:bg-[#21130C] sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F6BE45]/28 blur-2xl dark:bg-[#D4A72C]/12" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#315C45]/14 blur-2xl dark:bg-[#315C45]/18" />

          <div className="relative z-10">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#315C45] text-white shadow-[0_14px_30px_rgba(49,92,69,0.2)]">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <p className="mt-7 font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
              Admin Portal
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
              Manage the learning platform with clarity.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#715342] dark:text-[#CDBB9E]">
              Sign in as an admin to create courses, build lesson modules,
              publish content, upload course media and watch the operational
              flow from one calm dashboard.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {adminFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 rounded-2xl border border-[#E0C7A8] bg-white/70 px-4 py-3 text-sm font-semibold text-[#315C45] dark:border-[#D4A72C]/16 dark:bg-[#160C07]/70 dark:text-[#D4A72C]"
                  >
                    <Icon className="h-5 w-5" />
                    {feature.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-white/54 bg-[#F6F1EC]/94 p-6 shadow-[0_26px_80px_rgba(63,34,15,0.16)] backdrop-blur-xl dark:border-[#D4A72C]/16 dark:bg-[#21130C]/94 sm:p-8">
          <div>
            <p className="font-serif text-sm font-semibold uppercase tracking-[0.24em] text-[#C18A4A] dark:text-[#D4A72C]">
              Secure Login
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#25170F] dark:text-[#F8EBCF]">
              Admin login
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#715342] dark:text-[#CDBB9E]">
              Use the seeded admin account or any user account with admin role.
            </p>
          </div>

          <div className="mt-8">
            <AdminLoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}

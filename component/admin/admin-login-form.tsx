"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, getSession } from "next-auth/react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { FormEvent, useState } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get("identifier") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    if (!response?.ok) {
      setSubmitting(false);
      setMessage("Invalid admin email/username or password.");
      return;
    }

    const session = await getSession();

    if (session?.user?.role !== "admin") {
      await signOut({ redirect: false });
      setSubmitting(false);
      setMessage("This account does not have admin access.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <label className="grid gap-2 text-sm font-semibold text-[#4A3122] dark:text-[#F8EBCF]">
        Admin email or username
        <span className="flex h-13 items-center gap-3 rounded-2xl border border-[#E0D2C3] bg-white px-4 transition focus-within:border-[#F46A13] dark:border-[#D4A72C]/16 dark:bg-[#160C07]">
          <Mail className="h-5 w-5 text-[#C18A4A]" />
          <input
            name="identifier"
            type="text"
            required
            placeholder="admin@chandogyaprodigies.com"
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A39283] dark:placeholder:text-[#9B8A78]"
          />
        </span>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#4A3122] dark:text-[#F8EBCF]">
        Password
        <span className="flex h-13 items-center gap-3 rounded-2xl border border-[#E0D2C3] bg-white px-4 transition focus-within:border-[#F46A13] dark:border-[#D4A72C]/16 dark:bg-[#160C07]">
          <LockKeyhole className="h-5 w-5 text-[#C18A4A]" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="admin password"
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A39283] dark:placeholder:text-[#9B8A78]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-[#715342] transition hover:text-[#F46A13] dark:text-[#CDBB9E]"
          >
            <Eye className="h-5 w-5" />
          </button>
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 flex h-13 items-center justify-center gap-2 rounded-full bg-[#315C45] text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(49,92,69,0.24)] transition hover:bg-[#274B38] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Checking access..." : "Enter Admin Panel"}
        <ArrowRight className="h-4 w-4" />
      </button>

      {message ? (
        <p className="rounded-2xl bg-[#FFF4E2] px-4 py-3 text-sm leading-6 text-[#715342] dark:bg-[#160C07] dark:text-[#CDBB9E]">
          {message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-[#E0D2C3] pt-5 text-sm text-[#715342] dark:border-[#D4A72C]/16 dark:text-[#CDBB9E] sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold transition hover:text-[#F46A13]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </Link>
        <Link
          href="/forgot-password"
          className="font-semibold text-[#C18A4A] transition hover:text-[#F46A13] dark:text-[#D4A72C]"
        >
          Forgot password?
        </Link>
      </div>

      <p className="flex items-start gap-2 rounded-2xl border border-[#315C45]/14 bg-[#EEF5EE] px-4 py-3 text-xs leading-5 text-[#315C45] dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#D4A72C]">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
        Only users with the admin role can create courses, add modules, manage
        enquiries, and review enrollments.
      </p>
    </form>
  );
}

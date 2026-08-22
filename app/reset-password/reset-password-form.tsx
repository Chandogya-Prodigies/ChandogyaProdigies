"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/password-reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        token: formData.get("token"),
        password: formData.get("password"),
      }),
    });
    const result = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(result.error ?? "Could not reset this password.");
      return;
    }

    setMessage("Password updated. Taking you to login...");
    window.setTimeout(() => router.push("/login"), 900);
  };

  return (
    <section className="mx-auto max-w-xl rounded-[32px] border border-[#E0C7A8] bg-white/88 p-6 shadow-[0_24px_70px_rgba(72,40,14,0.14)] dark:border-[#D4A72C]/18 dark:bg-[#21130C] sm:p-8">
      <p className="font-serif text-sm font-semibold uppercase tracking-[0.24em] text-[#C18A4A] dark:text-[#D4A72C]">
        Password Reset
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold">
        Choose a new password
      </h1>
      <p className="mt-4 text-sm leading-6 text-[#715342] dark:text-[#CDBB9E]">
        Use the reset token from your link. Tokens expire after 30 minutes.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-[#4A3122] dark:text-[#F8EBCF]">
          Email address
          <span className="flex h-13 items-center gap-3 rounded-2xl border border-[#E0D2C3] bg-[#FFFDF8] px-4 transition focus-within:border-[#F46A13] dark:border-[#D4A72C]/16 dark:bg-[#160C07]">
            <Mail className="h-5 w-5 text-[#C18A4A]" />
            <input
              name="email"
              type="email"
              required
              defaultValue={email}
              placeholder="you@example.com"
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A39283] dark:placeholder:text-[#9B8A78]"
            />
          </span>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#4A3122] dark:text-[#F8EBCF]">
          Reset token
          <input
            name="token"
            type="text"
            required
            defaultValue={token}
            placeholder="reset token"
            className="h-13 rounded-2xl border border-[#E0D2C3] bg-[#FFFDF8] px-4 text-sm outline-none transition focus:border-[#F46A13] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#4A3122] dark:text-[#F8EBCF]">
          New password
          <span className="flex h-13 items-center gap-3 rounded-2xl border border-[#E0D2C3] bg-[#FFFDF8] px-4 transition focus-within:border-[#F46A13] dark:border-[#D4A72C]/16 dark:bg-[#160C07]">
            <LockKeyhole className="h-5 w-5 text-[#C18A4A]" />
            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="at least 8 characters"
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A39283] dark:placeholder:text-[#9B8A78]"
            />
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="flex h-13 items-center justify-center gap-2 rounded-full bg-[#F46A13] text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(244,106,19,0.28)] transition hover:bg-[#DB5D10] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Updating..." : "Update password"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {message || error ? (
        <p className="mt-6 rounded-2xl bg-[#FFF4E2] px-4 py-3 text-sm leading-6 text-[#715342] dark:bg-[#160C07] dark:text-[#CDBB9E]">
          {message || error}
        </p>
      ) : null}

      <p className="mt-6 text-center text-sm text-[#715342] dark:text-[#CDBB9E]">
        Remembered it?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#C18A4A] transition hover:text-[#F46A13] dark:text-[#D4A72C]"
        >
          Log in
        </Link>
      </p>
    </section>
  );
}

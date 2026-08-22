"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [resetPath, setResetPath] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setResetPath("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email") }),
    });
    const result = await response.json();
    setSubmitting(false);

    setMessage(result.message ?? "If that email exists, a reset link is ready.");
    setResetPath(result.resetPath ?? "");
  };

  return (
    <main className="min-h-[calc(100svh-5rem)] bg-[#FFF4E2] px-4 py-14 text-[#25170F] dark:bg-[#160C07] dark:text-[#F8EBCF] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-xl rounded-[32px] border border-[#E0C7A8] bg-white/88 p-6 shadow-[0_24px_70px_rgba(72,40,14,0.14)] dark:border-[#D4A72C]/18 dark:bg-[#21130C] sm:p-8">
        <p className="font-serif text-sm font-semibold uppercase tracking-[0.24em] text-[#C18A4A] dark:text-[#D4A72C]">
          Account Help
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold">
          Reset your password
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#715342] dark:text-[#CDBB9E]">
          Enter your registered email. For now, the app creates a local reset
          link here; email delivery can be connected in the production setup.
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
                placeholder="you@example.com"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A39283] dark:placeholder:text-[#9B8A78]"
              />
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="flex h-13 items-center justify-center gap-2 rounded-full bg-[#F46A13] text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(244,106,19,0.28)] transition hover:bg-[#DB5D10] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Creating link..." : "Create reset link"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {message ? (
          <div className="mt-6 rounded-2xl bg-[#FFF4E2] px-4 py-3 text-sm leading-6 text-[#715342] dark:bg-[#160C07] dark:text-[#CDBB9E]">
            <p>{message}</p>
            {resetPath ? (
              <Link
                href={resetPath}
                className="mt-2 inline-flex font-semibold text-[#C18A4A] transition hover:text-[#F46A13] dark:text-[#D4A72C]"
              >
                Open reset page
              </Link>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}

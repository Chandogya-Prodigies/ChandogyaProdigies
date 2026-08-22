"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail, User } from "lucide-react";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });
    const result = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(result.error ?? "Could not create your account.");
      return;
    }

    setMessage("Account created. Taking you to login...");
    window.setTimeout(() => router.push("/login"), 900);
  };

  return (
    <main className="min-h-[calc(100svh-5rem)] bg-[#FFF4E2] px-4 py-14 text-[#25170F] dark:bg-[#160C07] dark:text-[#F8EBCF] sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.24em] text-[#C18A4A] dark:text-[#D4A72C]">
            Student Signup
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl">
            Begin with a calm, guided account.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#715342] dark:text-[#CDBB9E]">
            Create your Chandogya profile to enroll in courses, return to your
            dashboard, and continue lessons at your own pace.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-[#E0C7A8] bg-white/88 p-6 shadow-[0_24px_70px_rgba(72,40,14,0.14)] dark:border-[#D4A72C]/18 dark:bg-[#21130C] sm:p-8"
        >
          <div className="grid gap-5">
            {[
              { name: "name", label: "Full name", icon: User, type: "text" },
              { name: "email", label: "Email", icon: Mail, type: "email" },
              { name: "username", label: "Username", icon: User, type: "text" },
              {
                name: "password",
                label: "Password",
                icon: LockKeyhole,
                type: "password",
              },
            ].map((field) => {
              const Icon = field.icon;

              return (
                <label
                  key={field.name}
                  className="grid gap-2 text-sm font-semibold text-[#4A3122] dark:text-[#F8EBCF]"
                >
                  {field.label}
                  <span className="flex h-13 items-center gap-3 rounded-2xl border border-[#E0D2C3] bg-[#FFFDF8] px-4 transition focus-within:border-[#F46A13] dark:border-[#D4A72C]/16 dark:bg-[#160C07]">
                    <Icon className="h-5 w-5 text-[#C18A4A]" />
                    <input
                      name={field.name}
                      type={field.type}
                      required={field.name !== "username"}
                      placeholder={field.label.toLowerCase()}
                      className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A39283] dark:placeholder:text-[#9B8A78]"
                    />
                  </span>
                </label>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#F46A13] text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(244,106,19,0.28)] transition hover:bg-[#DB5D10] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Creating..." : "Create account"}
            <ArrowRight className="h-4 w-4" />
          </button>

          {message || error ? (
            <p className="mt-5 rounded-2xl bg-[#FFF4E2] px-4 py-3 text-sm leading-6 text-[#715342] dark:bg-[#160C07] dark:text-[#CDBB9E]">
              {message || error}
            </p>
          ) : null}

          <p className="mt-6 text-center text-sm text-[#715342] dark:text-[#CDBB9E]">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#C18A4A] transition hover:text-[#F46A13] dark:text-[#D4A72C]"
            >
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

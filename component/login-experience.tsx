"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";

type LoginStage = "intro" | "welcome" | "form";

export default function LoginExperience() {
  const [stage, setStage] = useState<LoginStage>("intro");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setStage("welcome"), 1700);

    return () => window.clearTimeout(timer);
  }, []);

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
      callbackUrl: "/dashboard",
    });

    setSubmitting(false);

    if (response?.ok) {
      window.location.href = response.url ?? "/dashboard";
      return;
    }

    setMessage("Invalid email/username or password.");
  };

  const isFormStage = stage === "form";

  return (
    <main className="min-h-[calc(100svh-5rem)] bg-[#F7E1C5] text-[#25170F] dark:bg-[#160C07] dark:text-[#F8EBCF]">
      <section className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(255,255,255,0.32),transparent_24%),linear-gradient(135deg,#FF7A1A_0%,#F4A23A_46%,#F7E1C5_100%)] dark:bg-[radial-gradient(circle_at_20%_14%,rgba(212,167,44,0.18),transparent_24%),linear-gradient(135deg,#6F2D0E_0%,#9C4B15_48%,#160C07_100%)]" />
        <div className="absolute left-[8%] top-[12%] h-20 w-36 rounded-[50%] bg-white/34 blur-sm dark:bg-white/10" />
        <div className="absolute right-[12%] top-[18%] h-16 w-32 rounded-[50%] bg-white/28 blur-sm dark:bg-white/10" />
        <div className="absolute left-[18%] top-[28%] h-14 w-24 rounded-[50%] bg-white/24 blur-sm dark:bg-white/10" />
        <div className="absolute left-[14%] top-[20%] text-3xl text-white/80 dark:text-[#F8EBCF]/60">
          *
        </div>
        <div className="absolute right-[28%] top-[15%] text-4xl text-white/75 dark:text-[#F8EBCF]/60">
          *
        </div>
        <div className="absolute bottom-[16%] left-[8%] h-40 w-40 rounded-full bg-[#FFF0A8]/22 blur-3xl" />

        <div
          className={`relative z-10 grid w-full max-w-6xl items-center gap-6 transition-all duration-700 ${
            isFormStage
              ? "lg:grid-cols-[0.9fr_0.95fr]"
              : "place-items-center lg:grid-cols-1"
          }`}
        >
          <div
            className={`relative mx-auto flex min-h-[640px] w-full max-w-[390px] flex-col overflow-hidden rounded-[38px] border border-white/45 bg-[#FF7020] shadow-[0_26px_80px_rgba(87,36,8,0.24)] transition-all duration-700 dark:border-[#D4A72C]/18 dark:bg-[#8C3A12] ${
              isFormStage
                ? "lg:max-w-[480px] lg:-translate-x-4"
                : "lg:max-w-[430px]"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.34),transparent_26%),linear-gradient(180deg,rgba(255,143,46,0.98),rgba(255,96,18,0.96))] dark:bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.12),transparent_26%),linear-gradient(180deg,#9E4416,#6F2D0E)]" />
            <div className="absolute left-7 top-10 h-16 w-28 rounded-[50%] bg-[#FFD19B]/70" />
            <div className="absolute right-6 top-14 h-20 w-36 rounded-[50%] bg-[#FFD19B]/70" />
            <div className="absolute left-20 top-24 h-14 w-32 rounded-[50%] bg-[#FFD19B]/65" />
            <div className="absolute inset-x-8 top-[44%] h-px rotate-[-9deg] bg-white/26" />

            <div className="relative z-10 flex items-center justify-between px-7 pt-6 text-sm font-semibold text-white">
              <span>9:41</span>
              <span className="tracking-[0.18em]">•••</span>
            </div>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-7 pb-10">
              <div
                className={`relative flex h-[390px] w-full items-end justify-center transition-all duration-700 ${
                  stage === "intro" ? "translate-y-0" : "-translate-y-8"
                }`}
              >
                <div
                  className={`absolute bottom-0 left-1/2 w-[190px] -translate-x-1/2 transition-all duration-700 ${
                    stage === "intro"
                      ? "scale-110 opacity-100"
                      : "translate-x-[-58px] scale-95 opacity-100"
                  }`}
                >
                  <Image
                    src="/images/botboy.png"
                    alt="Young learner greeting with folded hands"
                    width={260}
                    height={360}
                    className="h-auto w-full object-contain drop-shadow-[0_20px_20px_rgba(90,30,0,0.22)]"
                    preload
                  />
                </div>

                <div
                  className={`absolute bottom-0 right-3 w-[185px] transition-all duration-700 ${
                    stage === "intro"
                      ? "translate-x-12 opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  <Image
                    src="/images/guruji.png"
                    alt="Guru mentor standing beside the learner"
                    width={260}
                    height={390}
                    className="h-auto w-full object-contain drop-shadow-[0_20px_20px_rgba(90,30,0,0.18)]"
                    preload
                  />
                </div>
              </div>

              {stage === "intro" ? (
                <p className="mt-8 font-serif text-3xl font-semibold text-white">
                  Chandogya
                </p>
              ) : (
                <div className="w-full rounded-t-[34px] bg-[#FFF9EE] px-6 py-7 text-[#25170F] shadow-[0_-16px_40px_rgba(95,37,8,0.14)] dark:bg-[#21130C] dark:text-[#F8EBCF]">
                  <h1 className="font-serif text-3xl font-semibold leading-tight">
                    Begin your learning journey.
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-[#715342] dark:text-[#CDBB9E]">
                    Enter the gurukul space made for discipline, confidence and
                    modern skills.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStage("form")}
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#F46A13] text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_28px_rgba(244,106,19,0.28)] transition hover:bg-[#DB5D10]"
                  >
                    Log In
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className={`mx-auto w-full max-w-[430px] transition-all duration-700 ${
              isFormStage
                ? "translate-y-0 opacity-100"
                : "pointer-events-none absolute translate-y-8 opacity-0 lg:translate-x-10 lg:translate-y-0"
            }`}
          >
            <div className="rounded-[34px] border border-white/54 bg-[#F6F1EC]/94 p-6 shadow-[0_26px_80px_rgba(63,34,15,0.2)] backdrop-blur-xl dark:border-[#D4A72C]/16 dark:bg-[#21130C]/94 sm:p-8">
              <button
                type="button"
                onClick={() => setStage("welcome")}
                aria-label="Back to welcome screen"
                className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#25170F] shadow-sm transition hover:bg-[#FFF4E2] dark:bg-[#160C07] dark:text-[#F8EBCF]"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="mt-8">
                <p className="font-serif text-sm font-semibold uppercase tracking-[0.24em] text-[#C18A4A] dark:text-[#D4A72C]">
                  Student Portal
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold text-[#25170F] dark:text-[#F8EBCF]">
                  Log in
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#715342] dark:text-[#CDBB9E]">
                  Use your registered email or username to continue your
                  Chandogya learning path.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <label className="grid gap-2 text-sm font-semibold text-[#4A3122] dark:text-[#F8EBCF]">
                  Email or username
                  <span className="flex h-13 items-center gap-3 rounded-2xl border border-[#E0D2C3] bg-white px-4 transition focus-within:border-[#F46A13] dark:border-[#D4A72C]/16 dark:bg-[#160C07]">
                    <Mail className="h-5 w-5 text-[#C18A4A]" />
                    <input
                      name="identifier"
                      type="text"
                      required
                      placeholder="your email or username"
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
                      placeholder="enter password"
                      className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A39283] dark:placeholder:text-[#9B8A78]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="text-[#715342] transition hover:text-[#F46A13] dark:text-[#CDBB9E]"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </span>
                </label>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex items-center gap-2 text-[#715342] dark:text-[#CDBB9E]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#D3BCA8] accent-[#F46A13]"
                    />
                    Remember me
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-[#C18A4A] transition hover:text-[#F46A13] dark:text-[#D4A72C]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 flex h-13 items-center justify-center gap-2 rounded-full bg-[#F46A13] text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(244,106,19,0.28)] transition hover:bg-[#DB5D10] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Connecting..." : "Connect"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                {message ? (
                  <p className="rounded-2xl bg-[#FFF4E2] px-4 py-3 text-sm leading-6 text-[#715342] dark:bg-[#160C07] dark:text-[#CDBB9E]">
                    {message}
                  </p>
                ) : null}

                <p className="text-center text-sm text-[#715342] dark:text-[#CDBB9E]">
                  New here?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-[#C18A4A] transition hover:text-[#F46A13] dark:text-[#D4A72C]"
                  >
                    Create an account
                  </Link>
                </p>

                <p className="text-center text-sm text-[#715342] dark:text-[#CDBB9E]">
                  Admin team?{" "}
                  <Link
                    href="/admin/login"
                    className="font-semibold text-[#315C45] transition hover:text-[#F46A13] dark:text-[#D4A72C]"
                  >
                    Open admin login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

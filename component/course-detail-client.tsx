"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Play,
  Star,
} from "lucide-react";
import type { Course } from "@/lib/courses";

const sampleVideo =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

type CourseDetailClientProps = {
  course: Course;
};

type RazorpayCheckoutResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayConstructor = new (options: {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayCheckoutResponse) => void;
  theme: { color: string };
}) => { open: () => void };

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [openLessonIndex, setOpenLessonIndex] = useState(0);
  const [enrollmentMessage, setEnrollmentMessage] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const activeLesson = course.lessons[activeLessonIndex];

  const handleEnroll = async () => {
    setEnrolling(true);
    setEnrollmentMessage("");

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseSlug: course.slug }),
      });
      const result = (await response.json()) as {
        error?: string;
        enrollment?: unknown;
        order?: { id: string; amountPaise: number; currency: string };
        providerOrder?: { id: string; amount: number; currency: string };
        razorpayKeyId?: string;
      };

      if (response.status === 401) {
        setEnrollmentMessage("Please login first, then enroll again.");
        return;
      }

      if (!response.ok) {
        throw new Error(result.error ?? "Enrollment could not be completed.");
      }

      if (course.type === "free") {
        setEnrollmentMessage("Enrollment confirmed.");
        return;
      }

      if (!result.order || !result.providerOrder || !result.razorpayKeyId) {
        throw new Error("Payment order could not be started.");
      }

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Razorpay checkout could not be loaded.");
      }

      const checkout = new window.Razorpay({
        key: result.razorpayKeyId,
        amount: result.providerOrder.amount,
        currency: result.providerOrder.currency,
        name: "Chandogya Prodigies",
        description: course.title,
        order_id: result.providerOrder.id,
        theme: { color: "#315C45" },
        handler: async (paymentResponse) => {
          const verificationResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentOrderId: result.order?.id,
              ...paymentResponse,
            }),
          });

          if (!verificationResponse.ok) {
          setEnrollmentMessage("Payment verification failed.");
            return;
          }

          setEnrollmentMessage("Payment verified. Enrollment confirmed.");
        },
      });

      checkout.open();
    } catch (error) {
      setEnrollmentMessage(
        error instanceof Error ? error.message : "Enrollment could not be completed.",
      );
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <main className="relative overflow-hidden bg-[#F6A143] px-5 py-8 text-[#15110D] sm:px-8 dark:bg-[#160C07] dark:text-[#F8EBCF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2%_96%,rgba(255,190,156,0.68),transparent_14%),radial-gradient(circle_at_64%_100%,rgba(237,238,91,0.52),transparent_18%),radial-gradient(circle_at_100%_48%,rgba(248,232,112,0.72),transparent_10%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(212,167,44,0.14),transparent_30%),linear-gradient(135deg,#160C07_0%,#21130C_56%,#132118_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-base font-bold text-black transition hover:text-[#064B45] sm:text-lg dark:text-[#F8EBCF] dark:hover:text-[#D4A72C]"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Courses
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-5">
            <section className="overflow-hidden rounded-[24px] border border-white/70 bg-[#FFFDF7]/82 p-2 shadow-[0_18px_42px_rgba(95,52,8,0.16)] backdrop-blur-sm dark:border-[#D4A72C]/18 dark:bg-[#21130C]/86">
              <div className="relative aspect-video overflow-hidden rounded-[18px] bg-black">
                <video
                  key={activeLesson.title}
                  controls
                  playsInline
                  poster={course.image}
                  className="h-full w-full object-cover"
                >
                  <source src={sampleVideo} type="video/mp4" />
                </video>
              </div>
            </section>

            <section className="rounded-[18px] border border-white/70 bg-[#FFFDF7]/90 p-5 shadow-[0_16px_34px_rgba(95,52,8,0.13)] sm:p-6 dark:border-[#D4A72C]/18 dark:bg-[#21130C]/86">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#F39A25] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {course.price}
                </span>
                <span className="rounded-full bg-[#064B45]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#064B45] dark:bg-[#D4A72C]/12 dark:text-[#D4A72C]">
                  {course.level}
                </span>
              </div>

              <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#15110D] sm:text-4xl dark:text-[#F8EBCF]">
                {course.title}
              </h1>

              <h2 className="mt-6 text-xl font-bold text-[#15110D] dark:text-[#F8EBCF]">
                {activeLesson.title}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#6B5646] dark:text-[#CDBB9E]">
                <Clock className="h-4 w-4 text-[#315C45] dark:text-[#D4A72C]" />
                Duration: {activeLesson.duration}
              </p>
              <p className="mt-5 leading-7 text-[#4F4034] dark:text-[#CDBB9E]">
                {activeLesson.summary}
              </p>
            </section>

            <section className="rounded-[18px] border border-white/70 bg-[#FFFDF7]/90 p-5 shadow-[0_16px_34px_rgba(95,52,8,0.13)] sm:p-6 dark:border-[#D4A72C]/18 dark:bg-[#21130C]/86">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#315C45] dark:text-[#D4A72C]" />
                <h2 className="font-serif text-2xl font-semibold text-[#15110D] dark:text-[#F8EBCF]">
                  Lesson Notes
                </h2>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-7 text-[#4F4034] dark:text-[#CDBB9E]">
                <p className="font-semibold text-[#15110D] dark:text-[#F8EBCF]">
                  # {activeLesson.title}
                </p>
                {course.notes.map((note) => (
                  <p key={note} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#315C45] dark:text-[#D4A72C]" />
                    {note}
                  </p>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:pt-3">
            <div className="overflow-hidden rounded-[28px] border border-white/70 bg-[#FFFDF7]/90 shadow-[0_18px_42px_rgba(95,52,8,0.16)] backdrop-blur-sm dark:border-[#D4A72C]/18 dark:bg-[#21130C]/88">
              <div className="border-b border-[#E7D5AC] p-6 dark:border-[#D4A72C]/16">
                <p className="font-serif text-2xl font-semibold">
                  Course Content
                </p>
                <p className="mt-2 text-sm text-[#6B5646] dark:text-[#CDBB9E]">
                  {course.lessons.length} lessons / {course.duration}
                </p>
              </div>

              <div>
                {course.lessons.map((lesson, index) => {
                  const active = index === activeLessonIndex;
                  const open = index === openLessonIndex;

                  return (
                    <div
                      key={lesson.title}
                      className={`border-b border-[#E7D5AC] last:border-b-0 dark:border-[#D4A72C]/16 ${
                        active ? "bg-[#EAF2FF]" : "bg-white/35 dark:bg-transparent"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLessonIndex(index);
                          setOpenLessonIndex(open ? -1 : index);
                        }}
                        className={`flex w-full gap-4 p-5 text-left transition hover:bg-[#EAF2FF]/70 ${
                          active ? "border-l-4 border-l-[#2D6CDF]" : ""
                        }`}
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            active
                              ? "bg-[#2D6CDF] text-white"
                              : "bg-[#E8E9EE] text-[#4F5968] dark:bg-white/10 dark:text-[#CDBB9E]"
                          }`}
                        >
                          {active ? (
                            <Play className="ml-0.5 h-4 w-4 fill-current" />
                          ) : (
                            index + 1
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`block font-semibold ${
                              active
                                ? "text-[#2D6CDF]"
                                : "text-[#15110D] dark:text-[#F8EBCF]"
                            }`}
                          >
                            {lesson.title}
                          </span>
                          <span className="mt-2 block text-sm text-[#6B7280] dark:text-[#CDBB9E]">
                            {lesson.duration}
                          </span>
                        </span>

                        <ChevronDown
                          className={`mt-2 h-5 w-5 shrink-0 text-[#6B7280] transition ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {open ? (
                        <div className="px-5 pb-5 pl-[5.75rem] text-sm leading-6 text-[#5E6876] dark:text-[#CDBB9E]/82">
                          {lesson.summary}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-white/55 bg-[#064B45] p-6 text-white shadow-[0_18px_38px_rgba(6,75,69,0.18)] dark:border-[#D4A72C]/18">
              <div className="flex items-center gap-2 text-[#FFE8A8]">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">
                  {course.rating} / {course.reviews}
                </span>
              </div>
              <p className="mt-4 font-serif text-2xl font-semibold">
                Ready to begin?
              </p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Enroll or speak to our team to understand whether this is the
                right path for your learner.
              </p>
              <button
                type="button"
                onClick={handleEnroll}
                disabled={enrolling}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#D4A72C] px-5 py-3 text-sm font-semibold text-[#160C07] transition hover:bg-[#FFE8A8] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {enrolling ? "Processing..." : "Enroll Now"}
              </button>
              <Link
                href="/contact"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#FFF8E6] px-5 py-3 text-sm font-semibold text-[#064B45] transition hover:bg-white"
              >
                Talk to a mentor
              </Link>
              {enrollmentMessage ? (
                <p className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm leading-6 text-white/82">
                  {enrollmentMessage}
                  {enrollmentMessage.includes("confirmed") ? (
                    <Link
                      href="/dashboard"
                      className="ml-2 font-semibold text-[#FFE8A8] underline underline-offset-4"
                    >
                      View dashboard
                    </Link>
                  ) : null}
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

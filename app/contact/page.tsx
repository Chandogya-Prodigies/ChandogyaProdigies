"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";
import { FormEvent, useState } from "react";

const contactReasons = [
  "Course guidance",
  "Demo class",
  "Learning model",
  "School partnership",
];

const orbitPeople = [
  { image: "/images/botboy.png", label: "Student", className: "left-[18%] top-[20%] h-16 w-16" },
  { image: "/images/guruji.png", label: "Mentor", className: "right-[20%] top-[34%] h-16 w-16" },
  { image: "/images/girl.png", label: "Parent", className: "left-[24%] bottom-[30%] h-14 w-14" },
  { image: "/images/girl1.png", label: "Learner", className: "right-[28%] bottom-[18%] h-14 w-14" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      reason: String(formData.get("reason") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Please check the details and try again.");
      }

      event.currentTarget.reset();
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F7F1EA] px-4 py-8 text-[#2A211B] dark:bg-[#160C07] dark:text-[#F8EBCF] sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100svh-9rem)] max-w-7xl overflow-hidden rounded-[22px] border border-[#E1D4C8] bg-[#FFFDF7] shadow-[0_24px_80px_rgba(64,45,30,0.1)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:rounded-[28px] lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="relative min-h-[360px] overflow-hidden border-b border-[#E1D4C8] bg-[#F8E7CF] p-6 dark:border-[#D4A72C]/16 dark:bg-[#2A1910] sm:min-h-[430px] sm:p-7 lg:min-h-full lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.72),transparent_22%),radial-gradient(circle_at_68%_78%,rgba(233,150,47,0.2),transparent_28%)] dark:bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_68%_78%,rgba(212,167,44,0.13),transparent_28%)]" />

          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-[#6B5646] transition hover:text-[#C18A4A] dark:text-[#CDBB9E] dark:hover:text-[#D4A72C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>

          <div className="relative z-10 mt-5 flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <div>
              <p className="font-serif text-xl font-semibold">
                Chandogya Prodigies
              </p>
              <p className="text-sm text-[#8B7C70] dark:text-[#BBA98D]">
                Learning support circle
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 top-[47%] h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C18A4A]/16 sm:h-[520px] sm:w-[520px]" />
          <div className="absolute left-1/2 top-[47%] h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C18A4A]/18 sm:h-[390px] sm:w-[390px]" />
          <div className="absolute left-1/2 top-[47%] h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C18A4A]/20 sm:h-[250px] sm:w-[250px]" />

          {orbitPeople.map((person) => (
            <div
              key={person.label}
              className={`absolute z-10 overflow-hidden rounded-full border-4 border-[#FFFDF7] bg-white shadow-[0_12px_28px_rgba(64,45,30,0.18)] dark:border-[#21130C] ${person.className}`}
            >
              <Image
                src={person.image}
                alt={person.label}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ))}

          <div className="relative z-10 mt-[210px] max-w-sm rounded-[22px] bg-[#FFFDF7]/82 p-5 shadow-[0_18px_48px_rgba(64,45,30,0.1)] backdrop-blur-md dark:bg-[#160C07]/72 sm:mt-[300px]">
            <p className="font-serif text-2xl font-semibold">
              We guide before you decide.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
              Ask about courses, demo classes, online/offline models or school
              collaborations. We will help you choose the right next step.
            </p>
          </div>

          <div className="relative z-10 mt-6 grid gap-3 text-sm text-[#6B5646] dark:text-[#CDBB9E]">
            <a
              href="mailto:hello@chandogyaprodigies.com"
              className="inline-flex items-center gap-2 transition hover:text-[#C18A4A] dark:hover:text-[#D4A72C]"
            >
              <Mail className="h-4 w-4" />
              hello@chandogyaprodigies.com
            </a>
            <a
              href="tel:+919999999999"
              className="inline-flex items-center gap-2 transition hover:text-[#C18A4A] dark:hover:text-[#D4A72C]"
            >
              <Phone className="h-4 w-4" />
              +91 99999 99999
            </a>
          </div>
        </aside>

        <section className="p-5 sm:p-8 lg:p-14">
          <div className="mx-auto max-w-3xl">
            <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
              Contact Us
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#2A211B] sm:text-5xl dark:text-[#F8EBCF]">
              We would love to help
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#75695F] dark:text-[#CDBB9E]">
              Reach out and our team will get back to you with the right course,
              model or partnership guidance.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Clock3, title: "24 hour reply", text: "Quick support" },
                { icon: MessageSquareText, title: "Guided choice", text: "Course help" },
                { icon: MapPin, title: "Online + offline", text: "Flexible models" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-[#E1D4C8] bg-[#FFF9EE] p-4 dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                  >
                    <Icon className="h-5 w-5 text-[#C18A4A] dark:text-[#D4A72C]" />
                    <p className="mt-3 text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-[#8B7C70] dark:text-[#BBA98D]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-9 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  First name
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="First name"
                    className="h-12 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal outline-none transition placeholder:text-[#A39283] focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Last name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className="h-12 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal outline-none transition placeholder:text-[#A39283] focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="h-12 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal outline-none transition placeholder:text-[#A39283] focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  I want help with
                  <select
                    name="reason"
                    className="h-12 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal outline-none transition focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                  >
                    {contactReasons.map((reason) => (
                      <option key={reason}>{reason}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Phone number
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91"
                    className="h-12 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal outline-none transition placeholder:text-[#A39283] focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold">
                Message
                <textarea
                  name="message"
                  required
                  placeholder="Tell us what you are looking for..."
                  rows={6}
                  className="resize-none rounded-2xl border border-[#E1D4C8] bg-white px-4 py-3 text-sm font-normal leading-6 outline-none transition placeholder:text-[#A39283] focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                />
              </label>

              <label className="flex items-start gap-3 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-[#D3BCA8] accent-[#E9962F]"
                />
                You agree that our team may contact you about your enquiry.
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#315C45] px-7 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(49,92,69,0.22)] transition hover:bg-[#274B38] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </button>

              {errorMessage ? (
                <p className="rounded-2xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 dark:border-red-400/20 dark:bg-red-950/20 dark:text-red-200">
                  {errorMessage}
                </p>
              ) : null}

              {submitted ? (
                <p className="flex items-start gap-3 rounded-2xl border border-[#315C45]/20 bg-[#EEF5EE] px-4 py-3 text-sm leading-6 text-[#315C45] dark:border-[#D4A72C]/18 dark:bg-[#160C07] dark:text-[#D4A72C]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  Thank you. Your message has been saved and our team can
                  follow up from the dashboard.
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}

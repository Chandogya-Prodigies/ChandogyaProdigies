"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

type NewsletterFormProps = {
  source: string;
  variant?: "footer" | "dark";
};

export default function NewsletterForm({
  source,
  variant = "footer",
}: NewsletterFormProps) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source }),
      });

      if (!response.ok) {
        throw new Error("Please enter a valid email.");
      }

      event.currentTarget.reset();
      setMessage("Subscribed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (variant === "dark") {
    return (
      <div>
        <form className="mt-7 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-full border border-white/28 bg-transparent px-5 text-sm text-white outline-none placeholder:text-white/42 focus:border-[#D4A72C]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4A72C] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-[#160C07] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Saving..." : "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        {message ? <p className="mt-3 text-sm text-white/72">{message}</p> : null}
      </div>
    );
  }

  return (
    <div>
      <form
        className="mt-5 flex max-w-md items-center rounded-full border border-[#315C45]/16 bg-white/78 px-4 py-2 shadow-[0_18px_48px_rgba(49,92,69,0.12)] dark:border-white/14 dark:bg-white/8 dark:shadow-[0_18px_48px_rgba(0,0,0,0.16)]"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[#21382C] outline-none placeholder:text-[#6C7A70]/55 dark:text-[#FFF9EE] dark:placeholder:text-[#D8C9B7]/55"
        />

        <button
          type="submit"
          disabled={submitting}
          aria-label="Subscribe"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#315C45] text-white transition hover:bg-[#C96F1A] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#D4A72C] dark:text-[#160C07] dark:hover:bg-[#F8EBCF]"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>
      {message ? (
        <p className="mt-3 text-sm text-[#5F6D61] dark:text-[#D8C9B7]">
          {message}
        </p>
      ) : null}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

import { Mail, MapPin, Phone } from "lucide-react";
import NewsletterForm from "@/component/newsletter-form";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Learning Model", href: "/learning-model" },
  { label: "Blogs", href: "/resources/blogs" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" },
  { label: "X", href: "https://x.com", icon: "x" },
  { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 fill-current"
      >
        <path d="M14 8.3V6.7c0-.8.5-1 1-1h2V2.2A25.7 25.7 0 0 0 14.1 2c-2.9 0-4.9 1.8-4.9 5v1.3H6v3.8h3.2V22H13v-9.9h3l.5-3.8H14Z" />
      </svg>
    );
  }

  if (icon === "x") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 fill-current"
      >
        <path d="M18.2 2h3.3l-7.2 8.2L22.8 22h-6.7l-5.2-6.8L4.9 22H1.6l7.7-8.8L1.2 2h6.8l4.7 6.2L18.2 2Zm-1.1 17.9h1.8L7 4H5l12.1 15.9Z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 fill-current"
      >
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    );
  }

  if (icon === "youtube") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 fill-current"
      >
        <path d="M21.6 7.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C15 3.5 12 3.5 12 3.5s-3 0-6.3.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.4-.9 2.4S2 9.2 2 11.1v1.8c0 1.9.4 3.9.4 3.9s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 6.1.3 6.1.3s3 0 6.3-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.4-2 .4-3.9v-1.8c0-1.9-.4-3.9-.4-3.9ZM10 15.3V8.7l5.8 3.3L10 15.3Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M4.7 3.3a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3 9h3.4v12H3V9Zm6 0h3.3v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V21h-3.4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9V9Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#EEF4E8] text-[#21382C] dark:bg-[#100905] dark:text-[#FFF9EE]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(49,92,69,0.16),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(233,150,47,0.18),transparent_26%),linear-gradient(180deg,#F8F1E5_0%,#EEF4E8_100%)] dark:bg-[radial-gradient(circle_at_14%_20%,rgba(212,167,44,0.16),transparent_30%),linear-gradient(180deg,#160C07_0%,#100905_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#315C45]/35 to-transparent dark:via-[#D4A72C]/50" />
      <Image
        src="/images/pretflower.png"
        alt=""
        width={300}
        height={300}
        className="pointer-events-none absolute -bottom-12 -left-16 opacity-15 dark:invert"
      />
      <Image
        src="/images/lotus.png"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute right-10 top-10 opacity-10 dark:invert"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-10 border-b border-[#315C45]/18 pb-12 dark:border-white/12 lg:grid-cols-[1.1fr_0.7fr_0.85fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt=""
                width={72}
                height={72}
                className="h-16 w-16 object-contain"
              />
              <span className="text-3xl font-bold leading-tight tracking-[-0.01em] text-[#315C45] dark:text-[#F8EBCF]">
                Chandogya Prodigies
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#5F6D61] dark:text-[#D8C9B7]">
              Gurukul-inspired skill learning for children, blending wisdom,
              discipline and modern mentorship.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315C45]/16 bg-white/70 text-[#315C45] shadow-sm transition hover:-translate-y-1 hover:border-[#315C45] hover:bg-[#315C45] hover:text-white dark:border-white/14 dark:bg-white/6 dark:text-[#F8EBCF] dark:hover:border-[#D4A72C] dark:hover:bg-[#D4A72C] dark:hover:text-[#160C07]"
                >
                  <SocialIcon icon={item.icon} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#315C45] dark:text-[#D4A72C]">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-[#5F6D61] transition hover:text-[#C96F1A] dark:text-[#D8C9B7] dark:hover:text-[#D4A72C]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#315C45] dark:text-[#D4A72C]">
              Contact
            </h3>

            <div className="mt-5 grid gap-4 text-sm text-[#5F6D61] dark:text-[#D8C9B7]">
              <a
                href="mailto:hello@chandogyaprodigies.com"
                className="flex items-start gap-3 transition hover:text-[#C96F1A] dark:hover:text-[#D4A72C]"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#C96F1A] dark:text-[#D4A72C]" />
                hello@chandogyaprodigies.com
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-start gap-3 transition hover:text-[#C96F1A] dark:hover:text-[#D4A72C]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#C96F1A] dark:text-[#D4A72C]" />
                +91 99999 99999
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C96F1A] dark:text-[#D4A72C]" />
                India based online, offline and hybrid learning support.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#315C45] dark:text-[#D4A72C]">
              Stay Inspired
            </h3>
            <p className="mt-5 text-sm leading-6 text-[#5F6D61] dark:text-[#D8C9B7]">
              Receive learning notes, demo updates and thoughtful course
              guidance.
            </p>

            <NewsletterForm source="footer" />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-sm text-[#6C7A70] dark:text-[#AFA08D] sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 Chandogya Prodigies. All rights reserved.</p>
          <div className="flex gap-5">
            <Link
              href="/resources/faqs"
              className="transition hover:text-[#C96F1A] dark:hover:text-[#D4A72C]"
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-[#C96F1A] dark:hover:text-[#D4A72C]"
            >
              Support
            </Link>
            <Link
              href="/resources/blogs"
              className="transition hover:text-[#C96F1A] dark:hover:text-[#D4A72C]"
            >
              Blogs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

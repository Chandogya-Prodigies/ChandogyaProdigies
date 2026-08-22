import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, Quote } from "lucide-react";
import { getGuideBySlug, guides } from "@/lib/guides";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="bg-[#FFF9EE] text-[#2E2118] dark:bg-[#160C07] dark:text-[#F8EBCF]">
      <section className="relative overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(233,150,47,0.14),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(49,92,69,0.1),transparent_28%),linear-gradient(180deg,#FFF9EE_0%,#F8E7CF_100%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(212,167,44,0.12),transparent_30%),linear-gradient(180deg,#160C07_0%,#21130C_100%)]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            href="/about#guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#315C45] transition hover:text-[#C96F1A] dark:text-[#D4A72C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to guides
          </Link>

          <div className="mt-10 grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="relative mx-auto w-full max-w-[420px]">
              <div className="absolute -inset-5 rounded-full bg-[#315C45]/12 blur-2xl dark:bg-[#D4A72C]/12" />
              <div className="relative rounded-[32px] border border-white/55 bg-[#FFFDF7]/76 p-5 shadow-[0_24px_60px_rgba(84,47,12,0.14)] backdrop-blur-sm dark:border-[#D4A72C]/18 dark:bg-[#21130C]/78">
                <div className="rounded-[26px] bg-[#E8D86B] p-3 shadow-inner">
                  <Image
                    src={guide.image}
                    alt={guide.name}
                    width={520}
                    height={520}
                    className="h-[330px] w-full rounded-[22px] object-cover sm:h-[390px]"
                    preload
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="font-serif text-sm font-semibold uppercase tracking-[0.24em] text-[#C96F1A] dark:text-[#D4A72C]">
                Guide Profile
              </p>
              <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#2E2118] sm:text-6xl dark:text-[#F8EBCF]">
                {guide.name}
              </h1>
              <p className="mt-3 text-xl font-semibold text-[#315C45] dark:text-[#D4A72C]">
                {guide.role}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6B5646] dark:text-[#CDBB9E]">
                {guide.bio}
              </p>

              <div className="mt-7 rounded-[22px] border border-[#D4A72C]/20 bg-[#FFFDF7]/72 p-6 shadow-[0_16px_42px_rgba(84,47,12,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C]/72">
                <Quote className="h-8 w-8 text-[#C96F1A] dark:text-[#D4A72C]" />
                <p className="mt-4 font-serif text-2xl leading-snug text-[#2E2118] dark:text-[#F8EBCF]">
                  {guide.quote}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[24px] border border-[#D4A72C]/20 bg-[#FFFDF7]/76 p-7 shadow-[0_16px_42px_rgba(84,47,12,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C]/76">
              <p className="font-serif text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F1A] dark:text-[#D4A72C]">
                Focus Area
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#2E2118] dark:text-[#F8EBCF]">
                {guide.focus}
              </h2>
            </div>

            <div className="rounded-[24px] border border-[#D4A72C]/20 bg-[#FFFDF7]/76 p-7 shadow-[0_16px_42px_rgba(84,47,12,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C]/76">
              <p className="font-serif text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F1A] dark:text-[#D4A72C]">
                Strengths
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {guide.strengths.map((strength) => (
                  <div
                    key={strength}
                    className="flex items-center gap-2 rounded-md border border-[#D4A72C]/18 bg-[#FFF9EE] px-3 py-3 text-sm font-semibold text-[#2E2118] dark:border-[#D4A72C]/14 dark:bg-[#160C07] dark:text-[#F8EBCF]"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#315C45] dark:text-[#D4A72C]" />
                    {strength}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#315C45] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(49,92,69,0.18)] transition hover:bg-[#274B38]"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex h-12 items-center justify-center rounded-md border border-[#D4A72C]/35 bg-[#FFFDF7]/72 px-6 text-sm font-semibold text-[#315C45] transition hover:border-[#315C45]/45 hover:text-[#C96F1A] dark:bg-[#21130C]/72 dark:text-[#F8EBCF]"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

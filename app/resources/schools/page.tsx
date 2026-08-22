import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, Users } from "lucide-react";

const partnershipPoints = [
  "Skill-based programmes mapped for school age groups.",
  "Online, offline or hybrid delivery depending on your campus needs.",
  "Mentor-led workshops, parent orientation and progress touchpoints.",
];

const formats = [
  {
    title: "Campus Workshops",
    description:
      "Short, high-energy sessions for communication, critical thinking and creativity.",
    icon: Users,
  },
  {
    title: "Term Programmes",
    description:
      "Structured learning tracks delivered with practice, reflection and feedback.",
    icon: GraduationCap,
  },
];

export default function SchoolPartnershipsPage() {
  return (
    <main className="bg-[#F7F1EA] text-[#2A211B] dark:bg-[#160C07] dark:text-[#F8EBCF]">
      <section className="relative overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
        <Image
          src="/images/top-left.png"
          alt=""
          width={260}
          height={260}
          className="pointer-events-none absolute left-0 top-0 w-32 opacity-70 sm:w-48"
        />
        <Image
          src="/images/bottom-right1.png"
          alt=""
          width={260}
          height={260}
          className="pointer-events-none absolute bottom-0 right-0 w-36 opacity-70 sm:w-52"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
              School Partnerships
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
              Bring Gurukul-inspired skill learning to your campus.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#75695F] dark:text-[#CDBB9E]">
              We help schools add practical, character-led programmes that feel
              modern in delivery and rooted in wisdom at the core.
            </p>
            <div className="mt-8 grid gap-3">
              {partnershipPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#D4A72C]" />
                  <p className="text-base leading-7 text-[#5F4E43] dark:text-[#CDBB9E]">
                    {point}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4A72C] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-[#160C07] shadow-[0_14px_34px_rgba(212,167,44,0.28)]"
            >
              Discuss Partnership
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {formats.map((format) => {
              const Icon = format.icon;

              return (
                <article
                  key={format.title}
                  className="rounded-[22px] border border-[#E1D4C8] bg-white/86 p-7 shadow-[0_18px_52px_rgba(64,45,30,0.08)] backdrop-blur dark:border-[#D4A72C]/16 dark:bg-[#21130C]/92"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#F4A24B]/16 text-[#9B4A25] dark:bg-[#D4A72C]/16 dark:text-[#D4A72C]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 font-serif text-3xl font-semibold">
                    {format.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-[#75695F] dark:text-[#CDBB9E]">
                    {format.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

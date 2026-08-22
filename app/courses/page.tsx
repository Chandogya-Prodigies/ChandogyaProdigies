import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Headset,
  LayoutGrid,
  PlayCircle,
  UserRound,
  Video,
} from "lucide-react";
import type { CourseType } from "@/lib/courses";
import { getPublicCourses } from "@/lib/course-service";

type CoursesPageProps = {
  searchParams: Promise<{ type?: string }>;
};

const filters: Array<{
  label: string;
  href: string;
  value: CourseType | "all";
}> = [
  { label: "All Courses", href: "/courses", value: "all" },
  { label: "Paid Courses", href: "/courses?type=paid", value: "paid" },
  { label: "Free Courses", href: "/courses?type=free", value: "free" },
];

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const selectedType =
    params.type === "paid" || params.type === "free" ? params.type : "all";
  const visibleCourses = await getPublicCourses(selectedType);

  return (
    <main className="bg-[#FFF8E6] text-[#201711] dark:bg-[#160C07] dark:text-[#F8EBCF]">
      <section className="relative overflow-hidden border-b border-[#D4A72C]/30 bg-[#F2DFC0] px-5 py-12 sm:px-8 lg:py-14 dark:border-[#D4A72C]/15 dark:bg-[#20130D]">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[#E9962F]" />
        <Image
          src="/images/leaves.png"
          alt=""
          width={220}
          height={180}
          className="pointer-events-none absolute right-7 top-7 w-28 opacity-35 sm:w-36"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[1.45fr_0.75fr]">
          <div>
            <span className="inline-flex rounded-full bg-[#F39A25] px-5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(173,87,19,0.18)]">
              New Batch
            </span>

            <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-tight text-[#064B45] sm:text-5xl lg:text-6xl dark:text-[#F8EBCF]">
              Admissions Open for July Gurukul Program
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#315C45] sm:text-xl dark:text-[#CDBB9E]">
              Experience a blend of online mentorship and offline
              gurukul-style labs. Limited seats available for skill-based,
              value-rooted learning.
            </p>

            <Link
              href="#explore-courses"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#064B45] px-8 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(6,75,69,0.2)] transition hover:-translate-y-1 hover:bg-[#043D38]"
            >
              Explore Programs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-md bg-white p-5 shadow-[0_18px_38px_rgba(84,47,12,0.12)] dark:bg-[#2A1A11]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#FFF8E6]">
              <Image
                src="/images/girl1.png"
                alt="Students learning communication"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center font-serif text-xl font-semibold text-[#064B45] dark:text-[#D4A72C]">
              Communication
            </p>
          </div>
        </div>
      </section>

      <section
        id="explore-courses"
        className="relative overflow-hidden bg-[#F6A143] px-5 py-16 sm:px-8 dark:bg-[#160C07]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_7%_92%,rgba(255,190,156,0.68),transparent_16%),radial-gradient(circle_at_68%_98%,rgba(237,238,91,0.52),transparent_18%),radial-gradient(circle_at_100%_48%,rgba(248,232,112,0.72),transparent_10%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(212,167,44,0.14),transparent_30%),linear-gradient(135deg,#160C07_0%,#21130C_56%,#132118_100%)]" />
        <Image
          src="/images/pretflower.png"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none absolute bottom-0 right-0 w-36 opacity-45 lg:w-48"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-serif text-sm font-semibold tracking-[0.24em] text-[#7A3A16] dark:text-[#D4A72C]">
              EXPLORE OUR COLLECTION
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-white sm:text-5xl dark:text-[#F8EBCF]">
              Popular Courses
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-8 text-white/90 dark:text-[#CDBB9E]">
              Dive into carefully curated courses designed to help learners
              build confidence, skill and clarity.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => {
              const active = selectedType === filter.value;

              return (
                <Link
                  key={filter.value}
                  href={filter.href}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-[#064B45] text-white shadow-[0_12px_24px_rgba(6,75,69,0.22)]"
                      : "bg-white/55 text-[#2E2118] hover:bg-white dark:bg-white/10 dark:text-[#F8EBCF]"
                  }`}
                >
                  {filter.value === "all" ? (
                    <LayoutGrid className="h-4 w-4" />
                  ) : filter.value === "paid" ? (
                    <BookOpen className="h-4 w-4" />
                  ) : (
                    <PlayCircle className="h-4 w-4" />
                  )}
                  {filter.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group block"
              >
                <article className="flex h-full min-h-[480px] flex-col overflow-hidden rounded-[18px] bg-[#F8FCFF] shadow-[0_18px_38px_rgba(22,52,56,0.14)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_52px_rgba(22,52,56,0.18)] dark:bg-[#21130C]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#DDEFF4]">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-1.5 text-xs font-bold text-[#111827] shadow-sm">
                      {course.price}
                    </span>
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition group-hover:scale-105">
                      <PlayCircle className="h-8 w-8 fill-white/85" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-bold leading-snug text-[#111827] dark:text-[#F8EBCF]">
                      {course.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[#4B5563] dark:text-[#CDBB9E]">
                      {course.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-sm text-[#6B7280] dark:text-[#CDBB9E]">
                      <span className="inline-flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {course.lessons.length} lessons
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {course.hours}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FFD06F] px-5 py-14 sm:px-8 dark:bg-[#160C07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,248,224,0.26),transparent_26%),linear-gradient(135deg,#FFD77D_0%,#FFD06F_48%,#F6BE45_100%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(212,167,44,0.14),transparent_30%),linear-gradient(135deg,#160C07_0%,#21130C_56%,#132118_100%)]" />

        <Image
          src="/images/feature-lotus.png"
          alt=""
          width={260}
          height={260}
          className="pointer-events-none absolute -left-24 top-28 hidden w-56 -rotate-12 opacity-18 sm:block lg:w-72"
        />
        <Image
          src="/images/feature-lotus.png"
          alt=""
          width={260}
          height={260}
          className="pointer-events-none absolute -right-24 bottom-8 hidden w-56 rotate-12 scale-x-[-1] opacity-18 sm:block lg:w-72"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center">
            <Image
              src="/images/feature-lotus.png"
              alt=""
              width={110}
              height={110}
              className="mx-auto h-20 w-20 object-contain opacity-90 sm:h-24 sm:w-24"
            />
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#2E2630] sm:text-5xl dark:text-[#F8EBCF]">
              Our Special Feature For You
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base font-medium leading-7 text-[#6B4A20] sm:text-lg dark:text-[#CDBB9E]">
              Everything learners need for guided, confident and consistent
              progress.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Amazing Instructor",
                icon: UserRound,
              },
              {
                title: "Lifetime Support",
                icon: Headset,
              },
              {
                title: "Video Lessons",
                icon: Video,
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="relative overflow-hidden rounded-[16px] bg-[#FFA15C] px-6 py-7 text-center text-black shadow-[0_4px_0_rgba(44,36,23,0.36),0_16px_30px_rgba(95,52,8,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(44,36,23,0.42),0_22px_38px_rgba(95,52,8,0.18)] dark:bg-[#C96F1A] dark:text-[#160C07]"
                >
                  <Icon className="mx-auto h-16 w-16 stroke-[2.4] sm:h-20 sm:w-20" />
                  <h3 className="mt-5 text-2xl font-semibold leading-tight">
                    {feature.title}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

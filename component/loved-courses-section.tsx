"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Heart,
  Star,
  Users,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const courses = [
  {
    title: "Advanced Communication Skills & Public Speaking Masterclass",
    image: "/images/cr.jpg",
    duration: "12 Weeks",
    likes: "1,850+",
    enrolled: "8,430",
    mentor: "Sarah Johnson",
    rating: "4.8",
    reviews: "320 Reviews",
    slug: "communication-public-speaking",
  },
  {
    title: "Creative & Critical Thinking Skills Masterclass",
    image: "/images/financial-Planning.jpg",
    duration: "10 Weeks",
    likes: "1,920+",
    enrolled: "9,150",
    mentor: "David Chen",
    rating: "4.9",
    reviews: "410 Reviews",
    slug: "creative-critical-thinking",
  },
  {
    title: "Personality Development for Young Leaders",
    image: "/images/crirical.jpg",
    duration: "8 Weeks",
    likes: "1,450+",
    enrolled: "6,200",
    mentor: "Chandogya Mentor",
    rating: "4.7",
    reviews: "260 Reviews",
    slug: "offline-gurukul-lab",
  },
  {
    title: "AI & Technology Skills for Curious Learners",
    image: "/images/ai.jpg",
    duration: "6 Weeks",
    likes: "1,320+",
    enrolled: "5,480",
    mentor: "Chandogya Mentor",
    rating: "4.8",
    reviews: "210 Reviews",
    slug: "ai-foundations",
  },
];

export default function LovedCoursesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F3B24B] px-5 py-14 text-[#2E2118] transition-colors duration-500 dark:bg-[#160C07] dark:text-[#F8EBCF] sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(255,249,238,0.42),transparent_30%),linear-gradient(180deg,#F7C96B_0%,#E9962F_100%)] dark:bg-[radial-gradient(circle_at_78%_12%,rgba(212,167,44,0.14),transparent_28%),linear-gradient(180deg,#160C07_0%,#21130C_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A72C]/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-sm font-semibold tracking-[0.22em] text-[#C96F1A] sm:text-base dark:text-[#D4A72C]">
            FEATURED COURSES
          </p>

          <h2 className="mt-2 font-serif text-4xl font-semibold leading-tight text-[#2E2118] md:text-5xl dark:text-[#F8EBCF]">
            Courses People Loved
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#5E432C] dark:text-[#CDBB9E]">
            Programs designed to turn timeless values into clear, practical
            skills for today&apos;s learners.
          </p>

          <div className="mx-auto mt-3 h-px w-20 bg-[#315C45]/40 dark:bg-[#D4A72C]/65" />
        </div>

        <div className="relative mt-9">
          <button className="courses-prev absolute -left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-[#D4A72C]/25 bg-[#315C45] text-white shadow-[0_12px_30px_rgba(49,92,69,0.22)] transition hover:scale-105 hover:bg-[#274B38] md:flex xl:-left-6">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button className="courses-next absolute -right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-[#D4A72C]/25 bg-[#315C45] text-white shadow-[0_12px_30px_rgba(49,92,69,0.22)] transition hover:scale-105 hover:bg-[#274B38] md:flex xl:-right-6">
            <ChevronRight className="h-5 w-5" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            rewind
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".courses-prev",
              nextEl: ".courses-next",
            }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1100: { slidesPerView: 4 },
            }}
            className="pb-2"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.slug} className="h-auto">
                <Link
                  href={`/courses/${course.slug}`}
                  className="group block h-full"
                >
                  <article className="flex h-full min-h-[440px] flex-col overflow-hidden rounded-md border border-[#FFF9EE]/65 bg-[#FFFDF7]/92 shadow-[0_14px_34px_rgba(95,52,8,0.14)] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#315C45]/35 group-hover:shadow-[0_20px_48px_rgba(95,52,8,0.2)] dark:border-[#D4A72C]/18 dark:bg-[#21130C]/86 dark:shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
                    <div className="relative h-[138px] shrink-0 overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#160C07]/72 via-[#160C07]/12 to-transparent" />

                      <div className="absolute bottom-4 left-4 rounded-md border border-[#F8EBCF]/25 bg-[#160C07]/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#F8EBCF] backdrop-blur-md">
                        Loved Program
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="min-h-[68px] font-serif text-lg font-semibold leading-tight text-[#2E2118] dark:text-[#F8EBCF]">
                        {course.title}
                      </h3>

                      <div className="mt-3 grid grid-cols-3 gap-2 border-y border-[#D4A72C]/18 py-3 text-[#6B5646] dark:border-[#D4A72C]/14 dark:text-[#CDBB9E]">
                        <div className="min-w-0">
                          <div className="flex min-h-[18px] items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#C96F1A] dark:text-[#D4A72C]">
                            <Clock className="h-3.5 w-3.5" />
                            Time
                          </div>
                          <p className="mt-1 text-sm font-semibold text-[#2E2118] dark:text-[#F8EBCF]">
                            {course.duration}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <div className="flex min-h-[18px] items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#C96F1A] dark:text-[#D4A72C]">
                            <Heart className="h-3.5 w-3.5" />
                            Likes
                          </div>
                          <p className="mt-1 text-sm font-semibold text-[#2E2118] dark:text-[#F8EBCF]">
                            {course.likes}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <div className="flex min-h-[18px] items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#C96F1A] dark:text-[#D4A72C]">
                            <Users className="h-3.5 w-3.5" />
                            Joined
                          </div>
                          <p className="mt-1 text-sm font-semibold text-[#2E2118] dark:text-[#F8EBCF]">
                            {course.enrolled}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex min-h-[58px] items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#2E2118] dark:text-[#F8EBCF]">
                            {course.mentor}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-[#6B5646] dark:text-[#CDBB9E]">
                            <span>{course.rating}</span>
                            <div className="flex text-[#D4A72C]">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className="h-3.5 w-3.5 fill-current"
                                />
                              ))}
                            </div>
                            <span>{course.reviews}</span>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1 rounded-md bg-[#F8E7CF] px-2 py-1 text-xs font-semibold text-[#6B5646] dark:bg-[#2A1910] dark:text-[#CDBB9E]">
                          <Eye className="h-3.5 w-3.5" />
                          Watched
                        </div>
                      </div>

                      <span className="mt-auto inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#315C45] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(49,92,69,0.18)] transition group-hover:bg-[#274B38]">
                        Enroll Now
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/courses"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#315C45] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(49,92,69,0.18)] transition hover:bg-[#274B38]"
          >
            View All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

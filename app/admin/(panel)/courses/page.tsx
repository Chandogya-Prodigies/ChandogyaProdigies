import Link from "next/link";
import { BookOpen, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  createCourse,
  createLesson,
  deleteCourse,
  deleteLesson,
  updateCourse,
  updateLesson,
} from "./actions";
import AdminMediaUpload from "@/component/admin-media-upload";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      lessons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return (
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
              Admin Dashboard
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              Course Upload
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#75695F] dark:text-[#CDBB9E]">
              Add, edit, publish and organize real database courses for the
              public course pages.
            </p>
          </div>
          <Link
            href="/admin"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#315C45]/20 bg-white px-6 text-sm font-semibold text-[#315C45] dark:border-[#D4A72C]/20 dark:bg-[#21130C] dark:text-[#D4A72C]"
          >
            Admin Overview
            <BookOpen className="h-4 w-4" />
          </Link>
        </div>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            action={createCourse}
            className="rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="h-6 w-6 text-[#C18A4A]" />
              <h2 className="font-serif text-3xl font-semibold">
                Add Course
              </h2>
            </div>

            <div className="mt-7 grid gap-5">
              <label className="grid gap-2 text-sm font-semibold">
                Title
                <input name="title" required className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Slug
                <input name="slug" required placeholder="creative-critical-thinking" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Type
                  <select name="type" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07]">
                    <option value="paid">Paid</option>
                    <option value="free">Free</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Category
                  <input name="category" required defaultValue="General" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <label className="grid gap-2 text-sm font-semibold">
                  Age group
                  <input name="ageGroup" placeholder="Ages 10-16" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Difficulty
                  <input name="difficulty" required defaultValue="Beginner" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Level
                  <input name="level" required placeholder="Ages 10-16" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Duration
                  <input name="duration" required placeholder="12 Weeks" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Hours
                  <input name="hours" required placeholder="45+ hours" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Mentor
                  <input name="mentor" required className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Price label
                  <input name="price" required placeholder="Premium" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Price amount paise
                  <input name="priceAmountPaise" type="number" min="0" defaultValue="0" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Discount label
                  <input name="discountLabel" placeholder="Early bird" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold">
                Thumbnail path
                <input name="image" required defaultValue="/images/girl3.png" className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Preview video URL
                <input name="previewVideoUrl" placeholder="https://..." className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Description
                <textarea name="description" required rows={5} className="resize-none rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 py-3 text-sm font-normal leading-6 outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]" />
              </label>
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input name="published" type="checkbox" className="h-4 w-4 accent-[#E9962F]" />
                Publish now
              </label>
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input name="featured" type="checkbox" className="h-4 w-4 accent-[#E9962F]" />
                Feature on course sections
              </label>
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-[#315C45] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_32px_rgba(49,92,69,0.22)]">
                Save Course
              </button>
            </div>
          </form>

          <section className="rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
            <h2 className="font-serif text-3xl font-semibold">
              Database Courses
            </h2>
            <div className="mt-6 grid gap-4">
              {courses.length === 0 ? (
                <p className="rounded-2xl bg-[#FFF8E6] p-5 text-sm leading-6 text-[#75695F] dark:bg-[#160C07] dark:text-[#CDBB9E]">
                  No database courses yet. Add your first course from the form.
                </p>
              ) : (
                courses.map((course) => (
                  <article
                    key={course.id}
                    className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-5 dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#8B7C70] dark:text-[#BBA98D]">
                          /courses/{course.slug} - {course.type} -{" "}
                          {course.published ? "Published" : "Draft"}
                        </p>
                        <p className="mt-1 text-xs text-[#8B7C70] dark:text-[#BBA98D]">
                          {course.category} - {course.difficulty} - INR{" "}
                          {(course.priceAmountPaise / 100).toLocaleString("en-IN")}
                          {course.featured ? " - Featured" : ""}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#D4A72C]/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A3E20] dark:text-[#D4A72C]">
                        {course.lessons.length} lessons
                      </span>
                    </div>
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
                      {course.description}
                    </p>
                    <details className="mt-5 rounded-2xl border border-[#E1D4C8] bg-white/70 p-4 dark:border-[#D4A72C]/16 dark:bg-[#21130C]/70">
                      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-[#315C45] marker:hidden dark:text-[#D4A72C]">
                        <Pencil className="h-4 w-4" />
                        Edit course
                      </summary>

                      <form action={updateCourse} className="mt-5 grid gap-4">
                        <input type="hidden" name="id" value={course.id} />
                        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                          Title
                          <input name="title" required defaultValue={course.title} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                        </label>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Slug
                            <input name="slug" required defaultValue={course.slug} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Type
                            <select name="type" defaultValue={course.type} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]">
                              <option value="paid">Paid</option>
                              <option value="free">Free</option>
                            </select>
                          </label>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Category
                            <input name="category" required defaultValue={course.category} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Age group
                            <input name="ageGroup" defaultValue={course.ageGroup ?? ""} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Difficulty
                            <input name="difficulty" required defaultValue={course.difficulty} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Level
                            <input name="level" required defaultValue={course.level} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Duration
                            <input name="duration" required defaultValue={course.duration} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Hours
                            <input name="hours" required defaultValue={course.hours} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Mentor
                            <input name="mentor" required defaultValue={course.mentor} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Price
                            <input name="price" required defaultValue={course.price} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Amount paise
                            <input name="priceAmountPaise" type="number" min="0" required defaultValue={course.priceAmountPaise} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Discount
                            <input name="discountLabel" defaultValue={course.discountLabel ?? ""} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                            Image path
                            <input name="image" required defaultValue={course.image} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                          </label>
                        </div>
                        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                          Preview video URL
                          <input name="previewVideoUrl" defaultValue={course.previewVideoUrl ?? ""} className="h-11 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                        </label>
                        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                          Description
                          <textarea name="description" required defaultValue={course.description} rows={4} className="resize-none rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#F8EBCF]" />
                        </label>
                        <label className="flex items-center gap-3 text-sm font-semibold">
                          <input name="published" type="checkbox" defaultChecked={course.published} className="h-4 w-4 accent-[#E9962F]" />
                          Published
                        </label>
                        <label className="flex items-center gap-3 text-sm font-semibold">
                          <input name="featured" type="checkbox" defaultChecked={course.featured} className="h-4 w-4 accent-[#E9962F]" />
                          Featured
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <button className="inline-flex h-11 items-center justify-center rounded-full bg-[#315C45] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                            Save Changes
                          </button>
                        </div>
                      </form>

                      <form action={deleteCourse} className="mt-3">
                        <input type="hidden" name="id" value={course.id} />
                        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-50 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-950/20 dark:text-red-200">
                          <Trash2 className="h-4 w-4" />
                          Delete Course
                        </button>
                      </form>
                    </details>

                    <details className="mt-3 rounded-2xl border border-[#E1D4C8] bg-white/70 p-4 dark:border-[#D4A72C]/16 dark:bg-[#21130C]/70">
                      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-[#315C45] marker:hidden dark:text-[#D4A72C]">
                        <BookOpen className="h-4 w-4" />
                        Manage lessons
                      </summary>

                      {course.lessons.length === 0 ? (
                        <p className="mt-4 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
                          No lessons yet. Add one from the lesson form below.
                        </p>
                      ) : (
                        <div className="mt-4 grid gap-4">
                          {course.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] p-4 dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <h4 className="font-serif text-xl font-semibold">
                                    {lesson.title}
                                  </h4>
                                  <p className="mt-1 text-xs text-[#8B7C70] dark:text-[#BBA98D]">
                                    Order {lesson.sortOrder} - {lesson.duration}
                                  </p>
                                </div>
                                {lesson.videoUrl ? (
                                  <span className="rounded-full bg-[#315C45]/10 px-3 py-1 text-xs font-semibold text-[#315C45] dark:bg-[#D4A72C]/12 dark:text-[#D4A72C]">
                                    Video added
                                  </span>
                                ) : null}
                              </div>

                              <form action={updateLesson} className="mt-4 grid gap-4">
                                <input type="hidden" name="id" value={lesson.id} />
                                <input type="hidden" name="courseId" value={course.id} />
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                                    Title
                                    <input name="title" required defaultValue={lesson.title} className="h-11 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C] dark:text-[#F8EBCF]" />
                                  </label>
                                  <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                                    Duration
                                    <input name="duration" required defaultValue={lesson.duration} className="h-11 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C] dark:text-[#F8EBCF]" />
                                  </label>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                                    Sort order
                                    <input name="sortOrder" type="number" min="0" required defaultValue={lesson.sortOrder} className="h-11 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C] dark:text-[#F8EBCF]" />
                                  </label>
                                  <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                                    Video URL
                                    <input name="videoUrl" defaultValue={lesson.videoUrl ?? ""} className="h-11 rounded-2xl border border-[#E1D4C8] bg-white px-4 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C] dark:text-[#F8EBCF]" />
                                  </label>
                                </div>
                                <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B7C70] dark:text-[#BBA98D]">
                                  Summary
                                  <textarea name="summary" required defaultValue={lesson.summary} rows={3} className="resize-none rounded-2xl border border-[#E1D4C8] bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#2A211B] outline-none dark:border-[#D4A72C]/16 dark:bg-[#21130C] dark:text-[#F8EBCF]" />
                                </label>
                                <button className="inline-flex h-10 items-center justify-center rounded-full bg-[#D4A72C] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#160C07]">
                                  Save Lesson
                                </button>
                              </form>

                              <form action={deleteLesson} className="mt-3">
                                <input type="hidden" name="id" value={lesson.id} />
                                <button className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-50 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-950/20 dark:text-red-200">
                                  <Trash2 className="h-4 w-4" />
                                  Delete Lesson
                                </button>
                              </form>
                            </div>
                          ))}
                        </div>
                      )}
                    </details>
                  </article>
                ))
              )}
            </div>
          </section>
        </section>

        <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
          <h2 className="font-serif text-3xl font-semibold">
            Add Lesson / Module
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
            Attach lessons to a database course. Video URLs can be YouTube,
            Vimeo or an uploaded file path once media upload is added.
          </p>

          <form action={createLesson} className="mt-7 grid gap-5 lg:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold lg:col-span-2">
              Course
              <select
                name="courseId"
                required
                className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              >
                <option value="">Choose course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Lesson title
              <input
                name="title"
                required
                className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Duration
              <input
                name="duration"
                required
                placeholder="15:20"
                className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Sort order
              <input
                name="sortOrder"
                type="number"
                min="0"
                defaultValue="0"
                className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Video URL
              <input
                name="videoUrl"
                placeholder="https://..."
                className="h-12 rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm font-normal outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold lg:col-span-2">
              Summary
              <textarea
                name="summary"
                required
                rows={4}
                className="resize-none rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 py-3 text-sm font-normal leading-6 outline-none focus:border-[#E9962F] dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
              />
            </label>
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-[#D4A72C] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-[#160C07] shadow-[0_12px_32px_rgba(212,167,44,0.22)]">
              Save Lesson
            </button>
          </form>
        </section>

        <AdminMediaUpload />
      </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Newspaper, Search } from "lucide-react";
import { blogPosts } from "@/lib/blogs";
import { getPublicCourses } from "@/lib/course-service";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const queryValue = (await searchParams).q;
  const query = Array.isArray(queryValue)
    ? queryValue[0] ?? ""
    : queryValue ?? "";
  const normalizedQuery = query.trim().toLowerCase();
  const courses = await getPublicCourses();

  const courseResults = normalizedQuery
    ? courses.filter((course) =>
        [course.title, course.description, course.level, course.type]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : courses.slice(0, 3);

  const blogResults = normalizedQuery
    ? blogPosts.filter((post) =>
        [post.title, post.excerpt, post.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : blogPosts.slice(0, 3);

  const hasResults = courseResults.length > 0 || blogResults.length > 0;

  return (
    <main className="bg-[#F7F1EA] text-[#2A211B] dark:bg-[#160C07] dark:text-[#F8EBCF]">
      <section className="px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
            Search Chandogya
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.98] sm:text-6xl">
            Find courses, guides and learning notes.
          </h1>

          <form className="mt-10 flex flex-col gap-3 rounded-[22px] border border-[#E1D4C8] bg-white p-3 shadow-[0_18px_52px_rgba(64,45,30,0.08)] sm:flex-row dark:border-[#D4A72C]/16 dark:bg-[#21130C]">
            <label className="sr-only" htmlFor="site-search">
              Search
            </label>
            <div className="flex min-h-12 flex-1 items-center gap-3 rounded-full bg-[#F7F1EA] px-5 dark:bg-[#160C07]">
              <Search className="h-5 w-5 text-[#C18A4A]" />
              <input
                id="site-search"
                name="q"
                defaultValue={query}
                placeholder="Search communication, Gurukul, AI..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#9B8A7E] dark:placeholder:text-[#BBA98D]"
              />
            </div>
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-[#D4A72C] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-[#160C07]">
              Search
            </button>
          </form>

          {!hasResults ? (
            <div className="mt-10 rounded-[22px] border border-[#E1D4C8] bg-white p-8 text-[#75695F] dark:border-[#D4A72C]/16 dark:bg-[#21130C] dark:text-[#CDBB9E]">
              No results found. Try searching for courses, learning model or
              communication.
            </div>
          ) : (
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-[#C18A4A]" />
                  <h2 className="font-serif text-3xl font-semibold">
                    Courses
                  </h2>
                </div>
                <div className="grid gap-5">
                  {courseResults.map((course) => (
                    <Link
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      className="group grid gap-4 rounded-[20px] border border-[#E1D4C8] bg-white p-4 shadow-[0_16px_42px_rgba(64,45,30,0.07)] transition hover:-translate-y-1 sm:grid-cols-[150px_1fr] dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#E8DDD2]">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 150px"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C18A4A]">
                          {course.price}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold">
                          {course.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
                          {course.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <Newspaper className="h-5 w-5 text-[#C18A4A]" />
                  <h2 className="font-serif text-3xl font-semibold">
                    Journal
                  </h2>
                </div>
                <div className="grid gap-5">
                  {blogResults.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/resources/blogs/${post.slug}`}
                      className="group rounded-[20px] border border-[#E1D4C8] bg-white p-6 shadow-[0_16px_42px_rgba(64,45,30,0.07)] transition hover:-translate-y-1 dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C18A4A]">
                        {post.category}
                      </p>
                      <h3 className="mt-3 font-serif text-2xl font-semibold">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#75695F] dark:text-[#CDBB9E]">
                        {post.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7A3E20] dark:text-[#D4A72C]">
                        Read more
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

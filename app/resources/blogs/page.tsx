import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blogs";
import NewsletterForm from "@/component/newsletter-form";

const categories = ["Parent Guide", "Learning Model", "Communication", "Practice"];

export default function BlogsPage() {
  const [featuredPost, ...posts] = blogPosts;

  return (
    <main className="bg-[#F7F1EA] text-[#2A211B] dark:bg-[#160C07] dark:text-[#F8EBCF]">
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
            Chandogya Journal
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.98] text-[#2A211B] sm:text-6xl lg:text-7xl dark:text-[#F8EBCF]">
            Guides For Thoughtful Modern Learning
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#75695F] dark:text-[#CDBB9E]">
            Explore learning models, mentor notes, parenting guides and skill
            ideas built for confident, character-led growth.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-[#D8C7B7] bg-white px-5 py-2 text-sm text-[#75695F] shadow-sm dark:border-[#D4A72C]/16 dark:bg-[#21130C] dark:text-[#CDBB9E]"
              >
                {category}
              </span>
            ))}
          </div>

          <Link
            href={`/resources/blogs/${featuredPost.slug}`}
            className="group mt-12 grid overflow-hidden rounded-[22px] border border-[#E1D4C8] bg-white shadow-[0_18px_52px_rgba(64,45,30,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(64,45,30,0.12)] lg:grid-cols-[1.1fr_0.9fr] dark:border-[#D4A72C]/16 dark:bg-[#21130C]"
          >
            <div className="relative min-h-[360px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <p className="font-serif text-sm font-semibold uppercase tracking-[0.24em] text-[#C18A4A] dark:text-[#D4A72C]">
                Featured Article
              </p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#2A211B] sm:text-5xl dark:text-[#F8EBCF]">
                {featuredPost.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-[#75695F] dark:text-[#CDBB9E]">
                {featuredPost.excerpt}
              </p>
              <p className="mt-8 text-sm text-[#8B7C70] dark:text-[#BBA98D]">
                {featuredPost.date} / {featuredPost.category} /{" "}
                {featuredPost.readTime}
              </p>
            </div>
          </Link>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/blogs/${post.slug}`}
                className="group block"
              >
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#E8DDD2]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9B8A7E] dark:text-[#BBA98D]">
                    {post.date} / {post.category}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#2A211B] dark:text-[#F8EBCF]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#75695F] dark:text-[#CDBB9E]">
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17120F] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#D4A72C]">
              Stay Inspired
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl font-semibold leading-[1.02]">
              Join Our Circle Of Thoughtful Learners
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-7 text-white/72">
              Receive curated learning notes, parenting ideas and skill-building
              resources directly in your inbox.
            </p>
            <NewsletterForm source="blogs" variant="dark" />
          </div>
        </div>
      </section>
    </main>
  );
}

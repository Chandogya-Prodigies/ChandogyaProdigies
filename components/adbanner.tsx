"use client";

import Link from "next/link";

export default function AdBannerFull() {
  return (
    <section className="w-full bg-[#F5F1E8] border-b border-[#A9883A]/30">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        <div className="grid md:grid-cols-2 items-center gap-8">
          {/* Left Content */}
          <div>
            <span className="inline-block bg-[#F29E38] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              NEW BATCH
            </span>

            <h2 className="text-2xl md:text-3xl font-serif text-[#083D40] mb-3">
              Admissions Open for July Gurukul Program
            </h2>

            <p className="text-[#083D40]/80 mb-5">
              Experience a blend of online mentorship and offline gurukul-style
              labs. Limited seats available.
            </p>

            <Link
              href="/modules"
              className="inline-block bg-[#083D40] text-white px-6 py-3 rounded-full hover:bg-[#F29E38] transition"
            >
              Explore Programs →
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <div className="w-64 h-40 md:w-72 md:h-48 rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/ad1.jpg"
                alt="Gurukul Learning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

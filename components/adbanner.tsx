"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const announcements = [
  {
    badge: "NEW BATCH",
    title: "Admissions Open for July Gurukul Program",
    description:
      "Experience a blend of online mentorship and offline gurukul-style labs. Limited seats available.",
    buttonText: "Explore Programs",
    link: "/modules",
    image: "/courseimg1.webp",
  },
  {
    badge: "FREE DEMO",
    title: "Free Demo Class This Weekend",
    description:
      "Discover how our Gurukul-based model builds skills and character together.",
    buttonText: "Book Demo",
    link: "/learning-model",
    image: "/courseimg2.webp",
  },
];

export default function AdBannerFull() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = announcements[index];

  return (
    <section className="w-full bg-[#f0e2c0] border-b border-[#A9883A]/30  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid md:grid-cols-2 items-center gap-8"
          >
            {/* Left Content */}
            <div>
              <span className="inline-block bg-[#F29E38] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {current.badge}
              </span>

              <h2 className="text-2xl md:text-3xl font-serif text-[#083D40] mb-3">
                {current.title}
              </h2>

              <p className="text-[#083D40]/80 mb-5">{current.description}</p>

              <Link
                href={current.link}
                className="inline-block bg-[#083D40] text-white px-6 py-3 rounded-full hover:bg-[#F29E38] transition"
              >
                {current.buttonText} →
              </Link>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end">
              <div className="w-64 h-40 md:w-72 md:h-48 rounded-xl overflow-hidden shadow-md">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

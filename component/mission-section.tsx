"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const slides = [
  {
    eyebrow: "OUR SANKALP",
    title: "Mission",
    circle: "Mission",
    text: "To nurture confident, thoughtful learners through mentorship, practice and value-rooted guidance, helping every child think with clarity, speak with confidence and grow with discipline.",
  },
  {
    eyebrow: "OUR DRISHTI",
    title: "Vision",
    circle: "Vision",
    text: "To build a modern, skill-based education ecosystem rooted in the Ancient Indian Knowledge System, reimagined for today's world. We are reviving its wisdom with modern execution.",
  },
];

export default function MissionSection() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F3AB26] py-16 text-black transition-colors duration-500 dark:bg-[#160C07] dark:text-[#F8EBCF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(255,253,247,0.24),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(245,94,60,0.22),transparent_28%),linear-gradient(135deg,#F8D14F_0%,#F3AB26_48%,#E9962F_100%)] dark:bg-[radial-gradient(circle_at_16%_14%,rgba(212,167,44,0.12),transparent_30%),linear-gradient(135deg,#160C07_0%,#21130C_55%,#132118_100%)]" />
      <div className="absolute -left-16 -top-20 h-72 w-72 rounded-full bg-[#F27B42]/30 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-80 rounded-full bg-[#F55E3C]/24 blur-3xl" />

      <Image
        src="/images/leaves.png"
        alt=""
        width={180}
        height={150}
        className="pointer-events-none absolute right-8 top-8 w-28 opacity-70 sm:w-36"
      />
      <Image
        src="/images/flowers.png"
        alt=""
        width={240}
        height={240}
        className="pointer-events-none absolute bottom-0 left-0 w-36 opacity-60 sm:w-48"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[470px]">
          <p className="absolute left-1/2 top-0 z-20 -translate-x-1/2 whitespace-nowrap font-serif text-2xl font-semibold tracking-wide text-[#2E2118] sm:text-3xl dark:text-[#D4A72C]">
            {"\u091c\u094d\u091e\u093e\u0928 \u2022 \u0938\u0902\u0938\u094d\u0915\u093e\u0930 \u2022 \u0915\u094c\u0936\u0932"}
          </p>

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative mt-8 flex h-[320px] w-[320px] items-center justify-center sm:h-[400px] sm:w-[400px] lg:h-[470px] lg:w-[470px]"
          >
            <Image
              src="/images/lotus.png"
              alt=""
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full object-contain opacity-90 drop-shadow-[0_20px_36px_rgba(80,45,9,0.2)]"
              preload
            />

            <motion.div
              animate={{ opacity: [0.25, 0.9, 0.25], scale: [0.86, 1.08, 0.86] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-8 top-12 text-[#FFF9EE] drop-shadow-sm dark:text-[#D4A72C]"
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>

            <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full bg-[#E8D86B] text-center shadow-[0_18px_36px_rgba(80,45,9,0.16)] sm:h-44 sm:w-44">
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.circle}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="font-serif text-3xl font-semibold leading-tight text-black sm:text-4xl"
                >
                  {slide.circle}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="relative text-center lg:text-left">
          <motion.div
            animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.82, 1.08, 0.82] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute right-10 top-2 hidden text-[#FFF9EE] drop-shadow-sm md:block"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="font-serif text-sm font-semibold tracking-[0.22em] text-[#7A3A16] sm:text-base dark:text-[#D4A72C]">
                {slide.eyebrow}
              </p>

              <h2 className="mt-3 font-serif text-6xl font-semibold leading-none text-[#2E2118] sm:text-7xl lg:text-8xl dark:text-[#F8EBCF]">
                {slide.title}
              </h2>

              <p className="mx-auto mt-8 max-w-3xl font-serif text-2xl leading-[1.45] text-[#2E2118] sm:text-[1.7rem] lg:mx-0 dark:text-[#F8EBCF]">
                {slide.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-3 lg:justify-start">
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === index ? "w-9 bg-[#315C45]" : "w-2 bg-black/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

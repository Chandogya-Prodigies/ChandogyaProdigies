"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    type: "video",
    src: "/welcome.mp4",
    heading1: "Rooted in Tradition.",

    description:
      "A structured Gurukul learning ecosystem blending character and skill mastery.",
  },
  {
    type: "image",
    src: "/image3.png",
    heading1: "Skill. Character.",
    heading2: "Clarity.",
    description: "Mentorship-driven learning for holistic child development.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {slide.type === "video" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={slide.src}
              alt="Hero"
              fill
              priority
              className="object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-end pb-24">
        <div className="max-w-7xl mx-auto px-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-white max-w-3xl"
            >
              <h1 className="text-6xl md:text-8xl font-serif leading-tight tracking-tight">
                {slide.heading1}
              </h1>

              <h1 className="text-6xl md:text-8xl font-serif leading-tight tracking-tight mb-6">
                {slide.heading2}
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8">
                {slide.description}
              </p>

              <div className="flex gap-6">
                <Link
                  href="/modules"
                  className="bg-white text-black px-8 py-4 rounded-full font-medium"
                >
                  Explore Programs
                </Link>

                <Link
                  href="/learning-model"
                  className="border border-white px-8 py-4 rounded-full"
                >
                  Book Free Demo
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <motion.div
          key={index}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-[#F29E38]"
        />
      </div>
    </section>
  );
}

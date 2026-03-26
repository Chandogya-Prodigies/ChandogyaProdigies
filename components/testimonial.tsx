"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Aarav Sharma",
    text: "This platform changed how I think and learn. It's not just courses, it's a journey.",
    image: "/girlimage.jpg",
  },
  {
    id: 2,
    name: "Meera Joshi",
    text: "I gained confidence in communication and real-world skills.",
    image: "/girlimage.jpg",
  },
  {
    id: 3,
    name: "Rohan Verma",
    text: "The Gurukul approach feels personal and deeply meaningful.",
    image: "/girlimage.jpg",
  },
];

export default function Testimonial() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-[#F5F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-center">
        {/* LEFT SIDEBAR */}

        <div>
          <p className="text-sm tracking-widest text-[#083D40]/60 mb-4">
            D-VENTURES
          </p>

          <h2 className="text-4xl font-serif text-[#083D40] mb-6">
            Stories from our learners
          </h2>

          <p className="text-[#083D40]/70 mb-6">
            Real journeys of growth, learning and transformation.
          </p>

          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="p-3 bg-white rounded-full shadow hover:scale-105 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow hover:scale-105 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* SLIDER */}

        <div className="md:col-span-2 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {stories.map((story) => (
              <div key={story.id} className="min-w-full flex justify-center">
                {/* CARD */}

                <div className="relative w-[320px]">
                  {/* IMAGE */}

                  <img
                    src={story.image}
                    alt={story.name}
                    className="rounded-xl object-cover w-full h-[420px]"
                  />

                  {/* QUOTE BOX */}

                  <div className="absolute -bottom-10 left-6 bg-white p-6 rounded-xl shadow-xl w-[85%]">
                    <p className="text-sm text-gray-700">"{story.text}"</p>

                    <p className="mt-3 text-sm font-semibold text-[#083D40]">
                      — {story.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

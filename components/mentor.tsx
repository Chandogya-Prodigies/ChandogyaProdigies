"use client";

import { useState } from "react";
import MentorCard from "@/components/mentorcard";

const tabs = ["Our Mentors", "Advisors", "Support Team"];

const mentorData = {
  "Our Mentors": [
    {
      name: "Savannah Nguyen",
      role: "Vedic Mathematics Mentor",
      location: "Hyderabad, India",
      image: "/image3.png",
    },
    {
      name: "Leslie Alexander",
      role: "Character Development Coach",
      location: "Bangalore, India",
      image: "/courseimg2.webp",
    },
  ],
  Advisors: [
    {
      name: "Ralph Edwards",
      role: "Academic Advisor",
      location: "Delhi, India",
      image: "/courseimg2.webp",
    },
    {
      name: "Ralph Edwards",
      role: "Academic Advisor",
      location: "Delhi, India",
      image: "/courseimg2.webp",
    },
  ],
  "Support Team": [
    {
      name: "Kathryn Murphy",
      role: "Parent Support Lead",
      location: "Mumbai, India",
      image: "/courseimg2.webp",
    },
    {
      name: "Kathryn Murphy",
      role: "Parent Support Lead",
      location: "Mumbai, India",
      image: "/courseimg2.webp",
    },
  ],
};

export default function MentorSection() {
  const [activeTab, setActiveTab] = useState("Our Mentors");

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#e2db7b] to-[#E9E2D5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/60 backdrop-blur-md rounded-full p-2 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-white text-[#083D40] shadow"
                    : "text-[#083D40]/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Cards */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {mentorData[activeTab as keyof typeof mentorData].map(
              (mentor, index) => (
                <MentorCard key={index} mentor={mentor} />
              ),
            )}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif text-[#083D40] tracking-tight mb-4">
              Enhancing the Entire Learning Experience
            </h2>

            <p className="text-[#083D40]/70 mb-6">
              Our mentors blend traditional Gurukul values with modern teaching
              methods, ensuring holistic development in skill, character, and
              discipline.
            </p>

            <button className="text-[#F29E38] font-medium">Read More →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";

interface MentorCardProps {
  mentor: {
    name: string;
    role: string;
    location: string;
    image: string;
  };
}

export default function MentorCard({ mentor }: MentorCardProps) {
  return (
    <div className="relative bg-white rounded-3xl shadow-sm p-6 hover:-translate-y-2 transition-transform duration-300">
      {/* Image */}
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
        <Image
          src={mentor.image}
          alt={mentor.name}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text */}
      <h4 className="text-lg font-semibold text-[#083D40]">{mentor.name}</h4>

      <p className="text-sm text-[#083D40]/70">{mentor.role}</p>

      <p className="text-xs text-[#083D40]/50 mt-1">{mentor.location}</p>

      {/* Arrow Button */}
      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#F29E38] flex items-center justify-center text-white">
        →
      </div>
    </div>
  );
}

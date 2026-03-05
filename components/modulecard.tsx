"use client";

import Image from "next/image";

interface ModuleCardProps {
  module: {
    title: string;
    description: string;
    duration: string;
    level: string;
    thumbnail: string;
  };
}

export default function ModuleCard({ module }: ModuleCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:-translate-y-2 transition-transform duration-300">
      {/* Thumbnail */}
      <div className="relative h-48 w-full">
        <Image
          src={module.thumbnail}
          alt={module.title}
          fill
          className="object-cover"
        />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-lg">
            ▶
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex gap-2 mb-3 text-xs">
          <span className="bg-[#F5F1E8] px-2 py-1 rounded">
            {module.duration}
          </span>

          <span className="bg-[#F29E38]/20 text-[#083D40] px-2 py-1 rounded">
            {module.level}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-[#083D40] mb-2">
          {module.title}
        </h3>

        <p className="text-sm text-[#083D40]/70">{module.description}</p>
      </div>
    </div>
  );
}

"use client";

import { LucideIcon } from "lucide-react";

interface DomainCardProps {
  domain: {
    title: string;
    description: string;
    color: string;
    textColor: string;
  };
  Icon: LucideIcon;
}

export default function DomainCard({ domain, Icon }: DomainCardProps) {
  return (
    <div
      className={`relative group rounded-3xl p-8 overflow-hidden ${domain.color} ${domain.textColor} transition-all duration-300 hover:-translate-y-2`}
    >
      {/* Cut Corner */}

      <div className="absolute top-0 right-0 w-20 h-20 bg-[#F5F1E8] rounded-bl-3xl flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F5C60"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-slack-icon lucide-slack"
        >
          <rect width="3" height="8" x="13" y="2" rx="1.5" />
          <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" />
          <rect width="3" height="8" x="8" y="14" rx="1.5" />
          <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" />
          <rect width="8" height="3" x="14" y="13" rx="1.5" />
          <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" />
          <rect width="8" height="3" x="2" y="8" rx="1.5" />
          <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" />
        </svg>
      </div>

      {/* Icon Circle */}

      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-black" />
      </div>

      {/* Content */}

      <h3 className="text-xl font-semibold mb-4">{domain.title}</h3>

      <p className="text-sm opacity-80 leading-relaxed">{domain.description}</p>
    </div>
  );
}

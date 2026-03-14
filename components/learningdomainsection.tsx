"use client";

import domains from "@/data/domain.json";
import DomainCard from "@/components/domaincard";
import { Brain, MessageCircle, Cpu, Lightbulb, Link } from "lucide-react";
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  thinking: Brain,
  communication: MessageCircle,
  technology: Cpu,
  life: Lightbulb,
};

export default function LearningDomainsSection() {
  return (
    <section className="py-24 bg-[#bfd2da]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="uppercase tracking-widest text-sm text-[#083D40]/60 mb-4">
          SERVICES
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-[#083D40] mb-16 tracking-tight">
          Our Learning Domains
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {domains.map((domain) => {
            const Icon = iconMap[domain.icon];

            return <DomainCard key={domain.id} domain={domain} Icon={Icon} />;
          })}
        </div>

        <div className="mt-16">
          {" "}
          <Link href="/modules">
            <button className="text-[#0F5C60] font-medium hover:underline">
              View All Programs →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

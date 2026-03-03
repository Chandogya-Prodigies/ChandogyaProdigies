"use client";

import domains from "@/data/domain.json";
import DomainCard from "@/components/domaincard";

export default function LearningDomainsSection() {
  return (
    <section className="py-24 bg-[#bfd2da]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <p className="uppercase tracking-widest text-sm text-[#083D40]/60 mb-4">
          SERVICES
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-[#083D40] mb-16 tracking-tight">
          Our Learning Domains
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {domains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <button className="text-[#F29E38] font-medium hover:underline">
            View All Programs →
          </button>
        </div>
      </div>
    </section>
  );
}

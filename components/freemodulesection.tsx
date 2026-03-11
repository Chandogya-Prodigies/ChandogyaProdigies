"use client";

import modules from "@/data/freemodules.json";
import ModuleCard from "@/components/modulecard";

export default function FreeModulesSection() {
  return (
    <section className="py-24 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <p className="uppercase tracking-widest text-sm text-[#F29E38] mb-4">
          FREE LEARNING
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif text-[#083D40] mb-6">
          Explore Free Learning Modules
        </h2>

        <p className="text-[#083D40]/70 max-w-2xl mx-auto mb-16">
          Try our sample lessons and experience the Gurukul learning approach
          before enrolling in full programs.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <button className="bg-[#083D40] text-white px-8 py-4 rounded-full hover:bg-[#F29E38] transition">
            View All Free Modules
          </button>
        </div>
      </div>
    </section>
  );
}

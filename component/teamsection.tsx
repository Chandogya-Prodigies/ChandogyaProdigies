"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { guides } from "@/lib/guides";

const guideTabs = [
  { label: "Our best team", value: "team" },
  { label: "Our Educators", value: "educators" },
  { label: "Our Partnerships", value: "partnerships" },
] as const;

type GuideTab = (typeof guideTabs)[number]["value"];

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState<GuideTab>("team");
  const visibleGuides = guides.filter((guide) => guide.category === activeTab);
  const activeTabLabel =
    guideTabs.find((tab) => tab.value === activeTab)?.label ?? "Our guides";

  return (
    <section
      id="guides"
      className="relative overflow-hidden bg-[#F6BE45] py-16 text-black dark:bg-[#160C07] dark:text-[#F8EBCF]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,248,224,0.45),transparent_28%),radial-gradient(circle_at_86%_78%,rgba(196,74,32,0.18),transparent_30%),linear-gradient(135deg,#F8D86B_0%,#F6BE45_48%,#EBA13D_100%)] dark:bg-[radial-gradient(circle_at_20%_10%,rgba(212,167,44,0.16),transparent_30%),linear-gradient(135deg,#160C07_0%,#21130C_58%,#132118_100%)]" />
      <Image
        src="/images/leaves.png"
        alt=""
        width={220}
        height={180}
        className="pointer-events-none absolute left-6 top-6 w-28 opacity-55 sm:w-36 lg:w-44"
      />

      <Image
        src="/images/pretflower.png"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute bottom-0 right-0 w-28 opacity-55 lg:w-40"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <p className="text-center font-serif text-sm font-semibold tracking-[0.24em] text-[#7A3A16] dark:text-[#D4A72C]">
          OUR GUIDES
        </p>
        <h2 className="mx-auto mt-3 max-w-4xl text-center font-serif text-4xl font-semibold leading-tight text-[#2E2118] sm:text-5xl lg:text-6xl dark:text-[#F8EBCF]">
          The People Behind Chandogya
        </h2>

        <div className="mt-10 rounded-[28px] border border-white/45 bg-[#F8DF98]/82 px-5 py-7 shadow-[0_20px_45px_rgba(84,47,12,0.12)] backdrop-blur-sm sm:px-7 lg:px-8 dark:border-[#D4A72C]/20 dark:bg-[#24150D]/82">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 rounded-full border border-black/10 bg-white/40 p-2 shadow-inner sm:mx-auto sm:w-fit dark:border-[#D4A72C]/20 dark:bg-white/5">
            {guideTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                aria-pressed={activeTab === tab.value}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-7 ${
                  activeTab === tab.value
                    ? "bg-[#315C45] text-[#FFF8E6] shadow-[0_10px_22px_rgba(49,92,69,0.22)] hover:bg-[#274A38]"
                    : "text-black/70 hover:bg-white/45 hover:text-black dark:text-[#F8EBCF]/75 dark:hover:bg-white/10 dark:hover:text-[#F8EBCF]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[2.7fr_1fr]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleGuides.map((member) => (
                <Link
                  key={member.slug}
                  href={`/about/guides/${member.slug}`}
                  className="group mx-auto block w-full max-w-[270px] rounded-[20px] border border-[#DFAE45]/45 bg-[#FFF8E6] p-5 shadow-[0_12px_26px_rgba(84,47,12,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#315C45]/35 hover:shadow-[0_18px_34px_rgba(84,47,12,0.18)] dark:border-[#D4A72C]/20 dark:bg-[#1E120C]"
                >
                  <h3 className="mb-4 text-center font-serif text-xl font-semibold text-[#2E2118] dark:text-[#F8EBCF]">
                    {member.name}
                  </h3>

                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-[#E8D86B] p-2 shadow-inner">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-base font-semibold text-black/78 dark:text-[#F8EBCF]/82">
                      {member.role}
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#315C45] group-hover:text-white dark:border-[#D4A72C]/20 dark:bg-white/10"
                    >
                      <ArrowUpRight size={17} strokeWidth={2.4} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center lg:pl-6">
              <div>
                <h3 className="mb-4 font-serif text-3xl font-semibold leading-tight text-[#2E2118] lg:text-4xl dark:text-[#F8EBCF]">
                  {activeTabLabel}
                </h3>

                <p className="mb-6 text-base leading-8 text-black/72 dark:text-[#F8EBCF]/72">
                  Explore the people and partners who support Chandogya through
                  mentorship, skill practice, guided programs and learning
                  environments.
                </p>

                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 text-base font-semibold text-[#315C45] dark:text-[#D4A72C]"
                >
                  Meet the team
                  <ArrowUpRight size={17} strokeWidth={2.4} />
                  <span className="absolute mt-7 block h-[2px] w-0 bg-[#315C45] transition-all duration-300 group-hover:w-24 dark:bg-[#D4A72C]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

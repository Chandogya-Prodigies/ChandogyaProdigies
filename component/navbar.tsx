"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  Laptop,
  LayoutGrid,
  Menu,
  Moon,
  Newspaper,
  PlayCircle,
  Search,
  Sparkles,
  Sun,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

type MenuKey = "courses" | "learning" | "resources";

type MenuLink = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type MegaMenu = {
  eyebrow: string;
  title: string;
  description: string;
  links: MenuLink[];
  featured: {
    label: string;
    title: string;
    description: string;
    href: string;
    image: string;
  };
};

const megaMenus: Record<MenuKey, MegaMenu> = {
  courses: {
    eyebrow: "Explore learning paths",
    title: "Courses",
    description:
      "Skill-first programmes designed to build confidence, clarity and future readiness.",
    links: [
      {
        label: "All Courses",
        description: "Browse every available learning path",
        href: "/courses",
        icon: LayoutGrid,
      },
      {
        label: "Demo Classes",
        description: "Experience a lesson before enrolling",
        href: "/demo-videos",
        icon: PlayCircle,
      },
      {
        label: "Free Courses",
        description: "Start learning with open programmes",
        href: "/courses?type=free",
        icon: BookOpen,
      },
      {
        label: "Premium Courses",
        description: "Structured, mentor-guided programmes",
        href: "/courses?type=paid",
        icon: GraduationCap,
      },
    ],
    featured: {
      label: "Featured course",
      title: "Critical Thinking",
      description:
        "Help children question, reason and make thoughtful choices.",
      href: "/courses/creative-critical-thinking",
      image: "/images/crirical.jpg",
    },
  },
  learning: {
    eyebrow: "Flexible by design",
    title: "Learning Model",
    description:
      "Choose the environment that fits each learner while keeping mentorship at the centre.",
    links: [
      {
        label: "Online Learning",
        description: "Live guidance from anywhere",
        href: "/learning-model/online",
        icon: Laptop,
      },
      {
        label: "Offline Gurukul",
        description: "Activity-led learning in person",
        href: "/learning-model/offline",
        icon: Users,
      },
      {
        label: "Hybrid Model",
        description: "Online flexibility with offline practice",
        href: "/learning-model/hybrid",
        icon: Sparkles,
      },
     
    ],
    featured: {
      label: "Our approach",
      title: "Best of Both Worlds",
      description:
        "A balanced journey combining flexibility, practice and mentorship.",
      href: "/learning-model/hybrid",
      image: "/images/financial-Planning.jpg",
    },
  },
  resources: {
    eyebrow: "Learn beyond lessons",
    title: "Resources",
    description:
      "Practical ideas and trusted information for learners, parents and partner schools.",
    links: [
      {
        label: "Blogs & Insights",
        description: "Ideas for thoughtful modern learning",
        href: "/resources/blogs",
        icon: Newspaper,
      },
      {
        label: "FAQs",
        description: "Answers about courses and enrolment",
        href: "/resources/faqs",
        icon: CircleHelp,
      },
      {
        label: "Testimonials",
        description: "Stories shared by families",
        href: "/resources/testimonials",
        icon: Users,
      },
      {
        label: "School Partnerships",
        description: "Bring programmes to your institution",
        href: "/resources/schools",
        icon: BriefcaseBusiness,
      },
    ],
    featured: {
      label: "For schools",
      title: "Partner With Us",
      description: "Build a future-ready skill programme for your students.",
      href: "/resources/schools",
      image: "/images/ai.jpg",
    },
  },
};

const desktopLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const menuTriggers: Array<{ key: MenuKey; label: string }> = [
  { key: "courses", label: "Courses" },
  { key: "learning", label: "Learning Model" },
  { key: "resources", label: "Resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session } = useSession();
  const headerRef = useRef<HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<MenuKey | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const closeNavigation = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setActiveMenu(null)}
      style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}
      className="sticky top-0 z-50 w-full border-b border-[#A75C18]/20 bg-[#E9962F]/95 shadow-[0_6px_24px_rgba(69,35,11,0.08)] backdrop-blur-xl transition-colors duration-300 dark:border-[#D4A72C]/15 dark:bg-[#160C07]/95"
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[minmax(190px,1fr)_auto_minmax(190px,1fr)] xl:gap-5">
        <Link
          href="/"
          onClick={closeNavigation}
          className="flex shrink-0 items-center gap-3 xl:justify-self-start"
          aria-label="Chandogya Prodigies home"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={100}
            height={100}
            priority
            className="h-22 w-22 object-contain"
          />
          <span className="hidden w-32 font-serif text-[18px] font-bold leading-[1.05] text-[#2a2323] sm:block dark:text-[#F8EBCF]">
            Chandogya Prodigies
          </span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-1 xl:flex xl:justify-self-center"
          aria-label="Primary navigation"
        >
          {desktopLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setActiveMenu(null)}
              className={`rounded-md px-3 py-2 text-md font-semibold transition ${
                isActiveLink(link.href)
                  ? "bg-white text-[#2E2118] dark:bg-white/10 dark:text-[#F8EBCF]"
                  : "text-[#3C291C] hover:bg-white hover:text-[#2E2118] dark:text-[#E9D5B7] dark:hover:bg-white/10 dark:hover:text-[#F8EBCF]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {menuTriggers.map((trigger) => (
            <button
              key={trigger.key}
              type="button"
              onMouseEnter={() => setActiveMenu(trigger.key)}
              onFocus={() => setActiveMenu(trigger.key)}
              onClick={() =>
                setActiveMenu((current) =>
                  current === trigger.key ? null : trigger.key,
                )
              }
              aria-expanded={activeMenu === trigger.key}
              aria-controls="primary-mega-menu"
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-md font-semibold transition ${
                activeMenu === trigger.key
                  ? "bg-white text-[#2E2118] dark:bg-white/10 dark:text-[#F8EBCF]"
                  : "text-[#3C291C] hover:bg-white hover:text-[#2E2118] dark:text-[#E9D5B7] dark:hover:bg-white/10 dark:hover:text-[#F8EBCF]"
              }`}
            >
              {trigger.label}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeMenu === trigger.key ? "rotate-180" : ""
                }`}
              />
            </button>
          ))}

     
          <Link
            href="/contact"
            onMouseEnter={() => setActiveMenu(null)}
            className="rounded-md px-3 py-2 text-md font-semibold text-[#3C291C] transition hover:bg-white hover:text-[#2E2118] dark:text-[#E9D5B7] dark:hover:bg-white/10 dark:hover:text-[#F8EBCF]"
          >
            Contact
          </Link>
        </nav>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-3 xl:ml-0 xl:justify-self-end">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-md text-[#3C291C] transition hover:bg-white/25 sm:flex dark:text-[#E9D5B7] dark:hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle colour theme"
            className="flex h-10 w-10 items-center justify-center rounded-md text-[#3C291C] transition hover:bg-white/25 dark:text-[#E9D5B7] dark:hover:bg-white/10"
          >
            <Sun className="hidden h-5 w-5 dark:block" />
            <Moon className="h-5 w-5 dark:hidden" />
          </button>

          {session?.user ? (
            <>
              <Link
                href={session.user.role === "admin" ? "/admin" : "/dashboard"}
                className="hidden h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#3C291C] transition hover:bg-white/25 lg:flex dark:text-[#E9D5B7] dark:hover:bg-white/10"
              >
                <User className="h-4 w-4" />
                {session.user.role === "admin" ? "Admin" : "Dashboard"}
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden h-10 items-center rounded-md px-3 text-sm font-semibold text-[#3C291C] transition hover:bg-white/25 lg:flex dark:text-[#E9D5B7] dark:hover:bg-white/10"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#3C291C] transition hover:bg-white/25 lg:flex dark:text-[#E9D5B7] dark:hover:bg-white/10"
            >
              <User className="h-4 w-4" />
              Sign in
            </Link>
          )}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((open) => !open);
              setActiveMenu(null);
            }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#2E2118] text-[#FFF9EE] xl:hidden dark:bg-[#D4A72C] dark:text-[#160C07]"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {activeMenu ? (
        <div
          id="primary-mega-menu"
          className="absolute left-1/2 top-full hidden w-[min(920px,calc(100vw-48px))] -translate-x-1/2 pt-2 xl:block"
        >
          <div className="grid min-h-[330px] grid-cols-[0.82fr_1.35fr_0.9fr] overflow-hidden rounded-lg border border-[#DFC69E] bg-[#FFF9EE] shadow-[0_24px_70px_rgba(52,30,14,0.22)] dark:border-[#5E432B] dark:bg-[#21130C]">
            <div className="border-r border-[#DFC69E] bg-[#F8E7CF] p-7 dark:border-[#5E432B] dark:bg-[#2A1910]">
              <p className="text-xs font-bold uppercase text-[#C96F1A] dark:text-[#D4A72C]">
                {megaMenus[activeMenu].eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-[#2E2118] dark:text-[#F8EBCF]">
                {megaMenus[activeMenu].title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#6B5646] dark:text-[#CDBB9E]">
                {megaMenus[activeMenu].description}
              </p>
              <Link
                href={
                  activeMenu === "courses"
                    ? "/courses"
                    : activeMenu === "learning"
                      ? "/learning-model"
                      : "/resources"
                }
                onClick={closeNavigation}
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#315C45] hover:text-[#274B38] dark:text-[#8FC2A3]"
              >
                View overview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid content-center gap-2 p-5">
              {megaMenus[activeMenu].links.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeNavigation}
                    className="group/link grid grid-cols-[40px_1fr_20px] items-center gap-3 rounded-md p-3 transition hover:bg-[#F8E7CF] dark:hover:bg-white/5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E9962F]/12 text-[#C96F1A] dark:bg-[#D4A72C]/10 dark:text-[#D4A72C]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#2E2118] dark:text-[#F8EBCF]">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-[#6B5646] dark:text-[#CDBB9E]">
                        {link.description}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 -translate-x-1 text-[#C96F1A] opacity-0 transition group-hover/link:translate-x-0 group-hover/link:opacity-100 dark:text-[#D4A72C]" />
                  </Link>
                );
              })}
            </div>

            <div className="m-4 overflow-hidden rounded-md bg-[#315C45] text-white">
              <div className="relative h-36">
                <Image
                  src={megaMenus[activeMenu].featured.image}
                  alt=""
                  fill
                  sizes="260px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#315C45] via-[#315C45]/20 to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase text-[#D8E8DA]">
                  {megaMenus[activeMenu].featured.label}
                </p>
                <h3 className="mt-2 font-serif text-xl font-bold">
                  {megaMenus[activeMenu].featured.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#D8E8DA]">
                  {megaMenus[activeMenu].featured.description}
                </p>
                <Link
                  href={megaMenus[activeMenu].featured.href}
                  onClick={closeNavigation}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold"
                >
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-[#A75C18]/20 bg-[#FFF9EE] px-4 py-4 shadow-xl xl:hidden dark:border-[#D4A72C]/15 dark:bg-[#21130C]">
          <nav
            className="mx-auto grid max-w-2xl gap-1"
            aria-label="Mobile navigation"
          >
            {desktopLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeNavigation}
                className="rounded-md px-4 py-3 text-sm font-bold text-[#2E2118] hover:bg-[#F8E7CF] dark:text-[#F8EBCF] dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}

            {menuTriggers.map((trigger) => (
              <div key={trigger.key}>
                <button
                  type="button"
                  onClick={() =>
                    setMobileMenu((current) =>
                      current === trigger.key ? null : trigger.key,
                    )
                  }
                  aria-expanded={mobileMenu === trigger.key}
                  className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm font-bold text-[#2E2118] hover:bg-[#F8E7CF] dark:text-[#F8EBCF] dark:hover:bg-white/5"
                >
                  {trigger.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileMenu === trigger.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileMenu === trigger.key ? (
                  <div className="mb-2 grid gap-1 border-l-2 border-[#E9962F] pl-3">
                    {megaMenus[trigger.key].links.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeNavigation}
                          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#6B5646] hover:bg-[#F8E7CF] hover:text-[#2E2118] dark:text-[#CDBB9E] dark:hover:bg-white/5 dark:hover:text-[#F8EBCF]"
                        >
                          <Icon className="h-4 w-4 text-[#C96F1A] dark:text-[#D4A72C]" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}

            {[
              { label: "Partnerships", href: "/resources/schools" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeNavigation}
                className="rounded-md px-4 py-3 text-sm font-bold text-[#2E2118] hover:bg-[white] dark:text-[#F8EBCF] dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#DFC69E] pt-4 dark:border-[#5E432B]">
              {session?.user ? (
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#DFC69E] text-sm font-bold text-[#2E2118] dark:border-[#5E432B] dark:text-[#F8EBCF]"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={closeNavigation}
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#DFC69E] text-sm font-bold text-[#2E2118] dark:border-[#5E432B] dark:text-[#F8EBCF]"
                >
                  <User className="h-4 w-4" />
                  Sign in
                </Link>
              )}
              <Link
                href={session?.user ? "/dashboard" : "/courses"}
                onClick={closeNavigation}
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#315C45] px-3 text-sm font-bold text-white"
              >
                {session?.user ? "Dashboard" : "Explore Courses"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer">LOGO</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/modules">Modules / Courses</Link>
          <Link href="/learning-module">The Learning Module</Link>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="flex items-center gap-1">
              Resources <ChevronDown size={16} />
            </button>

            {resourcesOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md p-4 w-56 space-y-2 text-sm">
                <ul>
                  <li>
                    <Link href="/blogs">Blogs</Link>
                  </li>
                  <li>
                    <Link href="/news">News</Link>
                  </li>
                  <li>
                    <Link href="/partnerships">School & Partnerships</Link>
                  </li>
                  <li>
                    <Link href="/faqs">FAQs</Link>
                  </li>
                  <li>
                    <Link href="/testimonials">Testimonials</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link href="/contact">Contact & Support</Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Search size={20} className="cursor-pointer" />
          <User size={20} className="cursor-pointer" />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-6 pb-6 space-y-4 text-sm font-medium transition-all duration-300">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/modules">Modules / Courses</Link>
          <Link href="/learning-module">The Learning Module</Link>

          <div>
            <p className="font-semibold">Resources</p>
            <div className="ml-4 mt-2 space-y-2">
              <Link href="/blogs">Blogs</Link>
              <Link href="/news">News</Link>
              <Link href="/faqs">FAQs</Link>
              <Link href="/partnerships">School & Partnerships</Link>
              <Link href="/testimonials">Testimonials</Link>
            </div>
          </div>

          <Link href="/contact">Contact & Support</Link>

          <div className="flex gap-4 pt-4 border-t">
            <Search size={20} />
            <User size={20} />
          </div>
        </div>
      )}
    </nav>
  );
}

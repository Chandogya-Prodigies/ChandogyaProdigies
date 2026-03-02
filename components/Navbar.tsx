"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Learning Model", href: "/the-learning-module" },
    { name: "Contact", href: "/contact" },
  ];
  const [showPrograms, setShowPrograms] = useState(false);
  const [showResources, setshowResources] = useState(false);
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F5F1E8]/90 backdrop-blur-md shadow-md py-3"
          : "bg-[#083D40] py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/page.tsx" className=" tracking-wide relative group">
          <Image
            src="/logobg.png"
            alt="Resources"
            width={80}
            height={10}
            className="rounded-lg object-cover"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-[#F5F1E8] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative group transition ${
                pathname === link.href ? "text-[#F29E38]" : ""
              }`}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#F29E38] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setShowPrograms(true)}
            onMouseLeave={() => setShowPrograms(false)}
          >
            <button className="hover:text-[#F29E38] transition">
              Programs
            </button>

            {showPrograms && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-225 bg-[#F5F1E8] shadow-xl rounded-xl p-8 border border-[#A9883A]/20">
                <div className="grid grid-cols-2 gap-8">
                  {/* Column 1 */}
                  <div>
                    <p className="text-sm font-semibold text-[#A9883A] mb-4">
                      By Type
                    </p>
                    <div className="space-y-3 text-[#1e1e1d]">
                      <ul>
                        <li>
                          <Link href="#">Paid Courses</Link>
                        </li>
                        <li>
                          {" "}
                          <Link href="#">Free Modules</Link>
                        </li>
                        <li>
                          {" "}
                          <Link href="#">Demo Classes</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="flex gap-4">
                    <div className="w-80 h-40 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/courseimg1.webp"
                        alt="Gurukul"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-80 h-40 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/courseimg2.webp"
                        alt="Learning"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-80 h-40 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/courseimg1.webp"
                        alt="Learning"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}

          <div
            className="relative"
            onMouseEnter={() => setshowResources(true)}
            onMouseLeave={() => setshowResources(false)}
          >
            <button className="hover:text-[#F29E38] transition">
              Resources
            </button>

            {showResources && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-225 bg-[#F5F1E8] shadow-xl rounded-xl p-8 border border-[#A9883A]/20">
                <div className="grid grid-cols-2 ">
                  {/* Column 1 */}
                  <div>
                    <p className="text-sm font-semibold text-[#A9883A] mb-4">
                      Resources
                    </p>
                    <div className="space-y-3 text-[#083D40]">
                      <ul>
                        <li>
                          <Link href="/Resources/blogs">Blogs</Link>
                        </li>
                        <li>
                          {" "}
                          <Link href="/Resources/faq">Faqs</Link>
                        </li>
                        <li>
                          {" "}
                          <Link href="/Resources/News">News</Link>
                        </li>
                        <li>
                          {" "}
                          <Link href="/Resources/school-and-partnerships">
                            Schools&Partnerships
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link href="/Resources/testimonials">
                            Testimonial
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="flex gap-4">
                    <div className="w-80 h-40 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/courseimg1.webp"
                        alt="Gurukul"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-80 h-40 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/courseimg2.webp"
                        alt="Learning"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-80 h-40 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/courseimg1.webp"
                        alt="Learning"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* CTA Area */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-[#F29E38] hover:text-[#A9883A] transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-[#F29E38] text-white px-5 py-2 rounded-full hover:bg-[#A9883A] transition shadow-md"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#F5F1E8]"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-full h-screen bg-[#F5F1E8] flex flex-col p-10 gap-6 text-[#083D40] text-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link href="/modules" onClick={() => setIsOpen(false)}>
              Programs
            </Link>

            <Link href="/resources" onClick={() => setIsOpen(false)}>
              Resources
            </Link>

            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-[#083D40] text-white px-6 py-3 rounded-full text-center"
            >
              Enroll Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Dropdown({
  title,
  items,
}: {
  title: string;
  items: { name: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 hover:text-[#F29E38] transition">
        {title} <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-8 left-0 bg-white shadow-lg rounded-xl p-4 w-52"
          >
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md hover:bg-[#F5F1E8] transition"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

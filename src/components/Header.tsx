/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "hackathons", label: "EXPERIENCE" },
    { id: "blog", label: "BLOG" },
    { id: "footer", label: "CONTACT" },
  ];

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-5 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-neutral-100"
          : "bg-transparent"
      }`}
      id="portfolio-header"
    >
      {/* Brand logo removed */}
      <div className="logo select-none w-8 h-8 md:block hidden"></div>

      {/* Navigation center bar */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-neutral-500">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative py-1 cursor-pointer hover:text-black transition-colors ${
                isActive ? "text-black" : ""
              }`}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Status pill button */}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-1.5 border-black rounded-full font-bold text-[10px] tracking-wider uppercase bg-white hover:bg-neutral-50 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Open to Opportunities
        </div>
      </div>
    </motion.header>
  );
}

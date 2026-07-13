/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { FadeIn } from "./MotionReveal";
import { Mail, Linkedin, Github, FileText, ArrowUp } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/your-profile", // Placeholder to replace
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/your-username", // Placeholder to replace
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: "Gmail",
      href: "mailto:youremail@gmail.com",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      name: "Resume",
      href: "#",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-black text-white py-20 px-6 md:px-12 relative overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col">
        {/* Top footer row with CTA and nav links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-neutral-850 pb-16 items-start">
          {/* CTA Col */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <FadeIn>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 select-none">
                Let's talk
              </h3>
              <p className="text-neutral-400 font-medium text-sm md:text-base max-w-sm leading-relaxed mb-4">
                Have a sports analytics concept, machine learning idea, or position you'd like to collaborate on? Let's connect!
              </p>
              <a
                href="mailto:youremail@gmail.com"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-black border border-white rounded-full font-bold text-xs tracking-wider uppercase hover:bg-neutral-100 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </a>
            </FadeIn>
          </div>

          {/* Nav & Contact Links Row */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 lg:justify-items-end w-full">
            {/* Nav links */}
            <div className="flex flex-col gap-3 font-bold text-xs tracking-widest text-neutral-400 uppercase select-none">
              <span className="text-[9px] text-neutral-600 font-extrabold tracking-widest block mb-1">
                SECTIONS
              </span>
              <button
                onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                HOME
              </button>
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                ABOUT
              </button>
              <button
                onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                SKILLS
              </button>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                PROJECTS
              </button>
            </div>

            {/* Direct Contact/Social Link grid */}
            <div className="flex flex-col gap-3 font-bold text-xs tracking-widest text-neutral-400 uppercase select-none">
              <span className="text-[9px] text-neutral-600 font-extrabold tracking-widest block mb-1">
                GET IN TOUCH
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors text-left"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Huge visual signature brand text with floating movement and hover reactivity */}
        <FadeIn delay={0.1}>
          <div className="w-full overflow-visible flex justify-center my-16 md:my-20">
            <motion.div
              className="text-[9vw] font-bold text-center tracking-tighter leading-none select-none text-white/5 whitespace-nowrap cursor-default inline-block"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 0.5, -0.5, 0],
              }}
              whileHover={{
                scale: 1.05,
                color: "rgba(255, 255, 255, 0.08)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              UNNITA <span className="font-serif italic font-normal text-rose-500/20">Karmakar</span>
            </motion.div>
          </div>
        </FadeIn>

        {/* Bottom bar with Copyright and Back-to-Top Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-extrabold tracking-widest text-neutral-500 uppercase select-none border-t border-neutral-900 pt-8">
          <div>© {currentYear} Unnita Karmakar</div>
          
          <button
            onClick={handleScrollTop}
            className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors uppercase font-extrabold tracking-widest cursor-pointer"
          >
            <span>Back to top</span>
            <div className="p-1.5 rounded-full border border-neutral-800 group-hover:border-neutral-500 group-hover:translate-y-[-2px] transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToContact = () => {
    const el = document.getElementById("footer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 relative overflow-hidden bg-white select-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,_transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,_transparent_1px)] bg-[length:40px_40px,40px_40px] opacity-120 pointer-events-none" />
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center text-center w-full">
          {/* Centered Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: -250, rotate: -6, transformOrigin: "top center" }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.9 }}
            className="flex flex-col items-center text-center"
          >
            {/* Elegant Sub-Tag that floats constantly */}
            <motion.span 
              className="text-[10px] tracking-widest text-blue-600 font-bold uppercase mb-6 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 inline-block"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Welcome to my space
            </motion.span>

            {/* Title with Permanent Marker font style that floats constantly and reacts to hover */}
            <motion.h1 
              className="font-marker text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black leading-none uppercase tracking-normal mb-6 select-none cursor-default inline-block origin-center"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 0.5, -0.5, 0]
              }}
              whileHover={{
                scale: 1.05,
                rotate: 1.5,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              }}
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              Unnita <br className="sm:hidden" />
              <motion.span 
                className="text-blue-600 inline-block sm:ml-4"
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >Karmakar</motion.span>
            </motion.h1>

            {/* Description that drifts/moves constantly */}
            <motion.p 
              className="text-lg md:text-xl font-medium text-neutral-500 max-w-2xl mb-10 leading-relaxed"
              animate={{
                y: [0, 4, 0],
                x: [0, 2, 0]
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              CS Undergrad building high-performance systems by day, weaving interactive user experiences by night.
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleScrollToContact}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-wider uppercase overflow-hidden active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-4 border-1.5 border-black rounded-full font-bold text-xs tracking-wider uppercase hover:bg-neutral-50 active:scale-95 transition-all duration-200 cursor-pointer bg-white"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Info Row */}
      <div className="max-w-6xl mx-auto w-full border-t border-neutral-100 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-extrabold tracking-widest text-neutral-400 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full" />
          <span>Built with code, curiosity &amp; caffeine</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-black">Kolkata, IN</span>
          <span className="text-neutral-300">|</span>
          <span className="text-black tabular-nums">{time || "00:00:00"}</span>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "./MotionReveal";
import { Trophy, Briefcase, Calendar } from "lucide-react";
import { Experience, Hackathon } from "../types";

export default function Hackathons() {
  const experience: Experience[] = [
    {
      id: "exp-1",
      role: "AI & Machine Learning Intern",
      organization: "SportsTech Lab",
      duration: "Dec 2025 – Present",
      description: "Developing automatic pose estimation and object detection pipelines for real-time football player indexing. Fine-tuned lightweight classification heads on top of YOLO features.",
    },
    {
      id: "exp-2",
      role: "Frontend Developer (Remote Part-Time)",
      organization: "OpenSource Sports Foundation",
      duration: "Jun 2025 – Nov 2025",
      description: "Implemented high-performance interactive charts, canvas elements, and Framer Motion layouts for open source sports stats databases. Optimized rendering latency.",
    },
  ];

  const hackathons: Hackathon[] = [
    {
      id: "hack-1",
      name: "Fear to Flow",
      year: "2025",
      marker: "flag", // Checkered flag
    },
    {
      id: "hack-2",
      name: "Smart India Hackathon (SIH '25)",
      year: "2025",
      marker: "P2", // Pole position 2
    },
    {
      id: "hack-3",
      name: "Educathon",
      year: "2025",
      marker: "P3",
    },
    {
      id: "hack-4",
      name: "Impetus",
      year: "2026",
      marker: "P4",
    },
    {
      id: "hack-5",
      name: "Diversion",
      year: "2026",
      marker: "flag",
    },
  ];

  return (
    <section id="hackathons" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-20 select-none">
            Hackathons &amp; <span className="font-serif italic font-normal text-blue-600">Experience</span>
          </h2>
        </FadeIn>

        {/* Two column grid split: Experience vs Hackathons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Experience Section on Left */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <FadeIn>
              <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
                  EXPERIENCE RECORD
                </h3>
              </div>
            </FadeIn>

            <FadeInStagger className="flex flex-col gap-8">
              {experience.map((exp) => (
                <div key={exp.id} className="w-full">
                  <FadeInStaggerItem>
                    <div className="relative pl-6 border-l-2 border-neutral-200 hover:border-blue-600 transition-colors duration-300 py-1">
                      {/* Tiny accent node */}
                      <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-neutral-200 group-hover:bg-blue-600 transition-colors" />
                      
                      <h4 className="text-lg font-bold text-black tracking-tight leading-snug">
                        {exp.role}
                      </h4>
                      
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 mt-1.5 mb-3">
                        <span className="text-blue-600">{exp.organization}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-neutral-300" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>

                      <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </FadeInStaggerItem>
                </div>
              ))}
            </FadeInStagger>
          </div>

          {/* Hackathons Race Track Section on Right */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <FadeIn>
              <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <Trophy className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
                  HACKATHON RACETRACK
                </h3>
              </div>
            </FadeIn>

            {/* Vertically running asphalt track layout */}
            <div className="relative pl-14 md:pl-20 py-4 select-none">
              {/* Racetrack asphalt layer */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-8 md:w-10 bg-neutral-900 rounded-full shadow-inner z-0 border-x-2 border-neutral-200">
                <div
                  className="w-0.5 h-full mx-auto"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #ffffff 0px, #ffffff 12px, transparent 12px, transparent 24px)",
                    backgroundSize: "2px 24px",
                  }}
                />
              </div>

              {/* Hackathon row loops */}
              <FadeInStagger className="flex flex-col gap-6 relative z-10">
                {hackathons.map((hack) => {
                  const isFlag = hack.marker === "flag";
                  
                  return (
                    <div key={hack.id} className="w-full">
                      <FadeInStaggerItem>
                        <motion.div
                          className="relative flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100/55 rounded-xl border border-neutral-150 pl-6 cursor-default transition-all duration-200"
                          whileHover={{ x: 8 }}
                        >
                          {/* Interactive Track Marker on the asphalt racing lane */}
                          <motion.div
                            className="absolute left-[-52px] md:left-[-72px] z-20 flex items-center justify-center"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            <div className="px-2 py-1 rounded-md bg-neutral-50 border border-neutral-150 text-xs font-bold text-neutral-800">
                              {isFlag ? "🏁" : hack.marker}
                            </div>
                          </motion.div>

                          {/* Hackathon metadata */}
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-neutral-800 text-sm md:text-base">
                              {hack.name}
                            </span>
                          </div>
                          <span className="font-serif italic text-sm text-blue-600 font-bold shrink-0">
                            {hack.year}
                          </span>
                        </motion.div>
                      </FadeInStaggerItem>
                    </div>
                  );
                })}
              </FadeInStagger>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

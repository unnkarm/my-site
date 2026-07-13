/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "./MotionReveal";

interface SkillItem {
  name: string;
  slug?: string;
  colorClass: string; // Tailwind class for hover states
}

export default function Skills() {
  const allSkills: SkillItem[] = [
    { name: "C", slug: "c", colorClass: "hover:bg-slate-100 hover:text-slate-800 hover:border-slate-400" },
    { name: "Python", slug: "python", colorClass: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400" },
    { name: "SQL", slug: "postgresql", colorClass: "hover:bg-sky-50 hover:text-sky-600 hover:border-sky-400" },
    { name: "Git", slug: "git", colorClass: "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-400" },
    { name: "HTML", slug: "html5", colorClass: "hover:bg-amber-50 hover:text-amber-600 hover:border-amber-400" },
    { name: "CSS", slug: "css3", colorClass: "hover:bg-blue-50 hover:text-blue-500 hover:border-blue-400" },
    { name: "JavaScript", slug: "javascript", colorClass: "hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-400" },
    { name: "React", slug: "react", colorClass: "hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-400" },
    { name: "Next.js", slug: "nextdotjs", colorClass: "hover:bg-neutral-900 hover:text-white hover:border-neutral-900" },
    { name: "Tailwind", slug: "tailwindcss", colorClass: "hover:bg-teal-50 hover:text-teal-600 hover:border-teal-400" },
    { name: "FastAPI", slug: "fastapi", colorClass: "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-400" },
    { name: "PostgreSQL", slug: "postgresql", colorClass: "hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-400" },
    { name: "Redis", slug: "redis", colorClass: "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-400" },
    { name: "NumPy", slug: "numpy", colorClass: "hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-400" },
    { name: "Pandas", slug: "pandas", colorClass: "hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-400" },
    { name: "Scikit-learn", slug: "scikitlearn", colorClass: "hover:bg-orange-50 hover:text-orange-500 hover:border-orange-400" },
    { name: "PyTorch", slug: "pytorch", colorClass: "hover:bg-red-50 hover:text-red-600 hover:border-red-400" },
    { name: "Hugging Face", slug: "huggingface", colorClass: "hover:bg-amber-50 hover:text-amber-500 hover:border-amber-400" },
    { name: "RAG Systems", colorClass: "hover:bg-violet-50 hover:text-violet-600 hover:border-violet-400" },
    { name: "Vector Databases", colorClass: "hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-400" },
    { name: "AI Agents", colorClass: "hover:bg-fuchsia-50 hover:text-fuchsia-600 hover:border-fuchsia-400" },
    { name: "Docker", slug: "docker", colorClass: "hover:bg-blue-50 hover:text-blue-500 hover:border-blue-400" },
    { name: "Linux", slug: "linux", colorClass: "hover:bg-neutral-100 hover:text-neutral-800 hover:border-neutral-400" },
    { name: "AWS", slug: "amazonaws", colorClass: "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-400" },
    { name: "GitHub Actions", slug: "githubactions", colorClass: "hover:bg-slate-50 hover:text-slate-700 hover:border-slate-400" },
    { name: "Sports Analytics", colorClass: "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-400" },
    { name: "AI-Driven Sports Applications", colorClass: "hover:bg-teal-50 hover:text-teal-700 hover:border-teal-400" },
  ];

  return (
    <section id="skills" className="py-16 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 select-none">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
              Technical <span className="font-serif italic font-normal text-blue-600">Skills</span>
            </h2>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
              Languages • Frameworks • ML Systems • Cloud
            </p>
          </div>
        </FadeIn>

        {/* Dense unsegregated skill cloud */}
        <FadeInStagger className="flex flex-wrap gap-2 md:gap-2.5 max-w-5xl">
          {allSkills.map((skill) => {
            const iconUrl = skill.slug
              ? `https://cdn.simpleicons.org/${skill.slug}/000000`
              : null;

            return (
              <div key={skill.name}>
                <FadeInStaggerItem>
                  <motion.span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-600 bg-white transition-colors duration-200 select-none cursor-default ${skill.colorClass}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {iconUrl && (
                      <img
                        src={iconUrl}
                        alt=""
                        className="w-3.5 h-3.5 object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // If simpleicons image fails to load, hide the image element
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                    <span>{skill.name}</span>
                  </motion.span>
                </FadeInStaggerItem>
              </div>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}

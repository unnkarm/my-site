/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import {
  Database,
  Code2,
  Flame,
  Cpu,
  Brain,
  Smile,
  Eye,
  Scan,
  Crosshair,
  Zap,
  Box,
  GitBranch,
  Terminal,
  Table,
} from "lucide-react";
import { FadeIn, FadeInStaggerItem } from "./MotionReveal";

const allSkills = [
  "Python",
  "SQL",
  "C++",
  "PyTorch",
  "NumPy",
  "Scikit-learn",
  "Hugging Face",
  "OpenCV",
  "YOLO",
  "Multi-Object Tracking",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "Git",
  "Linux",
  "Pandas",
];

const getSkillIcon = (name: string) => {
  switch (name) {
    case "Python":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.91 2c-5.18 0-4.85 2.25-4.85 2.25l.01 2.33h4.92v.7H5.11S2 6.92 2 12.16c0 5.24 2.7 5.06 2.7 5.06h1.61v-2.31s-.09-2.76 2.72-2.76h4.69s2.58.04 2.58-2.51V4.57S17.09 2 11.91 2zM9.42 3.63a.85.85 0 110 1.7.85.85 0 010-1.7z"
            fill="#3776AB"
          />
          <path
            d="M12.09 22c5.18 0 4.85-2.25 4.85-2.25l-.01-2.33h-4.92v-.7h6.88s3.11.36 3.11-4.88c0-5.24-2.7-5.06-2.7-5.06h-1.61v2.31s.09 2.76-2.72 2.76h-4.69s-2.58-.04-2.58 2.51v4.99S6.91 22 12.09 22zm2.49-1.63a.85.85 0 110-1.7.85.85 0 010 1.7z"
            fill="#FFD43B"
          />
        </svg>
      );
    case "SQL":
      return <Database className="w-4 h-4 shrink-0 text-blue-600" />;
    case "C++":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#00599C">
          <path d="M22.38 10.98h-1.8v-1.8h-1.2v1.8h-1.8v1.2h1.8v1.8h1.2v-1.8h1.8v-1.2zm-5.4 0h-1.8v-1.8h-1.2v1.8h-1.8v1.2h1.8v1.8h1.2v-1.8h1.8v-1.2zM8.36 5.5A7.49 7.49 0 0 0 1 12.04a7.5 7.5 0 0 0 7.36 6.46c2.8 0 5.2-1.54 6.4-3.8h-2.5A5.02 5.02 0 0 1 8.36 16c-2.2 0-4-1.8-4-4s1.8-4 4-4c1.67 0 3.1.98 3.76 2.46h2.5a7.48 7.48 0 0 0-6.26-4.96z" />
        </svg>
      );
    case "PyTorch":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#EE4C2C">
          <path d="M15.42 2.641a8.319 8.319 0 0 0-3.328 1.944 8.243 8.243 0 0 0-2.316 4.316l-3.328 3.328a6.388 6.388 0 1 0 9.033 9.034l3.18-3.18a.333.333 0 0 0 0-.472l-.744-.744a.333.333 0 0 0-.472 0l-3.18 3.18a4.838 4.838 0 1 1-6.843-6.843l3.328-3.328a8.297 8.297 0 0 0 4.148-1.564c.264-.176.326-.534.144-.783l-.707-.96a.544.544 0 0 0-.435-.228z" />
          <circle cx="16.5" cy="5.5" r="1.25" />
        </svg>
      );
    case "NumPy":
      return <Cpu className="w-4 h-4 shrink-0 text-sky-600" />;
    case "Scikit-learn":
      return <Brain className="w-4 h-4 shrink-0 text-amber-500" />;
    case "Hugging Face":
      return <Smile className="w-4 h-4 shrink-0 text-amber-400" />;
    case "OpenCV":
      return <Eye className="w-4 h-4 shrink-0 text-emerald-600" />;
    case "YOLO":
      return <Scan className="w-4 h-4 shrink-0 text-rose-500" />;
    case "Multi-Object Tracking":
      return <Crosshair className="w-4 h-4 shrink-0 text-purple-600" />;
    case "FastAPI":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#009688">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5l-5.5-6h4V7l5.5 6h-4v3.5z" />
        </svg>
      );
    case "PostgreSQL":
      return <Database className="w-4 h-4 shrink-0 text-indigo-600" />;
    case "Docker":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-2.258h2.12a.186.186 0 00.186-.186V6.748a.186.186 0 00-.186-.186h-2.12a.185.185 0 00-.185.186v1.886c0 .103.083.186.185.186zm0 4.516h2.12a.186.186 0 00.186-.185V11.26a.186.186 0 00-.186-.186h-2.12a.185.185 0 00-.185.186v1.886c0 .103.083.185.185.185zm-2.954-4.516h2.119a.186.186 0 00.186-.186V6.748a.186.186 0 00-.186-.186H8.075a.185.185 0 00-.185.186v1.886c0 .103.083.186.185.186zm0 4.516h2.119a.186.186 0 00.186-.185V11.26a.186.186 0 00-.186-.186H8.075a.185.185 0 00-.185.186v1.886c0 .103.083.185.185.185zm-2.955 0h2.119a.186.186 0 00.186-.185V11.26a.186.186 0 00-.186-.186H5.12a.186.186 0 00-.185.186v1.886c0 .103.083.185.185.185zm-2.954 0h2.119a.186.186 0 00.186-.185V11.26a.186.186 0 00-.186-.186H2.166a.185.185 0 00-.185.186v1.886c0 .103.083.185.185.185zm8.863-6.774h2.12a.186.186 0 00.186-.186V4.49a.186.186 0 00-.186-.186h-2.12a.185.185 0 00-.185.186v1.886c0 .103.083.186.185.186zM.001 13.784c0 3.322 2.37 5.716 6.07 5.716 5.211 0 9.076-2.583 11.205-6.602 1.096.064 2.21-.186 2.924-.766.192-.156.126-.464-.117-.527a4.996 4.996 0 01-1.393-.57 5.772 5.772 0 00.865-2.036c.038-.17-.13-.311-.295-.246-.867.34-1.84.444-2.825.334a11.196 11.196 0 00-2.457-3.084.288.288 0 00-.395.021l-.736.837a.288.288 0 00.016.4 8.784 8.784 0 011.666 2.458H.18a.18.18 0 00-.179.181v3.86z" />
        </svg>
      );
    case "Git":
      return <GitBranch className="w-4 h-4 shrink-0 text-orange-600" />;
    case "Linux":
      return <Terminal className="w-4 h-4 shrink-0 text-slate-800" />;
    case "Pandas":
      return <Table className="w-4 h-4 shrink-0 text-purple-700" />;
    default:
      return <Code2 className="w-4 h-4 shrink-0 text-blue-600" />;
  }
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 select-none">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
              Technical <span className="font-serif italic font-normal text-blue-600">Skills</span>
            </h2>
          </div>
        </FadeIn>

        {/* All skills in one single horizontal row */}
        <FadeIn className="rounded-3xl border border-neutral-200 bg-neutral-50/80 p-6 md:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
            {allSkills.map((item) => (
              <FadeInStaggerItem key={item}>
                <motion.div
                  className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-900 cursor-default"
                  whileHover={{ y: -2, scale: 1.04 }}
                >
                  <span className="flex items-center justify-center shrink-0 w-4 h-4">
                    {getSkillIcon(item)}
                  </span>
                  <span className="whitespace-nowrap">{item}</span>
                </motion.div>
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


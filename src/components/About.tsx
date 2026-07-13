/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { FadeIn } from "./MotionReveal";
import { GraduationCap } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 bg-neutral-50/50 border-y border-neutral-100"
    >
      <div className="max-w-6xl mx-auto">
        {/* Large section header */}
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-16 select-none">
            About Me &amp; <span className="font-serif italic font-normal text-blue-600">Education</span>
          </h2>
        </FadeIn>

        {/* Two column grid layout for Bio and Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Bio on left */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.1}>
              <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-4">
                01 . PROFILE
              </h3>
              <p className="text-lg text-neutral-600 font-medium leading-relaxed">
                I'm a Computer Science undergraduate who enjoys building end-to-end
                software — from clean, responsive frontends to complex ML-driven
                backends. 
              </p>
              <p className="text-base text-neutral-500 font-medium leading-relaxed mt-4">
                Lately, I've been exploring LLM engineering, agentic systems, and applying AI to sports analytics. 
                I thrive on turning challenging ideas into working, highly polished, deployable products.
              </p>
            </FadeIn>
          </div>

          {/* Education card on right */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-4">
                02 . FORMAL EDUCATION
              </h3>
              
              <div className="group relative bg-white border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Graduation Cap circular icon */}
                  <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-xl md:text-2xl font-bold text-black tracking-tight">
                        Techno Main Salt Lake
                      </h4>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
                        2023 – 2027
                      </span>
                    </div>
                    <p className="text-base font-semibold text-neutral-700 mb-1">
                      B.Tech in Computer Science &amp; Engineering
                    </p>
                    <p className="text-sm font-medium text-neutral-500 mb-4">
                      Kolkata, West Bengal
                    </p>
                    
                    <div className="border-t border-neutral-100 pt-4 flex items-center gap-2 text-xs font-extrabold tracking-wider text-neutral-400 uppercase">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span>Current Status: CSE Junior (3rd Year)</span>
                    </div>
                  </div>

                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}

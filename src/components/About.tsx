/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { FadeIn } from "./MotionReveal";
import { GraduationCap, Image as ImageIcon } from "lucide-react";
import { TECHNO_MAIN_LOGO_ASSET } from "../assets/images/techno_main_logo";

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
                02 . EDUCATION &amp; INSTITUTION LOGO ASSET
              </h3>
              
              <div className="group relative bg-white border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Techno Main Salt Lake College Logo Asset Badge */}
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-neutral-50 border border-neutral-200 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-xs overflow-hidden">
                    {TECHNO_MAIN_LOGO_ASSET ? (
                      <img
                        src={TECHNO_MAIN_LOGO_ASSET}
                        alt="Techno Main Salt Lake Logo"
                        className="w-full h-full object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      /* Techno Main Emblem Crest SVG Logo */
                      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                        <path d="M50 8 L82 24 L82 70 L50 88 L18 70 L18 24 Z" fill="#2563eb" fillOpacity="0.08" stroke="#2563eb" strokeWidth="3" />
                        <path d="M50 18 L74 31 L74 63 L50 76 L26 63 L26 31 Z" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="3 2" />
                        <path d="M34 46 C34 42 42 40 50 43 C58 40 66 42 66 46 L66 63 C58 60 50 62 50 62 C50 62 42 60 34 63 Z" fill="#1e40af" />
                        <path d="M50 43 L50 62" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="50" cy="33" r="5" fill="#f59e0b" />
                        <text x="50" y="75" textAnchor="middle" fill="#1e3a8a" fontSize="8" fontStyle="italic" fontWeight="bold">TMSL</text>
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl md:text-2xl font-bold text-black tracking-tight">
                          Techno Main Salt Lake
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
                        2024 – 2028
                      </span>
                    </div>
                    <p className="text-base font-semibold text-neutral-700 mb-1">
                      B.Tech in Computer Science &amp; Engineering
                    </p>
                    <p className="text-sm font-medium text-neutral-500 mb-4">
                      Kolkata, West Bengal
                    </p>
                    
                    <div className="border-t border-neutral-100 pt-4 flex items-center justify-between gap-2 text-xs font-extrabold tracking-wider text-neutral-400 uppercase">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span>Current Status: cs undergrad (3rd Year)</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-bold bg-blue-50/80 border border-blue-100 px-2 py-0.5 rounded-md">
                        <ImageIcon className="w-3 h-3" /> Logo Asset Ready
                      </span>
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


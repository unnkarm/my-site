/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "./MotionReveal";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { Project } from "../types";

export default function Projects() {
  const projects: Project[] = [
    {
      id: "project-1",
      title: "AthletaVision: AI Sports Video Analyzer",
      date: "November - December 2025",
      problem: "Traditional sports tactical analysis requires tedious, manual video tag-reviews and hand-written clip annotations.",
      solution: "Engineered an end-to-end automated action-recognition pipeline using PyTorch & OpenCV, streaming real-time analytics to a responsive React dashboard powered by FastAPI.",
      tech: ["Python", "FastAPI", "React", "PyTorch"],
      github: "https://github.com/unnita-karmakar/athletavision",
      demo: "https://github.com/unnita-karmakar/athletavision",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "project-2",
      title: "ScriboScribe: Semantic RAG Assistant",
      date: "November 2025",
      problem: "Students and researchers waste hundreds of hours filtering through dense journals and paper PDFs without a unified query database.",
      solution: "Developed an intelligent research coordinator using advanced Retrieval-Augmented Generation (RAG) with vector search databases to parse and cross-reference documents.",
      tech: ["PyTorch", "RAG Systems", "Vector Databases", "Docker"],
      github: "https://github.com/unnita-karmakar/scriboscribe",
      demo: "https://github.com/unnita-karmakar/scriboscribe",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "project-3",
      title: "ScoutFlow: Sports Metrics Platform",
      date: "January 2026",
      problem: "Local athletic clubs lack cohesive data tools to track, visualize, and accurately scout rising regional player talent.",
      solution: "Built a high-performance scout tracking ecosystem with rich interactive dashboards, scalable PostgreSQL storage, and automated profile indexing.",
      tech: ["Next.js", "PostgreSQL", "AWS", "FastAPI"],
      github: "https://github.com/unnita-karmakar/scoutflow",
      demo: "https://github.com/unnita-karmakar/scoutflow",
      image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "project-4",
      title: "TacticsEngine: Agentic Sports Planner",
      date: "March 2026",
      problem: "Scattered tournament historical playbooks are rarely leveraged to recommend dynamic strategies or dynamic counter-play tactics.",
      solution: "Engineered multi-agent LLM systems that parse game history and weather variables to generate highly customized, responsive match tactical guidelines.",
      tech: ["Scikit-learn", "Pandas", "Sports Analytics", "AI Agents"],
      github: "https://github.com/unnita-karmakar/tacticsengine",
      demo: "https://github.com/unnita-karmakar/tacticsengine",
      image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-neutral-50/30 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 select-none">
            Check out my <span className="font-serif italic font-normal text-blue-600">latest work</span>
          </h2>
          <p className="text-base text-neutral-500 font-semibold max-w-xl mx-auto">
            A handpicked selection of production-grade software applications — spanning deep learning, agentic pipelines, and full-stack sports systems.
          </p>
        </FadeIn>

        {/* Projects Grid - Highly Compact 4-Column Layout */}
        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="h-full">
              <FadeInStaggerItem className="h-full">
                <div className="group flex flex-col h-full bg-white border border-neutral-150 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden text-left">
                  
                  {/* Browser window top bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-neutral-50 border-b border-neutral-100 select-none">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex items-center gap-1 text-[7px] font-bold tracking-widest text-neutral-400 uppercase">
                      <Code2 className="w-2.5 h-2.5 text-neutral-300" />
                      <span>APP</span>
                    </div>
                  </div>

                  {/* Project Image Panel */}
                  <div className="relative overflow-hidden aspect-[16/9] bg-neutral-100 border-b border-neutral-100 shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Project Body */}
                  <div className="p-4 flex flex-col justify-between flex-1 gap-4">
                    <div className="flex flex-col gap-3">
                      {/* Header info */}
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm font-bold text-black tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-[10px] font-bold text-neutral-400">
                          {project.date}
                        </span>
                      </div>

                      {/* Problem/Solution block (Dense & Compact inline style) */}
                      <div className="flex flex-col gap-2 text-xs">
                        <p className="text-neutral-500 text-[11px] leading-relaxed">
                          <strong className="text-[8px] font-extrabold tracking-wider text-indigo-500 mr-1.5 uppercase">PROB:</strong>
                          {project.problem}
                        </p>
                        <p className="text-neutral-600 text-[11px] leading-relaxed">
                          <strong className="text-[8px] font-extrabold tracking-wider text-blue-600 mr-1.5 uppercase">SOLN:</strong>
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Tech stack and links footer */}
                    <div className="flex flex-col gap-4 pt-3 border-t border-neutral-100 mt-auto">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[8px] font-extrabold tracking-wider text-neutral-500 uppercase px-2 py-0.5 bg-neutral-50 rounded border border-neutral-150 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all cursor-default"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 text-[11px]">
                        <a
                          href={project.github}
                          target="_blank"
                          className="inline-flex items-center gap-1 font-bold text-black hover:text-blue-600 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </FadeInStaggerItem>
            </div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}

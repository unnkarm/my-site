/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "./MotionReveal";
import { Briefcase, GraduationCap, Trophy, ChevronDown, Calendar, MapPin } from "lucide-react";

interface TimelineItem {
  id: string;
  type: "work" | "education" | "hackathon";
  title: string;
  subtitle: string;
  duration: string;
  location?: string;
  description: string;
  details?: string[];
  icon: any;
}

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<"all" | "work" | "education" | "hackathon">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const timelineItems: TimelineItem[] = [
    {
      id: "timeline-1",
      type: "work",
      title: "SDE Intern (Remote Part-Time)",
      subtitle: "Zynvatech Solutions Pvt Lmtd",
      duration: "March 2026 - May 2026",
      location: "Remote",
      description: "Developed a full-stack web application for a client, implementing a responsive UI with React and integrating backend APIs.",
      details: [
        "Built responsive UI features using React and modern CSS framework utilities.",
        "Integrated secure REST API endpoints with Node.js and Express.",
        "Improved application loading speed by optimizing state updates and components structure."
      ],
      icon: Briefcase,
    },
    {
      id: "timeline-2",
      type: "hackathon",
      title: "Diversion & Impetus Hackathons",
      subtitle: "Innovative Solutions Track",
      duration: "2026",
      location: "Kolkata, India",
      description: "Participated and solved real-world challenge problems in competitive multi-day hackathons, reaching top tracks.",
      details: [
        "Designed and pitched full-stack solutions within a strict 36-hour timeframe.",
        "Collaborated with cross-functional teams using Git and agile task boards."
      ],
      icon: Trophy,
    },
    {
      id: "timeline-3",
      type: "hackathon",
      title: "Smart India Hackathon (SIH '25)",
      subtitle: "National Finalist",
      duration: "2025",
      location: "India",
      description: "National-level hackathon organized by the Government of India, addressing critical public sector problem statements.",
      details: [
        "Developed a prototype addressing critical workflow optimization challenges.",
        "Presented solution architecture to a panel of expert industry judges."
      ],
      icon: Trophy,
    },
    {
      id: "timeline-4",
      type: "education",
      title: "Bachelor of Technology in Computer Science",
      subtitle: "University of Technology",
      duration: "2023 - 2027 (Expected)",
      location: "Kolkata, India",
      description: "Specializing in software engineering, data structures, algorithms, and full-stack web architectures.",
      details: [
        "Core coursework: Operating Systems, Database Management, Design & Analysis of Algorithms.",
        "Active member of the developers' club."
      ],
      icon: GraduationCap,
    }
  ];

  const filteredItems = timelineItems.filter(
    (item) => activeTab === "all" || item.type === activeTab
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 select-none">
              My <span className="font-serif italic font-normal text-blue-600">Journey</span>
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto text-sm">
              An interactive roadmap of my professional milestones, educational history, and hackathon accomplishments.
            </p>
          </div>
        </FadeIn>

        {/* Custom Navigation Tab bar */}
        <div className="flex justify-center gap-2 mb-16 overflow-x-auto pb-2 scrollbar-none">
          {(["all", "work", "education", "hackathon"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-black text-white shadow-md"
                  : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-black border border-neutral-150"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Timeline Path Line and Cards */}
        <div className="relative border-l border-neutral-200 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12 py-2">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {/* Timeline icon indicator */}
                  <div className="absolute -left-[45px] md:-left-[53px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-neutral-200 group-hover:border-blue-600 group-hover:bg-neutral-50 transition-colors duration-300 z-10">
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-blue-600 transition-colors" />
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-150 hover:bg-neutral-100/55 transition-all duration-200">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 mb-2 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-700">
                          {item.type}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-black tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm font-semibold text-blue-600 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-col md:items-end gap-1 text-xs text-neutral-400 font-semibold shrink-0">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                          <span>{item.duration}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1.5 md:justify-end">
                            <MapPin className="w-3.5 h-3.5 text-neutral-300" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Expandable Details Accordion */}
                    {item.details && (
                      <div>
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="flex items-center gap-1 text-xs font-bold text-neutral-400 hover:text-black tracking-wider uppercase transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Show Less" : "Show Details"}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden mt-3 pl-4 list-disc space-y-1.5 text-xs text-neutral-500 font-medium leading-relaxed border-t border-neutral-100 pt-3"
                            >
                              {item.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

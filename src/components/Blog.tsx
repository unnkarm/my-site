/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "./MotionReveal";
import { BookOpen, Calendar, Clock, X, ArrowRight } from "lucide-react";
import postsData from "../data/blogPosts.json";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string;
}

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const posts: BlogPost[] = postsData;

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags)))];

  const filteredPosts = posts.filter(
    (post) => selectedTag === "All" || post.tags.includes(selectedTag)
  );

  return (
    <section id="blog" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 select-none">
              Notes &amp; <span className="font-serif italic font-normal text-blue-600">Articles</span>
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto text-sm">
              My thoughts, tutorials, and guides on frontend performance, modern CSS configurations, and design systems.
            </p>
          </div>
        </FadeIn>

        {/* Tag Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedTag === tag
                  ? "bg-black text-white"
                  : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border border-neutral-150"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="h-full">
              <FadeInStaggerItem>
                <div
                  onClick={() => setSelectedPost(post)}
                  className="group flex flex-col justify-between h-full bg-neutral-50 border border-neutral-150 p-6 rounded-2xl cursor-pointer hover:bg-neutral-100/55 transition-all duration-200"
                >
                  <div>
                    {/* Tags */}
                    <div className="flex gap-1.5 mb-4">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors leading-snug tracking-tight mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-6 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto border-t border-neutral-150 pt-4">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-350" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-350" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 group-hover:text-black transition-colors uppercase tracking-wider">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </FadeInStaggerItem>
            </div>
          ))}
        </FadeInStagger>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-neutral-150 shadow-2xl relative"
            >
              {/* Sticky Modal Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 md:px-8 py-4 border-b border-neutral-100 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>ARTICLE READER</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedPost.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-500 border border-neutral-150"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black mb-4">
                  {selectedPost.title}
                </h1>

                <div className="flex items-center gap-4 text-xs font-bold text-neutral-400 mb-8 border-b border-neutral-100 pb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-neutral-300" />
                    <span>{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-neutral-300" />
                    <span>{selectedPost.readingTime}</span>
                  </div>
                </div>

                {/* Markdown-style content block */}
                <div className="prose prose-neutral max-w-none text-neutral-600 text-sm md:text-base leading-relaxed space-y-6 font-medium">
                  {selectedPost.content.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-lg font-bold text-black tracking-tight mt-6">
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("```")) {
                      const code = paragraph.replace(/```[a-z]*/g, "").trim();
                      return (
                        <pre key={index} className="bg-neutral-55 border border-neutral-150 p-4 rounded-xl font-mono text-xs overflow-x-auto text-black my-4">
                          <code>{code}</code>
                        </pre>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

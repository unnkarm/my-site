/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { FadeIn } from "./MotionReveal";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setToastMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");

    // Mock API submission latency
    setTimeout(() => {
      setStatus("success");
      setToastMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto clear toast after 5s
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact-form-section" className="py-24 px-6 md:px-12 bg-neutral-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 select-none">
              Get in <span className="font-serif italic font-normal text-blue-600">Touch</span>
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto text-sm">
              Send me a message below. I'm always open to discussing new opportunities, collaborations, or general tech queries.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Info Card */}
          <div className="md:col-span-4 flex flex-col gap-6 bg-white p-8 rounded-2xl border border-neutral-150 shadow-sm">
            <h3 className="text-lg font-bold text-black tracking-tight">Contact Information</h3>
            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
              Fill out the form and I will respond to you within 24 hours. Let's build something great!
            </p>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider space-y-4 mt-4">
              <div>
                <span className="block text-[9px] text-neutral-600 font-extrabold mb-1">EMAIL</span>
                <a href="mailto:unnitakarmakar2005@gmail.com" className="text-black hover:text-blue-600 transition-colors">
                  unnitakarmakar2005@gmail.com
                </a>
              </div>
              <div>
                <span className="block text-[9px] text-neutral-600 font-extrabold mb-1">LOCATION</span>
                <span className="text-black">Kolkata, India</span>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="md:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white border border-neutral-250 rounded-xl text-sm text-black focus:outline-none focus:border-blue-600 transition-colors pt-6"
                    required
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs font-bold tracking-wider ${
                      focusedField === "name" || formData.name
                        ? "top-1.5 text-[9px] text-blue-600"
                        : "top-4 text-neutral-400"
                    }`}
                  >
                    YOUR NAME *
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white border border-neutral-250 rounded-xl text-sm text-black focus:outline-none focus:border-blue-600 transition-colors pt-6"
                    required
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs font-bold tracking-wider ${
                      focusedField === "email" || formData.email
                        ? "top-1.5 text-[9px] text-blue-600"
                        : "top-4 text-neutral-400"
                    }`}
                  >
                    EMAIL ADDRESS *
                  </label>
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-white border border-neutral-250 rounded-xl text-sm text-black focus:outline-none focus:border-blue-600 transition-colors pt-6"
                />
                <label
                  htmlFor="subject"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs font-bold tracking-wider ${
                    focusedField === "subject" || formData.subject
                      ? "top-1.5 text-[9px] text-blue-600"
                      : "top-4 text-neutral-400"
                  }`}
                >
                  SUBJECT
                </label>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-neutral-250 rounded-xl text-sm text-black focus:outline-none focus:border-blue-600 transition-colors pt-6 resize-none"
                  required
                />
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs font-bold tracking-wider ${
                    focusedField === "message" || formData.message
                      ? "top-1.5 text-[9px] text-blue-600"
                      : "top-4 text-neutral-400"
                  }`}
                >
                  MESSAGE *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-black text-white border border-black rounded-xl font-bold text-xs tracking-wider uppercase hover:bg-neutral-900 active:scale-98 transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating animated toast notifications */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-xl border border-neutral-800 shadow-xl flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-rose-950 text-rose-100 px-5 py-3.5 rounded-xl border border-rose-800 shadow-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

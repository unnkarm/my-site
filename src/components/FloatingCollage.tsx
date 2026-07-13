/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function FloatingCollage() {
  const [isVisible, setIsVisible] = useState(false);

  // Core coordinates of the exact mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Chain springs to create a fluid, retro snake-like tail of lagging pixels
  const spring1X = useSpring(mouseX, { damping: 20, stiffness: 220, mass: 0.2 });
  const spring1Y = useSpring(mouseY, { damping: 20, stiffness: 220, mass: 0.2 });

  const spring2X = useSpring(spring1X, { damping: 18, stiffness: 180, mass: 0.25 });
  const spring2Y = useSpring(spring1Y, { damping: 18, stiffness: 180, mass: 0.25 });

  const spring3X = useSpring(spring2X, { damping: 15, stiffness: 140, mass: 0.3 });
  const spring3Y = useSpring(spring2Y, { damping: 15, stiffness: 140, mass: 0.3 });

  const spring4X = useSpring(spring3X, { damping: 12, stiffness: 100, mass: 0.35 });
  const spring4Y = useSpring(spring3Y, { damping: 12, stiffness: 100, mass: 0.35 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 
        Inject global styles to hide the browser's default cursor
        but ONLY on desktop/fine-pointer screens to ensure proper usability.
      */}
      <style>{`
        @media (pointer: fine) {
          *, html, body, a, button, input, select, textarea, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      <div
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Pixel Trail 4 (Purple/Pink Pixel) */}
        <motion.div
          style={{ x: spring4X, y: spring4Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-1.5 h-1.5 bg-pink-500/40 border border-pink-400/50 shadow-sm"
        />

        {/* Pixel Trail 3 (Deep Purple Pixel) */}
        <motion.div
          style={{ x: spring3X, y: spring3Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-2 h-2 bg-purple-500/50 border border-purple-400/60 shadow-sm"
        />

        {/* Pixel Trail 2 (Indigo Pixel) */}
        <motion.div
          style={{ x: spring2X, y: spring2Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-2.5 h-2.5 bg-indigo-500/60 border border-indigo-400/70 shadow-sm"
        />

        {/* Pixel Trail 1 (Cyan/Blue Pixel) */}
        <motion.div
          style={{ x: spring1X, y: spring1Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-3.5 h-3.5 bg-blue-600/70 border border-blue-500/80 shadow-sm"
        />

        {/* Primary Pixel Arrow Cursor - Realtime translation (zero spring delay for click accuracy) */}
        <motion.div
          style={{ x: mouseX, y: mouseY, translateX: 0, translateY: 0 }}
          className="absolute w-6 h-6 origin-top-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
        >
          {/* Detailed 16-bit Cyber Pixel Pointer SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outline black pixels */}
            <path d="M0 0V16H4L8 20H10L10 18L8 14H14L0 0Z" fill="black" stroke="black" strokeWidth="2.5" strokeLinejoin="miter" />
            {/* Inner cyber fill */}
            <path d="M1 2V14.5L5 14.5L8.5 18H9L9 17L6.5 13H12.5L1 2Z" fill="#3b82f6" />
            {/* Inline bright blue/cyan highlight */}
            <path d="M2 3.5V12.5L4 12.5L7 15.5L7.5 15.5L5.5 12H10.5L2 3.5Z" fill="#60a5fa" />
          </svg>
        </motion.div>
      </div>
    </>
  );
}

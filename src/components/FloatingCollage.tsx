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
          className="absolute w-1.5 h-1.5 bg-pink-500/40"
        />

        {/* Pixel Trail 3 (Deep Purple Pixel) */}
        <motion.div
          style={{ x: spring3X, y: spring3Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-2 h-2 bg-purple-500/50"
        />

        {/* Pixel Trail 2 (Indigo Pixel) */}
        <motion.div
          style={{ x: spring2X, y: spring2Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-2.5 h-2.5 bg-indigo-500/60"
        />

        {/* Pixel Trail 1 (Cyan/Blue Pixel) */}
        <motion.div
          style={{ x: spring1X, y: spring1Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-3.5 h-3.5 bg-blue-600/70"
        />

        {/* Primary Pixel Arrow Cursor - Realtime translation (zero spring delay for click accuracy) */}
        <motion.div
          style={{ x: mouseX, y: mouseY, translateX: 0, translateY: 0 }}
          className="absolute w-6 h-6 origin-top-left"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="pixel cursor">
            <path d="M0 0 L0 14 L4 14 L7 17 L9 17 L9 15 L6 12 L14 12 L0 0 Z" fill="#60a5fa" />
          </svg>
        </motion.div>
      </div>
    </>
  );
}

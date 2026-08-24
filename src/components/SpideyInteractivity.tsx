import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";

interface Thwip {
  id: number;
  x: number;
  y: number;
}

export default function SpideyInteractivity() {
  const [thwips, setThwips] = useState<Thwip[]>([]);
  const thwipIdRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webBursts, setWebBursts] = useState<{ x: number; y: number; progress: number }[]>([]);

  // 1. Custom Cursor Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { damping: 28, stiffness: 400, mass: 0.05 });
  const cursorY = useSpring(mouseY, { damping: 28, stiffness: 400, mass: 0.05 });
  const [showCursor, setShowCursor] = useState(false);

  // 2. Scroll Tracking for Climbing Spider-Man
  const { scrollYProgress } = useScroll();
  const spideyY = useTransform(scrollYProgress, [0, 1], ["8vh", "85vh"]);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  // 3. Easter Egg States
  const [konamiActive, setKonamiActive] = useState(false);
  const keysRef = useRef<string[]>([]);
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  // Console.log Greeting
  useEffect(() => {
    console.log(
      "%cHey True Believer! Looking for bugs? 🕷️",
      "color: #ffffff; font-size: 16px; font-weight: bold; background-color: #e2111c; padding: 6px 12px; border-radius: 4px; border: 2px solid #000; text-shadow: 1px 1px 0px #000;"
    );
  }, []);

  // Konami Code sequence listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.push(e.key);
      if (keysRef.current.length > konamiCode.length) {
        keysRef.current.shift();
      }
      
      const isMatch = JSON.stringify(keysRef.current.map(k => k.toLowerCase())) === JSON.stringify(konamiCode.map(k => k.toLowerCase()));
      if (isMatch) {
        setKonamiActive(true);
        keysRef.current = []; // Clear buffer
        setTimeout(() => setKonamiActive(false), 8000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll crawler wiggles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => setIsScrolling(false), 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Cursor move listener
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!showCursor) setShowCursor(true);
    };
    const leaveWindow = () => setShowCursor(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", leaveWindow);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", leaveWindow);
    };
  }, [showCursor, mouseX, mouseY]);

  // Thwip On-Click Trigger
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("textarea")) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      // Spawn comic-book THWIP text
      const id = thwipIdRef.current++;
      setThwips((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setThwips((prev) => prev.filter((t) => t.id !== id));
      }, 500);

      // Spawn canvas web burst
      setWebBursts((prev) => [...prev, { x, y, progress: 0 }]);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Web burst canvas animation loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setWebBursts((prev) => {
        const next = prev.map((burst) => ({
          ...burst,
          progress: burst.progress + 0.05,
        })).filter((burst) => burst.progress <= 1);

        next.forEach((burst) => {
          const { x, y, progress } = burst;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 - progress})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = "rgba(226, 17, 28, 0.4)";
          ctx.shadowBlur = 4;

          const numRays = 8;
          const maxRadius = 50 * progress;

          // Draw spider web threads radiating out
          for (let i = 0; i < numRays; i++) {
            const angle = (i * 2 * Math.PI) / numRays;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * maxRadius, y + Math.sin(angle) * maxRadius);
            ctx.stroke();
          }

          // Draw cross strands
          ctx.lineWidth = 0.8;
          ctx.strokeStyle = `rgba(226, 17, 28, ${0.6 - progress * 0.6})`;
          const numRings = 2;
          for (let r = 1; r <= numRings; r++) {
            const ringRadius = maxRadius * (r / numRings);
            ctx.beginPath();
            for (let i = 0; i <= numRays; i++) {
              const angle = (i * 2 * Math.PI) / numRays;
              const nextAngle = ((i + 1) * 2 * Math.PI) / numRays;
              
              const startX = x + Math.cos(angle) * ringRadius;
              const startY = y + Math.sin(angle) * ringRadius;
              const endX = x + Math.cos(nextAngle) * ringRadius;
              const endY = y + Math.sin(nextAngle) * ringRadius;

              if (i === 0) {
                ctx.moveTo(startX, startY);
              } else {
                ctx.lineTo(startX, startY);
              }
            }
            ctx.stroke();
          }
        });

        return next;
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* 4. Desktop Custom Pointer Styling */}
      {showCursor && (
        <>
          <style>{`
            @media (pointer: fine) {
              *, html, body, a, button, input, select, textarea, [role="button"] {
                cursor: none !important;
              }
            }
          `}</style>
          
          <motion.div
            style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
            className="fixed pointer-events-none z-50 overflow-visible hidden md:block"
          >
            {/* Custom Spidey Mask Cursor */}
            <svg
              width="24"
              height="28"
              viewBox="0 0 24 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
            >
              {/* Mask Base (Spidey Red) */}
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 16.5 6 22 12 26C18 22 22 16.5 22 12C22 6.48 17.52 2 12 2Z"
                fill="#e2111c"
                stroke="black"
                strokeWidth="1.5"
              />
              {/* Left Eye (White lens & Black border) */}
              <path
                d="M11.5 13.5C8 13.5 5 11 4 9C6.5 7 10 9 11.5 13.5Z"
                fill="white"
                stroke="black"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Right Eye (White lens & Black border) */}
              <path
                d="M12.5 13.5C16 13.5 19 11 20 9C17.5 7 14 9 12.5 13.5Z"
                fill="white"
                stroke="black"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Web lines on mask */}
              <path d="M12 2V26M2 12H22" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            </svg>
          </motion.div>
        </>
      )}

      {/* Web burst overlay canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
      />

      {/* Comic Book THWIP Text Popups */}
      {thwips.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
          animate={{ opacity: 1, scale: 1.2, rotate: -10 }}
          exit={{ opacity: 0 }}
          style={{ left: t.x, top: t.y, translateX: "-50%", translateY: "-120%" }}
          className="fixed pointer-events-none z-50 text-[10px] md:text-xs font-marker bg-yellow-400 text-black border-1.5 border-black px-2 py-0.5 rounded shadow-lg uppercase select-none"
        >
          THWIP!
        </motion.div>
      ))}

      {/* 5. Scroll-Climbing Spider-Man Section on Left Edge */}
      <div className="fixed left-2 md:left-4 top-0 bottom-0 z-40 w-6 pointer-events-none select-none flex justify-center">
        {/* Vertical Web Thread */}
        <div className="absolute top-0 bottom-0 w-[1.5px] bg-neutral-200/80 shadow-xs border-dashed border-l border-neutral-300" />

        {/* Crawler Spidey */}
        <motion.div
          style={{ y: spideyY }}
          animate={{
            rotate: isScrolling ? [0, -3, 3, 0] : 0,
            scale: isScrolling ? 1.05 : 1,
          }}
          transition={{
            rotate: { duration: 0.15, repeat: Infinity, ease: "linear" },
          }}
          className="absolute w-8 h-8 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="none"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
          >
            {/* Spidey head/shoulders climbing (back profile view) */}
            <circle cx="12" cy="12" r="4.5" fill="#e2111c" stroke="black" strokeWidth="1" />
            <path d="M12 7.5L12 16.5M7.5 12H16.5" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
            {/* Left crawler limbs */}
            <path d="M8.5 10C6 9.5, 4.5 7.5, 5 5" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8.5 12C5 12.5, 4 11.5, 3.5 9" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8.5 14C5.5 15.5, 4.5 17.5, 5 20" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
            {/* Right crawler limbs */}
            <path d="M15.5 10C18 9.5, 19.5 7.5, 19 5" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15.5 12C19 12.5, 20 11.5, 20.5 9" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15.5 14C18.5 15.5, 19.5 17.5, 19 20" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      {/* Konami Code Falling Spider-Man surprise */}
      {konamiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 flex justify-center">
          {/* Thread */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "45vh" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-[1.5px] bg-neutral-300 relative"
          >
            {/* Spider-Man dancing character at end of thread */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                rotate: [0, -15, 15, -15, 15, 0],
                y: [0, -10, 5, -5, 0],
              }}
              transition={{
                scale: { duration: 0.3 },
                rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-[-45px] left-[-22px] w-12 h-12 flex flex-col items-center"
            >
              <svg viewBox="0 0 24 24" width="48" height="48">
                {/* Custom dancing pixel Spider-Man illustration */}
                <rect x="10" y="2" width="4" height="4" fill="#e2111c" rx="1" />
                <rect x="8" y="6" width="8" height="8" fill="#1d4ed8" rx="2" />
                <rect x="9" y="8" width="6" height="4" fill="#e2111c" />
                {/* Eyes */}
                <rect x="9" y="5" width="2" height="1.5" fill="white" />
                <rect x="13" y="5" width="2" height="1.5" fill="white" />
                {/* Limbs */}
                <path d="M6 8 L8 10 M18 8 L16 10" stroke="#e2111c" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M9 14 L7 18 M15 14 L17 18" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-[8px] bg-black text-white px-1.5 py-0.5 rounded border border-red-500 font-bold uppercase whitespace-nowrap mt-1">
                Spider-Dance!
              </span>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "motion/react";

interface WebLine {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  maxLength: number;
  currentLength: number;
  anchors: { x: number; y: number }[];
  life: number; // 0 to 1
  maxLife: number;
}

export default function SpideyEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webs, setWebs] = useState<{ x: number; y: number; lines: WebLine[]; age: number }[]>([]);
  const dragY = useMotionValue(0);
  const controls = useAnimation();
  const [isSpideySplat, setIsSpideySplat] = useState(false);

  // Map drag value to SVG line height/rotation
  const webHeight = useTransform(dragY, (value) => 80 + value);

  // Trigger web shooting on click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't shoot web if clicking interactive elements like buttons/inputs
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("textarea")) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      // Create a web burst
      const numRays = 8;
      const lines: WebLine[] = [];
      for (let i = 0; i < numRays; i++) {
        const angle = (i * 2 * Math.PI) / numRays + (Math.random() - 0.5) * 0.2;
        const maxLength = 60 + Math.random() * 80;
        
        // Create secondary web anchors along the ray
        const anchors: { x: number; y: number }[] = [];
        const numAnchors = 3;
        for (let j = 1; j <= numAnchors; j++) {
          const ratio = j / numAnchors;
          anchors.push({
            x: Math.cos(angle) * maxLength * ratio,
            y: Math.sin(angle) * maxLength * ratio,
          });
        }

        lines.push({
          id: i,
          startX: x,
          startY: y,
          angle,
          maxLength,
          currentLength: 0,
          anchors,
          life: 1.0,
          maxLife: 20 + Math.random() * 15, // frames
        });
      }

      setWebs((prev) => [...prev, { x, y, lines, age: 0 }]);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Canvas animation loop
  useEffect(() => {
    let animationId: number;
    
    const updateCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Handle resize dynamically
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setWebs((prevWebs) => {
        const activeWebs = prevWebs
          .map((web) => {
            const updatedLines = web.lines.map((line) => {
              const newLife = line.life - 1 / line.maxLife;
              const currentLength = line.maxLength * Math.min(1, (1 - newLife) * 3);
              return { ...line, life: newLife, currentLength };
            });

            return {
              ...web,
              lines: updatedLines.filter((l) => l.life > 0),
              age: web.age + 1,
            };
          })
          .filter((web) => web.lines.length > 0);

        // Draw all active webs
        activeWebs.forEach((web) => {
          ctx.strokeStyle = "rgba(226, 17, 28, 0.7)"; // Spider-Man red web
          ctx.lineWidth = 1.5;
          ctx.shadowColor = "rgba(226, 17, 28, 0.5)";
          ctx.shadowBlur = 3;

          // 1. Draw radial main lines
          web.lines.forEach((line) => {
            const endX = line.startX + Math.cos(line.angle) * line.currentLength;
            const endY = line.startY + Math.sin(line.angle) * line.currentLength;

            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          });

          // 2. Draw concentric connecting rings (cobweb shape)
          ctx.strokeStyle = "rgba(255, 255, 255, 0.85)"; // White silk connections
          ctx.lineWidth = 1.0;
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
          ctx.shadowBlur = 2;

          const numRings = 3;
          for (let r = 1; r <= numRings; r++) {
            const ringRatio = r / numRings;
            ctx.beginPath();
            
            web.lines.forEach((line, idx) => {
              const ringDist = line.currentLength * ringRatio;
              const ptX = line.startX + Math.cos(line.angle) * ringDist;
              const ptY = line.startY + Math.sin(line.angle) * ringDist;

              if (idx === 0) {
                ctx.moveTo(ptX, ptY);
              } else {
                // Curved connection between rays
                const prevLine = web.lines[idx - 1];
                const prevDist = prevLine.currentLength * ringRatio;
                const cpAngle = (line.angle + prevLine.angle) / 2;
                const cpDist = ringDist * 0.9; // inward sag
                const cpX = line.startX + Math.cos(cpAngle) * cpDist;
                const cpY = line.startY + Math.sin(cpAngle) * cpDist;

                ctx.quadraticCurveTo(cpX, cpY, ptX, ptY);
              }

              // Close the loop on last element
              if (idx === web.lines.length - 1 && web.lines.length > 2) {
                const firstLine = web.lines[0];
                const firstDist = firstLine.currentLength * ringRatio;
                const firstX = firstLine.startX + Math.cos(firstLine.angle) * firstDist;
                const firstY = firstLine.startY + Math.sin(firstLine.angle) * firstDist;
                const cpAngle = (line.angle + firstLine.angle) / 2;
                const cpDist = ringDist * 0.9;
                const cpX = line.startX + Math.cos(cpAngle) * cpDist;
                const cpY = line.startY + Math.sin(cpAngle) * cpDist;

                ctx.quadraticCurveTo(cpX, cpY, firstX, firstY);
              }
            });
            ctx.stroke();
          }
        });

        return activeWebs;
      });

      animationId = requestAnimationFrame(updateCanvas);
    };

    animationId = requestAnimationFrame(updateCanvas);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Handle Web Line Drag End
  const handleDragEnd = async () => {
    const currentY = dragY.get();
    if (currentY >= 110) {
      // Trigger Spidey Sense/Splat flash
      setIsSpideySplat(true);
      setTimeout(() => setIsSpideySplat(false), 800);

      // Scroll to Projects section
      const projectsEl = document.getElementById("projects");
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Snap back spider
    controls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 15 } });
  };

  return (
    <>
      {/* Dynamic Full-screen Canvas for Web Shooting click effect */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
      />

      {/* Screen Splat effect when pull release threshold is met */}
      {isSpideySplat && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-red-600/10 backdrop-blur-[1px]"
        >
          {/* Spidey Sense lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-red-500 rounded-full"
                style={{
                  width: `${(i + 1) * 60}px`,
                  height: `${(i + 1) * 60}px`,
                  borderStyle: "dashed",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0, 0.8],
                  rotate: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: 2,
                  ease: "easeInOut",
                }}
              />
            ))}
            <span className="text-red-600 font-marker text-4xl uppercase tracking-wider bg-white border-2 border-black px-4 py-2 rotate-[-5deg] shadow-lg">
              Spidey-Sense!
            </span>
          </div>
        </motion.div>
      )}

      {/* Draggable Spider web in the upper-right corner */}
      <div className="fixed top-0 right-4 md:right-8 z-40 select-none flex flex-col items-center">
        {/* The Hanging Thread */}
        <motion.svg
          width="4"
          style={{ height: webHeight }}
          className="overflow-visible"
        >
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100%"
            stroke="#d1d5db"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
        </motion.svg>

        {/* The Draggable Spider Pendant */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 130 }}
          style={{ y: dragY }}
          animate={controls}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.15 }}
          whileDrag={{ scale: 1.2, cursor: "grabbing" }}
          className="w-10 h-10 bg-red-600 border-2 border-black rounded-full flex items-center justify-center cursor-grab shadow-md relative active:bg-red-700"
          title="Pull to trigger Spidey-Sense!"
        >
          {/* Detailed clean Spider SVG design */}
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Body & Head */}
            <circle cx="12" cy="14" r="3" fill="white" />
            <circle cx="12" cy="8" r="1.5" fill="white" />
            {/* Left Legs */}
            <path d="M9 13 C 6 12, 5 9, 6 6" />
            <path d="M9 14 C 5 14, 4 12, 5 9" />
            <path d="M9 15 C 5 16, 4 18, 5 21" />
            {/* Right Legs */}
            <path d="M15 13 C 18 12, 19 9, 18 6" />
            <path d="M15 14 C 19 14, 20 12, 19 9" />
            <path d="M15 15 C 19 16, 20 18, 19 21" />
          </svg>

          {/* Tiny notification dot/indicator to draw attention */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white"></span>
          </span>
        </motion.div>
      </div>
    </>
  );
}

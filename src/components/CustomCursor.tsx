"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring animation for cursor lag effect - all hooks at top level
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Outer ring springs with more lag
  const outerSpringConfig = { damping: 15, stiffness: 150 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hover state for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-cursor-hover") ||
        target.closest("[data-cursor-hover]");
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleElementHover);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleElementHover);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY, isMobile]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 3 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 20 },
            opacity: { duration: 0.2 },
          }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          {/* Inner dot */}
          <div 
            className={`rounded-full bg-white transition-all duration-300 ${
              isHovering ? "w-16 h-16 opacity-30" : "w-3 h-3"
            }`}
          />
        </motion.div>
      </motion.div>

      {/* Outer ring - follows with more lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: outerXSpring,
          y: outerYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 20 },
            opacity: { duration: 0.2 },
          }}
          className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 mix-blend-difference"
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}

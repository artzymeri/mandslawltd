"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const velvetCanvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position for velvet animation (throttled)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Velvet Canvas Animation - GPU Optimized
  useEffect(() => {
    const canvas = velvetCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * (isMobile ? 3 : 5) * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight * (isMobile ? 3 : 5) + "px";
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Velvet wave parameters - reduced for mobile
    const waves = isMobile ? [
      { amplitude: 60, frequency: 0.003, speed: 0.012, opacity: 0.035, yOffset: 0 },
      { amplitude: 80, frequency: 0.002, speed: 0.015, opacity: 0.03, yOffset: 300 },
    ] : [
      { amplitude: 80, frequency: 0.003, speed: 0.015, opacity: 0.04, yOffset: 0 },
      { amplitude: 60, frequency: 0.004, speed: 0.012, opacity: 0.035, yOffset: 200 },
      { amplitude: 100, frequency: 0.002, speed: 0.018, opacity: 0.03, yOffset: 400 },
      { amplitude: 70, frequency: 0.0035, speed: 0.01, opacity: 0.045, yOffset: 600 },
    ];

    const drawVelvetWave = (
      wave: typeof waves[0],
      yBase: number,
      time: number
    ) => {
      const step = isMobile ? 6 : 3; // Larger steps on mobile for performance
      ctx.beginPath();

      const canvasHeight = canvas.height / (isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));
      const canvasWidth = canvas.width / (isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));

      for (let x = 0; x <= canvasWidth; x += step) {
        const y =
          yBase +
          wave.yOffset +
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.3) * (wave.amplitude * 0.4);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.lineTo(0, canvasHeight);
      ctx.closePath();

      // Simple gradient for performance
      const gradient = ctx.createLinearGradient(0, yBase, 0, yBase + 200);
      gradient.addColorStop(0, `rgba(194, 159, 97, ${wave.opacity})`);
      gradient.addColorStop(1, `rgba(194, 159, 97, 0)`);

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawVelvetFabric = () => {
      const canvasHeight = canvas.height / (isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));
      const canvasWidth = canvas.width / (isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Fewer layers on mobile
      const layerCount = isMobile ? 3 : 5;
      
      for (let layer = 0; layer < layerCount; layer++) {
        const baseY = layer * (canvasHeight / layerCount);
        const layerTime = time + layer * 30;
        
        waves.forEach((wave, index) => {
          drawVelvetWave(
            {
              ...wave,
              amplitude: wave.amplitude * (1 + layer * 0.05),
            },
            baseY + index * 120,
            layerTime
          );
        });
      }

      // Fewer shimmer particles on mobile
      if (!isMobile) {
        for (let i = 0; i < 20; i++) {
          const shimmerX = (Math.sin(time * 0.008 + i * 0.5) * 0.5 + 0.5) * canvasWidth;
          const shimmerY = (Math.cos(time * 0.006 + i * 0.7) * 0.5 + 0.5) * canvasHeight;
          const shimmerOpacity = Math.sin(time * 0.015 + i) * 0.2 + 0.2;

          ctx.beginPath();
          ctx.arc(shimmerX, shimmerY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 183, 138, ${shimmerOpacity * 0.12})`;
          ctx.fill();
        }
      }
    };

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Throttle frame rate
      if (currentTime - lastFrameTime < frameInterval) return;
      lastFrameTime = currentTime;
      
      time += 1;
      drawVelvetFabric();
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 3D Velvet Canvas - Full page flowing fabric */}
      <canvas
        ref={velvetCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none mix-blend-soft-light will-change-transform"
        style={{
          transform: `translate3d(0, -${scrollY * 0.2}px, 0)`,
        }}
      />

      {/* Static gradient background - no animation for performance */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(194, 159, 97, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(194, 159, 97, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(26, 26, 26, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Simplified grid pattern - hidden on mobile */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(26, 26, 26, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26, 26, 26, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      )}

      {/* Scroll progress indicator line - GPU optimized */}
      <motion.div
        className="fixed left-0 top-0 w-1 bg-gradient-to-b from-amber-600/50 to-amber-800/50 origin-top z-50 will-change-transform"
        style={{
          scaleY: smoothProgress,
          height: "100vh",
        }}
      />

      {/* Ambient glow - simplified, uses CSS transform for GPU */}
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(194, 159, 97, 0.08) 0%, transparent 70%)",
          left: "50%",
          top: useTransform(smoothProgress, [0, 1], ["10%", "90%"]),
          x: "-50%",
          y: "-50%",
        }}
      />
    </div>
  );
}

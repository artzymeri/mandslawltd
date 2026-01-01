"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// GPU-optimized transition
const gpuTransition = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check for mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Canvas animation for golden particles - optimized
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fewer particles on mobile
    const particleCount = isMobile ? 30 : 60;
    const particlesArray: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);
      
      if (currentTime - lastFrameTime < frameInterval) return;
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(194, 159, 97, ${particle.opacity})`;
        ctx.fill();
      });

      // Skip connecting lines on mobile
      if (!isMobile) {
        particlesArray.forEach((p1, i) => {
          particlesArray.slice(i + 1).forEach((p2) => {
            const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(194, 159, 97, ${0.08 * (1 - distance / 80)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isMobile]);

  // Loading sequence
  useEffect(() => {
    setTimeout(() => setShowLogo(true), 300);
    setTimeout(() => setShowText(true), 800);

    const assets = ["/video1.mp4", "/video2.mp4"];
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / assets.length) * 100);
      setProgress(newProgress);

      if (loadedCount === assets.length) {
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(onComplete, 600);
        }, 800);
      }
    };

    assets.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.oncanplaythrough = updateProgress;
      video.onerror = updateProgress;
      video.load();
    });

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      if (currentProgress < 90) {
        currentProgress += Math.random() * 10;
        setProgress(Math.min(Math.round(currentProgress), 90));
      }
    }, 250);

    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(onComplete, 600);
      }, 400);
    }, 3500);

    return () => {
      clearTimeout(fallbackTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ...gpuTransition }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
          style={{ willChange: "opacity" }}
        >
          {/* Canvas for particle effects */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 opacity-40"
          />

          {/* Static gradient orb - no animation for performance */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(194, 159, 97, 0.4) 0%, transparent 70%)",
            }}
          />

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showLogo ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ...gpuTransition }}
              className="mb-8 relative"
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                src="/logo.png"
                alt="M&S Law Ltd"
                width={200}
                height={80}
                className="h-20 w-auto relative z-10 brightness-0 invert"
                priority
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showText ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <p className="text-white/40 text-sm tracking-[0.3em] uppercase font-light">
                Excellence in Law
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="relative w-64">
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-500"
                  style={{ willChange: "width" }}
                />
              </div>
            </div>

            {/* Progress text */}
            <motion.span
              className="mt-6 text-[11px] tracking-[0.15em] text-white/30 font-mono"
            >
              {progress.toString().padStart(3, "0")}%
            </motion.span>
          </div>

          {/* Corner decorations - static */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

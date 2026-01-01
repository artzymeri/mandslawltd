"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface LoaderProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  angle: number;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 50 + (Math.random() - 0.5) * 20,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
        angle: Math.random() * 360,
      });
    }
    setParticles(newParticles);
  }, []);

  // Canvas animation for golden particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 100; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
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

      // Draw connecting lines
      particlesArray.forEach((p1, i) => {
        particlesArray.slice(i + 1).forEach((p2) => {
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(194, 159, 97, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Loading sequence
  useEffect(() => {
    // Show logo after a short delay
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
          setTimeout(onComplete, 800);
        }, 1000);
      }
    };

    // Preload videos
    assets.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.oncanplaythrough = updateProgress;
      video.onerror = updateProgress;
      video.load();
    });

    // Animate progress smoothly
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      if (currentProgress < 90) {
        currentProgress += Math.random() * 8;
        setProgress(Math.min(Math.round(currentProgress), 90));
      }
    }, 200);

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(onComplete, 800);
      }, 500);
    }, 4000);

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
          exit={{ 
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Canvas for particle effects */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 opacity-40"
          />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(194, 159, 97, 0.4) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(194, 159, 97, 0.3) 0%, transparent 70%)",
              right: "20%",
              bottom: "20%",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-amber-500/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                x: Math.cos(particle.angle * Math.PI / 180) * 200,
                y: Math.sin(particle.angle * Math.PI / 180) * 200,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo reveal with mask */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={showLogo ? { 
                opacity: 1, 
                scale: 1, 
                rotateX: 0,
              } : {}}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-8 relative"
            >
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute inset-0 blur-2xl"
                style={{
                  background: "radial-gradient(circle, rgba(194, 159, 97, 0.4) 0%, transparent 70%)",
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <Image
                src="/logo.png"
                alt="M&S Law Ltd"
                width={200}
                height={80}
                className="h-20 w-auto relative z-10 brightness-0 invert"
                priority
              />
            </motion.div>

            {/* Tagline with stagger effect */}
            <motion.div
              className="overflow-hidden mb-12"
              initial={{ height: 0 }}
              animate={showText ? { height: "auto" } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={showText ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/40 text-sm tracking-[0.3em] uppercase font-light"
              >
                Excellence in Law
              </motion.p>
            </motion.div>

            {/* Progress bar with glow */}
            <div className="relative w-64">
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  className="h-full relative"
                  style={{
                    background: "linear-gradient(90deg, rgba(194, 159, 97, 0.8) 0%, rgba(194, 159, 97, 1) 100%)",
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              {/* Progress glow */}
              <motion.div
                className="absolute top-1/2 h-4 blur-md -translate-y-1/2"
                style={{
                  width: `${progress}%`,
                  background: "rgba(194, 159, 97, 0.5)",
                }}
              />
            </div>

            {/* Progress text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              <motion.span
                className="text-[11px] tracking-[0.15em] text-white/30 font-mono"
                key={progress}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {progress.toString().padStart(3, "0")}%
              </motion.span>
              
              {/* Animated dots */}
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-amber-500/50"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-20 h-20 border-l border-t border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          {/* Scanning line effect */}
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(194, 159, 97, 0.3) 50%, transparent 100%)",
            }}
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface LoaderProps {
  onComplete: () => void;
}

const words = ["Precision", "Integrity", "M&S Law"];

// Detect low-performance devices
const isLowPerformanceDevice = () => {
  if (typeof window === 'undefined') return false;
  // Check for low memory devices
  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
  const lowCores = nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4;
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return lowMemory || lowCores || prefersReducedMotion;
};

export default function Loader({ onComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isLowPerf, setIsLowPerf] = useState(false);

  // Check device performance on mount
  useEffect(() => {
    setIsLowPerf(isLowPerformanceDevice());
  }, []);

  useEffect(() => {
    // Word cycling effect
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(wordInterval);
        return prev;
      });
    }, 1200);

    let assetsLoaded = false;
    const assets = ["/video1.mp4", "/video2.mp4"];
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      if (loadedCount === assets.length) {
        assetsLoaded = true;
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

    // Smooth animated progress - fast at first, slows down near 100%
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      if (currentProgress < 100) {
        // Slow down as we approach 100%
        const remaining = 100 - currentProgress;
        const baseIncrement = assetsLoaded ? 8 : 3;
        const slowdownFactor = Math.max(0.1, remaining / 100);
        const increment = baseIncrement * slowdownFactor + Math.random() * 2;
        
        currentProgress += increment;
        currentProgress = Math.min(currentProgress, assetsLoaded ? 100 : 85);
        setDisplayProgress(Math.round(currentProgress));
      }
      
      // Complete when we reach 100%
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        // Start curtain reveal
        setTimeout(() => {
          setIsRevealing(true);
          // After curtain animation completes
          setTimeout(() => {
            setIsLoading(false);
            onComplete();
          }, 1200);
        }, 500);
      }
    }, 80);

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      assetsLoaded = true;
    }, 5000);

    return () => {
      clearTimeout(fallbackTimer);
      clearInterval(progressInterval);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  // Premium heavy easing curve - simplified for low-perf devices
  const curtainEasing = isLowPerf 
    ? [0.4, 0, 0.2, 1] as [number, number, number, number]
    : [0.76, 0, 0.24, 1] as [number, number, number, number];

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isRevealing ? "-100%" : 0 }}
          transition={{ 
            duration: isLowPerf ? 0.6 : 1.2, 
            ease: curtainEasing,
          }}
          className="fixed inset-0 z-50 bg-[#050505] overflow-hidden"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)', // Force GPU layer
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle grain texture - disabled on low-perf devices */}
          {!isLowPerf && (
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          )}

          {/* Decorative corner accents - hidden on low-perf devices */}
          {!isLowPerf && (
            <>
              <div className="absolute top-8 left-8 w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#D4AF37]/30 to-transparent" />
              </div>
              <div className="absolute bottom-8 right-8 w-20 h-20">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#D4AF37]/30 to-transparent" />
                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-[#D4AF37]/30 to-transparent" />
              </div>
            </>
          )}

          {/* Center - Word Cycle - GPU optimized */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentWordIndex}
                initial={{ opacity: 0, filter: isLowPerf ? "none" : "blur(10px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: isLowPerf ? "none" : "blur(10px)", scale: 1.05 }}
                transition={{ duration: isLowPerf ? 0.3 : 0.6, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight"
                style={{ 
                  fontFamily: "var(--font-playfair), serif",
                  color: currentWordIndex === words.length - 1 ? "#D4AF37" : "white",
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
              >
                {words[currentWordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Bottom Right - Massive Counter */}
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-right"
            >
              <p 
                className="text-[80px] md:text-[120px] lg:text-[180px] font-medium leading-none tracking-tighter"
                style={{ 
                  fontFamily: "var(--font-playfair), serif",
                  fontVariantNumeric: "tabular-nums",
                  color: "#D4AF37",
                }}
              >
                {displayProgress}
              </p>
              <p className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase mt-2">
                Loading
              </p>
            </motion.div>
          </div>

          {/* Bottom Left - Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
          >
            <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
              Solicitors in Lancashire
            </p>
          </motion.div>

          {/* Progress line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/50"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

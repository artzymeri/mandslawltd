"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Classic reveal sequence
    setTimeout(() => setShowLogo(true), 400);
    setTimeout(() => setShowTagline(true), 1000);

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

    // Smooth animated progress - controls the visual display
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      if (currentProgress < 100) {
        // Speed up when assets are loaded
        const increment = assetsLoaded ? 8 : 4;
        currentProgress += Math.random() * increment + 1;
        currentProgress = Math.min(currentProgress, assetsLoaded ? 100 : 85);
        setDisplayProgress(Math.round(currentProgress));
      }
      
      // Complete when we reach 100%
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(onComplete, 800);
        }, 1000);
      }
    }, 150);

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      assetsLoaded = true;
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f8f6f3]"
        >
          {/* Classic elegant background */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8f6f3_0%,#efe9e1_100%)]" />
          
          {/* Subtle texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative corner lines */}
          <div className="absolute top-12 left-12 w-24 h-24">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1a1a1a]/10" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-[#1a1a1a]/10" />
          </div>
          <div className="absolute bottom-12 right-12 w-24 h-24">
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#1a1a1a]/10" />
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#1a1a1a]/10" />
          </div>

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo - suppressHydrationWarning to handle browser extension interference */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={showLogo ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-10"
              suppressHydrationWarning
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="M&S Law Ltd"
                width={180}
                height={72}
                className="h-16 w-auto"
                suppressHydrationWarning
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={showTagline ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[#1a1a1a]/40 text-sm tracking-[0.25em] uppercase font-light mb-14 font-serif"
            >
              Solicitors
            </motion.p>

            {/* Classic progress bar */}
            <div className="w-48">
              <div className="h-[1px] bg-[#1a1a1a]/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  className="h-full bg-[#1a1a1a]/40"
                />
              </div>
              
              {/* Progress percentage */}
              <p className="text-center mt-6 text-[11px] tracking-[0.2em] text-[#1a1a1a]/30 font-light">
                {displayProgress}%
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-12 text-[10px] tracking-[0.15em] text-[#1a1a1a]/25 uppercase"
          >
            Excellence in Law
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

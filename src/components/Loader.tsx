"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const assets = ["/video1.mp4", "/video2.mp4"];
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / assets.length) * 100);
      setProgress(newProgress);

      if (loadedCount === assets.length) {
        // All assets loaded, exit loader
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(onComplete, 400); // Wait for exit animation
        }, 300);
      }
    };

    // Preload videos
    assets.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.oncanplaythrough = updateProgress;
      video.onerror = updateProgress; // Continue even if error
      video.load();
    });

    // Fallback timeout in case videos take too long
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(onComplete, 400);
      }, 300);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <Image
                src="/logo.png"
                alt="M&S Law Ltd"
                width={180}
                height={72}
                className="h-16 w-auto"
                priority
              />
            </motion.div>

            {/* Minimal Progress Bar */}
            <div className="w-48 h-[1px] bg-black/10 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-[#1a1a1a]"
              />
            </div>

            {/* Progress Number */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-[11px] tracking-[0.15em] text-black/40 tabular-nums"
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

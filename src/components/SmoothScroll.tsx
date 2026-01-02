"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

// Detect if smooth scroll should be disabled
const shouldDisableSmoothScroll = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  
  // Check device capabilities
  const nav = navigator as Navigator & { 
    deviceMemory?: number; 
    hardwareConcurrency?: number;
  };
  
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 2;
  const lowCores = nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 2;
  
  // Touch devices often have issues with custom smooth scroll
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isLowEndMobile = isTouchDevice && (lowMemory || lowCores);
  
  return isLowEndMobile;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check if smooth scroll should be disabled
    const disabled = shouldDisableSmoothScroll();
    setIsDisabled(disabled);
    
    if (disabled) {
      // Use native smooth scroll for low-end devices
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    // Initialize Lenis for smooth scrolling with adaptive settings
    const isMobile = window.innerWidth < 768;
    
    lenisRef.current = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Faster on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1,
      touchMultiplier: 1.5,
    });

    let animationId: number;
    let lastTime = 0;
    const minFrameTime = 1000 / 60; // Cap at 60fps

    function raf(time: number) {
      // Throttle to prevent excessive updates
      if (time - lastTime >= minFrameTime) {
        lenisRef.current?.raf(time);
        lastTime = time;
      }
      animationId = requestAnimationFrame(raf);
    }

    animationId = requestAnimationFrame(raf);

    // Handle visibility changes - pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenisRef.current?.stop();
      } else {
        lenisRef.current?.start();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

// Dynamic import Loader to avoid hydration issues with browser extensions
const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// Lazy load Background3D for better initial load performance
const Background3D = dynamic(() => import("@/components/Background3D"), { 
  ssr: false,
  loading: () => null,
});
import SmoothScroll from "@/components/SmoothScroll";
import FloatingNav from "@/components/FloatingNav";

// Detect reduced motion preference
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setReducedMotion(prefersReducedMotion());
    
    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Memoize transition config for performance
  const fadeTransition = useMemo(() => ({
    duration: reducedMotion ? 0.2 : 0.8, 
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  }), [reducedMotion]);

  return (
    <>
      {isMounted && <Loader onComplete={() => setIsLoaded(true)} />}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fadeTransition}
          >
            <SmoothScroll>
              {/* 3D Animated Background - conditionally rendered */}
              {!reducedMotion && <Background3D />}
              
              {/* Floating Pill Navigation */}
              <FloatingNav />
              
              <Navbar />
              <main className="relative z-10">
                <Hero />
                <div id="services">
                  <Services />
                </div>
                <div id="about">
                  <About />
                </div>
                <Testimonials />
                <div id="contact">
                  <Contact />
                </div>
              </main>
              <Footer />
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

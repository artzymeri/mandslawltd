"use client";

import { useState, useEffect } from "react";
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
import Background3D from "@/components/Background3D";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingNav from "@/components/FloatingNav";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && <Loader onComplete={() => setIsLoaded(true)} />}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SmoothScroll>
              {/* 3D Animated Background */}
              <Background3D />
              
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

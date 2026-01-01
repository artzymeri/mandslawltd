"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setIsLoaded(true)} />
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3D Animated Background */}
            <Background3D />
            
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <Services />
              <About />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

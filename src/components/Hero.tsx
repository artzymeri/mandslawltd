"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Hero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  const handleVideo1End = () => {
    setActiveVideo(2);
    video2Ref.current?.play();
  };

  const handleVideo2End = () => {
    setActiveVideo(1);
    video1Ref.current?.play();
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={video1Ref}
          src="/video1.mp4"
          muted
          playsInline
          autoPlay
          onEnded={handleVideo1End}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
        <video
          ref={video2Ref}
          src="/video2.mp4"
          muted
          playsInline
          onEnded={handleVideo2End}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === 2 ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Minimal Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content - Centered, Minimal */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-sm tracking-[0.2em] uppercase mb-6"
        >
          Solicitors in Lancashire
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight leading-[1.1] mb-8"
        >
          Legal excellence,
          <br />
          <span className="text-white/80">simplified.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Decades of expertise in Wills & Trusts, Personal Injury, Housing, and more. 
          Based in Blackburn, serving all of Lancashire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/contact" 
            className="group inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-8 py-4 rounded-full font-medium text-[15px] transition-all hover:scale-105"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="tel:01254404055" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white px-8 py-4 font-medium text-[15px] transition-colors"
          >
            Call 01254 40 40 55
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

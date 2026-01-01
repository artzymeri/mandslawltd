"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const handleVideo1End = () => {
    setActiveVideo(2);
    video2Ref.current?.play();
  };

  const handleVideo2End = () => {
    setActiveVideo(1);
    video1Ref.current?.play();
  };

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block"
        style={{ transformOrigin: "bottom" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: isMobile ? 0 : y, scale: isMobile ? 1 : scale }}
      >
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
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </motion.div>

      {/* Content - Centered, Premium */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto will-change-transform"
        style={{ 
          y: isMobile ? 0 : textY,
          opacity,
        }}
      >
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-amber-200/60 text-sm tracking-[0.3em] uppercase mb-8 font-light"
        >
          Solicitors in Lancashire
        </motion.p>

        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight leading-[1.1] mb-4 font-serif"
        >
          <span className="block overflow-hidden">
            {splitText("Legal excellence,")}
          </span>
        </motion.h1>

        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-10 font-serif"
        >
          <span className="block overflow-hidden text-gradient">
            {splitText("simplified.")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Decades of expertise in Wills & Trusts, Personal Injury, Housing, and more. 
          Based in Blackburn, serving all of Lancashire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link 
            href="/contact" 
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-5 rounded-full font-medium text-[15px] transition-all hover:shadow-[0_20px_50px_rgba(194,159,97,0.3)] overflow-hidden btn-premium"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="tel:01254404055" 
            className="group inline-flex items-center gap-3 text-white/80 hover:text-white px-10 py-5 font-medium text-[15px] transition-all border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Call 01254 40 40 55
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Premium */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        style={{ opacity }}
      >
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-8 left-8 w-24 h-24 border-l border-t border-white/10"
        style={{ opacity }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-white/10"
        style={{ opacity }}
      />
    </section>
  );
}

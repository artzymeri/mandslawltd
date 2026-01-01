"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse tracking for subtle parallax
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

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

  const y = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 1.15]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);

  const handleVideo1End = () => {
    setActiveVideo(2);
    video2Ref.current?.play();
  };

  const handleVideo2End = () => {
    setActiveVideo(1);
    video1Ref.current?.play();
  };

  // Staggered character reveal animation
  const headlineText = "Legal excellence";
  const subText = "simplified.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const renderAnimatedText = (text: string, className: string) => {
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`inline-block ${className}`}
        style={{ overflow: "visible" }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
            style={{ 
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ 
          y: isMobile ? 0 : y, 
          scale: isMobile ? 1 : scale,
          x: isMobile ? 0 : mousePosition.x * 0.5,
        }}
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
        
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </motion.div>

      {/* Animated grain overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content - Centered, Cinematic */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto will-change-transform"
        style={{ 
          y: isMobile ? 0 : textY,
          opacity,
          x: isMobile ? 0 : mousePosition.x * -0.3,
        }}
      >
        {/* Pre-headline badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5 mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-white/60 text-sm tracking-[0.15em] uppercase">
            Solicitors in Lancashire
          </span>
        </motion.div>

        {/* Main Headline with Staggered Character Reveal */}
        <div className="mb-6 perspective-1000">
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-medium text-white tracking-tight leading-[0.9]" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {renderAnimatedText(headlineText, "")}
          </h1>
        </div>

        <div className="mb-12 perspective-1000">
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-medium tracking-tight leading-[1.1]" style={{ fontFamily: "var(--font-playfair), serif" }}>
            <motion.span
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{ transitionDelay: "0.5s", overflow: "visible" }}
            >
              {subText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent"
                  style={{ 
                    transformOrigin: "bottom center",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/50 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-light"
        >
          Decades of expertise in Wills & Trusts, Personal Injury, Housing, and more.
          <br className="hidden md:block" />
          Based in Blackburn, serving all of Lancashire.
        </motion.p>

        {/* CTAs with Magnetic Button Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <MagneticButton 
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full font-medium text-[15px] transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] overflow-hidden whitespace-nowrap"
            strength={0.4}
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </MagneticButton>

          <MagneticButton 
            href="tel:01254404055"
            className="group inline-flex items-center gap-3 text-white/80 hover:text-white px-8 py-5 font-medium text-[15px] transition-all border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 backdrop-blur-sm whitespace-nowrap"
            strength={0.3}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span>Call 01254 40 40 55</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Corner Frame Accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute top-8 left-8 w-32 h-32"
        style={{ opacity }}
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-8 right-8 w-32 h-32"
        style={{ opacity }}
      >
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-white/20 to-transparent" />
      </motion.div>

      {/* Side text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
        style={{ opacity }}
      >
        <span className="text-white/20 text-[11px] tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180">
          Established 2003
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
        style={{ opacity }}
      >
        <span className="text-white/20 text-[11px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
          SRA Regulated
        </span>
      </motion.div>
    </section>
  );
}

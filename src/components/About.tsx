"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MapPin, Clock, Car, Shield, Award, CheckCircle } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const stats = [
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 5.0, suffix: "", label: "Google Rating", decimal: true },
  { value: 100, suffix: "%", label: "Client Focused" },
];

const features = [
  { icon: MapPin, text: "Based in Blackburn, Lancashire" },
  { icon: Car, text: "Easy motorway access & parking" },
  { icon: Shield, text: "SRA Regulated (No. 638816)" },
  { icon: Clock, text: "Responsive & timely service" },
];

const values = [
  "Transparent fixed-fee pricing",
  "No Win No Fee options available",
  "Decades of combined experience",
  "Personalized legal strategies",
];

// Animated counter component with counting up effect
function AnimatedCounter({ value, suffix = "", decimal = false }: { value: number; suffix?: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        setCount(value * eased);

        if (currentStep >= steps) {
          setCount(value);
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : Math.round(count)}{suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects - image moves slower than content
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["10%", "-10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-5%", "5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 lg:py-40 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content - Left Side */}
          <motion.div
            style={{ y: contentY, willChange: isMobile ? "auto" : "transform" }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-[2px] bg-gradient-to-r from-amber-500 to-amber-600 mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-amber-500/60 text-sm tracking-[0.3em] uppercase mb-4"
            >
              About Us
            </motion.p>
            
            {/* Massive headline with "Trust" in gold italics */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight mb-8 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              A firm you can{" "}
              <span 
                className="italic bg-gradient-to-r from-amber-400 via-amber-500 to-[#E67E22] bg-clip-text text-transparent"
              >
                trust
              </span>
            </motion.h2>
            
            <div className="space-y-5 text-white/50 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                M&S Law is based in Blackburn with easy motorway access and ample parking. 
                We are a friendly and approachable firm with many decades of experience 
                across different areas of law.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Whether you need assistance with Wills, Trusts, Estate Planning, Probate Disputes, 
                Family Law, Housing Disrepair, Personal Injury, or Industrial Disease — our team 
                of highly qualified solicitors would be delighted to help.
              </motion.p>
            </div>

            {/* Values list */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{value}</span>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-14 pt-12 border-t border-white/10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/30 group-hover:bg-amber-500/5 transition-all">
                    <feature.icon className="w-5 h-5 text-amber-500/70" />
                  </div>
                  <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Parallax Image + Stats */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY, willChange: isMobile ? "auto" : "transform" }}
            className="relative"
          >
            {/* Main image with parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
              style={{ scale: isMobile ? 1 : imageScale }}
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-amber-500/20 rounded-[40px]" />
              <div className="absolute -inset-8 border border-amber-500/10 rounded-[48px]" />
              
              {/* Image container */}
              <div className="relative rounded-[32px] overflow-hidden aspect-[4/5]">
                <Image
                  src="/about-image.jpg"
                  alt="M&S Law Office"
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                        className="text-center"
                      >
                        <p 
                          className="text-3xl md:text-4xl font-medium text-white mb-1"
                          style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
                        </p>
                        <p className="text-white/40 text-xs tracking-wider uppercase">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-[0_20px_60px_rgba(194,159,97,0.4)]"
            >
              <div className="text-center">
                <Award className="w-8 h-8 text-white mx-auto mb-1" />
                <span className="text-white/90 text-[10px] font-medium tracking-wide">SRA REGULATED</span>
              </div>
            </motion.div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -right-4 top-1/4 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 max-w-[200px] hidden lg:block"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-amber-500" />
                ))}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                "Professional, courteous, and kept me informed throughout."
              </p>
              <p className="mt-2 text-[10px] text-white/30">— Verified Client</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";

// GPU-optimized transition
const gpuTransition = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };
import { MapPin, Clock, Car, Shield, Users, Building, Award, CheckCircle } from "lucide-react";
import { useRef, useEffect, useState, useMemo } from "react";

const stats = [
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 5.0, suffix: "", label: "Google Rating", decimal: true },
  { value: 100, suffix: "%", label: "Client Focused" },
];

const features = [
  { icon: MapPin, text: "Based in Blackburn, Lancashire" },
  { icon: Car, text: "Easy motorway access & parking" },
  { icon: Building, text: "Meeting room facilities available" },
  { icon: Shield, text: "SRA Regulated (No. 638816)" },
];

const values = [
  "Transparent fixed-fee pricing",
  "No Win No Fee options available",
  "Decades of combined experience",
  "Personalized legal strategies",
];

// Animated counter component
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

  // Only use parallax on desktop
  const leftY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["3%", "-3%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-3%", "3%"]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#fafafa] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-50/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content - Left Side */}
          <motion.div
            style={{ y: leftY, willChange: isMobile ? "auto" : "transform" }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-[1px] bg-gradient-to-r from-amber-500 to-amber-600 mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-amber-600/70 text-sm tracking-[0.3em] uppercase mb-4"
            >
              About Us
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1a1a1a] tracking-tight mb-8 font-serif"
            >
              A firm you can <span className="text-gradient">trust</span>
            </motion.h2>
            
            <div className="space-y-5 text-[#1a1a1a]/60 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                M&S Law is based in Blackburn with easy motorway access and ample parking. 
                We are a friendly and approachable firm with many decades of experience 
                across different areas of law.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Whether you need assistance with Wills, Trusts, Estate Planning, Probate Disputes, 
                Family Law, Housing Disrepair, Personal Injury, or Industrial Disease — our team 
                of highly qualified solicitors would be delighted to help.
              </motion.p>
            </div>

            {/* Values list */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-amber-600" />
                  </div>
                  <span className="text-sm text-[#1a1a1a]/70">{value}</span>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-12 pt-10 border-t border-black/5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center group-hover:shadow-md group-hover:border-amber-500/20 transition-all">
                    <feature.icon className="w-5 h-5 text-amber-600/70" />
                  </div>
                  <span className="text-sm text-[#1a1a1a]/70">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats - Right Side */}
          <motion.div
            style={{ y: rightY, willChange: isMobile ? "auto" : "transform" }}
            className="relative"
          >
            {/* Main stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10 rounded-[40px] blur-2xl" />
              
              <div className="relative bg-[#0a0a0a] rounded-[32px] p-10 md:p-14 text-white overflow-hidden">
                {/* Background pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />

                <div className="relative z-10 space-y-10">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                      className="border-b border-white/10 pb-10 last:border-0 last:pb-0"
                    >
                      <p className="text-6xl md:text-7xl font-medium tracking-tight mb-3 font-serif">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
                      </p>
                      <p className="text-white/40 text-sm tracking-[0.2em] uppercase">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Award badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(194,159,97,0.4)]"
                >
                  <div className="text-center">
                    <Award className="w-8 h-8 text-white mx-auto mb-1" />
                    <span className="text-white/90 text-xs font-medium">SRA Regulated</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -right-8 bottom-20 bg-white/80 rounded-2xl p-6 shadow-xl max-w-xs border border-black/5 hidden lg:block"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                "Professional, courteous, and always kept me informed throughout the process."
              </p>
              <p className="mt-3 text-xs text-[#1a1a1a]/40">— Satisfied Client</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

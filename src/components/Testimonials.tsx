"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Shaun Connolly",
    text: "Having dealt with M&S Law with my hearing claim from British Coal i can say i was treated with professionalism, courtesy and care. Naeem was always on the phone letting me know how things were progressing. I would highly recommend this firm.",
    role: "Industrial Hearing Claim",
  },
  {
    name: "Gwil Davies",
    text: "First class service... well informed throughout... have recommended to my work colleagues without hesitation... thank you guys great job.",
    role: "Work Illness Client",
  },
  {
    name: "Keith White",
    text: "Very helpful dealing with an industrial hearing loss claim. Very thorough hearing test conducted at home, and a successful result in the end.",
    role: "Hearing Loss Claim",
  },
  {
    name: "Margaret Thompson",
    text: "Exceptional legal support during a difficult time. The team guided me through every step of my housing disrepair claim with patience and expertise. Couldn't have asked for better representation.",
    role: "Housing Disrepair Client",
  },
  {
    name: "David Richardson",
    text: "Professional, responsive and genuinely caring. M&S Law handled my personal injury case with remarkable efficiency. Settlement exceeded my expectations.",
    role: "Personal Injury Client",
  },
  {
    name: "Susan Clarke",
    text: "Absolutely brilliant service from start to finish. They made the legal process straightforward and kept me updated at every stage. Highly recommend to anyone.",
    role: "Will & Trust Client",
  },
  {
    name: "James Mitchell",
    text: "Outstanding firm. They took the stress out of what could have been a nightmare. Compassionate approach and excellent results. Five stars well deserved.",
    role: "Industrial Disease Claim",
  },
];

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-[400px] md:w-[450px] p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group">
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
        ))}
      </div>

      {/* Quote */}
      <p 
        className="text-white/70 text-base leading-relaxed mb-8 line-clamp-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div>
        <p className="text-white font-medium text-sm">
          {testimonial.name}
        </p>
        <p className="text-white/40 text-xs mt-1">
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

// Infinite Marquee Component
function InfiniteMarquee({ 
  children, 
  direction = "left", 
  speed = 30,
  isPaused = false 
}: { 
  children: React.ReactNode; 
  direction?: "left" | "right";
  speed?: number;
  isPaused?: boolean;
}) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Metallic Stats Bar with Shine Effect
function MetallicStatsBar() {
  const [shinePosition, setShinePosition] = useState(-100);

  useEffect(() => {
    const interval = setInterval(() => {
      setShinePosition(-100);
      const animation = setInterval(() => {
        setShinePosition((prev) => {
          if (prev >= 200) {
            clearInterval(animation);
            return 200;
          }
          return prev + 4;
        });
      }, 16);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "100+", label: "Happy Clients" },
    { value: "5.0", label: "Google Rating" },
    { value: "SRA", label: "Regulated" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] border-t border-b border-white/[0.08] py-8">
      {/* Shine effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent)`,
          transform: `translateX(${shinePosition}%)`,
          transition: "none",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 flex items-center justify-center gap-8 md:gap-16">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex items-center gap-8 md:gap-16">
            <div className="text-center">
              <p 
                className="text-2xl md:text-3xl font-medium text-white tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {stat.value}
              </p>
              <p className="text-white/40 text-xs md:text-sm mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
            {index < stats.length - 1 && (
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Split testimonials into two rows
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4).concat(testimonials.slice(0, 3));

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Vignette overlay - left */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      
      {/* Vignette overlay - right */}
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Trusted by our clients
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
          </div>
          <span className="text-white/50">5.0 on Google</span>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        ref={containerRef}
        className="space-y-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* First Row - moves left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <InfiniteMarquee direction="left" speed={50} isPaused={isPaused}>
            {firstRow.map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </InfiniteMarquee>
        </motion.div>

        {/* Second Row - moves right (opposite direction for visual interest) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InfiniteMarquee direction="right" speed={60} isPaused={isPaused}>
            {secondRow.map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
            ))}
          </InfiniteMarquee>
        </motion.div>
      </div>

      {/* Metallic Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-24"
      >
        <MetallicStatsBar />
      </motion.div>
    </section>
  );
}

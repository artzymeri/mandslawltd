"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// GPU-optimized transition
const gpuTransition = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

const services = [
  {
    title: "Wills & Trusts",
    description: "Protect your legacy with professionally prepared wills and trusts that ensure your wishes are honoured.",
    href: "/wills-and-trusts",
    image: "/our-expertise/wills-and-trusts.jpg",
    accent: "from-amber-500/20 to-amber-700/20",
  },
  {
    title: "Work Illness",
    description: "Expert guidance for workplace injury and illness claims. We help you get the compensation you deserve.",
    href: "/work-related-illness",
    image: "/our-expertise/work-illness.jpg",
    accent: "from-rose-500/20 to-rose-700/20",
  },
  {
    title: "Housing Disrepair",
    description: "Living in poor conditions? We ensure your landlord fulfils their legal obligations to you.",
    href: "/housing-disrepair",
    image: "/our-expertise/house-disrepair.jpg",
    accent: "from-blue-500/20 to-blue-700/20",
  },
  {
    title: "Personal Injury",
    description: "From road accidents to workplace incidents, we handle all personal injury claims with care.",
    href: "/personal-injury",
    image: "/our-expertise/personal-injury.jpg",
    accent: "from-emerald-500/20 to-emerald-700/20",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background effects - static for performance */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Section Header */}
      <div className="relative text-center py-24 px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-8"
        />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-amber-500/60 text-sm tracking-[0.3em] uppercase mb-4"
        >
          What We Do
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight font-serif"
        >
          Our expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 text-lg max-w-2xl mx-auto mt-6"
        >
          Comprehensive legal services tailored to protect your interests and secure your future.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={service.href} className="block group">
                <motion.div 
                  className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/5"
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.3, ...gpuTransition }}
                  style={{ willChange: isMobile ? "auto" : "transform" }}
                >
                  {/* Background Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: "inset 0 0 60px rgba(194, 159, 97, 0.2)",
                    }}
                  />

                  {/* Animated border glow */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    {/* Number indicator */}
                    <motion.span
                      className="text-white/20 text-7xl font-serif absolute -top-16 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-4"
                    >
                      0{index + 1}
                    </motion.span>

                    <motion.h3
                      className="text-3xl md:text-4xl font-medium text-white mb-4 font-serif"
                    >
                      {service.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-white/60 leading-relaxed text-base md:text-lg max-w-md"
                    >
                      {service.description}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                      className="mt-6 inline-flex items-center gap-2 text-amber-400/80 group-hover:text-amber-400 transition-colors"
                    >
                      <span className="text-sm tracking-wide">Learn More</span>
                      <ArrowUpRight 
                        size={18} 
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                      />
                    </motion.div>
                  </div>

                  {/* Hover reveal line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

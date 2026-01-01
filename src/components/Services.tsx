"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const services = [
  {
    title: "Wills & Trusts",
    description: "Protect your legacy with professionally prepared wills and trusts that ensure your wishes are honoured.",
    href: "/wills-and-trusts",
    image: "/our-expertise/wills-and-trusts.jpg",
    color: "#c29f61",
  },
  {
    title: "Work Illness",
    description: "Expert guidance for workplace injury and illness claims. We help you get the compensation you deserve.",
    href: "/work-related-illness",
    image: "/our-expertise/work-illness.jpg",
    color: "#E67E22",
  },
  {
    title: "Housing Disrepair",
    description: "Living in poor conditions? We ensure your landlord fulfils their legal obligations to you.",
    href: "/housing-disrepair",
    image: "/our-expertise/house-disrepair.jpg",
    color: "#c29f61",
  },
  {
    title: "Personal Injury",
    description: "From road accidents to workplace incidents, we handle all personal injury claims with care.",
    href: "/personal-injury",
    image: "/our-expertise/personal-injury.jpg",
    color: "#E67E22",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Horizontal scroll effect - only on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate how much to translate based on number of cards
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", isMobile ? "0%" : "-75%"]
  );

  // Parallax for header
  const headerY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Mobile version - vertical scroll
  if (isMobile) {
    return (
      <section className="relative bg-[#0a0a0a] py-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-[120px]" />
        </div>

        {/* Section Header */}
        <div className="relative text-center px-6 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500/60 text-sm tracking-[0.3em] uppercase mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium text-white tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Our Expertise
          </motion.h2>
        </div>

        {/* Mobile Cards */}
        <div className="px-6 space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={service.href} className="block group">
                <div className="relative h-[350px] rounded-3xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 
                      className="text-2xl font-medium text-white mb-2 transition-colors duration-300 group-hover:text-[#E67E22]"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm">{service.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop version - horizontal scroll
  return (
    <section 
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: "400vh" }} // Extra height for scroll pinning
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background effects */}
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
            backgroundSize: '80px 80px',
          }}
        />

        {/* Fixed Header - fades out as you scroll */}
        <motion.div 
          className="absolute top-0 left-0 right-0 z-20 pt-32 px-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-amber-500/60 text-sm tracking-[0.3em] uppercase mb-4"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl lg:text-7xl font-medium text-white tracking-tight mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Our Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-xl"
            >
              Comprehensive legal services tailored to protect your interests.
            </motion.p>
          </div>
        </motion.div>

        {/* Horizontal scroll cards */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-8 px-12 pt-20"
          style={{ x }}
        >
          {/* Spacer for header */}
          <div className="w-[500px] shrink-0" />

          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="shrink-0"
            >
              <Link href={service.href} className="block group">
                <div className="relative w-[450px] h-[600px] rounded-[32px] overflow-hidden bg-[#111]">
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className={`object-cover transition-all duration-700 ${
                        hoveredIndex === index ? "scale-110" : "scale-100"
                      }`}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-20" : "opacity-0"
                    }`} style={{ backgroundColor: service.color }} />
                  </div>

                  {/* Card number */}
                  <div className="absolute top-8 right-8">
                    <span className="text-white/10 text-[120px] font-medium leading-none" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-10">
                    <motion.div
                      className={`w-12 h-[2px] mb-6 transition-all duration-500 ${
                        hoveredIndex === index ? "w-24" : "w-12"
                      }`}
                      style={{ backgroundColor: hoveredIndex === index ? service.color : "rgba(255,255,255,0.2)" }}
                    />
                    
                    <h3 
                      className={`text-4xl font-medium mb-4 transition-colors duration-500 ${
                        hoveredIndex === index ? "" : "text-white"
                      }`}
                      style={{ 
                        fontFamily: "var(--font-playfair), serif",
                        color: hoveredIndex === index ? service.color : undefined,
                      }}
                    >
                      {service.title}
                    </h3>
                    
                    <p className="text-white/50 text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3 text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm tracking-wide">Learn More</span>
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        hoveredIndex === index 
                          ? "border-[#E67E22] bg-[#E67E22]/10" 
                          : "border-white/20"
                      }`}>
                        <ArrowUpRight 
                          size={18} 
                          className={`transition-transform duration-300 ${
                            hoveredIndex === index ? "translate-x-0.5 -translate-y-0.5" : ""
                          }`}
                          style={{ color: hoveredIndex === index ? service.color : undefined }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom border accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1"
                    style={{ backgroundColor: service.color }}
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIndex === index ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* End spacer */}
          <div className="w-[200px] shrink-0" />
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
          <span className="text-white/30 text-xs">
            {services.length} Services
          </span>
        </div>

        {/* Side navigation dots */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {services.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                hoveredIndex === index ? "bg-amber-500 scale-150" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

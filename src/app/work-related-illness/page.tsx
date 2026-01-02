"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Ear, Factory, AlertTriangle, HeartPulse } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";

// Spotlight Card Component
function SpotlightCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl bg-[#1a1a1a]/40 border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(212, 175, 55, 0.15), transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
}

const services = [
  {
    icon: Ear,
    title: "Military Hearing Loss Claims",
    description: "Dedicated support for MOD personnel and veterans suffering from noise-induced hearing loss.",
    href: "/work-related-illness/military-hearing-loss-claims",
  },
  {
    icon: Factory,
    title: "Industrial Deafness Claims",
    description: "Compensation claims for hearing loss caused by excessive noise exposure in the workplace.",
    href: "/work-related-illness/industrial-deafness-claims",
  },
  {
    icon: AlertTriangle,
    title: "Asbestos Solicitors",
    description: "Expert legal representation for asbestos-related illness claims and compensation.",
    href: "/work-related-illness/asbestos-solicitors",
  },
  {
    icon: HeartPulse,
    title: "Mesothelioma Solicitors",
    description: "Specialist support for mesothelioma victims and their families seeking justice.",
    href: "/work-related-illness/mesothelioma-solicitors",
  },
];

export default function WorkRelatedIllnessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
          >
            <HeartPulse size={16} className="text-amber-500" />
            <span className="text-amber-500 text-sm font-medium">Our Expertise</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Work Related{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Illness
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Expert legal support for those suffering from work-related illnesses and industrial diseases. 
            We fight for the compensation you deserve.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <SpotlightCard className="h-full p-8 group cursor-pointer">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-6">
                      <service.icon size={28} className="text-amber-500" />
                    </div>
                    
                    <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/70 mb-6">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-amber-500 font-medium">
                      Learn More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Heart, Stethoscope, Building2, Phone, Users, Scale } from "lucide-react";
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

export default function MesotheliomaSolicitorsPage() {
  const keyFacts = [
    { stat: "3,000+", label: "UK diagnoses per year" },
    { stat: "20-40", label: "Years for symptoms" },
    { stat: "100%", label: "Caused by asbestos" },
    { stat: "No Win", label: "No Fee service" },
  ];

  const affectedAreas = [
    { 
      icon: Heart, 
      title: "Pleural Mesothelioma", 
      description: "Affects the lining of the lungs (most common type)" 
    },
    { 
      icon: Heart, 
      title: "Pericardial Mesothelioma", 
      description: "Affects the lining around the heart" 
    },
    { 
      icon: Stethoscope, 
      title: "Peritoneal Mesothelioma", 
      description: "Affects the lining of the abdomen" 
    },
  ];

  const compensationCovers = [
    { icon: Stethoscope, title: "Medical Treatment", description: "All medication and treatment costs" },
    { icon: Building2, title: "Travel Costs", description: "Hospital visits and appointments" },
    { icon: Scale, title: "Loss of Earnings", description: "Income lost due to illness" },
    { icon: Users, title: "Family Support", description: "Vital support for affected families" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-white/50 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/work-related-illness" className="hover:text-white transition-colors">Work Related Illness</Link>
            <span>/</span>
            <span className="text-amber-500">Mesothelioma Solicitors</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <AlertTriangle size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Work Related Illness</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Mesothelioma{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Solicitors
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-4">
                Mesothelioma is a rare and aggressive cancer which is caused by inhaling asbestos fibres. 
                It affects the lining of the lungs, heart, and abdomen.
              </p>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Workers in professions where asbestos is used are at the highest risk. The exposure may take 
                20 to 40 years to develop symptoms. Even after many years, you may be entitled to claim.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Enquire Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:01onal254404055"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300"
                >
                  <Phone size={18} />
                  01254 40 40 55
                </a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/mesothelioma-solicitors.jpg"
                  alt="Mesothelioma Solicitors - Asbestos Claims"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle size={24} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">3,000+ Cases/Year</p>
                    <p className="text-white/50 text-sm">In the UK alone</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Facts Section */}
      <section className="relative py-16 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {keyFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-2">
                  {fact.stat}
                </p>
                <p className="text-white/50 text-sm uppercase tracking-wider">{fact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Mesothelioma */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Understanding{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Mesothelioma
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <div className="space-y-4 text-white/70">
                <p>
                  Each year nearly 3,000 people in the UK are diagnosed with this deadly disease. 
                  Unfortunately, there is no cure for cancer caused by asbestos exposure.
                </p>
                <p>
                  Our solicitors at M&S Law are experts in all types of asbestos claims. As the symptoms 
                  of asbestos do not appear even after decades of exposure, many workers cannot diagnose 
                  the real cause of their illness.
                </p>
                <p>
                  We understand the huge impact of this condition on the life of an individual and their 
                  family. We work closely with our clients and help them in providing vital support.
                </p>
              </div>

              <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                  <p className="text-red-400">
                    Even if your employer no longer exists, we can still help you make a claim through 
                    their insurers or government compensation schemes.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="p-8">
                <h3 className="font-serif text-2xl text-white mb-6">Affected Areas</h3>
                <div className="space-y-4">
                  {affectedAreas.map((area, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <area.icon size={24} className="text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{area.title}</h4>
                        <p className="text-white/50 text-sm">{area.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Compensation Covers */}
      <section className="relative py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              What{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Compensation Covers
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We help victims and their families claim compensation covering all aspects of asbestos 
              illness and its impact on your life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compensationCovers.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4">
                    <item.icon size={28} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mx-auto mb-6">
                <Scale size={32} className="text-amber-500" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                No Win, No Fee
              </h2>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                We understand the financial strain that illness can cause. That's why we offer 
                a No Win, No Fee service, meaning there are no upfront costs and you only pay 
                if your claim is successful.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Start Your Claim
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:01254404055"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300"
                >
                  <Phone size={18} />
                  Call Us: 01254 40 40 55
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

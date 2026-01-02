"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  AlertTriangle, 
  Shield, 
  Phone,
  CheckCircle,
  Stethoscope,
  Factory,
  FileCheck,
  Clock,
  HeartPulse
} from "lucide-react";
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

const conditions = [
  {
    name: "Asbestosis",
    description: "A chronic lung disease caused by inhaling asbestos fibres, leading to scarring of lung tissue."
  },
  {
    name: "Mesothelioma",
    description: "A rare and aggressive form of cancer that develops in the lining of the lungs, abdomen, or heart."
  },
  {
    name: "Pleural Plaques",
    description: "Areas of thickened tissue on the lining of the lungs caused by asbestos exposure."
  },
  {
    name: "Pleural Thickening",
    description: "Scarring and thickening of the lung lining that can cause breathlessness and chest pain."
  },
];

const industries = [
  "Shipbuilding industry",
  "Power stations",
  "Construction",
  "Factories and manufacturing",
];

const benefits = [
  {
    icon: Stethoscope,
    title: "Free Initial Consultation",
    description: "The initial legal consultation is provided free of charge with no obligation of making an asbestos claim through us."
  },
  {
    icon: Shield,
    title: "No Win, No Fee",
    description: "Your claim will be run with a No Win No Fee service, meaning no financial risk to you."
  },
  {
    icon: FileCheck,
    title: "Proven Track Record",
    description: "As a team, we have a proven record of success in receiving compensation for our clients."
  },
];

export default function AsbestosSolicitorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
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
            <span className="text-amber-500">Asbestos Solicitors</span>
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
                Asbestos{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Solicitors
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                A large volume of work-related illnesses have been recorded in industries where asbestos 
                is a part of their work. Workers in the shipbuilding industry, power stations, and other 
                industries/factories where this dreadful substance is used are at high risk of sustaining 
                illnesses as a result of exposure to asbestos.
              </p>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                <strong className="text-white">If you or a loved one has suffered any kind of asbestos-related 
                condition, you have the right to fight for the justice you deserve.</strong>
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
                  href="tel:01254404055"
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
                  src="/images/asbestos-solicitors.jpg"
                  alt="Asbestos Solicitors"
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
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Stethoscope size={24} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Free Consultation</p>
                    <p className="text-white/50 text-sm">No obligation</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Asbestos Conditions Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Common Asbestos-Related{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Conditions
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We handle claims for all types of asbestos-related diseases and conditions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conditions.map((condition, index) => (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="h-full p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center mb-4">
                    <HeartPulse size={24} className="text-red-400" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3">{condition.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{condition.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Risk Industries Section */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                  <Factory size={28} className="text-amber-500" />
                </div>
                <h3 className="font-serif text-2xl text-white">High-Risk Industries</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {industries.map((industry, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <CheckCircle size={18} className="text-amber-500" />
                    <span className="text-white/80">{industry}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* Delayed Effects Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={32} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-4">
                    Delayed Effects of Asbestos Exposure
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    The effect of this harmful substance usually appears <strong className="text-white">many 
                    years after exposure</strong> to asbestos. It may become severe over time.
                  </p>
                  <p className="text-white/70 leading-relaxed mb-4">
                    If you feel that the previous or existing working environment is the reason for 
                    your illness, we will help you to take legal action against the entity responsible 
                    for your health condition.
                  </p>
                  <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <p className="text-amber-400 text-sm">
                      <strong>Diagnosis:</strong> Asbestosis and related conditions are diagnosed through 
                      necessary tests, MRI scans and X-rays to determine if your illness is caused by 
                      asbestos exposure during employment.
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                M&S Law
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our solicitors are specialised in handling asbestos-related disease claims.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="h-full p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon size={28} className="text-amber-500" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
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
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Fight for the Justice You Deserve
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                If you or a loved one has been affected by asbestos exposure, contact our specialist 
                team today for a free, no-obligation consultation.
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
                  01254 40 40 55
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

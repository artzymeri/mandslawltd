"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Briefcase, Shield, CheckCircle, AlertTriangle, Scale, FileText, Wrench, Factory, HardHat, Flame } from "lucide-react";
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

export default function AccidentAtWorkPage() {
  const workplaceAccidents = [
    {
      icon: AlertTriangle,
      title: "Slips, Trips and Falls",
      description: "Wet floors, uneven surfaces, cluttered walkways, and poor lighting.",
    },
    {
      icon: Wrench,
      title: "Machinery Accidents",
      description: "Injuries from defective equipment or lack of proper safety guards.",
    },
    {
      icon: Factory,
      title: "Falling Objects",
      description: "Items falling from height due to improper storage or handling.",
    },
    {
      icon: HardHat,
      title: "Falls from Height",
      description: "Ladder accidents, scaffolding collapses, and roof falls.",
    },
    {
      icon: Flame,
      title: "Burns and Chemical Exposure",
      description: "Contact with hazardous substances or hot materials.",
    },
    {
      icon: Briefcase,
      title: "Manual Handling Injuries",
      description: "Back injuries from lifting, carrying, or repetitive movements.",
    },
    {
      icon: Shield,
      title: "Lack of PPE",
      description: "Injuries due to missing or inadequate personal protective equipment.",
    },
    {
      icon: Scale,
      title: "Inadequate Training",
      description: "Accidents resulting from insufficient safety training.",
    },
  ];

  const employerDuties = [
    "Provide a safe working environment",
    "Conduct regular risk assessments",
    "Provide adequate training and supervision",
    "Supply appropriate personal protective equipment (PPE)",
    "Maintain equipment and machinery properly",
    "Ensure safe systems of work are in place",
    "Report serious accidents to the HSE",
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
            <Link href="/personal-injury" className="hover:text-white transition-colors">Personal Injury</Link>
            <span>/</span>
            <span className="text-amber-500">Accident at Work</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Briefcase size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Personal Injury</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Accident at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Work
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Every year, thousands of workers are injured in preventable workplace accidents. 
                Employers have a legal duty to ensure a safe working environment. If you've been 
                injured at work due to your employer's negligence, you may be entitled to compensation.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Free Claim Assessment
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
                  src="/images/accident-at-work.jpg"
                  alt="Accident at Work Claims"
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
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Scale size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">No Win, No Fee</p>
                    <p className="text-white/50 text-sm">Risk-free claims</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types of Accidents Section */}
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
              Types of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Workplace Accidents
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We handle all types of workplace accident claims, from construction site 
              injuries to office accidents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workplaceAccidents.map((accident, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4">
                    <accident.icon size={24} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{accident.title}</h3>
                  <p className="text-white/50 text-sm">{accident.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Duties Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Your Employer's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Legal Duties
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <p className="text-white/70 mb-8">
                Under the Health and Safety at Work Act 1974 and related regulations, 
                employers have a legal duty to protect the health and safety of their 
                employees. When they fail in these duties, they can be held liable for 
                any injuries that result.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {employerDuties.map((duty, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-amber-500" />
                    </div>
                    <span className="text-white/70">{duty}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                    <FileText size={28} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-xl">Don't Worry About Your Job</h3>
                    <p className="text-white/50">Your rights are protected</p>
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">
                  Many people worry that making a claim against their employer will affect 
                  their job. However, it's illegal for an employer to dismiss or treat you 
                  unfairly for making a legitimate injury claim.
                </p>

                <ul className="space-y-3">
                  {[
                    "Your employment rights are protected by law",
                    "All employers must have liability insurance",
                    "Claims are handled by insurance companies",
                    "We handle everything confidentially",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/70">
                      <ArrowRight size={16} className="text-amber-500 flex-shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Can Claim Section */}
      <section className="relative py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                    What You Can{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                      Claim For
                    </span>
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    If your workplace accident claim is successful, you may be entitled 
                    to compensation for:
                  </p>

                  <ul className="space-y-3">
                    {[
                      "Pain, suffering, and loss of amenity",
                      "Past and future loss of earnings",
                      "Medical treatment and rehabilitation",
                      "Travel expenses to appointments",
                      "Care and assistance costs",
                      "Adaptations to your home or vehicle",
                      "Cost of specialist equipment",
                      "Loss of pension benefits",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle size={12} className="text-amber-500" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/30 rounded-2xl p-8">
                  <h3 className="text-white font-medium text-xl mb-6">Time Limits for Claims</h3>
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-2">
                        3 Years
                      </div>
                      <p className="text-white/70">
                        You have 3 years from the date of your accident to make a claim
                      </p>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm mb-4">
                        In some cases, such as gradual onset conditions, the 3-year period 
                        may start from when you first became aware of your condition.
                      </p>
                      <p className="text-amber-500 text-sm font-medium">
                        Don't delay - contact us today to discuss your claim
                      </p>
                    </div>
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  M&S Law?
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <ul className="space-y-4">
                {[
                  "Specialist workplace injury solicitors with proven track record",
                  "No Win, No Fee - no financial risk to you",
                  "Free initial consultation and case assessment",
                  "We handle all communication with your employer's insurers",
                  "Access to rehabilitation and medical experts",
                  "Maximum compensation for your injuries and losses",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/70">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-amber-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: "600K+", label: "Cases Handled" },
                { number: "98%", label: "Success Rate" },
                { number: "24/7", label: "Support Available" },
                { number: "0", label: "Upfront Costs" },
              ].map((stat, index) => (
                <SpotlightCard key={index} className="p-6 text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </SpotlightCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-[#111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} className="text-amber-500" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Injured at Work?
              </h2>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                If you've been injured at work due to your employer's negligence, 
                you deserve compensation. Contact our specialist workplace injury 
                solicitors today for a free consultation.
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
                  Call: 01254 40 40 55
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, AlertTriangle, Shield, CheckCircle, Scale, FileText, Footprints, Droplets, Eye, Building, ShoppingBag } from "lucide-react";
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

export default function SlipsTripsAndFallsPage() {
  const commonCauses = [
    {
      icon: Droplets,
      title: "Wet or Slippery Floors",
      description: "Spills, leaks, or recently cleaned surfaces without warning signs.",
    },
    {
      icon: AlertTriangle,
      title: "Uneven Surfaces",
      description: "Damaged flooring, potholes, or loose paving slabs.",
    },
    {
      icon: Eye,
      title: "Poor Lighting",
      description: "Inadequate lighting that obscures hazards from view.",
    },
    {
      icon: Footprints,
      title: "Trailing Cables",
      description: "Cables and wires left across walkways.",
    },
    {
      icon: Building,
      title: "Damaged Stairs",
      description: "Broken steps, missing handrails, or worn stair coverings.",
    },
    {
      icon: ShoppingBag,
      title: "Obstructions",
      description: "Items left in walkways or cluttered passages.",
    },
    {
      icon: Shield,
      title: "Inadequate Warnings",
      description: "Failure to use warning signs for known hazards.",
    },
  ];

  const injuryTypes = [
    "Broken bones and fractures",
    "Sprains and strains",
    "Head and brain injuries",
    "Back and spinal injuries",
    "Hip fractures (especially in elderly)",
    "Cuts, bruises, and soft tissue damage",
    "Psychological trauma",
  ];

  const whereAccidentsHappen = [
    "Shops and supermarkets",
    "Restaurants, cafes, and pubs",
    "Workplaces and offices",
    "Public pavements and paths",
    "Car parks",
    "Hotels and leisure facilities",
    "Local authority premises",
    "Private properties",
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
            <span className="text-amber-500">Slips, Trips and Falls</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Footprints size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Personal Injury</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Slips, Trips{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  and Falls
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Slips, trips, and falls are among the most common causes of personal injury in the UK. 
                Whether you've been injured in a shop, workplace, restaurant, or public place, you may 
                be entitled to compensation if the accident was caused by someone else's negligence.
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
                  src="/images/slips-trips-falls.jpg"
                  alt="Slips Trips and Falls Claims"
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

      {/* Common Causes Section */}
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
              Common Causes of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Slip & Trip Accidents
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Many slip, trip, and fall accidents are preventable with proper care 
              and maintenance. When property owners fail in their duty of care, 
              they can be held liable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonCauses.slice(0, 4).map((cause, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4">
                    <cause.icon size={24} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{cause.title}</h3>
                  <p className="text-white/50 text-sm">{cause.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {commonCauses.slice(4).map((cause, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4">
                    <cause.icon size={24} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{cause.title}</h3>
                  <p className="text-white/50 text-sm">{cause.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Injuries and Locations Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard className="p-8 h-full">
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">
                  Common{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    Injuries
                  </span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-6" />
                
                <p className="text-white/70 mb-6">
                  Slip, trip, and fall injuries can range from minor to life-changing. 
                  Common injuries include:
                </p>

                <ul className="space-y-3">
                  {injuryTypes.map((injury, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/70">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle size={14} className="text-red-400" />
                      </div>
                      {injury}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="p-8 h-full">
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">
                  Where Accidents{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    Happen
                  </span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-6" />
                
                <p className="text-white/70 mb-6">
                  We handle claims for slip, trip, and fall accidents in various 
                  locations, including:
                </p>

                <ul className="space-y-3">
                  {whereAccidentsHappen.map((location, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/70">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Building size={14} className="text-amber-500" />
                      </div>
                      {location}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proving Your Claim Section */}
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
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                    <FileText size={16} className="text-amber-500" />
                    <span className="text-amber-500 text-sm font-medium">Evidence Matters</span>
                  </div>
                  
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                    How We Prove{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                      Your Claim
                    </span>
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    To succeed in a slip, trip, or fall claim, we need to show that:
                  </p>

                  <ul className="space-y-4">
                    {[
                      "The property owner or occupier had a duty of care",
                      "They breached that duty through negligence",
                      "Their breach directly caused your accident",
                      "You suffered injuries and losses as a result",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-500 font-bold">{index + 1}</span>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/30 rounded-2xl p-8">
                  <h3 className="text-white font-medium text-xl mb-6">What To Do After An Accident</h3>
                  <ul className="space-y-4">
                    {[
                      "Report the accident and ensure it's recorded",
                      "Take photos of the hazard that caused your fall",
                      "Get contact details of any witnesses",
                      "Seek medical attention as soon as possible",
                      "Keep records of all expenses and losses",
                      "Contact a personal injury solicitor promptly",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <ArrowRight size={16} className="text-amber-500 flex-shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* What You Can Claim Section */}
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
                What You Can{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Claim For
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <p className="text-white/70 mb-6">
                If your claim is successful, you may be entitled to compensation for:
              </p>

              <ul className="space-y-3">
                {[
                  "Pain, suffering, and loss of amenity",
                  "Medical treatment and rehabilitation",
                  "Loss of earnings (past and future)",
                  "Travel expenses to appointments",
                  "Care and assistance from others",
                  "Home adaptations if needed",
                  "Damaged clothing or personal items",
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
            >
              <SpotlightCard className="p-8">
                <h3 className="font-serif text-2xl text-white mb-6">No Win, No Fee Promise</h3>
                <p className="text-white/70 mb-6">
                  We handle all slip, trip, and fall claims on a No Win, No Fee basis. 
                  This means you won't pay anything unless we successfully recover 
                  compensation for you.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "No Upfront Costs", icon: CheckCircle },
                    { label: "Free Consultation", icon: CheckCircle },
                    { label: "No Hidden Fees", icon: CheckCircle },
                    { label: "Risk-Free Claims", icon: CheckCircle },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/70">
                      <item.icon size={18} className="text-amber-500" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
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
                <Footprints size={32} className="text-amber-500" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Had a Slip, Trip or Fall?
              </h2>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                If you've been injured in a slip, trip, or fall accident that wasn't 
                your fault, contact our expert solicitors today for a free, no-obligation 
                consultation. We can help you get the compensation you deserve.
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

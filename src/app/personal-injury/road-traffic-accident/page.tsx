"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Car, Shield, CheckCircle, AlertTriangle, Scale, FileText, Clock, Heart, Stethoscope } from "lucide-react";
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

export default function RoadTrafficAccidentPage() {
  const accidentCauses = [
    "Driver error and negligence",
    "Distractions (mobile phones, in-car systems)",
    "Speeding or reckless driving",
    "Driving under the influence of alcohol or drugs",
    "Poor weather conditions and reduced visibility",
    "Mechanical failure or vehicle defects",
    "Poorly maintained roads or signage",
    "Fatigue or drowsy driving",
  ];

  const claimTypes = [
    {
      icon: Car,
      title: "Car Accidents",
      description: "Claims for injuries as a driver or passenger in a car collision.",
    },
    {
      icon: AlertTriangle,
      title: "Hit and Run",
      description: "Uninsured and untraced driver claims through the MIB.",
    },
    {
      icon: Shield,
      title: "Passenger Claims",
      description: "Injuries sustained as a passenger in any vehicle.",
    },
    {
      icon: Heart,
      title: "Whiplash Injuries",
      description: "Neck and back injuries from impact collisions.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Free Consultation",
      description: "We assess your case and explain your options with no obligation.",
    },
    {
      number: "02",
      title: "Evidence Gathering",
      description: "We collect medical reports, witness statements, and accident evidence.",
    },
    {
      number: "03",
      title: "Claim Submission",
      description: "We submit your claim to the responsible party's insurer.",
    },
    {
      number: "04",
      title: "Negotiation",
      description: "We negotiate the best possible settlement on your behalf.",
    },
    {
      number: "05",
      title: "Compensation",
      description: "You receive your compensation with no upfront costs.",
    },
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
            <span className="text-amber-500">Road Traffic Accident</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Car size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Personal Injury</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Road Traffic{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Accident
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Road traffic accidents are one of the most common causes of personal injury in the UK. 
                If you've been injured in a road accident that wasn't your fault, you may be entitled 
                to compensation for your injuries, financial losses, and the impact on your quality of life.
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
                  src="/images/road-traffic-accident.jpg"
                  alt="Road Traffic Accident Claims"
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

      {/* Claim Types Section */}
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
                RTA Claims
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We handle all types of road traffic accident claims, ensuring you receive 
              the compensation you deserve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4 mx-auto">
                    <type.icon size={28} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{type.title}</h3>
                  <p className="text-white/50 text-sm">{type.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Causes Section */}
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
                Common Causes of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Road Accidents
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <p className="text-white/70 mb-8">
                Road traffic accidents can happen for many reasons, but when another driver's 
                negligence causes your injuries, you have the right to claim compensation.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {accidentCauses.map((cause, index) => (
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
                    <span className="text-white/70">{cause}</span>
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
                    <Stethoscope size={28} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-xl">After an Accident</h3>
                    <p className="text-white/50">What you should do</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {[
                    "Seek medical attention immediately",
                    "Report the accident to police if required",
                    "Exchange details with other parties",
                    "Gather evidence (photos, witnesses)",
                    "Don't admit fault or apologize",
                    "Contact a personal injury solicitor",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/70">
                      <span className="text-amber-500 font-medium">{index + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Claims Process Section */}
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
              Our Claims{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Process
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We make the claims process as simple and stress-free as possible, 
              handling everything on your behalf.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full text-center">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-white font-medium mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Claim Section */}
      <section className="relative py-20">
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
                    A successful road traffic accident claim can include compensation for:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Pain and suffering (general damages)",
                      "Medical treatment and rehabilitation costs",
                      "Loss of earnings (past and future)",
                      "Travel expenses to medical appointments",
                      "Vehicle repair or replacement costs",
                      "Care and assistance from family members",
                      "Psychological trauma and mental health support",
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
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Clock, label: "Time Limit", value: "3 Years" },
                    { icon: FileText, label: "No Win No Fee", value: "100%" },
                    { icon: Shield, label: "Free Consultation", value: "Always" },
                    { icon: Heart, label: "Success Rate", value: "High" },
                  ].map((stat, index) => (
                    <div key={index} className="bg-black/30 rounded-xl p-6 text-center">
                      <stat.icon size={24} className="text-amber-500 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/50 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
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
                <Car size={32} className="text-amber-500" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Injured in a Road Accident?
              </h2>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Get the compensation you deserve. Contact our experienced road traffic accident 
                solicitors today for a free consultation. No Win, No Fee.
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Users, Shield, CheckCircle, AlertTriangle, Scale, FileText, Heart, Car, Eye, Clock, Stethoscope } from "lucide-react";
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

export default function PedestrianClaimsPage() {
  const accidentCauses = [
    {
      icon: Car,
      title: "Speeding Drivers",
      description: "Vehicles travelling too fast to stop in time.",
    },
    {
      icon: Eye,
      title: "Distracted Driving",
      description: "Drivers using phones or not paying attention.",
    },
    {
      icon: AlertTriangle,
      title: "Failure to Give Way",
      description: "Not stopping at crossings or junctions.",
    },
    {
      icon: Clock,
      title: "Poor Visibility",
      description: "Low light conditions or adverse weather.",
    },
  ];

  const commonInjuries = [
    "Head and brain injuries",
    "Broken bones and fractures",
    "Spinal cord injuries",
    "Internal organ damage",
    "Soft tissue injuries",
    "Psychological trauma and PTSD",
    "Fatal injuries",
  ];

  const whatWeDo = [
    {
      icon: FileText,
      title: "Investigate the Accident",
      description: "We gather CCTV footage, witness statements, and police reports.",
    },
    {
      icon: Stethoscope,
      title: "Arrange Medical Assessment",
      description: "We arrange independent medical examinations to assess your injuries.",
    },
    {
      icon: Scale,
      title: "Build Your Case",
      description: "We prepare a comprehensive claim for maximum compensation.",
    },
    {
      icon: Heart,
      title: "Support Your Recovery",
      description: "We can arrange rehabilitation and support services.",
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
            <span className="text-amber-500">Pedestrian Claims</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Users size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Personal Injury</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Pedestrian{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Claims
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Pedestrians are among the most vulnerable road users. When a vehicle 
                collides with a pedestrian, the consequences are often severe. If you've 
                been injured while walking, jogging, or crossing the road due to a driver's 
                negligence, our specialist solicitors can help you claim compensation.
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
                  src="/images/pedestrian-claims.jpg"
                  alt="Pedestrian Accident Claims"
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
                    <Shield size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Expert Solicitors</p>
                    <p className="text-white/50 text-sm">Pedestrian specialists</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accident Causes Section */}
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
                Pedestrian Accidents
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Most pedestrian accidents are caused by driver negligence. When a 
              driver fails in their duty of care, they can be held liable for 
              your injuries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accidentCauses.map((cause, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4 mx-auto">
                    <cause.icon size={28} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{cause.title}</h3>
                  <p className="text-white/50 text-sm">{cause.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Injuries Section */}
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
                Pedestrian{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Injuries
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <p className="text-white/70 mb-8">
                Without the protection of a vehicle, pedestrians often suffer severe 
                injuries when struck by a car, van, or other vehicle. The impact can 
                cause life-changing injuries that require extensive treatment and 
                rehabilitation.
              </p>

              <ul className="space-y-3">
                {commonInjuries.map((injury, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/70">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle size={14} className="text-red-400" />
                    </div>
                    {injury}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="p-8">
                <h3 className="font-serif text-2xl text-white mb-6">
                  Understanding Your Injuries
                </h3>
                <p className="text-white/70 mb-6">
                  A full understanding of your injuries is essential to ensure you 
                  receive appropriate compensation. We arrange thorough medical 
                  assessments to document:
                </p>
                
                <ul className="space-y-4">
                  {[
                    "The nature and severity of your injuries",
                    "Expected recovery time and prognosis",
                    "Long-term effects and ongoing care needs",
                    "Impact on your ability to work",
                    "Psychological effects and mental health",
                    "Required treatment and rehabilitation",
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

      {/* How We Help Section */}
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
              How We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Help You
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our experienced pedestrian accident solicitors handle every aspect 
              of your claim, allowing you to focus on your recovery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeDo.map((item, index) => (
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
                    A successful pedestrian accident claim can compensate you for:
                  </p>

                  <ul className="space-y-3">
                    {[
                      "Pain, suffering, and loss of amenity",
                      "Medical treatment and rehabilitation costs",
                      "Past and future loss of earnings",
                      "Travel expenses for medical appointments",
                      "Care and assistance costs",
                      "Adaptations to your home or vehicle",
                      "Psychological counselling and support",
                      "Funeral costs in fatal accident cases",
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
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                      <Scale size={16} className="text-amber-500" />
                      <span className="text-amber-500 text-sm font-medium">No Win, No Fee</span>
                    </div>
                    <h3 className="text-white font-medium text-xl mb-2">Risk-Free Claims</h3>
                    <p className="text-white/50">
                      You won't pay anything unless we win your case
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Time Limit", value: "3 Years" },
                      { label: "Consultation", value: "Free" },
                      { label: "Upfront Costs", value: "£0" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-white/70">{item.label}</span>
                        <span className="text-amber-500 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* Hit and Run Section */}
      <section className="relative py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Hit and Run{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Accidents
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <p className="text-white/70 mb-6">
                If you were injured by a driver who fled the scene or was uninsured, 
                you may still be able to claim compensation through the Motor Insurers' 
                Bureau (MIB).
              </p>

              <ul className="space-y-4">
                {[
                  "Claims against untraced drivers (hit and run)",
                  "Claims against uninsured drivers",
                  "MIB provides compensation when the driver cannot be found",
                  "We handle the entire MIB claims process for you",
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                    <AlertTriangle size={28} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-xl">Important Information</h3>
                    <p className="text-white/50">For hit and run victims</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {[
                    "Report the accident to the police immediately",
                    "Try to note any details about the vehicle",
                    "Gather witness contact information",
                    "Seek medical attention as soon as possible",
                    "Contact a solicitor promptly",
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
                <Users size={32} className="text-amber-500" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Injured as a Pedestrian?
              </h2>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                If you've been injured in a pedestrian accident that wasn't your fault, 
                our specialist solicitors can help you get the compensation you deserve. 
                Contact us today for a free, no-obligation consultation.
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

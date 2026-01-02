"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Home, Shield, CheckCircle, AlertTriangle, Scale, FileText, Droplets, Thermometer, Bug, Zap, Wind, Wrench } from "lucide-react";
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

export default function HousingDisrepairPage() {
  const disrepairIssues = [
    {
      icon: Droplets,
      title: "Damp & Mould",
      description: "Persistent dampness, condensation, and mould growth on walls and ceilings.",
    },
    {
      icon: Thermometer,
      title: "Heating Problems",
      description: "Faulty boilers, broken radiators, or inadequate heating systems.",
    },
    {
      icon: Droplets,
      title: "Leaking Pipes & Roofs",
      description: "Water leaks from plumbing, roofs, or external walls.",
    },
    {
      icon: Bug,
      title: "Pest Infestations",
      description: "Rodents, insects, or other pest problems in your property.",
    },
    {
      icon: Zap,
      title: "Electrical Faults",
      description: "Dangerous wiring, faulty sockets, or electrical safety issues.",
    },
    {
      icon: Wind,
      title: "Broken Windows & Doors",
      description: "Damaged windows, doors, or locks that affect security or insulation.",
    },
    {
      icon: Wrench,
      title: "Structural Defects",
      description: "Cracks in walls, unstable floors, or other structural problems.",
    },
    {
      icon: Home,
      title: "External Disrepair",
      description: "Issues with guttering, drains, or external structure of the property.",
    },
  ];

  const claimProcess = [
    {
      number: "01",
      title: "Report to Landlord",
      description: "Notify your landlord in writing about the disrepair issues.",
    },
    {
      number: "02",
      title: "Allow Time for Repairs",
      description: "Give your landlord a reasonable time to carry out repairs.",
    },
    {
      number: "03",
      title: "Contact Us",
      description: "If repairs aren't completed, contact our team for a free assessment.",
    },
    {
      number: "04",
      title: "We Handle Everything",
      description: "We'll pursue your claim and fight for the compensation you deserve.",
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
            <span className="text-amber-500">Housing Disrepair</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Home size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Our Expertise</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Housing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Disrepair
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                At M&S Law we understand how frustrating it can be living with poor housing 
                conditions and disrepair within a property, and the impact it can have on your 
                daily life and wellbeing. Our specialist housing disrepair team have successfully 
                dealt with many disrepair claims on behalf of tenants.
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
                  src="/images/housing-disrepair.jpg"
                  alt="Housing Disrepair Claims"
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

      {/* What is Housing Disrepair Section */}
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
                What is{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Housing Disrepair?
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <p className="text-white/70 mb-6">
                Your landlord has a legal obligation, under the Landlord and Tenant Act 1985, 
                to maintain the structure of your home in a good condition and ensure the property 
                is kept in a good state of repair so that you and other occupants are able to live 
                in the property safely and comfortably.
              </p>
              
              <p className="text-white/70 mb-6">
                You may be entitled to compensation if you have notified your landlord of 
                disrepair issues and the landlord has failed to repair the issues within a 
                reasonable period of time.
              </p>

              <SpotlightCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Important</h3>
                    <p className="text-white/60 text-sm">
                      Always report disrepair issues to your landlord in writing and keep copies 
                      of all correspondence. This evidence is crucial for any potential claim.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="p-8">
                <h3 className="font-serif text-2xl text-white mb-6">Your Landlord Must:</h3>
                <ul className="space-y-4">
                  {[
                    "Keep the structure and exterior in good repair",
                    "Maintain installations for water, gas, and electricity",
                    "Keep heating and hot water systems working",
                    "Ensure the property is fit for habitation",
                    "Carry out repairs within a reasonable time",
                    "Maintain common areas (for flats)",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/70">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} className="text-amber-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disrepair Issues Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Common{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Disrepair Issues
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              If you're experiencing any of these issues in your rented property and your 
              landlord has failed to act, you may have a claim.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disrepairIssues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4">
                    <issue.icon size={24} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{issue.title}</h3>
                  <p className="text-white/50 text-sm">{issue.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
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
              How to Make a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Disrepair Claim
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our straightforward process makes it easy to pursue a housing disrepair claim.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimProcess.map((step, index) => (
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
                  <h3 className="text-white font-medium text-lg mb-2">{step.title}</h3>
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
                    If your housing disrepair claim is successful, you may be entitled to:
                  </p>

                  <ul className="space-y-3">
                    {[
                      "Compensation for inconvenience and distress",
                      "Damages for health issues caused by disrepair",
                      "Rent reduction or refund for affected period",
                      "Compensation for damaged personal belongings",
                      "Cost of temporary accommodation if required",
                      "Order for landlord to complete repairs",
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
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                      <FileText size={16} className="text-amber-500" />
                      <span className="text-amber-500 text-sm font-medium">No Win, No Fee</span>
                    </div>
                    <h3 className="text-white font-medium text-xl mb-2">Risk-Free Claims</h3>
                    <p className="text-white/50">
                      We handle housing disrepair claims on a No Win, No Fee basis
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/70">
                      <CheckCircle size={18} className="text-amber-500" />
                      <span>Free initial consultation</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <CheckCircle size={18} className="text-amber-500" />
                      <span>No upfront costs</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <CheckCircle size={18} className="text-amber-500" />
                      <span>Expert housing solicitors</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <CheckCircle size={18} className="text-amber-500" />
                      <span>Fast and efficient service</span>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* Who Can Claim Section */}
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
                Who Can Make a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Claim?
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <p className="text-white/70 mb-6">
                You may be able to make a housing disrepair claim if:
              </p>

              <ul className="space-y-4">
                {[
                  "You are a council or housing association tenant",
                  "You rent from a private landlord",
                  "You have reported the disrepair to your landlord",
                  "Your landlord has failed to carry out repairs",
                  "The disrepair has affected your health or belongings",
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
                { icon: Home, label: "Council Housing", description: "Full support available" },
                { icon: Shield, label: "Housing Associations", description: "All types covered" },
                { icon: Scale, label: "Private Landlords", description: "Legal obligations apply" },
                { icon: FileText, label: "All Tenancies", description: "Assured & secure" },
              ].map((item, index) => (
                <SpotlightCard key={index} className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                    <item.icon size={24} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium mb-1">{item.label}</h3>
                  <p className="text-white/50 text-sm">{item.description}</p>
                </SpotlightCard>
              ))}
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
                <Home size={32} className="text-amber-500" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Living with Housing Disrepair?
              </h2>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Don't suffer in silence. If your landlord has failed to repair your property, 
                contact our specialist housing disrepair team today for a free, no-obligation 
                consultation.
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

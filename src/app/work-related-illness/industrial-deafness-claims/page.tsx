"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Factory, 
  Ear, 
  HardHat, 
  Shield, 
  AlertTriangle, 
  Phone,
  CheckCircle,
  Volume2,
  Headphones
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

const symptoms = [
  "You have to ask others to speak louder",
  "You find difficulty in hearing even if the volume is high",
  "You have ringing in your ears (tinnitus)",
  "You struggle to follow conversations in noisy environments",
];

const industries = [
  { icon: HardHat, name: "Construction" },
  { icon: Factory, name: "Mining" },
  { icon: Factory, name: "Foundries" },
  { icon: Factory, name: "Manufacturing" },
];

const benefits = [
  {
    icon: CheckCircle,
    title: "Expert Knowledge",
    description: "Our solicitors are very knowledgeable with different types of industrial deafness compensation claims."
  },
  {
    icon: Shield,
    title: "No Win, No Fee",
    description: "Your claim will be run on a No Win No Fee basis, giving peace of mind of no upfront legal fees."
  },
  {
    icon: AlertTriangle,
    title: "Comprehensive Assessment",
    description: "All aspects of your case are taken into account to make a strong and compelling claim."
  },
];

export default function IndustrialDeafnessClaimsPage() {
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
            <span className="text-amber-500">Industrial Deafness Claims</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Factory size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Work Related Illness</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Industrial Deafness{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Claims
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                The exposure to loud noise in any place may impact your hearing. If you are at 
                continuous exposure to excessive noise in your workplace, you may suffer damage 
                to your hearing ability.
              </p>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                This hearing condition as a consequence of an employee's working environment is 
                termed as <strong className="text-white">Industrial Deafness</strong> or{" "}
                <strong className="text-white">Noise Induced Hearing Loss</strong>.
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
                  src="/images/industrial-deafness.jpg"
                  alt="Industrial Deafness Claims"
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
                    <Shield size={24} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">No Win, No Fee</p>
                    <p className="text-white/50 text-sm">No upfront costs</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                    <Volume2 size={28} className="text-amber-500" />
                  </div>
                  <h2 className="font-serif text-2xl text-white">Signs You May Have Industrial Deafness</h2>
                </div>
                
                <ul className="space-y-4">
                  {symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} className="text-amber-500" />
                      </div>
                      <p className="text-white/80">{symptom}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <p className="text-amber-400 text-sm">
                    If you experience any of these symptoms, it may indicate that you are suffering 
                    from industrial deafness as a result of high noise levels at work.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-serif text-2xl text-white mb-6">High-Risk Industries</h3>
              <p className="text-white/70 mb-6">
                Noise levels are mostly high in industries such as construction, mining, foundries 
                and manufacturing. Employers are responsible for providing a healthy and safe 
                working environment to their employees that may lessen the risk of accidents 
                and industrial illnesses.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {industries.map((industry, index) => (
                  <SpotlightCard key={index} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <industry.icon size={20} className="text-amber-500" />
                      </div>
                      <span className="text-white font-medium">{industry.name}</span>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Employer Responsibility Section */}
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
                  <Headphones size={32} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-4">
                    Your Employer's Responsibility
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    If you work or have worked in a noisy workplace, your employer must provide 
                    adequate ear protection. <strong className="text-white">Failure to do so would 
                    mean that you may be entitled to make a claim for your hearing loss.</strong>
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Employers have a legal duty to protect their workers from excessive noise 
                    exposure and must provide appropriate protective equipment and safety measures.
                  </p>
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
              Consult Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Legal Experts
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our solicitors understand what factors need to be considered when filing a claim. 
              It helps in evaluating and assessing your potential claim.
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

      {/* No Win No Fee Section */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0">
                  <Shield size={40} className="text-green-400" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-2xl text-white mb-2">
                    No Win,{" "}
                    <span className="text-green-400">No Fee</span>
                  </h3>
                  <p className="text-white/70">
                    Your claim will be run on a No Win No Fee basis, giving you peace of mind with no 
                    upfront legal fees. <strong className="text-white">In the unlikely event of your 
                    claim being unsuccessful, you will not have to pay our legal fees.</strong>
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
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
                File Your Claim Today
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Consult our legal experts as soon as possible to file a claim for occupational 
                hearing loss compensation. We're here to help you get the justice you deserve.
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

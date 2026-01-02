"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Scale, 
  FileX, 
  Gavel, 
  AlertTriangle, 
  Users, 
  Clock, 
  Heart, 
  Phone,
  CheckCircle,
  ShieldCheck
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

const claimTypes = [
  {
    icon: FileX,
    title: "Challenging the validity of a Will",
    description: "Contest a Will if you believe it was made under undue influence, lack of capacity, or fraud."
  },
  {
    icon: Gavel,
    title: "Inheritance Act 1975 Claims",
    description: "Make a claim if you were financially dependent on the deceased but not adequately provided for."
  },
  {
    icon: AlertTriangle,
    title: "Fatal Accident Claims",
    description: "Pursue compensation when a death was caused by someone else's negligence or wrongful act."
  },
  {
    icon: Scale,
    title: "Claims Against Professional Advisors",
    description: "Take action against solicitors or other professionals who provided negligent advice."
  },
  {
    icon: Users,
    title: "Claims Against Personal Representatives",
    description: "Challenge executors or administrators who are mismanaging the estate."
  },
  {
    icon: Clock,
    title: "Pre-death Issues",
    description: "Address concerns about assets that were improperly transferred before the death occurred."
  },
  {
    icon: Heart,
    title: "Death and Burial Disputes",
    description: "Resolve disagreements about funeral arrangements and burial wishes."
  },
];

const claimExamples = [
  "You were financially supported by the deceased prior to their death, but received nothing from their estate",
  "You believe the Will left by the deceased is suspicious",
  "Part of the deceased's estate was spent by someone other than the deceased prior to their death, reducing its value to you as a beneficiary",
  "You are an executor but are in dispute over the actions of other executors (e.g. they are administering the estate inappropriately)",
];

export default function ProbateDisputesPage() {
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
            <Link href="/wills-and-trusts" className="hover:text-white transition-colors">Wills and Trusts</Link>
            <span>/</span>
            <span className="text-amber-500">Probate Disputes</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Scale size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Wills & Trusts</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Probate{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Disputes
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Probate disputes – which include any claims following a death – are increasing in number 
                but require specialist advice and representation, whether the deceased left a Will or 
                died without making a Will.
              </p>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                We can assist you with a wide variety of claims with our expert solicitors.
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
                  src="/images/probate-disputes.jpg"
                  alt="Probate Disputes Legal Services"
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
                    <ShieldCheck size={24} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">No Win, No Fee</p>
                    <p className="text-white/50 text-sm">In appropriate cases</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types of Claims Section */}
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
              Types of Claims{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                We Handle
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our specialist solicitors can assist with a wide variety of probate disputes and inheritance claims.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {claimTypes.map((claim, index) => (
              <motion.div
                key={claim.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="h-full p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4">
                    <claim.icon size={24} className="text-amber-500" />
                  </div>
                  <h3 className="font-serif text-lg text-white mb-3">{claim.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{claim.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Examples of When You May Have a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Claim
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="p-8">
              <ul className="space-y-6">
                {claimExamples.map((example, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={18} className="text-amber-500" />
                    </div>
                    <p className="text-white/80 leading-relaxed">{example}</p>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/70">
                  The above are examples of when a probate claim may be made, but the scenarios are varied. 
                  <strong className="text-white"> If in doubt seek early advice.</strong>
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
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
                  <ShieldCheck size={40} className="text-green-400" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-2xl text-white mb-2">
                    No Win,{" "}
                    <span className="text-green-400">No Fee</span>
                  </h3>
                  <p className="text-white/70">
                    Contact us today and speak to our specialist solicitor, who will provide an estimate of 
                    our fees. <strong className="text-white">In appropriate cases we will act for you on a 
                    no-win, no-fee basis.</strong>
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
                Need Expert Legal Advice?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Our specialist probate dispute solicitors are here to help. Get in touch today 
                for a consultation and fee estimate.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Contact Us Today
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

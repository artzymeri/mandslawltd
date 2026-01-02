"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Heart, Home, ShieldCheck, AlertTriangle, Phone } from "lucide-react";
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

export default function LastingPowerOfAttorneyPage() {
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
            <Link href="/wills-and-trusts" className="hover:text-white transition-colors">Wills and Trusts</Link>
            <span>/</span>
            <span className="text-amber-500">Lasting Power of Attorney</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <FileText size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Wills & Trusts</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Lasting Power of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Attorney
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                A Lasting Power of Attorney is a legal document that allows an individual to appoint 
                a trusted person, otherwise known as an Attorney, to make decisions for you, or act 
                on your behalf if you are no longer able to.
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
                  src="/images/lasting-power-of-attorney.jpg"
                  alt="Lasting Power of Attorney - Legal Document Signing"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                  priority
                />
                {/* Overlay gradient */}
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
                    <ShieldCheck size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Protect Your Future</p>
                    <p className="text-white/50 text-sm">Plan ahead with LPA</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types of LPA Section */}
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
              Two Types of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Lasting Power of Attorney
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Understanding the difference between the two types of LPA is crucial for comprehensive protection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Property and Financial Affairs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <SpotlightCard className="h-full p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                    <Home size={28} className="text-amber-500" />
                  </div>
                  <div>
                    <span className="text-amber-500 text-sm font-medium">Type 1</span>
                    <h3 className="font-serif text-2xl text-white">Property & Financial Affairs</h3>
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">
                  This type of LPA can take effect immediately or only to be effective if mental capacity is lost. 
                  This allows the Attorney to deal with all financial affairs such as:
                </p>
                
                <ul className="space-y-3">
                  {[
                    "Transfers of money",
                    "Paying bills",
                    "Selling property",
                    "Closing bank accounts"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>

            {/* Health and Welfare */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="h-full p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                    <Heart size={28} className="text-amber-500" />
                  </div>
                  <div>
                    <span className="text-amber-500 text-sm font-medium">Type 2</span>
                    <h3 className="font-serif text-2xl text-white">Health & Welfare</h3>
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">
                  This type of power can only become effective once mental capacity is lost. 
                  It allows the Attorney(s) to make decisions on:
                </p>
                
                <ul className="space-y-3">
                  {[
                    "Choosing doctors and dentists",
                    "Consent or refusal of life sustaining treatment",
                    "Where to live",
                    "Day-to-day care decisions"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <p className="text-amber-400 text-sm">
                    <strong>Important:</strong> You can state whether the Attorney will have the power to consent 
                    to or refuse life sustaining treatment on your behalf.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Make an LPA Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Why Make a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Lasting Power of Attorney?
                </span>
              </h2>
              
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Mental or physical incapacity, such as a stroke or dementia can hit at any time in life. 
                  Younger people can also become incapacitated through an accident or sudden illness.
                </p>
                <p>
                  We recommend everyone should have a LPA in place to ease the potential burden on your loved ones. 
                  If you make a LPA whilst you have the capacity to do so, you can appoint your own chosen 
                  trustworthy Attorney, something which may not be available to you once capacity is lost.
                </p>
              </div>
              
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
              >
                Enquire Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={24} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white mb-2">
                      What happens without an LPA?
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4 text-white/70">
                  <p>
                    If you do not have a Lasting Power of Attorney in place and you are no longer able to 
                    make decisions, an application will have to be made to the Court of Protection for a 
                    Deputyship order.
                  </p>
                  <p>
                    A family member or close friend may apply to take over your matters however ultimately 
                    it will be at the Court's discretion whether they grant that person deputy or not.
                  </p>
                  <p>
                    This can be an <strong className="text-white">extremely stressful process</strong> at a difficult time. 
                    An application to the Court also costs <strong className="text-white">thousands of pounds</strong>.
                  </p>
                </div>
                
                <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <p className="text-green-400 text-sm">
                    <strong>Better Alternative:</strong> Making a LPA is a much cheaper and stress-free option 
                    that gives you control over who makes decisions on your behalf.
                  </p>
                </div>
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
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Ready to Protect Your Future?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Our experienced solicitors can guide you through the process of setting up a Lasting Power 
                of Attorney, ensuring your wishes are protected and your loved ones are prepared.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Get Started Today
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

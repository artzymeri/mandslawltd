"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, PoundSterling, FileText, CheckCircle, Clock, Shield, Scale, Calculator, HelpCircle, Percent } from "lucide-react";
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

export default function LegalCostsPage() {
  const fundingOptions = [
    {
      icon: Percent,
      title: "Conditional Fee Agreement",
      subtitle: "No Win, No Fee",
      description: "If you lose your case, you will not have to pay for solicitors' fees providing you adhere to the terms and conditions – this is the risk we take on your behalf. If we win your case, we take a percentage of the damages.",
      features: [
        "No upfront costs required",
        "Risk-free litigation",
        "Pay only if you win",
        "Percentage deducted from damages",
      ],
      popular: true,
    },
    {
      icon: Calculator,
      title: "Fixed Fee",
      subtitle: "Predictable Costs",
      description: "We will assess your situation and provide you with a fixed fee to assist with your case. This gives you certainty about your legal costs from the outset.",
      features: [
        "Know your costs upfront",
        "No unexpected charges",
        "Suitable for straightforward matters",
        "Transparent pricing",
      ],
      popular: false,
    },
    {
      icon: Clock,
      title: "Agreed Hourly Rate",
      subtitle: "Flexible Billing",
      description: "We will assess your case and provide a fully flexible option on an hour by hour basis. You will be provided the hourly rate of the solicitor who will have conduct of your case.",
      features: [
        "Pay as you go",
        "Fully flexible approach",
        "Detailed time records provided",
        "Regular billing updates",
      ],
      popular: false,
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
            <span className="text-amber-500">Legal Costs</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <PoundSterling size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Transparent Pricing</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Information on{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Legal Costs
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                We understand that the issue of legal costs can be daunting. Our promise to you 
                is that we will explain and be transparent when explaining legal costs. There are 
                a number of funding options available to suit your circumstances.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Get a Quote
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
                  src="/images/legal-costs.jpg"
                  alt="Legal Costs Information"
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
                    <p className="text-white font-medium">Transparent Fees</p>
                    <p className="text-white/50 text-sm">No hidden costs</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funding Options Section */}
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
              Funding{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Options
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We offer several ways to fund your legal case. Choose the option that 
              best suits your situation and needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {fundingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className={`p-8 h-full ${option.popular ? 'border-amber-500/30' : ''}`}>
                  {option.popular && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-bl-xl rounded-tr-xl">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-6">
                    <option.icon size={28} className="text-amber-500" />
                  </div>
                  
                  <h3 className="text-white font-serif text-2xl mb-1">{option.title}</h3>
                  <p className="text-amber-500 text-sm font-medium mb-4">{option.subtitle}</p>
                  
                  <p className="text-white/60 mb-6">{option.description}</p>
                  
                  <ul className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/70">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle size={12} className="text-amber-500" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
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
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Promise
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />
              
              <p className="text-white/70 mb-6">
                At M&S Law, we believe in complete transparency when it comes to legal costs. 
                We will always:
              </p>

              <ul className="space-y-4">
                {[
                  "Explain all costs clearly before you commit",
                  "Provide written estimates and updates",
                  "Keep you informed of any changes",
                  "Discuss the most suitable funding option for you",
                  "Answer all your questions about fees",
                  "Never charge hidden fees or unexpected costs",
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                    <HelpCircle size={28} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-xl">Not Sure Which Option?</h3>
                    <p className="text-white/50">We can help you decide</p>
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">
                  Every case is different, and the best funding option will depend on your 
                  individual circumstances. Our team will assess your case and recommend 
                  the most appropriate way forward.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "Free initial assessment",
                    "No obligation consultation",
                    "Expert advice on funding",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/70">
                      <ArrowRight size={16} className="text-amber-500 flex-shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Discuss Your Options
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
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
                    Understanding{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                      No Win, No Fee
                    </span>
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    A Conditional Fee Agreement (CFA), commonly known as "No Win, No Fee", 
                    means you don't pay legal fees if your case is unsuccessful. This 
                    arrangement allows you to pursue a claim without financial risk.
                  </p>

                  <div className="space-y-4">
                    <div className="border-l-2 border-amber-500 pl-4">
                      <h4 className="text-white font-medium mb-1">If You Lose</h4>
                      <p className="text-white/60 text-sm">
                        You won't pay any solicitor fees, provided you've followed the 
                        terms and conditions of the agreement.
                      </p>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-4">
                      <h4 className="text-white font-medium mb-1">If You Win</h4>
                      <p className="text-white/60 text-sm">
                        A success fee (percentage of damages) is deducted from your 
                        compensation to cover our costs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Shield, label: "Risk-Free", value: "Litigation" },
                    { icon: PoundSterling, label: "No Upfront", value: "Costs" },
                    { icon: Scale, label: "Fair", value: "Terms" },
                    { icon: FileText, label: "Clear", value: "Contracts" },
                  ].map((item, index) => (
                    <div key={index} className="bg-black/30 rounded-xl p-6 text-center">
                      <item.icon size={24} className="text-amber-500 mx-auto mb-3" />
                      <div className="text-xl font-bold text-white mb-1">{item.value}</div>
                      <div className="text-white/50 text-sm">{item.label}</div>
                    </div>
                  ))}
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mx-auto mb-6">
                <PoundSterling size={32} className="text-amber-500" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Have Questions About Costs?
              </h2>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                We're happy to discuss your funding options and provide a clear 
                explanation of all potential costs. Contact us today for a free, 
                no-obligation consultation.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Get a Free Quote
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

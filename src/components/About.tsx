"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Car, Shield, Users, Building } from "lucide-react";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "5.0", label: "Google Rating" },
  { value: "100%", label: "Client Focused" },
];

const features = [
  { icon: MapPin, text: "Based in Blackburn, Lancashire" },
  { icon: Car, text: "Easy motorway access & parking" },
  { icon: Building, text: "Meeting room facilities available" },
  { icon: Shield, text: "SRA Regulated (No. 638816)" },
];

export default function About() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#1a1a1a]/50 text-sm tracking-[0.2em] uppercase mb-4"
            >
              About Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight mb-8"
            >
              A firm you can trust
            </motion.h2>
            <div className="space-y-5 text-[#1a1a1a]/60 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                M&S Law is based in Blackburn with easy motorway access and ample parking. 
                We are a friendly and approachable firm with many decades of experience 
                across different areas of law.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Whether you need assistance with Wills, Trusts, Estate Planning, Probate Disputes, 
                Family Law, Housing Disrepair, Personal Injury, or Industrial Disease — our team 
                of highly qualified solicitors would be delighted to help.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                We believe your success determines our success. We offer flexible funding 
                including No Win No Fee, Fixed Fees, and Hourly Rate charges.
              </motion.p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <feature.icon className="w-5 h-5 text-[#1a1a1a]/40" />
                  <span className="text-sm text-[#1a1a1a]/70">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[#1a1a1a] rounded-3xl p-12 text-white">
              <div className="space-y-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="border-b border-white/10 pb-8 last:border-0 last:pb-0"
                  >
                    <p className="text-5xl md:text-6xl font-semibold tracking-tight mb-2">
                      {stat.value}
                    </p>
                    <p className="text-white/50 text-sm tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

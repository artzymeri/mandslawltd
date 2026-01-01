"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Wills & Trusts",
    description: "Protect your legacy with professionally prepared wills and trusts that ensure your wishes are honoured.",
    href: "/wills-and-trusts",
    image: "/our-expertise/wills-and-trusts.jpg",
  },
  {
    title: "Work Illness",
    description: "Expert guidance for workplace injury and illness claims. We help you get the compensation you deserve.",
    href: "/work-related-illness",
    image: "/our-expertise/work-illness.jpg",
  },
  {
    title: "Housing Disrepair",
    description: "Living in poor conditions? We ensure your landlord fulfils their legal obligations to you.",
    href: "/housing-disrepair",
    image: "/our-expertise/house-disrepair.jpg",
  },
  {
    title: "Personal Injury",
    description: "From road accidents to workplace incidents, we handle all personal injury claims with care.",
    href: "/personal-injury",
    image: "/our-expertise/personal-injury.jpg",
  },
];

export default function Services() {
  return (
    <section className="min-h-screen bg-[#fafafa]">
      {/* Section Header */}
      <div className="text-center py-20">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#1a1a1a]/50 text-sm tracking-[0.2em] uppercase mb-4"
        >
          What We Do
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight"
        >
          Our expertise
        </motion.h2>
      </div>

      {/* Full Screen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link href={service.href} className="block group">
              <div className="h-[50vh] md:h-[60vh] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500" />

                {/* Top - Arrow */}
                <div className="relative z-10 flex items-start justify-end">
                  <ArrowUpRight 
                    size={28} 
                    className="text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                  />
                </div>

                {/* Bottom - Content */}
                <div className="relative z-10">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="text-2xl md:text-3xl font-semibold text-white mb-4"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-white/70 leading-relaxed text-base md:text-lg"
                  >
                    {service.description}
                  </motion.p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#1a1a1a]/50 text-sm tracking-[0.2em] uppercase mb-4"
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight"
          >
            Get in touch
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-black/10 focus:border-black/30 focus:ring-0 outline-none transition-all text-lg placeholder:text-[#1a1a1a]/30"
                  placeholder="Your name"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-black/10 focus:border-black/30 focus:ring-0 outline-none transition-all text-lg placeholder:text-[#1a1a1a]/30"
                  placeholder="Email address"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-black/10 focus:border-black/30 focus:ring-0 outline-none transition-all text-lg placeholder:text-[#1a1a1a]/30"
                  placeholder="Phone number"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-black/10 focus:border-black/30 focus:ring-0 outline-none transition-all text-lg placeholder:text-[#1a1a1a]/30 resize-none"
                  placeholder="How can we help?"
                  required
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }} 
                type="submit" 
                className="group inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-medium text-[15px] transition-all hover:bg-[#333] mt-4"
              >
                Send Message
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[#1a1a1a]/50 text-sm uppercase tracking-wide mb-4">Call us</p>
              <a 
                href="tel:01254404055" 
                className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] hover:text-[#1a1a1a]/70 transition-colors"
              >
                01254 40 40 55
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[#1a1a1a]/50 text-sm uppercase tracking-wide mb-4">Email</p>
              <a 
                href="mailto:info@mandslawltd.co.uk" 
                className="text-xl text-[#1a1a1a] hover:text-[#1a1a1a]/70 transition-colors"
              >
                info@mandslawltd.co.uk
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[#1a1a1a]/50 text-sm uppercase tracking-wide mb-4">Visit us</p>
              <p className="text-xl text-[#1a1a1a] leading-relaxed">
                Suite 201, Cardwell House,<br />
                Cardwell Place, Blackburn,<br />
                Lancashire, BB2 1LG
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8 border-t border-black/5"
            >
              <p className="text-[#1a1a1a]/50 text-sm">
                Easy motorway access with ample parking available.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

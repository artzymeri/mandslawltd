"use client";

import { motion } from "framer-motion";

// GPU-optimized transition
const gpuTransition = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };
import { useState, useRef } from "react";
import { ArrowRight, Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const inputClasses = (field: string) => `
    w-full px-6 py-5 bg-white rounded-2xl border-2 transition-all duration-300 text-lg
    ${focusedField === field || formData[field as keyof typeof formData]
      ? "border-amber-500/50 shadow-[0_0_30px_rgba(194,159,97,0.15)]"
      : "border-black/5 hover:border-black/10"
    }
    focus:outline-none focus:border-amber-500/50 focus:shadow-[0_0_30px_rgba(194,159,97,0.15)]
    placeholder:text-[#1a1a1a]/30
  `;

  return (
    <section ref={containerRef} id="contact" className="relative py-32 bg-[#fafafa] overflow-hidden">
      {/* Background decorations - static for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-amber-600/70 text-sm tracking-[0.3em] uppercase mb-4"
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1a1a1a] tracking-tight font-serif"
          >
            Get in touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#1a1a1a]/50 text-lg max-w-xl mx-auto mt-6"
          >
            Ready to discuss your legal needs? We're here to help. Contact us for a free consultation.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form - Takes more space */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-black/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClasses("name")}
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
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClasses("email")}
                      placeholder="Email address"
                      required
                    />
                  </motion.div>
                </div>

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
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses("phone")}
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
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputClasses("message")} resize-none`}
                    placeholder="How can we help you?"
                    required
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  type="submit"
                  className="group w-full relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-5 rounded-2xl font-medium text-lg transition-all hover:shadow-[0_20px_50px_rgba(194,159,97,0.3)] overflow-hidden"
                >
                  <span className="relative z-10">Send Message</span>
                  <Send size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info - Takes less space */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Phone card */}
            <motion.a
              href="tel:01254404055"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group block bg-[#0a0a0a] rounded-3xl p-8 text-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-white/50 text-sm uppercase tracking-wide">Call us</p>
              </div>
              <p className="text-3xl md:text-4xl font-medium font-serif group-hover:text-amber-400 transition-colors">
                01254 40 40 55
              </p>
            </motion.a>

            {/* Email card */}
            <motion.a
              href="mailto:info@mandslawltd.co.uk"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group block bg-white rounded-3xl p-8 border border-black/5 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-[#1a1a1a]/50 text-sm uppercase tracking-wide">Email</p>
              </div>
              <p className="text-xl text-[#1a1a1a] group-hover:text-amber-600 transition-colors">
                info@mandslawltd.co.uk
              </p>
            </motion.a>

            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-8 border border-black/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-[#1a1a1a]/50 text-sm uppercase tracking-wide">Visit us</p>
              </div>
              <p className="text-lg text-[#1a1a1a] leading-relaxed">
                Suite 201, Cardwell House,<br />
                Cardwell Place, Blackburn,<br />
                Lancashire, BB2 1LG
              </p>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 px-2 pt-4"
            >
              <Clock className="w-5 h-5 text-amber-600/50" />
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

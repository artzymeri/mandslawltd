"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Wills & Trusts", href: "/wills-and-trusts" },
  { label: "Work Illness", href: "/work-related-illness" },
  { label: "Housing", href: "/housing-disrepair" },
  { label: "Personal Injury", href: "/personal-injury" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/recruitment" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* CTA Section */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium font-serif text-white mb-4">
                Ready to get started?
              </h3>
              <p className="text-white/40 text-lg max-w-xl">
                Contact us today for a free consultation and discover how we can help protect your interests.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:01254404055"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-[0_20px_50px_rgba(194,159,97,0.3)]"
              >
                <Phone size={18} />
                Call Now
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-white/5 hover:border-white/40"
              >
                Send Message
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="M&S Law Ltd"
                width={140}
                height={56}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Expert solicitors offering comprehensive legal services across Lancashire. Your trusted partners in Wills & Trusts, Personal Injury, Housing, and more.
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer">
                <span className="text-xs font-bold text-white/60">SRA</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-amber-500/70">Contact</h4>
            <div className="space-y-4">
              <a href="tel:01254404055" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                <Phone size={16} className="text-amber-500/50 group-hover:text-amber-500" />
                01254 40 40 55
              </a>
              <a href="mailto:info@mandslawltd.co.uk" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                <Mail size={16} className="text-amber-500/50 group-hover:text-amber-500" />
                info@mandslawltd.co.uk
              </a>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-amber-500/70">Address</h4>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-amber-500/50 mt-1 flex-shrink-0" />
              <p className="text-sm text-white/60 leading-relaxed">
                Suite 201, Cardwell House,<br />
                Cardwell Place, Blackburn,<br />
                Lancashire, BB2 1LG
              </p>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-amber-500/70">Services</h4>
            <div className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-2 text-xs text-white/30 text-center md:text-left">
              <p>
                M&S Law Ltd, Registered in England and Wales, Registration Number 10765120. 
              </p>
              <p>
                Authorised and Regulated by the Solicitors Regulation Authority Number 638816.
              </p>
            </div>
            <p className="text-xs text-white/30">© 2026 M&S Law LTD. All rights reserved.</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </footer>
  );
}

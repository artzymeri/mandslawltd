"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="M&S Law Ltd"
                width={140}
                height={56}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/50 mt-3 text-sm">
              Solicitors in Lancashire
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-white/60">
              <a href="tel:01254404055" className="block hover:text-white transition-colors">
                01254 40 40 55
              </a>
              <a href="mailto:info@mandslawltd.co.uk" className="block hover:text-white transition-colors">
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
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Address</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Suite 201, Cardwell House,<br />
              Cardwell Place, Blackburn,<br />
              Lancashire, BB2 1LG
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Services</h4>
            <div className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
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
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col gap-4 text-xs text-white/40">
            <p>
              M&S Law Ltd, Registered in England and Wales, Registration Number 10765120. 
              Authorised and Regulated by the Solicitors Regulation Authority Number 638816.
            </p>
            <p>© 2026 M&S Law LTD. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

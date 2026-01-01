"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// GPU-optimized transition config
const gpuTransition = {
  type: "tween" as const,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/wills-and-trusts", label: "Wills & Trusts" },
  { href: "/work-related-illness", label: "Work Illness" },
  { href: "/housing-disrepair", label: "Housing" },
  { href: "/personal-injury", label: "Injury" },
  { href: "/recruitment", label: "Careers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ...gpuTransition }}
        style={{ willChange: "transform, opacity" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "py-2"
            : "py-4"
        }`}
      >
        <motion.nav 
          className={`max-w-6xl mx-auto px-4 transition-all duration-500 ${
            isScrolled ? "mx-4 lg:mx-auto" : ""
          }`}
        >
          <motion.div 
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled 
                ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl px-6 py-3 border border-white/50"
                : "px-2 py-2"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo.png"
                  alt="M&S Law Ltd"
                  width={120}
                  height={48}
                  className={`h-10 w-auto transition-all duration-500 ${
                    isScrolled ? "" : "brightness-0 invert"
                  }`}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-4 py-2 text-[13px] font-medium transition-colors group"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${
                    isScrolled 
                      ? "text-[#1a1a1a]/70 group-hover:text-[#1a1a1a]" 
                      : "text-white/70 group-hover:text-white"
                  }`}>
                    {link.label}
                  </span>
                  {/* Hover background */}
                  <AnimatePresence>
                    {hoveredLink === link.href && (
                      <motion.div
                        layoutId="navHover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute inset-0 rounded-lg ${
                          isScrolled ? "bg-black/5" : "bg-white/10"
                        }`}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:01254404055"
                className={`group relative text-[13px] font-medium px-6 py-2.5 rounded-full transition-all overflow-hidden ${
                  isScrolled 
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:shadow-[0_10px_30px_rgba(194,159,97,0.3)]"
                    : "bg-white text-[#1a1a1a] hover:bg-white/90"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? "text-[#1a1a1a]" : "text-white"
              }`}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu - Full Screen */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-[#0a0a0a] z-40"
              style={{ willChange: "opacity" }}
            >
              <div className="flex flex-col justify-center items-center h-full px-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-white/80 hover:text-white transition-colors font-serif text-3xl text-center"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="pt-8 mt-8 border-t border-white/10 w-full max-w-xs"
                >
                  <a
                    href="tel:01254404055"
                    className="block text-center text-[15px] font-medium text-[#0a0a0a] bg-gradient-to-r from-amber-500 to-amber-600 py-4 rounded-full transition-all hover:shadow-[0_10px_30px_rgba(194,159,97,0.3)]"
                  >
                    01254 40 40 55
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

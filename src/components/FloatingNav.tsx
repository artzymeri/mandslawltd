"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Home, Briefcase, Users, MessageSquareQuote, Phone } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "#services", label: "Services", icon: Briefcase },
  { href: "#about", label: "About", icon: Users },
  { href: "#testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "#contact", label: "Contact", icon: Phone },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      // Show floating nav after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      // Detect active section
      const sections = ["contact", "testimonials", "about", "services"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
      setActiveSection("/");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.nav
            layout
            className="relative bg-black/80 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-1">
              {/* Navigation Items */}
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`relative p-3 rounded-full transition-colors ${
                        isActive ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavCompact"
                          className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <Icon size={18} className="relative z-10" />
                    </motion.button>
                  );
                })}
              </div>

              {/* CTA Button */}
              <Link
                href="tel:01254404055"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full text-white text-sm font-medium hover:shadow-[0_10px_30px_rgba(194,159,97,0.4)] transition-shadow"
              >
                <Phone size={14} />
                <span className="hidden sm:inline">Call Now</span>
              </Link>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

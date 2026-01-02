"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// GPU-optimized transition config
const gpuTransition = {
  type: "tween" as const,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

interface SubItem {
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
  subItems?: SubItem[];
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { 
    href: "/wills-and-trusts", 
    label: "Wills and Trusts",
    subItems: [
      { href: "/wills-and-trusts/lasting-power-of-attorney", label: "Lasting Power of Attorney" },
      { href: "/wills-and-trusts/wills-solicitors", label: "Wills Solicitors" },
      { href: "/wills-and-trusts/probate-disputes", label: "Probate Disputes" },
    ]
  },
  { 
    href: "/work-related-illness", 
    label: "Work Related Illness",
    subItems: [
      { href: "/work-related-illness/military-hearing-loss-claims", label: "Military Hearing Loss Claims" },
      { href: "/work-related-illness/industrial-deafness-claims", label: "Industrial Deafness Claims" },
      { href: "/work-related-illness/asbestos-solicitors", label: "Asbestos Solicitors" },
      { href: "/work-related-illness/mesothelioma-solicitors", label: "Mesothelioma Solicitors" },
    ]
  },
  { href: "/housing-disrepair", label: "Housing Disrepair" },
  { 
    href: "/personal-injury", 
    label: "Personal Injury",
    subItems: [
      { href: "/personal-injury/road-traffic-accident", label: "Road Traffic Accident" },
      { href: "/personal-injury/motorcycle-accident-claims", label: "Motorcycle Accident Claims" },
      { href: "/personal-injury/accident-at-work", label: "Accident at Work" },
      { href: "/personal-injury/slips-trips-and-falls", label: "Slips, Trips and Falls" },
      { href: "/personal-injury/pedestrian-claims", label: "Pedestrian Claims" },
    ]
  },
  { href: "/recruitment", label: "Recruitment" },
  { href: "/legal-costs", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Spotlight effect state for header
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerMousePos, setHeaderMousePos] = useState({ x: 0, y: 0 });
  const [headerSpotlightOpacity, setHeaderSpotlightOpacity] = useState(0);
  
  // Spotlight effect state for dropdown
  const [dropdownMousePos, setDropdownMousePos] = useState({ x: 0, y: 0 });
  const [dropdownSpotlightOpacity, setDropdownSpotlightOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHeaderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    setHeaderMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (href: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(href);
    setHoveredLink(href);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredLink(null);
    }, 150);
  };

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
          className={`max-w-7xl mx-auto px-4 transition-all duration-500 ${
            isScrolled ? "mx-4 lg:mx-auto" : ""
          }`}
        >
          <motion.div 
            ref={headerRef}
            onMouseMove={handleHeaderMouseMove}
            onMouseEnter={() => setHeaderSpotlightOpacity(1)}
            onMouseLeave={() => setHeaderSpotlightOpacity(0)}
            className="relative flex items-center justify-between transition-all duration-500 bg-[#1a1a1a]/60 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10"
          >
            {/* Spotlight gradient for header */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 z-0 overflow-hidden"
              style={{
                opacity: headerSpotlightOpacity,
                background: `radial-gradient(600px circle at ${headerMousePos.x}px ${headerMousePos.y}px, rgba(212, 175, 55, 0.15), transparent 40%)`,
              }}
            />
            
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo.png"
                  alt="M&S Law Ltd"
                  width={100}
                  height={40}
                  className="h-8 w-auto transition-all duration-500 brightness-0 invert"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="relative z-10 hidden lg:flex items-center gap-0">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.href)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    className="relative px-3 py-2 text-[12px] font-medium transition-colors group flex items-center gap-1 whitespace-nowrap"
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${
                      activeDropdown === link.href ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}>
                      {link.label}
                    </span>
                    {link.subItems && (
                      <ChevronDown 
                        size={12} 
                        className={`transition-all duration-300 ${
                          activeDropdown === link.href ? "text-white rotate-180" : "text-white/50"
                        }`}
                      />
                    )}
                    {/* Underline effect */}
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-white"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeDropdown === link.href ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ originX: 0.5 }}
                    />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.subItems && activeDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[100]"
                        onMouseEnter={() => handleMouseEnter(link.href)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Arrow pointer */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a1a1a]/90 rotate-45 border-l border-t border-white/10" />
                        
                        <div 
                          className="relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden min-w-[280px]"
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setDropdownMousePos({
                              x: e.clientX - rect.left,
                              y: e.clientY - rect.top,
                            });
                          }}
                          onMouseEnter={() => setDropdownSpotlightOpacity(1)}
                          onMouseLeave={() => setDropdownSpotlightOpacity(0)}
                        >
                          {/* Spotlight gradient for dropdown */}
                          <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0"
                            style={{
                              opacity: dropdownSpotlightOpacity,
                              background: `radial-gradient(300px circle at ${dropdownMousePos.x}px ${dropdownMousePos.y}px, rgba(212, 175, 55, 0.2), transparent 40%)`,
                            }}
                          />
                          
                          {/* Gradient top border */}
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 z-10" />
                          
                          <div className="relative z-10 py-2">
                            {link.subItems.map((subItem, index) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="group/item block px-5 py-3 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 relative"
                              >
                                <span className="relative z-10 flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover/item:bg-amber-500 group-hover/item:scale-125 transition-all duration-200" />
                                  {subItem.label}
                                </span>
                                {index < link.subItems!.length - 1 && (
                                  <div className="absolute bottom-0 left-5 right-5 h-px bg-white/10" />
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="relative z-10 hidden lg:flex items-center gap-4 flex-shrink-0">
              <a
                href="tel:01254404055"
                className="group relative text-[12px] font-medium px-5 py-2.5 rounded-full transition-all overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:shadow-[0_10px_30px_rgba(194,159,97,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                  Get in Touch
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-10 lg:hidden p-2 transition-colors text-white"
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
      </motion.header>

      {/* Mobile Menu - Full Screen Glass - Outside header for proper stacking */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[9999]"
            style={{ willChange: "opacity" }}
          >
            {/* Solid background layer */}
            <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
            
            {/* Blur overlay for glass effect */}
            <div className="absolute inset-0 backdrop-blur-3xl bg-black/40 z-[1]" />

            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 text-white/80 hover:text-white transition-colors z-[50]"
            >
              <X size={28} />
            </button>

            <div className="relative z-10 flex flex-col justify-start items-center h-full px-8 pt-24 pb-8 overflow-y-auto">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                  className="w-full max-w-sm"
                >
                  {link.subItems ? (
                    <div>
                      <button
                        onClick={() => setExpandedMobileItem(
                          expandedMobileItem === link.href ? null : link.href
                        )}
                        className="flex items-center justify-center gap-2 w-full py-3 text-white/80 hover:text-white transition-colors font-serif text-2xl text-center"
                      >
                        {link.label}
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-300 ${
                            expandedMobileItem === link.href ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedMobileItem === link.href && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="py-2 mb-2">
                              {link.subItems.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-2.5 text-white/60 hover:text-amber-400 transition-colors text-base text-center"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-white/80 hover:text-white transition-colors font-serif text-2xl text-center"
                    >
                      {link.label}
                    </Link>
                  )}
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
    </>
  );
}

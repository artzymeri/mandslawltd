"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Car, Send } from "lucide-react";

// Spotlight Card Component with mouse-following gold gradient
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
      className={`relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] ${className}`}
    >
      {/* Spotlight gradient */}
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

// Animated Input with expanding gold border
function AnimatedInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  isTextarea = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  isTextarea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;

  const inputProps = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    required,
    className: `w-full bg-transparent text-white text-base pt-6 pb-3 outline-none placeholder-transparent peer`,
  };

  return (
    <div className="relative">
      {/* Floating Label */}
      <motion.label
        initial={false}
        animate={{
          y: isActive ? 0 : 12,
          scale: isActive ? 0.75 : 1,
          opacity: isActive ? 0.5 : 0.4,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-0 top-0 origin-left text-white pointer-events-none"
      >
        {label}
      </motion.label>

      {/* Input/Textarea */}
      {isTextarea ? (
        <textarea rows={4} {...inputProps} className={`${inputProps.className} resize-none`} />
      ) : (
        <input type={type} {...inputProps} />
      )}

      {/* Bottom border with center-expand animation */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 origin-center"
      />
    </div>
  );
}

// Shine Button with diagonal sweep effect
function ShineButton({ children, type = "button" }: { children: React.ReactNode; type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      className="group relative w-full overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 text-[#0a0a0a] px-8 py-5 rounded-xl font-semibold text-base transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-[1.01]"
    >
      {/* Shine sweep effect */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
      
      {/* Button content */}
      <span className="relative flex items-center justify-center gap-3">
        {children}
      </span>
    </button>
  );
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section 
      ref={containerRef} 
      id="contact" 
      className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Animated film grain overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.03)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.02)_0%,transparent_40%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Get in touch
          </h2>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-5 gap-12 lg:gap-16"
        >
          {/* Contact Form - Left Side */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedInput
                  label="Name"
                  value={formData.name}
                  onChange={(value) => setFormData({ ...formData, name: value })}
                  required
                />
                <AnimatedInput
                  label="Email address"
                  type="email"
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  required
                />
              </div>

              <AnimatedInput
                label="Phone number"
                type="tel"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
              />

              <AnimatedInput
                label="How can we help you?"
                value={formData.message}
                onChange={(value) => setFormData({ ...formData, message: value })}
                isTextarea
                required
              />

              <div className="pt-4">
                <ShineButton type="submit">
                  <span>Send Message</span>
                  <Send size={18} />
                </ShineButton>
              </div>
            </form>
          </motion.div>

          {/* Contact Info Cards - Right Side */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-5">
            {/* Phone Card */}
            <SpotlightCard>
              <a href="tel:01254404055" className="block p-6 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center border border-amber-500/20">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Call Us</span>
                </div>
                <p 
                  className="text-2xl md:text-3xl text-white group-hover:text-amber-400 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  01254 40 40 55
                </p>
              </a>
            </SpotlightCard>

            {/* Email Card */}
            <SpotlightCard>
              <a href="mailto:info@mandslawltd.co.uk" className="block p-6 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center border border-amber-500/20">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Email</span>
                </div>
                <p className="text-lg text-white group-hover:text-amber-400 transition-colors duration-300">
                  info@mandslawltd.co.uk
                </p>
              </a>
            </SpotlightCard>

            {/* Address Card */}
            <SpotlightCard>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center border border-amber-500/20">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Visit Us</span>
                </div>
                <p className="text-base text-white/70 leading-relaxed">
                  Suite 201, Cardwell House,<br />
                  Cardwell Place, Blackburn,<br />
                  Lancashire, BB2 1LG
                </p>
              </div>
            </SpotlightCard>

            {/* Parking Note */}
            <div className="flex items-center gap-3 px-2 pt-2">
              <Car className="w-4 h-4 text-amber-500/40" />
              <p className="text-white/30 text-sm">
                Easy motorway access & parking
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

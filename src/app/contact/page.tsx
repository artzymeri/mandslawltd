"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";

// Spotlight Card Component
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
      className={`relative overflow-hidden rounded-2xl bg-[#1a1a1a]/40 border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] ${className}`}
    >
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    "Wills and Trusts",
    "Lasting Power of Attorney",
    "Probate Disputes",
    "Work Related Illness",
    "Industrial Deafness Claims",
    "Asbestos Claims",
    "Mesothelioma Claims",
    "Housing Disrepair",
    "Personal Injury",
    "Road Traffic Accident",
    "Accident at Work",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Office",
      content: "Suite 201, Cardwell House, Cardwell Place, Blackburn, Lancashire, BB2 1LG",
      href: "https://maps.google.com/?q=Suite+201+Cardwell+House+Cardwell+Place+Blackburn+Lancashire+BB2+1LG",
    },
    {
      icon: Phone,
      title: "Make a Call",
      content: "01254 40 40 55",
      href: "tel:01254404055",
    },
    {
      icon: Mail,
      title: "Write a Message",
      content: "info@mandslawltd.co.uk",
      href: "mailto:info@mandslawltd.co.uk",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-white/50 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-500">Contact Us</span>
          </motion.div>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
            >
              <Mail size={16} className="text-amber-500" />
              <span className="text-amber-500 text-sm font-medium">Get in Touch</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
            >
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Us
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/70 leading-relaxed"
            >
              Get in touch with our expert legal team. We're here to help you with 
              all your legal needs and provide the guidance you deserve.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target={info.icon === MapPin ? "_blank" : undefined}
                rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                      <info.icon size={28} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-2 group-hover:text-amber-500 transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">{info.content}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Call Back{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Request
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8" />

              {isSubmitted ? (
                <SpotlightCard className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-white font-serif text-2xl mb-4">Thank You!</h3>
                  <p className="text-white/60 mb-6">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", service: "", message: "", consent: false });
                    }}
                    className="text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    Send another message
                  </button>
                </SpotlightCard>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/70 text-sm mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/70 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-white/70 text-sm mb-2">
                      Select Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a service...</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-[#1a1a1a]">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/70 text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                      placeholder="Tell us about your case..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-[#1a1a1a] text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                    />
                    <label htmlFor="consent" className="text-white/50 text-sm">
                      I agree that my submitted data is being collected and stored.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="p-8 mb-6">
                <h3 className="font-serif text-2xl text-white mb-6">Office Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Clock size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Monday - Friday</p>
                      <p className="text-white/50 text-sm">9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Clock size={20} className="text-white/30" />
                    </div>
                    <div>
                      <p className="text-white/50 font-medium">Saturday - Sunday</p>
                      <p className="text-white/30 text-sm">Closed</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-8 mb-6">
                <h3 className="font-serif text-2xl text-white mb-6">Quick Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Wills and Trusts", href: "/wills-and-trusts" },
                    { label: "Work Related Illness", href: "/work-related-illness" },
                    { label: "Housing Disrepair", href: "/housing-disrepair" },
                    { label: "Personal Injury", href: "/personal-injury" },
                    { label: "Recruitment", href: "/recruitment" },
                    { label: "Pricing", href: "/legal-costs" },
                    { label: "Contact Us", href: "/contact" },
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-white/60 hover:text-amber-500 transition-colors text-sm flex items-center gap-1"
                    >
                      <ArrowRight size={12} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-8">
                <h3 className="font-serif text-2xl text-white mb-4">Need Urgent Help?</h3>
                <p className="text-white/60 mb-6">
                  For urgent legal matters, please call us directly and we'll do our 
                  best to assist you immediately.
                </p>
                <a
                  href="tel:01254404055"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  <Phone size={18} />
                  Call: 01254 40 40 55
                </a>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Find{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Us
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Visit our office in Blackburn, Lancashire. We're conveniently located 
              and ready to assist you with your legal needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="p-2 overflow-hidden">
              <div className="relative rounded-xl overflow-hidden" style={{ height: "400px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2361.9736098251397!2d-2.4855!3d53.7500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b61d5a8b9e5a1%3A0x1234567890abcdef!2sCardwell%20Place%2C%20Blackburn%20BB2%201LG!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
                <div className="absolute inset-0 pointer-events-none border border-white/[0.08] rounded-xl" />
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <a
              href="https://maps.google.com/?q=Suite+201+Cardwell+House+Cardwell+Place+Blackburn+Lancashire+BB2+1LG"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
            >
              <MapPin size={18} />
              Suite 201, Cardwell House, Cardwell Place, Blackburn, Lancashire, BB2 1LG
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Animated flowing background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    let animationId: number;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);
      
      if (currentTime - lastFrameTime < frameInterval) return;
      lastFrameTime = currentTime;

      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft flowing waves - light amber tones
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        const baseY = canvas.height * (0.3 + wave * 0.2);
        const amplitude = 60 - wave * 15;
        const frequency = 0.002 + wave * 0.001;
        const speed = time * (1 + wave * 0.3);
        
        for (let x = 0; x <= canvas.width; x += isMobile ? 8 : 4) {
          const y = baseY + 
            Math.sin(x * frequency + speed) * amplitude +
            Math.sin(x * frequency * 0.5 + speed * 1.3) * (amplitude * 0.4);
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, baseY - amplitude, 0, canvas.height);
        gradient.addColorStop(0, `rgba(194, 159, 97, ${0.04 - wave * 0.01})`);
        gradient.addColorStop(1, "rgba(194, 159, 97, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Floating orbs
      if (!isMobile) {
        for (let i = 0; i < 8; i++) {
          const x = (Math.sin(time * 0.5 + i * 1.2) * 0.3 + 0.5) * canvas.width;
          const y = (Math.cos(time * 0.4 + i * 0.9) * 0.3 + 0.4) * canvas.height;
          const size = 80 + Math.sin(time + i) * 20;
          
          const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          orbGradient.addColorStop(0, "rgba(194, 159, 97, 0.06)");
          orbGradient.addColorStop(1, "rgba(194, 159, 97, 0)");
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = orbGradient;
          ctx.fill();
        }
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const inputClasses = (field: string) => `
    w-full px-5 py-4 bg-white/80 backdrop-blur-sm rounded-xl border transition-all duration-300 text-base
    ${focusedField === field || formData[field as keyof typeof formData]
      ? "border-amber-500/40 shadow-[0_0_20px_rgba(194,159,97,0.1)]"
      : "border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20"
    }
    focus:outline-none focus:border-amber-500/40 focus:shadow-[0_0_20px_rgba(194,159,97,0.1)]
    placeholder:text-[#1a1a1a]/30
  `;

  return (
    <section ref={containerRef} id="contact" className="relative py-24 bg-gradient-to-b from-[#faf9f7] to-[#f5f3f0] overflow-hidden">
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-amber-600/60 text-xs tracking-[0.3em] uppercase mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#1a1a1a] tracking-tight font-serif">
            Get in touch
          </h2>
        </motion.div>

        {/* Main Grid - More compact */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-white/80">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses("name")}
                    placeholder="Your name"
                    required
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses("email")}
                    placeholder="Email address"
                    required
                  />
                </div>

                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses("phone")}
                  placeholder="Phone number"
                />

                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputClasses("message")} resize-none`}
                  placeholder="How can we help you?"
                  required
                />

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-medium transition-all hover:shadow-[0_15px_40px_rgba(194,159,97,0.25)] hover:scale-[1.01]"
                >
                  <span>Send Message</span>
                  <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info - Compact sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Phone */}
            <a
              href="tel:01254404055"
              className="group block bg-[#1a1a1a] rounded-xl p-5 text-white hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-white/50 text-xs uppercase tracking-wide">Call us</p>
              </div>
              <p className="text-xl md:text-2xl font-medium font-serif group-hover:text-amber-400 transition-colors">
                01254 40 40 55
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@mandslawltd.co.uk"
              className="group block bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-[#1a1a1a]/5 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-[#1a1a1a]/50 text-xs uppercase tracking-wide">Email</p>
              </div>
              <p className="text-base text-[#1a1a1a] group-hover:text-amber-600 transition-colors truncate">
                info@mandslawltd.co.uk
              </p>
            </a>

            {/* Address */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-[#1a1a1a]/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-[#1a1a1a]/50 text-xs uppercase tracking-wide">Visit us</p>
              </div>
              <p className="text-sm text-[#1a1a1a]/80 leading-relaxed">
                Suite 201, Cardwell House,<br />
                Cardwell Place, Blackburn,<br />
                Lancashire, BB2 1LG
              </p>
            </div>

            {/* Hours note */}
            <div className="flex items-center gap-2 px-1 pt-2">
              <Clock className="w-4 h-4 text-amber-600/40" />
              <p className="text-[#1a1a1a]/40 text-xs">
                Easy motorway access & parking
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

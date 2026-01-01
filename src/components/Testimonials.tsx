"use client";

import { motion, AnimatePresence } from "framer-motion";

// GPU-optimized transition
const gpuTransition = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Shaun Connolly",
    text: "Having dealt with M&S Law with my hearing claim from British Coal i can say i was treated with professionalism, courtesy and care. Naeem was always on the phone letting me know how things were progressing. I would highly recommend this firm.",
    role: "Industrial Hearing Claim",
  },
  {
    name: "Gwil Davies",
    text: "First class service... well informed throughout... have recommended to my work colleagues without hesitation... thank you guys great job.",
    role: "Work Illness Client",
  },
  {
    name: "Keith White",
    text: "Very helpful dealing with an industrial hearing loss claim. Very thorough hearing test conducted at home, and a successful result in the end.",
    role: "Hearing Loss Claim",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Simplified GPU-friendly variants (opacity + transform only)
  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 50 : -50,
    }),
  };

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6">
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
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1a1a1a] tracking-tight mb-6 font-serif"
          >
            Trusted by our clients
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-[#1a1a1a]/50">5.0 on Google</span>
          </motion.div>
        </div>

        {/* Main testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(194,159,97,0.3)] z-10"
          >
            <Quote className="w-8 h-8 text-white" />
          </motion.div>

          {/* Testimonial card */}
          <div className="relative z-20 bg-gradient-to-br from-[#fafafa] to-white rounded-[32px] p-10 md:p-16 pt-20 border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.06)] overflow-hidden">
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ...gpuTransition }}
                className="relative z-10 text-center"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Stars - static for performance */}
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-xl md:text-2xl lg:text-3xl text-[#1a1a1a]/80 leading-relaxed mb-10 font-serif">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-medium text-[#1a1a1a] text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-[#1a1a1a]/40 text-sm mt-1">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="relative z-30 flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 hover:border-amber-500/30 transition-all group cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-[#1a1a1a]/50 group-hover:text-amber-600 transition-colors" />
              </button>

              {/* Dots */}
              <div className="flex gap-2 px-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === activeIndex 
                        ? "w-8 bg-gradient-to-r from-amber-500 to-amber-600" 
                        : "w-2 bg-black/10 hover:bg-black/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 hover:border-amber-500/30 transition-all group cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-[#1a1a1a]/50 group-hover:text-amber-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-black/5"
        >
          <div className="text-center">
            <p className="text-3xl font-medium text-[#1a1a1a] font-serif">100+</p>
            <p className="text-sm text-[#1a1a1a]/40">Happy Clients</p>
          </div>
          <div className="w-px h-12 bg-black/10 hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl font-medium text-[#1a1a1a] font-serif">5.0★</p>
            <p className="text-sm text-[#1a1a1a]/40">Google Rating</p>
          </div>
          <div className="w-px h-12 bg-black/10 hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl font-medium text-[#1a1a1a] font-serif">SRA</p>
            <p className="text-sm text-[#1a1a1a]/40">Regulated</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

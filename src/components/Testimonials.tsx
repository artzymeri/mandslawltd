"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Shaun Connolly",
    text: "Having dealt with M&S Law with my hearing claim from British Coal i can say i was treated with professionalism, courtesy and care. Naeem was always on the phone letting me know how things were progressing. I would highly recommend this firm.",
  },
  {
    name: "Gwil Davies",
    text: "First class service... well informed throughout... have recommended to my work colleagues without hesitation... thank you guys great job.",
  },
  {
    name: "Keith White",
    text: "Very helpful dealing with an industrial hearing loss claim. Very thorough hearing test conducted at home, and a successful result in the end.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#1a1a1a]/50 text-sm tracking-[0.2em] uppercase mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight mb-6"
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
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#1a1a1a] text-[#1a1a1a]" />
              ))}
            </div>
            <span className="text-[#1a1a1a]/60">5.0 on Google</span>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-8 h-full border border-black/5">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#1a1a1a] text-[#1a1a1a]" />
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="text-[#1a1a1a]/70 leading-relaxed mb-8"
                >
                  "{testimonial.text}"
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="font-medium text-[#1a1a1a]"
                >
                  {testimonial.name}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

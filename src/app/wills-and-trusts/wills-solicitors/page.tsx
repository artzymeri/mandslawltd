"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  FileText, 
  Shield, 
  Users, 
  Heart, 
  Briefcase, 
  RefreshCw, 
  Phone, 
  Mail,
  CheckCircle,
  Award
} from "lucide-react";
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

const reasons = [
  {
    icon: Shield,
    title: "Peace Of Mind",
    description: "A solicitor-drawn Will gives you confidence that following your death there is a valid legal document to give effect to your wishes. Do-it-yourself Wills often fail to comply with the law and are ineffective. Sometimes they result in expensive and stressful litigation."
  },
  {
    icon: FileText,
    title: "Divide Your Assets As You Please",
    description: "Without a Will, your estate will be distributed in accordance with the Intestacy Rules. This may be contrary to your wishes. With a Will, you decide."
  },
  {
    icon: Users,
    title: "Protect Your Children",
    description: "Those with young children can appoint a guardian to take care of their children. Wills can also create trusts for children to make appropriate financial provision."
  },
  {
    icon: Heart,
    title: "Provide For A Partner And Friends",
    description: "The Intestacy Rules do not provide for a partner with whom you live or for your friends or chosen charities. By making a Will, you decide."
  },
  {
    icon: Briefcase,
    title: "Protect Your Business Assets",
    description: "Whether you are a sole trader, partner or shareholder, you decide what happens to your business."
  },
  {
    icon: RefreshCw,
    title: "Change Of Circumstances",
    description: "If your personal or financial circumstances have changed, you should update your Will."
  }
];

const fees = [
  { service: "Basic Will", price: "£120", vat: "+ VAT", note: null },
  { service: "Mirrored Wills", price: "£180", vat: "+ VAT", note: null },
  { service: "Lasting Power of Attorney", price: "£175", vat: "+ VAT", note: "50% off (was £350), plus registration fee of £82 for each LPA", highlight: true },
  { service: "Will Trust", price: "£500", vat: "+ VAT", note: null },
  { service: "Trusts", price: "From £2000", vat: "+ VAT", note: "Can vary subject to your requirements" },
];

export default function WillsSolicitorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
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
            <Link href="/wills-and-trusts" className="hover:text-white transition-colors">Wills and Trusts</Link>
            <span>/</span>
            <span className="text-amber-500">Wills Solicitors</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <FileText size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Wills & Trusts</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Wills{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Solicitors
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                A Will that has been legally prepared by a solicitor and executed and witnessed 
                according to the law is difficult to contest and will ensure that your wishes are met.
              </p>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                <strong className="text-white">Avoid costly mistakes:</strong> speak to us today.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Enquire Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:01254404066"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300"
                >
                  <Phone size={18} />
                  01254 40 40 66
                </a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/wills-solicitors.jpg"
                  alt="Professional Will Writing Services"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <CheckCircle size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Legally Valid</p>
                    <p className="text-white/50 text-sm">Professionally drafted</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cancer Research UK Partnership */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center flex-shrink-0">
                  <Award size={40} className="text-pink-400" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-2xl text-white mb-2">
                    Partner Solicitor of{" "}
                    <span className="text-pink-400">Cancer Research UK</span>
                  </h3>
                  <p className="text-white/70">
                    We've partnered with Cancer Research UK to provide both a telephone and online Will-writing 
                    service to suit your needs, that is <strong className="text-white">free for people living in 
                    England & Wales</strong> who want to write a simple Will.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* Why Instruct Us Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Why You Should Instruct Us to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Make a Will
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Making a Will is one of the most important things you can do for your loved ones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="h-full p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4">
                    <reason.icon size={24} className="text-amber-500" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3">{reason.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{reason.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Our Standard{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Fees
              </span>
            </h2>
            <p className="text-white/60">
              Transparent pricing for all our will writing services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="overflow-hidden">
              <div className="divide-y divide-white/10">
                {fees.map((fee, index) => (
                  <div 
                    key={fee.service}
                    className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      fee.highlight ? 'bg-amber-500/10' : ''
                    }`}
                  >
                    <div>
                      <h4 className="text-white font-medium text-lg">{fee.service}</h4>
                      {fee.note && (
                        <p className="text-amber-400 text-sm mt-1">{fee.note}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-serif text-white">{fee.price}</span>
                      <span className="text-white/50 ml-2">{fee.vat}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-white/5 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  <strong className="text-white">Non Basic Wills:</strong> For any other Wills, please contact 
                  us to discuss the matter in order for us to provide a quotation.
                </p>
                <p className="text-white/50 text-xs mt-3">
                  *The above fees can vary according to the work involved and can be significantly more than the 
                  prices provided above. A more accurate figure can be provided once we have discussed the matter 
                  with you in detail.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Costs Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 p-6 rounded-xl border border-green-500/20 bg-green-500/5"
          >
            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-medium mb-2">Transparent Costs</h4>
                <p className="text-white/70 text-sm">
                  We provide a transparent fee estimate from the outset to ensure you are fully informed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Discuss Your Legacy Planning
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Contact us today to discuss your legacy planning needs. Our experienced solicitors 
                are here to help you protect your family's future.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Enquire Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:01254404066"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300"
                >
                  <Phone size={18} />
                  01254 40 40 66
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-white/50">
                <Mail size={16} />
                <a href="mailto:jade@mandslawltd.co.uk" className="hover:text-amber-400 transition-colors">
                  jade@mandslawltd.co.uk
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

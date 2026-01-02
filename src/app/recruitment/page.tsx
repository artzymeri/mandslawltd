"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Users, Briefcase, MapPin, Clock, PoundSterling, Scale, Mail, ExternalLink } from "lucide-react";
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

export default function RecruitmentPage() {
  const jobListings = [
    {
      title: "Litigation Solicitor",
      department: "Litigation",
      location: "Anywhere",
      salary: "£25,000.00 - £30,000.00 per year",
      type: "Full-time, Part-time",
      description: "We are looking for an experienced litigation solicitor to join our growing team. The ideal candidate will have experience in civil litigation and be able to manage their own caseload.",
    },
    {
      title: "Housing Disrepair Solicitor",
      department: "Housing Disrepair",
      location: "Anywhere",
      salary: "£30,000.00 - £40,000.00 per year",
      type: "Full-time, Permanent",
      description: "Join our specialist housing disrepair team. We are seeking a motivated solicitor with experience in housing law to help tenants with disrepair claims.",
    },
    {
      title: "Fee Sharing Solicitors/Consultants",
      department: "Various",
      location: "Anywhere",
      salary: "Generous Packages available",
      type: "Full-time, Permanent",
      description: "We welcome consultants interested in bringing new expertise to our firm. Generous fee-sharing arrangements available for the right candidates.",
    },
  ];

  const benefits = [
    { icon: PoundSterling, title: "Competitive Salary", description: "Attractive remuneration packages" },
    { icon: Users, title: "Supportive Team", description: "Collaborative work environment" },
    { icon: Clock, title: "Flexible Working", description: "Work-life balance options" },
    { icon: Scale, title: "Career Growth", description: "Development opportunities" },
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
            <span className="text-amber-500">Recruitment</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Briefcase size={16} className="text-amber-500" />
                <span className="text-amber-500 text-sm font-medium">Join Our Team</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Career{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Opportunities
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                M&S Law offers a wide range of opportunities for the right individuals to join 
                our expanding law firm. We are also keen to hear from consultants that would be 
                interested in bringing new expertise to our firm, allowing us to grow into new 
                areas, rewarded with generous packages.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#vacancies"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  View Vacancies
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:careers@mandslawltd.co.uk"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300"
                >
                  <Mail size={18} />
                  Email Us
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
                  src="/images/recruitment.jpg"
                  alt="Join M&S Law"
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
                    <Users size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Growing Team</p>
                    <p className="text-white/50 text-sm">Expanding law firm</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Why Work at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                M&S Law?
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Join a dynamic and supportive team where your contributions are valued 
              and your career can flourish.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4 mx-auto">
                    <benefit.icon size={28} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{benefit.title}</h3>
                  <p className="text-white/50 text-sm">{benefit.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies Section */}
      <section id="vacancies" className="relative py-20">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Current{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Vacancies
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Explore our current job openings and find the perfect opportunity for your career.
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-medium">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                          {job.type}
                        </span>
                      </div>
                      
                      <h3 className="text-white font-serif text-2xl mb-3">{job.title}</h3>
                      
                      <p className="text-white/60 mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-white/50">
                          <MapPin size={16} className="text-amber-500" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-white/50">
                          <PoundSterling size={16} className="text-amber-500" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                      >
                        Apply Now
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultant Section */}
      <section className="relative py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                    Consultant{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                      Opportunities
                    </span>
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    Are you an experienced solicitor looking for more flexibility and better rewards? 
                    We offer generous fee-sharing arrangements for consultants who can bring new 
                    expertise and clients to our firm.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Generous fee-sharing packages",
                      "Full administrative and support services",
                      "Professional indemnity insurance covered",
                      "Flexibility to build your own practice",
                      "Access to our established client base",
                      "Opportunity to grow into new practice areas",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ArrowRight size={12} className="text-amber-500" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                  >
                    Discuss Opportunities
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="bg-black/30 rounded-2xl p-8">
                  <h3 className="text-white font-medium text-xl mb-6 text-center">
                    Areas of Interest
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Personal Injury",
                      "Clinical Negligence",
                      "Employment Law",
                      "Family Law",
                      "Immigration",
                      "Commercial Law",
                      "Property Law",
                      "Criminal Law",
                    ].map((area, index) => (
                      <div key={index} className="flex items-center gap-2 text-white/70">
                        <Scale size={14} className="text-amber-500" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} className="text-amber-500" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Ready to Join Our Team?
              </h2>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                We're always looking for talented individuals to join M&S Law. If you don't 
                see a suitable vacancy listed, please send us your CV and we'll be in touch 
                if an opportunity arises.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Send Your CV
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:01254404055"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300"
                >
                  <Phone size={18} />
                  Call: 01254 40 40 55
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

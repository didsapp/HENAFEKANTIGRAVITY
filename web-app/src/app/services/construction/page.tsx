"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Building,
  Shield,
  DollarSign,
  Monitor,
  Building2,
  Factory,
  ChevronRight,
} from "lucide-react";
import LiquidGlassButton from "@/components/LiquidGlassButton";

const features = [
  {
    icon: <Monitor size={24} />,
    title: "Modern Design Software",
    desc: "Utilizing cutting-edge BIM and CAD technology for precise project execution.",
  },
  {
    icon: <Shield size={24} />,
    title: "Safety & Compliance",
    desc: "Rigorous safety protocols and regulatory compliance at every project phase.",
  },
  {
    icon: <DollarSign size={24} />,
    title: "Cost Optimization",
    desc: "Strategic planning to eliminate waste, prevent over-budgeting, and maximize ROI.",
  },
  {
    icon: <Building size={24} />,
    title: "BIM-Driven Execution",
    desc: "Building Information Modeling for accurate planning, visualization, and collaboration.",
  },
];

const projectTypes = [
  {
    icon: <Building2 size={24} />,
    title: "High-Rise Residential",
    desc: "Premium island residential towers with modern amenities and luxury finishes.",
  },
  {
    icon: <Factory size={24} />,
    title: "Industrial Facilities",
    desc: "Hotels, shortlets, gas stations, and commercial buildings engineered for efficiency.",
  },
  {
    icon: <Building size={24} />,
    title: "Mainland & Island Developments",
    desc: "Comprehensive development projects across Lagos mainland and island areas.",
  },
];

export default function ConstructionPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[var(--color-gold)] text-sm font-semibold tracking-wider uppercase">
            Our Services
          </span>
          <h1 className="text-5xl font-bold text-white mt-3 mb-6">
            Construction Services
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            End-to-end construction services using modern design software, with
            focus on safety, supervision, compliance, and cost optimization
            through BIM-driven execution strategies.
          </p>
        </motion.div>

        {/* Core Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-5 text-[var(--color-gold)]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Project Portfolio Gallery */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-14">
            <span className="text-[var(--color-neon-blue)] text-xs font-bold tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl font-bold text-white mt-3">
              Our Project Portfolio
            </h2>
          </div>

          {/* High-Rise Residential */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-neon-blue)]/10 flex items-center justify-center text-[var(--color-neon-blue)]">
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">High-Rise Residential</h3>
                <p className="text-gray-400 text-sm">Premium island residential towers with modern amenities and luxury finishes.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { src: "/gallery-highrise-1.jpg", alt: "Luxury high-rise residential tower with glass facade" },
                { src: "/gallery-highrise-2.jpg", alt: "Modern residential skyscraper at sunset" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative h-[280px] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Industrial Facilities */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
                <Factory size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Industrial Facilities</h3>
                <p className="text-gray-400 text-sm">Hotels, shortlets, gas stations, and commercial buildings engineered for efficiency.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { src: "/gallery-industrial-1.jpg", alt: "Luxury hotel resort with pool and tropical landscaping" },
                { src: "/gallery-industrial-2.jpg", alt: "Modern commercial hotel facility with elegant design" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative h-[280px] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mainland & Island Developments */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-neon-blue)]/10 flex items-center justify-center text-[var(--color-neon-blue)]">
                <Building size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mainland & Island Developments</h3>
                <p className="text-gray-400 text-sm">Comprehensive development projects across Lagos mainland and island areas.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { src: "/gallery-mainland-1.jpg", alt: "Modern residential estate development" },
                { src: "/gallery-mainland-2.jpg", alt: "Contemporary luxury island villa with pool" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative h-[280px] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Construction Project
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            From planning to handover, Henafek Homes delivers excellence at
            every stage of construction.
          </p>
          <LiquidGlassButton 
            onClick={() => window.location.href = "/contact"} 
            className="text-sm px-8 py-3 rounded-full mx-auto"
          >
            Get a Quote <ChevronRight size={16} />
          </LiquidGlassButton>
        </motion.div>
      </div>
    </div>
  );
}

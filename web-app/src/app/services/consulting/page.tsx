"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart3,
  Globe2,
  LineChart,
  Lightbulb,
  TrendingUp,
  Building2,
  Truck,
  Sprout,
  HardHat,
  ChevronRight,
} from "lucide-react";
import LiquidGlassButton from "@/components/LiquidGlassButton";

const mainServices = [
  {
    icon: <BarChart3 size={24} />,
    title: "Feasibility Studies",
    desc: "Comprehensive analysis to determine project viability before investment.",
  },
  {
    icon: <LineChart size={24} />,
    title: "Market & Sector Analysis",
    desc: "Deep-dive market research to identify opportunities and mitigate risks.",
  },
  {
    icon: <Globe2 size={24} />,
    title: "Foreign Direct Investment (FDI) Advisory",
    desc: "Expert guidance for international investors entering African markets.",
  },
  {
    icon: <Lightbulb size={24} />,
    title: "Business Model Development",
    desc: "Innovative business models tailored to your industry and growth goals.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Enterprise Growth Strategy",
    desc: "Scalable strategies to accelerate business growth and market expansion.",
  },
  {
    icon: <Building2 size={24} />,
    title: "Public & Private Sector Consulting",
    desc: "Advisory for ECOWAS, NIS, and other governmental and private entities.",
  },
];

const additionalAreas = [
  { icon: <Truck size={24} />, title: "Logistics" },
  { icon: <Sprout size={24} />, title: "Agriculture" },
  { icon: <HardHat size={24} />, title: "Construction Consulting" },
];

export default function ConsultingPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[var(--color-neon-blue)] text-sm font-semibold tracking-wider uppercase">
            Our Services
          </span>
          <h1 className="text-5xl font-bold text-white mt-3 mb-6">
            Consulting Services
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Henafek Homes integrates deep expertise across Trade, Finance,
            Investment, and Information Technology to deliver strategic
            consulting solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mainServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--color-neon-blue)]/10 flex items-center justify-center mb-5 text-[var(--color-neon-blue)]">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Areas */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Additional Consulting Areas
          </h2>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {additionalAreas.map((area, i) => (
              <div
                key={i}
                className="glass-sm p-6 text-center hover:translate-y-[-2px] transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
                  {area.icon}
                </div>
                <span className="text-white text-sm font-medium">
                  {area.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Strategic Guidance?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Leverage our expertise for market-leading consulting insight and
            enterprise strategy development.
          </p>
          <LiquidGlassButton 
            onClick={() => window.location.href = "/contact"} 
            className="text-sm px-8 py-3 rounded-full mx-auto"
          >
            Schedule Consultation <ChevronRight size={16} />
          </LiquidGlassButton>
        </motion.div>
      </div>
    </div>
  );
}

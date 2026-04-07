"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  MonitorSmartphone,
  TrendingUp,
  Podcast,
  Newspaper,
  Wrench,
  ChevronRight,
} from "lucide-react";
import LiquidGlassButton from "@/components/LiquidGlassButton";
import QualityMaterialsSection from "@/components/QualityMaterialsSection";
import ShopGallery from "@/components/ShopGallery";

const services = [
  {
    icon: <Package size={24} />,
    title: "Material Procurement",
    desc: "High-quality building materials sourced at competitive prices from trusted suppliers.",
  },
  {
    icon: <MonitorSmartphone size={24} />,
    title: "Digital Supply Management",
    desc: "Cutting-edge digital platform for clients and developers to manage orders and deliveries.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Daily Market Updates",
    desc: "Real-time pricing and availability updates to help you make informed purchasing decisions.",
  },
  {
    icon: <Podcast size={24} />,
    title: "Industry Podcasts & Videos",
    desc: "Expert insights and analysis through our multimedia content covering construction trends.",
  },
  {
    icon: <Newspaper size={24} />,
    title: "Industry News",
    desc: "Stay ahead with timely news updates on the building materials market and regulations.",
  },
  {
    icon: <Wrench size={24} />,
    title: "Tools & Equipment Trends",
    desc: "Latest innovations in construction tools, equipment, and building technologies.",
  },
];

export default function BuildingMaterialsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 overflow-hidden">
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
            Building Materials
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Procurement of top-quality building materials at competitive prices,
            with a digital supply management system for clients and developers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-5 text-[var(--color-gold)]">
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

        {/* Building Materials Inventory Shop Gallery */}
        <ShopGallery type="building-materials" />

        {/* Quality Materials Carousel Section */}
        <div className="mt-20">
           <QualityMaterialsSection />
        </div>

        <motion.div
          className="glass p-12 text-center mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Building Materials?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get competitive quotes and access our digital supply management
            platform for seamless procurement.
          </p>
          <LiquidGlassButton 
            onClick={() => window.location.href = "/contact"} 
            className="text-sm px-8 py-3 rounded-full mx-auto"
          >
            Request a Quote <ChevronRight size={16} />
          </LiquidGlassButton>
        </motion.div>
      </div>
    </div>
  );
}


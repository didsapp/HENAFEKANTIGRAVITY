"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  MapPin,
  Home,
  RefreshCw,
  Building,
  Hotel,
  ChevronRight,
} from "lucide-react";
import RealEstateGallerySection from "@/components/RealEstateGallerySection";
import LiquidGlassButton from "@/components/LiquidGlassButton";
import ShopGallery from "@/components/ShopGallery";

const services = [
  {
    icon: <FileText size={24} />,
    title: "Land Documentation",
    desc: "Permits, Approval of Plans, Certificate Issuance — complete documentation for land ownership and development rights.",
  },
  {
    icon: <MapPin size={24} />,
    title: "Sales of Land",
    desc: "Lease/Rent for Residential, Agricultural, Warehousing purposes across prime locations.",
  },
  {
    icon: <Home size={24} />,
    title: "Property Merchandising",
    desc: "Buy & Sell existing structures with our expert evaluation, pricing, and marketing services.",
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Remodeling",
    desc: "Modern BIM-based renovation solutions that transform and upgrade existing properties.",
  },
  {
    icon: <Building size={24} />,
    title: "Shortlet Apartments",
    desc: "Fully furnished short-term rental apartments in premium locations for business and leisure travelers.",
  },
  {
    icon: <Hotel size={24} />,
    title: "Hotel Accommodation",
    desc: "Premium hotel accommodation services and hospitality management for investors and guests.",
  },
];

export default function RealEstatePage() {
  return (
    <div className="min-h-screen pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[var(--color-gold)] text-sm font-semibold tracking-wider uppercase">
            Our Services
          </span>
          <h1 className="text-5xl font-bold text-white mt-3 mb-6">
            Real Estate Services
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Our core areas of property management antecedents spread across land
            documentation, sales, merchandising, remodeling, short-let
            apartments, and hotel accommodation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 hover:translate-y-[-4px] transition-all duration-300 group"
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

        {/* Real Estate Inventory Shop Gallery */}
        <ShopGallery type="real-estate" />

        {/* Real Estate Gallery Section (Previously Slider) */}
        <div className="mt-20">
           <RealEstateGallerySection />
        </div>

        {/* CTA */}
        <motion.div
          className="glass p-12 text-center mt-10 relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[var(--color-gold)]/5 blur-3xl rounded-full group-hover:bg-[var(--color-gold)]/10 transition-all duration-700" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Looking for Property Solutions?
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Contact our real estate team for personalized consultation and
            end-to-end property management services.
          </p>
          <LiquidGlassButton 
            onClick={() => window.location.href = "/contact"} 
            className="text-sm px-8 py-3 rounded-full mx-auto"
          >
            Get in Touch <ChevronRight size={20} />
          </LiquidGlassButton>
        </motion.div>
      </div>
    </div>
  );
}

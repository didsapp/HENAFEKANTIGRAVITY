"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Route,
  Droplets,
  Trash2,
  ClipboardList,
  Mountain,
  Shield,
  MapPinned,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import LiquidGlassButton from "@/components/LiquidGlassButton";

const services = [
  {
    icon: <Route size={24} />,
    title: "Estate Road Design",
    desc: "Professional road design for residential and commercial estates, built to last.",
  },
  {
    icon: <Droplets size={24} />,
    title: "Drainage & Sanitation Systems",
    desc: "Advanced drainage solutions and sanitation infrastructure for communities.",
  },
  {
    icon: <Trash2 size={24} />,
    title: "Waste Management Systems",
    desc: "Comprehensive waste management design for sustainable environments.",
  },
  {
    icon: <ClipboardList size={24} />,
    title: "Construction Project Management",
    desc: "End-to-end project management ensuring timely delivery, budget control, and quality.",
  },
  {
    icon: <Mountain size={24} />,
    title: "Geotechnical Surveys",
    desc: "Thorough geotechnical analysis for safe and reliable construction foundations.",
  },
  {
    icon: <Shield size={24} />,
    title: "Integrity Testing",
    desc: "Structural integrity assessments to ensure safety and building compliance.",
  },
  {
    icon: <MapPinned size={24} />,
    title: "Location Intelligence & Design Analysis",
    desc: "Data-driven location analysis for informed design and development decisions.",
  },
];

const projectImages = [
  { src: "/eng-road.jpg", title: "Estate Road Design" },
  { src: "/eng-drainage.jpg", title: "Drainage & Sanitation Systems" },
  { src: "/eng-waste.jpg", title: "Waste Management Systems" },
  { src: "/eng-pm.jpg", title: "Construction Project Management" },
  { src: "/eng-survey.jpg", title: "Geotechnical Surveys" },
  { src: "/eng-testing.jpg", title: "Integrity Testing" },
  { src: "/eng-analysis.jpg", title: "Location Intelligence & Design Analysis" },
];

export default function EngineeringPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = isMobile ? projectImages.length - 1 : projectImages.length - 2;

  const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <div className="min-h-screen pt-28 pb-20 overflow-hidden">
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
            Engineering Services
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Henafek Homes has executed structural projects across mainland,
            island, and rural areas with precision engineering and innovative
            solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, i) => (
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

        {/* Project Gallery Slider */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <span className="text-[var(--color-gold)] text-xs font-bold tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl font-bold text-white mt-3">
              Our Projects
            </h2>
          </div>

          <div className="relative overflow-hidden group py-4">
            <div 
              className="flex transition-transform ease-in-out" 
              style={{ 
                transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)`, 
                transitionDuration: '1000ms' 
              }}
            >
              {projectImages.map((img, idx) => (
                <div key={idx} className="min-w-full md:min-w-[50%] px-4 shrink-0">
                  <div className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden border border-white/10 group-slide cursor-pointer">
                    <Image 
                      src={img.src} 
                      alt={img.title} 
                      fill 
                      unoptimized
                      className="object-cover hover:scale-105 transition-transform duration-[1000ms]" 
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)]/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white tracking-wide">{img.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slider Controls */}
            <button 
              onClick={prevSlide} 
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--color-neon-blue)] hover:text-[#020617] transition-all z-10 md:opacity-0 md:group-hover:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={nextSlide} 
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--color-neon-blue)] hover:text-[#020617] transition-all z-10 md:opacity-0 md:group-hover:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="glass p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Engineering Expertise?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Our engineering team is ready to deliver innovative solutions for
            your infrastructure challenges.
          </p>
          <LiquidGlassButton 
            onClick={() => window.location.href = "/contact"} 
            className="text-sm px-8 py-3 rounded-full mx-auto"
          >
            Contact Us <ChevronRight size={16} />
          </LiquidGlassButton>
        </motion.div>
      </div>
    </div>
  );
}

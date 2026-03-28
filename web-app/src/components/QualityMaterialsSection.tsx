"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const materialImages = [
  { src: "/eng-site.jpg", title: "Site Materials", desc: "Premium raw materials for robust foundations." },
  { src: "/eng-testing.jpg", title: "Quality Testing", desc: "Rigorous laboratory testing for material integrity." },
  { src: "/eng-drainage.jpg", title: "Industrial Piping", desc: "High-grade drainage and sewage solutions." },
  { src: "/eng-road.jpg", title: "Infrastructure Asphalt", desc: "Top-tier road construction components." },
  { src: "/gallery-highrise-1.jpg", title: "High-Rise Steel", desc: "Structural steel for modern high-rise architecture." },
  { src: "/gallery-industrial-1.jpg", title: "Industrial Cement", desc: "Specialized cement for heavy-duty industrial builds." },
  { src: "/projects/commercial.png", title: "Commercial Finishing", desc: "Elite finishing materials for premium commercial spaces." },
  { src: "/projects/industrial.png", title: "Heavy Machinery", desc: "Integrated technology and advanced construction tools." },
];

export default function QualityMaterialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % materialImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % materialImages.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + materialImages.length) % materialImages.length);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[var(--color-gold)] text-sm font-semibold tracking-widest uppercase mb-3 block">
              Global Standards
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Verified Quality Materials
            </h2>
            <p className="text-gray-400 mt-4 text-lg font-light leading-relaxed">
              We provide only the highest-grade materials, tested and certified to withstand 
              the test of time and environmental challenges.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px] w-full glass overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }} // 1000ms transition as requested
              className="absolute inset-0"
            >
              <Image
                src={materialImages[index].src}
                alt={materialImages[index].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-12 left-12 right-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {materialImages[index].title}
                  </h3>
                  <p className="text-[var(--color-gold)] text-lg font-medium max-w-xl">
                    {materialImages[index].desc}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {materialImages.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 transition-all duration-300 rounded-full ${i === index ? 'w-8 bg-[var(--color-gold)]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

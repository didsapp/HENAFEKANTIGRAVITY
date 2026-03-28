"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

// Utilizing local images that represent Nigerian real estate (Mainland, Highrise, Housing, Smart City)
const galleryImages = [
  { 
    src: "/gallery-mainland-1.jpg", 
    title: "Lagos Mainland Residential", 
    location: "Lagos, Nigeria",
    desc: "Premium residential properties offering comfort and security in the heart of the mainland." 
  },
  { 
    src: "/projects/smartcity.png", 
    title: "Smart City Development", 
    location: "Abuja, Nigeria",
    desc: "Next-generation urban planning and eco-friendly smart homes." 
  },
  { 
    src: "/gallery-highrise-1.jpg", 
    title: "Victoria Island High-Rise", 
    location: "Lagos, Nigeria",
    desc: "Luxury commercial and residential high-rise towers with panoramic city views." 
  },
  { 
    src: "/projects/housing.png", 
    title: "Suburban Housing Estates", 
    location: "Lekki Phase 1, Lagos",
    desc: "Gated community designs tailored for modern family living." 
  },
  { 
    src: "/gallery-mainland-2.jpg", 
    title: "Premium Shortlet Apartments", 
    location: "Ikeja GRA, Lagos",
    desc: "Fully furnished, high-end shortlet apartments for executive stays." 
  },
  { 
    src: "/projects/commercial.png", 
    title: "Commercial Hub", 
    location: "Port Harcourt, Nigeria",
    desc: "State-of-the-art office spaces and retail merchandising centers." 
  },
  { 
    src: "/about-home.jpg", 
    title: "Luxury Duplexes", 
    location: "Banana Island, Lagos",
    desc: "Exclusive property remodeling and premium architectural designs." 
  },
  { 
    src: "/gallery-highrise-2.jpg", 
    title: "Hotel & Hospitality", 
    location: "Abuja, Nigeria",
    desc: "Premium hotel accommodation management and investment opportunities." 
  }
];

export default function RealEstateGallerySection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[var(--color-gold)] text-sm font-semibold tracking-widest uppercase mb-3 block">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Exclusive Luxury Properties
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-3xl mx-auto">
            Discover our exclusive collection of high-end properties, ranging from luxury 
            residential estates in Lagos to smart city commercial hubs across Nigeria.
          </p>
        </div>

        <div className="relative h-[450px] md:h-[650px] w-full glass rounded-3xl overflow-hidden group shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[index].src}
                alt={galleryImages[index].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 text-[var(--color-gold)] font-medium mb-3">
                    <MapPin size={18} />
                    <span className="tracking-wide uppercase text-sm">{galleryImages[index].location}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    {galleryImages[index].title}
                  </h3>
                  <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                    {galleryImages[index].desc}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)] transition-all"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)] transition-all"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute top-8 right-8 flex gap-3 z-10 glass-sm px-4 py-2">
            <span className="text-white font-semibold">
              0{index + 1}
            </span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400">
              0{galleryImages.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

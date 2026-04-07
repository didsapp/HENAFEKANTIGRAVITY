"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Filter, MapPin, ChevronRight, ShoppingCart, Tag, X, ArrowUpRight } from "lucide-react";
import { inventory, InventoryItem } from "@/lib/shop-data";
import LiquidGlassButton from "./LiquidGlassButton";

interface ShopGalleryProps {
  type: 'real-estate' | 'building-materials';
}

export default function ShopGallery({ type }: ShopGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("All");

  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      const matchesType = item.category === type;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeSubCategory === "All" || item.subCategory === activeSubCategory;
      return matchesType && matchesSearch && matchesCategory;
    });
  }, [type, searchQuery, activeSubCategory]);

  const subCategories = useMemo(() => {
    const categories = inventory
      .filter(item => item.category === type)
      .map(item => item.subCategory);
    return ["All", ...Array.from(new Set(categories))];
  }, [type]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-gold)]/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Inventory <span className="text-gradient">Showcase</span>
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Explore our curated selection of {type === 'real-estate' ? 'exclusive properties and luxury developments' : 'premium construction materials and industrial equipment'}.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative group w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-gold)] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-white focus:outline-none focus:border-[var(--color-gold)]/40 focus:ring-4 focus:ring-[var(--color-gold)]/5 transition-all placeholder:text-gray-500 text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            
            {/* Filter Toggle */}
            <div className="flex gap-1.5 p-1.5 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar max-w-full">
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                    activeSubCategory === sub 
                    ? 'bg-[var(--color-gold)] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <InventoryCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
          
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 text-gray-600 border border-white/5">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">No Results Found</h3>
              <p className="text-gray-400 max-w-sm font-light">We couldn't find any items matching your current filters. Try broadening your search.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveSubCategory("All"); }}
                className="mt-8 text-[var(--color-gold)] hover:underline text-sm font-medium"
              >
                Reset all filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function InventoryCard({ item, index }: { item: InventoryItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="group relative flex flex-col bg-[#0f172a]/40 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden hover:border-[var(--color-gold)]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Badge Tags */}
      <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-2">
        <span className="bg-black/40 backdrop-blur-xl text-[var(--color-gold)] text-[9px] font-bold tracking-[0.15em] uppercase py-2 px-3.5 rounded-full border border-[var(--color-gold)]/20 shadow-xl">
          {item.subCategory}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-[1.6rem]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
        
        {/* Quick View Button (Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
          <LiquidGlassButton 
            className="text-[10px] px-6 py-2.5 rounded-full"
            onClick={() => window.location.href = "/contact?item=" + encodeURIComponent(item.name)}
          >
            Request Details <ArrowUpRight size={14} className="ml-1" />
          </LiquidGlassButton>
        </div>

        {/* Hover Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
           <div className="flex gap-2">
              {item.features.slice(0, 2).map((f, i) => (
                <span key={i} className="text-[9px] text-white/70 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5 whitespace-nowrap">
                  {f}
                </span>
              ))}
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-gold)] transition-colors leading-tight tracking-tight">
            {item.name}
          </h3>
        </div>

        {item.location && (
          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4 font-light">
            <MapPin size={12} className="text-[var(--color-gold)]" />
            <span>{item.location}</span>
          </div>
        )}

        <p className="text-gray-400/80 text-sm line-clamp-2 mb-6 font-light leading-relaxed italic">
          "{item.description}"
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between pt-5 border-t border-white/5">
            <div>
              <span className="text-gray-500 text-[9px] uppercase tracking-widest block mb-1 font-medium">Starting from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[var(--color-gold)] font-extrabold text-xl tracking-tight">
                  {item.price.split(' ')[0]}
                </span>
                <span className="text-[var(--color-gold)]/60 text-xs font-medium">
                  {item.price.split(' ').slice(1).join(' ')}
                </span>
              </div>
            </div>
            <button 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300"
              onClick={() => window.location.href = "/contact?item=" + encodeURIComponent(item.name)}
            >
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

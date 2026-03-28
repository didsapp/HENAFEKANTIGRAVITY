"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Building2, 
  Wrench, 
  Landmark, 
  Briefcase, 
  HardHat, 
  ArrowRight,
  Filter,
  Search
} from "lucide-react";

const categories = ["All", "Construction", "Engineering", "Real Estate", "Consulting", "Infrastructure"];

const projects = [
  {
    title: "Lagos Island High-Rise",
    category: "Construction",
    image: "/projects/highrise.png",
    description: "A flagship 45-story luxury residential development featuring sustainable glass architecture and smart home integration.",
    year: "2024"
  },
  {
    title: "Lekki Estate Road Network",
    category: "Engineering",
    image: "/projects/road.png",
    description: "Comprehensive urban planning and infrastructure development for a premium 50-hectare residential estate in Lekki.",
    year: "2023"
  },
  {
    title: "Abuja Commercial Complex",
    category: "Real Estate",
    image: "/projects/commercial.png",
    description: "A mixed-use commercial hub in the heart of Abuja, providing premium office spaces and retail facilities.",
    year: "2024"
  },
  {
    title: "Victoria Island Smart City",
    category: "Consulting",
    image: "/projects/smartcity.png",
    description: "Strategic consulting for the digital transformation and infrastructure optimization of VI's core business district.",
    year: "2025"
  },
  {
    title: "Epe Sustainable Housing",
    category: "Construction",
    image: "/projects/housing.png",
    description: "Innovative residential community utilizing sustainable building materials and solar-integrated energy systems.",
    year: "2023"
  },
  {
    title: "Ibadan Industrial Hub",
    category: "Infrastructure",
    image: "/projects/industrial.png",
    description: "Largs-scale logistics and industrial facility designed for maximum efficiency and modern manufacturing standards.",
    year: "2024"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--color-navy-950)] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-neon-blue)] opacity-[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-gold)] opacity-[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[var(--color-gold)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Our Portfolio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-gold)] font-outline-2">Future</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            From soaring skyscrapers to intricate urban infrastructure, explore how Henafek Homes is redefining the built environment across Nigeria and beyond.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-gray-500 mr-4">
            <Filter size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">Filter By:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? "bg-[var(--color-gold)] text-[#020617] shadow-[0_0_20px_rgba(212,168,83,0.3)]"
                  : "glass hover:bg-white/10 text-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <div className="glass rounded-[2rem] overflow-hidden border-white/5 group-hover:border-[var(--color-gold)]/30 transition-all duration-500 hover:translate-y-[-8px] h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="px-4 py-1.5 rounded-full glass backdrop-blur-md border-[var(--color-gold)]/20 text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-[0.1em]">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-gold)] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-medium text-gray-500 italic">{project.year}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>
                    <button className="flex items-center gap-2 text-[var(--color-neon-blue)] text-xs font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                      Project Details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-40">
            <Briefcase size={64} className="mx-auto text-gray-700 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No projects found in this category</h3>
            <p className="text-gray-500">We are constantly updating our portfolio. Please check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

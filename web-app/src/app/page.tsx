"use client";

import HeroHub from "@/components/HeroHub";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Wrench,
  Landmark,
  Boxes,
  Briefcase,
  HardHat,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import LiquidGlassButton from "@/components/LiquidGlassButton";

const services = [
  {
    icon: <Landmark size={28} />,
    title: "Real Estate",
    desc: "Land documentation, property sales, merchandising, remodeling, and short-let apartments.",
    href: "/services/real-estate",
    color: "var(--color-gold)",
  },
  {
    icon: <Wrench size={28} />,
    title: "Engineering",
    desc: "Estate road design, drainage systems, geotechnical surveys, and project management.",
    href: "/services/engineering",
    color: "var(--color-neon-blue)",
  },
  {
    icon: <Boxes size={28} />,
    title: "Building Materials",
    desc: "Quality material procurement, digital supply management, and daily market updates.",
    href: "/services/building-materials",
    color: "var(--color-gold)",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Consulting",
    desc: "Feasibility studies, FDI advisory, market analysis, and enterprise growth strategy.",
    href: "/services/consulting",
    color: "var(--color-neon-blue)",
  },
  {
    icon: <HardHat size={28} />,
    title: "Construction",
    desc: "BIM-driven end-to-end construction with safety compliance and cost optimization.",
    href: "/services/construction",
    color: "var(--color-gold)",
  },
];

const stats = [
  { icon: <Building2 size={24} />, value: "200+", label: "Projects Completed" },
  { icon: <Users size={24} />, value: "150+", label: "Active Clients" },
  { icon: <TrendingUp size={24} />, value: "15+", label: "Years Experience" },
  { icon: <Award size={24} />, value: "50+", label: "Awards Won" },
];

const testimonials = [
  {
    name: "Chief Adeyemi Williams",
    role: "CEO, Urban Developments Ltd",
    text: "Henafek Homes transformed our property portfolio with their outstanding real estate consulting and construction management expertise.",
    rating: 5,
  },
  {
    name: "Engr. Olumide Bakare",
    role: "Director, Bakare & Associates",
    text: "Their engineering precision and commitment to quality is unmatched. Every project has been delivered on time and within budget.",
    rating: 5,
  },
  {
    name: "Mrs. Ngozi Eze",
    role: "Managing Director, Eze Properties",
    text: "The consulting team at Henafek Homes provided invaluable market insights that helped us make strategic investment decisions.",
    rating: 5,
  },
];

const projects = [
  {
    title: "Lagos Island High-Rise",
    category: "Construction",
    image: "linear-gradient(to top, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0) 100%), url('/gallery-highrise-1.jpg') center/cover no-repeat",
  },
  {
    title: "Lekki Estate Road Network",
    category: "Engineering",
    image: "linear-gradient(to top, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0) 100%), url('/eng-road.jpg') center/cover no-repeat",
  },
  {
    title: "Abuja Commercial Complex",
    category: "Real Estate",
    image: "linear-gradient(to top, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0) 100%), url('/projects/commercial.png') center/cover no-repeat",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroHub />



      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[var(--color-neon-blue)]/10 flex items-center justify-center text-[var(--color-neon-blue)]">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding relative z-10" id="projects">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--color-gold)] text-sm font-semibold tracking-wider uppercase">
              Portfolio
            </span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass overflow-hidden group cursor-pointer hover:translate-y-[-4px] transition-all duration-300"
              >
                <div
                  className="h-48 flex items-end p-6"
                  style={{ background: project.image }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--color-neon-blue)]/20 text-[var(--color-neon-blue)]">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding relative z-10" id="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--color-neon-blue)] text-sm font-semibold tracking-wider uppercase">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="text-[var(--color-gold)] fill-[var(--color-gold)]"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="glass p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background:
                "linear-gradient(135deg, rgba(0,180,255,0.08) 0%, rgba(212,168,83,0.05) 100%)",
              borderColor: "rgba(0,180,255,0.15)",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Future?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Partner with Henafek Homes for premium consulting and
              infrastructure solutions that drive real results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <LiquidGlassButton 
                onClick={() => window.location.href = "/contact"} 
                className="text-sm px-8 py-3 rounded-full"
              >
                Get Started Today
              </LiquidGlassButton>
              <Link href="/services/consulting" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

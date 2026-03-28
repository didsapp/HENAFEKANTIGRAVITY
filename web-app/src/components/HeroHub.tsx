"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HardHat,
  Wrench,
  Boxes,
  Building2,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import LiquidGlassButton from "@/components/LiquidGlassButton";

interface HubNode {
  label: string;
  href: string;
  angle: number;
  delay: number;
  icon: any;
  colorClass: "cyan" | "gold";
  lineColor: string;
}

const outerNodes: HubNode[] = [
  {
    label: "CONSTRUCTION",
    href: "/services/construction",
    angle: -135,
    delay: 0.2,
    icon: HardHat,
    colorClass: "cyan",
    lineColor: "#00b4ff",
  },
  {
    label: "ENGINEERING",
    href: "/services/engineering",
    angle: -45,
    delay: 0.4,
    icon: Wrench,
    colorClass: "cyan",
    lineColor: "#00b4ff",
  },
  {
    label: "BUILDING MATERIALS",
    href: "/services/building-materials",
    angle: 135,
    delay: 0.6,
    icon: Boxes,
    colorClass: "gold",
    lineColor: "#d4a853",
  },
  {
    label: "REAL ESTATE",
    href: "/services/real-estate",
    angle: 45,
    delay: 0.8,
    icon: Building2,
    colorClass: "gold",
    lineColor: "#d4a853",
  },
];

export default function HeroHub() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = mounted && windowWidth < 768;
  const isSmallMobile = mounted && windowWidth < 480;

  const getNodePos = (angle: number, r: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * r,
      y: Math.sin(rad) * r,
    };
  };

  const radius = isSmallMobile ? 130 : isMobile ? 160 : 240;
  const hubSize = isMobile ? 400 : 600;
  const hubCenter = hubSize / 2;
  const outerNodeSize = isSmallMobile ? 100 : isMobile ? 120 : 140;
  const outerNodeOffset = outerNodeSize / 2;
  const centerNodeSize = isSmallMobile ? 140 : isMobile ? 160 : 220;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Background Video — lowest z-index */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute pointer-events-none"
        style={{
          width: "120%",
          height: "120%",
          objectFit: "cover",
          objectPosition: "center bottom",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          filter: "sepia(1) hue-rotate(15deg) saturate(1.8) brightness(1.1)",
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4"
          type="video/mp4"
        />
      </video>

      {/* Blurred Black Pill — z-index 1 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: isMobile ? "100%" : "801px",
          height: isMobile ? "280px" : "384px",
          borderRadius: "9999px",
          background: "#000000",
          filter: isMobile ? "blur(50px)" : "blur(77.5px)",
          top: isMobile ? "180px" : "215px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      />

      {/* Background Logo with Stunt Animation — z-index 1 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 1, mixBlendMode: "lighten" }}
        initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
        animate={{
          scale: isMobile ? [0.3, 0.7, 0.6] : [0.5, 1.2, 1],
          rotate: [-20, 10, 0],
          opacity: [0, 0.2, 0.15],
          y: [0, -20, 0],
        }}
        transition={{
          scale: { duration: 3, ease: "easeOut" },
          rotate: { duration: 3, ease: "easeOut" },
          opacity: { duration: 3, ease: "easeOut" },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/logo.png"
          alt="Henafek Homes Logo Watermark"
          width={isMobile ? 400 : 800}
          height={isMobile ? 400 : 800}
          className="max-w-none grayscale brightness-150"
          priority
        />
      </motion.div>

      {/* ===== All Content — z-index 2 ===== */}

      {/* Hub Container */}
      <div
        className="relative flex items-center justify-center mx-auto"
        style={{ 
          zIndex: 2,
          width: hubSize,
          height: isMobile ? hubSize - 100 : hubSize - 100 
        }}
      >
        {mounted && (
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="lineGradBlue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0,180,255,0.1)" />
                <stop offset="50%" stopColor="rgba(0,180,255,0.6)" />
                <stop offset="100%" stopColor="rgba(212,168,83,0.3)" />
              </linearGradient>
            </defs>
            {outerNodes.map((node, i) => {
              const pos = getNodePos(node.angle, radius);
              return (
                <motion.line
                  key={i}
                  x1={hubCenter}
                  y1={hubCenter - 50}
                  x2={hubCenter + pos.x}
                  y2={hubCenter - 50 + pos.y}
                  stroke={node.lineColor}
                  strokeWidth={hovered === i ? 2 : 1}
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 1.2, delay: node.delay }}
                />
              );
            })}
          </svg>
        )}

        {/* Center Node (CONSULTING) */}
        <Link href="/services/consulting">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            style={{
              marginTop: -50,
              width: centerNodeSize,
              height: centerNodeSize
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="hub-center glass flex flex-col items-center justify-center animate-pulse-glow group-hover:scale-105 transition-transform w-full h-full">
              <span className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white tracking-widest text-glow-blue`}>
                CONSULTING
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Outer Nodes */}
        {outerNodes.map((node, i) => {
          const pos = getNodePos(node.angle, radius);
          const NodeIcon = node.icon;
          return (
            <motion.div
              key={i}
              className="absolute z-10"
              style={{
                left: `calc(50% + ${pos.x}px - ${outerNodeOffset}px)`,
                top: `calc(50% + ${pos.y}px - ${outerNodeOffset}px - 50px)`,
                width: outerNodeSize,
                height: outerNodeSize
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: node.delay, type: "spring" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={node.href}>
                <div
                  className={`hub-outer glass ${node.colorClass} flex flex-col items-center justify-center text-center p-2 transition-all duration-300 hover:scale-110 w-full h-full`}
                >
                  <NodeIcon
                    size={isMobile ? 24 : 32}
                    className={
                      node.colorClass === "cyan"
                        ? "text-[var(--color-neon-blue)]"
                        : "text-[var(--color-gold)]"
                    }
                  />
                  <span className={`${isSmallMobile ? 'text-[8px]' : 'text-[10px]'} font-bold tracking-wider text-white uppercase mt-1 leading-tight px-1`}>
                    {node.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Subheading + CTAs */}
      <motion.div
        className={`text-center ${isMobile ? 'mt-4' : 'mt-8'} px-6`}
        style={{ zIndex: 2, position: "relative" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-white mb-3 leading-tight`}>
          <span className="text-[var(--color-gold)]">HENAFEK</span> HOMES
        </h1>
        <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-400 max-w-2xl mx-auto mb-8`}>
          Professional Multi-sector Consulting & Infrastructure Solutions
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <LiquidGlassButton 
            onClick={() => window.location.href = "/contact"} 
            className={`text-sm ${isMobile ? 'px-6 py-2.5' : 'px-8 py-3'} rounded-full`}
          >
            Get Consultation
          </LiquidGlassButton>
          <Link href="/#projects" className="btn-secondary">
            View Projects
          </Link>
        </div>
      </motion.div>

      {/* Info Cards Row */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20 px-6"
        style={{ zIndex: 2, position: "relative" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        {[
          {
            icon: "💼",
            title: "Our Expertise",
            desc: "Innovative solutions for your business needs.",
          },
          {
            icon: "🛡️",
            title: "Why Choose Us?",
            desc: "Trusted advisors with years of experience.",
          },
          {
            icon: "📊",
            title: "Latest Insights",
            desc: "Read our latest articles & reports.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="glass-sm p-6 flex items-start gap-4 hover:border-[var(--color-neon-blue)]/20 transition-all duration-300 hover:translate-y-[-2px]"
          >
            <span className="text-3xl">{card.icon}</span>
            <div>
              <h3 className="text-white font-semibold mb-1">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import styles from "./LiquidGlass.module.css";

// This injects the complex SVG distortion map required by the CSS `filter: url(#glass-distortion)`
const GlassFilter = () => (
  <svg style={{ width: 0, height: 0, position: "absolute", pointerEvents: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.01 0.01"
        numOctaves="1"
        seed="5"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="150"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // used for layout sizing (e.g. padding, border-radius)
}

export default function LiquidGlassButton({ children, onClick, className }: LiquidGlassButtonProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* We uniquely render the global filter if mounted, once per button. SVG filters handle same-ID declarations gracefully in modern browsers */}
      {mounted && <GlassFilter />}
      <button 
        className={`${styles.liquidGlassWrapper} ${className || ""}`} 
        onClick={onClick}
      >
        <div className={styles.liquidGlassEffect}></div>
        <div className={styles.liquidGlassTint}></div>
        <div className={styles.liquidGlassShine} style={{ borderRadius: "inherit" }}></div>
        <div className={styles.liquidGlassText}>{children}</div>
      </button>
    </>
  );
}

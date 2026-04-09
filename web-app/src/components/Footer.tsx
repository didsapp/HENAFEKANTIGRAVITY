"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import ViewCounter from "./ViewCounter";

const footerLinks = {
  Services: [
    { label: "Real Estate", href: "/services/real-estate" },
    { label: "Engineering", href: "/services/engineering" },
    { label: "Building Materials", href: "/services/building-materials" },
    { label: "Consulting", href: "/services/consulting" },
    { label: "Construction", href: "/services/construction" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  Portals: [
    { label: "Client Login", href: "/auth/login" },
    { label: "Admin Login", href: "/auth/login" },
  ],
};

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer on portal and admin routes
  const isPortal = pathname?.startsWith("/portal") || pathname?.startsWith("/admin");
  if (isPortal) return null;

  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Henafek Homes"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-lg font-bold">
                <span className="text-white">HENAFEK</span>{" "}
                <span className="text-[var(--color-gold)]">HOMES</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional multi-sector consulting & infrastructure solutions.
              Building the future with innovation and excellence.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full glass-sm flex items-center justify-center text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <ViewCounter />
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-[var(--color-neon-blue)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-wrap gap-8 text-sm text-gray-400">
          <a href="mailto:info@henafekhomes.com" className="flex items-center gap-2 hover:text-[var(--color-neon-blue)] transition-colors">
            <Mail size={16} /> info@henafekhomes.com
          </a>
          <a href="tel:08023424190" className="flex items-center gap-2 hover:text-[var(--color-neon-blue)] transition-colors">
            <Phone size={16} /> 08023424190
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={16} /> Ogun State, Nigeria
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Henafek Homes. All rights reserved.</p>
          <p>
            Designed & Powered by <a href="https://didssystems.com" className="hover:text-[var(--color-gold)] transition-colors">DIDS&apos; SYSTEMS INC</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

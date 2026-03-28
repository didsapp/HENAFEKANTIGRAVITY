"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import LiquidGlassButton from "@/components/LiquidGlassButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Our Projects" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = import("next/navigation").then(nav => nav.useRouter()).catch(() => null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide Navbar on portal and admin routes
  const isPortal = pathname?.startsWith("/portal") || pathname?.startsWith("/admin");
  if (isPortal) return null;

  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/portal";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-lg shadow-black/30"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Henafek Homes"
            width={48}
            height={48}
            unoptimized={true}
            className="rounded-lg group-hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold tracking-wide">
            <span className="text-white">HENAFEK</span>{" "}
            <span className="text-[var(--color-gold)]">HOMES</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-[var(--color-neon-blue)] transition-colors duration-300 rounded-lg hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Auth + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            {status === "authenticated" ? (
              <div className="flex items-center gap-3 bg-white/5 pl-2 pr-1 py-1 rounded-full border border-white/10 group">
                <Link
                  href={dashboardHref}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white/10 transition-all text-xs font-semibold text-white"
                >
                  <LayoutDashboard size={14} className="text-[var(--color-gold)]" />
                  Dashboard
                </Link>
                <div className="w-[1px] h-4 bg-white/10" />
                <button
                  onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                  className="p-1.5 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                  title="Sign Out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-[var(--color-neon-blue)]/50 hover:bg-[var(--color-neon-blue)]/10 text-gray-300 hover:text-[var(--color-neon-blue)] transition-all"
                  aria-label="User Menu"
                >
                  <User size={18} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 glass rounded-xl border border-white/10 overflow-hidden shadow-2xl z-50 py-2 flex flex-col"
                    >
                      <Link
                        href="/auth/register"
                        className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="/auth/login?role=client"
                        className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                      >
                        Client Login
                      </Link>
                      <Link
                        href="/auth/login?role=admin"
                        className="px-4 py-2.5 text-sm text-[var(--color-gold)] font-medium hover:bg-[var(--color-gold)]/10 transition-colors"
                      >
                        Admin Login
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <LiquidGlassButton 
              onClick={() => window.location.href = "/contact"} 
              className="text-sm px-6 py-2.5 rounded-full"
            >
              Get in Touch
            </LiquidGlassButton>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mt-2 mx-4 overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 text-gray-300 hover:text-[var(--color-neon-blue)] hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="h-[1px] bg-white/10 my-2" />
              
              {status === "authenticated" ? (
                <>
                  <Link
                    href={dashboardHref}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 px-4 text-white font-semibold flex items-center gap-2"
                  >
                    <LayoutDashboard size={18} className="text-[var(--color-gold)]" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/", redirect: true });
                      setMobileOpen(false);
                    }}
                    className="py-3 px-4 text-red-400 font-semibold flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-1 py-1">
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 px-4 text-gray-300 hover:text-[var(--color-neon-blue)] font-semibold flex items-center gap-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <User size={18} />
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/login?role=client"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 px-4 text-gray-300 hover:text-[var(--color-neon-blue)] font-semibold flex items-center gap-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <User size={18} />
                    Client Login
                  </Link>
                  <Link
                    href="/auth/login?role=admin"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 px-4 text-[var(--color-gold)] hover:text-yellow-400 font-semibold flex items-center gap-2 hover:bg-[var(--color-gold)]/10 rounded-lg transition-colors"
                  >
                    <User size={18} />
                    Admin Login
                  </Link>
                </div>
              )}
              
              <LiquidGlassButton
                onClick={() => {
                  setMobileOpen(false);
                  window.location.href = "/contact";
                }}
                className="w-full mt-4 py-3 rounded-2xl text-sm"
              >
                Get in Touch
              </LiquidGlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

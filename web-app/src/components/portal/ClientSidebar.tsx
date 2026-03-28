"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  FileText,
  MessageSquare,
  User,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: <Home size={20} />, label: "Dashboard", href: "/portal" },
  { icon: <Briefcase size={20} />, label: "My Projects", href: "/portal/projects" },
  { icon: <FileText size={20} />, label: "My Invoices", href: "/portal/invoices" },
  { icon: <MessageSquare size={20} />, label: "Messages", href: "/portal/messages" },
  { icon: <User size={20} />, label: "My Profile", href: "/portal/profile" },
];

export default function ClientSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-[60] p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[40]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`w-64 h-screen glass border-r border-white/10 fixed left-0 top-0 z-[50] flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 lg:p-6 relative">
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden absolute top-6 right-6 text-gray-400 hover:text-white"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 mb-10 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dim)] flex items-center justify-center text-black font-bold flex-shrink-0">
              H
            </div>
            <span className="text-white font-bold tracking-tight whitespace-nowrap">CLIENT PORTAL</span>
          </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center p-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20 shadow-[0_0_15px_rgba(212,168,83,0.1)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={isActive ? "text-[var(--color-gold)]" : "text-gray-500 group-hover:text-gray-300"}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium ml-3">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 lg:p-6 border-t border-white/10">
        <button 
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="flex items-center p-3 w-full text-gray-400 hover:text-[var(--color-neon-blue)] hover:bg-white/5 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium ml-3">Sign Out</span>
        </button>
      </div>
    </div>
    </>
  );
}

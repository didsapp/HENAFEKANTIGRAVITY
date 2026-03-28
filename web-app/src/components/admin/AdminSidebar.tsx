"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: "Overview", href: "/admin" },
  { icon: <Users size={20} />, label: "User Management", href: "/admin/users" },
  { icon: <Briefcase size={20} />, label: "Project Management", href: "/admin/projects" },
  { icon: <FileText size={20} />, label: "Invoice Management", href: "/admin/invoices" },
  { icon: <MessageSquare size={20} />, label: "Messages", href: "/admin/messages" },
  { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
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
        <div className="p-6 relative">
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden absolute top-6 right-6 text-gray-400 hover:text-white"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-gold)] flex items-center justify-center text-black font-bold">
              H
            </div>
            <span className="text-white font-bold tracking-tight">HENAFEK ADMIN</span>
          </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)] border border-[var(--color-neon-blue)]/20 shadow-[0_0_15px_rgba(0,180,255,0.1)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-[var(--color-neon-blue)]" : "text-gray-500 group-hover:text-gray-300"}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-blue)] shadow-[0_0_8px_rgba(0,180,255,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/10">
        <button 
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="flex items-center gap-3 p-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
    </>
  );
}

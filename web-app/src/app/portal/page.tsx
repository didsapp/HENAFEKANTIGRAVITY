"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Briefcase,
  FileText,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getClientDashboardData } from "./portalActions";
import { useSession } from "next-auth/react";

export default function ClientDashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardData = await getClientDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to fetch portal data", error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading || !data) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--color-gold)]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 relative overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, rgba(212,168,83,0.1) 0%, rgba(10,22,40,0.5) 100%)",
          borderColor: "rgba(212,168,83,0.2)"
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {session?.user?.name || "Client"}</h1>
          <p className="text-gray-400">Your projects are progressing well. You have {data.stats.activeProjects} active projects and {data.invoices.filter((i: any) => i.status === "UNPAID").length} pending invoices.</p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-[var(--color-gold)] opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Projects", value: data.stats.activeProjects.toString(), icon: <Briefcase size={22} />, color: "var(--color-gold)" },
          { label: "Total Invoiced", value: `$${data.stats.totalInvoiced.toLocaleString()}`, icon: <FileText size={22} />, color: "var(--color-neon-blue)" },
          { label: "Completion Rate", value: `${data.stats.completionRate}%`, icon: <TrendingUp size={22} />, color: "#10b981" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div>
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</h3>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Projects */}
        <div className="glass overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[var(--color-gold)]" />
              Project Tracking
            </h3>
            <button className="text-[var(--color-gold)] text-xs font-semibold hover:underline">View All</button>
          </div>
          <div className="p-6 space-y-6">
            {data.projects.map((project: any, i: number) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-white font-medium">{project.title}</h4>
                    <span className="text-[10px] text-gray-500 uppercase">{project.status}</span>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-gold)]">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[var(--color-gold-dim)] to-[var(--color-gold)]"
                  />
                </div>
              </div>
            ))}
            {data.projects.length === 0 && (
              <p className="text-center text-gray-500 py-4 text-sm">No active projects found.</p>
            )}
          </div>
        </div>

        {/* Messaging Quick Access */}
        <div className="glass flex flex-col">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-[var(--color-neon-blue)]" />
              Recent Messages
            </h3>
            <Clock size={16} className="text-gray-500" />
          </div>
          <div className="p-6 space-y-4 flex-1">
            {data.messages.map((m: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-[var(--color-neon-blue)]">Admin</span>
                  <span className="text-[10px] text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-300 line-clamp-1">{m.content}</p>
              </div>
            ))}
            {data.messages.length === 0 && (
              <p className="text-center text-gray-500 py-4 text-sm">No recent messages.</p>
            )}
            <button className="w-full py-3 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-all mt-4">
              Open Message Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

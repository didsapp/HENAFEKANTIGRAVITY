"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Loader2,
} from "lucide-react";
import { getAdminStats, getRecentProjects, getRecentActivity } from "./adminActions";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, projectsData, activityData] = await Promise.all([
          getAdminStats(),
          getRecentProjects(),
          getRecentActivity(),
        ]);

        setStats([
          { label: "Total Users", value: statsData.totalUsers.toString(), icon: <Users size={20} />, change: "+12.5%", color: "var(--color-neon-blue)" },
          { label: "Active Projects", value: statsData.activeProjects.toString(), icon: <Briefcase size={20} />, change: "+4.2%", color: "var(--color-gold)" },
          { label: "Revenue", value: `$${(statsData.revenue / 1000).toFixed(1)}k`, icon: <TrendingUp size={20} />, change: "+18.3%", color: "#10b981" },
          { label: "Pending Invoices", value: statsData.pendingInvoices.toString(), icon: <FileText size={20} />, change: "-2.5%", color: "#f59e0b" },
        ]);

        setProjects(projectsData);
        setActivities(activityData);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--color-neon-blue)]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 group hover:translate-y-[-4px] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
            <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects Table */}
        <div className="lg:col-span-2 glass overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-white">Recent Projects</h3>
            <button className="text-[var(--color-neon-blue)] text-xs font-semibold flex items-center gap-1 hover:underline">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Project Name</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((row, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{row.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{row.client.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        row.status === "IN_PROGRESS" ? "bg-blue-500/10 text-blue-400" : 
                        row.status === "PLANNING" ? "bg-amber-500/10 text-amber-400" : "bg-green-500/10 text-green-400"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--color-neon-blue)] rounded-full transition-all duration-1000"
                          style={{ width: `${row.progress}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass flex flex-col">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-white">Recent Activity</h3>
            <Clock size={16} className="text-gray-500" />
          </div>
          <div className="p-6 space-y-6 flex-1">
            {activities.map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-blue)] mt-2" />
                <div>
                  <p className="text-sm text-gray-300">{activity.text}</p>
                  <span className="text-[10px] text-gray-500 uppercase">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

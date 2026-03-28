"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Loader2, Calendar } from "lucide-react";
import { getClientProjects } from "../portalActions";

export default function ClientProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getClientProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[var(--color-gold)]" size={40} /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Briefcase className="text-[var(--color-gold)]" /> My Projects
        </h1>
        <p className="text-gray-400">Track the progress of your active construction and engineering implementations.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            className="glass p-6 group hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                  project.status === "IN_PROGRESS" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : 
                  project.status === "PLANNING" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"
                }`}>
                  {project.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{project.description || "No description provided."}</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Overall Completion</span>
                <span className="text-sm font-bold text-[var(--color-gold)]">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[var(--color-gold-dim)] to-[var(--color-gold)]"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} /> Commenced {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center glass text-gray-500">You currently have no assigned projects.</div>
        )}
      </div>
    </div>
  );
}

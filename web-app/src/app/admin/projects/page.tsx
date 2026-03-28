"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Plus, Loader2, Edit3 } from "lucide-react";
import { getProjects, createProject, updateProject, getUsers } from "../adminActions";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({ title: "", description: "", clientId: "", status: "PLANNING", image: null });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [projData, userData] = await Promise.all([getProjects(), getUsers()]);
      setProjects(projData);
      setClients(userData.filter((u: any) => u.role === "CLIENT"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("clientId", formData.clientId);
      data.append("status", formData.status);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await createProject(data);
      setIsModalOpen(false);
      setFormData({ title: "", description: "", clientId: "", status: "PLANNING", image: null });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateProgress(id: string, newProgress: number) {
    const status = newProgress === 100 ? "COMPLETED" : newProgress > 0 ? "IN_PROGRESS" : "PLANNING";
    try {
      await updateProject(id, { progress: newProgress, status });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[var(--color-neon-blue)]" size={40} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="text-[var(--color-gold)]" /> Project Management
          </h1>
          <p className="text-gray-400">Oversee construction and engineering projects assigned to clients.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-gold-dim)] to-[var(--color-gold)] text-[var(--color-navy-900)] font-bold hover:opacity-80 transition-opacity shadow-[0_0_20px_rgba(212,168,83,0.3)]"
        >
          <Plus size={20} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            className="glass p-6 group hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between"
          >
            <div>
              {project.imageUrl && (
                <div className="w-full h-32 rounded-xl overflow-hidden mb-4 border border-white/10">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  project.status === "IN_PROGRESS" ? "bg-blue-500/10 text-blue-400" : 
                  project.status === "PLANNING" ? "bg-amber-500/10 text-amber-400" : "bg-green-500/10 text-green-400"
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{project.description || "No description provided."}</p>
              
              <div className="mb-6 flex items-center gap-3 border-l-2 border-[var(--color-gold)] pl-3">
                <div className="text-xs text-gray-400 uppercase tracking-widest">Assigned Client</div>
                <div className="text-sm font-semibold text-white">{project.client.name}</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Progress</span>
                <span className="text-sm font-bold text-[var(--color-gold)]">{project.progress}%</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={project.progress}
                onChange={(e) => handleUpdateProgress(project.id, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-[var(--color-gold)]"
              />
            </div>
          </motion.div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center glass text-gray-500">No projects actively tracked. Assign a new project above.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-2xl w-full max-w-md border border-[var(--color-gold)]/30 shadow-[0_0_40px_rgba(212,168,83,0.1)]">
            <h2 className="text-2xl font-bold text-white mb-6">Initialize Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Project Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Assign to Client</label>
                <select required value={formData.clientId} onChange={e => setFormData({...formData, clientId: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors">
                  <option value="" disabled>Select a client...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Initial Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors">
                  <option value="PLANNING">Planning Phase</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Image (Document)</label>
                <input 
                  type="file" 
                  accept="image/*,.pdf"
                  onChange={e => setFormData({...formData, image: e.target.files?.[0]})} 
                  className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--color-gold)] file:text-black hover:file:opacity-80 transition-all" 
                />
              </div>
              <div className="flex gap-4 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-semibold transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-gold)] text-black font-bold hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] transition-all">Start Project</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Trash2, Mail, Shield, Loader2 } from "lucide-react";
import { getUsers, createUser, deleteUser } from "../adminActions";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "CLIENT" });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createUser(formData);
      setIsModalOpen(false);
      setFormData({ name: "", email: "", password: "", role: "CLIENT" });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
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
            <Users className="text-[var(--color-neon-blue)]" /> User Management
          </h1>
          <p className="text-gray-400">Manage clients and administrators across the platform.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-neon-blue)] text-white font-bold hover:opacity-80 transition-opacity shadow-[0_0_20px_rgba(0,195,255,0.3)]"
        >
          <Plus size={20} /> Add User
        </button>
      </div>

      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="px-6 py-4 font-semibold">User Details</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Joined At</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user, i) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-navy-800)] to-[var(--color-gold)]/20 flex items-center justify-center text-[var(--color-gold)] font-bold">
                        {user.name?.[0] || "U"}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-1">{user.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1"><Mail size={12}/> {user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex w-max items-center gap-1 ${user.role === "ADMIN" ? "bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)]" : "bg-white/5 text-gray-300"}`}>
                      {user.role === "ADMIN" && <Shield size={12} />} {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-400/10 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-2xl w-full max-w-md border border-[var(--color-neon-blue)]/30 shadow-[0_0_40px_rgba(0,195,255,0.1)]">
            <h2 className="text-2xl font-bold text-white mb-6">Register New User</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Temporary Password</label>
                <input required type="text" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Access Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors">
                  <option value="CLIENT">Client</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
              <div className="flex gap-4 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-semibold transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--color-neon-blue)] to-blue-500 text-white font-bold hover:shadow-[0_0_20px_rgba(0,195,255,0.4)] transition-all">Create User</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

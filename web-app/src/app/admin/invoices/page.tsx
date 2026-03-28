"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, CheckCircle, Loader2 } from "lucide-react";
import { getInvoices, createInvoice, updateInvoiceStatus, getProjects } from "../adminActions";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ amount: "", projectId: "" });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [invData, projData] = await Promise.all([getInvoices(), getProjects()]);
      setInvoices(invData);
      setProjects(projData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateInvoice(e: React.FormEvent) {
    e.preventDefault();
    try {
      const selectedProject = projects.find(p => p.id === formData.projectId);
      if (!selectedProject) return;

      await createInvoice({ 
        amount: parseFloat(formData.amount), 
        projectId: formData.projectId, 
        clientId: selectedProject.clientId 
      });
      setIsModalOpen(false);
      setFormData({ amount: "", projectId: "" });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleMarkPaid(id: string) {
    if (!confirm("Confirm payment received?")) return;
    try {
      await updateInvoiceStatus(id, "PAID");
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
            <FileText className="text-[#10b981]" /> Financial Overview
          </h1>
          <p className="text-gray-400">Generate and track client invoices and payments.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-emerald-500 text-white font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
        >
          <Plus size={20} /> Create Invoice
        </button>
      </div>

      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="px-6 py-4 font-semibold">Client & Project</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date Issued</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv, i) => (
                <motion.tr 
                  key={inv.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-white mb-1">{inv.client.name}</div>
                    <div className="text-xs text-gray-400">Project: {inv.project.title}</div>
                  </td>
                  <td className="px-6 py-4 text-white font-bold">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === "PAID" ? "bg-green-500/10 text-green-400" : 
                      inv.status === "OVERDUE" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(inv.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {inv.status !== "PAID" && (
                      <button onClick={() => handleMarkPaid(inv.id)} className="text-xs font-bold text-[#10b981] hover:text-emerald-400 flex items-center justify-end gap-1 ml-auto p-2 hover:bg-[#10b981]/10 rounded-lg transition-colors">
                        <CheckCircle size={14} /> Mark Paid
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-500">No invoices generated yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-2xl w-full max-w-md border border-[#10b981]/30 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <h2 className="text-2xl font-bold text-white mb-6">Issue New Invoice</h2>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Select Project</label>
                <select required value={formData.projectId} onChange={e => setFormData({...formData, projectId: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#10b981] transition-colors">
                  <option value="" disabled>Choose assigned project...</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.title} - {p.client.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Invoice Amount ($)</label>
                <input required type="number" step="0.01" min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#10b981] transition-colors" />
              </div>
              
              <div className="flex gap-4 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-semibold transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-[#10b981] text-white font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">Send Invoice</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

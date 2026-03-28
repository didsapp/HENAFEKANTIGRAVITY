"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, CreditCard, CheckCircle } from "lucide-react";
import { getClientInvoices, simulatePayment } from "../portalActions";

export default function ClientInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    try {
      const data = await getClientInvoices();
      setInvoices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePayment(id: string) {
    if(!confirm("Authorize payment transaction simulator?")) return;
    try {
      await simulatePayment(id);
      fetchInvoices(); // Refresh
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[var(--color-neon-blue)]" size={40} /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FileText className="text-[#10b981]" /> My Invoices
        </h1>
        <p className="text-gray-400">Manage your billing and securely process payments.</p>
      </div>

      <div className="glass overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 font-semibold">Invoice Details</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
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
                    <div className="text-sm font-bold text-white mb-1">INV-{inv.id.slice(-6).toUpperCase()}</div>
                    <div className="text-xs text-gray-400">Project: {inv.project.title}</div>
                  </td>
                  <td className="px-6 py-4 text-white font-bold text-lg tracking-tight">
                    ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                      inv.status === "PAID" ? "bg-green-500/10 text-green-400 border-green-500/20" : 
                      inv.status === "OVERDUE" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(inv.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {inv.status !== "PAID" ? (
                      <button 
                        onClick={() => handlePayment(inv.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981] hover:bg-emerald-400 text-white text-xs font-bold rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                      >
                        <CreditCard size={14} /> Pay Now
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-1 text-[#10b981] text-xs font-bold px-4 py-2">
                        <CheckCircle size={14} /> Complete
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-500">You have no pending or paid invoices.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

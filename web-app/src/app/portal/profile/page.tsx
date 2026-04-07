"use client";

import { useState } from "react";
import { UserCircle, ShieldCheck, Mail, Save, Loader2, CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { updateClientProfile } from "../portalActions";
import { motion } from "framer-motion";

export default function ClientProfilePage() {
  const { data: session, update } = useSession();
  const [formData, setFormData] = useState({ 
    name: session?.user?.name || "", 
    password: "" 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await updateClientProfile(formData);
      await update({ name: formData.name }); // Update NextAuth session cookie
      setSuccess(true);
      setFormData({...formData, password: ""}); // Clear password field
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <UserCircle className="text-[var(--color-gold)]" /> Profile Management
        </h1>
        <p className="text-gray-400">Update your personal information and credentials securely.</p>
      </div>

      <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} className="glass p-8 border border-[var(--color-gold)]/20 shadow-[0_0_40px_rgba(212,168,83,0.05)] rounded-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-gold)]/10 to-transparent blur-3xl rounded-full" />
        
        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--color-navy-800)] to-[var(--color-gold)]/20 flex items-center justify-center text-[var(--color-gold)] font-bold text-4xl shadow-inner">
            {session?.user?.name?.[0] || "?"}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{session?.user?.name}</h2>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400 flex items-center gap-2"><Mail size={14} className="text-[var(--color-gold)]"/> {session?.user?.email}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#10b981] flex items-center gap-1"><ShieldCheck size={12}/> Verified Client Account</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
            <input 
              required 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Change Password <span className="text-gray-600 text-[10px] ml-2">(Leave blank to keep current)</span></label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-gray-700" 
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-[var(--color-gold)] text-[var(--color-navy-900)] font-bold hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] transition-all flex items-center gap-2 border border-transparent hover:border-[var(--color-gold-bright)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Update Profile
            </button>
            {success && <span className="text-[#10b981] text-sm font-bold flex items-center gap-1 animate-pulse"><CheckCircle size={16}/> Saved</span>}
          </div>
        </form>
      </motion.div>
    </div>
  );
}

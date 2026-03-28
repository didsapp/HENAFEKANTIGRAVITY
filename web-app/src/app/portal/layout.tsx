import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ClientSidebar from "@/components/portal/ClientSidebar";
import { Bell, Search } from "lucide-react";

export default async function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-navy-950)] text-white flex">
      <ClientSidebar />
      <div className="flex-1 pl-0 lg:pl-64 flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 pl-16 lg:px-8 glass sticky top-0 z-40 backdrop-blur-xl">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-gold)] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--color-gold)]/50 focus:w-64 transition-all w-48"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-[var(--color-gold)] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--color-navy-950)]" />
            </button>
            
            <div className="h-8 w-px bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Chief Adeyemi</span>
                <span className="text-[10px] text-[var(--color-gold)] uppercase tracking-wider">Client</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dim)] border border-white/10" />
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

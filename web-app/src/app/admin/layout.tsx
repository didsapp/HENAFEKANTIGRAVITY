import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user?.role !== "ADMIN") {
    redirect("/portal");
  }

  return (
    <div className="min-h-screen bg-[var(--color-navy-950)] text-white">
      <AdminSidebar />
      <div className="pl-0 lg:pl-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 pl-16 lg:px-8 glass sticky top-0 z-40 backdrop-blur-xl">
          <div>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <p className="text-xs text-gray-500">Welcome back, Administrator</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-[10px] text-[var(--color-gold)] uppercase tracking-wider">Super Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)] to-[var(--color-neon-blue-dim)] border border-white/10" />
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

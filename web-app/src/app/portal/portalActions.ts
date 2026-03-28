"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// --- DASHBOARD OVERVIEW ---
export async function getClientDashboardData() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const [projects, invoices, messages] = await Promise.all([
    prisma.project.findMany({ where: { clientId: session.user.id }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.invoice.findMany({ where: { clientId: session.user.id }, orderBy: { createdAt: "desc" } }),
    prisma.message.findMany({ where: { OR: [{ senderId: session.user.id }, { adminId: session.user.id }] }, orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  const activeProjects = projects.filter(p => p.status !== "COMPLETED").length;
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);

  return {
    stats: { activeProjects, totalInvoiced, completionRate: activeProjects > 0 ? 50 /* placeholder aggregate */ : 0 },
    projects,
    invoices,
    messages
  };
}

// --- CLIENT PROJECTS ---
export async function getClientProjects() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return await prisma.project.findMany({ where: { clientId: session.user.id }, orderBy: { createdAt: "desc" } });
}

// --- CLIENT INVOICES ---
export async function getClientInvoices() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return await prisma.invoice.findMany({ where: { clientId: session.user.id }, orderBy: { createdAt: "desc" }, include: { project: { select: { title: true } } } });
}

export async function simulatePayment(invoiceId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  
  // Verify ownership
  const inv = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (inv?.clientId !== session.user.id) throw new Error("Forbidden");

  await prisma.invoice.update({ where: { id: invoiceId }, data: { status: "PAID" } });
  revalidatePath("/portal/invoices");
}

// --- CLIENT MESSAGES ---
export async function getClientThread() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  
  return await prisma.message.findMany({
    where: { OR: [{ senderId: session.user.id }, { adminId: session.user.id }] },
    orderBy: { createdAt: "asc" }
  });
}

export async function sendMessageAsClient(content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Send to first ADMIN found (or null if generic admin)
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });

  const msg = await prisma.message.create({
    data: {
      content,
      senderId: session.user.id,
      adminId: admin ? admin.id : undefined,
    }
  });
  revalidatePath("/portal/messages");
  return msg;
}

// --- CLIENT PROFILE ---
export async function updateClientProfile(data: { name: string; password?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: data.name,
      ...(hashedPassword && { password: hashedPassword })
    }
  });
  revalidatePath("/portal/profile");
}

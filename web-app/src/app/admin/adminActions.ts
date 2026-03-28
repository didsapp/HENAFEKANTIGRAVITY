"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// --- EXISTING DASHBOARD STATS ---
export async function getAdminStats() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  const [totalUsers, activeProjects, totalRevenue, pendingInvoices] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.project.count({ where: { status: "IN_PROGRESS" } }),
    prisma.invoice.aggregate({ _sum: { amount: true }, where: { status: "PAID" } }),
    prisma.invoice.count({ where: { status: "UNPAID" } }),
  ]);
  return { totalUsers, activeProjects, revenue: totalRevenue._sum.amount || 0, pendingInvoices };
}

export async function getRecentProjects() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  return await prisma.project.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { client: { select: { name: true } } } });
}

export async function getRecentActivity() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  const messages = await prisma.message.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { sender: { select: { name: true } } } });
  return messages.map((m: any) => ({ text: `New message from ${m.sender.name}`, time: m.createdAt.toISOString() }));
}

// --- USER MANAGEMENT ---
export async function getUsers() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  return await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createUser(data: { name: string; email: string; password?: string; role: string }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;
  const user = await prisma.user.create({ data: { name: data.name, email: data.email, password: hashedPassword, role: data.role } });
  revalidatePath("/admin/users");
  return user;
}

export async function deleteUser(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

// --- PROJECT MANAGEMENT ---
export async function getProjects() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  return await prisma.project.findMany({ orderBy: { createdAt: "desc" }, include: { client: { select: { name: true, email: true } } } });
}

export async function createProject(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const clientId = formData.get("clientId") as string;
  const status = formData.get("status") as string;
  const file = formData.get("image") as File | null;

  let imageUrl = null;
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  const project = await prisma.project.create({ 
    data: { 
      title, 
      description, 
      clientId, 
      status, 
      progress: 0,
      imageUrl
    } 
  });
  revalidatePath("/admin/projects");
  return project;
}

export async function updateProject(id: string, data: { status?: string; progress?: number }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  const project = await prisma.project.update({ where: { id }, data });
  revalidatePath("/admin/projects");
  return project;
}

// --- INVOICE MANAGEMENT ---
export async function getInvoices() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  return await prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, include: { client: { select: { name: true, email: true } }, project: { select: { title: true } } } });
}

export async function createInvoice(data: { amount: number; projectId: string; clientId: string }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  const invoice = await prisma.invoice.create({ data: { amount: data.amount, projectId: data.projectId, clientId: data.clientId, status: "UNPAID" } });
  revalidatePath("/admin/invoices");
  return invoice;
}

export async function updateInvoiceStatus(id: string, status: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  await prisma.invoice.update({ where: { id }, data: { status } });
  revalidatePath("/admin/invoices");
}

// --- MESSAGING SYSTEM ---
export async function getAllClientsWithMessages() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  return await prisma.user.findMany({ where: { role: "CLIENT" }, select: { id: true, name: true, image: true } });
}

export async function getThread(clientId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  return await prisma.message.findMany({
    where: { OR: [{ senderId: clientId }, { adminId: clientId }] },
    orderBy: { createdAt: "asc" }
  });
}

export async function sendMessageAsAdmin(clientId: string, content: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN" || !session?.user?.id) throw new Error("Unauthorized");
  const msg = await prisma.message.create({ data: { content, senderId: session.user.id as string, adminId: clientId } });
  revalidatePath("/admin/messages");
  return msg;
}

// --- ADMIN SETTINGS ---
export async function updateAdminProfile(data: { name: string; password?: string }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;
  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: data.name, ...(hashedPassword && { password: hashedPassword }) }
  });
  revalidatePath("/admin/settings");
}

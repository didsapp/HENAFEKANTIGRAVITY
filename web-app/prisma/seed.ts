import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      name: "Henafek Admin",
      email: "admin@henafek.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create Client
  const client = await prisma.user.create({
    data: {
      name: "Chief Adeyemi Williams",
      email: "adeyemi@test.com",
      password: hashedPassword,
      role: "CLIENT",
    },
  });

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      title: "Island High-Rise Phase 2",
      description: "Luxury high-rise residential development in Lagos Island.",
      status: "IN_PROGRESS",
      progress: 85,
      clientId: client.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: "Lekki Residential Complex",
      description: "Modern residential complex in Lekki Phase 1.",
      status: "IN_PROGRESS",
      progress: 42,
      clientId: client.id,
    },
  });

  // Create Invoices
  await prisma.invoice.create({
    data: {
      amount: 4500.0,
      status: "PAID",
      projectId: project1.id,
      clientId: client.id,
    },
  });

  await prisma.invoice.create({
    data: {
      amount: 7950.0,
      status: "UNPAID",
      projectId: project2.id,
      clientId: client.id,
    },
  });

  // Create Messages
  await prisma.message.create({
    data: {
      content: "The architectural plans have been updated.",
      senderId: admin.id,
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const invoiceSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  projectId: z.string().cuid("Invalid project ID"),
  clientId: z.string().cuid("Invalid client ID"),
  pdfUrl: z.string().url("Invalid URL").optional(),
});

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const invoices = session.user.role === "ADMIN"
      ? await prisma.invoice.findMany({
          include: { 
            client: { select: { name: true, email: true } },
            project: { select: { title: true } }
          },
          orderBy: { createdAt: "desc" },
        })
      : await prisma.invoice.findMany({
          where: { clientId: session.user.id },
          include: { project: { select: { title: true } } },
          orderBy: { createdAt: "desc" },
        });

    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden: Admins only" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const result = invoiceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newInvoice = await prisma.invoice.create({
      data: result.data,
      include: { client: { select: { email: true } } }
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

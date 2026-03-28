import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  clientId: z.string().cuid("Invalid client ID"),
});

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = session.user.role === "ADMIN"
      ? await prisma.project.findMany({
          include: { client: { select: { name: true, email: true } } },
          orderBy: { createdAt: "desc" },
        })
      : await prisma.project.findMany({
          where: { clientId: session.user.id },
          orderBy: { createdAt: "desc" },
        });

    return NextResponse.json(projects);
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
    const result = projectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: result.data,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { increment } = await request.json();

    if (increment) {
      const today = new Date().toISOString().split("T")[0];

      // Update global count
      const globalMetric = await prisma.siteMetric.upsert({
        where: { id: "global" },
        update: { views: { increment: 1 } },
        create: { id: "global", views: 1 },
      });

      // Update daily count
      const dailyMetric = await prisma.dailyMetric.upsert({
        where: { date: today },
        update: { views: { increment: 1 } },
        create: { date: today, views: 1 },
      });

      return NextResponse.json({
        totalViews: globalMetric.views,
        dailyViews: dailyMetric.views,
      });
    }

    // Just fetch counts if not incrementing
    const today = new Date().toISOString().split("T")[0];
    const globalMetric = await prisma.siteMetric.findUnique({
      where: { id: "global" },
    });
    const dailyMetric = await prisma.dailyMetric.findUnique({
      where: { date: today },
    });

    return NextResponse.json({
      totalViews: globalMetric?.views || 0,
      dailyViews: dailyMetric?.views || 0,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: "Failed to update analytics" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const globalMetric = await prisma.siteMetric.findUnique({
      where: { id: "global" },
    });
    const dailyMetric = await prisma.dailyMetric.findUnique({
      where: { date: today },
    });

    return NextResponse.json({
      totalViews: globalMetric?.views || 0,
      dailyViews: dailyMetric?.views || 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

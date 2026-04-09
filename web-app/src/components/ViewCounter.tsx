"use client";

import { useEffect, useState } from "react";
import { Eye, TrendingUp } from "lucide-react";

export default function ViewCounter() {
  const [counts, setCounts] = useState<{ totalViews: number; dailyViews: number } | null>(null);

  useEffect(() => {
    const recordVisit = async () => {
      try {
        const hasVisited = sessionStorage.getItem("henafek_visited");
        const method = hasVisited ? "GET" : "POST";
        const body = hasVisited ? null : JSON.stringify({ increment: true });

        const response = await fetch("/api/analytics", {
          method: hasVisited ? "GET" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });

        if (response.ok) {
          const data = await response.json();
          setCounts(data);
          if (!hasVisited) {
            sessionStorage.setItem("henafek_visited", "true");
          }
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    recordVisit();
  }, []);

  if (!counts) return null;

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-sm border border-white/10">
        <Eye size={14} className="text-[var(--color-neon-blue)]" />
        <span className="text-xs font-medium text-gray-300">
          Total Views: <span className="text-white tabular-nums">{counts.totalViews.toLocaleString()}</span>
        </span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-sm border border-white/10">
        <TrendingUp size={14} className="text-[var(--color-gold)]" />
        <span className="text-xs font-medium text-gray-300">
          Daily Views: <span className="text-white tabular-nums">{counts.dailyViews.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
}

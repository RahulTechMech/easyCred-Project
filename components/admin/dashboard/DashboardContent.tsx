"use client";

import Link from "next/link";
import { useAdminStats } from "@/lib/admin/useAdminStats";
import { DashboardStatCards } from "./StatCards";
import { DailyLeadsChart, StatusDistributionChart, EmploymentTypeChart, CitiesChart } from "./Charts";
import { SkeletonCard, SkeletonChart } from "@/components/admin/Skeleton";

export function DashboardContent() {
  const { stats, loading, error } = useAdminStats();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-frost-50">Dashboard</h1>
          <p className="mt-1 text-sm text-frost-400">Overview of all loan application leads</p>
        </div>
        <Link
          href="/admin/leads"
          className="rounded-xl bg-grad-signal px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
        >
          View All Leads
        </Link>
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>}

      {loading || !stats ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <DashboardStatCards cards={stats.cards} />
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {loading || !stats ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <DailyLeadsChart data={stats.charts.dailyLeads} />
            <StatusDistributionChart data={stats.charts.statusDistribution} />
            <EmploymentTypeChart data={stats.charts.employmentType} />
            <CitiesChart data={stats.charts.cities} />
          </>
        )}
      </div>
    </div>
  );
}

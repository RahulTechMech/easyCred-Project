"use client";

import { useAdminStats } from "@/lib/admin/useAdminStats";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SkeletonCard, SkeletonChart } from "@/components/admin/Skeleton";
import {
  DailyLeadsChart,
  WeeklyLeadsChart,
  MonthlyLeadsChart,
  StatusDistributionChart,
  EmploymentTypeChart,
  CitiesChart,
  LoanAmountDistributionChart,
  ReadinessDistributionChart,
  ConversionFunnelChart,
} from "./Charts";

function exportAnalyticsCsv(stats: NonNullable<ReturnType<typeof useAdminStats>["stats"]>) {
  const lines: string[] = ["Metric,Value"];
  lines.push(`Total Leads,${stats.cards.total}`);
  lines.push(`Today's Leads,${stats.cards.today}`);
  lines.push(`This Week,${stats.cards.thisWeek}`);
  lines.push(`This Month,${stats.cards.thisMonth}`);
  lines.push(`Average Loan Amount,${stats.analytics.avgLoanAmount}`);
  lines.push(`Average Readiness Score,${stats.analytics.avgReadinessScore}`);
  lines.push("");
  lines.push("Status,Count");
  stats.charts.statusDistribution.forEach((s) => lines.push(`${s.status},${s.count}`));
  lines.push("");
  lines.push("City,Count");
  stats.charts.cities.forEach((c) => lines.push(`${c.city},${c.count}`));
  lines.push("");
  lines.push("Employee,Assigned,Approved,Conversion %");
  stats.analytics.topEmployees.forEach((e) => lines.push(`${e.name},${e.totalAssigned},${e.approved},${e.conversionRate}`));

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `easycred-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function AnalyticsContent() {
  const { stats, loading, error } = useAdminStats();

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-frost-50">Analytics</h1>
          <p className="mt-1 text-sm text-frost-400">Trends, distributions, and performance across all leads</p>
        </div>
        {stats && (
          <button
            type="button"
            onClick={() => exportAnalyticsCsv(stats)}
            className="rounded-xl bg-grad-signal px-4 py-2.5 text-xs font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Export Analytics (CSV)
          </button>
        )}
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>}

      {/* Averages */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {loading || !stats ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
              <p className="text-xs text-frost-400">Average Loan Amount</p>
              <p className="mt-2 font-mono text-xl font-bold text-frost-50">
                ₹{stats.analytics.avgLoanAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
              <p className="text-xs text-frost-400">Average Readiness Score</p>
              <AnimatedCounter value={stats.analytics.avgReadinessScore} className="mt-2 block font-mono text-xl font-bold text-mint-500" />
            </div>
            <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
              <p className="text-xs text-frost-400">Total Leads</p>
              <AnimatedCounter value={stats.cards.total} className="mt-2 block font-mono text-xl font-bold text-frost-50" />
            </div>
            <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
              <p className="text-xs text-frost-400">Approved + Disbursed</p>
              <AnimatedCounter
                value={stats.cards.approved + stats.cards.disbursed}
                className="mt-2 block font-mono text-xl font-bold text-signal-300"
              />
            </div>
          </>
        )}
      </div>

      {/* Trend charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {loading || !stats ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <DailyLeadsChart data={stats.charts.dailyLeads} />
            <WeeklyLeadsChart data={stats.charts.weeklyLeads} />
            <MonthlyLeadsChart data={stats.charts.monthlyLeads} />
          </>
        )}
      </div>

      {/* Distribution charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {loading || !stats ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <StatusDistributionChart data={stats.charts.statusDistribution} />
            <EmploymentTypeChart data={stats.charts.employmentType} />
            <CitiesChart data={stats.charts.cities} />
            <LoanAmountDistributionChart data={stats.charts.loanAmountDistribution} />
          </>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {loading || !stats ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <ReadinessDistributionChart data={stats.charts.readinessDistribution} />
            <ConversionFunnelChart data={stats.charts.conversionFunnel} />
          </>
        )}
      </div>

      {/* Top employees */}
      <div className="mt-5 rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
        <p className="mb-1 text-sm font-medium text-frost-200">Top Performing Employees</p>
        <p className="mb-4 text-xs text-frost-400/70">
          Based on current lead assignments — employee records themselves are placeholders until a real employee
          system is wired in.
        </p>
        {loading || !stats ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded-lg bg-ink-800/60" />
            ))}
          </div>
        ) : stats.analytics.topEmployees.length === 0 ? (
          <p className="text-sm text-frost-400">No leads have been assigned to employees yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="text-xs font-medium uppercase tracking-wide text-frost-400">
                  <th className="py-2">Employee</th>
                  <th className="py-2">Assigned</th>
                  <th className="py-2">Approved/Disbursed</th>
                  <th className="py-2">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline/5">
                {stats.analytics.topEmployees.map((emp) => (
                  <tr key={emp.name}>
                    <td className="py-2.5 text-frost-100">{emp.name}</td>
                    <td className="py-2.5 font-mono text-frost-300">{emp.totalAssigned}</td>
                    <td className="py-2.5 font-mono text-frost-300">{emp.approved}</td>
                    <td className="py-2.5 font-mono text-mint-500">{emp.conversionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

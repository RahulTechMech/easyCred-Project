"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { STATUS_STYLES } from "@/lib/crm/constants";

const AXIS_COLOR = "rgb(148 163 184)"; // frost-400, static (recharts SVG text doesn't reliably inherit CSS vars cross-theme)
const GRID_COLOR = "rgba(148, 163, 184, 0.15)";

const tooltipStyle = {
  background: "rgb(17 22 39)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  fontSize: "12px",
  color: "#f8fafc",
};

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <p className="mb-4 text-sm font-medium text-frost-200">{title}</p>
      <div className="h-64 w-full">{children}</div>
    </div>
  );
}

export function DailyLeadsChart({ data }: { data: { date: string; count: number }[] }) {
  return (
    <ChartCard title="Daily Leads (Last 14 Days)">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
          <defs>
            <linearGradient id="dailyLeadsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b8bff" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5b8bff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID_COLOR} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            tick={{ fill: AXIS_COLOR, fontSize: 11 }}
            axisLine={{ stroke: GRID_COLOR }}
            tickLine={false}
          />
          <YAxis allowDecimals={false} tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} labelFormatter={(d) => new Date(d).toLocaleDateString("en-IN")} />
          <Area type="monotone" dataKey="count" stroke="#5b8bff" strokeWidth={2} fill="url(#dailyLeadsGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function StatusDistributionChart({ data }: { data: { status: string; count: number }[] }) {
  return (
    <ChartCard title="Leads by Status">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
          <CartesianGrid stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="status" tick={{ fill: AXIS_COLOR, fontSize: 10 }} axisLine={{ stroke: GRID_COLOR }} tickLine={false} interval={0} angle={-25} textAnchor="end" height={60} />
          <YAxis allowDecimals={false} tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.status} fill={STATUS_STYLES[entry.status as keyof typeof STATUS_STYLES]?.chart || "#5b8bff"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

const PIE_COLORS = ["#5b8bff", "#18c68f", "#f5a524", "#a78bfa", "#22d3ee", "#ef4444", "#8fb0ff", "#f472b6"];

export function EmploymentTypeChart({ data }: { data: { type: string; count: number }[] }) {
  return (
    <ChartCard title="Employment Type">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="type" innerRadius={50} outerRadius={80} paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Legend wrapperStyle={{ fontSize: 11, color: AXIS_COLOR }} />
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function CitiesChart({ data }: { data: { city: string; count: number }[] }) {
  return (
    <ChartCard title="Leads by City">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 10 }}>
          <CartesianGrid stroke={GRID_COLOR} horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="city" tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" fill="#5b8bff" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ReadinessDistributionChart({ data }: { data: { range: string; count: number }[] }) {
  return (
    <ChartCard title="Loan Readiness Distribution">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
          <CartesianGrid stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="range" tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={{ stroke: GRID_COLOR }} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" fill="#18c68f" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function LoanAmountDistributionChart({ data }: { data: { range: string; count: number }[] }) {
  return (
    <ChartCard title="Loan Amount Distribution">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
          <CartesianGrid stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="range" tick={{ fill: AXIS_COLOR, fontSize: 10 }} axisLine={{ stroke: GRID_COLOR }} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" fill="#f5a524" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function WeeklyLeadsChart({ data }: { data: { week: string; count: number }[] }) {
  return (
    <ChartCard title="Weekly Leads (Last 8 Weeks)">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
          <CartesianGrid stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="week" tick={{ fill: AXIS_COLOR, fontSize: 10 }} axisLine={{ stroke: GRID_COLOR }} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" fill="#5b8bff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function MonthlyLeadsChart({ data }: { data: { month: string; count: number }[] }) {
  return (
    <ChartCard title="Monthly Leads (Last 6 Months)">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
          <defs>
            <linearGradient id="monthlyLeadsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18c68f" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#18c68f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={{ stroke: GRID_COLOR }} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: AXIS_COLOR, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="count" stroke="#18c68f" strokeWidth={2} fill="url(#monthlyLeadsGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ConversionFunnelChart({ data }: { data: { stage: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <p className="mb-4 text-sm font-medium text-frost-200">Conversion Funnel</p>
      <div className="space-y-2.5">
        {data.map((stage, i) => {
          const widthPct = Math.max((stage.count / max) * 100, stage.count > 0 ? 6 : 0);
          return (
            <div key={stage.stage}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-frost-300">{stage.stage}</span>
                <span className="font-mono text-frost-100">{stage.count}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-700/50">
                <div
                  className="h-full rounded-full bg-grad-signal transition-all duration-700"
                  style={{ width: `${widthPct}%`, transitionDelay: `${i * 60}ms` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

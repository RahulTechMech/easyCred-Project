export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Interested",
  "Documents Pending",
  "Verification",
  "Approved",
  "Rejected",
  "Disbursed",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

/**
 * Tailwind classes per status, kept in one place so status colors stay
 * consistent across the dashboard cards, leads table, lead detail page,
 * and charts.
 */
export const STATUS_STYLES: Record<LeadStatus, { badge: string; dot: string; chart: string }> = {
  New: { badge: "bg-signal-500/10 text-signal-300 border-signal-400/30", dot: "bg-signal-400", chart: "#5b8bff" },
  Contacted: { badge: "bg-amber-500/10 text-amber-500 border-amber-500/30", dot: "bg-amber-500", chart: "#f5a524" },
  Interested: { badge: "bg-mint-500/10 text-mint-500 border-mint-500/30", dot: "bg-mint-500", chart: "#18c68f" },
  "Documents Pending": {
    badge: "bg-purple-400/10 text-purple-300 border-purple-400/30",
    dot: "bg-purple-400",
    chart: "#a78bfa",
  },
  Verification: {
    badge: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
    dot: "bg-cyan-400",
    chart: "#22d3ee",
  },
  Approved: { badge: "bg-mint-500/10 text-mint-500 border-mint-500/30", dot: "bg-mint-500", chart: "#18c68f" },
  Rejected: { badge: "bg-red-500/10 text-red-400 border-red-500/30", dot: "bg-red-500", chart: "#ef4444" },
  Disbursed: {
    badge: "bg-signal-500/15 text-signal-200 border-signal-400/40",
    dot: "bg-signal-300",
    chart: "#8fb0ff",
  },
};

export type Employee = { id: string; name: string; role: string };

/**
 * Placeholder employees for lead assignment. Replace with a real employee
 * management system later — every place that assigns a lead just needs a
 * `{ id, name }` pair, so swapping this for a DB-backed list is a
 * self-contained change.
 */
export const PLACEHOLDER_EMPLOYEES: Employee[] = [
  { id: "emp-1", name: "Ananya Rao", role: "Senior Loan Advisor" },
  { id: "emp-2", name: "Karan Mehta", role: "Loan Advisor" },
  { id: "emp-3", name: "Sneha Iyer", role: "Loan Advisor" },
  { id: "emp-4", name: "Rahul Bose", role: "Verification Officer" },
  { id: "emp-5", name: "Divya Menon", role: "Senior Loan Advisor" },
];

export type CallOutcome =
  | "No Answer"
  | "Call Back Later"
  | "Not Interested"
  | "Interested"
  | "Documents Requested"
  | "Other";

export const CALL_OUTCOMES: CallOutcome[] = [
  "No Answer",
  "Call Back Later",
  "Not Interested",
  "Interested",
  "Documents Requested",
  "Other",
];

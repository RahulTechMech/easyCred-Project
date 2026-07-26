"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SkeletonTableRow } from "@/components/admin/Skeleton";
import { LEAD_STATUSES } from "@/lib/crm/constants";

type LeadRow = {
  _id: string;
  leadId: string;
  personal: { fullName: string; mobileNumber: string; email: string; city: string };
  loan: { requiredLoanAmount: number };
  employment: { employmentType: string };
  loanReadinessScore?: number;
  status: string;
  assignedEmployee?: string;
  createdAt: string;
};

const EMPLOYMENT_TYPES = ["Salaried", "Self Employed", "Business Owner", "Government Employee"];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "createdAt", label: "Date Created" },
  { value: "name", label: "Applicant Name" },
  { value: "loanAmount", label: "Loan Amount" },
  { value: "readiness", label: "Readiness Score" },
  { value: "status", label: "Status" },
];

const inputCls =
  "rounded-lg border border-hairline/10 bg-ink-800/60 px-3 py-2 text-xs text-frost-50 outline-none focus:border-signal-400";

export function LeadsTable() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0, totalPages: 1 });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      search: search || undefined,
      status: status || undefined,
      city: city || undefined,
      employmentType: employmentType || undefined,
      minAmount: minAmount || undefined,
      maxAmount: maxAmount || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      sortBy,
      sortDir,
      page,
      pageSize: 20,
    }),
    [search, status, city, employmentType, minAmount, maxAmount, dateFrom, dateTo, sortBy, sortDir, page]
  );

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      axios
        .get("/api/admin/leads", { params })
        .then((res) => {
          setLeads(res.data.leads);
          setPagination(res.data.pagination);
        })
        .catch(() => setLeads([]))
        .finally(() => setLoading(false));
    }, 300); // debounce search/filter changes

    return () => clearTimeout(timeout);
  }, [params]);

  useEffect(() => {
    setPage(1);
  }, [search, status, city, employmentType, minAmount, maxAmount, dateFrom, dateTo]);

  function toggleSort(column: string) {
    if (sortBy === column) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDir("desc");
    }
  }

  function exportFilteredCsv() {
    const headers = ["Lead ID", "Name", "Phone", "Email", "City", "Loan Amount", "Employment Type", "Readiness", "Status", "Assigned", "Created"];
    const rows = leads.map((l) => [
      l.leadId,
      l.personal.fullName,
      l.personal.mobileNumber,
      l.personal.email,
      l.personal.city,
      String(l.loan.requiredLoanAmount),
      l.employment.employmentType,
      String(l.loanReadinessScore ?? ""),
      l.status,
      l.assignedEmployee || "",
      new Date(l.createdAt).toLocaleDateString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `easycred-leads-filtered-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadFullExcel() {
    const res = await axios.get("/api/admin/leads/export", { responseType: "blob" });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "easycred-leads.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  }

  const activeFilterCount = [status, city, employmentType, minAmount, maxAmount, dateFrom, dateTo].filter(Boolean).length;

  function SortHeader({ column, label }: { column: string; label: string }) {
    const isActive = sortBy === column;
    return (
      <button
        type="button"
        onClick={() => toggleSort(column)}
        className={`flex items-center gap-1 text-left text-xs font-medium uppercase tracking-wide ${
          isActive ? "text-signal-300" : "text-frost-400"
        }`}
      >
        {label}
        {isActive && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className={sortDir === "asc" ? "rotate-180" : ""}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-frost-50">Leads</h1>
          <p className="mt-1 text-sm text-frost-400">{pagination.total} total applications</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportFilteredCsv}
            className="rounded-xl border border-hairline/10 bg-ink-800/40 px-4 py-2.5 text-xs font-semibold text-frost-100 transition-colors hover:border-signal-400/40"
          >
            Export Filtered (CSV)
          </button>
          <button
            type="button"
            onClick={downloadFullExcel}
            className="rounded-xl bg-grad-signal px-4 py-2.5 text-xs font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Download Full Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 space-y-3 rounded-xl2 border border-hairline/10 bg-ink-800/30 p-4">
        <input
          type="text"
          placeholder="Search by name, phone, email, or Lead ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-hairline/10 bg-ink-800/60 px-4 py-2.5 text-sm text-frost-50 outline-none placeholder:text-frost-400/60 focus:border-signal-400"
        />
        <div className="flex flex-wrap gap-2">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
            <option value="">All Statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s} className="bg-ink-800">
                {s}
              </option>
            ))}
          </select>
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={`${inputCls} w-28`} />
          <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className={inputCls}>
            <option value="">All Employment Types</option>
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-ink-800">
                {t}
              </option>
            ))}
          </select>
          <input type="number" placeholder="Min ₹" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} className={`${inputCls} w-24`} />
          <input type="number" placeholder="Max ₹" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className={`${inputCls} w-24`} />
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={inputCls} />
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className={inputCls} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={inputCls}
            aria-label="Sort by"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-ink-800">
                Sort: {o.label}
              </option>
            ))}
          </select>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setStatus("");
                setCity("");
                setEmploymentType("");
                setMinAmount("");
                setMaxAmount("");
                setDateFrom("");
                setDateTo("");
              }}
              className="rounded-lg px-3 py-2 text-xs font-medium text-signal-300 hover:text-signal-200"
            >
              Clear filters ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl2 border border-hairline/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-ink-800/60">
            <tr>
              <th className="px-4 py-3">Lead ID</th>
              <th className="px-4 py-3">
                <SortHeader column="name" label="Applicant" />
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-frost-400">Phone</th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-frost-400">City</th>
              <th className="px-4 py-3">
                <SortHeader column="loanAmount" label="Loan Amount" />
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-frost-400">Employment</th>
              <th className="px-4 py-3">
                <SortHeader column="readiness" label="Readiness" />
              </th>
              <th className="px-4 py-3">
                <SortHeader column="status" label="Status" />
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-frost-400">Assigned</th>
              <th className="px-4 py-3">
                <SortHeader column="createdAt" label="Created" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline/5">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonTableRow key={i} columns={10} />)
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-sm text-frost-400">
                  No leads match your filters.
                </td>
              </tr>
            ) : (
              leads.map((lead, i) => (
                <motion.tr
                  key={lead._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  className="transition-colors hover:bg-ink-800/30"
                >
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead._id}`} className="font-mono text-xs text-signal-300 hover:text-signal-200">
                      {lead.leadId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-frost-100">{lead.personal.fullName}</td>
                  <td className="px-4 py-3 font-mono text-xs text-frost-300">{lead.personal.mobileNumber}</td>
                  <td className="px-4 py-3 text-frost-300">{lead.personal.city}</td>
                  <td className="px-4 py-3 font-mono text-xs text-frost-100">
                    ₹{lead.loan.requiredLoanAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-xs text-frost-300">{lead.employment.employmentType}</td>
                  <td className="px-4 py-3 font-mono text-xs text-frost-100">
                    {lead.loanReadinessScore ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-frost-300">{lead.assignedEmployee || "Unassigned"}</td>
                  <td className="px-4 py-3 text-xs text-frost-400">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-xs text-frost-400">
        <span>
          Page {pagination.page} of {pagination.totalPages} — {pagination.total} results
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-hairline/10 px-3 py-1.5 font-medium text-frost-200 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            className="rounded-lg border border-hairline/10 px-3 py-1.5 font-medium text-frost-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

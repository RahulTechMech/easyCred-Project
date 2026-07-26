"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LEAD_STATUSES, PLACEHOLDER_EMPLOYEES } from "@/lib/crm/constants";

const selectCls =
  "w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-3 py-2.5 text-sm text-frost-50 outline-none focus:border-signal-400";

export function ActionsPanel({
  leadId,
  mongoId,
  status,
  assignedEmployee,
  mobileNumber,
  email,
  applicantName,
  onUpdated,
}: {
  leadId: string;
  mongoId: string;
  status: string;
  assignedEmployee?: string;
  mobileNumber: string;
  email: string;
  applicantName: string;
  onUpdated: (lead: any) => void;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function updateField(payload: Record<string, unknown>) {
    setUpdating(true);
    try {
      const res = await axios.patch(`/api/admin/leads/${mongoId}`, payload);
      onUpdated(res.data.lead);
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/leads/${mongoId}`);
      router.push("/admin/leads");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  const whatsappNumber = mobileNumber.replace(/\D/g, "");

  return (
    <div className="space-y-4 rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <p className="text-sm font-semibold text-frost-50">Actions</p>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-frost-400">Status</label>
        <select
          value={status}
          disabled={updating}
          onChange={(e) => updateField({ status: e.target.value })}
          className={selectCls}
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s} className="bg-ink-800">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-frost-400">Assigned Employee</label>
        <select
          value={assignedEmployee || ""}
          disabled={updating}
          onChange={(e) => updateField({ assignedEmployee: e.target.value })}
          className={selectCls}
        >
          <option value="" className="bg-ink-800">
            Unassigned
          </option>
          {PLACEHOLDER_EMPLOYEES.map((emp) => (
            <option key={emp.id} value={emp.name} className="bg-ink-800">
              {emp.name} — {emp.role}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <a
          href={`tel:${mobileNumber}`}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-grad-signal px-3 py-2.5 text-xs font-semibold text-white shadow-glow"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          Call
        </a>
        <a
          href={`https://wa.me/91${whatsappNumber.slice(-10)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-mint-500 px-3 py-2.5 text-xs font-semibold text-ink-950"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.34a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Z" />
          </svg>
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => alert(`Email to ${email} — not wired up yet (placeholder). Configure SMTP in Settings first.`)}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-hairline/10 px-3 py-2.5 text-xs font-semibold text-frost-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v16H4V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="m4 6 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          Email
        </button>
        <button
          type="button"
          onClick={() => alert(`Download PDF for ${applicantName} (${leadId}) — not wired up yet (placeholder).`)}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-hairline/10 px-3 py-2.5 text-xs font-semibold text-frost-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          PDF
        </button>
      </div>

      <div className="border-t border-hairline/10 pt-4">
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className={`w-full rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors ${
            confirmDelete
              ? "border-red-500 bg-red-500/10 text-red-400"
              : "border-hairline/10 text-frost-300 hover:border-red-500/30 hover:text-red-400"
          }`}
        >
          {deleting ? "Deleting…" : confirmDelete ? "Click again to confirm delete" : "Delete Lead"}
        </button>
        {confirmDelete && (
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="mt-2 w-full text-center text-[11px] text-frost-400 hover:text-frost-200"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

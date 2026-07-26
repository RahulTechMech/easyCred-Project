"use client";

import { useState } from "react";
import axios from "axios";
import { CALL_OUTCOMES } from "@/lib/crm/constants";

type FollowUp = { date?: string; time?: string; completed: boolean };

export function FollowUpPanel({
  mongoId,
  followUp,
  lastContactedAt,
  callOutcome,
  onUpdated,
}: {
  mongoId: string;
  followUp?: FollowUp;
  lastContactedAt?: string;
  callOutcome?: string;
  onUpdated: (lead: any) => void;
}) {
  const [date, setDate] = useState(followUp?.date || "");
  const [time, setTime] = useState(followUp?.time || "");
  const [outcome, setOutcome] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveFollowUp() {
    setSaving(true);
    try {
      const res = await axios.patch(`/api/admin/leads/${mongoId}`, { followUp: { date, time, completed: followUp?.completed || false } });
      onUpdated(res.data.lead);
    } finally {
      setSaving(false);
    }
  }

  async function markComplete() {
    setSaving(true);
    try {
      const res = await axios.patch(`/api/admin/leads/${mongoId}`, { followUp: { date, time, completed: true } });
      onUpdated(res.data.lead);
    } finally {
      setSaving(false);
    }
  }

  async function logOutcome() {
    if (!outcome) return;
    setSaving(true);
    try {
      const res = await axios.patch(`/api/admin/leads/${mongoId}`, {
        callOutcome: outcome,
        customerInterested: outcome === "Interested",
      });
      onUpdated(res.data.lead);
      setOutcome("");
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-3 py-2.5 text-sm text-frost-50 outline-none focus:border-signal-400";

  return (
    <div className="space-y-4 rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <p className="text-sm font-semibold text-frost-50">Follow-Up</p>

      <div>
        <p className="text-xs text-frost-400">Last Contacted</p>
        <p className="mt-1 text-sm text-frost-100">
          {lastContactedAt ? new Date(lastContactedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Not contacted yet"}
        </p>
        {callOutcome && <p className="mt-1 text-xs text-frost-400">Last outcome: {callOutcome}</p>}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-frost-400">Next Follow-up Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-frost-400">Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={saveFollowUp}
          disabled={saving}
          className="flex-1 rounded-xl bg-grad-signal px-4 py-2.5 text-xs font-semibold text-white shadow-glow disabled:opacity-60"
        >
          Save Follow-up
        </button>
        {followUp?.date && !followUp.completed && (
          <button
            type="button"
            onClick={markComplete}
            disabled={saving}
            className="rounded-xl border border-mint-500/30 px-4 py-2.5 text-xs font-semibold text-mint-500"
          >
            Mark Complete
          </button>
        )}
      </div>

      {followUp?.completed && (
        <p className="flex items-center gap-1.5 text-xs text-mint-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Follow-up completed
        </p>
      )}

      <div className="border-t border-hairline/10 pt-4">
        <label className="mb-1.5 block text-xs font-medium text-frost-400">Log Call Outcome</label>
        <div className="flex gap-2">
          <select value={outcome} onChange={(e) => setOutcome(e.target.value)} className={inputCls}>
            <option value="" className="bg-ink-800">
              Select outcome…
            </option>
            {CALL_OUTCOMES.map((o) => (
              <option key={o} value={o} className="bg-ink-800">
                {o}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={logOutcome}
            disabled={saving || !outcome}
            className="shrink-0 rounded-xl border border-hairline/10 px-4 py-2.5 text-xs font-semibold text-frost-200 disabled:opacity-50"
          >
            Log
          </button>
        </div>
      </div>
    </div>
  );
}

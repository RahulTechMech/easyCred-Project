"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Note = { text: string; author: string; createdAt: string };

export function NotesPanel({ leadId, notes, onUpdated }: { leadId: string; notes: Note[]; onUpdated: (lead: any) => void }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function addNote() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSubmitting(true);
    try {
      const res = await axios.post(`/api/admin/leads/${leadId}/notes`, { text: trimmed });
      onUpdated(res.data.lead);
      setText("");
    } finally {
      setSubmitting(false);
    }
  }

  const sorted = [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <p className="mb-4 text-sm font-semibold text-frost-50">Internal Notes</p>

      <div className="mb-4 flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note about this lead…"
          rows={2}
          className="flex-1 rounded-xl border border-hairline/10 bg-ink-800/60 px-3 py-2 text-sm text-frost-50 outline-none placeholder:text-frost-400/60 focus:border-signal-400"
        />
        <button
          type="button"
          onClick={addNote}
          disabled={submitting || !text.trim()}
          className="shrink-0 rounded-xl bg-grad-signal px-4 py-2 text-xs font-semibold text-white shadow-glow disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-frost-400">No notes yet.</p>
      ) : (
        <div className="max-h-64 space-y-3 overflow-y-auto thin-scroll pr-1">
          {sorted.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-ink-800/40 p-3"
            >
              <p className="text-sm text-frost-100">{note.text}</p>
              <p className="mt-1 text-[11px] text-frost-400">
                {note.author} • {new Date(note.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

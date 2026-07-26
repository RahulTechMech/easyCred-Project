"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type SettingsData = {
  companyName: string;
  supportEmail: string;
  supportPhone: string;
  whatsappNumber: string;
  officeAddress: string;
  defaultTheme: "dark" | "light";
  msg91ApiKey?: string;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  smtpHost?: string;
  smtpUser?: string;
  smtpPass?: string;
};

const inputCls =
  "w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-4 py-2.5 text-sm text-frost-50 outline-none placeholder:text-frost-400/60 focus:border-signal-400";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-frost-200">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-frost-400/70">{hint}</p>}
    </div>
  );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-6">
      <p className="text-sm font-semibold text-frost-50">{title}</p>
      {subtitle && <p className="mt-1 text-xs text-frost-400">{subtitle}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export function SettingsForm() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [excelStatus, setExcelStatus] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/settings")
      .then((res) => setData(res.data.settings))
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof SettingsData>(key: K, value: SettingsData[K]) {
    setData((d) => (d ? { ...d, [key]: value } : d));
    setSaved(false);
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      const res = await axios.put("/api/admin/settings", data);
      setData(res.data.settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function downloadExcel() {
    setExcelStatus("Downloading…");
    try {
      const res = await axios.get("/api/admin/leads/export", { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "easycred-leads.xlsx";
      a.click();
      URL.revokeObjectURL(url);
      setExcelStatus("Downloaded.");
    } catch {
      setExcelStatus("No leads found yet.");
    } finally {
      setTimeout(() => setExcelStatus(""), 3000);
    }
  }

  async function regenerateExcel() {
    setExcelStatus("Regenerating…");
    try {
      const res = await axios.post("/api/admin/leads/export");
      setExcelStatus(`Regenerated with ${res.data.rowCount} leads.`);
    } catch {
      setExcelStatus("Failed to regenerate.");
    } finally {
      setTimeout(() => setExcelStatus(""), 4000);
    }
  }

  if (loading || !data) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl2 bg-ink-800/40" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-frost-50">Settings</h1>
        <p className="mt-1 text-sm text-frost-400">Company info, contact details, and integration configuration</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard title="Company Information">
          <Field label="Company Name">
            <input className={inputCls} value={data.companyName} onChange={(e) => update("companyName", e.target.value)} />
          </Field>
          <Field label="Logo" hint="Logo upload isn't wired up yet — requires Cloudinary or similar storage integration.">
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-hairline/20 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-grad-signal font-display text-xs font-bold text-white">
                EC
              </span>
              <button type="button" disabled className="rounded-lg border border-hairline/10 px-3 py-1.5 text-xs text-frost-400 opacity-60">
                Upload Logo (coming soon)
              </button>
            </div>
          </Field>
        </SectionCard>

        <SectionCard title="Contact Details">
          <Field label="Support Email">
            <input type="email" className={inputCls} value={data.supportEmail} onChange={(e) => update("supportEmail", e.target.value)} />
          </Field>
          <Field label="Support Phone">
            <input className={inputCls} value={data.supportPhone} onChange={(e) => update("supportPhone", e.target.value)} />
          </Field>
          <Field label="WhatsApp Number" hint="Digits only, with country code (e.g. 911234567890).">
            <input className={inputCls} value={data.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} />
          </Field>
          <Field label="Office Address">
            <textarea rows={2} className={inputCls} value={data.officeAddress} onChange={(e) => update("officeAddress", e.target.value)} />
          </Field>
        </SectionCard>

        <SectionCard title="SMS OTP — MSG91" subtitle="Placeholder for lib/services/otp — wire up Msg91OtpService once set.">
          <Field label="MSG91 API Key">
            <input className={inputCls} placeholder="Not configured" value={data.msg91ApiKey || ""} onChange={(e) => update("msg91ApiKey", e.target.value)} />
          </Field>
        </SectionCard>

        <SectionCard title="SMS OTP — Twilio Verify" subtitle="Alternative provider for lib/services/otp.">
          <Field label="Account SID">
            <input className={inputCls} placeholder="Not configured" value={data.twilioAccountSid || ""} onChange={(e) => update("twilioAccountSid", e.target.value)} />
          </Field>
          <Field label="Auth Token">
            <input type="password" className={inputCls} placeholder="Not configured" value={data.twilioAuthToken || ""} onChange={(e) => update("twilioAuthToken", e.target.value)} />
          </Field>
        </SectionCard>

        <SectionCard title="Email — SMTP / Nodemailer" subtitle="Placeholder for lib/services/email — wire up NodemailerEmailService once set.">
          <Field label="SMTP Host">
            <input className={inputCls} placeholder="smtp.your-provider.com" value={data.smtpHost || ""} onChange={(e) => update("smtpHost", e.target.value)} />
          </Field>
          <Field label="SMTP Username">
            <input className={inputCls} placeholder="Not configured" value={data.smtpUser || ""} onChange={(e) => update("smtpUser", e.target.value)} />
          </Field>
          <Field label="SMTP Password">
            <input type="password" className={inputCls} placeholder="Not configured" value={data.smtpPass || ""} onChange={(e) => update("smtpPass", e.target.value)} />
          </Field>
        </SectionCard>

        <SectionCard title="Admin API Key" subtitle="Used by the legacy public Excel-download endpoint.">
          <p className="rounded-xl border border-hairline/10 bg-ink-800/40 p-4 text-xs leading-relaxed text-frost-400">
            The <code className="text-signal-300">ADMIN_API_KEY</code> environment variable protects{" "}
            <code className="text-signal-300">/api/loan-application/export</code>. It&apos;s set via your server&apos;s
            environment, not here, and is never sent to the browser. The CRM&apos;s own Excel buttons below use your
            authenticated admin session instead — you don&apos;t need this key for day-to-day use.
          </p>
        </SectionCard>

        <SectionCard title="Excel Export Controls" subtitle="Reuses the same lead-export system as the marketing site's Excel pipeline.">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={downloadExcel} className="rounded-xl bg-grad-signal px-4 py-2.5 text-xs font-semibold text-white shadow-glow">
              Download Latest Excel
            </button>
            <button type="button" onClick={regenerateExcel} className="rounded-xl border border-hairline/10 px-4 py-2.5 text-xs font-semibold text-frost-200">
              Generate Fresh Excel
            </button>
          </div>
          {excelStatus && <p className="text-xs text-frost-400">{excelStatus}</p>}
        </SectionCard>

        <SectionCard title="Theme Settings" subtitle="Placeholder default — use the toggle in the sidebar to switch your own session's theme right now.">
          <Field label="Default Theme">
            <select className={inputCls} value={data.defaultTheme} onChange={(e) => update("defaultTheme", e.target.value as "dark" | "light")}>
              <option value="dark" className="bg-ink-800">Dark</option>
              <option value="light" className="bg-ink-800">Light</option>
            </select>
          </Field>
        </SectionCard>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sticky bottom-4 mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-grad-signal px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Settings"}
        </button>
        {saved && <span className="text-sm text-mint-500">Saved ✓</span>}
      </motion.div>
    </div>
  );
}

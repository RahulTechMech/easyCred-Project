"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await axios.post("/api/admin/login", { email, password });
      const redirect = searchParams.get("redirect") || "/admin";
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setStatus("error");
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel w-full max-w-sm rounded-xl2 p-8 shadow-card"
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-grad-signal font-display text-lg font-bold text-white shadow-glow">
          EC
        </span>
        <h1 className="mt-4 font-display text-xl font-semibold text-frost-50">EasyCred Admin</h1>
        <p className="mt-1 text-sm text-frost-400">Sign in to access the CRM</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-frost-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@easycred.example"
            className="w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-4 py-3 text-sm text-frost-50 outline-none placeholder:text-frost-400/60 focus:border-signal-400"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-frost-200">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-4 py-3 text-sm text-frost-50 outline-none placeholder:text-frost-400/60 focus:border-signal-400"
          />
        </div>

        {error && <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-grad-signal px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {status === "submitting" ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-frost-400/70">Internal tool — authorized EasyCred staff only.</p>
    </motion.div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-grad-radial-glow" aria-hidden />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

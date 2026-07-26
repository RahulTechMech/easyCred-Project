"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true, icon: "grid" },
  { href: "/admin/leads", label: "Leads", exact: false, icon: "users" },
  { href: "/admin/analytics", label: "Analytics", exact: false, icon: "chart" },
  { href: "/admin/settings", label: "Settings", exact: false, icon: "settings" },
] as const;

const ICONS: Record<string, React.ReactNode> = {
  grid: (
    <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  ),
  users: (
    <path
      d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M15 4.13a4 4 0 0 1 0 7.75M21 20v-1a4 4 0 0 0-3-3.87M11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chart: <path d="M4 20V10m6 10V4m6 16v-7m6 7H2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />,
  settings: (
    <path
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 0-.15-1.53l2.02-1.58-2-3.46-2.38.96a8 8 0 0 0-2.65-1.53L14.5 2h-5l-.34 2.86a8 8 0 0 0-2.65 1.53l-2.38-.96-2 3.46 2.02 1.58A8 8 0 0 0 4 12c0 .52.05 1.03.15 1.53l-2.02 1.58 2 3.46 2.38-.96a8 8 0 0 0 2.65 1.53L9.5 22h5l.34-2.86a8 8 0 0 0 2.65-1.53l2.38.96 2-3.46-2.02-1.58c.1-.5.15-1.01.15-1.53Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
};

export function AdminSidebar({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await axios.post("/api/admin/logout");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-hairline/10 bg-ink-900/60 backdrop-blur-xl lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-hairline/10 px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-signal font-display text-sm font-bold text-white">
          EC
        </span>
        <span className="font-display text-base font-bold text-frost-50">Admin CRM</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6" aria-label="Admin navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "text-frost-50" : "text-frost-400 hover:text-frost-100"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="admin-nav-active"
                  className="absolute inset-0 rounded-xl bg-signal-500/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative">
                {ICONS[item.icon]}
              </svg>
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-hairline/10 p-4">
        <div className="mb-3 flex items-center justify-between rounded-xl bg-ink-800/40 px-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-frost-200">{adminEmail || "Admin"}</p>
            <p className="text-[11px] text-frost-400">Signed in</p>
          </div>
          <ThemeToggle />
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-hairline/10 px-3 py-2.5 text-sm font-medium text-frost-300 transition-colors hover:border-red-500/30 hover:text-red-400"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

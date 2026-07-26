"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/leads", label: "Leads", exact: false },
  { href: "/admin/analytics", label: "Analytics", exact: false },
  { href: "/admin/settings", label: "Settings", exact: false },
] as const;

export function AdminMobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await axios.post("/api/admin/logout");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-hairline/10 bg-ink-900 lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-hairline/10 px-5">
              <span className="font-display text-base font-bold text-frost-50">Admin CRM</span>
              <button type="button" onClick={onClose} aria-label="Close menu" className="text-frost-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-6">
              {NAV_ITEMS.map((item) => {
                const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      "block rounded-xl px-4 py-3 text-sm font-medium",
                      isActive ? "bg-signal-500/10 text-signal-300" : "text-frost-300"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-hairline/10 p-4">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border border-hairline/10 px-4 py-3 text-sm font-medium text-frost-300 hover:text-red-400"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { ThemeToggle } from "../theme/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/personal-loan", label: "Personal Loan" },
  { href: "/eligibility-calculator", label: "Eligibility" },
  { href: "/emi-calculator", label: "EMI Calculator" },
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-hairline/10 bg-ink-950/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-signal font-display text-sm font-bold text-white">
            EC
          </span>
          <span className="font-display text-lg font-bold text-frost-50">EasyCred</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-frost-50" : "text-frost-400 hover:text-frost-100"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-signal-400"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <Link
            href="/apply"
            className="hidden rounded-xl bg-grad-signal px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] sm:inline-block"
          >
            Apply Now
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline/10 text-frost-200 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-hairline/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    pathname === link.href ? "bg-signal-500/10 text-signal-300" : "text-frost-300"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-hairline/10 pt-4">
                <ThemeToggle />
                <Link
                  href="/apply"
                  className="rounded-xl bg-grad-signal px-4 py-2 text-sm font-semibold text-white shadow-glow"
                >
                  Apply Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

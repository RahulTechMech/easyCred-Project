"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_NUMBER = "911234567890"; // placeholder — replace with real number
const PHONE_NUMBER = "+911234567890"; // placeholder — replace with real number

export function FloatingButtons() {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const hideStickyApply = pathname === "/apply";

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Bottom-left stack: WhatsApp + Call */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-mint-500 text-white shadow-card transition-transform hover:scale-110"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.34a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 17.9h-.01a8 8 0 0 1-4.1-1.13l-.29-.17-3.05.75.8-2.98-.19-.31a7.94 7.94 0 0 1-1.24-4.24c0-4.4 3.6-7.99 8.03-7.99 4.42 0 8.02 3.58 8.02 7.99 0 4.4-3.6 8.08-8 8.08Zm4.4-6.02c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
          </svg>
        </a>
        <a
          href={`tel:${PHONE_NUMBER}`}
          aria-label="Call EasyCred"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-grad-signal text-white shadow-card transition-transform hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Bottom-right stack: Back to top + Sticky Apply */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline/10 bg-ink-800/90 text-frost-200 shadow-card backdrop-blur transition-colors hover:border-signal-400/40 hover:text-signal-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {!hideStickyApply && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link
              href="/apply"
              className="flex items-center gap-2 rounded-full bg-grad-signal px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              Apply Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </>
  );
}

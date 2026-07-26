"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingButtons } from "./FloatingButtons";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { PageTransition } from "./PageTransition";

/**
 * The marketing site (Navbar, Footer, floating WhatsApp/Call/Apply buttons,
 * scroll progress bar) is only appropriate on public pages. The admin CRM
 * under /admin renders its own sidebar/topbar shell instead — see
 * app/admin/(portal)/layout.tsx — so this wrapper skips the marketing chrome
 * there rather than duplicating the exclusion logic in every admin page.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
      <FloatingButtons />
    </>
  );
}

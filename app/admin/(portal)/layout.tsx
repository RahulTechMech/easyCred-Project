import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/auth/adminAuth";
import { AdminShell } from "@/components/admin/layout/AdminShell";

// middleware.ts already redirects unauthenticated requests before they reach
// this layout, but we check again here (defense in depth, and to grab the
// session for display) — a layout should never assume middleware ran.
export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const session = await adminAuth.getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell adminEmail={session.email}>{children}</AdminShell>;
}

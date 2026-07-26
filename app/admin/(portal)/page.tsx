import type { Metadata } from "next";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <DashboardContent />;
}

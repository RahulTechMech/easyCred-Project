import type { Metadata } from "next";
import { AnalyticsContent } from "@/components/admin/dashboard/AnalyticsContent";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsPage() {
  return <AnalyticsContent />;
}

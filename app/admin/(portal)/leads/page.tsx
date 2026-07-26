import type { Metadata } from "next";
import { LeadsTable } from "@/components/admin/leads/LeadsTable";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <LeadsTable />;
}

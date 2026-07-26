import type { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connectDB";
import { LoanApplication } from "@/models/LoanApplication";
import { LeadDetailView } from "@/components/admin/leads/detail/LeadDetailView";

export const metadata: Metadata = {
  title: "Lead Detail",
  robots: { index: false, follow: false },
};

export default async function AdminLeadDetailPage({ params }: { params: { id: string } }) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await connectDB();
  const lead = await LoanApplication.findById(params.id).lean();

  if (!lead) {
    notFound();
  }

  // Server Components can only pass JSON-serializable props to Client
  // Components — this strips Mongoose's ObjectId/Date instances down to
  // plain strings the same way an API response would.
  const serialized = JSON.parse(JSON.stringify(lead));

  return <LeadDetailView initialLead={serialized} />;
}

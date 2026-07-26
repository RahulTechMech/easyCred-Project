"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  PersonalInfoCard,
  EmploymentCard,
  LoanDetailsCard,
  ExistingLoansCard,
  AdditionalDetailsCard,
  DocumentsPlaceholderCard,
} from "./InfoCards";
import { ReadinessCard } from "./ReadinessCard";
import { ActionsPanel } from "./ActionsPanel";
import { FollowUpPanel } from "./FollowUpPanel";
import { NotesPanel } from "./NotesPanel";
import { TimelinePanel } from "./TimelinePanel";

export function LeadDetailView({ initialLead }: { initialLead: any }) {
  const [lead, setLead] = useState(initialLead);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/leads" className="text-xs font-medium text-signal-300 hover:text-signal-200">
            ← Back to Leads
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-frost-50">{lead.personal.fullName}</h1>
            <StatusBadge status={lead.status} />
          </div>
          <p className="mt-1 font-mono text-xs text-frost-400">{lead.leadId}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-5">
          <PersonalInfoCard personal={lead.personal} />
          <EmploymentCard employment={lead.employment} />
          <LoanDetailsCard loan={lead.loan} />
          <ExistingLoansCard existingLoans={lead.existingLoans} />
          <AdditionalDetailsCard additional={lead.additional} />
          <DocumentsPlaceholderCard />
          <NotesPanel leadId={lead._id} notes={lead.notes || []} onUpdated={setLead} />
          <TimelinePanel timeline={lead.timeline || []} />
        </div>

        <div className="space-y-5">
          <ReadinessCard score={lead.loanReadinessScore} />
          <ActionsPanel
            leadId={lead.leadId}
            mongoId={lead._id}
            status={lead.status}
            assignedEmployee={lead.assignedEmployee}
            mobileNumber={lead.personal.mobileNumber}
            email={lead.personal.email}
            applicantName={lead.personal.fullName}
            onUpdated={setLead}
          />
          <FollowUpPanel
            mongoId={lead._id}
            followUp={lead.followUp}
            lastContactedAt={lead.lastContactedAt}
            callOutcome={lead.callOutcome}
            onUpdated={setLead}
          />
        </div>
      </motion.div>
    </div>
  );
}

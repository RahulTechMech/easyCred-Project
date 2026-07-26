"use client";

import { useFormContext } from "react-hook-form";
import type { FullLoanApplicationValues } from "@/lib/validation/loanApplicationSchema";

function ReviewRow({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 text-sm">
      <span className="text-frost-400">{label}</span>
      <span className="text-right font-medium text-frost-100">{value}</span>
    </div>
  );
}

function ReviewCard({ title, step, onEdit, children }: { title: string; step: number; onEdit: (step: number) => void; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-hairline/10 bg-ink-800/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-frost-50">{title}</p>
        <button type="button" onClick={() => onEdit(step)} className="text-xs font-medium text-signal-300 hover:text-signal-200">
          Edit
        </button>
      </div>
      <div className="divide-y divide-hairline/5">{children}</div>
    </div>
  );
}

export function ReviewStep({ onEditStep }: { onEditStep: (step: number) => void }) {
  const { getValues } = useFormContext<FullLoanApplicationValues>();
  const v = getValues();

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold text-frost-50 sm:text-2xl">Review Your Application</h2>
        <p className="mt-1 text-sm text-frost-400">Double-check everything looks right before you submit</p>
      </div>

      <div className="max-h-[420px] space-y-4 overflow-y-auto thin-scroll pr-1">
        <ReviewCard title="Personal Information" step={1} onEdit={onEditStep}>
          <ReviewRow label="Full Name" value={v.fullName} />
          <ReviewRow label="Mobile" value={v.mobileNumber} />
          <ReviewRow label="Email" value={v.email} />
          <ReviewRow label="City / State" value={v.city && v.state ? `${v.city}, ${v.state}` : undefined} />
          <ReviewRow label="PAN" value={v.panNumber} />
        </ReviewCard>

        <ReviewCard title="Employment" step={2} onEdit={onEditStep}>
          <ReviewRow label="Type" value={v.employmentType} />
          <ReviewRow label="Company / Business" value={v.companyName || v.businessName} />
          <ReviewRow label="Monthly Income" value={v.monthlySalary ? `₹${Number(v.monthlySalary).toLocaleString("en-IN")}` : undefined} />
        </ReviewCard>

        <ReviewCard title="Loan Details" step={3} onEdit={onEditStep}>
          <ReviewRow label="Amount Required" value={v.requiredLoanAmount ? `₹${Number(v.requiredLoanAmount).toLocaleString("en-IN")}` : undefined} />
          <ReviewRow label="Purpose" value={v.loanPurpose} />
          <ReviewRow label="Tenure" value={v.preferredTenureMonths ? `${v.preferredTenureMonths} months` : undefined} />
        </ReviewCard>

        <ReviewCard title="Existing Loans" step={4} onEdit={onEditStep}>
          <ReviewRow label="Active Loans" value={v.activeLoanCount} />
          <ReviewRow label="Existing Monthly Debt" value={v.existingMonthlyDebt ? `₹${Number(v.existingMonthlyDebt).toLocaleString("en-IN")}` : undefined} />
          <ReviewRow label="Previous Rejections" value={v.previousLoanRejections ? "Yes" : "No"} />
        </ReviewCard>

        <ReviewCard title="Additional Details" step={5} onEdit={onEditStep}>
          <ReviewRow label="Property Owner" value={v.isPropertyOwner ? "Yes" : "No"} />
          <ReviewRow label="Guarantor" value={v.hasGuarantor ? v.guarantorName || "Yes" : "No"} />
          <ReviewRow label="Preferred Contact Time" value={v.preferredContactTime} />
        </ReviewCard>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <p className="mb-4 text-sm font-semibold text-frost-50">{title}</p>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | number | boolean | null }) {
  if (value === undefined || value === null || value === "") return null;
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
  return (
    <div className="flex items-center justify-between gap-4 py-1.5 text-sm">
      <span className="text-frost-400">{label}</span>
      <span className="text-right font-medium text-frost-100">{display}</span>
    </div>
  );
}

export function PersonalInfoCard({ personal }: { personal: any }) {
  return (
    <Card title="Personal Information">
      <div className="divide-y divide-hairline/5">
        <Row label="Full Name" value={personal.fullName} />
        <Row label="Mobile" value={personal.mobileNumber} />
        <Row label="Email" value={personal.email} />
        <Row label="Date of Birth" value={personal.dateOfBirth} />
        <Row label="Gender" value={personal.gender} />
        <Row label="Marital Status" value={personal.maritalStatus} />
        <Row label="PAN" value={personal.panNumber} />
        <Row label="Aadhaar" value={personal.aadhaarNumber} />
      </div>
      <div className="mt-3 border-t border-hairline/5 pt-3">
        <p className="text-xs text-frost-400">Address</p>
        <p className="mt-1 text-sm text-frost-100">
          {personal.currentAddress}, {personal.city}, {personal.state} - {personal.pinCode}
        </p>
      </div>
    </Card>
  );
}

export function EmploymentCard({ employment }: { employment: any }) {
  const isBusiness = employment.employmentType === "Self Employed" || employment.employmentType === "Business Owner";
  return (
    <Card title="Employment & Income">
      <div className="divide-y divide-hairline/5">
        <Row label="Employment Type" value={employment.employmentType} />
        {isBusiness ? (
          <>
            <Row label="Business Name" value={employment.businessName} />
            <Row label="GST Number" value={employment.gstNumber} />
            <Row label="Annual Turnover" value={employment.annualTurnover ? `₹${Number(employment.annualTurnover).toLocaleString("en-IN")}` : undefined} />
            <Row label="Business Vintage" value={employment.businessVintageYears ? `${employment.businessVintageYears} years` : undefined} />
          </>
        ) : (
          <>
            <Row label="Company" value={employment.companyName} />
            <Row label="Job Title" value={employment.jobTitle} />
            <Row label="Employee ID" value={employment.employeeId} />
            <Row label="Joining Date" value={employment.joiningDate} />
          </>
        )}
        <Row label="Work Experience" value={`${employment.workExperienceYears} years`} />
        <Row label="Monthly Income" value={`₹${Number(employment.monthlySalary).toLocaleString("en-IN")}`} />
        <Row label="Annual Income" value={employment.annualIncome ? `₹${Number(employment.annualIncome).toLocaleString("en-IN")}` : undefined} />
        <Row label="Salary Bank" value={employment.salaryBank} />
        <Row label="Office/Business Address" value={employment.officeAddress} />
      </div>
    </Card>
  );
}

export function LoanDetailsCard({ loan }: { loan: any }) {
  return (
    <Card title="Loan Details">
      <div className="divide-y divide-hairline/5">
        <Row label="Amount Requested" value={`₹${Number(loan.requiredLoanAmount).toLocaleString("en-IN")}`} />
        <Row label="Purpose" value={loan.loanPurpose} />
        <Row label="Preferred Tenure" value={`${loan.preferredTenureMonths} months`} />
        <Row label="Expected Max Rate" value={loan.expectedInterestRateMax ? `${loan.expectedInterestRateMax}%` : undefined} />
      </div>
    </Card>
  );
}

export function ExistingLoansCard({ existingLoans }: { existingLoans: any }) {
  return (
    <Card title="Existing Loans, EMIs & Debt Ratio">
      <div className="divide-y divide-hairline/5">
        <Row label="Active Loans" value={existingLoans.activeLoanCount} />
        <Row label="Existing Monthly Debt" value={`₹${Number(existingLoans.existingMonthlyDebt || 0).toLocaleString("en-IN")}`} />
        <Row label="Monthly Household Expenses" value={`₹${Number(existingLoans.monthlyHouseholdExpenses || 0).toLocaleString("en-IN")}`} />
        <Row label="Personal Loan" value={existingLoans.hasPersonalLoan} />
        <Row label="Home Loan" value={existingLoans.hasHomeLoan} />
        <Row label="Car Loan" value={existingLoans.hasCarLoan} />
        <Row label="Gold Loan" value={existingLoans.hasGoldLoan} />
        <Row label="Credit Card EMI" value={existingLoans.hasCreditCardEmi} />
        <Row
          label="Credit Card Outstanding"
          value={existingLoans.creditCardOutstanding ? `₹${Number(existingLoans.creditCardOutstanding).toLocaleString("en-IN")}` : undefined}
        />
        <Row label="Previous Rejections" value={existingLoans.previousLoanRejections} />
      </div>

      {existingLoans.loanDetails?.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-hairline/5 pt-4">
          <p className="text-xs font-medium text-frost-400">Loan Breakdown</p>
          {existingLoans.loanDetails.map((loan: any, i: number) => (
            <div key={i} className="rounded-lg bg-ink-800/40 p-3 text-xs">
              <div className="flex justify-between text-frost-100">
                <span>{loan.bankName}</span>
                <span>{loan.loanType}</span>
              </div>
              <div className="mt-1 flex justify-between text-frost-400">
                <span>Outstanding: ₹{Number(loan.outstandingAmount).toLocaleString("en-IN")}</span>
                <span>EMI: ₹{Number(loan.emiAmount).toLocaleString("en-IN")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export function AdditionalDetailsCard({ additional }: { additional: any }) {
  return (
    <Card title="Additional Details">
      <div className="divide-y divide-hairline/5">
        <Row label="Property Owner" value={additional.isPropertyOwner} />
        <Row label="Vehicle Owner" value={additional.isVehicleOwner} />
        <Row label="Guarantor" value={additional.hasGuarantor} />
        <Row label="Guarantor Name" value={additional.guarantorName} />
        <Row label="Guarantor Relation" value={additional.guarantorRelation} />
        <Row label="Preferred Contact Time" value={additional.preferredContactTime} />
        <Row label="Remarks" value={additional.remarks} />
        <Row label="Consent Given" value={additional.consentGiven} />
      </div>
    </Card>
  );
}

export function DocumentsPlaceholderCard() {
  const docs = ["PAN Card", "Aadhaar Card", "Salary Slip", "Bank Statement", "Employee ID", "Passport Photo"];
  return (
    <Card title="Documents">
      <p className="mb-3 text-xs text-frost-400">
        Document upload/storage isn&apos;t wired up yet — this is a placeholder for when Cloudinary or another
        storage provider is integrated.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {docs.map((d) => (
          <div key={d} className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-hairline/20 p-3 text-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-frost-400">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] text-frost-400">{d}</span>
            <span className="text-[10px] text-frost-400/60">Not uploaded</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

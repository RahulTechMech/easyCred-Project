import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/ui/LegalPageLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclosures about EasyCred's role as a loan assistance platform, not a lender.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Disclaimer"
      lastUpdated="July 2026"
      sections={[
        {
          heading: "Not a Bank or NBFC",
          body: [
            "EasyCred is a loan assistance and lead-referral platform only. EasyCred is NOT a bank, NBFC, or lender, and does not sanction, disburse, or service loans directly. All lending is carried out solely by our partner banks and financial institutions.",
          ],
        },
        {
          heading: "Indicative Estimates Only",
          body: [
            "The EMI Calculator, Eligibility Calculator, and Loan Readiness Score on this website use assumed interest rates and simplified formulas for illustration purposes. Actual EMI, eligible amount, interest rate, and approval are determined solely by the partner lender after their own assessment, and may differ materially from any estimate shown here.",
          ],
        },
        {
          heading: "Loan Readiness Score Is Not a Credit Score",
          body: [
            "The 'Loan Readiness Score' is generated internally from information you self-report. It does NOT reflect, replace, or represent an official credit score or credit report from CIBIL, Experian, Equifax, CRIF, or any other credit information company. If an official bureau integration is added in the future, it will be clearly labeled and will require your explicit consent.",
          ],
        },
        {
          heading: "No Financial Advice",
          body: [
            "Content on this website, including blog articles, is for general informational purposes only and does not constitute financial, legal, or professional advice. Please consult a qualified financial advisor for guidance specific to your situation.",
          ],
        },
        {
          heading: "Third-Party Lenders",
          body: [
            "Loan approval, interest rates, fees, and terms are determined exclusively by our partner banks/NBFCs, based on their own internal policies and your individual profile. EasyCred is not responsible for the final terms offered or decisions made by these institutions.",
          ],
        },
      ]}
    />
  );
}

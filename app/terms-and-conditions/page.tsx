import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/ui/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of EasyCred's website and loan assistance services.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      lastUpdated="July 2026"
      intro="These Terms & Conditions govern your use of the EasyCred website and services. By using this website or submitting an application, you agree to these terms."
      sections={[
        {
          heading: "1. Nature of Our Service",
          body: [
            "EasyCred is a loan assistance and lead-referral platform. We are NOT a bank, NBFC, or lender. We do not disburse loans or make credit decisions. We connect you with partner banks and financial institutions who independently evaluate and decide on your loan application.",
          ],
        },
        {
          heading: "2. Eligibility",
          body: [
            "You must be at least 18 years old and legally capable of entering into a binding contract to use our services. Additional eligibility criteria (age, income, employment) are set independently by each partner lender.",
          ],
        },
        {
          heading: "3. Accuracy of Information",
          body: [
            "You agree to provide accurate, current, and complete information in your application. Providing false or misleading information may result in rejection of your application by partner lenders and may have legal consequences.",
          ],
        },
        {
          heading: "4. No Guarantee of Approval",
          body: [
            "Submitting an application through EasyCred does not guarantee loan approval, a specific interest rate, or specific terms. All lending decisions rest solely with our partner banks/NBFCs, based on their own credit policies.",
          ],
        },
        {
          heading: "5. Fees",
          body: [
            "EasyCred does not charge you a fee to use our comparison and application assistance service. Any fees (processing fees, foreclosure charges, etc.) are set and charged by the lending institution, and will be disclosed to you before you accept a loan offer.",
          ],
        },
        {
          heading: "6. Loan Readiness Score Disclaimer",
          body: [
            "Any 'Loan Readiness Score', EMI estimate, or eligibility estimate shown on this website is generated from the information you provide and general assumptions. It is indicative only, is not a formal credit assessment, and is not an official score from CIBIL, Experian, Equifax, or CRIF.",
          ],
        },
        {
          heading: "7. Intellectual Property",
          body: [
            "All content on this website, including text, graphics, logos, and software, is the property of EasyCred or its licensors and may not be reproduced without permission.",
          ],
        },
        {
          heading: "8. Limitation of Liability",
          body: [
            "EasyCred is not liable for any loss or damage arising from decisions made by partner lenders, delays in processing, or reliance on indicative estimates shown on this website.",
          ],
        },
        {
          heading: "9. Changes to These Terms",
          body: ["We may update these Terms & Conditions from time to time. Continued use of the website after changes constitutes acceptance of the revised terms."],
        },
        {
          heading: "10. Governing Law",
          body: ["These terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts in Bengaluru, Karnataka."],
        },
      ]}
    />
  );
}

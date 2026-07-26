import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/ui/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How EasyCred collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="July 2026"
      intro="This Privacy Policy explains how EasyCred ('we', 'us', 'our') collects, uses, shares, and protects information when you use our website and loan assistance services."
      sections={[
        {
          heading: "1. Information We Collect",
          body: [
            "We collect information you provide directly, including your name, contact details, date of birth, PAN/Aadhaar numbers, employment and income details, existing loan information, and any other details submitted through our loan application form or contact form.",
            "We also automatically collect limited technical information such as IP address, browser type, and pages visited, to help us improve the platform and prevent fraud.",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          body: [
            "We use your information to process your loan application, match you with relevant partner banks and financial institutions, contact you regarding your application, generate an indicative Loan Readiness Score, and improve our services.",
            "We do not use your financial information for any purpose beyond facilitating your loan assistance request without your consent.",
          ],
        },
        {
          heading: "3. How We Share Your Information",
          body: [
            "We share your application details with partner banks/NBFCs relevant to your loan request so they can assess and process your application.",
            "We do not sell your personal information to third parties. We may share limited data with service providers who help us operate the platform (e.g. cloud hosting, SMS/email delivery), under confidentiality obligations.",
          ],
        },
        {
          heading: "4. Data Security",
          body: [
            "We use industry-standard security measures, including encryption in transit, to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          heading: "5. Your Rights",
          body: [
            "You may request access to, correction of, or deletion of your personal information by contacting us at the details on our Contact page, subject to applicable law and any ongoing application requirements.",
          ],
        },
        {
          heading: "6. Cookies",
          body: [
            "We use cookies and similar technologies to remember your preferences (such as light/dark mode) and understand site usage. You can control cookies through your browser settings.",
          ],
        },
        {
          heading: "7. Changes to This Policy",
          body: [
            "We may update this Privacy Policy from time to time. Material changes will be reflected by updating the 'Last updated' date at the top of this page.",
          ],
        },
        {
          heading: "8. Contact Us",
          body: ["If you have questions about this Privacy Policy, please reach out via our Contact page."],
        },
      ]}
    />
  );
}

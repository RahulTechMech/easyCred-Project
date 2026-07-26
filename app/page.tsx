import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustSection } from "@/components/home/TrustSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { LoanBenefitsSection } from "@/components/home/LoanBenefitsSection";
import { PartnerBanksSection } from "@/components/home/PartnerBanksSection";
import { PersonalLoanFeaturesSection } from "@/components/home/PersonalLoanFeaturesSection";
import { EmiCalculatorSection, EligibilityCalculatorSection, LoanReadinessSection } from "@/components/home/CalculatorSections";
import { DocumentsSection } from "@/components/home/DocumentsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "EasyCred — Personal Loan Assistance with Fast Processing",
  description:
    "Compare offers from leading banks and financial institutions with expert guidance. Check your eligibility, estimate your EMI, and apply in minutes.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TrustSection />
      <WhyChooseSection />
      <LoanBenefitsSection />
      <PartnerBanksSection />
      <PersonalLoanFeaturesSection />
      <EmiCalculatorSection />
      <EligibilityCalculatorSection />
      <LoanReadinessSection />
      <DocumentsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <BlogPreviewSection />
      <ContactSection />
    </div>
  );
}

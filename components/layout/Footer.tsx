import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blogs", label: "Blog" },
      { href: "/contact", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/personal-loan", label: "Personal Loan" },
      { href: "/emi-calculator", label: "EMI Calculator" },
      { href: "/eligibility-calculator", label: "Eligibility Calculator" },
      { href: "/loan-readiness", label: "Loan Readiness Score" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/faqs", label: "FAQs" },
      { href: "/blogs", label: "Financial Guides" },
      { href: "/apply", label: "Apply Now" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Twitter / X", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline/10 bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-signal font-display text-sm font-bold text-white">
                EC
              </span>
              <span className="font-display text-lg font-bold text-frost-50">EasyCred</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-frost-400">
              EasyCred is a personal loan assistance platform. We are not a bank or NBFC — we help
              you compare and apply for loans offered by our partner banks and financial
              institutions.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline/10 text-frost-400 transition-colors hover:border-signal-400/40 hover:text-signal-300"
                >
                  <span className="text-xs font-semibold">{s.label[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-frost-50">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-frost-400 transition-colors hover:text-frost-100">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-hairline/10 pt-8">
          <p className="text-xs leading-relaxed text-frost-400/80">
            <strong className="text-frost-300">Disclaimer:</strong> EasyCred is a loan assistance
            and lead-referral platform only. EasyCred is NOT a bank, NBFC, or lender, and does not
            disburse loans directly. Loan approval, interest rates, and terms are solely at the
            discretion of our partner banks and financial institutions, subject to their own
            eligibility criteria and due diligence. Any &quot;Loan Readiness Score&quot; shown on this site
            is an internally generated estimate based on user-provided information — it is not an
            official credit score from CIBIL, Experian, Equifax, or CRIF.
          </p>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-frost-400/70">© {new Date().getFullYear()} EasyCred. All rights reserved.</p>
            <p className="text-xs text-frost-400/70">Made for demonstration purposes — placeholder branding.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

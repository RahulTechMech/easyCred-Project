import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SiteChrome } from "@/components/layout/SiteChrome";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", weight: ["400", "500", "600"] });

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.easycred.example";
const SITE_NAME = "EasyCred";
const SITE_DESCRIPTION =
  "EasyCred helps you compare and apply for personal loans from leading partner banks and financial institutions, with expert guidance at every step.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EasyCred — Personal Loan Assistance",
    template: "%s | EasyCred",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "personal loan",
    "loan assistance",
    "EMI calculator",
    "loan eligibility",
    "instant personal loan",
    "loan readiness score",
  ],
  authors: [{ name: "EasyCred" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "EasyCred — Personal Loan Assistance",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "EasyCred — Personal Loan Assistance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyCred — Personal Loan Assistance",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    sameAs: ["https://twitter.com", "https://linkedin.com", "https://instagram.com", "https://facebook.com"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className={`${sora.variable} ${inter.variable} ${jbmono.variable} font-body bg-ink-950 antialiased`}>
        <ThemeProvider>
          <LoadingScreen />
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}

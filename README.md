# EasyCred — Full Marketing Website + Loan Application Form

A complete premium fintech marketing site for EasyCred, built on top of the
original multi-step loan application flow. Dark-mode-default with a light
mode toggle, GSAP + Framer Motion animations throughout, and full SEO.

## 1. What's inside

**Pages:** Home, About, Personal Loan, EMI Calculator, Eligibility
Calculator, Loan Readiness Score, Blog (listing + detail), FAQs, Contact,
Apply (multi-step loan form), Privacy Policy, Terms & Conditions,
Disclaimer, custom 404.

**Layout & interaction:** sticky Navbar with active-link animation and
light/dark toggle, premium Footer, floating WhatsApp/Call/Back-to-top/Sticky
Apply buttons, scroll progress bar, initial loading screen, animated page
transitions, mouse parallax on the hero.

**Animation system:** `components/ui/Reveal.tsx` (fade up/down/left/right,
scale, blur) and `StaggerGroup` power most scroll-in animations via Framer
Motion. GSAP is used specifically for the partner-bank logo marquee
(`PartnerLogoMarquee.tsx`) and the scroll-linked "How It Works" timeline
(`HowItWorksTimeline.tsx`) — the two places a dedicated animation library
does a better job than Framer's simpler APIs.

**Calculators:** `lib/calculators/emi.ts`, `eligibility.ts`,
`loanReadiness.ts` hold the pure calculation logic, each with a matching
interactive widget in `components/calculators/`, reused on both the
homepage sections and their dedicated pages.

**Theming:** `app/globals.css` defines every color as a CSS variable, with
a `.light` override block. `tailwind.config.ts` points every color token
(`ink-*`, `frost-*`, `signal-*`, etc.) at those variables, so both the new
marketing components and the original loan-form components re-skin
automatically when `ThemeToggle` flips the theme — no per-component light
mode styling was needed.

**Services:** `lib/services/otp/` and `lib/services/email/` define
provider-agnostic interfaces with mock implementations wired into the app
today. Swap `MockOtpService` / `MockEmailService` for real MSG91/Twilio
Verify/Nodemailer implementations later — see the commented examples in
each file — without touching any calling code.

**SEO:** per-page `metadata` exports (title, description, canonical,
OpenGraph), `app/robots.ts`, `app/sitemap.ts` (covers all static pages +
every blog post), and JSON-LD (`Organization`/`WebSite` sitewide,
`FAQPage` on `/faqs`, `BlogPosting` on each blog post).

## 2. Prerequisites

- Node.js 18.18+
- A MongoDB database — the free **MongoDB Atlas** tier works fine to start

## 3. Set up MongoDB Atlas (free tier)

1. Go to <https://www.mongodb.com/cloud/atlas/register> and create a free account.
2. Create a new project, then click **"Build a Database"** → choose the free **M0** tier
   (any cloud provider/region is fine).
3. **Database Access** (left sidebar) → **Add New Database User** → create a username
   and password (save these — you'll need them in the connection string).
4. **Network Access** (left sidebar) → **Add IP Address**:
   - For local development, choose **"Allow Access from Anywhere"** (`0.0.0.0/0`).
   - Once you deploy to production, restrict this to your server's actual IP.
5. Once the cluster finishes provisioning, click **Connect** → **Drivers** →
   copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   ```
6. Add a database name to the path, e.g. `.../easycred?retryWrites=true...` —
   MongoDB creates the database automatically on first write.

## 4. Configure environment variables

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

- `MONGODB_URI` — paste your Atlas connection string from step 3.
- `ADMIN_API_KEY` — any long random string (protects the Excel download endpoint):
  ```bash
  node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
  ```
- `NEXT_PUBLIC_APP_URL` — set to your real domain before deploying (used by
  metadata, sitemap, and robots.txt); defaults to a placeholder otherwise.
- `EXCEL_EXPORT_DIR` / `EXCEL_EXPORT_FILENAME` — leave as-is unless you want
  the leads spreadsheet stored somewhere else.
- SMTP / SMS variables are optional — see section 6 below.

## 5. Install and run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

**Note on this delivery:** this sandbox has no network access, so I
couldn't run a live `npm install` or `next build` here. Every import was
verified to resolve to a real export via a static analysis pass (no broken
imports, no missing default exports, no client-hook components missing
`"use client"`, no bracket/paren imbalances), but please run
`npm run build` on your end as the final check before deploying, and let
me know if anything surfaces — happy to fix immediately.

## 6. Notes on what's stubbed vs. production-ready

**Production-ready as-is:**
- Full page set, navigation, animations, calculators, theming
- Zod validation (client + re-validated server-side) on both the loan
  application and contact forms
- MongoDB schemas for `LoanApplication` and `ContactMessage`
- Excel auto-append logic for leads
- Rate limiting + honeypot spam protection on both submission endpoints
- SEO: metadata, sitemap, robots.txt, JSON-LD

**Stubbed / needs your input before going live:**
- **OTP verification** — `lib/services/otp/mockOtpService.ts` accepts any
  6-digit code. Implement `Msg91OtpService` / `TwilioVerifyOtpService`
  against the same `OtpService` interface when you have credentials.
- **Email notifications** — `lib/services/email/mockEmailService.ts` logs
  instead of sending. Implement `NodemailerEmailService` against the same
  `EmailService` interface once `SMTP_*` env vars are set.
- **CAPTCHA** — honeypot fields stop basic bots; add Cloudflare Turnstile
  or reCAPTCHA for stronger protection before launch.
- **Placeholder content** — WhatsApp/call numbers (`FloatingButtons.tsx`),
  partner bank names (`PartnerLogoMarquee.tsx` — swap for real logos),
  office address/map (`ContactSection.tsx`, `/contact`), social links
  (`Footer.tsx`), and `/public/og-image.png` (referenced in metadata but
  not included — add a real 1200×630 image) are all clearly marked
  placeholders ready to swap in.
- **Admin auth** — the Excel export route uses a simple shared API key;
  swap for real JWT-based admin login if you build an admin dashboard.
- **Excel write concurrency** — fine for a single server instance at normal
  volume; move to a queue/single-writer if you scale to multiple instances.

## 7. What I need from you to go further

- Real branding (logo file, exact brand colors) to replace the "EC"
  placeholder mark and current blue/navy palette.
- WhatsApp number, phone number, office address, and social links to
  replace the placeholders.
- SMS OTP / SMTP credentials whenever you're ready to wire those in.
- Should I build an admin dashboard next (view/manage leads, update status,
  reply to contact messages), or focus elsewhere?


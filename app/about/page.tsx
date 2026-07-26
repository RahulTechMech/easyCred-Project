import type { Metadata } from "next";
import { Section, SectionIntro, Eyebrow } from "@/components/ui/Section";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about EasyCred's mission to make personal loan assistance transparent, fast, and human.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { title: "Transparency First", desc: "No hidden fees, no confusing jargon — every step of your application is explained clearly." },
  { title: "Human Guidance", desc: "Real loan advisors, not just algorithms, walk you through your options." },
  { title: "Your Data, Protected", desc: "We use bank-grade encryption and never sell your information to third parties." },
  { title: "Speed With Care", desc: "We move fast without cutting corners on accuracy or compliance." },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Applications Assisted" },
  { value: 25, suffix: "+", label: "Partner Banks & NBFCs" },
  { value: 18, suffix: "", label: "Cities Served" },
  { value: 4, suffix: ".8/5", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>About EasyCred</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl md:text-5xl">
              Making loan assistance transparent, fast, and human
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-frost-400 sm:text-base">
              EasyCred exists to remove the confusion and back-and-forth from applying for a personal loan —
              by connecting you with the right partner bank or NBFC, guided by a real advisor.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <h2 className="font-display text-2xl font-bold text-frost-50 sm:text-3xl">Our Story</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-frost-400 sm:text-base">
              <p>
                EasyCred was founded on a simple observation: getting a personal loan shouldn&apos;t require
                visiting multiple bank branches, filling the same form five times, or waiting days just to hear
                whether you qualify.
              </p>
              <p>
                We built a single platform where you share your details once, and our team works with a
                network of partner banks and financial institutions to find offers that fit your profile —
                with a dedicated advisor guiding you at every step.
              </p>
              <p>
                Important: EasyCred is not a bank or NBFC. We are a loan assistance platform. Final approval,
                interest rates, and terms are always determined by our partner lenders.
              </p>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="glass-panel grid grid-cols-2 gap-4 rounded-xl2 p-6 shadow-card sm:p-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-ink-800/40 p-4 text-center">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} className="font-mono text-2xl font-bold text-frost-50" />
                  <p className="mt-1 text-xs text-frost-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-ink-900/30">
        <SectionIntro eyebrow="What We Stand For" title="Our values" />
        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-6">
              <p className="font-display text-base font-semibold text-frost-50">{v.title}</p>
              <p className="mt-2 text-sm text-frost-400">{v.desc}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>
    </div>
  );
}

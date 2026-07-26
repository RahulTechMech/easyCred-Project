"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "../ui/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { title: "Fill Application", desc: "Share your details in our simple 6-step form — takes about 5 minutes." },
  { title: "EasyCred Reviews Details", desc: "Our team checks your application for completeness and fit." },
  { title: "Expert Calls You", desc: "A loan advisor calls to understand your requirement and answer questions." },
  { title: "Document Verification", desc: "Upload PAN, Aadhaar, salary slips and bank statements securely." },
  { title: "Bank Processing", desc: "Your application is forwarded to matching partner banks/NBFCs." },
  { title: "Loan Approval", desc: "Approval and disbursal, subject to the lender's final decision." },
];

export function HowItWorksTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-2xl">
      <div className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-hairline/10 sm:left-[19px]" aria-hidden />
      <div ref={lineRef} className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-grad-signal sm:left-[19px]" aria-hidden />

      <ol className="space-y-10">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} direction={i % 2 === 0 ? "right" : "left"} delay={i * 0.03}>
            <li className="relative flex gap-5 pl-0">
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-signal-400/40 bg-ink-900 font-mono text-xs font-semibold text-signal-300 sm:h-10 sm:w-10">
                {i + 1}
              </span>
              <div className="pt-0.5 sm:pt-1.5">
                <p className="font-display text-base font-semibold text-frost-50 sm:text-lg">{step.title}</p>
                <p className="mt-1 text-sm text-frost-400">{step.desc}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

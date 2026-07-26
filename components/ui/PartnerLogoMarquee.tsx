"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Placeholder partner names — swap for real logo images (SVG/PNG) in
 * /public/logos and render <img> tags instead of text badges once EasyCred
 * has signed lending partners. The marquee logic itself needs no changes.
 */
const PLACEHOLDER_PARTNERS = [
  "Northbridge Finance",
  "Suraksha Bank",
  "Vertex NBFC",
  "Ashoka Capital",
  "Meridian Trust",
  "Zenith Credit",
  "Harbor Finserv",
  "Crestline Bank",
];

export function PartnerLogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Animate the track exactly -50% (the list is duplicated below so this
    // creates a seamless infinite loop) using GSAP for frame-accurate timing.
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 24,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const doubled = [...PLACEHOLDER_PARTNERS, ...PLACEHOLDER_PARTNERS];

  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div ref={trackRef} className="flex w-max items-center gap-10">
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex h-14 min-w-[180px] items-center justify-center rounded-xl border border-hairline/10 bg-ink-800/40 px-6 text-sm font-medium text-frost-400"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

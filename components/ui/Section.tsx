import clsx from "clsx";
import { Reveal } from "./Reveal";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("mx-auto w-full max-w-6xl px-4 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-signal-400/30 bg-signal-500/10 px-3 py-1 text-xs font-medium text-signal-300">
      {children}
    </span>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal direction="up" className={clsx("mb-12", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-4 font-display text-2xl font-bold text-frost-50 sm:text-3xl md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-sm text-frost-400 sm:text-base">{subtitle}</p>}
      </div>
    </Reveal>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("py-16 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

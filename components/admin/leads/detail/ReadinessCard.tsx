import { GaugeMeter } from "@/components/ui/GaugeMeter";

function bandFor(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Work";
}

export function ReadinessCard({ score }: { score?: number }) {
  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <p className="mb-2 text-sm font-semibold text-frost-50">Loan Readiness Score</p>
      <p className="mb-4 text-xs text-frost-400">
        Estimate computed from the applicant&apos;s submitted data — not an official bureau score.
      </p>
      {typeof score === "number" ? (
        <GaugeMeter score={score} label={bandFor(score)} />
      ) : (
        <p className="py-8 text-center text-sm text-frost-400">Not available for this lead.</p>
      )}
    </div>
  );
}

import clsx from "clsx";
import { STATUS_STYLES, type LeadStatus } from "@/lib/crm/constants";

export function StatusBadge({ status, className }: { status: LeadStatus | string; className?: string }) {
  const style = STATUS_STYLES[status as LeadStatus] || STATUS_STYLES.New;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        style.badge,
        className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", style.dot)} />
      {status}
    </span>
  );
}

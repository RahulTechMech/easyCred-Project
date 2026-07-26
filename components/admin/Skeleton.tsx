import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("animate-pulse rounded-lg bg-ink-800/60", className)} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-3 h-7 w-16" />
    </div>
  );
}

export function SkeletonTableRow({ columns = 6 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="mt-4 h-52 w-full" />
    </div>
  );
}

import { churnByTenure } from "@/data/telecom";

// churn pe intervale de vechime
export function MiniChurn({ tall = false, className = "" }: { tall?: boolean; className?: string }) {
  const max = Math.max(...churnByTenure.map((d) => d.churn));
  return (
    <div className={`flex w-full items-end gap-2 ${tall ? "min-h-40 flex-1" : "h-24"} ${className}`} role="img" aria-label="Monthly churn rate by tenure band: highest in the first two months and after 24 months">
      {churnByTenure.map((d) => (
        <div key={d.band} className="flex h-full flex-1 flex-col justify-end gap-1.5">
          <span className="text-center text-[11px] text-muted tabular-nums">{d.churn.toFixed(2)}%</span>
          <div className={`w-full rounded-t-md ${d.churn > 1.5 ? "bg-orange" : "bg-ink/80"}`} style={{ height: `${(d.churn / max) * 70}%` }} />
          <span className="truncate text-center text-[11px] text-muted">{d.band}</span>
        </div>
      ))}
    </div>
  );
}

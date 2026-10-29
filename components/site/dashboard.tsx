import { monthly, clvBySegment } from "@/data/telecom";
import { MiniChurn } from "./mini-churn";

const fmt = (n: number) => n.toLocaleString("en-US");

// venit + ARPU pe 36 luni
function RevenueArpuChart() {
  const W = 600, H = 190, pad = 6;
  const maxRev = Math.max(...monthly.map((d) => d.revenue));
  const [aMin, aMax] = [20, 28];
  const bw = (W - pad * 2) / monthly.length;
  const y = (v: number) => H - (v / maxRev) * (H - 20);
  const ya = (v: number) => H - ((v - aMin) / (aMax - aMin)) * (H - 20);
  const line = monthly.map((d, i) => `${pad + i * bw + bw / 2},${ya(d.arpu)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} className="h-full w-full" role="img" aria-label="Monthly revenue grew from 960 RON to 106,027 RON while ARPU rose from about 23 to 26.9 RON">
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1={0} x2={W} y1={H - t * (H - 20)} y2={H - t * (H - 20)} stroke="#e7e5e4" />
      ))}
      {monthly.map((d, i) => (
        <rect key={d.m} x={pad + i * bw + 1.5} y={y(d.revenue)} width={bw - 3} height={H - y(d.revenue)} rx={1.5} fill="#0b0b0c" fillOpacity={0.85} />
      ))}
      <polyline points={line} fill="none" stroke="#ff7900" strokeWidth={2.5} strokeLinejoin="round" />
      {["2023-01", "2024-01", "2025-01", "2025-12"].map((m) => {
        const i = monthly.findIndex((d) => d.m === m);
        return <text key={m} x={pad + i * bw + bw / 2} y={H + 14} fill="#6b6b6b" fontSize={10} textAnchor="middle">{m}</text>;
      })}
    </svg>
  );
}

// raport in stil Power BI cu datele din V_MONTHLY_KPI
export function Dashboard() {
  const last = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const delta = (a: number, b: number) => ((a - b) / b) * 100;
  const tiles = [
    { name: "Revenue", value: `${fmt(last.revenue)} RON`, d: delta(last.revenue, prev.revenue) },
    { name: "Active customers", value: fmt(last.active), d: delta(last.active, prev.active) },
    { name: "ARPU", value: `${last.arpu.toFixed(2)} RON`, d: delta(last.arpu, prev.arpu) },
    { name: "Churn rate", value: `${last.churn.toFixed(2)}%`, d: delta(last.churn, prev.churn), inverse: true },
  ];
  const maxClv = Math.max(...clvBySegment.map((s) => s.clv));
  const card = "rounded-lg border border-line bg-white";

  return (
    <div className="flex h-full flex-col gap-3 bg-panel p-3 text-left md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-ink md:text-base">Telecom KPI overview</div>
          <div className="text-[11px] text-muted">Jan 2023 to Dec 2025 · Dec vs Nov</div>
        </div>
        <div className="hidden gap-1.5 sm:flex">
          {["Period: 36 months", "Segment: All", "Region: All"].map((s) => (
            <span key={s} className="rounded-md border border-line bg-white px-2 py-1 text-[11px] text-muted">{s}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {tiles.map((t) => {
          const good = t.inverse ? t.d < 0 : t.d > 0;
          return (
            <div key={t.name} className={`${card} p-2.5 md:p-3`}>
              <div className="text-[11px] text-muted">{t.name}</div>
              <div className="mt-0.5 text-base font-medium text-ink tabular-nums md:text-2xl">{t.value}</div>
              <div className={`text-[11px] ${good ? "text-emerald-600" : "text-red-600"}`}>
                {t.d > 0 ? "▲" : "▼"} {Math.abs(t.d).toFixed(1)}% vs last month
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid min-h-0 flex-1 gap-2 md:grid-cols-3 md:gap-3">
        <div className={`${card} flex min-h-0 flex-col p-3 md:col-span-2`}>
          <div className="text-[12px] text-ink">Revenue by month <span className="text-muted">(bars)</span> · ARPU <span className="text-orange">(line)</span></div>
          <div className="min-h-0 flex-1 pt-2"><RevenueArpuChart /></div>
        </div>
        <div className={`${card} hidden min-h-0 flex-col p-3 md:flex`}>
          <div className="text-[12px] text-ink">Churn by tenure</div>
          <div className="flex min-h-0 flex-1 pt-2"><MiniChurn tall /></div>
        </div>
      </div>

      <div className={`${card} hidden p-3 md:block`}>
        <div className="mb-2 text-[12px] text-ink">Average customer lifetime value by segment</div>
        <div className="grid grid-cols-5 gap-3">
          {clvBySegment.map((s) => (
            <div key={s.segment}>
              <div className="flex justify-between text-[11px] text-muted"><span>{s.segment}</span><span className="text-ink tabular-nums">{fmt(s.clv)}</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-panel">
                <div className="h-full rounded-full bg-ink" style={{ width: `${(s.clv / maxClv) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

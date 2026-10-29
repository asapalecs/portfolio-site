"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { SectionHead, Serif } from "./ui-bits";

// fragmente de cod din proiectul telecom
function Code({ file, children }: { file: string; children: string }) {
  return (
    <div className="flex h-full flex-col bg-ink">
      <div className="flex items-center gap-2 border-b border-white/10 bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[11px] text-neutral-500">{file}</span>
      </div>
      <pre className="flex-1 overflow-hidden bg-ink p-4 font-mono text-[12px] leading-relaxed text-neutral-300 whitespace-pre">{children}</pre>
    </div>
  );
}

const content = [
  {
    title: "01 · Source",
    description: "Raw files stay untouched. The test data matches the real Romanian market.",
    content: (
      <Code file="data/raw/complaints.csv">{`complaint_id,customer_id,complaint_date,category,resolution_days,resolved,satisfaction_score
1,1,2025-07-02,Billing Dispute,4,1,4
2,1,2025-08-16,Network Coverage,1,1,5
3,4,2024-07-12,Device Issue,3,1,5
…`}</Code>
    ),
  },
  {
    title: "02 · ETL",
    description: "Every run checks that no rows were lost or added.",
    content: (
      <Code file="etl/transform.py">{`# Row-count reconciliation. The transform must
# neither lose nor invent rows; anything else
# means a join is misbehaving.
if len(f) != rows_in:
    raise ValueError(
        f"Row count changed during dimension "
        f"resolution: {rows_in} in, {len(f)} out. "
        "A join is dropping or duplicating rows."
    )`}</Code>
    ),
  },
  {
    title: "03 · Model",
    description: "A star schema with full customer history.",
    content: (
      <Code file="sql/create_tables.sql">{`CREATE TABLE dbo.DIM_CUSTOMER (
    customer_key   INT          NOT NULL, -- surrogate, one per version
    customer_id    INT          NOT NULL, -- natural key, shared
    segment        VARCHAR(30)  NOT NULL, -- SCD-tracked
    county         VARCHAR(50)  NOT NULL, -- SCD-tracked
    region         VARCHAR(50)  NOT NULL, -- SCD-tracked
    acquisition_channel VARCHAR(50) NOT NULL,
    -- SCD Type 2 control columns
    valid_from     DATE         NOT NULL,
    …`}</Code>
    ),
  },
  {
    title: "04 · KPI layer",
    description: "Each KPI is defined once, so reports always agree.",
    content: (
      <Code file="powerbi/measures.dax">{`ARPU =
DIVIDE ( [Total Revenue], [Active Customers] )

ARPU MoM % =
DIVIDE ( [ARPU] - [ARPU PM], [ARPU PM] )

Churn Rate =
DIVIDE ( [Churned Customers], [Subscriber Months] )

// Annualised by compounding, not × 12:
// 1.2% monthly is 13.5% a year, not 14.4%.`}</Code>
    ),
  },
  {
    title: "05 · Insight",
    description: "Early churn and end-of-contract churn need different fixes.",
    content: (
      <Code file="sql/views.sql → V_CHURN_ANALYSIS">{`tenure      subscriber_months   churn
0–2 mo                  2,345   2.17 %   ◀ onboarding
3–5 mo                  2,192   1.28 %
6–11 mo                 3,990   0.98 %
12–23 mo                5,486   0.82 %   ◀ lock-in
24+ mo                  1,455   1.72 %   ◀ expiry`}</Code>
    ),
  },
];

export function Approach() {
  return (
    <section id="approach" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHead n="03" label="Process" title={<>From raw files to a decision, <Serif>in five steps.</Serif></>} />
      <div className="mt-10">
        <StickyScroll content={content} />
      </div>
    </section>
  );
}

"use client";
import { Tabs } from "@/components/ui/tabs";
import { SectionHead, Serif } from "./ui-bits";

const groups = [
  { name: "Modelling", items: ["Star schema", "Surrogate keys", "SCD Type 1 & 2", "3NF design", "Partitioning", "Columnstore & bitmap indexes"] },
  { name: "Databases", items: ["SQL Server / T-SQL", "Oracle / PL/SQL", "PostgreSQL", "Materialized views", "Auditing", "Column encryption"] },
  { name: "ETL", items: ["Python", "pandas / NumPy", "SQLAlchemy / pyodbc", "PySpark", "Data quality checks", "Docker"] },
  { name: "Reporting", items: ["Power BI", "DAX", "ARPU, churn, CLV", "Semi-additive measures", "Spark MLlib", "Model evaluation"] },
];

export function Skills() {
  const tabs = groups.map((g) => ({
    title: g.name,
    value: g.name,
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-line bg-panel p-6 md:p-10">
        <h3 className="text-3xl font-medium tracking-tight text-ink md:text-5xl">{g.name}</h3>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {g.items.map((i) => (
            <li key={i} className="rounded-xl border border-line bg-white px-4 py-3.5 text-ink">{i}</li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHead n="04" label="Skills" title={<>The tools I <Serif>use every day.</Serif></>} />
      <div className="relative mt-12 flex h-[34rem] w-full flex-col items-start [perspective:1000px] md:h-[24rem]">
        <Tabs tabs={tabs} containerClassName="flex-wrap gap-1" />
      </div>
    </section>
  );
}

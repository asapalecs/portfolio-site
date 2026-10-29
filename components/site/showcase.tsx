"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Dashboard } from "./dashboard";

export function Showcase() {
  return (
    <section className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <p className="text-sm text-muted">Featured project · Telecom BI Data Warehouse</p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-ink md:text-6xl">
              Three years of a mobile operator,
              <br />
              <span className="font-serif font-normal italic tracking-normal">on one page.</span>
            </h2>
            <p className="mx-auto mt-5 mb-14 max-w-md text-muted">Every number here comes straight from the warehouse.</p>
          </div>
        }
      >
        <Dashboard />
      </ContainerScroll>
    </section>
  );
}

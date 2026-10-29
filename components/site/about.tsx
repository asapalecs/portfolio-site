"use client";
import { Briefcase, GraduationCap } from "lucide-react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Timeline } from "@/components/ui/timeline";
import { SectionHead, Serif } from "./ui-bits";
import { site } from "@/data/site";
import { Reveal } from "./motion-ux";
import { timeline } from "@/data/about";
import { biProjects, engineeringProjects } from "@/data/projects";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHead n="01" label="About" title={<>Hi, I&apos;m {site.name}. An engineer who <Serif>moved into data.</Serif></>} />

      <Reveal className="mt-14"><div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <WobbleCard containerClassName="lg:col-span-2 min-h-[16rem] bg-ink" className="text-white">
          <p className="text-sm text-white/60">What I do</p>
          <p className="mt-4 max-w-lg text-2xl leading-snug font-medium md:text-3xl">
            I design the warehouse, write the pipeline and build the report. Then I check the numbers against reality.
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[16rem] bg-orange" className="text-ink">
          <p className="text-sm text-ink/70">Studying</p>
          <p className="mt-4 text-2xl leading-tight font-medium">MSc, Databases and Software Technologies</p>
          <p className="mt-3 text-ink/75">University of Bucharest</p>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[13rem] bg-panel border border-line">
          <p className="text-sm text-muted">Portfolio</p>
          <div className="mt-4 flex items-baseline gap-8">
            <div><div className="text-6xl font-medium tracking-tight text-ink">{biProjects.length}</div><div className="mt-1 text-sm text-muted">BI projects</div></div>
            <div><div className="text-6xl font-medium tracking-tight text-ink">{engineeringProjects.length}</div><div className="mt-1 text-sm text-muted">engineering</div></div>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="lg:col-span-2 min-h-[13rem] bg-panel border border-line">
          <p className="text-sm text-muted">Background</p>
          <p className="mt-4 max-w-xl text-2xl leading-snug font-medium text-ink">
            I trained as a mechanical engineer and worked in manufacturing. That taught me to measure first and decide second.
          </p>
        </WobbleCard>
      </div></Reveal>

      {/* experienta si studii */}
      <div className="mt-28">
        <h3 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
          Experience and <Serif>education</Serif>
        </h3>
        <Timeline
          data={timeline.map((t) => ({
            title: t.year,
            content: (
              <div className="grid gap-3">
                {t.entries.map((e) => {
                  const Icon = e.kind === "Experience" ? Briefcase : GraduationCap;
                  return (
                    <div key={e.title} className="rounded-2xl border border-line bg-white p-6 transition hover:border-ink/25">
                      <div className="flex items-center justify-between gap-4 text-sm text-muted">
                        <span className="inline-flex items-center gap-2"><Icon className="h-4 w-4" />{e.kind}</span>
                        <span className="tabular-nums">{e.period}</span>
                      </div>
                      <p className="mt-4 text-xl font-medium tracking-tight text-ink md:text-2xl">{e.title}</p>
                      <p className="mt-1 text-muted">{e.org}{e.place ? ` · ${e.place}` : ""}</p>
                      {e.note && <p className="mt-3 text-sm text-ink">{e.note}</p>}
                    </div>
                  );
                })}
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
}

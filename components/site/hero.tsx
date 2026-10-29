import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { site } from "@/data/site";
import { Magnetic, Reveal } from "./motion-ux";
import { projects } from "@/data/projects";

export function Hero() {
  const flagship = projects.find((p) => p.featured)!;

  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48">
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <BackgroundBeams className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-sm text-muted backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to BI roles
        </p>

        <h1 className="max-w-5xl text-5xl leading-[1.02] font-medium tracking-[-0.035em] text-ink sm:text-7xl md:text-[5.5rem]">
          I build{" "}
          <FlipWords
            words={["data warehouses", "ETL pipelines", "Power BI reports", "KPI models"]}
            duration={2800}
            className="font-serif font-normal italic tracking-normal"
          />
          <br />
          for teams that run on data.
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <TextGenerateEffect words={site.intro} className="max-w-md text-lg leading-relaxed text-muted" />
          <div className="flex flex-wrap items-center gap-5">
            <Magnetic><MovingBorderButton as="a" href="#projects" borderRadius="9999px" duration={3500} containerClassName="block h-12 w-44" className="gap-2 text-sm font-medium">
              See my work <ArrowDownRight className="h-4 w-4" />
            </MovingBorderButton></Magnetic>
            <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-ink underline-offset-4 hover:underline">
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* KPI din proiectul telecom */}
        <Reveal delay={0.2} className="mt-24 border-t border-line pt-6">
          <p className="mb-5 text-sm text-muted">Numbers from my telecom warehouse</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {flagship.stats!.map((s) => (
              <div key={s.label} className="relative rounded-2xl border border-line p-1.5">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <div className="relative h-full rounded-xl bg-white p-4 sm:p-5">
                  <div className="text-2xl font-medium tracking-tight text-ink tabular-nums sm:text-4xl">{s.value}</div>
                  <div className="mt-1 text-sm text-muted">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

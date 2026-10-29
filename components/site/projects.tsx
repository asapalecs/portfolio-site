import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { biProjects, engineeringProjects, type Project } from "@/data/projects";
import { MiniChurn } from "./mini-churn";
import { Reveal } from "./motion-ux";
import { SectionHead, Serif, Tag } from "./ui-bits";

// proiectul principal are grafic, restul doar cifre
function Header({ p }: { p: Project }) {
  if (p.featured) {
    return (
      <div className="flex flex-1 flex-col justify-between gap-4 rounded-xl bg-panel p-5">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>Churn by tenure</span>
          <span className="text-orange">U-shape</span>
        </div>
        <MiniChurn tall />
      </div>
    );
  }
  return (
    <div className="flex min-h-28 flex-1 items-end rounded-xl bg-panel p-5">
      {p.stats ? (
        <div className="flex gap-8">
          {p.stats.slice(0, 3).map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-medium tracking-tight text-ink tabular-nums">{s.value}</div>
              <div className="text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">{p.domain}</p>
      )}
    </div>
  );
}

function Card({ p, index, className }: { p: Project; index: number; className?: string }) {
  return (
    <Link href={`/projects/${p.slug}/`} className={`group relative block rounded-2xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${className ?? ""}`}>
      <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <BentoGridItem
        className="relative h-full"
        header={<Header p={p} />}
        icon={
          <div className="flex items-center justify-between text-sm text-muted">
            <span className="tabular-nums">{String(index + 1).padStart(2, "0")} · {p.domain}</span>
            <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </div>
        }
        title={p.title}
        description={
          <div className="space-y-4">
            <p>{p.tagline}</p>
            <div className="flex flex-wrap gap-1.5">{p.stack.slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </div>
        }
      />
    </Link>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHead n="02" label="Selected work" title={<>Business intelligence, <Serif>end to end.</Serif></>} />

      <Reveal><BentoGrid className="mt-14 max-w-none gap-3 md:grid-cols-3">
        {biProjects.map((p, i) => (
          <Card key={p.slug} p={p} index={i} className={p.featured ? "md:col-span-2 md:row-span-2" : i === biProjects.length - 1 ? "md:col-span-2" : ""} />
        ))}
      </BentoGrid></Reveal>

      <p className="mt-24 text-sm text-muted">Also built</p>
      <h3 className="mt-2 text-3xl font-medium tracking-tight text-ink">Software engineering</h3>
      <HoverEffect
        className="mt-4 -mx-2 py-0 md:grid-cols-2 lg:grid-cols-2"
        items={engineeringProjects.map((p, i) => ({
          title: p.title,
          description: p.tagline,
          link: `/projects/${p.slug}/`,
          eyebrow: `${String(biProjects.length + i + 1).padStart(2, "0")} · ${p.domain}`,
          tags: p.stack.slice(0, 3),
        }))}
      />
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github, Lock } from "lucide-react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Meteors } from "@/components/ui/meteors";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { MiniChurn } from "@/components/site/mini-churn";
import { Tag } from "@/components/site/ui-bits";
import { getProject, projects, repoUrl } from "@/data/projects";
import { clvBySegment, kpis } from "@/data/telecom";

// o pagina statica pt fiecare proiect
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// pastreaza doar primele propozitii
const first = (t: string, n = 1) => {
  const parts = t.match(/[^.!?]+[.!?]+(\s|$)/g);
  return parts ? parts.slice(0, n).join("").trim() : t;
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.title} | Alex`, description: p.tagline } : {};
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20">
      <p className="text-sm text-muted tabular-nums">({n})</p>
      <h2 className="mt-2 mb-7 text-3xl font-medium tracking-tight text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const isTelecom = p.slug === "telecom-bi-datawarehouse";
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <Nav />
      <main className="px-4 pt-36 pb-12 sm:px-6">
        <TracingBeam className="px-2 md:px-6">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
          <p className="mt-10 text-sm text-muted tabular-nums">{String(idx + 1).padStart(2, "0")} · {p.domain}</p>
          <h1 className="mt-3 text-5xl leading-[1.02] font-medium tracking-[-0.035em] text-ink md:text-7xl">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{p.tagline}</p>

          <div className="mt-10">
            {p.published ? (
              <MovingBorderButton as="a" href={repoUrl(p)} target="_blank" rel="noreferrer" borderRadius="9999px" duration={3500} containerClassName="block h-12 w-48" className="gap-2 text-sm font-medium">
                <Github className="h-4 w-4" /> View on GitHub
              </MovingBorderButton>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted">
                <Lock className="h-4 w-4" /> Code available on request
              </span>
            )}
          </div>

          {p.stats && (
            <div className="relative mt-14 overflow-hidden rounded-3xl bg-ink p-8">
              <div className="relative z-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-medium tracking-tight text-white tabular-nums">{s.value}</div>
                    <div className="mt-1 text-sm text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
              <Meteors number={16} />
            </div>
          )}

          <div className="mt-24" />

          <Section n={num()} title="The problem">
            <p className="text-xl leading-relaxed text-ink">{first(p.problem, 2)}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {p.questions.map((q) => (
                <li key={q} className="rounded-2xl border border-line bg-panel px-5 py-4 text-ink">{q}</li>
              ))}
            </ul>
          </Section>

          <Section n={num()} title="How it works">
            <ol className="grid gap-3">
              {p.pipeline.map((s, i) => (
                <li key={s.step} className="flex items-start gap-5 rounded-2xl border border-line bg-white p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm text-white tabular-nums">{i + 1}</span>
                  <div>
                    <div className="font-medium text-ink">{s.step}</div>
                    <div className="mt-0.5 text-sm text-muted">{s.detail}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {isTelecom && (
            <>
              <Section n={num()} title="KPIs">
                <div className="grid gap-3 sm:grid-cols-3">
                  {kpis.map((k) => (
                    <div key={k.name} className="rounded-2xl border border-line bg-panel p-5">
                      <div className="font-medium text-ink">{k.name}</div>
                      <div className="mt-1 text-sm text-muted">{k.formula}</div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section n={num()} title="Churn by tenure">
                <div className="rounded-3xl border border-line bg-panel p-6">
                  <MiniChurn tall className="h-56" />
                </div>
                <p className="mt-4 text-muted">New customers leave because of onboarding. Long-time customers leave when their contract ends.</p>
                <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-panel text-muted">
                      <tr><th className="px-4 py-3 font-normal">Segment</th><th className="px-4 py-3 text-right font-normal">Customers</th><th className="px-4 py-3 text-right font-normal">Avg CLV</th><th className="px-4 py-3 text-right font-normal">ARPU</th><th className="px-4 py-3 text-right font-normal">Churn / mo</th></tr>
                    </thead>
                    <tbody className="divide-y divide-line text-ink tabular-nums">
                      {clvBySegment.map((r) => (
                        <tr key={r.segment}>
                          <td className="px-4 py-3 font-medium">{r.segment}</td>
                          <td className="px-4 py-3 text-right">{r.customers}</td>
                          <td className="px-4 py-3 text-right">{r.clv.toLocaleString("en-US")} RON</td>
                          <td className="px-4 py-3 text-right">{r.arpu.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right">{r.churn.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </>
          )}

          <Section n={num()} title="Challenges">
            <div className="grid gap-3">
              {p.challenges.map((c) => (
                <div key={c.title} className="relative rounded-2xl border border-line p-1">
                  <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                  <div className="relative rounded-xl bg-white px-5 py-4">
                    <div className="font-medium text-ink">{c.title}</div>
                    <p className="mt-1 text-muted">{first(c.body)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section n={num()} title="Business value">
            <div className="grid gap-3 sm:grid-cols-2">
              {p.value.map((v) => (
                <div key={v.title} className="rounded-2xl border border-line bg-panel p-5">
                  <div className="font-medium text-ink">{v.title}</div>
                  <p className="mt-1 text-muted">{first(v.body)}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section n={num()} title="Tech">
            <div className="flex flex-wrap gap-2">
              {[...p.stack, ...p.concepts].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </Section>

          <Link href={`/projects/${next.slug}/`} className="group flex items-center justify-between rounded-3xl bg-ink p-8 transition hover:bg-neutral-800">
            <div>
              <div className="text-sm text-white/60">Next project</div>
              <div className="mt-1 text-2xl font-medium text-white">{next.title}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-white transition group-hover:translate-x-1" />
          </Link>
        </TracingBeam>
      </main>
      <Footer />
    </>
  );
}

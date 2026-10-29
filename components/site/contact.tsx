"use client";
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FloatingDock } from "@/components/ui/floating-dock";
import { site } from "@/data/site";
import { Magnetic, RevealWords } from "./motion-ux";

export function Contact() {
  const items = [
    { title: "Email", icon: <Mail className="h-full w-full" />, href: `mailto:${site.email}` },
    { title: "LinkedIn", icon: <Linkedin className="h-full w-full" />, href: site.linkedin },
    { title: "GitHub", icon: <Github className="h-full w-full" />, href: site.github },
    ...(site.cv ? [{ title: "CV", icon: <FileText className="h-full w-full" />, href: site.cv }] : []),
  ];
  return (
    <section id="contact" className="px-4 sm:px-6">
      <BackgroundBeamsWithCollision className="mx-auto max-w-6xl rounded-3xl border border-line">
        <div className="relative z-20 flex flex-col items-center px-4 text-center">
          <p className="text-sm text-muted">(05) Contact</p>
          <h2 className="mt-5 text-5xl leading-[1.02] font-medium tracking-[-0.035em] text-ink md:text-7xl">
            <RevealWords text="Let's work" /><span className="font-serif font-normal italic tracking-normal">together.</span>
          </h2>
          <Magnetic><a href={`mailto:${site.email}`} className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-white transition hover:bg-neutral-800">
            {site.email} <ArrowUpRight className="h-4 w-4" />
          </a></Magnetic>
          <div className="mt-8">
            <FloatingDock items={items} mobileClassName="hidden" />
            <div className="flex gap-3 md:hidden">
              {items.map((i) => (
                <a key={i.title} href={i.href} aria-label={i.title} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white p-3 text-ink">{i.icon}</a>
              ))}
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
}

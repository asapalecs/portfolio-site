"use client";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24">
      <div className="mx-auto h-40 max-w-6xl px-4 sm:h-64 sm:px-6">
        <TextHoverEffect text={site.name.toUpperCase()} />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-line px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} {site.name}. {site.role}, {site.location}.</span>
        <a href={site.github} className="hover:text-ink">github.com/asapalecs</a>
      </div>
    </footer>
  );
}

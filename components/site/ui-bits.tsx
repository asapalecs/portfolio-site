import { Reveal } from "./motion-ux";

export function SectionHead({ n, label, title, className = "" }: { n: string; label: string; title: React.ReactNode; className?: string }) {
  return (
    <Reveal className={className}>
      <p className="flex items-center gap-3 text-sm text-muted">
        <span className="tabular-nums">({n})</span>
        <span className="h-px w-8 bg-line" />
        {label}
      </p>
      <h2 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-medium tracking-[-0.02em] text-ink md:text-6xl">{title}</h2>
    </Reveal>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-xs text-muted">{children}</span>;
}

export const Serif = ({ children }: { children: React.ReactNode }) => (
  <span className="font-serif font-normal italic tracking-normal">{children}</span>
);

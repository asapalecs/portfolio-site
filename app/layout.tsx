import type { Metadata } from "next";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import { site, siteUrl } from "@/data/site";
import { Intro } from "@/components/site/intro";
import { SmoothScroll, ScrollProgress } from "@/components/site/motion-ux";
import { Providers } from "./providers";
import "lenis/dist/lenis.css";
import "./globals.css";

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.intro,
  alternates: { canonical: "/" },
  openGraph: { title, description: site.intro, type: "website", url: "/" },
  twitter: { card: "summary", title, description: site.intro },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: site.location, addressCountry: "RO" },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ascunde intro-ul daca a rulat deja in sesiunea asta */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("intro-seen")==="1")document.documentElement.dataset.intro="seen"}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`#intro{display:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <Intro />
          <SmoothScroll />
          <ScrollProgress />
          {children}
        </Providers>
      </body>
    </html>
  );
}

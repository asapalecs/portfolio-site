import type { Metadata } from "next";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import { site } from "@/data/site";
import { Intro } from "@/components/site/intro";
import { SmoothScroll, ScrollProgress } from "@/components/site/motion-ux";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: site.intro,
  openGraph: { title: `${site.name} | ${site.role}`, description: site.intro, type: "website" },
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
      </head>
      <body className="font-sans">
        <Intro />
        <SmoothScroll />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

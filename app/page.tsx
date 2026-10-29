import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Insights } from "@/components/site/insights";
import { Showcase } from "@/components/site/showcase";
import { Projects } from "@/components/site/projects";
import { Approach } from "@/components/site/approach";
import { Skills } from "@/components/site/skills";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Insights />
        <About />
        <Showcase />
        <Projects />
        <Approach />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

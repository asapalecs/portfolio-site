"use client";
import Link from "next/link";
import { FolderGit2, Workflow, Wrench, User } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { site } from "@/data/site";
import { Magnetic } from "./motion-ux";

const items = [
  { name: "About", link: "/#about", icon: <User className="h-4 w-4" /> },
  { name: "Work", link: "/#projects", icon: <FolderGit2 className="h-4 w-4" /> },
  { name: "Process", link: "/#approach", icon: <Workflow className="h-4 w-4" /> },
  { name: "Skills", link: "/#skills", icon: <Wrench className="h-4 w-4" /> },
];

// navbar-ul flotant apare la scroll in sus
export function Nav() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <Link href="/" className="text-lg font-medium tracking-tight text-ink">
            {site.name}<span className="text-orange">.</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm text-muted">
            {items.map((i) => (
              <a key={i.name} href={i.link} className="hidden rounded-full px-3 py-1.5 transition hover:text-ink sm:block">{i.name}</a>
            ))}
            <Magnetic><a href="/#contact" className="ml-2 inline-block rounded-full bg-ink px-4 py-2 text-white transition hover:bg-neutral-800">Get in touch</a></Magnetic>
          </nav>
        </div>
      </header>
      <FloatingNav navItems={items} cta={{ name: "Get in touch", link: "/#contact" }} />
    </>
  );
}

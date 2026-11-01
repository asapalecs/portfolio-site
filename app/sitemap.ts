import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, priority: 1 },
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}/`, priority: 0.8 })),
  ];
}

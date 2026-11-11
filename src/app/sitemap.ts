import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://matheus-sathler-portfolio.matheus-sathler2020.chatgpt.site";
  return ["/", ...projects.map((p) => `/projetos/${p.slug}/`)].map((path) => ({
    url: new URL(path, base).href,
  }));
}
export const dynamic = "force-static";

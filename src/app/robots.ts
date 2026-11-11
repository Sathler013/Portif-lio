import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL(
      "/sitemap.xml",
      process.env.NEXT_PUBLIC_SITE_URL ||
        "https://matheus-sathler-portfolio.matheus-sathler2020.chatgpt.site",
    ).href,
  };
}
export const dynamic = "force-static";

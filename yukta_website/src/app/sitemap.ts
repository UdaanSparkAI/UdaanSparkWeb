import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.siteUrl;

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/delete-account", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/refund", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/support", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

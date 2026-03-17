import type { MetadataRoute } from "next";
import { BOOKS } from "@/lib/books";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/books`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/checkout`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    ...BOOKS.map((b) => ({
      url: `${base}/books/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}


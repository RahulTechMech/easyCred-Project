import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/content/blogs";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.easycred.example";

const STATIC_ROUTES = [
  "",
  "/about",
  "/personal-loan",
  "/emi-calculator",
  "/eligibility-calculator",
  "/loan-readiness",
  "/blogs",
  "/faqs",
  "/contact",
  "/apply",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/apply" ? 0.9 : 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}

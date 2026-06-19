import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { BLOGS } from "@/lib/blogs";
import { CASE_STUDY_SLUGS } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticRoutes = [
		"",
		"/about",
		"/work",
		"/blog",
		"/resume",
		"/contact",
	].map((path) => ({
		url: `${SITE_URL}${path}`,
		lastModified: now,
		changeFrequency: "monthly" as const,
		priority: path === "" ? 1 : 0.8,
	}));

	const blogRoutes = BLOGS.map((b) => ({
		url: `${SITE_URL}/blog/${b.slug}`,
		lastModified: now,
		changeFrequency: "yearly" as const,
		priority: 0.6,
	}));

	const workRoutes = CASE_STUDY_SLUGS.map((slug) => ({
		url: `${SITE_URL}/work/${slug}`,
		lastModified: now,
		changeFrequency: "yearly" as const,
		priority: 0.7,
	}));

	return [...staticRoutes, ...blogRoutes, ...workRoutes];
}

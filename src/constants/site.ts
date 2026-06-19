// Canonical site metadata shared across the metadata API, sitemap, robots,
// and OG image generation. Single source of truth so they never drift.
export const SITE = {
	name: "Parmjeet Mishra",
	title: "Parmjeet Mishra — Full-Stack React Developer",
	description:
		"Full-Stack React Developer specializing in Next.js, TypeScript, and modern web applications. Based in Ludhiana, India.",
	url: "https://parmjeetmishra.com",
	locale: "en_IN",
	twitter: "@iamparmjeet",
} as const;

export const SITE_URL = SITE.url;

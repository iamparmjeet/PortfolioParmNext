import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

// AI crawlers, named explicitly so they are never blocked by accident by a
// future wildcard rule. GPTBot/OAI-SearchBot (OpenAI), Claude* (Anthropic),
// Perplexity*, Google-Extended (Gemini), Applebot-Extended, CCBot,
// meta-externalagent, Amazonbot.
const AI_CRAWLERS = [
	"GPTBot",
	"OAI-SearchBot",
	"ChatGPT-User",
	"ClaudeBot",
	"Claude-User",
	"Claude-SearchBot",
	"PerplexityBot",
	"Perplexity-User",
	"Google-Extended",
	"Applebot-Extended",
	"CCBot",
	"meta-externalagent",
	"Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{ userAgent: "*", allow: "/" },
			{ userAgent: AI_CRAWLERS, allow: "/" },
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL,
	};
}

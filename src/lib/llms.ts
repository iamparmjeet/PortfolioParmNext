import { EMAIL } from "@/constants";
import { contacts } from "@/constants/data";
import { SITE, SITE_URL } from "@/constants/site";
import { BLOGS, type BlogSection } from "@/lib/blogs";
import { CASE_STUDIES } from "@/lib/case-studies";
import { PROJECTS } from "@/lib/projects";

// Strip the trusted inline HTML (<strong>/<em>/<code>) used in content data so
// the LLM files read as plain markdown.
const stripTags = (s: string) => s.replace(/<[^>]+>/g, "");

export const VISIBLE_PROJECTS = PROJECTS.filter((p) => p.visiable !== false);

export function sectionsToMarkdown(sections: BlogSection[]): string {
	return sections
		.map((s) => {
			switch (s.type) {
				case "h2":
					return `## ${stripTags(s.content as string)}`;
				case "ul":
					return (s.content as string[])
						.map((li) => `- ${stripTags(li)}`)
						.join("\n");
				case "pre":
					return `\`\`\`\n${s.content}\n\`\`\``;
				case "pull":
					return `> ${stripTags(s.content as string)}`;
				case "hr":
					return "---";
				default:
					return stripTags(s.content as string);
			}
		})
		.join("\n\n");
}

function aboutSection(): string {
	return `# ${SITE.name}

> ${SITE.description} Open to remote full-time roles and freelance projects.

This file is written for LLMs and AI assistants. Full content: ${SITE_URL}/llms-full.txt`;
}

function projectsSection(): string {
	const lines = VISIBLE_PROJECTS.map((p) => {
		const study = CASE_STUDIES.find((c) => c.slug === p.id);
		const tagline = study ? ` ${stripTags(study.tagline)}` : "";
		return `- [${p.title} — ${p.italic}](${SITE_URL}/work/${p.id}) (${p.year}): ${p.desc} Stack: ${p.stack.join(", ")}.${tagline}`;
	});
	return `## Projects\n\n${lines.join("\n")}`;
}

function blogsSection(): string {
	const lines = BLOGS.map(
		(b) =>
			`- [${b.title} ${b.italic}](${SITE_URL}/blog/${b.slug}) (${b.category}, ${b.date}, ${b.readTime}): ${b.excerpt}`,
	);
	return `## Writing\n\n${lines.join("\n")}`;
}

function contactSection(): string {
	const lines = contacts
		.filter((c) => c.href.startsWith("http"))
		.map((c) => `- [${c.label}](${c.href})`);
	return `## Contact\n\n- Email: ${EMAIL}\n${lines.join("\n")}`;
}

// llmstxt.org format: H1 title, blockquote summary, then H2 sections of links.
export function buildLlmsTxt(): string {
	return `${aboutSection()}\n\n${projectsSection()}\n\n${blogsSection()}\n\n${contactSection()}\n`;
}

export function buildLlmsFullTxt(): string {
	const caseStudies = CASE_STUDIES.filter((c) =>
		VISIBLE_PROJECTS.some((p) => p.id === c.slug),
	)
		.map((c) => {
			const stats = c.stats.map((s) => `- ${s.v} ${s.l}`).join("\n");
			const problem = c.problem.map(stripTags).join("\n\n");
			return `## ${stripTags(c.heroTitle)}\n\n${stripTags(c.tagline)} Read the full case study: ${SITE_URL}/work/${c.slug}\n\n### ${stripTags(c.overviewTitle)}\n\n${stripTags(c.overviewBody)}\n\n### ${stripTags(c.problemTitle)}\n\n${problem}\n\n### Key numbers\n\n${stats}`;
		})
		.join("\n\n");

	const posts = BLOGS.map((b) => {
		return `## ${b.title} ${b.italic}\n\n(${b.category}, ${b.date}, ${b.readTime})\n\n${b.excerpt}\n\n${sectionsToMarkdown(b.sections)}`;
	}).join("\n\n");

	return `${aboutSection()}\n\n${projectsSection()}\n\n${blogsSection()}\n\n${contactSection()}\n\n# Case studies\n\n${caseStudies}\n\n# Blog posts (full text)\n\n${posts}\n`;
}

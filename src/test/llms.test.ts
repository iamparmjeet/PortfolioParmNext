import { describe, expect, it } from "vitest";
import { BLOGS } from "../lib/blogs";
import { buildLlmsFullTxt, buildLlmsTxt, VISIBLE_PROJECTS } from "../lib/llms";
import { PROJECTS } from "../lib/projects";

describe("buildLlmsTxt", () => {
	it("follows the llmstxt.org shape (H1, blockquote, H2 sections)", () => {
		const txt = buildLlmsTxt();
		expect(txt.startsWith("# Parmjeet Mishra\n\n> ")).toBe(true);
		expect(txt).toContain("## Projects");
		expect(txt).toContain("## Writing");
		expect(txt).toContain("## Contact");
	});

	it("lists every visible project with a link and stack", () => {
		const txt = buildLlmsTxt();
		for (const p of VISIBLE_PROJECTS) {
			expect(txt).toContain(`](https://parmjeetmishra.com/work/${p.id})`);
			expect(txt).toContain(p.title);
		}
	});

	it("hides projects marked invisible", () => {
		const hidden = PROJECTS.filter((p) => p.visiable === false).map(
			(p) => p.id,
		);
		expect(hidden.length).toBeGreaterThan(0);
		const txt = buildLlmsTxt();
		for (const id of hidden) {
			expect(txt).not.toContain(`/work/${id})`);
		}
	});

	it("lists every blog post with its slug", () => {
		const txt = buildLlmsTxt();
		for (const b of BLOGS) {
			expect(txt).toContain(`](https://parmjeetmishra.com/blog/${b.slug})`);
		}
	});
});

describe("buildLlmsFullTxt", () => {
	it("includes full blog section text", () => {
		const txt = buildLlmsFullTxt();
		for (const b of BLOGS) {
			expect(txt).toContain(`## ${b.title}`);
		}
	});

	it("contains no inline HTML tags", () => {
		expect(buildLlmsFullTxt()).not.toMatch(/<\/?(strong|em|code)>/);
	});
});

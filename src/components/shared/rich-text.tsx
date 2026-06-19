import type { ReactNode } from "react";

// Renders the small, trusted inline-markup vocabulary used by case studies and
// blog copy — <em>, <strong>, <code> plus HTML entities — as real React
// elements. Unlike dangerouslySetInnerHTML this never parses strings into the
// DOM, so it is XSS-safe by construction; anything outside the allowed tag set
// is emitted as literal text. The markup is flat (tags are never nested), which
// matches every string in the content layer.

const ALLOWED = ["em", "strong", "code"] as const;
type AllowedTag = (typeof ALLOWED)[number];

const TAG_RE = /<(em|strong|code)>([\s\S]*?)<\/\1>/gi;

const NAMED_ENTITIES: Record<string, string> = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	apos: "'",
	ldquo: "“",
	rdquo: "”",
	lsquo: "‘",
	rsquo: "’",
	mdash: "—",
	ndash: "–",
	hellip: "…",
	nbsp: " ",
};

function decodeEntities(input: string): string {
	return input.replace(/&(#x?[0-9a-f]+|[a-z][a-z0-9]*);/gi, (match, code) => {
		if (code[0] === "#") {
			const n =
				code[1] === "x" || code[1] === "X"
					? Number.parseInt(code.slice(2), 16)
					: Number.parseInt(code.slice(1), 10);
			return Number.isNaN(n) ? match : String.fromCodePoint(n);
		}
		return NAMED_ENTITIES[code.toLowerCase()] ?? match;
	});
}

export function RichText({ children }: { children: string }) {
	const nodes: ReactNode[] = [];
	let cursor = 0;
	let key = 0;

	for (const match of children.matchAll(TAG_RE)) {
		const start = match.index ?? 0;
		if (start > cursor) {
			nodes.push(decodeEntities(children.slice(cursor, start)));
		}
		const Tag = match[1].toLowerCase() as AllowedTag;
		nodes.push(<Tag key={key++}>{decodeEntities(match[2])}</Tag>);
		cursor = start + match[0].length;
	}

	if (cursor < children.length) {
		nodes.push(decodeEntities(children.slice(cursor)));
	}

	return <>{nodes}</>;
}

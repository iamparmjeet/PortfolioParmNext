import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/shared/rich-text";
import {
	BLOGS,
	type BlogSection,
	getBlogBySlug,
	getBlogIndex,
} from "@/lib/blogs";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = getBlogBySlug(slug);
	if (!post) return { title: "Post not found" };

	const title = `${post.title} ${post.italic}`.trim();
	const url = `/blog/${post.slug}`;
	return {
		title,
		description: post.excerpt,
		alternates: { canonical: url },
		openGraph: {
			type: "article",
			url,
			title,
			description: post.excerpt,
			publishedTime: post.date,
			authors: ["Parmjeet Mishra"],
			tags: [post.category],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: post.excerpt,
		},
	};
}

const inlineProse =
	"[&_strong]:font-semibold [&_strong]:text-ink [&_em]:italic [&_em]:text-ink [&>code]:rounded [&>code]:bg-rule-soft [&>code]:px-1.5 [&>code]:py-px [&>code]:font-mono [&>code]:text-[14px] [&>code]:text-accent";

function renderSection(s: BlogSection, i: number) {
	if (s.type === "h2") {
		return (
			<h2
				key={i}
				className="mt-12 mb-4.5 font-display font-semibold text-[clamp(22px,3.2vw,36px)] text-ink leading-[1.1] tracking-tight"
			>
				{s.content as string}
			</h2>
		);
	}
	if (s.type === "pull") {
		return (
			<div
				key={i}
				className="my-9 border-accent border-l-[3px] pl-5.5 font-display font-medium text-[24px] text-ink italic leading-[1.4]"
			>
				"{s.content as string}"
			</div>
		);
	}
	if (s.type === "pre") {
		return (
			<pre
				key={i}
				className="my-6 overflow-x-auto rounded-lg border border-rule bg-paper px-5.5 py-5"
			>
				<code className="font-mono text-[13.5px] text-ink-soft leading-[1.7]">
					{s.content as string}
				</code>
			</pre>
		);
	}
	if (s.type === "ul") {
		return (
			<ul key={i} className="my-4.5 list-disc pl-6">
				{(s.content as string[]).map((item, j) => (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: static ordered content
						key={j}
						className={`mb-2 text-ink-soft ${inlineProse}`}
					>
						<RichText>{item}</RichText>
					</li>
				))}
			</ul>
		);
	}
	return (
		<p key={i} className={`mb-6 max-w-[66ch] ${inlineProse}`}>
			<RichText>{s.content as string}</RichText>
		</p>
	);
}

export async function generateStaticParams() {
	return BLOGS.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getBlogBySlug(slug);
	if (!post) notFound();

	const idx = getBlogIndex(slug);
	const next = BLOGS[idx + 1] ?? BLOGS[0];

	const TAG_CLASS: Record<string, string> = {
		Architecture: "blog-tag-arch",
		AI: "blog-tag-ai",
		Engineering: "blog-tag-eng",
		Career: "blog-tag-career",
	};

	return (
		<div className="pt-16 pb-24">
			<div className="mx-auto max-w-215 px-8">
				{/* ARTICLE HEADER */}
				<div className="mb-12 border-rule border-b pb-10">
					<Link
						href="/blog"
						className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] text-ink-muted tracking-[0.08em] no-underline transition-colors hover:text-accent"
					>
						← Back to writing
					</Link>
					<div className="mb-4 font-mono text-[10.5px] text-accent uppercase tracking-[0.14em]">
						<span className={`blog-tag ${TAG_CLASS[post.category]} mr-2.5`}>
							{post.category}
						</span>
						Vol. 02 · Issue {post.n} · {post.readTime} read
					</div>
					<div className="mb-6 font-display font-medium text-[clamp(36px,5.5vw,68px)] text-ink leading-[0.94] tracking-[-0.04em]">
						{post.title} <em className="text-accent italic">{post.italic}</em>
					</div>
					<div className="flex flex-wrap items-center gap-3.5">
						<span className="font-mono text-[11px] text-ink-muted tracking-[0.06em]">
							{post.date} · Parmjeet Mishra
						</span>
					</div>
				</div>

				{/* ARTICLE BODY */}
				<div className="font-display text-[20px] text-ink-soft leading-[1.65]">
					{post.sections.map((s, i) => renderSection(s, i))}
				</div>

				{/* ARTICLE FOOTER */}
				<div className="mt-10 flex flex-wrap items-start justify-between gap-7 border-rule border-t pt-10">
					<div>
						<h4 className="mb-2 font-display font-semibold text-[20px] text-ink">
							Written by Parm
						</h4>
						<p className="max-w-[46ch] text-[13.5px] text-ink-soft leading-[1.55]">
							Full-Stack React Developer building SaaS and usuable apps.
						</p>
					</div>
					<div className="flex flex-col gap-1.5 text-right">
						<div className="font-mono text-[9.5px] text-ink-muted uppercase tracking-widest">
							{next.slug === slug ? "Start from the top" : "Next piece"}
						</div>
						<Link
							href={`/blog/${next.slug}`}
							className="font-display text-accent text-base no-underline hover:underline"
						>
							{next.title} →
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

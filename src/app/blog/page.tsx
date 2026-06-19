"use client";
import Link from "next/link";
import { useState } from "react";
import { BlogHeader, NewsLetterSection } from "@/components/blog";
import { BLOGS, type Blog, getFeaturedBlog, getListBlogs } from "@/lib/blogs";

const CATS = ["All", "Architecture", "AI", "Engineering", "Career"] as const;
type Cat = (typeof CATS)[number];

const TAG_CLASS: Record<Blog["category"], string> = {
	Architecture: "blog-tag-arch",
	AI: "blog-tag-ai",
	Engineering: "blog-tag-eng",
	Career: "blog-tag-career",
};

export default function BlogPage() {
	const [active, setActive] = useState<Cat>("All");
	const featured = getFeaturedBlog();
	const list = getListBlogs();

	const visible = (cat: Blog["category"]) => active === "All" || active === cat;

	return (
		<>
			<BlogHeader />

			<div className="mx-auto max-w-295 px-8 pb-20">
				{/* FILTERS */}
				<div className="mb-8 flex flex-wrap gap-1.5 border-rule border-b pt-8 pb-9">
					{CATS.map((cat) => (
						<button
							type="button"
							key={cat}
							onClick={() => setActive(cat)}
							className={`rounded-full border px-3.5 py-1.75 font-medium font-mono text-[11px] uppercase tracking-[0.08em] transition-all duration-150 ${
								active === cat
									? "border-ink bg-ink text-paper"
									: "border-rule text-ink-soft hover:border-ink hover:text-ink"
							}`}
						>
							{cat === "All" ? `All (${BLOGS.length})` : cat}
						</button>
					))}
				</div>

				{/* FEATURED */}
				{visible(featured.category) && (
					<Link
						href={`/blog/${featured.slug}`}
						className="group grid grid-cols-1 items-center gap-12 border-rule border-b py-14 text-ink no-underline md:grid-cols-2"
					>
						<div>
							<div className="mb-4.5 flex flex-wrap items-center gap-2.5">
								<span className={`blog-tag ${TAG_CLASS[featured.category]}`}>
									{featured.category}
								</span>
								<span className="font-mono text-[9.5px] text-ink-muted uppercase tracking-[0.08em]">
									{featured.readTime} read
								</span>
							</div>
							<div className="font-display text-[64px] text-ink-muted italic leading-none opacity-35">
								{featured.n}
							</div>
							<div className="mt-3 mb-4.5 font-display font-medium text-[clamp(28px,3.5vw,48px)] leading-none tracking-[-0.03em] transition-colors group-hover:text-accent">
								{featured.title}{" "}
								<em className="text-accent italic">{featured.italic}</em>
							</div>
							<p className="mb-5 max-w-[46ch] font-display text-[19px] text-ink-soft leading-[1.65]">
								{featured.excerpt}
							</p>
							<span className="inline-flex items-center gap-2 font-mono text-[11px] text-accent uppercase tracking-widest">
								Read the piece →
							</span>
						</div>
						<div className="hidden aspect-4/3 items-center justify-center overflow-hidden rounded-[14px] border border-rule bg-paper md:flex">
							<div className="text-center font-bold font-display text-[clamp(40px,7vw,80px)] text-accent italic leading-none opacity-[0.18]">
								{featured.category}
							</div>
						</div>
					</Link>
				)}

				{/* POST LIST */}
				<div className="mt-12 border-ink border-t">
					{list.map((post) =>
						visible(post.category) ? (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								className="group grid grid-cols-[48px_1fr_auto] items-center gap-5 border-rule border-b px-2 py-6 text-ink no-underline transition-all hover:bg-accent-tint hover:pl-5 md:grid-cols-[64px_1fr_auto]"
							>
								<div className="text-center font-display text-[38px] text-ink-muted italic leading-none opacity-40">
									{post.n}
								</div>
								<div>
									<div className="mb-1.75 flex flex-wrap items-center gap-2">
										<span className={`blog-tag ${TAG_CLASS[post.category]}`}>
											{post.category}
										</span>
										<span className="font-mono text-[9.5px] text-ink-muted uppercase tracking-[0.08em]">
											{post.readTime}
										</span>
									</div>
									<div className="mb-2 font-display font-semibold text-[clamp(18px,2.2vw,26px)] leading-[1.1] tracking-[-0.02em] transition-colors group-hover:text-accent">
										{post.title}{" "}
										<em className="font-medium text-ink-muted italic">
											{post.italic}
										</em>
									</div>
									<div className="max-w-[64ch] text-[13.5px] text-ink-muted leading-[1.55]">
										{post.excerpt}
									</div>
								</div>
								<div className="flex shrink-0 flex-col items-end gap-1.5">
									<span className="whitespace-nowrap font-mono text-[10.5px] text-ink-muted">
										{post.date}
									</span>
									<span className="group-hover:-translate-y-0.75 font-display text-[22px] text-ink-muted transition group-hover:translate-x-0.75 group-hover:text-accent">
										↗
									</span>
								</div>
							</Link>
						) : null,
					)}
				</div>

				{/* NEWSLETTER */}
				<NewsLetterSection />
			</div>
		</>
	);
}

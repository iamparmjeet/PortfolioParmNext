"use client";
import Link from "next/link";
import { useState } from "react";
import { WorkHeader } from "@/components/work";
import { PROJECTS } from "@/lib/projects";

const ALL_FILTERS = [
	{ k: "all", label: "All" },
	{ k: "saas", label: "SaaS" },
	{ k: "client", label: "Client" },
	{ k: "ai", label: "AI Apps" },
	{ k: "building", label: "Building" },
];

export default function WorkPage() {
	const [filter, setFilter] = useState("all");
	const shown =
		filter === "all"
			? PROJECTS
			: PROJECTS.filter((p) => p.cats.includes(filter));
	const filters = ALL_FILTERS.map((f) => ({
		...f,
		count:
			f.k === "all"
				? PROJECTS.length
				: PROJECTS.filter((p) => p.cats.includes(f.k)).length,
	}));

	return (
		<>
			<WorkHeader />

			<div className="mx-auto max-w-295 px-8 pt-12 pb-20">
				<div className="mb-8 flex flex-wrap gap-1.5">
					{filters.map((f) => (
						<button
							type="button"
							key={f.k}
							onClick={() => setFilter(f.k)}
							className={`rounded-full border px-3.5 py-1.75 font-medium font-mono text-[11px] uppercase tracking-[0.08em] transition-all duration-150 ${
								filter === f.k
									? "border-ink bg-ink text-paper"
									: "border-rule text-ink-soft hover:border-ink hover:text-ink"
							}`}
						>
							{f.label} <span className="ml-1 opacity-55">({f.count})</span>
						</button>
					))}
				</div>

				<div className="border-ink border-t">
					{shown.map((p) => (
						<Link
							key={p.id}
							href={`/work/${p.id}`}
							className="group relative grid grid-cols-[48px_1fr_32px] items-center gap-3.5 border-rule border-b px-2 py-5.5 text-ink no-underline transition-all hover:bg-accent-tint hover:pl-6 md:grid-cols-[96px_1fr_220px_48px] md:gap-6 md:px-3 md:py-7.5"
						>
							<div className="font-display font-medium text-[30px] text-ink-muted italic leading-none transition-colors group-hover:text-accent md:text-[48px]">
								{p.n}
							</div>
							<div>
								<h3 className="mb-2 font-display font-semibold text-[22px] leading-[1.05] tracking-[-0.02em] md:text-[30px]">
									{p.title}
									<span className="text-ink-muted">, </span>
									<em className="font-medium text-ink-muted italic">
										{p.italic}
									</em>
								</h3>
								<div className="max-w-[60ch] text-[14.5px] text-ink-soft leading-[1.55]">
									{p.desc}
								</div>
								<div className="mt-2.5 flex flex-wrap gap-1.25">
									{p.tags.map((t) => (
										<span key={t} className={`proj-tag t-${t}`}>
											{t}
										</span>
									))}
								</div>
							</div>
							<div className="hidden text-right font-mono text-[11px] text-ink-muted leading-[1.7] md:block">
								{p.stack.slice(0, 4).map((s) => (
									<div key={s}>{s}</div>
								))}
							</div>
							<div className="group-hover:-translate-y-0.75 text-right font-display text-[30px] text-ink-muted transition group-hover:translate-x-0.75 group-hover:text-accent">
								↗
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}

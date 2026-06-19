import Link from "next/link";
import { getFeaturedProjects, PROJECTS } from "@/lib/projects";
import { Kicker } from "../shared/kicker";

const featured = getFeaturedProjects();

export function FeaturedWork() {
	return (
		<section className="border-rule border-b py-20">
			<div className="mx-auto max-w-295 px-8">
				<div className="mb-10 flex flex-wrap items-end justify-between gap-6">
					<div>
						<Kicker>Selected work</Kicker>
						<h2 className="mt-3.5 max-w-[14ch] font-display font-medium text-[clamp(36px,5.5vw,64px)] text-ink leading-none tracking-[-0.03em]">
							A few of the <em className="text-accent italic">things</em>
							<br />I have been making.
						</h2>
					</div>
					<div className="max-w-[38ch] text-[14.5px] text-ink-soft">
						Three picks from a small, deliberate body of work. Open{" "}
						<em>Work</em> in the nav for the complete catalogue.
					</div>
				</div>
				<div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
					{featured.map((p) => (
						<Link
							key={p.id}
							href={`/work/${p.id}`}
							className="group hover:-translate-y-0.5 flex flex-col overflow-hidden rounded-[14px] border border-rule bg-paper no-underline transition-[border-color,transform] duration-200 hover:border-accent"
						>
							<div className="relative flex aspect-video w-full items-center justify-center overflow-hidden border-rule border-b bg-rule-soft">
								<span className="font-mono text-[10px] text-ink-muted">
									{p.title}
								</span>
							</div>
							<div className="flex flex-1 flex-col gap-2.25 px-4.5 pt-4.5 pb-3.5">
								<div className="flex flex-wrap gap-1.25">
									{p.tags.map((t) => (
										<span key={t} className={`proj-tag t-${t}`}>
											{t}
										</span>
									))}
								</div>
								<h3 className="font-display font-semibold text-[21px] text-ink leading-[1.1] tracking-[-0.02em]">
									{p.title}
									<span className="text-ink-muted">, </span>
									<em className="font-medium text-ink-muted italic">
										{p.italic}
									</em>
								</h3>
								<div className="text-[13.5px] text-ink-soft leading-[1.55]">
									{p.desc}
								</div>
								<div className="mt-auto flex flex-wrap gap-1 pt-1.5">
									{p.stack.slice(0, 4).map((s) => (
										<span
											key={s}
											className="rounded border border-rule-soft bg-black/4 px-1.75 py-0.5 font-mono text-[10px] text-ink-muted"
										>
											{s}
										</span>
									))}
								</div>
							</div>
							<div className="flex items-center justify-between border-rule-soft border-t px-4.5 py-3">
								<span className="font-mono text-[10.5px] text-ink-muted uppercase tracking-[0.06em]">
									{p.year}
								</span>
								<span className="group-hover:-translate-y-0.5 font-display text-[20px] text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-accent">
									↗
								</span>
							</div>
						</Link>
					))}
				</div>
				<div className="mt-8 text-center">
					<Link
						href="/work"
						className="group inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.25 font-body font-medium text-[14.5px] text-ink no-underline transition-all duration-150 hover:bg-ink hover:text-paper"
					>
						See all {PROJECTS.length} projects{" "}
						<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-0.75">
							→
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}

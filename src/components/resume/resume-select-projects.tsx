import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ResumePageProps {
	secLabel: string;
	projects: Project[];
}

export function ResumeSelectProjects({ secLabel, projects }: ResumePageProps) {
	return (
		<div className="mb-8 print:mb-3">
			<div className={secLabel}>Selected Projects</div>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2 print:gap-2">
				{projects.slice(0, 6).map((p, i) => (
					<Link
						key={p.id}
						href={`/work/${p.id}`}
						className={`group rounded-[10px] border border-rule border-t-2 border-t-transparent bg-paper p-4.5 text-ink no-underline transition-colors hover:border-t-accent print:break-inside-avoid print:rounded-md print:p-2 ${
							i >= 4 ? "print:hidden" : ""
						}`}
					>
						<div className="mb-1.75 font-mono text-[9.5px] text-ink-muted uppercase tracking-widest print:mb-1 print:text-[8px]">
							{p.n} · {p.cats[0]} · {p.tags[0]}
						</div>
						<h4 className="mb-1.5 font-display font-semibold text-[18px] text-ink leading-[1.1] tracking-[-0.02em] print:mb-1 print:text-[12px]">
							{p.title} —{" "}
							<em className="font-medium text-ink-muted italic">{p.italic}</em>
						</h4>
						<p className="mb-2.5 text-[12.5px] text-ink-soft leading-[1.55] print:mb-1.5 print:text-[10px] print:leading-snug">
							{p.desc}
						</p>
						<div className="flex flex-wrap gap-1">
							{p.stack.map((s) => (
								<span
									key={s}
									className="rounded-[3px] border border-rule bg-black/4 px-1.5 py-px font-mono text-[9px] text-ink-muted print:text-[8px]"
								>
									{s}
								</span>
							))}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

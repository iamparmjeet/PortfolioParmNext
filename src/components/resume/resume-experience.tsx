import { experience } from "@/constants";

interface ResumeExpProps {
	secLabel: string;
}

export function ResumeExperience({ secLabel }: ResumeExpProps) {
	return (
		<div className="mb-8 print:mb-3">
			<div className={secLabel}>Experience</div>
			<div className="flex flex-col">
				{experience.map((e) => (
					<div
						key={e.period}
						className="grid grid-cols-1 gap-2 border-rule-soft border-b py-6 last:border-b-0 md:grid-cols-[130px_1fr] md:gap-6 print:break-inside-avoid print:gap-1 print:py-2"
					>
						<div className="pt-1.25 font-mono text-[10.5px] text-ink-muted leading-[1.6] tracking-[0.08em]">
							{e.badge && (
								<span className="mr-2 mb-1.25 inline-block rounded border border-accent bg-accent-tint px-1.75 py-0.5 font-bold font-mono text-[9.5px] text-accent uppercase tracking-[0.06em]">
									{e.badge}
								</span>
							)}
							{e.period}
						</div>
						<div>
							<h3 className="mb-1 font-display font-semibold text-[22px] text-ink leading-[1.1] tracking-[-0.02em] print:mb-0.5 print:text-[13px]">
								{e.title}{" "}
								<em className="font-medium text-ink-muted italic">· {e.sub}</em>
							</h3>
							<div className="mb-2.5 font-mono text-[11px] text-accent tracking-[0.06em] print:mb-1 print:text-[10px]">
								{e.org}
							</div>
							<p className="max-w-[58ch] text-ink-soft text-sm leading-[1.6] print:text-[10px] print:leading-snug">
								{e.desc}
							</p>
							{e.tags.length > 0 && (
								<div className="mt-2.5 flex flex-wrap gap-1.25 print:mt-1.5 print:gap-1">
									{e.tags.map((t) => (
										<span
											key={t}
											className="rounded border border-rule bg-black/4 px-1.75 py-0.5 font-mono text-[9.5px] text-ink-muted"
										>
											{t}
										</span>
									))}
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

import { education } from "@/constants";

export function ResumeEducation({ secLabel }: { secLabel: string }) {
	return (
		<div className="mb-8 print:mb-3">
			<div className={secLabel}>Education</div>
			{education.map((e) => (
				<div
					key={e.period}
					className="grid grid-cols-1 gap-2 border-rule-soft border-b py-4.5 last:border-b-0 md:grid-cols-[130px_1fr] md:gap-6 print:break-inside-avoid print:gap-1 print:py-1.5"
				>
					<div className="pt-1 font-mono text-[10.5px] text-ink-muted tracking-[0.08em] print:pt-0 print:text-[9px]">
						{e.period}
					</div>
					<div>
						<h4 className="mb-0.75 font-display font-semibold text-[20px] text-ink tracking-[-0.02em] print:text-[13px]">
							{e.title}
						</h4>
						<div className="mb-1.5 font-mono text-[11px] text-accent tracking-wider print:mb-0.5 print:text-[9.5px]">
							{e.sub}
						</div>
						<p className="text-[13.5px] text-ink-soft print:text-[10px] print:leading-snug">
							{e.desc}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

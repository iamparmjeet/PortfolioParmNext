export function ResumeProfile({ secLabel }: { secLabel: string }) {
	return (
		<div className="mb-8 print:mb-3">
			<div className={secLabel}>Profile</div>
			<p className="max-w-[68ch] font-display text-[20px] text-ink-soft leading-[1.6] print:text-[11px] print:leading-snug">
				Former{" "}
				<strong className="font-semibold text-ink">science teacher</strong>{" "}
				turned <em className="text-accent italic">full-stack developer</em> — I
				bring a systems-thinking, first-principles approach to every codebase.
				Self-taught over 3 years through{" "}
				<strong className="font-semibold text-ink">
					real projects with real constraints
				</strong>
				: a multi-tenant SaaS, an HLS video pipeline, B2B catalogs, and
				Claude-powered AI apps. I build things that ship, not demos.
			</p>
		</div>
	);
}

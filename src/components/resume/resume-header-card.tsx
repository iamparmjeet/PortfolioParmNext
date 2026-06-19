export function ResumeHeaderCard() {
	return (
		<div className="mb-8 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-rule bg-paper px-4 py-3 print:mb-3 print:gap-2 print:rounded-md print:px-3 print:py-2">
			<div className="flex flex-wrap gap-1.5">
				<a
					className="inline-flex items-center gap-1.5 rounded-md border border-rule px-2.5 py-1.25 font-mono text-[11px] text-ink-muted no-underline transition-colors hover:border-accent hover:text-accent"
					href="mailto:iamparmjeetmishra@gmail.com"
				>
					@ iamparmjeetmishra@gmail.com
				</a>
				<a
					className="inline-flex items-center gap-1.5 rounded-md border border-rule px-2.5 py-1.25 font-mono text-[11px] text-ink-muted no-underline transition-colors hover:border-accent hover:text-accent"
					href="https://github.com/iamparmjeet"
					target="_blank"
					rel="noopener"
				>
					{"{}"} github.com/iamparmjeet
				</a>
				<a
					className="inline-flex items-center gap-1.5 rounded-md border border-rule px-2.5 py-1.25 font-mono text-[11px] text-ink-muted no-underline transition-colors hover:border-accent hover:text-accent"
					href="https://parmjeetmishra.com"
					target="_blank"
					rel="noopener"
				>
					↗ parmjeetmishra.com
				</a>
				<span className="inline-flex items-center gap-1.5 rounded-md border border-rule px-2.5 py-1.25 font-mono text-[11px] text-ink-muted">
					📍 Ludhiana, Punjab, India · IST
				</span>
			</div>
			<span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-accent bg-accent-tint px-2.5 py-1.25 font-mono font-semibold text-[10px] text-accent uppercase tracking-[0.08em] print:hidden">
				<span className="size-1.5 rounded-full bg-accent" />
				Available · remote &amp; IN startups
			</span>
		</div>
	);
}

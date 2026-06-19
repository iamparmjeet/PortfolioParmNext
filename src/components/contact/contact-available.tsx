export function ContactAvailable() {
	return (
		<div className="mb-8 flex items-center gap-4 rounded-xl border border-accent border-l-4 bg-paper px-5.5 py-4.5">
			<div className="flex size-9.5  shrink-0 items-center justify-center rounded-full bg-accent-tint text-[18px] text-accent">
				●
			</div>
			<div>
				<div className="mb-0.5 font-display text-[18px] font-semibold">
					Available for work — 2026
				</div>
				<div className="text-[13px] text-ink-soft">
					Actively seeking new roles. Async-first teams preferred. Can start
					within 2–4 weeks of notice.
				</div>
			</div>
		</div>
	);
}

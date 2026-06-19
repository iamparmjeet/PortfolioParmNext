import { contacts } from "@/constants";

export function ContactReachMe() {
	return (
		<div>
			<h3 className="mb-4.5 font-display text-2xl font-semibold tracking-[-0.02em]">
				Where to <em className="italic text-accent">reach</em> me
			</h3>
			<div className="flex flex-col gap-0.5">
				{contacts.map((c) => (
					<a
						key={c.label}
						href={c.href}
						{...(c.external ? { target: "_blank", rel: "noopener" } : {})}
						className="flex items-center gap-3.5 rounded-[10px] border border-rule bg-paper px-4 py-3.5 text-ink no-underline transition-all duration-150 hover:border-accent hover:bg-accent-tint"
					>
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rule bg-bg font-display text-base font-semibold text-ink">
							{c.icon}
						</div>
						<div>
							<span className="block font-body text-sm font-semibold text-ink">
								{c.label}
							</span>
							<span className="mt-0.5 block font-mono text-[12px] text-ink-muted">
								{c.value}
							</span>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}

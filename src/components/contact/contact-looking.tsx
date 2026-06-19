import { looking } from "@/constants";

export function ContactLookingBox() {
	return (
		<section className="mb-12">
			<div className="mb-6 flex items-baseline justify-between gap-4 border-rule border-b pb-4">
				<h2 className="font-display font-semibold text-2xl tracking-[-0.02em]">
					What I am <em className="text-accent italic">looking</em> for
				</h2>
				<span className="font-mono text-[11px] text-ink-muted uppercase tracking-widest">
					{looking.length} things
				</span>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{looking.map((l) => (
					<div
						key={l.n}
						className="rounded-[14px] border border-rule bg-paper p-5 transition-colors duration-150 hover:border-accent"
					>
						<div className="mb-3 font-display text-[22px] text-accent italic leading-none">
							{l.n}
						</div>
						<h3 className="mb-1.5 font-display font-semibold text-[18px]">
							{l.t}
						</h3>
						<p className="text-ink-soft text-sm leading-normal">{l.s}</p>
					</div>
				))}
			</div>

			<div className="mt-4 rounded-[14px] border border-accent border-l-[3px] bg-paper p-5.5">
				<div className="flex items-start gap-3.5">
					<div className="font-display text-[32px] text-accent italic leading-none">
						⚡
					</div>
					<div>
						<div className="mb-1 font-display font-semibold text-[18px]">
							Fast response, no fuss.
						</div>
						<div className="text-ink-soft text-sm leading-[1.55]">
							I typically reply within 4–8 hours on weekdays (IST). For urgent
							projects, drop the word{" "}
							<span className="rounded-sm bg-highlight px-1 text-ink">
								urgent
							</span>{" "}
							in the subject line.
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

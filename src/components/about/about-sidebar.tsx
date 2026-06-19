import Image from "next/image";
import Link from "next/link";
import { bio, CDN, stack } from "@/constants";

export function AboutSidebar() {
	return (
		<aside className="flex flex-col gap-4.5 md:sticky md:top-22">
			<div className="rounded-[14px] border border-rule bg-paper p-5.5">
				<div className="mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-rule bg-rule-soft">
					<Image
						src={`${CDN}/web/PP1.jpg`}
						alt="About Hero Image"
						width={400}
						height={400}
					/>
				</div>
				<div className="mb-1 font-display text-[32px] font-semibold leading-none tracking-[-0.02em]">
					Parmjeet <em className="italic font-medium text-accent">Mishra</em>
				</div>
				<div className="mb-3.5 font-body text-[13.5px] text-ink-soft">
					Full-Stack React Developer
				</div>
				{bio.map((row) => (
					<div
						key={row.k}
						className="flex items-baseline justify-between border-b border-dotted border-rule py-1.75 text-[13px] last:border-b-0"
					>
						<span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-muted">
							{row.k}
						</span>
						<span
							className={`font-body font-medium ${row.accent ? "text-accent" : "text-ink"}`}
						>
							{row.v}
						</span>
					</div>
				))}
			</div>

			<div className="rounded-[14px] border border-rule bg-paper p-5.5">
				<div className="mb-3.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-muted">
					The Stack
				</div>
				<div className="grid grid-cols-2 gap-2">
					{stack.map((box) => (
						<div
							key={box.title}
							className="rounded-lg border border-rule-soft bg-bg px-3 py-2.5"
						>
							<div className="mb-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-widest text-accent">
								{box.title}
							</div>
							<div className="flex flex-wrap gap-1 font-mono text-[10.5px]">
								{box.items.map((it) => (
									<span
										key={it.label}
										className={
											it.hot ? "font-semibold text-ink" : "text-ink-soft"
										}
									>
										{it.label}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<Link
				href="/contact"
				className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink bg-ink px-6 py-3.25 font-body text-[14.5px] font-medium text-paper no-underline transition-all duration-150 hover:border-accent hover:bg-accent"
			>
				Get in touch{" "}
				<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-0.75">
					→
				</span>
			</Link>
		</aside>
	);
}

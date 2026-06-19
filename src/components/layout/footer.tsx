import Link from "next/link";
import { Logo } from "@/components/logos";
import { EMAIL } from "@/constants/data";
import { NAVLINKS, SOCIALLINKS } from "@/constants/nav";
import { CurrentYear } from "@/lib/date";

export default function Footer() {
	return (
		<footer className="mt-12 border-ink border-t bg-paper print:hidden">
			<div className="mx-auto max-w-295 px-8">
				{/* CTA */}
				<div className="grid grid-cols-1 gap-8 py-12 sm:py-16 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:py-20">
					<div>
						<span className="mb-4 inline-flex items-center gap-1.5 font-mono font-semibold text-[10.5px] text-accent uppercase tracking-[0.12em]">
							<span className="size-1.5 animate-pulse rounded-full bg-accent" />
							Open to work
						</span>
						<h2 className="max-w-[16ch] font-display font-medium text-[clamp(34px,6.5vw,76px)] text-ink leading-none tracking-[-0.03em] md:leading-[0.98]">
							Have something in <em className="text-accent italic">mind</em>?
							Let's make it.
						</h2>
						<a
							href={`mailto:${EMAIL}`}
							className="group mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-[clamp(18px,4.5vw,30px)] text-ink italic leading-none no-underline md:mt-7"
						>
							<span className="break-all border-rule border-b pb-1 transition-colors group-hover:border-accent group-hover:text-accent">
								{EMAIL}
							</span>
							<span className="font-display text-accent not-italic transition-transform group-hover:translate-x-1">
								→
							</span>
						</a>
					</div>

					<div className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:items-end md:gap-2">
						{SOCIALLINKS.map((l) => (
							<a
								key={l.href}
								href={l.href}
								target="_blank"
								rel="noopener"
								className="font-mono text-[11px] text-ink-soft uppercase tracking-widest no-underline transition-colors hover:text-accent"
							>
								{l.label}
							</a>
						))}
					</div>
				</div>

				{/* Colophon */}
				<div className="flex flex-col gap-4 border-rule border-t py-6 md:flex-row md:items-center md:justify-between">
					<div className="flex items-center gap-3">
						<Logo variant="cutp" size={24} />
						<span className="font-mono text-[11px] text-ink-muted">
							© {CurrentYear()} — Made with ♡ by Parm
						</span>
					</div>
					<nav className="flex flex-wrap gap-x-5 gap-y-1.5">
						{NAVLINKS.map((l) => (
							<Link
								key={l.href}
								href={l.href}
								className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.08em] no-underline transition-colors hover:text-accent"
							>
								{l.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</footer>
	);
}

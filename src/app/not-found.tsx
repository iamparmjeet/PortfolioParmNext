import Link from "next/link";
import { Kicker } from "@/components/shared/kicker";

export default function NotFound() {
	return (
		<section className="flex min-h-[70vh] items-center border-b border-rule py-24">
			<div className="mx-auto w-full max-w-295 px-8">
				<Kicker>Error 404</Kicker>
				<h1 className="mt-4 max-w-[16ch] font-display text-[clamp(48px,8vw,96px)] font-medium leading-[0.94] tracking-[-0.04em] text-ink">
					This page <em className="italic text-accent">wandered off</em>.
				</h1>
				<p className="mt-5 max-w-[48ch] text-[15.5px] leading-[1.6] text-ink-soft">
					The link is broken or the page never existed. No harm done — here are
					a few solid places to land instead.
				</p>

				<div className="mt-9 flex flex-wrap gap-3">
					<Link
						href="/"
						className="group inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.25 font-body text-[14.5px] font-medium text-ink no-underline transition-all duration-150 hover:bg-ink hover:text-paper"
					>
						Back home{" "}
						<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-0.75">
							→
						</span>
					</Link>
					<Link
						href="/work"
						className="inline-flex items-center rounded-full border border-rule px-6 py-3.25 font-body text-[14.5px] font-medium text-ink-soft no-underline transition-colors hover:border-accent hover:text-accent"
					>
						See the work
					</Link>
					<Link
						href="/contact"
						className="inline-flex items-center rounded-full border border-rule px-6 py-3.25 font-body text-[14.5px] font-medium text-ink-soft no-underline transition-colors hover:border-accent hover:text-accent"
					>
						Get in touch
					</Link>
				</div>
			</div>
		</section>
	);
}

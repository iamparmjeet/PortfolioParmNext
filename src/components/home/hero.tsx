import Image from "next/image";
import Link from "next/link";
import { CDN } from "@/constants/data";

export default function Hero() {
	return (
		<section className="relative overflow-hidden border-b border-rule py-12 md:pt-24 md:pb-16">
			<div className="pointer-events-none absolute right-8 top-16 rotate-[-8deg] select-none font-display text-[120px] italic leading-none text-accent opacity-[0.16]">
				✦
			</div>
			<div className="mx-auto max-w-295 px-8">
				<div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1fr_300px]">
					<div>
						<h1 className="mb-9 max-w-[13ch] font-display text-[clamp(54px,9vw,128px)] font-medium leading-[0.92] tracking-[-0.04em] text-ink">
							Hi, I&apos;m{" "}
							<em className="italic font-medium text-accent">Parm</em>
							.<br />I build things{" "}
							<span className="italic font-medium text-ink-muted">&amp;</span>{" "}
							ship them with{" "}
							<em className="italic font-medium text-accent">care</em>.
						</h1>
						<p className="mb-9 max-w-140 font-body text-[19px] leading-[1.6] text-ink-soft">
							Formerly taught physics; now I design systems and write code that{" "}
							<strong className="font-semibold text-ink">
								solves real problems
							</strong>{" "}
							— multi-tenant SaaS, HLS video pipelines, and Claude-powered AI
							apps that ship. Full-Stack React Developer, available globally.
						</p>
						<div className="flex flex-wrap gap-2.5">
							<Link
								href="/work"
								className="group inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-6 py-3.25 font-body text-[14.5px] font-medium text-paper no-underline transition-all duration-150 hover:border-accent hover:bg-accent"
							>
								See the work{" "}
								<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-0.75">
									→
								</span>
							</Link>
							<Link
								href="/work/rentwise"
								className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.25 font-body text-[14.5px] font-medium text-ink no-underline transition-all duration-150 hover:bg-ink hover:text-paper"
							>
								Read a case study
							</Link>
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.25 font-body text-[14.5px] font-medium text-ink no-underline transition-all duration-150 hover:bg-ink hover:text-paper"
							>
								Get in touch
							</Link>
						</div>
					</div>
					<div className="relative hidden shrink-0 items-center justify-center md:flex">
						<div className="relative size-75 overflow-hidden rounded-full bg-rule-soft">
							<Image
								src={`${CDN}/web/PP1.jpg`}
								alt="Hero Image"
								width="300"
								height="300"
								className="rounded-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

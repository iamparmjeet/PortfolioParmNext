import Link from "next/link";
import { timeline } from "@/constants";
import { Kicker } from "../shared/kicker";

export function AboutStory() {
	return (
		<main>
			<Kicker>Origin story</Kicker>
			<div className="mt-6 font-display text-[21px] leading-[1.55] text-ink">
				<p className="mb-6">
					I spent over a decade as a{" "}
					<strong className="font-semibold">science teacher in Ludhiana</strong>
					. If teaching teaches you anything, it is how to break complex systems
					into digestible parts — and how to spot when someone has actually
					understood something versus when they have just memorised it. As it
					turns out, that is exactly the skill good engineering rewards.
				</p>
				<p className="mb-6">
					I first touched the web through{" "}
					<em className="italic text-ink-soft">WordPress in 2020</em> — two
					years of building client sites, fighting page builders, and wondering
					how the thing actually worked under the hood. That curiosity led me to
					HTML, CSS and JavaScript, then to React and TypeScript, then to a
					whole backend stack I now genuinely enjoy.
				</p>
				<p className="mb-6">
					Unlike a bootcamp graduate, I learned all of this{" "}
					<strong className="font-semibold">
						by building real projects with real constraints
					</strong>{" "}
					— a client video portfolio that needed an HLS pipeline, a SaaS that
					needed multi-tenancy and proper auth, a B2B catalog that needed
					URL-based filter state. Not tutorials. Actual requirements.
				</p>
			</div>

			<blockquote className="my-9 border-l-[3px] border-accent pl-6 font-display text-[28px] font-medium italic leading-[1.35] tracking-[-0.01em] text-ink">
				&ldquo;I do not build demos. I build things that have requirements,
				constraints, real users, and real consequences. The complexity that
				creates is exactly what I am here for.&rdquo;
				<span className="mt-3.5 block font-mono text-[11px] not-italic font-medium uppercase tracking-[0.12em] text-ink-muted">
					— Parm, on the way he works
				</span>
			</blockquote>

			<Kicker className="mt-10">A short journey</Kicker>
			<div className="relative mt-6 pl-6 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-rule">
				{timeline.map((t) => (
					<div
						key={t.year}
						className={`relative mb-7 before:absolute before:-left-5.5 before:top-2 before:h-2.75 before:w-2.75 before:rounded-full before:border-2 before:bg-bg ${
							t.dim ? "before:border-ink-muted" : "before:border-accent"
						}`}
					>
						<div
							className={`mb-1 font-mono text-[11px] font-semibold tracking-widest ${
								t.dim ? "text-ink-muted" : "text-accent"
							}`}
						>
							{t.year}
						</div>
						<div className="mb-1 font-display text-[21px] font-semibold leading-[1.2]">
							{t.title}
						</div>
						<div className="font-body text-[14.5px] leading-normal text-ink-soft">
							{t.desc}
						</div>
					</div>
				))}
			</div>

			<div className="mt-10 flex flex-wrap gap-2.5">
				<Link
					href="/work/rentwise"
					className="group inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-6 py-3.25 font-body text-[14.5px] font-medium text-paper no-underline transition-all duration-150 hover:border-accent hover:bg-accent"
				>
					Read the case study{" "}
					<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-0.75">
						→
					</span>
				</Link>
				<Link
					href="/contact"
					className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.25 font-body text-[14.5px] font-medium text-ink no-underline transition-all duration-150 hover:bg-ink hover:text-paper"
				>
					Let us talk
				</Link>
			</div>
		</main>
	);
}

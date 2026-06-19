import { Kicker } from "../shared/kicker";

export function AboutHeader() {
	return (
		<header className="border-b border-rule pt-18 pb-12">
			<div className="mx-auto max-w-295 px-8">
				<Kicker>About · the long version</Kicker>
				<h1 className="mt-4.5 mb-5.5 max-w-[18ch] font-display text-[clamp(48px,7vw,88px)] font-medium leading-[0.96] tracking-[-0.035em] text-ink">
					Former teacher.
					<br />
					Now I <em className="italic text-accent">build things</em>
					<br />
					people use.
				</h1>
				<p className="max-w-[54ch] text-[18px] leading-[1.55] text-ink-soft">
					From physics classrooms in Ludhiana to production codebases — here is
					how I got here and what I am pointed at next.
				</p>
			</div>
		</header>
	);
}

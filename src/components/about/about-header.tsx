import { Kicker } from "../shared/kicker";

export function AboutHeader() {
	return (
		<header className="border-rule border-b pt-18 pb-12">
			<div className="mx-auto max-w-295 px-8">
				<Kicker>About · the long version</Kicker>
				<h1 className="mt-4.5 mb-5.5 max-w-[18ch] font-display font-medium text-[clamp(48px,7vw,88px)] text-ink leading-[0.96] tracking-[-0.035em]">
					Former teacher.
					<br />
					Now I <em className="text-accent italic">build things</em>
					<br />
					people use.
				</h1>
				<p className="max-w-[54ch] text-[18px] text-ink-soft leading-[1.55]">
					From physics classrooms in Ludhiana to production codebases — here is
					how I got here and what I am pointed at next.
				</p>
			</div>
		</header>
	);
}

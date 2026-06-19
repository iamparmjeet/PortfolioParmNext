import { Kicker } from "../shared/kicker";

export function BlogHeader() {
	return (
		<header className="border-rule border-b pt-18 pb-12">
			<div className="mx-auto max-w-295 px-8">
				<Kicker>Writing · the long thoughts</Kicker>
				<h1 className="mt-4.5 mb-5.5 max-w-[18ch] font-display font-medium text-[clamp(48px,7vw,88px)] text-ink leading-[0.96] tracking-[-0.035em]">
					Things I figured <em className="text-accent italic">out</em>
					<br />
					the hard way.
				</h1>
				<p className="max-w-[54ch] text-[18px] text-ink-soft leading-[1.55]">
					Architecture decisions, AI integrations, career pivots — written for
					developers who learn by reading how other developers think.
				</p>
			</div>
		</header>
	);
}

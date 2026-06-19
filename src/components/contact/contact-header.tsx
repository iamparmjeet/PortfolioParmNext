import { Kicker } from "../shared/kicker";

export function ContactHeader() {
	return (
		<header className="border-b border-rule pt-18 pb-12">
			<div className="mx-auto max-w-295 px-8">
				<Kicker>Get in touch · 2026</Kicker>
				<h1 className="mt-4.5 mb-5.5 max-w-[18ch] font-display text-[clamp(48px,7vw,88px)] font-medium leading-[0.96] tracking-[-0.035em] text-ink">
					Let us <em className="italic text-accent">build</em> something{" "}
					<em className="italic text-accent">together</em>.
				</h1>
				<p className="max-w-[54ch] text-[18px] leading-[1.55] text-ink-soft">
					Open to full-time remote roles, Indian product startups, and
					short-engagement freelance projects.
				</p>
			</div>
		</header>
	);
}

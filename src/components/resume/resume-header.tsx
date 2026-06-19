import { Kicker } from "../shared/kicker";

export function ResumeHeader() {
	return (
		<header className="border-rule border-b pt-24 pb-7 print:hidden">
			<div className="mx-auto max-w-215 px-8">
				<Kicker>Resume · the full picture</Kicker>
				<h1 className="mt-3 mb-3 max-w-[18ch] font-display font-medium text-[clamp(32px,5vw,52px)] text-ink leading-[1.02] tracking-[-0.03em]">
					Parmjeet <em className="text-accent italic">Mishra</em>
				</h1>
				<p className="max-w-[54ch] text-[15px] text-ink-soft leading-normal">
					Full-Stack React Developer · AI-integrated apps · Open to remote
				</p>
			</div>
		</header>
	);
}

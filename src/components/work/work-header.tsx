import { PROJECTS } from "@/lib/projects";
import { Kicker } from "../shared/kicker";

export function WorkHeader() {
	return (
		<header className="border-rule border-b pt-18 pb-12">
			<div className="mx-auto max-w-295 px-8">
				<Kicker>Catalogue · {PROJECTS.length} entries</Kicker>
				<h1 className="mt-4.5 mb-5.5 max-w-[18ch] font-display font-medium text-[clamp(48px,7vw,88px)] text-ink leading-[0.96] tracking-[-0.035em]">
					Things I have <em className="text-accent italic">built</em>,
					<br />
					am building, or <em className="text-accent italic">plan to</em>.
				</h1>
				<p className="max-w-[54ch] text-[18px] text-ink-soft leading-[1.55]">
					A mix of shipped client work, in-flight SaaS, and AI experiments —
					every one of them with real constraints, not tutorial scaffolds.
				</p>
			</div>
		</header>
	);
}

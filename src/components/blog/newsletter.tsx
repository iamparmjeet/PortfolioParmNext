import { SubscribeForm } from "../forms/subscribe-form";

export function NewsLetterSection() {
	return (
		<div className="my-14 flex flex-col items-center justify-between gap-8 rounded-2xl border border-rule bg-paper p-6 md:flex-row md:px-10 md:py-9">
			<div>
				<h3 className="mb-2 font-display font-medium text-[26px] tracking-[-0.02em]">
					New pieces, when they are{" "}
					<em className="text-accent italic">ready</em>.
				</h3>
				<p className="max-w-[44ch] text-ink-soft text-sm">
					No schedule, no fluff. I publish when I have something worth saying —
					usually once or twice a month.
				</p>
			</div>
			<SubscribeForm />
		</div>
	);
}

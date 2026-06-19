import { Kicker } from "../shared/kicker";
import { AskParm } from "./ask-parm";

export function AskParmSection() {
	return (
		<section className="py-20">
			<div className="mx-auto max-w-295 px-8">
				<div className="grid grid-cols-1 items-center gap-8 rounded-[18px] border border-rule bg-paper p-6 md:grid-cols-[1.1fr_1fr] md:p-9">
					<div>
						<Kicker>A V2 experiment</Kicker>
						<h3 className="mt-3.5 mb-3.5 font-display text-[38px] font-medium leading-[1.05] tracking-tight">
							Ask <em className="italic text-accent">Parm</em>, the chatbot.
						</h3>
						<p className="max-w-[38ch] text-[15px] leading-[1.6] text-ink-soft">
							An AI assistant trained on every project, my stack, my decisions,
							and the things I will not stop talking about. It is live — ask it
							anything, right here.
						</p>
					</div>
					<AskParm />
				</div>
			</div>
		</section>
	);
}

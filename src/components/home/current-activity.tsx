import { Kicker } from "../shared/kicker";

export function CurrentActivity() {
	return (
		<section className="border-rule border-b py-20">
			<div className="mx-auto max-w-295 px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
					<div>
						<Kicker>Currently building</Kicker>
						<h3 className="mt-3.5 mb-4.5 font-display font-semibold text-2xl tracking-[-0.02em]">
							Open <em className="font-medium text-accent italic">tabs</em>, in
							order of priority.
						</h3>
						<ul className="list-none">
							<li className="flex items-start gap-3.5 border-rule-soft border-b py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] text-ink-muted tracking-[0.08em]">
									/01
								</span>
								<div>
									<div className="font-display font-medium text-[18px] text-ink leading-[1.4]">
										Rentwise — SaaS
									</div>
									<div className="mt-0.75 text-[13.5px] text-ink-muted leading-[1.45]">
										Wrapping multi-tenant invite flow + tightening role guards.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-rule-soft border-b py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] text-ink-muted tracking-[0.08em]">
									/02
								</span>
								<div>
									<div className="font-display font-medium text-[18px] text-ink leading-[1.4]">
										AmarV4 — Video portfolio
									</div>
									<div className="mt-0.75 text-[13.5px] text-ink-muted leading-[1.45]">
										HLS pipeline + cross-player sync for a client launch.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-rule-soft border-b py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] text-ink-muted tracking-[0.08em]">
									/03
								</span>
								<div>
									<div className="font-display font-medium text-[18px] text-ink leading-[1.4]">
										School — SaaS
									</div>
									<div className="mt-0.75 text-[13.5px] text-ink-muted leading-[1.45]">
										School management app.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-rule-soft border-b py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] text-ink-muted tracking-[0.08em]">
									/04
								</span>
								<div>
									<div className="font-display font-medium text-[18px] text-ink leading-[1.4]">
										Portfolio V2 — this site
									</div>
									<div className="mt-0.75 text-[13.5px] text-ink-muted leading-[1.45]">
										An <em className="italic">&quot;Ask Parm&quot;</em> chatbot
										trained on every project here.
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div>
						<Kicker>Now learning</Kicker>
						<h3 className="mt-3.5 mb-4.5 font-display font-semibold text-2xl tracking-[-0.02em]">
							What I am{" "}
							<em className="font-medium text-accent italic">studying</em> this
							month.
						</h3>
						<ul className="list-none">
							<li className="flex items-start gap-3.5 border-rule-soft border-b py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] text-ink-muted tracking-[0.08em]">
									RAG
								</span>
								<div>
									<div className="font-display font-medium text-[18px] text-ink leading-[1.4]">
										Retrieval-augmented generation in production
									</div>
									<div className="mt-0.75 text-[13.5px] text-ink-muted leading-[1.45]">
										Upstash Vector + Voyage embeddings + Claude for citations.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-rule-soft border-b py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] text-ink-muted tracking-[0.08em]">
									DSA
								</span>
								<div>
									<div className="font-display font-medium text-[18px] text-ink leading-[1.4]">
										Striver A-to-Z (finally)
									</div>
									<div className="mt-0.75 text-[13.5px] text-ink-muted leading-[1.45]">
										For interview confidence, not for vibes.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-rule-soft border-b py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] text-ink-muted tracking-[0.08em]">
									TS
								</span>
								<div>
									<div className="font-display font-medium text-[18px] text-ink leading-[1.4]">
										Advanced generics &amp; utility types
									</div>
									<div className="mt-0.75 text-[13.5px] text-ink-muted leading-[1.45]">
										Pushing past "any-driven development" into proper inference.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-rule-soft border-b py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] text-ink-muted tracking-[0.08em]">
									Infra
								</span>
								<div>
									<div className="font-display font-medium text-[18px] text-ink leading-[1.4]">
										Monorepo patterns with Turborepo
									</div>
									<div className="mt-0.75 text-[13.5px] text-ink-muted leading-[1.45]">
										Rentwise + Portfolio V2 both want shared packages.
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

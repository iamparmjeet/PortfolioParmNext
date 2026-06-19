import { Kicker } from "../shared/kicker";

export function CurrentActivity() {
	return (
		<section className="border-b border-rule py-20">
			<div className="mx-auto max-w-295 px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
					<div>
						<Kicker>Currently building</Kicker>
						<h3 className="mt-3.5 mb-4.5 font-display text-2xl font-semibold tracking-[-0.02em]">
							Open <em className="italic font-medium text-accent">tabs</em>, in
							order of priority.
						</h3>
						<ul className="list-none">
							<li className="flex items-start gap-3.5 border-b border-rule-soft py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] tracking-[0.08em] text-ink-muted">
									/01
								</span>
								<div>
									<div className="font-display text-[18px] font-medium leading-[1.4] text-ink">
										Rentwise — SaaS
									</div>
									<div className="mt-0.75 text-[13.5px] leading-[1.45] text-ink-muted">
										Wrapping multi-tenant invite flow + tightening role guards.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-b border-rule-soft py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] tracking-[0.08em] text-ink-muted">
									/02
								</span>
								<div>
									<div className="font-display text-[18px] font-medium leading-[1.4] text-ink">
										AmarV4 — Video portfolio
									</div>
									<div className="mt-0.75 text-[13.5px] leading-[1.45] text-ink-muted">
										HLS pipeline + cross-player sync for a client launch.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-b border-rule-soft py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] tracking-[0.08em] text-ink-muted">
									/03
								</span>
								<div>
									<div className="font-display text-[18px] font-medium leading-[1.4] text-ink">
										School — SaaS
									</div>
									<div className="mt-0.75 text-[13.5px] leading-[1.45] text-ink-muted">
										School management app.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-b border-rule-soft py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] tracking-[0.08em] text-ink-muted">
									/04
								</span>
								<div>
									<div className="font-display text-[18px] font-medium leading-[1.4] text-ink">
										Portfolio V2 — this site
									</div>
									<div className="mt-0.75 text-[13.5px] leading-[1.45] text-ink-muted">
										An <em className="italic">&quot;Ask Parm&quot;</em> chatbot
										trained on every project here.
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div>
						<Kicker>Now learning</Kicker>
						<h3 className="mt-3.5 mb-4.5 font-display text-2xl font-semibold tracking-[-0.02em]">
							What I am{" "}
							<em className="italic font-medium text-accent">studying</em> this
							month.
						</h3>
						<ul className="list-none">
							<li className="flex items-start gap-3.5 border-b border-rule-soft py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] tracking-[0.08em] text-ink-muted">
									RAG
								</span>
								<div>
									<div className="font-display text-[18px] font-medium leading-[1.4] text-ink">
										Retrieval-augmented generation in production
									</div>
									<div className="mt-0.75 text-[13.5px] leading-[1.45] text-ink-muted">
										Upstash Vector + Voyage embeddings + Claude for citations.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-b border-rule-soft py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] tracking-[0.08em] text-ink-muted">
									DSA
								</span>
								<div>
									<div className="font-display text-[18px] font-medium leading-[1.4] text-ink">
										Striver A-to-Z (finally)
									</div>
									<div className="mt-0.75 text-[13.5px] leading-[1.45] text-ink-muted">
										For interview confidence, not for vibes.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-b border-rule-soft py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] tracking-[0.08em] text-ink-muted">
									TS
								</span>
								<div>
									<div className="font-display text-[18px] font-medium leading-[1.4] text-ink">
										Advanced generics &amp; utility types
									</div>
									<div className="mt-0.75 text-[13.5px] leading-[1.45] text-ink-muted">
										Pushing past "any-driven development" into proper inference.
									</div>
								</div>
							</li>
							<li className="flex items-start gap-3.5 border-b border-rule-soft py-3.5 last:border-b-0">
								<span className="w-10.5 shrink-0 pt-1 text-right font-mono text-[10.5px] tracking-[0.08em] text-ink-muted">
									Infra
								</span>
								<div>
									<div className="font-display text-[18px] font-medium leading-[1.4] text-ink">
										Monorepo patterns with Turborepo
									</div>
									<div className="mt-0.75 text-[13.5px] leading-[1.45] text-ink-muted">
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

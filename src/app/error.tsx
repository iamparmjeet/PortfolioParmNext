"use client";

import { useEffect } from "react";
import { Kicker } from "@/components/shared/kicker";

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Surface the failure; swap for a real reporter (Sentry, etc.) later.
		console.error(error);
	}, [error]);

	return (
		<section className="flex min-h-[70vh] items-center border-rule border-b py-24">
			<div className="mx-auto w-full max-w-295 px-8">
				<Kicker>Something broke</Kicker>
				<h1 className="mt-4 max-w-[16ch] font-display font-medium text-[clamp(48px,8vw,96px)] text-ink leading-[0.94] tracking-[-0.04em]">
					That did not <em className="text-accent italic">go to plan</em>.
				</h1>
				<p className="mt-5 max-w-[48ch] text-[15.5px] text-ink-soft leading-[1.6]">
					An unexpected error interrupted this page. You can try again, or head
					back home — your place isn&apos;t lost.
				</p>

				{error.digest && (
					<p className="mt-4 font-mono text-[11px] text-ink-muted tracking-[0.06em]">
						Reference: {error.digest}
					</p>
				)}

				<div className="mt-9 flex flex-wrap gap-3">
					<button
						type="button"
						onClick={reset}
						className="group inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.25 font-body font-medium text-[14.5px] text-ink transition-all duration-150 hover:bg-ink hover:text-paper"
					>
						Try again{" "}
						<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-0.75">
							↻
						</span>
					</button>
					<a
						href="/"
						className="inline-flex items-center rounded-full border border-rule px-6 py-3.25 font-body font-medium text-[14.5px] text-ink-soft no-underline transition-colors hover:border-accent hover:text-accent"
					>
						Back home
					</a>
				</div>
			</div>
		</section>
	);
}

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
		<section className="flex min-h-[70vh] items-center border-b border-rule py-24">
			<div className="mx-auto w-full max-w-295 px-8">
				<Kicker>Something broke</Kicker>
				<h1 className="mt-4 max-w-[16ch] font-display text-[clamp(48px,8vw,96px)] font-medium leading-[0.94] tracking-[-0.04em] text-ink">
					That did not <em className="italic text-accent">go to plan</em>.
				</h1>
				<p className="mt-5 max-w-[48ch] text-[15.5px] leading-[1.6] text-ink-soft">
					An unexpected error interrupted this page. You can try again, or head
					back home — your place isn&apos;t lost.
				</p>

				{error.digest && (
					<p className="mt-4 font-mono text-[11px] tracking-[0.06em] text-ink-muted">
						Reference: {error.digest}
					</p>
				)}

				<div className="mt-9 flex flex-wrap gap-3">
					<button
						type="button"
						onClick={reset}
						className="group inline-flex items-center gap-2 rounded-full border border-ink px-6 py-[13px] font-body text-[14.5px] font-medium text-ink transition-all duration-150 hover:bg-ink hover:text-paper"
					>
						Try again{" "}
						<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-[3px]">
							↻
						</span>
					</button>
					<a
						href="/"
						className="inline-flex items-center rounded-full border border-rule px-6 py-[13px] font-body text-[14.5px] font-medium text-ink-soft no-underline transition-colors hover:border-accent hover:text-accent"
					>
						Back home
					</a>
				</div>
			</div>
		</section>
	);
}

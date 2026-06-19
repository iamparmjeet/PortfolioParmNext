"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { type ReactNode, useEffect } from "react";

// ─── Initialise once ────

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		capture_pageview: false, // we handle this manually below
		capture_pageleave: true, // useful: knows when people bounce
		persistence: "localStorage",
	});
}

// ─── Page view tracker ────
// Separate component so it can use useSearchParams inside a Suspense boundary

function PostHogPageView() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const ph = usePostHog();

	useEffect(() => {
		if (!pathname || !ph) return;

		let url = window.location.origin + pathname;
		if (searchParams.toString()) {
			url += `?${searchParams.toString()}`;
		}

		ph.capture("$pageview", { $current_url: url });
	}, [pathname, searchParams, ph]);

	return null;
}

// ─── Provider ───

export function PostHogProvider({ children }: { children: ReactNode }) {
	return (
		<PHProvider client={posthog}>
			<PostHogPageView />
			{children}
		</PHProvider>
	);
}

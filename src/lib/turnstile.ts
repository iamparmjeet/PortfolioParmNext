// Canonical Cloudflare Turnstile server-side verification.
// Mirrors https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
// and the Spin skill's canonical siteverify idiom.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const CONTACT_TURNSTILE_ACTION = "contact";

export function getTurnstileSecret(): string | undefined {
	// Canonical env is TURNSTILE_SECRET; repo historically uses
	// TURNSTILE_SECRET_KEY — accept both, canonical first.
	const v = process.env.TURNSTILE_SECRET ?? process.env.TURNSTILE_SECRET_KEY;
	const trimmed = v?.trim();
	return trimmed ? trimmed : undefined;
}

export function getExpectedHostnames(): Set<string> {
	const raw = process.env.TURNSTILE_HOSTNAMES ?? "";
	return new Set(
		raw
			.split(",")
			.map((h) => h.trim())
			.filter(Boolean),
	);
}

type VerifySuccess = {
	success: true;
	action: string;
	hostname: string;
	cdata?: string;
};

type VerifyFailure = {
	success: false;
	"error-codes": string[];
};

type SiteverifyResult = VerifySuccess | VerifyFailure | Record<string, unknown>;

/**
 * Canonical siteverify. Returns true only when:
 *  - token is a non-empty string <= 2048 chars
 *  - the secret is configured (or, in non-production, skips openly)
 *  - expectedHostnames is non-empty
 *  - the siteverify response has success === true, matching action + hostname
 *
 * Callers should treat false as "forbidden" (403).
 */
export async function verifyTurnstileToken(
	token: unknown,
	remoteIp: string | null,
	expectedAction: string,
): Promise<boolean> {
	const secret = getTurnstileSecret();

	// No secret: dev bypass (loud), prod fail-closed.
	if (!secret) {
		if (process.env.NODE_ENV === "production") {
			console.error(
				"TURNSTILE_SECRET / TURNSTILE_SECRET_KEY is not set — rejecting in production.",
			);
			return false;
		}
		console.warn(
			"TURNSTILE_SECRET / TURNSTILE_SECRET_KEY is not set — skipping captcha check (dev only).",
		);
		return true;
	}

	const expectedHostnames = getExpectedHostnames();

	if (
		typeof token !== "string" ||
		token.length === 0 ||
		token.length > 2048 ||
		expectedHostnames.size === 0
	) {
		if (expectedHostnames.size === 0) {
			console.error(
				"TURNSTILE_HOSTNAMES is empty — set it to the deployment's frontend hostname(s) (e.g. parmjeetmishra.com).",
			);
		}
		return false;
	}

	let result: SiteverifyResult;
	try {
		const body = new URLSearchParams({
			secret,
			response: token,
		});
		if (remoteIp) body.set("remoteip", remoteIp);

		const res = await fetch(VERIFY_URL, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			signal: AbortSignal.timeout(10_000),
			body,
		});
		if (!res.ok) throw new Error(`siteverify ${res.status}`);
		result = (await res.json()) as SiteverifyResult;
	} catch {
		return false;
	}

	// Narrow the union: must be success + matching action + allowed hostname.
	if (
		!result ||
		typeof result !== "object" ||
		(result as { success?: unknown }).success !== true
	) {
		return false;
	}
	const r = result as VerifySuccess;
	if (r.action !== expectedAction) return false;
	if (!expectedHostnames.has(r.hostname)) return false;

	return true;
}

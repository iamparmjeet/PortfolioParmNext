// Best-effort client IP from proxy headers, shared by the rate-limited routes.
// Cloudflare's header is the most trustworthy when present; otherwise fall back
// to the first hop in x-forwarded-for. Returns null when neither is available
// so callers can decide their own fallback (a rate-limit key vs. Turnstile's
// optional remoteip want different things).
type HeaderCarrier = { headers: { get(name: string): string | null } };

export function clientIp(request: HeaderCarrier): string | null {
	const cf = request.headers.get("cf-connecting-ip");
	if (cf) {
		return cf;
	}
	const forwarded = request.headers
		.get("x-forwarded-for")
		?.split(",")[0]
		?.trim();
	return forwarded || null;
}

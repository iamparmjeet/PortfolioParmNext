import { type NextRequest, NextResponse } from "next/server";

import { contactSchema, HONEYPOT_FIELD, MIN_SUBMIT_MS } from "@/lib/contact";
import { contactRatelimit } from "@/lib/ratelimit";
import { clientIp } from "@/lib/request-ip";

const TURNSTILE_VERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(token: string, ip: string | null) {
	const secret = process.env.TURNSTILE_SECRET_KEY;

	// No secret configured (e.g. local dev) → skip verification rather than
	// hard-fail, but make the gap loud in the logs.
	if (!secret) {
		console.warn("TURNSTILE_SECRET_KEY is not set — skipping captcha check.");
		return true;
	}

	if (!token) {
		return false;
	}

	const body = new URLSearchParams({ secret, response: token });
	if (ip) {
		body.append("remoteip", ip);
	}

	try {
		const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
		const data = (await res.json()) as { success: boolean };
		return data.success === true;
	} catch {
		return false;
	}
}

export async function POST(request: NextRequest) {
	let payload: Record<string, unknown>;
	try {
		payload = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 });
	}

	// 1. Honeypot — bots fill the hidden field; humans can't. Pretend success
	//    so we never tell the bot why it failed.
	if (typeof payload[HONEYPOT_FIELD] === "string" && payload[HONEYPOT_FIELD]) {
		return NextResponse.json({ ok: true });
	}

	// 2. Timing gate — anything submitted implausibly fast is almost certainly
	//    automated. Same silent-success treatment.
	const elapsedMs = Number(payload.elapsedMs);
	if (Number.isFinite(elapsedMs) && elapsedMs < MIN_SUBMIT_MS) {
		return NextResponse.json({ ok: true });
	}

	// 3. Rate-limit per IP — before the captcha (an external call) and delivery.
	//    Fail CLOSED: if Upstash is unreachable, refuse rather than leave the
	//    endpoint uncapped. (Skipped entirely when Upstash isn't configured.)
	const ip = clientIp(request);
	if (contactRatelimit) {
		try {
			const { success } = await contactRatelimit.limit(ip ?? "anonymous");
			if (!success) {
				return NextResponse.json(
					{ error: "Too many submissions — please try again later." },
					{ status: 429 },
				);
			}
		} catch (err) {
			console.error("Contact rate-limit check failed:", err);
			return NextResponse.json(
				{ error: "The form is briefly unavailable — please try again soon." },
				{ status: 503 },
			);
		}
	} else {
		console.warn("Upstash not configured — contact rate limiting is disabled.");
	}

	// 4. Captcha — verify the Turnstile token server-side.
	const human = await verifyTurnstile(String(payload.turnstileToken ?? ""), ip);
	if (!human) {
		return NextResponse.json(
			{ error: "Captcha verification failed. Please try again." },
			{ status: 400 },
		);
	}

	// 5. Re-validate the actual fields server-side — never trust the client.
	const result = contactSchema.safeParse(payload);
	if (!result.success) {
		return NextResponse.json(
			{ error: "Some fields look invalid." },
			{ status: 422 },
		);
	}

	// TODO: deliver the message (Resend, email, DB, Slack…).
	console.info("Contact submission:", result.data);

	return NextResponse.json({ ok: true });
}

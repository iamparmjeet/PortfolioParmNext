import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema, HONEYPOT_FIELD, MIN_SUBMIT_MS } from "@/lib/contact";
import {
	renderOwnerNotificationHtml,
	renderSenderConfirmationHtml,
} from "@/lib/email-templates";
import { contactRatelimit } from "@/lib/ratelimit";
import { clientIp } from "@/lib/request-ip";
import {
	CONTACT_TURNSTILE_ACTION,
	verifyTurnstileToken,
} from "@/lib/turnstile";

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

	// 4. Captcha — verify the Turnstile token server-side via canonical
	// siteverify (success + action + hostname). See src/lib/turnstile.ts.
	const human = await verifyTurnstileToken(
		payload.turnstileToken,
		ip,
		CONTACT_TURNSTILE_ACTION,
	);
	if (!human) {
		return NextResponse.json(
			{ error: "Captcha verification failed. Please try again." },
			{ status: 403 },
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

	const data = result.data;
	const apiKey = process.env.RESEND_API_KEY;
	const recipientEmail =
		process.env.CONTACT_EMAIL || "iamparmjeetmishra@gmail.com";

	if (apiKey) {
		const resend = new Resend(apiKey);
		const fromEmail =
			process.env.RESEND_FROM_EMAIL ||
			"Portfolio Contact <onboarding@resend.dev>";
		const senderReplyFrom =
			process.env.RESEND_FROM_EMAIL ||
			"Parmjeet Mishra <onboarding@resend.dev>";

		const plainText = [
			`Name: ${data.name}`,
			`Email: ${data.email}`,
			`Inquiry Type: ${data.inquiryType}`,
			data.company ? `Company: ${data.company}` : null,
			`\nMessage:\n${data.message}`,
		]
			.filter(Boolean)
			.join("\n");

		// 1. Deliver notification to site owner
		const { error: ownerError } = await resend.emails.send({
			from: fromEmail,
			to: recipientEmail,
			subject: `New inquiry from ${data.name} [${data.inquiryType}]`,
			text: plainText,
			html: renderOwnerNotificationHtml(data),
			replyTo: data.email,
		});

		if (ownerError) {
			console.error("Resend delivery failed:", ownerError);
			return NextResponse.json(
				{ error: "Failed to send your message. Please try again later." },
				{ status: 500 },
			);
		}

		// 2. Send confirmation to sender (safe try/catch so sandbox limits don't fail the submission)
		try {
			await resend.emails.send({
				from: senderReplyFrom,
				to: data.email,
				subject: "Thanks for reaching out — Parmjeet Mishra",
				text: `Hi ${data.name},\n\nThank you for reaching out! I've received your message regarding "${data.inquiryType}" and will get back to you within 4–8 hours.\n\nBest,\nParmjeet Mishra\nhttps://parmjeetmishra.com`,
				html: renderSenderConfirmationHtml(data),
			});
		} catch (senderErr) {
			console.warn(
				"Sender confirmation auto-reply skipped or failed:",
				senderErr,
			);
		}
	} else {
		console.warn(
			"RESEND_API_KEY is not set — message was not delivered via email.",
		);
	}

	console.info("Contact submission processed:", result.data);

	return NextResponse.json({ ok: true });
}

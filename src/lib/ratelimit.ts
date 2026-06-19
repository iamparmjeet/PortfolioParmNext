import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// The chat endpoint calls a paid API, so it must be rate-limited per IP.
// If Upstash isn't configured (e.g. local dev), we skip limiting rather than
// hard-fail — the gap is made loud in the route handler's logs.
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const askParmRatelimit =
	url && token
		? new Ratelimit({
				redis: new Redis({ url, token }),
				// 8 messages per minute per IP, plus a daily ceiling below.
				limiter: Ratelimit.slidingWindow(8, "60 s"),
				prefix: "ratelimit:ask-parm",
				analytics: false,
			})
		: null;

export const askParmDailyRatelimit =
	url && token
		? new Ratelimit({
				redis: new Redis({ url, token }),
				limiter: Ratelimit.slidingWindow(60, "1 d"),
				prefix: "ratelimit:ask-parm:daily",
				analytics: false,
			})
		: null;

// The contact endpoint verifies a captcha (an external call) and will deliver
// messages, so it's rate-limited per IP too. 5 submissions per 10 minutes is
// generous for a human and caps spam/cost. Same fail-closed treatment as chat.
export const contactRatelimit =
	url && token
		? new Ratelimit({
				redis: new Redis({ url, token }),
				limiter: Ratelimit.slidingWindow(5, "10 m"),
				prefix: "ratelimit:contact",
				analytics: false,
			})
		: null;

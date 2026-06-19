import { describe, expect, it } from "vitest";
import { clientIp } from "./request-ip";

// Minimal stand-in for the parts of NextRequest that clientIp reads.
function req(headers: Record<string, string>) {
	return {
		headers: {
			get: (name: string) => headers[name.toLowerCase()] ?? null,
		},
	};
}

describe("clientIp", () => {
	it("prefers cf-connecting-ip", () => {
		expect(
			clientIp(
				req({ "cf-connecting-ip": "1.1.1.1", "x-forwarded-for": "2.2.2.2" }),
			),
		).toBe("1.1.1.1");
	});

	it("falls back to the first hop of x-forwarded-for", () => {
		expect(clientIp(req({ "x-forwarded-for": "3.3.3.3, 4.4.4.4" }))).toBe(
			"3.3.3.3",
		);
	});

	it("trims whitespace from the forwarded value", () => {
		expect(clientIp(req({ "x-forwarded-for": "  5.5.5.5 , 6.6.6.6" }))).toBe(
			"5.5.5.5",
		);
	});

	it("returns null when no IP headers are present", () => {
		expect(clientIp(req({}))).toBeNull();
	});

	it("returns null for an empty x-forwarded-for", () => {
		expect(clientIp(req({ "x-forwarded-for": "" }))).toBeNull();
	});
});

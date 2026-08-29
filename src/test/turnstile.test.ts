import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	CONTACT_TURNSTILE_ACTION,
	getExpectedHostnames,
	getTurnstileSecret,
	verifyTurnstileToken,
} from "../lib/turnstile";

describe("turnstile verification", () => {
	const originalEnv = process.env;
	const originalFetch = globalThis.fetch;

	beforeEach(() => {
		process.env = { ...originalEnv };
		globalThis.fetch = originalFetch;
		vi.restoreAllMocks();
	});

	afterEach(() => {
		process.env = originalEnv;
		globalThis.fetch = originalFetch;
	});

	it("resolves secret prioritizing TURNSTILE_SECRET over TURNSTILE_SECRET_KEY", () => {
		process.env.TURNSTILE_SECRET = "sec-canonical";
		process.env.TURNSTILE_SECRET_KEY = "sec-legacy";
		expect(getTurnstileSecret()).toBe("sec-canonical");

		delete process.env.TURNSTILE_SECRET;
		expect(getTurnstileSecret()).toBe("sec-legacy");
	});

	it("parses expected hostnames correctly", () => {
		process.env.TURNSTILE_HOSTNAMES =
			" localhost, 127.0.0.1 , parmjeetmishra.com ";
		const hostnames = getExpectedHostnames();
		expect(hostnames.has("localhost")).toBe(true);
		expect(hostnames.has("127.0.0.1")).toBe(true);
		expect(hostnames.has("parmjeetmishra.com")).toBe(true);
		expect(hostnames.size).toBe(3);
	});

	it("allows bypass in non-production when secret is missing", async () => {
		(process.env as Record<string, string | undefined>).NODE_ENV = "test";
		delete process.env.TURNSTILE_SECRET;
		delete process.env.TURNSTILE_SECRET_KEY;

		const result = await verifyTurnstileToken(
			"any-token",
			"127.0.0.1",
			CONTACT_TURNSTILE_ACTION,
		);
		expect(result).toBe(true);
	});

	it("fails closed in production when secret is missing", async () => {
		(process.env as Record<string, string | undefined>).NODE_ENV = "production";
		delete process.env.TURNSTILE_SECRET;
		delete process.env.TURNSTILE_SECRET_KEY;

		const result = await verifyTurnstileToken(
			"any-token",
			"127.0.0.1",
			CONTACT_TURNSTILE_ACTION,
		);
		expect(result).toBe(false);
	});

	it("fails when token is empty or invalid type", async () => {
		process.env.TURNSTILE_SECRET = "test-secret";
		process.env.TURNSTILE_HOSTNAMES = "localhost";

		expect(
			await verifyTurnstileToken("", "127.0.0.1", CONTACT_TURNSTILE_ACTION),
		).toBe(false);
		expect(
			await verifyTurnstileToken(null, "127.0.0.1", CONTACT_TURNSTILE_ACTION),
		).toBe(false);
		expect(
			await verifyTurnstileToken(
				"a".repeat(2049),
				"127.0.0.1",
				CONTACT_TURNSTILE_ACTION,
			),
		).toBe(false);
	});

	it("verifies valid siteverify response with expected action and hostname", async () => {
		process.env.TURNSTILE_SECRET = "test-secret";
		process.env.TURNSTILE_HOSTNAMES = "parmjeetmishra.com,localhost";

		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				success: true,
				action: CONTACT_TURNSTILE_ACTION,
				hostname: "parmjeetmishra.com",
			}),
		});
		globalThis.fetch = fetchMock as unknown as typeof fetch;

		const result = await verifyTurnstileToken(
			"valid-token",
			"1.2.3.4",
			CONTACT_TURNSTILE_ACTION,
		);

		expect(result).toBe(true);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it("rejects when action or hostname does not match", async () => {
		process.env.TURNSTILE_SECRET = "test-secret";
		process.env.TURNSTILE_HOSTNAMES = "parmjeetmishra.com";

		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				success: true,
				action: "wrong-action",
				hostname: "parmjeetmishra.com",
			}),
		});
		globalThis.fetch = fetchMock as unknown as typeof fetch;

		const result = await verifyTurnstileToken(
			"valid-token",
			"1.2.3.4",
			CONTACT_TURNSTILE_ACTION,
		);
		expect(result).toBe(false);
	});
});

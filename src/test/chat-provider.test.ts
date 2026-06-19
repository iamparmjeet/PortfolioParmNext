import { describe, expect, it } from "vitest";
import { resolveChatProvider } from "../lib/chat-provider";

describe("resolveChatProvider", () => {
	it("returns null when nothing is configured", () => {
		expect(resolveChatProvider({})).toBeNull();
	});

	it("auto-detects OpenRouter when only its key is set", () => {
		const cfg = resolveChatProvider({ OPENROUTER_API_KEY: "or-key" });
		expect(cfg).toMatchObject({
			provider: "openrouter",
			apiKey: "or-key",
			baseURL: "https://openrouter.ai/api/v1",
		});
		expect(cfg?.model).toContain("llama");
	});

	it("auto-detects Fireworks when only its key is set", () => {
		const cfg = resolveChatProvider({ FIREWORKS_API_KEY: "fw-key" });
		expect(cfg).toMatchObject({
			provider: "fireworks",
			apiKey: "fw-key",
			baseURL: "https://api.fireworks.ai/inference/v1",
		});
	});

	it("prefers OpenRouter when both keys are set and no provider is requested", () => {
		const cfg = resolveChatProvider({
			OPENROUTER_API_KEY: "or-key",
			FIREWORKS_API_KEY: "fw-key",
		});
		expect(cfg?.provider).toBe("openrouter");
	});

	it("honours an explicit CHAT_PROVIDER selection", () => {
		const cfg = resolveChatProvider({
			CHAT_PROVIDER: "fireworks",
			OPENROUTER_API_KEY: "or-key",
			FIREWORKS_API_KEY: "fw-key",
		});
		expect(cfg?.provider).toBe("fireworks");
	});

	it("is case-insensitive about CHAT_PROVIDER", () => {
		const cfg = resolveChatProvider({
			CHAT_PROVIDER: " FireWorks ",
			FIREWORKS_API_KEY: "fw-key",
		});
		expect(cfg?.provider).toBe("fireworks");
	});

	it("returns null when the requested provider has no key (no silent fallback)", () => {
		const cfg = resolveChatProvider({
			CHAT_PROVIDER: "fireworks",
			OPENROUTER_API_KEY: "or-key",
		});
		expect(cfg).toBeNull();
	});

	it("falls back to auto-detect when CHAT_PROVIDER is unknown", () => {
		const cfg = resolveChatProvider({
			CHAT_PROVIDER: "anthropic",
			OPENROUTER_API_KEY: "or-key",
		});
		expect(cfg?.provider).toBe("openrouter");
	});

	it("uses the per-provider model override when set", () => {
		const cfg = resolveChatProvider({
			OPENROUTER_API_KEY: "or-key",
			OPENROUTER_MODEL: "google/gemini-2.5-flash",
		});
		expect(cfg?.model).toBe("google/gemini-2.5-flash");
	});

	it("ignores a blank model override and keeps the default", () => {
		const cfg = resolveChatProvider({
			OPENROUTER_API_KEY: "or-key",
			OPENROUTER_MODEL: "   ",
		});
		expect(cfg?.model).toContain("llama");
	});

	it("never defaults to an Anthropic model", () => {
		const or = resolveChatProvider({ OPENROUTER_API_KEY: "x" });
		const fw = resolveChatProvider({ FIREWORKS_API_KEY: "x" });
		expect(or?.model).not.toContain("anthropic");
		expect(fw?.model).not.toContain("anthropic");
	});
});

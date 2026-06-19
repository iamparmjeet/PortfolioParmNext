import { describe, expect, it } from "vitest";
import { contactDefaults, contactSchema, INQUIRY_TYPES } from "../lib/contact";

const valid = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	inquiryType: "Freelance project",
	company: "Analytical Engines Ltd",
	message: "I'd love to talk about a project that needs a frontend specialist.",
};

describe("contactSchema", () => {
	it("accepts a well-formed submission", () => {
		expect(contactSchema.safeParse(valid).success).toBe(true);
	});

	it("treats company as optional", () => {
		const { company: _company, ...withoutCompany } = valid;
		expect(contactSchema.safeParse(withoutCompany).success).toBe(true);
	});

	it("trims surrounding whitespace on the name", () => {
		const result = contactSchema.parse({ ...valid, name: "  Ada  " });
		expect(result.name).toBe("Ada");
	});

	it("rejects a name shorter than 2 characters", () => {
		expect(contactSchema.safeParse({ ...valid, name: "A" }).success).toBe(
			false,
		);
	});

	it("rejects an invalid email", () => {
		expect(
			contactSchema.safeParse({ ...valid, email: "not-an-email" }).success,
		).toBe(false);
	});

	it("rejects an inquiry type outside the allowed set", () => {
		expect(
			contactSchema.safeParse({ ...valid, inquiryType: "Spam" }).success,
		).toBe(false);
	});

	it("rejects a message shorter than 20 characters", () => {
		expect(
			contactSchema.safeParse({ ...valid, message: "too short" }).success,
		).toBe(false);
	});

	it("rejects a message longer than 2000 characters", () => {
		expect(
			contactSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success,
		).toBe(false);
	});

	it("ships defaults that satisfy the inquiry-type enum", () => {
		expect(INQUIRY_TYPES).toContain(contactDefaults.inquiryType);
	});
});

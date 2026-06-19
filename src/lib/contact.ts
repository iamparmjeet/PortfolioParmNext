import { z } from "zod";

// Anti-spam knobs shared between the form and the route handler.
// The honeypot is a hidden field real users never see or fill; the
// timing gate rejects submissions faster than a human could plausibly type.
export const HONEYPOT_FIELD = "company_url";
export const MIN_SUBMIT_MS = 2500;

export const INQUIRY_TYPES = [
	"Full-time role",
	"Freelance project",
	"Collaboration",
	"Just saying hi",
] as const;

export const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Please tell me your name.")
		.max(80, "That name is a little too long."),
	email: z.email("Enter a valid email address."),
	inquiryType: z.enum(INQUIRY_TYPES, {
		error: "Pick what this is about.",
	}),
	company: z
		.string()
		.trim()
		.max(120, "Keep it under 120 characters.")
		.optional(),
	message: z
		.string()
		.trim()
		.min(20, "A few more words, please (min 20 characters).")
		.max(2000, "Let us keep it under 2000 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const contactDefaults: ContactValues = {
	name: "",
	email: "",
	inquiryType: "Full-time role",
	company: "",
	message: "",
};

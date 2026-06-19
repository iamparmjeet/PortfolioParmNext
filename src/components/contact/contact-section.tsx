import { ContactForm } from "./contact-form";

export function ContactSection() {
	return (
		<div className="rounded-2xl border border-rule bg-paper/60 p-6 sm:p-8">
			<h3 className="mb-1.5 font-display font-semibold text-2xl tracking-[-0.02em]">
				Send a <em className="text-accent italic">message</em>
			</h3>
			<p className="mb-7 max-w-[48ch] text-ink-soft text-sm leading-[1.55]">
				Tell me what you are building or hiring for. No template required — a
				few honest lines is plenty.
			</p>
			<ContactForm />
		</div>
	);
}

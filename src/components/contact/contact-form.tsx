"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { IconCheck, IconChevronDown, IconSend } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	type ContactValues,
	contactDefaults,
	contactSchema,
	HONEYPOT_FIELD,
	INQUIRY_TYPES,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const controlClass =
	"h-11 rounded-[10px] bg-paper px-3.5 text-[15px] text-ink placeholder:text-ink-muted";

const labelClass = "font-body text-sm font-semibold text-ink";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
	const [submitted, setSubmitted] = useState(false);
	const [token, setToken] = useState("");
	const [serverError, setServerError] = useState<string | null>(null);

	const mountedAtRef = useRef(Date.now());
	const honeypotRef = useRef<HTMLInputElement>(null);
	const turnstileRef = useRef<TurnstileInstance>(null);

	const form = useForm({
		defaultValues: contactDefaults,
		// Zod v4 schemas are Standard Schema compliant — TanStack Form
		// validates against them directly, fully type-safe.
		validators: {
			onChange: contactSchema,
			onSubmit: contactSchema,
		},
		onSubmit: async ({ value }) => {
			setServerError(null);
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					...value,
					[HONEYPOT_FIELD]: honeypotRef.current?.value ?? "",
					elapsedMs: Date.now() - mountedAtRef.current,
					turnstileToken: token,
				}),
			});

			if (!res.ok) {
				const data = (await res.json().catch(() => null)) as {
					error?: string;
				} | null;
				setServerError(
					data?.error ?? "Something went wrong. Please try again."
				);
				turnstileRef.current?.reset();
				setToken("");
				return;
			}

			setSubmitted(true);
		},
	});

	if (submitted) {
		return (
			<div className="flex flex-col items-start gap-3 rounded-[14px] border border-accent border-l-4 bg-paper p-8">
				<div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-tint text-accent">
					<IconCheck size={22} stroke={2.2} />
				</div>
				<h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
					Message sent — thank you.
				</h3>
				<p className="max-w-[42ch] text-[15px] leading-[1.55] text-ink-soft">
					I typically reply within 4–8 hours on weekdays (IST). Watch your inbox
					— and check spam just in case.
				</p>
				<Button
					variant="outline"
					className="mt-1 h-10 rounded-[10px] px-4 text-sm"
					onClick={() => {
						form.reset();
						setToken("");
						setServerError(null);
						mountedAtRef.current = Date.now();
						setSubmitted(false);
					}}
				>
					Send another message
				</Button>
			</div>
		);
	}

	return (
		<form
			noValidate
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<form.Field name="name">
						{(field) => {
							const invalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={invalid}>
									<FieldLabel htmlFor={field.name} className={labelClass}>
										Name
									</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										placeholder="Jane Developer"
										autoComplete="name"
										aria-invalid={invalid}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className={controlClass}
									/>
									{invalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>

					<form.Field name="email">
						{(field) => {
							const invalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={invalid}>
									<FieldLabel htmlFor={field.name} className={labelClass}>
										Email
									</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										type="email"
										inputMode="email"
										value={field.state.value}
										placeholder="you@company.com"
										autoComplete="email"
										aria-invalid={invalid}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className={controlClass}
									/>
									{invalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<form.Field name="inquiryType">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name} className={labelClass}>
									What is this about?
								</FieldLabel>
								<div className="relative">
									<select
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) =>
											field.handleChange(
												e.target.value as ContactValues["inquiryType"]
											)
										}
										className={cn(
											controlClass,
											"w-full appearance-none border border-input pr-10 outline-none transition-colors focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/40"
										)}
									>
										{INQUIRY_TYPES.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
									<IconChevronDown
										size={18}
										className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-muted"
									/>
								</div>
							</Field>
						)}
					</form.Field>

					<form.Field name="company">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name} className={labelClass}>
									Company{" "}
									<span className="font-normal text-ink-muted">— optional</span>
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value ?? ""}
									placeholder="Where you work"
									autoComplete="organization"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									className={controlClass}
								/>
							</Field>
						)}
					</form.Field>
				</div>

				<form.Field name="message">
					{(field) => {
						const invalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={invalid}>
								<FieldLabel htmlFor={field.name} className={labelClass}>
									Message
								</FieldLabel>
								<Textarea
									id={field.name}
									name={field.name}
									rows={6}
									value={field.state.value}
									placeholder="A line about the role, project, timeline, or whatever is on your mind…"
									aria-invalid={invalid}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									className={cn(controlClass, "h-auto py-3 leading-[1.55]")}
								/>
								{invalid ? (
									<FieldError errors={field.state.meta.errors} />
								) : (
									<FieldDescription>
										The more context you give, the faster I can reply.
									</FieldDescription>
								)}
							</Field>
						);
					}}
				</form.Field>

				{/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
				<div
					aria-hidden="true"
					className="-left-[9999px] absolute h-0 w-0 overflow-hidden"
				>
					<label htmlFor={HONEYPOT_FIELD}>
						Company URL
						<input
							ref={honeypotRef}
							id={HONEYPOT_FIELD}
							name={HONEYPOT_FIELD}
							type="text"
							tabIndex={-1}
							autoComplete="off"
						/>
					</label>
				</div>

				{TURNSTILE_SITE_KEY && (
					<Turnstile
						ref={turnstileRef}
						siteKey={TURNSTILE_SITE_KEY}
						options={{ theme: "auto", size: "flexible" }}
						onSuccess={setToken}
						onError={() => setToken("")}
						onExpire={() => setToken("")}
					/>
				)}

				{serverError && (
					<p className="text-sm text-destructive" role="alert">
						{serverError}
					</p>
				)}

				<form.Subscribe
					selector={(state) => ({
						canSubmit: state.canSubmit,
						isSubmitting: state.isSubmitting,
					})}
				>
					{({ canSubmit, isSubmitting }) => {
						const captchaReady = !TURNSTILE_SITE_KEY || token.length > 0;
						return (
							<Button
								type="submit"
								disabled={!canSubmit || isSubmitting || !captchaReady}
								className="h-12 w-full rounded-[10px] text-sm font-semibold sm:w-auto sm:px-7"
							>
								{isSubmitting ? (
									"Sending…"
								) : (
									<>
										Send message
										<IconSend size={16} stroke={2} />
									</>
								)}
							</Button>
						);
					}}
				</form.Subscribe>
			</FieldGroup>
		</form>
	);
}

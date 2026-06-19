"use client";

const items = [
	{ text: "React 19", alt: false },
	{ text: "Next.js 15", alt: false },
	{ text: "TypeScript", alt: false },
	{ text: "Tailwind", alt: false },
	{ text: "Hono", alt: true },
	{ text: "Drizzle ORM", alt: true },
	{ text: "PostgreSQL", alt: true },
	{ text: "Better Auth", alt: true },
	{ text: "BullMQ", alt: true },
	{ text: "FFmpeg · HLS", alt: false, italic: true },
	{ text: "Claude API", alt: false, italic: true },
	{ text: "Vercel AI SDK", alt: false, italic: true },
	{ text: "RAG", alt: false, italic: true },
	{ text: "Upstash Vector", alt: false },
	{ text: "TanStack Query", alt: false },
	{ text: "Zod", alt: false },
	{ text: "Docker", alt: false },
	{ text: "Cloudflare R2", alt: false },
];

export function Ticker() {
	return (
		<div
			className="overflow-hidden border-ink border-y bg-paper py-4.5"
			aria-hidden="true"
		>
			<div className="flex w-max animate-[tk_42s_linear_infinite]">
				{[1, 2].map((k) =>
					items.flatMap((item) => [
						<span
							key={`${k}-${item.text}`}
							className={`whitespace-nowrap px-4.5 font-display font-medium text-[22px] tracking-[-0.01em] ${
								item.alt ? "text-secondary" : "text-ink"
							}`}
						>
							{item.italic ? (
								<em className="text-accent italic">{item.text}</em>
							) : (
								item.text
							)}
						</span>,
						<span
							key={`${k}-${item.text}-d`}
							className="px-1 font-display text-[22px] text-ink-muted italic"
						>
							·
						</span>,
					]),
				)}
			</div>
		</div>
	);
}

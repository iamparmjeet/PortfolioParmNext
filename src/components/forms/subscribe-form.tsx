export function SubscribeForm() {
	return (
		<div className="flex w-full shrink-0 gap-2 md:w-auto">
			<input
				className="w-full flex-1 rounded-full border border-rule bg-bg px-4.5 py-2.5 font-body text-[13.5px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-accent md:w-50 md:flex-none"
				type="email"
				placeholder="you@email.com"
			/>
			<button
				type="button"
				className="whitespace-nowrap rounded-full bg-accent px-5 py-2.5 font-body font-semibold text-[13.5px] text-paper transition-opacity hover:opacity-85"
			>
				Subscribe →
			</button>
		</div>
	);
}

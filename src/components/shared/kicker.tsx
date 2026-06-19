import { cn } from "@/lib/utils";

export function Kicker({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent",
				className
			)}
		>
			<span aria-hidden className="font-display text-sm italic text-ink-muted">
				❡
			</span>
			{children}
		</span>
	);
}

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
				"inline-flex items-center gap-2 font-medium font-mono text-[11px] text-accent uppercase tracking-[0.16em]",
				className,
			)}
		>
			<span aria-hidden className="font-display text-ink-muted text-sm italic">
				❡
			</span>
			{children}
		</span>
	);
}

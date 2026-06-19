import { skills } from "@/constants";

export function ResumeSkills({ secLabel }: { secLabel: string }) {
	return (
		<div className="mb-8 print:mb-3">
			<div className={secLabel}>Technical Skills</div>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4 print:gap-2">
				{skills.map((group) => (
					<div
						key={group.label}
						className="rounded-[10px] border border-rule bg-paper p-4 print:break-inside-avoid print:rounded-md print:p-2"
					>
						<div className="mb-2.5 font-mono font-semibold text-[9.5px] text-accent uppercase tracking-[0.12em] print:mb-1.5 print:text-[8.5px]">
							{group.label}
						</div>
						<div className="flex flex-col gap-1 print:gap-0.5">
							{group.items.map((item) => (
								<div
									key={item.name}
									className={`flex items-center gap-1.75 text-[13px] before:size-1 before:shrink-0 before:rounded-full print:text-[10px] ${
										item.hot
											? "font-medium text-ink before:bg-accent"
											: "text-ink-soft before:bg-rule"
									}`}
								>
									{item.name}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

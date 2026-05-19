"use client";

import { useRef } from "react";
import { motion, useInView } from "@/components/shared/motion-wrapper";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
	children,
	className,
	delay,
	direction = "up",
}: AnimatedSectionProps) {
	const ref = useRef<HTMLDivElement>(null);

	const isInView = useInView(ref, {
		once: true,
		margin: "-100px",
	});

	const directionMap = {
		up: { y: 40, x: 0 },
		down: { y: -40, x: 0 },
		left: { y: 0, x: 40 },
		right: { y: 0, x: -40 },
		none: { y: 0, x: 0 },
	};

	const initial = {
		opacity: 0,
		...directionMap[direction],
	};

	return (
		<motion.div
			ref={ref}
			initial={initial}
			animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
			transition={{
				duration: 0.6,
				delay,
				ease: [0.21, 0.47, 0.32, 0.98],
			}}
			className={cn(className)}
		>
			{children}
		</motion.div>
	);
}

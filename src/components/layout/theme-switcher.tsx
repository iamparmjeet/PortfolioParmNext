"use client";

import { IconPalette } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_PALETTE, PALETTES, type PaletteDef } from "@/constants/themes";
import { cn } from "@/lib/utils";

const GROUPS: PaletteDef["group"][] = ["Light", "In-between", "Dark"];

type ViewTransitionDocument = Document & {
	startViewTransition?: (cb: () => void) => {
		ready: Promise<void>;
		finished: Promise<void>;
	};
};

// "circle" grows from the click point and needs runtime coordinates, so it is
// driven in JS. The rest are pure CSS keyframes keyed off the data attribute
// set on <html> (see globals.css).
const ANIMATIONS = ["circle", "wipe", "blur", "slide"] as const;

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [open, setOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const lastAnim = useRef<string>("");

	// Swap the palette with a randomly chosen reveal animation, avoiding an
	// immediate repeat. Falls back to an instant swap when View Transitions are
	// unsupported or the user prefers reduced motion.
	function changeTheme(id: string, event: React.MouseEvent) {
		setOpen(false);

		const doc = document as ViewTransitionDocument;
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		if (!doc.startViewTransition || reduceMotion) {
			setTheme(id);
			return;
		}

		const choices = ANIMATIONS.filter((a) => a !== lastAnim.current);
		const anim = choices[Math.floor(Math.random() * choices.length)];
		lastAnim.current = anim;

		const root = document.documentElement;
		root.dataset.themeAnim = anim;

		const x = event.clientX;
		const y = event.clientY;

		const transition = doc.startViewTransition(() => setTheme(id));

		if (anim === "circle") {
			const endRadius = Math.hypot(
				Math.max(x, window.innerWidth - x),
				Math.max(y, window.innerHeight - y)
			);
			transition.ready.then(() => {
				root.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${endRadius}px at ${x}px ${y}px)`,
						],
					},
					{
						duration: 480,
						easing: "ease-in-out",
						pseudoElement: "::view-transition-new(root)",
					}
				);
			});
		}

		transition.finished.finally(() => {
			delete root.dataset.themeAnim;
		});
	}

	// next-themes only knows the active theme after hydration; render a stable
	// placeholder until then to avoid a swatch mismatch.
	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!open) return;
		function onPointerDown(e: PointerEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const active = (mounted && theme) || DEFAULT_PALETTE;
	const current = PALETTES.find((p) => p.id === active) ?? PALETTES[0];

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-label="Change color theme"
				aria-haspopup="menu"
				aria-expanded={open}
				className="flex size-9 items-center justify-center rounded-full border border-rule text-ink-soft transition-colors hover:border-accent hover:text-accent"
			>
				<IconPalette size={18} stroke={1.8} />
			</button>

			{open && (
				<div
					role="menu"
					className="absolute right-0 top-11 z-50 w-56 rounded-[14px] border border-rule bg-paper p-3 shadow-lg"
				>
					<div className="mb-2 flex items-center justify-between px-1">
						<span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
							Theme
						</span>
						<span className="font-mono text-[10px] text-ink-muted">
							{current.label}
						</span>
					</div>

					{GROUPS.map((group) => (
						<div key={group} className="mb-1.5 last:mb-0">
							<div className="px-1 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
								{group}
							</div>
							<div className="grid grid-cols-3 gap-1.5">
								{PALETTES.filter((p) => p.group === group).map((p) => {
									const isActive = p.id === active;
									return (
										<button
											key={p.id}
											type="button"
											role="menuitemradio"
											aria-checked={isActive}
											title={p.label}
											onClick={(e) => changeTheme(p.id, e)}
											className={cn(
												"flex flex-col items-center gap-1 rounded-[9px] border px-1 py-1.5 transition-colors",
												isActive
													? "border-accent bg-accent-tint"
													: "border-transparent hover:border-rule"
											)}
										>
											<span
												className="size-4 rounded-full border border-black/10"
												style={{ background: p.swatch }}
											/>
											<span className="font-mono text-[9px] text-ink-soft">
												{p.label}
											</span>
										</button>
									);
								})}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

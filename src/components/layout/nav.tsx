"use client";
import { IconMenuDeep, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Logo } from "@/components/logos";
import { NAVLINKS } from "@/constants/nav";
import { Button } from "../ui/button";

export default function Nav() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	// Prevent scroll
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<nav className="sticky top-0 z-50 border-b border-rule bg-nav-bg backdrop-blur-[10px] backdrop-saturate-150 print:hidden">
			<div className="mx-auto flex max-w-295 items-center justify-between gap-6 px-8 py-3.5">
				<Link href="/" className="cursor-pointer items-center text-ink">
					<Logo variant="cutp" size={26} />
				</Link>
				{/* Desktop Nav*/}
				<ul className="hidden items-center gap-0.5 md:flex">
					{NAVLINKS.map((l) => (
						<li key={l.href}>
							<NavLink link={l} pathname={pathname} />
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2.5">
					<span className="hidden items-center gap-1.5 text-xs font-mono leading-5 font-medium uppercase text-accent bg-accent-tint py-1.5 px-3 rounded-full border border-accent sm:inline-flex">
						<span className="bg-accent size-1.5 rounded-full animate-pulse " />
						Open to work
					</span>
					<ThemeSwitcher />
					{/* Mobile Nav*/}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setOpen(!open)}
							aria-label={open ? "Close menu" : "Open menu"}
							aria-expanded={open}
							className="size-10 rounded-full text-ink hover:bg-black/4"
						>
							{open ? <IconX size={24} /> : <IconMenuDeep size={24} />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			{open && (
				<div className="md:hidden">
					{/* Backdrop */}
					<div
						className="fixed inset-0 top-14.25 bg-black/20 backdrop-blur-sm"
						onClick={() => setOpen(false)}
						aria-hidden="true"
					/>
					{/* Menu panel */}
					<ul className="absolute left-0 right-0 top-14.25 border-b border-rule bg-bg px-4 py-4 shadow-lg">
						{NAVLINKS.map((l) => (
							<li key={l.href}>
								<Link
									href={l.href}
									onClick={() => setOpen(false)}
									className={`block rounded-lg px-4 py-3 font-body text-base font-medium transition-colors ${
										pathname === l.href ||
										(l.href !== "/" && pathname.startsWith(l.href))
											? "bg-accent-tint text-accent"
											: "text-ink hover:bg-black/4"
									}`}
								>
									{l.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</nav>
	);
}

function NavLink({
	link,
	pathname,
}: {
	link: { href: string; label: string };
	pathname: string;
}) {
	const isActive =
		pathname === link.href ||
		(link.href !== "/" && pathname.startsWith(link.href));

	return (
		<Link
			href={link.href}
			className={`inline-block whitespace-nowrap rounded-full px-3.5 py-2 font-body text-sm font-medium no-underline transition-all duration-150 ${
				isActive
					? "bg-accent-tint text-accent"
					: "text-ink-soft hover:bg-black/4 hover:text-ink"
			}`}
		>
			{link.label}
		</Link>
	);
}

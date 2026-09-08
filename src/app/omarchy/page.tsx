import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Omarchy plugins",
	description: "Open-source Omarchy bar plugins by Parmjeet Mishra.",
};

const PLUGINS = [
	{
		id: "parm.clock",
		name: "omarchy-google-calendar-clock",
		blurb:
			"Clock widget whose calendar popup shows Google Calendar events and Tasks.",
		href: "/omarchy/parm.clock",
	},
];

export default function OmarchyIndexPage() {
	return (
		<div className="mx-auto max-w-3xl px-8 pt-14 pb-24">
			<p className="text-sm uppercase tracking-widest opacity-60">
				Open source
			</p>
			<h1 className="mt-2 font-bold text-4xl">Omarchy plugins</h1>
			<div className="mt-10 space-y-6">
				{PLUGINS.map((p) => (
					<Link
						key={p.id}
						href={p.href}
						className="block rounded-2xl border p-6"
					>
						<p className="text-sm opacity-60">{p.id}</p>
						<p className="mt-1 font-semibold text-xl">{p.name}</p>
						<p className="mt-1 opacity-80">{p.blurb}</p>
					</Link>
				))}
			</div>
		</div>
	);
}

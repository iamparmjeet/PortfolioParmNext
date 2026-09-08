import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "omarchy-google-calendar-clock",
	description:
		"Omarchy bar widget: a clock whose calendar popup shows Google Calendar events and Google Tasks, powered by gws.",
};

const GITHUB_URL =
	"https://github.com/iamparmjeet/omarchy-google-calendar-clock";

const FEATURES = [
	"Clock widget with a calendar popup (month, week, upcoming, and tasks views)",
	"Google Calendar dots on the month grid and a task badge on the bar",
	"Full create / edit / delete for events and tasks, powered by gws",
	"Private by design: OAuth tokens stay in your system keyring, cache files are 0600",
];

export default function OmarchyPage() {
	return (
		<div className="mx-auto max-w-3xl px-8 pt-14 pb-24">
			<p className="text-sm uppercase tracking-widest opacity-60">
				Omarchy plugin · parm.clock
			</p>
			<h1 className="mt-2 font-bold text-4xl">omarchy-google-calendar-clock</h1>
			<p className="mt-4 text-lg opacity-80">
				A clock for the Omarchy bar whose calendar popup shows your Google
				Calendar events and Google Tasks — dots on the month grid, an agenda
				list, a task badge, and full event/task editing.
			</p>
			<ul className="mt-8 space-y-2 opacity-80">
				{FEATURES.map((f) => (
					<li key={f.slice(0, 24)}>— {f}</li>
				))}
			</ul>
			<div className="mt-10 flex flex-wrap gap-4">
				<Link
					href={GITHUB_URL}
					className="rounded-full border px-6 py-2 font-semibold text-sm"
				>
					View on GitHub
				</Link>
				<Link
					href="/omarchy/parm.clock/privacy"
					className="rounded-full border px-6 py-2 text-sm opacity-80"
				>
					Privacy policy
				</Link>
			</div>
		</div>
	);
}

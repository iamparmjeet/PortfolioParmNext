import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy — omarchy-google-calendar-clock",
	description:
		"Privacy policy for the omarchy-google-calendar-clock Google OAuth client: what calendar and task data is accessed and where it lives.",
};

const SECTIONS: { heading: string; body: string[] }[] = [
	{
		heading: "What data is accessed",
		body: [
			"With your consent, the plugin reads and writes your Google Calendar events and Google Tasks through the Google Calendar and Tasks APIs. No other Google data is requested or accessed.",
		],
	},
	{
		heading: "Where your data lives",
		body: [
			"OAuth tokens are stored only on your own machine, in your operating system's keyring and ~/.config/gws.",
			"A local cache of your events and tasks is kept at ~/.local/state/parm.clock/state.json with private file permissions (0600, directory 0700).",
			"Your data travels only between your machine and Google's APIs over HTTPS. It is never sent to the plugin author or any third party, never sold, and never used for advertising.",
		],
	},
	{
		heading: "Data retention and deletion",
		body: [
			"Cached data stays on your machine until you remove it (scripts/uninstall.sh --purge-data in the plugin repository). Revoking access at myaccount.google.com/permissions immediately stops all future access. Server-side data is yours and is never deleted by this plugin.",
		],
	},
	{
		heading: "Contact",
		body: [
			"Questions about this policy: iamparmjeetmishra@gmail.com — the developer, and the only user of this OAuth client.",
		],
	},
];

export default function PrivacyPage() {
	return (
		<div className="mx-auto max-w-3xl px-8 pt-14 pb-24">
			<p className="text-sm uppercase tracking-widest opacity-60">
				omarchy-google-calendar-clock
			</p>
			<h1 className="mt-2 font-bold text-4xl">Privacy Policy</h1>
			<div className="mt-10 space-y-8">
				{SECTIONS.map((s) => (
					<section key={s.heading}>
						<h2 className="font-semibold text-xl">{s.heading}</h2>
						<div className="mt-2 space-y-2 opacity-80">
							{s.body.map((p) => (
								<p key={p.slice(0, 24)}>{p}</p>
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	);
}

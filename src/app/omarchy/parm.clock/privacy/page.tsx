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
			"With your consent, the plugin accesses your Google Calendar events (scope https://www.googleapis.com/auth/calendar) and your Google Tasks (scope https://www.googleapis.com/auth/tasks) through the Google Calendar and Tasks APIs. No other Google user data is requested or accessed.",
		],
	},
	{
		heading: "How we use Google user data",
		body: [
			"Your Google Calendar data is used only to display your events in the desktop widget (month, week, and upcoming views) and to create, edit, and delete events when you explicitly use the widget's add, edit, and delete controls.",
			"Your Google Tasks data is used only to display tasks due on each day alongside your events and to add, complete, and delete tasks when you explicitly use the widget's task controls.",
			"Google user data is never used for advertising, never sold, never used for profiling or analytics, and never used to train models. The app's use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
			"No AI processing: your Google user data is never sent to any third-party AI service, aggregator, gateway, or model, and no AI model — self-hosted or otherwise — is used anywhere in this app.",
		],
	},
	{
		heading: "Sharing, transfer, and disclosure of Google user data",
		body: [
			"Your Google user data is shared only with Google LLC via the Google Calendar and Tasks APIs, for the sole purpose of providing the calendar and task features described above.",
			"We do not share, transfer, or disclose your Google user data to the plugin author, to any other third party, service provider, or affiliate, except as required by applicable law (in which case you will be notified unless legally prohibited).",
		],
	},
	{
		heading: "Data protection mechanisms",
		body: [
			"Data in transit is encrypted with TLS (HTTPS) for all communication between your machine and Google's APIs.",
			"OAuth tokens are stored only on your own machine, in your operating system's keyring (e.g. gnome-keyring) and ~/.config/gws, and are never transmitted anywhere except to Google's OAuth and API endpoints.",
			"A local cache of your events and tasks is kept at ~/.local/state/parm.clock/state.json with private file permissions (0600, directory 0700), readable only by your user account.",
			"The app requests only the two scopes listed above, accesses only the calendars and task lists you authorize, and performs writes only when you explicitly trigger them in the widget.",
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
			"Questions about this policy: iamparmjeetmishra@gmail.com — the developer of this open-source plugin (source: github.com/iamparmjeet/omarchy-google-calendar-clock).",
			"Last updated: September 10, 2026.",
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

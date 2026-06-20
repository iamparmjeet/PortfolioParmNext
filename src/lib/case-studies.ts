// Long-form case studies, one per project. Strings may contain trusted inline
// HTML (<strong>, <em>, <code>) — rendered the same way the blog is. The shape
// mirrors the sections the work template renders, so adding a study is just
// data, never JSX.

import type { StaticImageData } from "next/image";
import { CDN } from "@/constants";

export interface CaseStat {
	/** The full value, e.g. "8+" */
	v: string;
	/** Label under the number */
	l: string;
	/** Optional accent-coloured prefix of `v`, e.g. "8" of "8+" */
	em?: string;
}

export interface ArchChip {
	t: string;
	/** "hot" = primary highlight, "cool" = secondary highlight */
	v?: "hot" | "cool";
}

export interface ArchRow {
	l: string;
	chips: ArchChip[];
}

export type CardAccent = "accent" | "amber" | "secondary";

export interface CaseCard {
	label: string;
	/** May contain inline <code>/<em> */
	title: string;
	/** May contain inline <strong>/<em>/<code> */
	body: string;
	accent?: CardAccent;
}

export interface CaseStudy {
	/** Matches the project id */
	slug: string;
	readTime: string;
	/** Hero h1 — inline <em> drives the accent emphasis */
	heroTitle: string;
	tagline: string;
	/** Pills above the overview headline (in addition to the project's tags) */
	overlineTags: string[];
	overviewTitle: string;
	overviewBody: string;
	stats: CaseStat[];
	shotLabel: string;
	problemTitle: string;
	problem: string[];
	architectureTitle: string;
	architectureIntro: string;
	architecture: ArchRow[];
	decisionsTitle: string;
	decisions: CaseCard[];
	challengesTitle: string;
	challenges: CaseCard[];
	quote: string;
	quoteAttribution: string;
	image?: string | StaticImageData | undefined;
}

export const CASE_STUDIES: CaseStudy[] = [
	// ───────────────────────────────────
	{
		slug: "rentwise",
		readTime: "12 min",
		image: `${CDN}/web/projects/rentwise.jpg`,
		heroTitle:
			"Rentwise — taking a <em>multi-tenant</em> rental SaaS from zero to production.",
		tagline:
			"Architecture decisions, real bugs, and what I would do differently if I started over tomorrow.",
		overlineTags: ["multi-tenant", "built solo", "monorepo"],
		overviewTitle: "A property platform <em>for the in-between</em>",
		overviewBody:
			"Small-to-mid landlords in India do not have time for enterprise software, and most lightweight tools skip Indian-market specifics. Rentwise sits between the two — built solo from schema design through deployment, and it shares a Turborepo with <strong>Schooly</strong> so auth, UI, and database packages are written once.",
		stats: [
			{ v: "3", l: "User roles" },
			{ v: "8+", l: "Core features", em: "8" },
			{ v: "5", l: "Bugs surfaced" },
			{ v: "1", l: "Person built it", em: "1" },
		],
		shotLabel: "Dashboard screenshot",
		problemTitle: "The problem",
		problem: [
			"Small-to-mid landlords in India manage multiple properties across <strong>spreadsheets, WhatsApp chats, and paper receipts</strong>. They cannot track rent payments, pending maintenance, or tenant history without stitching together four or five tools. Existing SaaS is either too enterprise-heavy, or it skips Indian-market specifics like Razorpay and regional communication.",
			"The hard part is not the CRUD — it is <strong>multi-tenancy</strong>. One owner's data must never bleed into another's, and the tenant invite flow has to be airtight while still being friendly to non-technical users.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"A pragmatic Next.js + Hono stack — no edge runtime, no exotic database. The whole thing is intentionally boring on the outside so the multi-tenancy logic can be careful on the inside. Shared packages live in a Turborepo alongside Schooly.",
		architecture: [
			{
				l: "Client",
				chips: [
					{ t: "Next.js 15 App Router", v: "hot" },
					{ t: "shadcn/ui" },
					{ t: "TanStack Query" },
					{ t: "Tailwind v4" },
				],
			},
			{
				l: "Auth",
				chips: [
					{ t: "Better Auth", v: "hot" },
					{ t: "Next middleware" },
					{ t: "Server-component layout" },
					{ t: "SessionProvider context" },
				],
			},
			{
				l: "API",
				chips: [
					{ t: "Hono RPC (hc client)", v: "hot" },
					{ t: "Zod validators" },
					{ t: "Role-based guards" },
				],
			},
			{
				l: "Database",
				chips: [
					{ t: "PostgreSQL", v: "hot" },
					{ t: "Drizzle ORM" },
					{ t: "Docker (local)", v: "cool" },
				],
			},
			{
				l: "Monorepo",
				chips: [
					{ t: "Turborepo", v: "hot" },
					{ t: "shared/auth" },
					{ t: "shared/ui" },
					{ t: "shared/db", v: "cool" },
				],
			},
			{
				l: "Infra",
				chips: [
					{ t: "Vercel (frontend)" },
					{ t: "Railway (backend)" },
					{ t: "Resend (email)", v: "cool" },
				],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Hono RPC over oRPC",
				body: "Switched to Hono&apos;s <code>hc</code> client for end-to-end type safety. Return types are inferred straight from the router definition — no separate type sharing, and a whole category of API contract bugs disappears.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Three-layer dashboard security",
				body: "Middleware-only auth is not enough — it does not protect RSC data fetching. So: middleware (redirect), server-component layout (re-validate session), client SessionProvider (role gating). Belt + suspenders + a third belt.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Postgres over Cloudflare D1",
				body: "Started on D1/SQLite for the edge convenience, then migrated. Complex multi-tenant JOINs perform better on Postgres, and the relational constraints I lean on were a real concern at scale.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest bugs, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Tenant invite blocked by middleware",
				body: "Middleware was blocking unauthenticated invite-acceptance routes — new tenants could not even reach sign-up. Fix: redesign the matcher to allow public invite paths while still guarding every dashboard route.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "<code>BETTER_AUTH_URL</code> in the wrong env section",
				body: "Production URL resolution silently failed because the variable was in the server-only env section. Moving it to the client-accessible env prefix was a non-obvious fix that took a long time to track down.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Full-table scan on the tenant query",
				body: "A backend audit found tenant queries loading every row and filtering in JS instead of with <code>WHERE</code>. Rewrote with proper Drizzle <code>where</code> + indexed columns. Estimated 90%+ query-time reduction.",
				accent: "secondary",
			},
			{
				label: "Lessons",
				title: "Deploy earlier — always.",
				body: "I spent weeks in a local-only environment. Real-domain deploys expose CORS, auth redirects, and env-var issues much earlier — and these are far easier to debug when you are not also debugging the feature code.",
				accent: "accent",
			},
		],
		quote:
			"The real lesson was not the bugs — it was that shipping early is its own kind of test, and skipping it is the most expensive form of perfectionism.",
		quoteAttribution: "Parm, in hindsight",
	},

	// ──────────────────────────────────────────────────────────────────────
	{
		slug: "schooly",
		readTime: "10 min",
		heroTitle:
			"Schooly — a <em>multi-tenant</em> school platform, built by a former teacher.",
		tagline:
			"Twelve years in a classroom turned into software for the people still in one. Shares a monorepo with Rentwise.",
		image: `${CDN}/web/projects/schooly.jpg`,
		overlineTags: ["multi-tenant", "monorepo", "edu"],
		overviewTitle: "School operations, <em>without the clipboard</em>",
		overviewBody:
			"Schooly is a multi-tenant platform for small and mid-sized schools — attendance, fees, report cards, and parent communication in one place. It lives in the same Turborepo as <strong>Rentwise</strong>, so both apps share the auth, UI, and database packages. I taught Physics and Chemistry for twelve years; this is the tool I wish the front office had.",
		stats: [
			{ v: "4", l: "User roles" },
			{ v: "3", l: "Schools onboard", em: "3" },
			{ v: "100%", l: "Shared auth pkg", em: "100" },
			{ v: "1", l: "Person built it", em: "1" },
		],
		shotLabel: "Attendance + fees dashboard",
		problemTitle: "The problem",
		problem: [
			"Small schools run on <strong>registers, photocopies, and the one staff member who knows the timetable</strong>. Attendance is paper, fee receipts are a carbon book, and report cards are a spreadsheet that lives on a single laptop. Enterprise ERPs exist, but they are priced and shaped for institutions ten times the size.",
			"The role model is genuinely complex: <strong>admins</strong> run the school, <strong>teachers</strong> own their classes, <strong>students</strong> see their own record, and <strong>parents</strong> see their child's. Each role is a different surface over the same tenant-isolated data — the exact problem Rentwise already solved once.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"Schooly is the second app in the Turborepo. The biggest architectural win was <em>not</em> rebuilding multi-tenancy and auth from scratch — those graduated into shared packages the moment a second consumer existed.",
		architecture: [
			{
				l: "Client",
				chips: [
					{ t: "Next.js 16 App Router", v: "hot" },
					{ t: "shared/ui (shadcn)", v: "hot" },
					{ t: "TanStack Query" },
					{ t: "Tailwind v4" },
				],
			},
			{
				l: "Auth",
				chips: [
					{ t: "shared/auth (Better Auth)", v: "hot" },
					{ t: "4-role guards" },
					{ t: "Server-component layout" },
				],
			},
			{
				l: "API",
				chips: [
					{ t: "Hono RPC (hc client)", v: "hot" },
					{ t: "Zod validators" },
					{ t: "Tenant scoping middleware" },
				],
			},
			{
				l: "Database",
				chips: [
					{ t: "PostgreSQL", v: "hot" },
					{ t: "shared/db (Drizzle)", v: "hot" },
					{ t: "Per-school row scoping", v: "cool" },
				],
			},
			{
				l: "Monorepo",
				chips: [
					{ t: "Turborepo", v: "hot" },
					{ t: "Remote cache" },
					{ t: "Shared with Rentwise", v: "cool" },
				],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Promote tenancy to a shared package",
				body: "Rentwise and Schooly both need &ldquo;isolate every query by tenant.&rdquo; Instead of copying the pattern, the row-scoping helpers and Drizzle middleware became <code>shared/db</code>. One place to audit, two apps that benefit.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Parents are first-class, not a sub-login",
				body: "Most low-end school tools bolt parents onto the student account. Schooly gives parents their own role and their own minimal surface — attendance alerts and fee dues — because that is what actually drives adoption with families.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Report cards as data, not PDFs",
				body: "Grades live as structured rows, and the printable report card is a render of that data. It keeps history queryable (term-over-term trends) instead of trapping it in a generated file nobody can search.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Extracting shared packages without a big-bang refactor",
				body: "Pulling auth and db out of Rentwise into the monorepo, <em>while Rentwise was already deployed</em>, meant moving code without changing its behaviour. The move was done in small, type-checked steps with the build as the safety net.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "A fourth role doubles the guard matrix",
				body: "Rentwise had three roles; Schooly has four, and parent ↔ student ↔ class relationships are many-to-many. Modelling &ldquo;a parent of a student in this class&rdquo; cleanly took more schema thought than the rest of the app combined.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Designing for the non-technical front office",
				body: "The real user is an administrator who has never used SaaS. Every flow had to survive the &ldquo;would the school clerk get this in one try?&rdquo; test — which is a different bar than building for developers.",
				accent: "secondary",
			},
		],
		quote:
			"I spent twelve years explaining things to people with zero prior context. Building Schooly is the same job, only the audience is the school office instead of a classroom.",
		quoteAttribution: "Parm, on why this one is personal",
	},

	// ──────────────────────────────────────────────────────────────────────
	{
		slug: "amar",
		readTime: "9 min",
		image: `${CDN}/web/projects/amar.jpg`,
		heroTitle:
			"Amar — a <em>cinematic</em> HLS pipeline for a working video editor.",
		tagline:
			"FFmpeg → BullMQ → Cloudflare R2 → adaptive streaming, and the three things I would change now.",
		overlineTags: ["client work", "video", "shipped"],
		overviewTitle: "A portfolio that <em>streams like premium</em>",
		overviewBody:
			"Amarjeet is a professional video editor. He needed a portfolio that could stream cinematic 4K footage smoothly, handle multiple players on a page at once, and feel as premium as his work. So I built a full transcoding-to-streaming pipeline behind a deliberately minimal front end.",
		stats: [
			{ v: "3", l: "Quality tiers" },
			{ v: "4K", l: "Source footage", em: "4" },
			{ v: "1", l: "Real client", em: "1" },
			{ v: "0", l: "Buffering spinners", em: "0" },
		],
		shotLabel: "Multi-player grid",
		problemTitle: "The problem",
		problem: [
			"Dropping raw 4K MP4s onto a page is a great way to make a portfolio feel broken — multi-second loads, no quality adaptation, and a browser that chokes when several videos share a screen. A video editor's site failing to play video is the worst possible first impression.",
			"The real requirement was <strong>adaptive streaming</strong>: serve the right quality for each viewer's connection, start fast, and let several players coexist without fighting over bandwidth or memory.",
		],
		architectureTitle: "The pipeline",
		architectureIntro:
			"Upload bypasses the server, a queue does the heavy lifting, and the player just reads a playlist. Each stage is independent so a failure in one does not corrupt the others.",
		architecture: [
			{
				l: "Upload",
				chips: [
					{ t: "Signed URL → R2", v: "hot" },
					{ t: "Direct from client" },
					{ t: "Server bypassed", v: "cool" },
				],
			},
			{
				l: "Queue",
				chips: [
					{ t: "BullMQ", v: "hot" },
					{ t: "Hono backend" },
					{ t: "Redis" },
				],
			},
			{
				l: "Transcode",
				chips: [
					{ t: "FFmpeg", v: "hot" },
					{ t: "360p / 720p / 1080p" },
					{ t: "HLS segments + master playlist" },
				],
			},
			{
				l: "Storage",
				chips: [{ t: "Cloudflare R2", v: "hot" }, { t: "Structured paths" }],
			},
			{
				l: "Playback",
				chips: [
					{ t: "HLS adaptive", v: "hot" },
					{ t: "React context players" },
					{ t: "Quality auto-switch", v: "cool" },
				],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Direct-to-R2 uploads via signed URLs",
				body: "Large source files never touch the app server — the client uploads straight to R2 with a pre-signed URL, and only the <em>completion</em> event hits the backend. The server stays cheap and never streams gigabytes.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "A queue, not a request, for transcoding",
				body: "Transcoding is minutes of work; an HTTP request is the wrong place for it. BullMQ decouples &ldquo;upload finished&rdquo; from &ldquo;encode done&rdquo;, with retries and visibility into the job state.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Context-driven multi-instance players",
				body: "Several HLS players on one page need to share state — only one plays at a time, others pause. A small React context coordinates them instead of each player reinventing its own controls.",
				accent: "secondary",
			},
		],
		challengesTitle: "Three things I would change",
		challenges: [
			{
				label: "Change 01",
				title: "Move transcoding off the main process",
				body: "I ran FFmpeg inside the main Hono process — fine at low traffic, but a heavy encode blocks the event loop. Next time: a dedicated worker service on a separate machine.",
				accent: "accent",
			},
			{
				label: "Change 02",
				title: "Stream job progress over SSE",
				body: "The upload UI shows a spinner until transcoding finishes. A progress bar streamed via server-sent events would be far better UX for long encodes — the data is already in BullMQ.",
				accent: "amber",
			},
			{
				label: "Change 03",
				title: "Consider Cloudflare Stream",
				body: "I built the pipeline from scratch to learn it end to end. For a production client deadline, Cloudflare Stream handles transcode + storage + CDN in one service — I would use it and spend the saved time on the UI.",
				accent: "secondary",
			},
		],
		quote:
			"Building the pipeline took a week. Making it reliable took three more — and that ratio is the whole job.",
		quoteAttribution: "Parm, on AmarV4",
	},

	// ──────────────────────────────────────────────────────────────────────
	{
		slug: "resumatch",
		readTime: "8 min",
		heroTitle:
			"ResuMatch — <em>streaming</em> résumé feedback from Claude, not a black box.",
		tagline:
			"Paste a résumé and a job description; watch the analysis arrive token by token, with concrete rewrites.",
		overlineTags: ["AI", "streaming", "building"],
		overviewTitle: "Match scoring that <em>shows its work</em>",
		overviewBody:
			"Most résumé tools hand you a number and a vague &ldquo;add more keywords.&rdquo; ResuMatch streams a structured analysis from Claude — a match score, the missing keywords, tone issues, and concrete bullet rewrites you can paste straight in.",
		stats: [
			{ v: "4", l: "Analysis facets" },
			{ v: "1", l: "Claude call", em: "1" },
			{ v: "0", l: "Page reloads", em: "0" },
			{ v: "PDF", l: "Input parsed", em: "PDF" },
		],
		shotLabel: "Streaming analysis panel",
		problemTitle: "The problem",
		problem: [
			"Applicants are told to &ldquo;tailor your résumé&rdquo; with no idea what that concretely means for a specific job. Generic ATS keyword checkers give a score but not <strong>actionable rewrites</strong>, and waiting on a blank screen for an LLM to finish feels broken.",
			"The product bet is that feedback should be <strong>specific and visibly live</strong> — you see the model working, and what it gives back is editable text, not advice.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"A thin Next.js app around a single streaming model call. The interesting engineering is the prompt contract and rendering partial structured output as it arrives.",
		architecture: [
			{
				l: "Client",
				chips: [
					{ t: "Next.js 15", v: "hot" },
					{ t: "shadcn/ui" },
					{ t: "Streaming UI", v: "cool" },
				],
			},
			{
				l: "AI",
				chips: [
					{ t: "Claude API", v: "hot" },
					{ t: "Vercel AI SDK", v: "hot" },
					{ t: "Structured prompt contract" },
				],
			},
			{
				l: "Parsing",
				chips: [{ t: "pdf-parse", v: "hot" }, { t: "Text normalisation" }],
			},
			{
				l: "Runtime",
				chips: [{ t: "Edge streaming route" }, { t: "No database", v: "cool" }],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Stream the structure, not just text",
				body: "The Vercel AI SDK streams the response, and the UI renders each section (score, keywords, rewrites) as soon as it is complete — so the page fills in progressively instead of blocking on the full reply.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "One well-shaped prompt over a chain",
				body: "A single carefully structured prompt with a strict output contract beat a multi-step chain on both latency and cost for this task. Fewer round-trips, easier to reason about, cheaper to run.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "No accounts, no storage",
				body: "Résumés are sensitive. ResuMatch keeps nothing — parse in memory, analyse, render, forget. It removes an entire class of privacy and compliance concerns and makes the app trivially cheap to host.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Rendering partial structured output",
				body: "Streaming free text is easy; streaming something you want to lay out as sections is not. The UI has to tolerate half-arrived data and avoid layout jumps as each facet completes.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "PDF text is messier than it looks",
				body: "Two-column résumés and embedded tables turn into scrambled text. Normalising <code>pdf-parse</code> output enough that the model sees clean, ordered content was more work than the model call itself.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Keeping rewrites honest",
				body: "An LLM will happily invent achievements. The prompt explicitly constrains rewrites to rephrasing what is already there — better wording, never fabricated experience.",
				accent: "secondary",
			},
		],
		quote:
			"The feature is not the score. The feature is that you can copy the rewrite and it is already better.",
		quoteAttribution: "Parm, on ResuMatch",
	},

	// ──────────────────────────────────────────────────────────────────────
	{
		slug: "krm",
		readTime: "7 min",
		image: `${CDN}/web/projects/krm.jpg`,
		heroTitle:
			"KRM Engineering Works — a <em>shipped</em> B2B catalog with shareable state.",
		tagline:
			"An industrial product catalog where every filter lives in the URL and every enquiry is one click away.",
		overlineTags: ["client work", "shipped", "B2B"],
		overviewTitle: "A catalog that <em>survives a copy-paste</em>",
		overviewBody:
			"KRM sells industrial products to other businesses. The site is a fast, filterable catalog with a lightweight cart and a mailto-based enquiry flow — no checkout, because B2B buying happens over a conversation, not a card form. Shipped to production.",
		stats: [
			{ v: "URL", l: "Filter state", em: "URL" },
			{ v: "0", l: "Backend servers", em: "0" },
			{ v: "1", l: "Shipped client", em: "1" },
			{ v: "100%", l: "Responsive", em: "100" },
		],
		shotLabel: "Category + filter view",
		problemTitle: "The problem",
		problem: [
			"B2B buyers do not check out — they <strong>send an enquiry</strong>. They also share links: &ldquo;here are the three valves we need.&rdquo; A catalog that loses its filter state on refresh or cannot be linked to is actively in the way of how these deals actually happen.",
			"So the requirements inverted the usual e-commerce defaults: <strong>no payments, deep-linkable filters, and a frictionless mailto enquiry</strong> instead of a cart-to-card funnel.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"Deliberately serverless and simple — the &ldquo;backend&rdquo; is the buyer's email client. The engineering went into state management and responsive category navigation.",
		architecture: [
			{
				l: "Client",
				chips: [
					{ t: "Next.js 15", v: "hot" },
					{ t: "shadcn/ui" },
					{ t: "Tailwind v4" },
				],
			},
			{
				l: "State",
				chips: [
					{ t: "URL search params", v: "hot" },
					{ t: "Zustand cart", v: "hot" },
					{ t: "No persistence needed", v: "cool" },
				],
			},
			{
				l: "Enquiry",
				chips: [
					{ t: "mailto deep links", v: "hot" },
					{ t: "Prefilled cart contents" },
				],
			},
			{
				l: "Tooling",
				chips: [{ t: "Biome" }, { t: "Vercel deploy", v: "cool" }],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Filters in the URL, not in state",
				body: "Every filter and category lives in search params, so any view is shareable and survives refresh and back-button. The URL is the source of truth; React just reflects it.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "mailto over a contact form",
				body: "The enquiry button assembles a pre-filled email from the cart and opens the buyer's own mail client. No backend, no spam surface, and the buyer keeps a copy in their sent folder — which is exactly how B2B follow-up works.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Zustand for an ephemeral cart",
				body: "The cart never needs a server — it is a short-lived list that turns into an email. Zustand keeps it lightweight with zero backend and no auth, matching the product's real lifespan.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Keeping URL and UI in sync",
				body: "Two-way binding between search params and filter controls has sharp edges — stale closures, double history entries, and back-button surprises. Getting it to feel native took careful effort around the router.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Responsive category navigation",
				body: "A deep industrial taxonomy that works as a sidebar on desktop has to collapse into something thumb-friendly on mobile without burying products three taps deep.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "mailto body limits",
				body: "Long carts blow past practical URL/mailto length limits in some clients. The enquiry payload had to stay concise and degrade gracefully when a buyer selects a lot of items.",
				accent: "secondary",
			},
		],
		quote:
			"The best feature was the one I did not build: there is no checkout, because the client's customers do not want one.",
		quoteAttribution: "Parm, on KRM",
	},

	// ───
	{
		slug: "nxtrmt",
		readTime: "8 min",
		image: `${CDN}/web/projects/nxtrmt.jpg`,
		heroTitle:
			"NxtRmtJobs — a remote board that knows about your <em>timezone</em>.",
		tagline:
			"For Indian developers chasing global remote roles: the exact IST overlap window, computed per listing.",
		overlineTags: ["personal", "jobs", "building"],
		overviewTitle: "The overlap window, <em>front and centre</em>",
		overviewBody:
			"Every remote job board shows salary and stack. None of them answer the question an Indian developer actually asks first: <strong>how many hours of my day overlap with this team?</strong> NxtRmtJobs computes the IST overlap for each role and puts it where the salary usually goes.",
		stats: [
			{ v: "IST", l: "Anchor timezone", em: "IST" },
			{ v: "FTS", l: "Search engine", em: "FTS" },
			{ v: "1", l: "Own backend", em: "1" },
			{ v: "24/7", l: "Ingestion", em: "24" },
		],
		shotLabel: "Listing with overlap meter",
		problemTitle: "The problem",
		problem: [
			"A &ldquo;remote&rdquo; role advertised from San Francisco can mean a 9pm–2am working day from Ludhiana. That single fact decides whether a job is livable, yet it is never on the listing — applicants reverse-engineer it from a city name after they have already invested in applying.",
			"NxtRmtJobs treats <strong>timezone overlap as a first-class filter</strong>, the way other boards treat salary band or seniority.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"A real backend, not just a Next.js API folder — Hono owns ingestion, search, and the overlap computation, with Postgres full-text search doing the heavy lifting.",
		architecture: [
			{
				l: "Client",
				chips: [
					{ t: "Next.js 15", v: "hot" },
					{ t: "Overlap meter UI" },
					{ t: "Tailwind v4" },
				],
			},
			{
				l: "API",
				chips: [
					{ t: "Hono", v: "hot" },
					{ t: "Overlap calculator", v: "hot" },
					{ t: "Better Auth" },
				],
			},
			{
				l: "Search",
				chips: [
					{ t: "Postgres full-text", v: "hot" },
					{ t: "Drizzle" },
					{ t: "Ranked results", v: "cool" },
				],
			},
			{
				l: "Ingestion",
				chips: [
					{ t: "BullMQ jobs", v: "hot" },
					{ t: "Scheduled scrapes" },
					{ t: "Dedup + normalise" },
				],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Overlap as a computed, indexed field",
				body: "The IST overlap is derived once at ingestion from the role's stated timezone and stored, so it is sortable and filterable instantly — not recomputed in the browser on every render.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Postgres FTS over a search service",
				body: "Bringing in Elastic/Meilisearch for a single-developer project is premature infrastructure. Postgres full-text search with proper indexes handles the corpus comfortably and keeps the stack to one datastore.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Own Hono backend over Next API routes",
				body: "Ingestion, queues, and search wanted a long-running service with its own lifecycle. A dedicated Hono backend keeps that work out of the serverless request path and gives the typed <code>hc</code> client to the front end.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Timezones are a swamp",
				body: "DST, half-hour offsets, and listings that state a city instead of a zone all conspire against a clean overlap number. Normalising messy source data into a trustworthy IST window is the core difficulty.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Keeping ingestion clean",
				body: "The same role appears on multiple sources with slightly different titles. Deduplication and normalisation at ingestion time decide whether search results feel curated or like noise.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Ranking that respects overlap",
				body: "Relevance is not just text match — a perfect keyword hit at 3am IST is worse than a good hit at noon. Blending FTS rank with overlap into a single sensible ordering took iteration.",
				accent: "secondary",
			},
		],
		quote:
			"Salary tells you if a remote job is worth it. Timezone tells you if it is survivable. I built the board around the second number.",
		quoteAttribution: "Parm, on NxtRmtJobs",
	},

	// ──────────────────────────────────────────────────────────────────────
	{
		slug: "carekit",
		readTime: "8 min",
		heroTitle:
			"CareKit — <em>one codebase</em> that becomes four different products.",
		tagline:
			"A single config file turns the same app into PetCare, ChildCare, AutoCare, or BikeCare.",
		overlineTags: ["platform", "config-driven", "concept"],
		overviewTitle: "White-label, <em>driven by one file</em>",
		overviewBody:
			"CareKit is a config-driven platform: a single <code>serviceConfig.ts</code> decides terminology, feature flags, and theme, and the whole product re-skins itself around a new vertical. Build the booking-and-billing engine once, ship it as four brands.",
		stats: [
			{ v: "4", l: "Verticals" },
			{ v: "1", l: "Config file", em: "1" },
			{ v: "1", l: "Codebase", em: "1" },
			{ v: "∞", l: "Themes possible", em: "∞" },
		],
		shotLabel: "Same app, two brands",
		problemTitle: "The problem",
		problem: [
			"&ldquo;Booking + customers + payments&rdquo; is the same software whether the thing being cared for is a pet, a child, a car, or a bike. Rebuilding it per vertical is wasted work; forking it per client is a maintenance trap where every bug fix has to be applied N times.",
			"The bet: express everything that <strong>differs between verticals as data</strong>, and keep the engine identical. One bug fix, four products improved.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"The architecture is the config boundary. Anything vertical-specific — labels, enabled features, colours — is data; everything else is shared engine code that never knows which brand it is running as.",
		architecture: [
			{
				l: "Config",
				chips: [
					{ t: "serviceConfig.ts", v: "hot" },
					{ t: "Terminology map" },
					{ t: "Feature flags" },
					{ t: "CSS theme tokens", v: "cool" },
				],
			},
			{
				l: "Client",
				chips: [
					{ t: "Next.js 15", v: "hot" },
					{ t: "Config-aware components" },
					{ t: "Tailwind v4 themes" },
				],
			},
			{
				l: "API",
				chips: [{ t: "Hono", v: "hot" }, { t: "Drizzle" }],
			},
			{
				l: "Commerce",
				chips: [
					{ t: "Razorpay", v: "hot" },
					{ t: "Resend (email)", v: "cool" },
				],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "One config object as the seam",
				body: "Every vertical difference funnels through <code>serviceConfig.ts</code>. Components read terminology and flags from it rather than hard-coding &ldquo;pet&rdquo; or &ldquo;child&rdquo; — so a new vertical is a new config, not a new branch.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Theme via CSS variables, not rebuilds",
				body: "Each brand is a set of CSS-variable tokens, so re-skinning is runtime, not a separate build. The same lesson powers this portfolio's twelve palettes.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Feature flags over forks",
				body: "BikeCare might not need vaccination reminders; ChildCare does. Flags in the config switch whole features on and off so the codebase stays singular instead of splintering per client.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Finding the right abstraction line",
				body: "Abstract too little and every vertical needs code changes; abstract too much and the config becomes a second programming language. Drawing that line is the entire design problem.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Type-safe terminology",
				body: "If a component asks the config for a label that a vertical forgot to define, that should be a compile error, not a blank string in production. Keeping the terminology map fully typed is what makes the pattern safe.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Avoiding config sprawl",
				body: "Every new toggle is tempting to add to the config. Without discipline it balloons into an unreadable mega-object — so the bar for &ldquo;does this truly differ per vertical?&rdquo; has to stay high.",
				accent: "secondary",
			},
		],
		quote:
			"Write the engine once, describe the product as data. The hard part is deciding what counts as data.",
		quoteAttribution: "Parm, on CareKit",
	},

	// ──────────────────────────────────────────────────────────────────────
	{
		slug: "nextemail",
		readTime: "6 min",
		heroTitle:
			"NextEmail — <em>live-preview</em> email templates, one click to copy.",
		tagline:
			"Edit variables, watch the email render in a real iframe, and copy cross-client HTML when it looks right.",
		overlineTags: ["tool", "DX", "building"],
		overviewTitle: "WYSIWYG that <em>actually ships</em>",
		overviewBody:
			"Email HTML is famously hostile — tables, inline styles, and a different bug in every client. NextEmail renders <code>react-email</code> templates in a live iframe as you tweak variables, then hands you copy-paste-ready HTML that survives Outlook.",
		stats: [
			{ v: "iframe", l: "Live preview", em: "iframe" },
			{ v: "1", l: "Click to copy", em: "1" },
			{ v: "0", l: "Client surprises", em: "0" },
			{ v: "RHF", l: "Variable form", em: "RHF" },
		],
		shotLabel: "Editor + iframe preview",
		problemTitle: "The problem",
		problem: [
			"Building transactional emails means writing HTML you cannot trust, in an editor that does not show you what your recipients will see. The feedback loop — edit, send a test, check three clients, repeat — is brutally slow.",
			"NextEmail collapses that loop: a <strong>real iframe preview</strong> driven by <code>react-email</code>, which already solves cross-client rendering, plus a form that feeds template variables live.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"react-email does the hard rendering; the app is the studio around it — a variable form on one side, a faithful iframe on the other, and a copy button that emits final HTML.",
		architecture: [
			{
				l: "Templates",
				chips: [{ t: "react-email", v: "hot" }, { t: "Cross-client HTML" }],
			},
			{
				l: "Editor",
				chips: [
					{ t: "React Hook Form", v: "hot" },
					{ t: "Live variable binding" },
					{ t: "shadcn/ui" },
				],
			},
			{
				l: "Preview",
				chips: [
					{ t: "Sandboxed iframe", v: "hot" },
					{ t: "Instant re-render", v: "cool" },
				],
			},
			{
				l: "Output",
				chips: [{ t: "One-click HTML copy", v: "hot" }, { t: "Resend-ready" }],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Render in an iframe, not a div",
				body: "Email HTML carries its own styles that would leak into — and be broken by — the app's CSS. A sandboxed iframe gives the template a clean document, so the preview matches an inbox instead of the surrounding page.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Stand on react-email",
				body: "Cross-client email rendering is a solved-but-thankless problem. Building on <code>react-email</code> means the table hacks and Outlook conditionals are handled, and I get to focus on the editing experience.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Copy HTML, do not lock you in",
				body: "The output is plain HTML you paste anywhere — Resend, your own SMTP, whatever. NextEmail is a tool you reach for, not a platform you depend on.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Keeping the iframe in sync, fast",
				body: "Re-rendering the iframe on every keystroke without flicker or focus loss needs care — debouncing, stable keys, and pushing only the serialised HTML across the boundary.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Typing the variable schema",
				body: "Each template exposes different variables. Driving the form from a typed schema per template — so the preview and the form never disagree — is the bit that makes it feel solid.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Honest copy output",
				body: "What you copy must be exactly what the preview showed, fully inlined. Any drift between preview and exported HTML would quietly reintroduce the very bugs the tool exists to kill.",
				accent: "secondary",
			},
		],
		quote:
			"A tool earns its place by shortening a loop. NextEmail turns &ldquo;edit, test, check three clients&rdquo; into &ldquo;edit, look.&rdquo;",
		quoteAttribution: "Parm, on NextEmail",
	},

	// ──────────────────────────────────────────────────────────────────────
	{
		slug: "contextchat",
		readTime: "10 min",
		heroTitle:
			"ContextChat — RAG that <em>retrieves the right thing</em>, with citations.",
		tagline:
			"Upload PDFs, ask questions, and get answers that cite the exact source page they came from.",
		overlineTags: ["AI", "RAG", "concept"],
		overviewTitle: "Answers you can <em>verify</em>",
		overviewBody:
			"The pitch for RAG sounds simple — embed documents, retrieve the relevant ones, feed them to the model. Then you build it and discover every step has a dozen wrong ways. ContextChat is my opinionated take: semantic chunking, a real embedding model, reranking, and citations back to the page.",
		stats: [
			{ v: "20→5", l: "Retrieve → rerank", em: "20" },
			{ v: "1:1", l: "Claim-to-citation", em: "1:1" },
			{ v: "PDF", l: "Source docs", em: "PDF" },
			{ v: "3", l: "Things that matter" },
		],
		shotLabel: "Answer with page citations",
		problemTitle: "The problem",
		problem: [
			"Most RAG implementations treat <strong>all text as equal</strong> — chunk a PDF into fixed 512-token blocks, embed them identically, and confidently return the wrong section of a multi-part document. For contracts, specs, and papers, that is worse than no answer.",
			"And an answer you cannot check is an answer you cannot trust. ContextChat is built around <strong>citations</strong>: every claim points back to the source page so a human can verify it.",
		],
		architectureTitle: "The retrieval pipeline",
		architectureIntro:
			"Three things decide RAG quality far more than which model you query: how you chunk, what you embed with, and whether you rerank. The pipeline takes all three seriously.",
		architecture: [
			{
				l: "Ingest",
				chips: [
					{ t: "Semantic chunking", v: "hot" },
					{ t: "Split on headings" },
					{ t: "Page-anchored", v: "cool" },
				],
			},
			{
				l: "Embed",
				chips: [{ t: "Voyage AI", v: "hot" }, { t: "Quality-evaluated model" }],
			},
			{
				l: "Store",
				chips: [{ t: "Upstash Vector", v: "hot" }, { t: "Metadata per chunk" }],
			},
			{
				l: "Retrieve",
				chips: [
					{ t: "Top-20 candidates", v: "hot" },
					{ t: "Claude reranks → top-5", v: "hot" },
				],
			},
			{
				l: "Answer",
				chips: [
					{ t: "Claude API", v: "hot" },
					{ t: "Vercel AI SDK" },
					{ t: "Inline citations", v: "cool" },
				],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Semantic chunking over fixed-size",
				body: "Splitting at natural boundaries — headings, sections — consistently beats fixed 512-token blocks for structured documents. The chunk you retrieve is a coherent idea, not an arbitrary window straddling two topics.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Retrieve broad, then rerank",
				body: "Cosine similarity finds approximate matches; it is not the final word. Pull top-20 candidates and let Claude rerank to the best 5 — a cheap step that catches the cases where raw vector similarity is confidently wrong.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Citations as a hard requirement",
				body: "Every answer cites the source page it drew from. It is the single feature that turns &ldquo;an AI said so&rdquo; into &ldquo;here, check it yourself&rdquo; — and it is non-negotiable for any document the user actually cares about.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Chunking is the whole ballgame",
				body: "More effort went into <em>how</em> documents are split than into any prompt. Bad chunks cap your ceiling no matter how good the model is — you cannot rerank your way out of garbage candidates.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Mapping chunks back to pages",
				body: "A citation is only useful if it points at the right page. Carrying page anchors through chunking, embedding, and retrieval so the final answer can reference them precisely is fiddly bookkeeping that matters.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Evaluating retrieval, not vibes",
				body: "&ldquo;It feels better&rdquo; is not a metric. Comparing embedding models and chunking strategies needs a real evaluation set, or you are just moving knobs and hoping.",
				accent: "secondary",
			},
		],
		quote:
			"Vector similarity finds approximate matches. Reranking finds the correct ones. The gap between those two is where RAG quality lives.",
		quoteAttribution: "Parm, on ContextChat",
	},

	// ─
	{
		slug: "devbrief",
		readTime: "6 min",
		heroTitle:
			"DevBrief — a <em>daily</em> developer digest, summarised by Claude.",
		tagline:
			"Cron scrapes the sources, Claude summarises by your interests, Resend drops a clean email each morning.",
		overlineTags: ["AI", "automation", "concept"],
		overviewTitle: "Your morning read, <em>assembled overnight</em>",
		overviewBody:
			"Keeping up with HN, GitHub Trending, and Dev.to is a tab-hoarding habit. DevBrief turns it into one email: a scheduled job gathers the day's signal, Claude summarises it against your interest tags, and Resend delivers a digest you can read with coffee.",
		stats: [
			{ v: "3", l: "Sources" },
			{ v: "1", l: "Daily email", em: "1" },
			{ v: "cron", l: "Fully automated", em: "cron" },
			{ v: "0", l: "Tabs hoarded", em: "0" },
		],
		shotLabel: "The morning digest email",
		problemTitle: "The problem",
		problem: [
			"The firehose of dev news is real and it is exhausting. Hacker News, GitHub Trending, and Dev.to each reward constant checking, and the cost is forty open tabs and a vague sense of falling behind.",
			"DevBrief flips it to <strong>push, not pull</strong>: the news comes to you once, summarised and filtered to what you actually care about, instead of you patrolling three feeds all day.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"A scheduled pipeline with no UI to babysit — scrape, summarise, send. Each run is independent and the only output is an email.",
		architecture: [
			{
				l: "Schedule",
				chips: [{ t: "Vercel Cron", v: "hot" }, { t: "Daily trigger" }],
			},
			{
				l: "Gather",
				chips: [
					{ t: "Cheerio scraping", v: "hot" },
					{ t: "HN / GitHub / Dev.to" },
					{ t: "Dedup", v: "cool" },
				],
			},
			{
				l: "Summarise",
				chips: [
					{ t: "Claude API", v: "hot" },
					{ t: "Interest-tag filtering", v: "hot" },
				],
			},
			{
				l: "Deliver",
				chips: [{ t: "Resend", v: "hot" }, { t: "Clean HTML email" }],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Push over pull",
				body: "The whole point is to <em>stop</em> checking feeds. A single scheduled email respects attention in a way an app you must open never can — the best dashboard is the one you do not have to visit.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Summarise against interest tags",
				body: "Raw aggregation is just more noise. Claude filters and summarises against your tags, so a Rust release surfaces for the Rust person and gets dropped for everyone else.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Cron over a long-running service",
				body: "This work happens once a day. Vercel Cron means no server to keep alive, no queue to monitor — just a function that runs each morning and goes back to sleep.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Scrapers are brittle by nature",
				body: "Scraping HTML means living with markup that changes without notice. The gather step needs to fail softly — a broken source should thin the digest, never kill the whole run.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Summaries that are signal, not filler",
				body: "A summary that just restates the headline is worthless. The prompt has to earn the reader's trust that skipping the link is safe — which is a higher bar than it sounds.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Email that renders everywhere",
				body: "A digest nobody reads because it looks broken in Gmail is a failed product. Clean, client-safe HTML is as important here as the summarisation itself.",
				accent: "secondary",
			},
		],
		quote:
			"The best feed reader is the one you never open. DevBrief is a bet that a good daily email beats three feeds you patrol all day.",
		quoteAttribution: "Parm, on DevBrief",
	},

	// ═══════════════
	//  FORMCRAFT  (case study)
	// ══════════════
	{
		slug: "formcraft",
		readTime: "7 min",
		image: `${CDN}/web/projects/formcraft.jpg`,
		heroTitle:
			"FormCraft — a <em>visual form builder</em> that hands you the code, not a platform.",
		tagline:
			"Drag fields, configure validation, pick a layout — then copy the JSX, Zod schema, and full page file and never look back.",
		overlineTags: ["tool", "DX", "open-source"],
		overviewTitle:
			"Build the form <em>visually</em>, own the code <em>entirely</em>",
		overviewBody:
			"Most form builders lock your forms inside their platform. FormCraft is a studio that exits cleanly: configure a single or multi-step form with <strong>shadcn/ui</strong> fields, React Hook Form or TanStack Form bindings, and Zod validation — then copy the complete, production-ready output. No account, no runtime dependency, no vendor.",
		stats: [
			{ v: "3", l: "Output formats" },
			{ v: "2", l: "Form libraries", em: "2" },
			{ v: "0", l: "Runtime vendor lock-in", em: "0" },
			{ v: "1", l: "Click to copy", em: "1" },
		],
		shotLabel: "Builder + live preview panel",
		problemTitle: "The problem",
		problem: [
			"Every scaffolding tool gives you a skeleton; no tool gives you a <strong>complete, wired-up form</strong> ready to paste into a real project. You still write the Zod schema by hand, wire up the library bindings, and add the shadcn fields one by one. For a multi-step form that is twenty minutes of boilerplate before you write a single line of business logic.",
			"Form builders that do remove that friction <strong>trap you in their runtime</strong>. The generated output only works inside their platform, and migrating off means rewriting from scratch. FormCraft generates code you own: the component, the schema, and the page file — all of it plain TypeScript you can read, edit, and commit.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"A pure client-side studio with no backend — the only output is text you copy. The interesting engineering is keeping the builder state, the live preview, and three different output renderers in sync without the whole thing becoming a spaghetti of effects.",
		architecture: [
			{
				l: "Builder",
				chips: [
					{ t: "React DnD", v: "hot" },
					{ t: "Field config panel" },
					{ t: "Step manager", v: "cool" },
				],
			},
			{
				l: "Preview",
				chips: [
					{ t: "Live shadcn/ui render", v: "hot" },
					{ t: "RHF or TanStack Form", v: "hot" },
					{ t: "Zod validation live", v: "cool" },
				],
			},
			{
				l: "Codegen",
				chips: [
					{ t: "JSX + Zod schema", v: "hot" },
					{ t: "JSON schema export" },
					{ t: "Full page/route file", v: "cool" },
				],
			},
			{
				l: "Output",
				chips: [
					{ t: "One-click copy", v: "hot" },
					{ t: "No runtime dep" },
					{ t: "Prettier-formatted", v: "cool" },
				],
			},
			{
				l: "Tooling",
				chips: [{ t: "Next.js 15" }, { t: "Biome" }, { t: "Tailwind v4" }],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Generate code, do not wrap it",
				body: "The output is a <code>.tsx</code> file with zero imports from FormCraft. Most generators produce components that call back into their own SDK — FormCraft produces code that reads as if you wrote it yourself. That is the exit guarantee.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Both RHF and TanStack Form as first-class targets",
				body: "RHF is the market default; TanStack Form is the right choice for complex validation trees. FormCraft generates for either — not by maintaining two codebases, but by treating the form library as a codegen parameter the builder passes to the renderer.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Three output formats from one schema",
				body: "The internal builder state is a JSON schema. JSX output, JSON export, and full page file are all renderers over that same schema — so adding a fourth output format (say, a Remix action) is a new renderer, not a new feature branch.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "Keeping preview and codegen honest",
				body: "The live preview renders the actual form using the actual libraries. The codegen emits the text that represents it. If they ever drift — a validation rule in the preview that the codegen forgets to emit — the tool becomes a liar. The constraint: codegen is derived from the same schema the preview reads, never from inspecting the preview's DOM.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Multi-step state across codegen targets",
				body: "Single-page forms are straightforward. Multi-step forms require coordinating step transitions, per-step Zod schemas, and a submission handler that only fires at the end — and that coordination looks different in RHF vs TanStack Form. The step model had to be library-agnostic at the schema level.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Formatting the emitted code",
				body: "Code that comes out of a generator is usually unreadable — inconsistent indentation, unnecessary blank lines, jumbled imports. Running Prettier (via <code>prettier/standalone</code>) in the browser over the emitted string before the copy means what you paste is what you would have written.",
				accent: "secondary",
			},
		],
		quote:
			"A tool that hands you a platform dependency is not a tool — it is a slow migration waiting to happen. FormCraft hands you a file.",
		quoteAttribution: "Parm, on FormCraft",
	},

	// ═════════════════
	// PIPE  (case study)
	// ═════════════════
	{
		slug: "pipe",
		readTime: "8 min",
		image: `${CDN}/web/projects/pipe.jpg`,
		heroTitle:
			"PIPE — an <em>FFmpeg-powered</em> HLS pipeline for a working video creator.",
		tagline:
			"Upload once, get back an Instagram Reel, a YouTube Short, HLS segments, a blur-shot thumbnail, and a cover — all queued, all on R2.",
		overlineTags: ["client work", "video", "shipped"],
		overviewTitle: "One upload, <em>every format</em>",
		overviewBody:
			"PIPE is a transcoding pipeline built for a client who shoots and edits video professionally. The problem was simple and painful: every platform wants a different format, aspect ratio, and codec. PIPE takes a single source upload and fans out — <strong>Instagram Reels, YouTube Shorts, HLS adaptive streaming</strong>, a blurred-background thumbnail, and a cover image — all without the creator touching FFmpeg.",
		stats: [
			{ v: "4+", l: "Output formats", em: "4" },
			{ v: "0", l: "FFmpeg commands typed by client", em: "0" },
			{ v: "1", l: "Real client", em: "1" },
			{ v: "R2", l: "Storage", em: "R2" },
		],
		shotLabel: "Upload → processing → output grid",
		problemTitle: "The problem",
		problem: [
			"A professional video creator publishing across Instagram and YouTube re-exports the same footage multiple times — different resolutions, aspect ratios, and codec settings per platform. That is <strong>twenty minutes of manual FFmpeg or Premiere work per video</strong>, before any editing happens. For someone who publishes daily, it compounds into hours a week.",
			"The real requirement was not a transcoder — it was <strong>disappearing the decision</strong>. Upload a source, get back every derivative you need, stored and ready, with no flags to remember and no export queue to babysit.",
		],
		architectureTitle: "The pipeline",
		architectureIntro:
			"The same core pattern as AmarV4 — signed upload, queue, transcode, R2 — but the fan-out step is more complex: one source becomes five distinct outputs, each with different FFmpeg filter chains and path conventions.",
		architecture: [
			{
				l: "Upload",
				chips: [
					{ t: "Signed URL → R2", v: "hot" },
					{ t: "Direct from client" },
					{ t: "Server bypassed", v: "cool" },
				],
			},
			{
				l: "Queue",
				chips: [
					{ t: "BullMQ", v: "hot" },
					{ t: "Hono backend" },
					{ t: "Redis" },
				],
			},
			{
				l: "Transcode",
				chips: [
					{ t: "FFmpeg", v: "hot" },
					{ t: "Instagram 9:16 Reel" },
					{ t: "YouTube Short" },
					{ t: "HLS segments + master", v: "cool" },
				],
			},
			{
				l: "Derive",
				chips: [
					{ t: "Blur-shot thumbnail", v: "hot" },
					{ t: "Cover frame extract" },
					{ t: "Structured R2 paths", v: "cool" },
				],
			},
			{
				l: "Playback",
				chips: [
					{ t: "React Video Player", v: "hot" },
					{ t: "HLS adaptive" },
					{ t: "Output grid UI", v: "cool" },
				],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Fan-out as named jobs, not one mega-job",
				body: "Each output format is a separate BullMQ job. If the Instagram render fails, the HLS segments still complete. The client sees per-format progress and only broken outputs need retrying — not the whole upload.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Structured R2 paths as the delivery contract",
				body: "Every output lands at a deterministic path: <code>uploads/{id}/hls/master.m3u8</code>, <code>uploads/{id}/reel.mp4</code>, and so on. The frontend never asks the backend &ldquo;where did the files go?&rdquo; — it constructs the URL from the job ID. No extra database round-trip.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Blur-shot thumbnail from FFmpeg, not a design tool",
				body: "The blurred-background thumbnail — source frame centred on a blurred full-bleed version of itself — is a single FFmpeg filtergraph. It saves the client from opening any image editor and produces a consistent look across every video automatically.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "FFmpeg filtergraphs for the blur-shot",
				body: "The blurred background + centred source composite sounds simple and is not. The filtergraph has to scale the source to two different sizes, blur one, overlay the other with correct gravity and padding — and do all of it in a single pass to keep encode time reasonable.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Aspect ratio maths for platform crops",
				body: "Instagram and YouTube Shorts both want 9:16, but a landscape source cropped naively loses the subject. A centre-crop is the safe default, but getting the crop coordinates right across arbitrary source resolutions without distortion took more geometry than expected.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Progress visibility across five parallel jobs",
				body: "Five jobs per upload means five status states the UI has to reflect simultaneously. BullMQ has per-job event emitters; wiring them into a coherent &ldquo;this upload is 3/5 done&rdquo; view over SSE was the most fiddly part of the frontend.",
				accent: "secondary",
			},
		],
		quote:
			"The client's job is to make good video. PIPE's job is to make sure the format question never enters the room.",
		quoteAttribution: "Parm, on PIPE",
	},

	// ════════════════
	//  EMAILOS  (case study)
	// ════════════════════════════
	{
		slug: "emailos",
		readTime: "9 min",
		// {`${CDN}/web/PP1.jpg`}
		image: `${CDN}/web/projects/emailos.jpg`,
		heroTitle:
			"EmailOS — an <em>email layer</em> that captures everything and forgets nothing.",
		tagline:
			"Sit in front of Resend or SES, capture every inbound and outbound email, archive it permanently, and give it a searchable inbox.",
		overlineTags: ["tool", "infra", "concept"],
		overviewTitle: "Your email provider's <em>30-day limit</em>, removed.",
		overviewBody:
			"Resend, SES, Postmark — every transactional email provider expires your logs. EmailOS is a capture-and-archive layer that sits in front of (or alongside) your existing provider: it intercepts outbound sends, receives inbound via webhook, stores everything permanently in Postgres, and gives you a clean searchable inbox UI. Change providers without losing history. Audit any email ever sent from your app.",
		stats: [
			{ v: "∞", l: "Retention", em: "∞" },
			{ v: "0", l: "Provider lock-in", em: "0" },
			{ v: "2", l: "Flows captured", em: "2" },
			{ v: "FTS", l: "Search engine", em: "FTS" },
		],
		shotLabel: "Inbox + email detail view",
		problemTitle: "The problem",
		problem: [
			"Every transactional email provider expires logs after 30–90 days. For a small SaaS that means <strong>you cannot answer &ldquo;did this user receive their invite email six months ago?&rdquo;</strong> — the record is gone. For compliance, audits, or debugging a subtle delivery bug, that gap is genuinely dangerous.",
			"The fix sounds simple: just save a copy before you send. The reality is that outbound needs to be proxied or hooked, inbound needs a webhook receiver and an MX setup, and the stored emails need to be <strong>queryable, not just archived</strong>. EmailOS does all three without replacing your existing provider — it augments it.",
		],
		architectureTitle: "System architecture",
		architectureIntro:
			"Two capture paths — an outbound proxy SDK and an inbound webhook — feed into a single Postgres store. The UI is a read layer over that store. The provider is swappable at any point; the archive is not touched.",
		architecture: [
			{
				l: "Outbound",
				chips: [
					{ t: "Thin SDK wrapper", v: "hot" },
					{ t: "Captures before send" },
					{ t: "Provider-agnostic", v: "cool" },
				],
			},
			{
				l: "Inbound",
				chips: [
					{ t: "Webhook receiver", v: "hot" },
					{ t: "Cloudflare Email Routing" },
					{ t: "MIME parse", v: "cool" },
				],
			},
			{
				l: "Store",
				chips: [
					{ t: "Postgres", v: "hot" },
					{ t: "Drizzle ORM" },
					{ t: "Attachments → R2", v: "cool" },
				],
			},
			{
				l: "Search",
				chips: [
					{ t: "Postgres FTS", v: "hot" },
					{ t: "Subject + body indexed" },
					{ t: "Ranked results", v: "cool" },
				],
			},
			{
				l: "Inbox UI",
				chips: [
					{ t: "Next.js 15", v: "hot" },
					{ t: "Hono API" },
					{ t: "Thread view", v: "cool" },
				],
			},
		],
		decisionsTitle: "Three decisions worth defending",
		decisions: [
			{
				label: "Decision 01",
				title: "Capture at the SDK level, not the provider level",
				body: "Capturing via provider webhooks means you depend on the provider delivering those webhooks — and you lose the archive if you switch providers. A thin wrapper around the send call captures <em>before</em> the provider is ever involved, so the archive is truly provider-independent.",
				accent: "accent",
			},
			{
				label: "Decision 02",
				title: "Attachments to R2, metadata to Postgres",
				body: "Storing full email blobs in Postgres is an antipattern that makes the database huge and slow. EmailOS stores headers, subject, body text, and thread relationships in Postgres — where they are queryable — and offloads attachment binaries to R2 with a foreign key. Search stays fast; storage stays cheap.",
				accent: "amber",
			},
			{
				label: "Decision 03",
				title: "Postgres FTS over a dedicated search service",
				body: "Email search is overwhelmingly subject-line and sender lookups, not full-document relevance ranking. Postgres <code>tsvector</code> handles that comfortably and keeps the stack to one datastore. Meilisearch or Typesense would be premature for the corpus size EmailOS targets.",
				accent: "secondary",
			},
		],
		challengesTitle: "Hardest problems, plainly",
		challenges: [
			{
				label: "Challenge 01",
				title: "MIME parsing is a minefield",
				body: "Real-world emails arrive as multi-part MIME trees — HTML body, plain-text fallback, inline images with Content-ID references, attachments with mismatched charset declarations. Parsing them into a clean stored representation without losing any part required careful handling of every edge case the standard allows and several it does not.",
				accent: "accent",
			},
			{
				label: "Challenge 02",
				title: "Threading without a thread ID",
				body: "Email threading relies on <code>In-Reply-To</code> and <code>References</code> headers — which not every sender sets correctly. Building a thread view that degrades gracefully to subject-line matching when headers are absent, without creating false threads, was more logic than expected.",
				accent: "amber",
			},
			{
				label: "Challenge 03",
				title: "Idempotent inbound delivery",
				body: "Webhook providers retry on timeout. If the receiver is slow, the same email arrives twice. The ingest path deduplicates on <code>Message-ID</code> with an upsert, so replays are safe — but getting that upsert right under concurrent delivery took care with Drizzle's conflict clauses.",
				accent: "secondary",
			},
		],
		quote:
			"Your email provider owns your logs for 30 days. After that, you never sent those emails. EmailOS fixes that in one SDK line.",
		quoteAttribution: "Parm, on EmailOS",
	},
];

export const getCaseStudy = (slug: string) =>
	CASE_STUDIES.find((c) => c.slug === slug);

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((c) => c.slug);

export const hasCaseStudy = (slug: string) => CASE_STUDY_SLUGS.includes(slug);

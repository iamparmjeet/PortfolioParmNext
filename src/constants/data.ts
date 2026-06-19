export const CDN = "https://assets.parmjeetmishra.com";
export const EMAIL = "iamparmjeetmishra@gmail.com";
export const TITLE = "Parmjeet Mishra · Full-Stack React Developer";

// ********** About Page ******************
export const stack = [
	{
		title: "Frontend",
		items: [
			{ label: "React 19", hot: true },
			{ label: "Next 16", hot: true },
			{ label: "TypeScript", hot: true },
			{ label: "Tailwind", hot: false },
			{ label: "shadcn", hot: false },
		],
	},
	{
		title: "Backend",
		items: [
			{ label: "Hono", hot: true },
			{ label: "Postgres", hot: true },
			{ label: "Drizzle", hot: true },
			{ label: "Better Auth", hot: false },
			{ label: "oRPC", hot: false },
		],
	},
	{
		title: "AI",
		items: [
			{ label: "Claude API", hot: true },
			{ label: "Vercel AI SDK", hot: false },
			{ label: "RAG", hot: false },
			{ label: "Upstash Vector", hot: false },
		],
	},
	{
		title: "Infra",
		items: [
			{ label: "CF R2", hot: false },
			{ label: "Docker", hot: false },
			{ label: "Vercel", hot: false },
			{ label: "Railway", hot: false },
			{ label: "FFmpeg", hot: false },
		],
	},
];

export const bio = [
	{ k: "Based in", v: "Ludhiana, IN", accent: false },
	{ k: "Timezone", v: "IST · UTC+5:30", accent: false },
	{ k: "Status", v: "Open to work", accent: true },
	{ k: "Setup", v: "Arch · Hyprland", accent: false },
	{ k: "Editor", v: "Zed · LazyVim", accent: false },
	{ k: "Runtime", v: "Bun · Node", accent: false },
];

export const timeline = [
	{
		year: "2025 — PRESENT",
		title: "Full-Stack Developer · AI focus",
		desc: "Building Rentwise, AmarV4, and AI tools. Targeting remote-global roles and Indian product startups.",
		dim: false,
	},
	{
		year: "2024",
		title: "First freelance clients",
		desc: "Shipped KRM Engineering Works. Started AmarjeetMishra.com for Amarjeet, a professional video editor professional.",
		dim: false,
	},
	{
		year: "2023 — 2024",
		title: "Deep dive into modern web dev",
		desc: "React, Next.js, TypeScript, Hono, Drizzle, PostgreSQL, Docker. Switched fulltime to Arch + Hyprland.",
		dim: false,
	},
	{
		year: "2020 — 2022",
		title: "WordPress developer",
		desc: "Two years building client sites on WordPress — my first real taste of the web as a craft.",
		dim: true,
	},
	{
		year: "2016 — 2020",
		title: "Science and Social studies teacher",
		desc: "Teaching Biology, Chemistry and Social Studies at secondary level in Ludhiana, Punjab.",
		dim: true,
	},
];

// ********** About Page Ends ******************
// ********** Contact Page *********************
export const contacts = [
	{
		icon: "@",
		label: "Email — preferred",
		value: "iamparmjeetmishra@gmail.com",
		href: "mailto:iamparmjeetmishra@gmail.com",
		external: false,
	},
	{
		icon: "{ }",
		label: "GitHub",
		value: "github.com/iamparmjeet",
		href: "https://github.com/iamparmjeet",
		external: true,
	},
	{
		icon: "in",
		label: "LinkedIn",
		value: "linkedin.com/in/parmjeetmishra",
		href: "https://linkedin.com/in/parmjeetmishra",
		external: true,
	},
	{
		icon: "𝕏",
		label: "Twitter / X",
		value: "@iamparmjeet",
		href: "https://x.com/iamparmjeet",
		external: true,
	},
	{
		icon: "↗",
		label: "Portfolio V1",
		value: "parmjeetmishra.com",
		href: "https://parmjeetmishra.com",
		external: true,
	},
];

export const looking = [
	{
		n: "i.",
		t: "Full-time remote role",
		s: "React/Next.js developer at a startup or product company. Async-first culture preferred.",
	},
	{
		n: "ii.",
		t: "Indian startup — on-site or hybrid",
		s: "Early-stage or Series A with a real product. Ludhiana, or remote from Punjab.",
	},
	{
		n: "iii.",
		t: "Freelance projects",
		s: "Next.js builds, Hono APIs, AI integrations. Minimum three-week engagements.",
	},
	{
		n: "iv.",
		t: "Ideal stack overlap",
		s: "React · Next.js · TypeScript · Hono / Express · PostgreSQL · AI integrations.",
	},
];
// ********** Contact Page Ends ******************
// ********** Resume Page ******************
export const experience = [
	{
		period: "2025 — Present",
		badge: "Current",
		title: "Full-Stack Developer",
		sub: "freelance + self-directed",
		org: "Independent · Remote from Ludhiana, IN",
		desc: "Building Rentwise (multi-tenant SaaS), AmarV4 (HLS video platform), and a suite of AI applications using the Claude API and Vercel AI SDK. Targeting remote-global roles while shipping real products.",
		tags: [
			"Next.js 16",
			"React 19",
			"TypeScript",
			"Hono",
			"Drizzle ORM",
			"PostgreSQL",
			"Claude API",
			"Better Auth",
			"BullMQ",
			"FFmpeg",
		],
	},
	{
		period: "2024",
		title: "Frontend Developer",
		sub: "freelance client work",
		org: "KRM Engineering Works · AmarV3/V4 (Amarjeet Mishra)",
		desc: "Shipped two client projects: a B2B industrial product catalog with URL-based filter state and mailto enquiry flow (KRM), and a cinematic video portfolio with a custom HLS pipeline and BullMQ job queue for professional video editor Amarjeet Mishra.",
		tags: [
			"Next.js 15",
			"Zustand",
			"shadcn/ui",
			"Hono",
			"FFmpeg · HLS",
			"Cloudflare R2",
		],
	},
	{
		period: "2020 — 2022",
		title: "WordPress Developer",
		sub: "client sites",
		org: "Freelance · Ludhiana, IN",
		desc: "Built and maintained client websites on WordPress for two years. First professional exposure to web development — this curiosity eventually led to a full modern stack transition.",
		tags: ["WordPress", "PHP", "HTML/CSS", "JavaScript"],
	},
	{
		period: "2016 — 2020",
		title: "Science Teacher",
		sub: "secondary level",
		org: "Ludhiana, Punjab, India",
		desc: "Taught Physics and Chemistry at secondary level for over a decade. Developed strong skills in breaking complex systems into digestible parts — a mindset that transfers directly to engineering and architecture decisions.",
		tags: [],
	},
];

export const skills = [
	{
		label: "Frontend",
		items: [
			{ name: "React 19", hot: true },
			{ name: "Next.js 16", hot: true },
			{ name: "TypeScript", hot: true },
			{ name: "Tailwind CSS v4" },
			{ name: "shadcn/ui" },
			{ name: "TanStack Query" },
			{ name: "React Hook Form" },
			{ name: "Zod" },
		],
	},
	{
		label: "Backend",
		items: [
			{ name: "Hono.js", hot: true },
			{ name: "PostgreSQL", hot: true },
			{ name: "Drizzle ORM", hot: true },
			{ name: "Better Auth" },
			{ name: "FFmpeg · HLS" },
			{ name: "Express.js" },
			{ name: "Bun · Node.js" },
		],
	},
	{
		label: "AI / Data",
		items: [
			{ name: "Claude API", hot: true },
			{ name: "Vercel AI SDK", hot: true },
			{ name: "RAG patterns" },
			{ name: "Upstash Vector" },
			{ name: "pdf-parse" },
		],
	},
	{
		label: "Infra / Tools",
		items: [
			{ name: "Vercel" },
			{ name: "Cloudflare R2" },
			{ name: "Railway" },
			{ name: "Docker" },
			{ name: "Arch Linux" },
			{ name: "Zed · LazyVim" },
			{ name: "Biome · ESLint" },
			{ name: "Git · GitHub" },
		],
	},
];

export const education = [
	{
		period: "2023 — Present",
		title: "Self-directed modern web development",
		sub: "Project-based learning · React, Next.js, TypeScript, Hono, PostgreSQL, AI",
		desc: "Learned by building real products with real constraints — no bootcamp, no tutorial-only projects. Every concept was applied immediately to a live project.",
	},
	{
		period: "2020 — 2022",
		title: "WordPress & frontend fundamentals",
		sub: "Client work · HTML, CSS, JavaScript, PHP",
		desc: "Two years of building and maintaining client sites — the foundation that sparked the transition to modern full-stack development.",
	},
	{
		period: "Pre-2020",
		title: "B.A — PSIR",
		sub: "Punjab, India · Secondary-level teaching certification",
		desc: "Formal education in science and social studies and pedagogy. The systematic breakdown of complex topics is the most transferable skill from teaching to engineering.",
	},
];

// ********** Resume Page Ends ******************

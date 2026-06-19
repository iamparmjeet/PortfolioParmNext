export interface Project {
	id: string;
	n: string;
	title: string;
	italic: string;
	desc: string;
	tags: string[];
	stack: string[];
	year: string;
	cats: string[];
	featured?: boolean;
}

export const PROJECTS: Project[] = [
	{
		id: "rentwise",
		n: "01",
		title: "Rentwise",
		italic: "a rental SaaS",
		desc: "Multi-tenant property management. Three user roles, role-based dashboards, tenant invite flow built on Better Auth + Hono RPC + Drizzle. Shares a Turborepo with Schooly.",
		tags: ["active", "saas", "flagship"],
		stack: [
			"Next.js 16",
			"oRPC",
			"Better Auth",
			"Drizzle",
			"PostgreSQL",
			"Turborepo",
			"Bun",
		],
		year: "2026",
		cats: ["saas", "building"],
		featured: true,
	},
	{
		id: "schooly",
		n: "02",
		title: "Schooly",
		italic: "a school platform",
		desc: "Multi-tenant school management — attendance, fees, report cards, and parent communication. Four roles over tenant-isolated data, sharing auth/ui/db packages with Rentwise in one Turborepo.",
		tags: ["active", "saas"],
		stack: [
			"Next.js 16",
			"oRPC",
			"Better Auth",
			"Drizzle",
			"PostgreSQL",
			"Turborepo",
		],
		year: "2026",
		cats: ["saas", "building"],
	},
	{
		id: "amarv4",
		n: "03",
		title: "Amar",
		italic: "video portfolio",
		desc: "Cinematic HLS pipeline for a video editor — FFmpeg transcoding, BullMQ job queue, Cloudflare R2 storage, React context-based multi-instance playback.",
		tags: ["active", "client"],
		stack: ["Next.js 16", "Hono", "FFmpeg", "BullMQ", "HLS", "CF R2"],
		year: "2024",
		cats: ["client", "building"],
		featured: true,
	},

	{
		id: "krm",
		n: "04",
		title: "KRM Engineering Works",
		italic: "a B2B catalog",
		desc: "Industrial product catalog with URL-based filter state, Zustand cart, mailto enquiry flow, responsive category navigation. Shipped to production.",
		tags: ["shipped", "client"],
		stack: ["Next.js 16", "Zustand", "shadcn/ui", "Tailwind", "Biome"],
		year: "2024",
		cats: ["client"],
	},
	{
		id: "nxtrmt",
		n: "05",
		title: "NxtRmtJobs",
		italic: "a remote-job board",
		desc: "IST timezone overlap calculator shows Indian devs the exact overlap window for each remote role. Own Hono backend, full-text search, Better Auth.",
		tags: ["building", "personal"],
		stack: ["Next.js 15", "Hono", "Drizzle", "PostgreSQL", "Better Auth"],
		year: "2025",
		cats: ["building"],
	},
	{
		id: "carekit",
		n: "06",
		title: "CareKit",
		italic: "config-driven white-label",
		desc: "One codebase that becomes PetCare, ChildCare, AutoCare, or BikeCare. A single serviceConfig.ts drives every terminology, feature flag, and CSS theme.",
		tags: ["concept", "platform"],
		stack: ["Next.js 15", "Hono", "Drizzle", "Razorpay", "Resend"],
		year: "2025",
		cats: ["building"],
	},
	{
		id: "nextemail",
		n: "07",
		title: "NextEmail",
		italic: "an email template kit",
		desc: "Live iframe preview and one-click HTML copy. react-email handles cross-client rendering; shadcn form feeds variables into templates.",
		tags: ["building", "tool"],
		stack: [
			"Next.js 15",
			"react-email",
			"React Hook Form",
			"shadcn/ui",
			"Resend",
		],
		year: "2025",
		cats: ["building"],
	},
	{
		id: "contextchat",
		n: "08",
		title: "ContextChat",
		italic: "a RAG playground",
		desc: "Upload PDFs → ask questions. Voyage AI embeddings + Upstash Vector + Claude. Answers cite back to source pages.",
		tags: ["concept", "ai"],
		stack: [
			"Next.js 15",
			"Claude API",
			"Voyage AI",
			"Upstash Vector",
			"Vercel AI SDK",
		],
		year: "2026",
		cats: ["ai"],
	},
];

export const getFeaturedProjects = () => PROJECTS.filter((p) => p.featured);
export const getProjectById = (id: string) => PROJECTS.find((p) => p.id === id);

import type { StaticImageData } from "next/image";
import { CDN } from "@/constants";

export interface Project {
	id: string;
	n: string;
	title: string;
	image?: string | StaticImageData;
	italic: string;
	desc: string;
	tags: string[];
	stack: string[];
	year: string;
	cats: string[];
	featured?: boolean;
	visiable?: boolean;
}

export const PROJECTS: Project[] = [
	{
		id: "rentwise",
		n: "01",
		title: "Rentwise",
		italic: "a rental SaaS",
		image: `${CDN}/web/projects/rentwise.jpg`,
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
		visiable: true,
	},
	{
		id: "schooly",
		n: "02",
		title: "Schooly",
		image: `${CDN}/web/projects/schooly.jpg`,
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
		featured: true,
		visiable: true,
	},
	{
		id: "amar",
		n: "03",
		title: "Amar",
		image: `${CDN}/web/projects/amar.jpg`,
		italic: "video portfolio",
		desc: "Cinematic HLS pipeline for a video editor — FFmpeg transcoding, BullMQ job queue, Cloudflare R2 storage, React context-based multi-instance playback.",
		tags: ["active", "client"],
		stack: ["Next.js 16", "Hono", "FFmpeg", "BullMQ", "HLS", "CF R2"],
		year: "2024",
		cats: ["client", "building"],
		featured: false,
		visiable: true,
	},

	{
		id: "krm",
		n: "04",
		title: "KRM Engineering Works",
		image: `${CDN}/web/projects/krm.jpg`,
		italic: "a B2B catalog",
		desc: "Industrial product catalog with URL-based filter state, Zustand cart, mailto enquiry flow, responsive category navigation. Shipped to production.",
		tags: ["shipped", "client"],
		stack: ["Next.js 16", "Zustand", "shadcn/ui", "Tailwind", "Biome"],
		year: "2024",
		cats: ["client"],
		featured: false,
		visiable: true,
	},
	{
		id: "nxtrmt",
		n: "05",
		title: "NxtRmtJobs",
		image: `${CDN}/web/projects/nxtrmt.jpg`,
		italic: "a remote-job board",
		desc: "IST timezone overlap calculator shows Indian devs the exact overlap window for each remote role. Own Hono backend, full-text search, Better Auth.",
		tags: ["building", "personal"],
		stack: ["Next.js 15", "Hono", "Drizzle", "PostgreSQL", "Better Auth"],
		year: "2025",
		cats: ["building"],
		featured: false,
		visiable: false,
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
		featured: false,
		visiable: false,
	},
	{
		id: "formcraft",
		n: "07",
		title: "FormCraft",
		italic: "a visual form builder",
		desc: "Visual form studio — configure single or multi-step forms with shadcn/ui fields, then copy the JSX component, Zod schema, JSON schema, or a full page file. Zero runtime dependency on FormCraft.",
		tags: ["building", "tool", "open-source"],
		stack: [
			"Next.js 15",
			"React Hook Form",
			"TanStack Form",
			"Zod",
			"shadcn/ui",
			"Tailwind v4",
			"Biome",
		],
		image: `${CDN}/web/projects/formcraft.jpg`,
		year: "2026",
		cats: ["tool", "open-source"],
		featured: true,
		visiable: true,
	},

	// PIPE — update the existing entry (n: "08"):
	{
		id: "pipe",
		n: "08",
		title: "PIPE",
		image: `${CDN}/web/projects/pipe.jpg`,
		italic: "an FFmpeg video pipeline",
		desc: "Client project. Upload one source video — get back an Instagram Reel, YouTube Short, HLS adaptive stream, blur-shot thumbnail, and cover frame. BullMQ fan-out, Cloudflare R2 storage.",
		tags: ["client", "shipped"],
		stack: [
			"Next.js 16",
			"Hono",
			"BullMQ",
			"FFmpeg",
			"HLS",
			"React Video Player",
			"Cloudflare R2",
		],
		year: "2026",
		cats: ["client", "video"],
		featured: false,
		visiable: true,
	},

	// EmailOS — new entry:
	{
		id: "emailos",
		n: "09",
		title: "EmailOS",
		image: `${CDN}/web/projects/emailos.jpg`,
		italic: "a permanent email archive",
		desc: "Capture-and-archive layer that sits in front of Resend or SES. Intercepts outbound, receives inbound via webhook, stores everything permanently in Postgres with R2 for attachments. Full-text search inbox UI.",
		tags: ["concept", "tool"],
		stack: [
			"Next.js 15",
			"Hono",
			"Drizzle",
			"PostgreSQL",
			"Cloudflare R2",
			"Cloudflare Email Routing",
			"Resend",
		],
		year: "2026",
		cats: ["tool", "building"],
		featured: false,
		visiable: true,
	},
];

export const getFeaturedProjects = () => PROJECTS.filter((p) => p.featured);
export const getProjectById = (id: string) => PROJECTS.find((p) => p.id === id);

export interface BlogSection {
	type: "p" | "h2" | "ul" | "pre" | "pull" | "hr";
	content: string | string[];
}

export interface Blog {
	slug: string;
	n: string;
	title: string;
	italic: string;
	category: "Architecture" | "AI" | "Engineering" | "Career";
	date: string;
	readTime: string;
	excerpt: string;
	featured?: boolean;
	sections: BlogSection[];
}

export const BLOGS: Blog[] = [
	{
		slug: "hono-over-express",
		n: "01",
		title: "Why I chose Hono over Express",
		italic: "and what I gave up.",
		category: "Architecture",
		date: "May 2026",
		readTime: "8 min",
		featured: true,
		excerpt:
			'Hono is not just "Express but fast." It is a fundamentally different mental model for HTTP. Here is what I learned building a multi-tenant SaaS on it.',
		sections: [
			{
				type: "p",
				content:
					"When I started building Rentwise — a multi-tenant rental SaaS — I needed a backend framework. The obvious choice was Express. Everyone knows Express. Every tutorial uses Express. Every Stack Overflow answer assumes Express.",
			},
			{
				type: "p",
				content:
					"I chose <strong>Hono</strong> instead. This is what happened.",
			},
			{ type: "h2", content: "What Hono actually is" },
			{
				type: "p",
				content:
					"Hono is not a faster Express. That framing undersells it and also misleads you. Express was designed for Node.js and has been carrying that design debt for fifteen years. Hono was designed for <em>the Web Platform</em> — which means it runs natively on Cloudflare Workers, Bun, Deno, and Node.js, using the same Request/Response objects your browser uses.",
			},
			{
				type: "p",
				content:
					"That matters more than it sounds. When you write a Hono handler, you are writing code that is conceptually close to a Service Worker, a fetch handler, an edge function. The mental model transfers.",
			},
			{
				type: "pull",
				content:
					"Hono is not just 'Express but fast.' It is a fundamentally different mental model for HTTP.",
			},
			{ type: "h2", content: "The killer feature: RPC" },
			{
				type: "p",
				content:
					"The thing that actually made me commit to Hono for Rentwise was the <code>hc</code> client — Hono's built-in RPC system. Here is what it does:",
			},
			{
				type: "pre",
				content: `// Server: define your route with a typed response
const app = new Hono()
  .get('/properties', async (c) => {
    const properties = await db.select().from(schema.properties)
    return c.json({ properties })
  })

// Client: get FULL type inference, zero codegen
const client = hc<typeof app>('http://localhost:3000')
const res = await client.properties.$get()
const { properties } = await res.json() // ← fully typed!`,
			},
			{
				type: "p",
				content:
					"No tRPC setup. No OpenAPI spec. No codegen step. The types flow from your router definition to your client automatically. I eliminated an entire category of 'I changed the API and forgot to update the client' bugs.",
			},
			{ type: "h2", content: "What I gave up" },
			{
				type: "p",
				content:
					"Honesty time. Express has fifteen years of middleware. When I needed something slightly off the beaten path — a specific auth pattern, a specific CORS edge case — I could always find an Express answer in thirty seconds.",
			},
			{
				type: "p",
				content:
					"With Hono, I sometimes wrote the thing myself. That is not always bad (you understand what you wrote), but it is a real cost when you are under deadline.",
			},
			{
				type: "p",
				content:
					"<strong>The ecosystem gap is closing fast</strong>, though. Better Auth has first-class Hono support. Drizzle works everywhere. Most of what I needed was just there.",
			},
			{ type: "h2", content: "My verdict" },
			{
				type: "p",
				content:
					"For a new project where end-to-end type safety matters and you want to deploy to the edge, Hono is the right call. For a team that already knows Express and needs to ship fast, Express is still fine — do not migrate for vibes.",
			},
			{
				type: "p",
				content:
					"For Rentwise specifically, the RPC client alone saved me more time than the ecosystem cost me. Easy decision in hindsight.",
			},
		],
	},
	{
		slug: "three-layers-of-auth",
		n: "02",
		title: "Three layers of auth",
		italic: "why Next.js middleware alone is not enough.",
		category: "Architecture",
		date: "May 2026",
		readTime: "6 min",
		excerpt:
			"The bug that broke Rentwise's invite flow taught me something important about where auth actually needs to live in an App Router project.",
		sections: [
			{
				type: "p",
				content:
					"Rentwise has three user roles — Owner, Tenant, Admin. Each role sees a completely different dashboard. Getting this wrong does not just break the UI — it potentially exposes one tenant's data to another. So I took auth seriously.",
			},
			{
				type: "p",
				content:
					"I started with the obvious approach: <strong>Next.js Middleware</strong>. Protect the <code>/dashboard</code> routes, redirect unauthenticated users to <code>/login</code>. Done, right?",
			},
			{
				type: "p",
				content:
					"Wrong. Here is what middleware alone misses — and how I ended up with three layers.",
			},
			{ type: "h2", content: "Layer 1: Middleware (the gatekeeper)" },
			{
				type: "p",
				content:
					"Next.js Middleware runs at the edge before the request reaches your page. It is fast, it redirects, and it handles the obvious case: 'is this user logged in at all?'",
			},
			{
				type: "p",
				content:
					"But here is the problem: <strong>Middleware does not protect React Server Components</strong>. A Server Component that fetches data does not go through Middleware. If your RSC fetches <code>getPropertiesForOwner(userId)</code> without validating the session server-side, an attacker who bypasses the redirect still gets the data.",
			},
			{
				type: "h2",
				content: "Layer 2: Server Component layout (the validator)",
			},
			{
				type: "p",
				content:
					"Every dashboard layout re-validates the session using Better Auth's <code>auth.api.getSession()</code> on the server. If there is no valid session, it throws — which Next.js catches and redirects to the login page.",
			},
			{
				type: "p",
				content:
					"This catches the RSC data-fetch gap that Middleware misses. It is slightly slower (one extra DB read per navigation) but the security guarantee is worth it.",
			},
			{ type: "h2", content: "Layer 3: React Context (the role enforcer)" },
			{
				type: "p",
				content:
					"The third layer is a client-side <code>SessionProvider</code> that passes the validated session to all child components. Role-specific UI (admin-only buttons, owner-only property creation) is gated behind role checks using this context.",
			},
			{
				type: "pull",
				content:
					"Belt and suspenders and a third belt. The stakes justify the redundancy.",
			},
			{ type: "h2", content: "The real-world bug this caught" },
			{
				type: "p",
				content:
					"During testing, I discovered that Middleware was blocking unauthenticated tenant <em>invite acceptance</em> routes — new tenants could not even reach the sign-up page to accept their invite. The fix was redesigning the middleware matcher to allow public invite paths while still guarding all dashboard routes.",
			},
			{
				type: "p",
				content:
					"Without Layer 2, this would have been a silent security hole. Because Layer 2 caught it independently, I knew immediately when the fix was incomplete.",
			},
		],
	},
	{
		slug: "rag-retrieval",
		n: "03",
		title: "Building RAG that actually",
		italic: "retrieves the right thing.",
		category: "AI",
		date: "Apr 2026",
		readTime: "10 min",
		excerpt:
			"Vector search sounds simple until you realise the quality of your embeddings, chunking strategy, and reranking step matter more than the model you query.",
		sections: [
			{
				type: "p",
				content:
					"The pitch for RAG sounds simple: embed your documents, store the vectors, retrieve the relevant ones at query time, feed them to the LLM. Five steps. Clean.",
			},
			{
				type: "p",
				content:
					"Then you build it and discover that <em>everything in those five steps has a dozen wrong ways to do it</em>.",
			},
			{ type: "h2", content: "Where most RAG implementations go wrong" },
			{
				type: "p",
				content:
					"The most common mistake I see in RAG tutorials is <strong>treating all text as equal</strong>. Chunking a PDF into fixed 512-token blocks and embedding them all the same way produces a retrieval system that will confidently return the wrong section of a document — especially for multi-section documents like contracts, technical specs, or research papers.",
			},
			{ type: "h2", content: "The three things that actually matter" },
			{
				type: "ul",
				content: [
					"<strong>Chunking strategy</strong> — Semantic chunking (split at natural document boundaries like headings) consistently outperforms fixed-size chunking for structured documents.",
					"<strong>Embedding model quality</strong> — Voyage AI's <code>voyage-3</code> and OpenAI's <code>text-embedding-3-large</code> produce meaningfully better retrieval than older models. Do not skip this evaluation.",
					"<strong>Reranking</strong> — Retrieve more candidates (top-20), then rerank to top-5 before sending to the LLM. A cheap cross-encoder reranker catches cases where cosine similarity fails.",
				],
			},
			{
				type: "pull",
				content:
					"Vector similarity finds approximate matches. Reranking finds the correct ones.",
			},
			{ type: "h2", content: "What I built: ContextChat" },
			{
				type: "p",
				content:
					"ContextChat uses Voyage AI embeddings + Upstash Vector for storage + Claude for the final answer. The retrieval pipeline: semantic chunks → embed → store. At query time: embed query → retrieve top-20 → Claude reranks to top-5 → final answer with citations back to source pages.",
			},
			{
				type: "p",
				content:
					"The citations are the feature that makes it trustworthy — users can verify every claim against the original document.",
			},
		],
	},
	{
		slug: "hls-pipeline",
		n: "04",
		title: "The HLS pipeline I built",
		italic: "and what I would change.",
		category: "Engineering",
		date: "Mar 2026",
		readTime: "7 min",
		excerpt:
			"FFmpeg → BullMQ → Cloudflare R2 → adaptive streaming. Here is how the whole thing fits together, and the three things I would do differently now.",
		sections: [
			{
				type: "p",
				content:
					"My client Amarjeet is a professional video editor. He needed a portfolio that could stream cinematic 4K footage smoothly, handle multiple videos simultaneously, and look as premium as his work.",
			},
			{
				type: "p",
				content:
					"This is what I built: <strong>FFmpeg → BullMQ → Cloudflare R2 → HLS adaptive streaming</strong>. And here is what I would change.",
			},
			{ type: "h2", content: "The pipeline" },
			{
				type: "ul",
				content: [
					"<strong>Upload:</strong> Client uploads a source video via a signed URL directly to Cloudflare R2 (bypasses the server entirely for large files)",
					"<strong>Queue:</strong> Upload completion triggers a BullMQ job in the Hono backend",
					"<strong>Transcode:</strong> A worker processes the job with FFmpeg — outputs multiple quality tiers (360p, 720p, 1080p) as HLS segments + a master playlist",
					"<strong>Store:</strong> Segments go back to R2 under a structured path",
					"<strong>Stream:</strong> The player reads the master playlist and adapts quality to the viewer's connection",
				],
			},
			{
				type: "pull",
				content:
					"Building the pipeline took a week. Making it reliable took three more.",
			},
			{ type: "h2", content: "The three things I would change" },
			{
				type: "p",
				content:
					"<strong>1. Move transcoding to a dedicated worker process.</strong> I ran FFmpeg inside the main Hono process — fine for low traffic, but it blocks the event loop during heavy encodes. Next time: separate worker service, separate machine.",
			},
			{
				type: "p",
				content:
					"<strong>2. Add job progress streaming.</strong> The upload UI shows a spinner until transcoding is done. That is fine but a progress bar streamed via SSE would be far better UX for long encodes.",
			},
			{
				type: "p",
				content:
					"<strong>3. Use Cloudflare Stream instead.</strong> Cloudflare Stream handles transcoding, storage, and CDN delivery in one service. I built the pipeline from scratch to learn — but for a production client project with a deadline, I would use Stream and focus on the UI instead.",
			},
		],
	},
	{
		slug: "teacher-to-developer",
		n: "05",
		title: "From science teacher to developer",
		italic: "what actually transferred.",
		category: "Career",
		date: "Feb 2026",
		readTime: "12 min",
		excerpt:
			"Not a motivational post. A brutally honest breakdown of the skills that crossed over, the ones that did not, and the one thing teaching prepared me for that no bootcamp could.",
		sections: [
			{
				type: "p",
				content:
					"I spent twelve years teaching Physics and Chemistry to secondary students in Ludhiana. Then I became a web developer. People ask me what transferred. This is the honest answer — not the LinkedIn version.",
			},
			{ type: "h2", content: "What actually transferred" },
			{
				type: "p",
				content:
					"<strong>Breaking things down.</strong> Teaching forces you to understand something at multiple levels simultaneously — the intuitive level (so students get the concept), the formal level (so you can explain the mechanism), and the common-misconception level (so you can preempt the wrong mental models). This is exactly what good code review requires. It is exactly what good API design requires. It is exactly what good documentation requires.",
			},
			{
				type: "p",
				content:
					"<strong>Comfort with 'I do not know yet.'</strong> In a classroom, a student asks a question you do not know the answer to. You have two options: fake it, or say 'I do not know — let us find out.' The second option is more honest and teaches students that expertise is a process, not a state. I took that into development. I am comfortable saying I do not know a thing, finding the actual answer, and then explaining it properly.",
			},
			{
				type: "pull",
				content:
					"Teaching taught me that expertise is a process, not a state. That framing survived the career change.",
			},
			{ type: "h2", content: "What did not transfer" },
			{
				type: "p",
				content:
					"<strong>Speed.</strong> A classroom runs on your schedule. A production bug does not. The first time a client's site went down at 11pm, I discovered that twelve years of 'prepare the lesson the night before' had not prepared me for incident response under real time pressure.",
			},
			{
				type: "p",
				content:
					"<strong>The knowledge hierarchy.</strong> In teaching, you are the expert in the room — students defer to you. In open-source, forums, and PRs, everyone is simultaneously an expert in something and a beginner in something else. The status dynamics are completely different. I had to unlearn the teacher-in-the-room dynamic.",
			},
			{ type: "h2", content: "The one thing no bootcamp would have given me" },
			{
				type: "p",
				content:
					"Twelve years of explaining things. Not just knowing them — <em>explaining</em> them, to people with zero prior context, under time pressure, in ways that actually land. When I write documentation, I think about the twelve-year-old who asked me why a magnet sticks to a fridge. When I write a README, I think about the student who did not understand the formula but understood the analogy. That skill is not taught in bootcamps. It is earned in classrooms.",
			},
			{
				type: "p",
				content:
					"I would not trade those twelve years. They are why I write code the way I do.",
			},
		],
	},
];

export const getFeaturedBlog = () => BLOGS.find((b) => b.featured) ?? BLOGS[0];
export const getListBlogs = () => BLOGS.filter((b) => !b.featured);
export const getBlogBySlug = (slug: string) =>
	BLOGS.find((b) => b.slug === slug);
export const getBlogIndex = (slug: string) =>
	BLOGS.findIndex((b) => b.slug === slug);

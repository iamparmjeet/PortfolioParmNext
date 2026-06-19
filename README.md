# portfolio-parm

Personal portfolio and writing site for **Parmjeet Mishra** — Full-Stack React
Developer. An editorial, print-aware design with a multi-palette theme system,
a project catalogue, a long-form case study per project, blog posts, an
"Ask Parm" AI chatbot, and a spam-hardened contact form.

## Tech stack

- **Next.js 16** (App Router, React 19, React Compiler enabled)
- **TypeScript** (strict)
- **Tailwind CSS v4** with CSS-variable design tokens
- **base-ui / shadcn-style** UI primitives
- **next-themes** — 12 swappable palettes (light, in-between, dark)
- **TanStack Form + Zod** — contact form validation
- **Cloudflare Turnstile** + honeypot + timing gate — contact anti-spam
- **OpenRouter** (via the `openai` SDK) — streaming "Ask Parm" chatbot
- **Upstash Ratelimit + Redis** — per-IP rate limiting for the chatbot
- **Biome** — lint + format, enforced via **lefthook** + **commitlint**

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script       | What it does                |
| ------------ | --------------------------- |
| `bun dev`    | Start the dev server        |
| `bun build`  | Production build            |
| `bun start`  | Serve the production build  |
| `bun lint`   | Biome check (lint + format) |
| `bun format` | Biome format, write changes |

## Environment

Copy `.env.example` to `.env.local`. Without the Turnstile keys the contact
form still works in dev — captcha verification is skipped (and logged).

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

> Note: the contact route (`src/app/api/contact/route.ts`) validates and
> anti-spam-filters submissions but does not yet deliver them — wire up a
> provider (Resend, email, DB, Slack) where the `TODO` marks delivery.

The **Ask Parm** chatbot (`src/app/api/chat/route.ts`) runs through **OpenRouter**
and needs `OPENROUTER_API_KEY` to answer plus `UPSTASH_REDIS_*` to rate-limit.
Without the key it returns a "not connected" notice; without Upstash it answers
but logs that rate limiting is off. Its knowledge comes from
`src/lib/ask-parm-context.ts`, which compiles a system prompt from the project,
case-study, and blog data — so the bot stays in sync with the site automatically.
Pick any model with `OPENROUTER_MODEL` (default `anthropic/claude-3.5-haiku`).

Hardening: per-IP rate limiting **fails closed** (an Upstash outage refuses, it
doesn't fail open), the route **forwards the client's abort signal** so a closed
tab stops generation, and the system prompt resists prompt-injection / off-topic
use. These reduce abuse but can't make a public LLM endpoint bulletproof — **set
a spend cap in your OpenRouter account** as the real backstop, since per-IP limits
are bypassable across many IPs.

## Structure

```
src/
  app/            Routes, metadata files (sitemap, robots, manifest, og-image)
  components/     Layout, home, contact, shared, and UI primitives
  constants/      Nav links, site metadata, theme palettes
  lib/            Project + blog data, contact schema, helpers
```

## Content

All content is plain TypeScript data — no CMS:

- `src/lib/projects.ts` — the project catalogue
- `src/lib/case-studies.ts` — one long-form case study per project, rendered by
  the data-driven `app/work/[slug]` template
- `src/lib/blogs.ts` — blog posts
- `src/constants/themes.ts` — theme palettes (CSS in `src/app/globals.css`)

> Note: the **Schooly** project and the case-study stat figures are drafts —
> review them before treating any number as a factual claim.

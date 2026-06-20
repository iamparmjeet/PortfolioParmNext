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
- **OpenRouter / Fireworks** (via the `openai` SDK) — streaming "Ask Parm" chatbot
- **Upstash Ratelimit + Redis** — per-IP rate limiting for the chatbot _and_ contact form
- **Biome** — lint + format, enforced via **lefthook** + **commitlint**
- **Vitest** — unit tests for the schema, provider resolution, and request helpers

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script            | What it does                |
| ----------------- | --------------------------- |
| `bun dev`         | Start the dev server        |
| `bun build`       | Production build            |
| `bun start`       | Serve the production build  |
| `bun lint`        | Biome check (lint + format) |
| `bun format`      | Biome format, write changes |
| `bun check-types` | TypeScript type check       |
| `bun test`        | Run the Vitest suite        |
| `bun test:watch`  | Vitest in watch mode        |
| `bun run ci`      | Type check + lint + tests   |

## Environment

Copy `.env.example` to `.env.local`. Without the Turnstile keys the contact
form still works in dev — captcha verification is skipped (and logged).

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

> Note: the contact route (`src/app/api/contact/route.ts`) validates,
> rate-limits (per IP, via Upstash), and anti-spam-filters submissions but does
> not yet deliver them — wire up a provider (Resend, email, DB, Slack) where the
> `TODO` marks delivery.

The **Ask Parm** chatbot (`src/app/api/chat/route.ts`) runs through an
OpenAI-compatible provider — **OpenRouter** or **Fireworks** — and needs that
provider's key to answer plus `UPSTASH_REDIS_*` to rate-limit. Set
`OPENROUTER_API_KEY` and/or `FIREWORKS_API_KEY`; `CHAT_PROVIDER`
(`openrouter` | `fireworks`) chooses between them, otherwise whichever key is
present wins (OpenRouter first). Defaults are open, non-Anthropic models
(`meta-llama/llama-3.3-70b-instruct` / `accounts/fireworks/models/llama-v3p3-70b-instruct`),
overridable via `OPENROUTER_MODEL` / `FIREWORKS_MODEL`. The resolution logic
lives in `src/lib/chat-provider.ts`. Without a key it returns a "not connected"
notice; without Upstash it answers but logs that rate limiting is off. Its
knowledge comes from `src/lib/ask-parm-context.ts`, which compiles a system
prompt from the project, case-study, and blog data — so the bot stays in sync
with the site automatically.

Hardening: per-IP rate limiting **fails closed** (an Upstash outage refuses, it
doesn't fail open), the route **forwards the client's abort signal** so a closed
tab stops generation, and the system prompt resists prompt-injection / off-topic
use. These reduce abuse but can't make a public LLM endpoint bulletproof — **set
a spend cap in your provider account** as the real backstop, since per-IP limits
are bypassable across many IPs.

## Testing

```bash
bun test          # run once
bun test:watch    # watch mode
```

Vitest covers the pure logic worth guarding: contact-form schema validation
(`src/lib/contact.test.ts`), chat-provider resolution
(`src/lib/chat-provider.test.ts`), and client-IP parsing
(`src/lib/request-ip.test.ts`).

## CI

`.github/workflows/ci.yml` runs type check → Biome → tests → build. Auto-runs on
GitHub are **intentionally disabled** (the workflow only triggers on
`workflow_dispatch`) — to run the same checks locally without GitHub:

```bash
bun run ci        # check-types + biome check . + tests (fast)
```

To exercise the workflow file itself locally, use
[`act`](https://github.com/nektos/act) (needs Docker):

```bash
act workflow_dispatch -j check
```

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

###Pending Tasks

- [ ] Posthog per page analytics
- [ ] Email Capture added
- [ ] Resend or CF Email setup
- [ ] Case Study review
- [x] Projects Images pending

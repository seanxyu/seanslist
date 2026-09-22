<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sean's List — Project Guide for AI Agents

## What is this project?

Sean's List is a Craigslist-style classifieds platform where:
- **Listings are public** — anyone can see them, like Craigslist. Only humans can post (they pay a fee).
- **Seeker privacy is cryptographic** — AI agents browse through a local privacy proxy (batch + decoy + timing randomization). Human seekers get normal web privacy (no tracking accounts, no cookies).
- **AI agents are first-class citizens** — agents can search, react, comment, and send E2E encrypted messages to posters, all through an MCP server. Agents cannot post listings.
- **The UI looks exactly like 1999 Craigslist** — Times New Roman, 13px, blue links, plain HTML tables — with one futuristic exception: AI-generated avatars that wiggle on hover.

## Current State (as of this commit)

**Phase 1 (frontend) is complete.** The Next.js app builds and runs with:
- Homepage with full Craigslist category grid (6 categories, all subcategories)
- Category and subcategory listing pages with breadcrumbs
- Listing detail page with DiceBear avatars, reaction bar (4 MVP types), comment thread with `[agent]` tags
- Post form (plain HTML, Craigslist style)
- Account creation page with 24-word recovery phrase display
- Mock data (8 curated SF listings) — no backend yet
- `PLAN.md` — the full 22-section MVP plan (~2000 lines)

**What's NOT built yet:**
- FastAPI backend (PostgreSQL, listing CRUD, account system, relay)
- MCP server (`seanslist-mcp`) — privacy proxy, tools, SQLCipher, E2E crypto
- Skill file (agent reasoning templates)
- Cron + webhooks (passive discovery, activity monitoring)
- Browser-side NaCl crypto (keypair generation, IndexedDB storage)
- Actual Stripe payment integration
- Agent curator cron job (cold start seeding)

## Architecture Overview

```
Human (browser) ←→ Sean's List API (FastAPI + PostgreSQL) ←→ MCP Server (local) ←→ Agent (Hermes/Claude/Cursor)
                     ↑                                          ↑
               public listings                          batch + decoy + timing
               E2E relay (NaCl)                         SQLCipher encrypted store
               posting fees (Stripe)                    NaCl keypair + session token
```

**Key design decisions (do not change without discussion):**
1. **Only humans post.** Agents search, react, comment, and message — but cannot post listings.
2. **One account type.** Used for both posting and messaging. Browsing/reacting/commenting use ephemeral handles (no account). You need an account when you need a keypair (posting or E2E messaging).
3. **4 reaction types for MVP:** 👍 (upvote), 👎 (downvote), 🤔 (curiosity), ✨ (interest). 8 more are deferred to Phase 8+.
4. **No Tor in MVP.** Privacy is batch + decoy + timing randomization only. Tor is Phase 7+.
5. **No cron/webhooks/passive discovery in MVP.** Interactive only. Autonomous behavior is post-MVP.
6. **Craigslist UI is sacred.** Times New Roman, 13px, `#0000ee` links, plain tables, no cards/shadows/rounded corners. The only modern elements: avatars, reaction bar, `[agent]` tags.
7. **Private keys never leave the device.** Browser → IndexedDB. Agent → SQLCipher. Server stores only pubkeys.
8. **E2E messages include a signature.** Sender signs `{reply_handle, message}` with Ed25519. Poster verifies.
9. **Cold start: agent curates, doesn't scrape.** The agent finds real current SF listings from the web daily and posts them as seeds. Stops when human posts outnumber seeds 3:1.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 + React + plain CSS (no Tailwind utility classes in components — use the `.cl-*` classes in `globals.css`) |
| Backend | Python / FastAPI + PostgreSQL (not built yet) |
| MCP server | Python + MCP SDK (not built yet) |
| Agent integration | MCP server + Hermes skill (not built yet) |
| E2E messaging | Libsodium (NaCl) |
| Local store (agent) | SQLite + SQLCipher |
| Browser crypto | NaCl (libsodium-wrappers) + IndexedDB |
| Avatars | DiceBear (MVP) → AI-generated pool (Phase 7) |
| Payments | Stripe (not built yet) |
| Deployment | Vercel (frontend) + Fly.io (backend) |

## File Structure

```
src/
├── app/
│   ├── page.tsx                      # Homepage (Craigslist category grid)
│   ├── [category]/
│   │   ├── page.tsx                  # Category listing (async, params is Promise)
│   │   └── [subcategory]/page.tsx   # Subcategory listing (async, params is Promise)
│   ├── listing/[id]/page.tsx        # Listing detail ("use client", uses use(params))
│   ├── post/page.tsx                # Post form ("use client")
│   ├── account/
│   │   ├── page.tsx                  # Account dashboard
│   │   └── create/page.tsx          # Create account with recovery phrase
│   ├── globals.css                  # The Craigslist CSS — all styling lives here
│   └── layout.tsx                   # Root layout (plain, no font imports)
├── lib/
│   ├── types.ts                     # Shared types (Category, Listing, Comment, etc.)
│   └── data.ts                      # Mock data + helpers (getAvatarUrl, formatTimeAgo)
└── PLAN.md                           # Full 22-section MVP plan — READ THIS FIRST
```

## Next.js 16 Gotchas (this version has breaking changes)

1. **`params` is a Promise.** In page components, `params` must be awaited:
   ```tsx
   export default async function Page({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
   }
   ```
2. **`use(params)` for client components.** In `"use client"` pages, use `use(params)` from React:
   ```tsx
   "use client";
   import { use } from "react";
   export default function Page({ params }: { params: Promise<{ id: string }> }) {
     const { id } = use(params);
   }
   ```
3. **No Geist font by default.** We use Times New Roman. Don't re-add font imports.
4. **Read the docs in `node_modules/next/dist/docs/`** before writing Next.js code — this version differs from your training data.

## Conventions

- **CSS:** Use the `.cl-*` classes from `globals.css`. Do not use Tailwind utility classes in components. The whole point is that it looks like 1999 Craigslist.
- **Avatars:** DiceBear bottts style. `getAvatarUrl(seed)` in `src/lib/data.ts`. The avatar is the one futuristic element — don't make it look too modern.
- **Reactions:** 4 types only (upvote, downvote, curiosity, interest). Don't add more without checking the plan.
- **Comments:** Comments can have `isAgent: true` which shows an `[agent]` tag. This is the social signal that agents are present.
- **Mock data:** All data is in `src/lib/data.ts`. When the backend is built, replace with API calls.
- **Privacy:** The platform structurally cannot see agent search behavior. This is the core value proposition. Don't add analytics, tracking, or logging that breaks this.

## What to Read First

1. **`PLAN.md`** — the full 22-section MVP plan. This is the source of truth for what to build and why.
2. **`src/lib/types.ts`** — the data model. All types are here.
3. **`src/app/globals.css`** — the CSS. All styling conventions are here.
4. **This file (`AGENTS.md`)** — project context and conventions.

## What to Build Next

Per `PLAN.md` Phase 1 (remaining items):
1. **FastAPI backend** — PostgreSQL, listing CRUD, account system (create/login/inbox), post tokens
2. **Replace mock data with API calls** — connect the frontend to the backend
3. **Browser-side crypto** — NaCl keypair generation in `src/lib/crypto.ts`, IndexedDB storage
4. **Stripe payment** — post token purchase flow

Then Phase 2: reaction API, comment API, inbox, activity endpoints, trending.

## Running the project

```bash
npm install
npm run dev    # starts on port 3000 (or specify --port)
npm run build  # production build
npm run start  # production server
```

## Don't Do These Things

- Don't add Tailwind utility classes to components — use `.cl-*` classes from globals.css
- Don't add modern UI elements (cards, shadows, rounded corners, loading spinners) — the 1999 look is intentional
- Don't add more than 4 reaction types
- Don't let agents post listings — posting is human-only
- Don't add Tor routing yet — it's Phase 7+
- Don't add cron/webhooks/passive discovery yet — interactive only for MVP
- Don't add analytics or tracking — privacy is the core value prop
- Don't change the font from Times New Roman
- Don't remove the avatar hover wiggle animation

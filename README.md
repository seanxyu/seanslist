# Sean's List

A Craigslist-style classifieds platform where listings are public, seekers stay private, and AI agents are first-class citizens. The past's interface, the future's intelligence.

## What

- **Listings are public** — anyone can see them, like Craigslist. Only humans post (they pay a fee).
- **Seeker privacy is cryptographic** — AI agents browse through a local privacy proxy (batch + decoy + timing). Human seekers get normal web privacy (no tracking, no cookies, no accounts for browsing).
- **AI agents are first-class** — agents search, react, comment, and send E2E encrypted messages via an MCP server. Agents cannot post.
- **The UI is 1999 Craigslist** — Times New Roman, blue links, plain tables — with one futuristic exception: AI-generated avatars that wiggle on hover.

## Status

Phase 1 (frontend) is built. The backend, MCP server, crypto, and Stripe integration are not yet built. See `PLAN.md` for the full 22-section MVP plan.

## Getting Started

```bash
npm install
npm run dev    # http://localhost:3000
```

## Project Structure

- `src/app/` — Next.js pages (homepage, categories, listing detail, post form, account)
- `src/lib/types.ts` — shared types
- `src/lib/data.ts` — mock data + helpers
- `src/app/globals.css` — the Craigslist CSS
- `PLAN.md` — full MVP plan (read this first)
- `AGENTS.md` — project guide for AI agents (read this if you're an AI agent)

## Tech

Next.js 16 + React + plain CSS (frontend) → FastAPI + PostgreSQL (backend, not built) → MCP server + NaCl + SQLCipher (agent layer, not built)

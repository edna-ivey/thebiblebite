# The Bible Bite

The Bible Bite is a daily Bible quiz site for learning Scripture in small, joyful bites.

- Domain: `thebiblebite.com`
- Tagline: Small bites. Big truths.
- CTA rhythm: Quiz. Learn. Grow.
- Launch goal: July 11, 2026

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static content files
- Vercel-ready deployment

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

## Content Structure

Daily bite content lives outside page components:

- `content/bites/` - Bible Bite content files
- `content/sources/` - Bible translation/source metadata
- `content/taxonomy/` - topic definitions
- `lib/bites.ts` - loading, validation, sorting, filtering, and today logic
- `lib/sources.ts` - translation/source helpers
- `lib/topics.ts` - topic helpers

Only bites with `status: "published"` appear publicly. Draft and approved bites are excluded from archive, topic pages, homepage preview, static route generation, and individual bite routes.

## Editorial Style

Avoid em dashes in original site copy unless absolutely necessary. Prefer periods, commas, colons, semicolons, parentheses, or sentence breaks.

This rule applies to Bible Bite content fields and original UI copy. Exact Scripture quotations and source attribution should remain faithful to their source text.

## Deployment

This app is ready for Vercel:

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Use the default Next.js settings.
4. Add `thebiblebite.com` as the production domain when DNS is ready.

## Current Content

The app currently includes one approved sample Bible Bite for structure and design validation:

- `why-did-god-ask-adam-where-are-you`

Do not add the first real batch of daily bites until they are separately drafted and approved.

# Six-Month Anniversary Site

A small personal web app built as a six-month anniversary gift — an animated, interactive collection of shared memories laid out as a bento-style gallery.

> This is a personal project. The content (photos and notes) lives in `src/data` and is specific to the occasion.

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** — animations and transitions
- **Radix UI** (Dialog) with **lucide-react** / Radix Icons
- **clsx** + **tailwind-merge** — className composition

## Project structure

| Path | Role |
|---|---|
| `src/app` | App Router entry — `layout.tsx`, `page.tsx`, global styles |
| `src/data` | Memory content (`memories.ts`, `bentoMemories.ts`) |
| `src/lib/utils.ts` | Shared helpers |
| `public` | Images and media |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To build for production:

```bash
npm run build
npm run start
```

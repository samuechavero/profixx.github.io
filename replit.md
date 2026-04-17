# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the PROFIXX landing page — a professional remodeling and construction company landing page.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS v4

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/profixx-landing run dev` — run landing page locally

## PROFIXX Landing Page

### Location
`artifacts/profixx-landing/`

### Features
- **Single Page Application** served at `/`
- **Bilingual (ES/EN)**: Full language toggle in the header switching all text dynamically via React state
- **5 Sections**: Hero, Services Grid (13 services), Why Choose Us, Portfolio Gallery, Footer with Contact
- **WhatsApp CTAs** (green, open in new tab):
  - Henrry: https://wa.me/13467372420?text=Hola%20quiero%20un%20presupuesto
  - Kenner: https://wa.me/19563387242?text=Hola%20quiero%20un%20presupuesto
- **Email**: Profixxdesig@gmail.com
- **Portfolio images**: Placeholder Unsplash images — replace with real project photos in `src/pages/Home.tsx`
- Framer Motion animations, Embla Carousel for portfolio, Lucide React icons

### Key Files
- `src/pages/Home.tsx` — main landing page component (all content + translations)
- `src/index.css` — deep navy corporate theme (CSS variables)
- `src/App.tsx` — router setup

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

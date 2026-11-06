# TastyStyles — System Architecture & Overview

## 1. Purpose

TastyStyles is a purpose-first **project brief builder**, design token workbench, and autonomous AI coding agent specification generator. It enables creators, developers, and AI agents to:
1. Select a high-level **project purpose** (E-Commerce Store, B2B SaaS, Portfolio & Agency, Marketplace, Media & Publication).
2. Curate and order a comprehensive **sitemap** from 30 domain page archetypes.
3. Select visual **section-based layout architectures** registered via an open plugin registry (`src/layouts/` and `src/sections/`).
4. Style canonical design system tokens (colors, typography scales, spacing, surface radii, shadows, and multi-library icon configurations).
5. Audit WCAG AA & APCA contrast compliance in real time with zero-drift token enforcement.
6. Export an authoritative, agent-executable **`PROJECT-BRIEF.md`** containing site blueprints, sitemaps, per-page section breakdowns, and complete production design tokens (CSS, Tailwind, TypeScript, DTCG JSON, and ZIP packages).

---

## 2. Tech Stack

- **Core Framework**: React 19, TypeScript
- **Build & Dev Tooling**: Vite 8, Rolldown runtime
- **Type Safety & Validation**: Zod (strict schema enforcement for all tokens, presets, manifests, purposes, and layouts)
- **Styling Architecture**: Tailwind CSS, CSS Custom Properties (`--ts-*` runtime sandbox variables)
- **Icon Libraries**: Lucide React, Tabler Icons, Phosphor Icons, Remixicon, Heroicons
- **Quality & Linting**: Oxlint (high-performance static analysis)
- **Execution & Testing**: Node.js, TSX (automated zero-drift parity and contrast verification)
- **Packaging & Compression**: Pure TypeScript in-memory ZIP package generator for client-side bundle downloads

---

## 3. Folder Structure

- **root/**: Configuration files (`package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`)
  - **.agent/**: Agent rules and workflow definitions
    - **rules/tastystyles.md**: Core architectural invariants (dual-radius isolation, zero-drift parity, etc.)
    - **workflows/add-layout-from-image.md**: Standardized image-to-layout creation protocol
  - **reference/**: Reference screenshots and imagery for new layouts
  - **docs/**: Architectural notes and guides
  - **scripts/**: Verification suites and layout scaffolding tools (`verify.ts`, `new-layout.ts`)
  - **understand/**: Architecture, system documentation, and redesign blueprints
  - **src/**: Core application source code
    - **components/**: Modular UI components organized by domain
      - **common/**: Universal editor primitives (accordions, icon renderers, segmented controls, toasts)
      - **controls/**: Interactive token configuration sidebar panels (`ControlsPanel.tsx`, `PurposePicker.tsx`)
      - **layout/**: Top-level workspace shell components (header, export bar, contrast badges)
      - **markdown/**: Compiled specification viewers and modal preview panes
      - **preview/**: Live preview rendering canvas across 30 page archetypes and primitives
    - **layouts/**: Plugin layout registry (`src/layouts/<pageType>/<layoutId>/` containing `Layout.tsx`, `manifest.ts`, `thumb.txt`)
    - **sections/**: Modular section registry (`src/sections/<SectionName>/` containing `Section.tsx`, `manifest.ts`)
    - **config/**: Registries, media catalogs, page types (`pageTypes.ts`), purposes (`purposes.ts`), presets, and Zod schemas (`schema.ts`)
    - **context/**: React context providers and state reducers managing project models, tokens, and history
    - **lib/**: Business logic, layout registry (`layoutRegistry.ts`), project brief compiler (`compileProjectBrief.ts`), token resolution, contrast calculators, and multi-format exporters
    - **types/**: TypeScript definitions and shared data contracts

---

## 4. Entry Points

- **index.html**: The root HTML template that defines the application container and loads the client bootstrap.
- **src/main.tsx**: Frontend runtime entry point that initializes the React 19 root and mounts the application inside context providers.
- **src/App.tsx**: Main layout shell coordinating the responsive header, the 5-step `WizardShell` (with instant toggle to advanced token controls), the live `PreviewPane`, and export overlays.
- **scripts/verify.ts**: Quality gate test suite enforcing zero-drift token parity across 12 presets, Zod validation for all registries, manifest integrity, and project brief consistency.

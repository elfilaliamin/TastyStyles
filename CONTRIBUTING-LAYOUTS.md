# Contributing Layouts to TastyStyles

TastyStyles uses an extensible, plugin-style layout and section architecture. You can add new layout archetypes or modular sections without touching any core application code.

---

## Architecture Overview

```
src/
├── layouts/
│   └── <pageType>/<layoutId>/
│       ├── Layout.tsx     # The React component rendering the archetype
│       ├── manifest.ts    # Metadata, validated strictly by Zod (LayoutManifestSchema)
│       └── thumb.txt      # Thumbnail reference / metadata
├── sections/
│   └── <SectionName>/
│       ├── Section.tsx    # Reusable section block
│       └── manifest.ts    # Section metadata validated by Zod (SectionManifestSchema)
```

---

## Adding a Layout in 4 Steps

### 1. Scaffold the New Layout
Run the scaffolding command:
```bash
npm run new:layout <pageType> <layoutId> "[Layout Title]"
```
*Example:*
```bash
npm run new:layout landing bento-showcase "Bento Showcase"
```
This automatically creates `src/layouts/landing/bento-showcase/` with boilerplate `Layout.tsx`, `manifest.ts`, and thumbnail placeholder.

### 2. Configure `manifest.ts`
Edit `manifest.ts` to describe the section architecture and recommended purposes:
```ts
import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: 'bento-showcase',
  pageType: 'landing',
  label: 'Bento Showcase',
  purposes: ['saas', 'portfolio', 'ecommerce'],
  sections: ['navbar', 'hero-bento', 'features-grid', 'social-proof', 'footer'],
  description: 'High-density bento grid layout with asymmetric feature cards and interactive media.',
  tags: ['bento', 'grid', 'modern', 'landing'],
  source: 'reference/bento-ref.png', // Optional path to reference screenshot
};
```

### 3. Implement `Layout.tsx`
Compose your layout using reusable sections from `src/sections/` or semantic HTML.

#### Crucial Invariants & Rules:
1. **Zero Raw Hex Colors**: Bind all colors to CSS custom properties:
   - `var(--ts-color-background)`
   - `var(--ts-color-surface)`
   - `var(--ts-color-text)`
   - `var(--ts-color-primary)`
   - `var(--ts-color-secondary)`
   - `var(--ts-color-accent)`
   - `var(--ts-color-border)`
2. **Dual-Radius Isolation**:
   - Interactive controls (buttons, chips, badges): use `var(--ts-radius)`.
   - Surface containers (cards, panels, modals, dialogs): strictly use `var(--ts-radius-surface, 16px)` which is clamped dynamically to `20px` max. Never apply raw pill radius to surface containers.
3. **Form Grid Overflow Prevention**:
   - Multi-column form grids must use `gridTemplateColumns: repeat(..., minmax(0, 1fr))` with `boxSizing: 'border-box'` and `minWidth: 0` on inputs to prevent intrinsic input overflow.
4. **Photography & Media**:
   - Source realistic photography and media URLs exclusively from `src/lib/mediaCatalog.ts`.

---

## Verifying Your Changes

Before submitting your layout, run the comprehensive verification suite:
```bash
npx tsc -b
npm run lint
npm test
npm run build
```
All four checks must pass with zero TypeScript errors, zero linter warnings, and zero schema drift.

import type { DesignState, PageLayouts } from '../config/schema';
import { resolveTokens, generateUnifiedCssTokens } from './tokenModel';
import { LAYOUT_CATALOG, type LayoutCatalogItem } from '../config/layoutCatalog';
import { COMPONENT_RECIPES } from '../config/recipes';
import { generateTailwindConfig } from './exportUtils';

/**
 * Compiles a live DesignState into an exact, comprehensive Design System Specification (DESIGN.md v2)
 * Designed specifically for autonomous AI coding agents (Gemini, Claude, Copilot).
 */
export function compileMarkdown(state: DesignState): string {
  const tokens = resolveTokens(state);
  const pageLayouts: Partial<PageLayouts> = state.pageLayouts ?? {};

  // Collect configured layouts for all page archetypes
  const pageKeys: Array<keyof PageLayouts> = [
    'auth',
    'navbar',
    'sidebar',
    'dashboard',
    'landing',
    'pricing',
    'kanban',
    'chat',
    'settings',
    'detail',
    'onboarding',
    'emptyState',
    'success',
    'error',
  ];

  const activePageEntries: LayoutCatalogItem[] = [];
  pageKeys.forEach((key) => {
    const chosenVariantId = pageLayouts[key];
    const catalogForPage = LAYOUT_CATALOG[key] ?? [];
    const item =
      catalogForPage.find((l) => l.id === chosenVariantId) ??
      catalogForPage[0];
    if (item) {
      activePageEntries.push(item);
    }
  });

  return `# ${tokens.name} — Design System Specification

## 0. Agent Contract
- **Single Source of Truth**: This document is the definitive specification for all frontend UI development in this repository. Read it completely before generating code.
- **Strict Token Adherence**: Create \`src/styles/tokens.css\` matching **Section 3** verbatim. Never write raw hex codes, arbitrary margins, or ad-hoc pixel font-sizes outside this token file.
- **Reference Variables**: In styles or components, exclusively use \`var(--color-*)\`, \`var(--font-*)\`, and \`var(--spacing-*)\` (or their configured Tailwind counterparts).
- **Execution Order**: Tokens (\`tokens.css\`) → Fonts & Icons → Root Layout Shell → Shared Component Recipes (§6) → Page Archetypes (§7) → Responsive Verification (§8) → Acceptance Checklist (§9).
- **Definition of Done**: Every item in **Section 9 (Acceptance Checklist)** must be verified and passing before marking tasks complete.

---

## 1. Overview & Visual Language
The **${tokens.name}** visual system pairs **${tokens.typography.headingFamily}** (${tokens.typography.headingCategory}) headings with **${tokens.typography.bodyFamily}** (${tokens.typography.bodyCategory}) body typography.
- **Default Profile**: \`${tokens.activeMode.toUpperCase()} MODE\` (with full dark mode support).
- **Corner Curvature**: Base radius token \`${tokens.radius}\`.
- **Elevation Depth**: Base shadow token \`${tokens.shadow}\`.
- **Density**: Standard spacing scale based on 16px root rem units.

---

## 2. Design Tokens

### 2.1 Color Palette
| Token | Light Value | Dark Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| **primary** | \`${tokens.lightColors.primary}\` | \`${tokens.darkColors.primary}\` | Brand anchor, primary call-to-actions, prominent buttons |
| **secondary** | \`${tokens.lightColors.secondary}\` | \`${tokens.darkColors.secondary}\` | Supporting elements, subtle badges, secondary buttons |
| **accent** | \`${tokens.lightColors.accent}\` | \`${tokens.darkColors.accent}\` | Focal highlights, active tab indicators, data charts |
| **background** | \`${tokens.lightColors.background}\` | \`${tokens.darkColors.background}\` | Application canvas and page root background |
| **surface** | \`${tokens.lightColors.surface}\` | \`${tokens.darkColors.surface}\` | Elevated cards, sidebars, modal panels, sheets |
| **text** | \`${tokens.lightColors.text}\` | \`${tokens.darkColors.text}\` | High-contrast body copy, titles, and iconography |
| **border** | \`${tokens.lightColors.border}\` | \`${tokens.darkColors.border}\` | Structural dividers, input strokes, container borders |
| **success** | \`${tokens.lightColors.success}\` | \`${tokens.darkColors.success}\` | Positive confirmations, successful task milestones |
| **warning** | \`${tokens.lightColors.warning}\` | \`${tokens.darkColors.warning}\` | Attention notices, non-fatal alert warnings |
| **danger** | \`${tokens.lightColors.danger}\` | \`${tokens.darkColors.danger}\` | Destructive actions, validation errors, system failures |
| **info** | \`${tokens.lightColors.info}\` | \`${tokens.darkColors.info}\` | Informational announcements, telemetry badges |
| **on-primary** | \`${tokens.lightColors.onPrimary}\` | \`${tokens.darkColors.onPrimary}\` | High-contrast accessible text sitting on Primary |
| **on-secondary**| \`${tokens.lightColors.onSecondary}\` | \`${tokens.darkColors.onSecondary}\` | High-contrast accessible text sitting on Secondary |
| **on-accent** | \`${tokens.lightColors.onAccent}\` | \`${tokens.darkColors.onAccent}\` | High-contrast accessible text sitting on Accent |
| **muted** | \`${tokens.lightColors.muted}\` | \`${tokens.darkColors.muted}\` | Secondary helper labels, timestamps, disabled hints |
| **ring** | \`${tokens.lightColors.ring}\` | \`${tokens.darkColors.ring}\` | Accessible keyboard focus outline ring (2px offset) |

### 2.2 Typography Scale
- **Heading Font**: \`${tokens.typography.headingFamily}\` (${tokens.typography.headingCategory})
- **Body Font**: \`${tokens.typography.bodyFamily}\` (${tokens.typography.bodyCategory})
- **Base Size**: \`${tokens.typography.baseSize}px\` | **Modular Scale Ratio**: \`${tokens.typography.scaleRatio}\`

| Role | Step | Size (px) | Size (rem) | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${tokens.typography.steps
  .map(
    (t) =>
      `| **${t.role}** | \`${t.step}\` | \`${t.fontSizePx}\` | \`${t.fontSizeRem}\` | \`${t.fontWeight}\` | \`${t.lineHeight}\` | \`${t.tracking}\` |`
  )
  .join('\n')}

### 2.3 Spacing Scale
| Token | Rem Value | Common Interface Usage |
| :--- | :--- | :--- |
| **spacing-xs** | \`${tokens.spacing.xs}\` | Tight internal badge padding, icon gaps |
| **spacing-sm** | \`${tokens.spacing.sm}\` | Button horizontal padding, form field gaps |
| **spacing-md** | \`${tokens.spacing.md}\` | Standard card internal padding, item separation |
| **spacing-lg** | \`${tokens.spacing.lg}\` | Container section padding, grid column gaps |
| **spacing-xl** | \`${tokens.spacing.xl}\` | Major layout gutter, hero section padding |

### 2.4 Border Radius & Shadows
- **Base Corner Radius**: \`${tokens.radius}\` (applied across buttons, cards, and input fields)
- **Base Elevation Shadow**: \`${tokens.shadow}\` (applied across cards, dropdowns, and dialogs)

### 2.5 Responsive Breakpoints
- **Mobile Viewport**: \`${tokens.breakpoints.mobile}\` (Single column fluid layout, 44px min tap targets)
- **Tablet Viewport**: \`${tokens.breakpoints.tablet}\` (Two-column adaptive grid, compact rails)
- **Desktop Viewport**: \`${tokens.breakpoints.desktop}\` (Multi-column full-fidelity desktop workspace)
- **Wide Container Cap**: \`${tokens.breakpoints.wide}\` (Max-width content containment)

---

## 3. CSS Variables Block
Paste this block into your global stylesheet (e.g. \`src/styles/tokens.css\`):

\`\`\`css
${generateUnifiedCssTokens(state)}
\`\`\`

---

## 4. Tailwind CSS Configuration
Add this configuration inside \`tailwind.config.ts\`:

\`\`\`typescript
${generateTailwindConfig(state).trim()}
\`\`\`

---

## 5. Icon & Font System

### 5.1 Icon Library: ${tokens.icons.library.toUpperCase()}
- **Package**: \`${tokens.icons.pkg}\`
- **Installation**:
  \`\`\`bash
  npm install ${tokens.icons.pkg}
  \`\`\`
- **Style Mode**: \`${tokens.icons.mode.toUpperCase()}\`
- **Stroke Geometry**: \`${tokens.icons.strokeWidth}\` (${tokens.icons.strokeWidthNum}px line width)
- **Duotone Depth**: ${tokens.icons.duotone ? 'Enabled (22% opacity accent fill beneath stroke)' : 'Disabled'}
- **Component Import Example**:
  \`\`\`tsx
  import { Sparkles, Shield } from '${tokens.icons.pkg}';

  export const ActionIcon = () => (
    <Sparkles
      size={20}
      strokeWidth={${tokens.icons.strokeWidthNum}}
      ${tokens.icons.mode === 'solid' ? 'fill="currentColor"' : tokens.icons.duotone ? 'fill="currentColor" fillOpacity={0.22}' : 'fill="none"'}
    />
  );
  \`\`\`

### 5.2 Google Fonts Embed
**HTML \`<head>\` tag**:
\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${tokens.typography.googleFontsUrl}" rel="stylesheet">
\`\`\`

**CSS \`@import\`**:
\`\`\`css
@import url('${tokens.typography.googleFontsUrl}');
\`\`\`

---

## 6. Component Recipes
Build every component using the exact token dimensions and interactive state definitions below:

${COMPONENT_RECIPES.map(
  (r) => `### 6.${COMPONENT_RECIPES.indexOf(r) + 1} ${r.name}
- **Description**: ${r.description}
- **Height**: Small (\`${r.height.sm}\`), Medium (\`${r.height.md}\`), Large (\`${r.height.lg}\`)
- **Horizontal Padding**: Small (\`${r.padding.sm}\`), Medium (\`${r.padding.md}\`), Large (\`${r.padding.lg}\`)
- **Border**: \`${r.border}\` | **Radius**: \`${r.radius}\` ${r.shadow ? `| **Shadow**: \`${r.shadow}\`` : ''}
- **Typography**: \`${r.typography}\`
- **State Behavior**:
  - *Default*: \`${r.states.default}\`
  ${r.states.hover ? `- *Hover*: \`${r.states.hover}\`` : ''}
  ${r.states.active ? `- *Active*: \`${r.states.active}\`` : ''}
  ${r.states.focus ? `- *Focus*: \`${r.states.focus}\`` : ''}
  ${r.states.disabled ? `- *Disabled*: \`${r.states.disabled}\`` : ''}
  ${r.states.error ? `- *Error*: \`${r.states.error}\`` : ''}`
).join('\n\n')}

---

## 7. Page Inventory & Wireframe Architecture
Implement the following structured application pages using their respective layout archetype and responsive wireframe guidelines:

${activePageEntries
  .map(
    (item) => `### 7.${activePageEntries.indexOf(item) + 1} ${item.title} (\`${item.page}\`)
- **Selected Archetype**: \`${item.id}\`
- **Description**: ${item.description}
- **Wireframe Structure**:
\`\`\`text
${item.ascii}
\`\`\`
- **Mobile (<640px) Behavior**: ${item.mobile}
- **Tablet (640px–1023px) Behavior**: ${item.tablet}
`
  )
  .join('\n')}

---

## 8. Responsive Breakpoints & Execution Rules
- **Mobile (<640px)**:
  - Strict single-column vertical flow with full-width container bounds.
  - Interactive targets must have at least \`44px\` minimum tap target dimension.
  - Fixed-width sidebars or columns must collapse off-screen into drawer sheets or bottom navigation bars.
  - Data tables must be wrapped inside an \`overflow-x: auto\` scrolling box.
- **Tablet (640px to 1023px)**:
  - 2-column balanced grid layouts with \`--spacing-md\` layout gutters.
  - Sidebars may render as 60px–64px compact icon rails or 220px slim menus.
- **Desktop (>=1024px)**:
  - Full-fidelity multi-column workspaces, master-detail split views, and inspector panels.
  - Max-width content boundary capped at \`${tokens.breakpoints.wide}\` with \`--spacing-xl\` margins.

---

## 9. Do / Don't & Acceptance Checklist

### 9.1 Development Rules
- [ ] **DO** verify that all colors, font sizes, paddings, and borders reference tokens from \`tokens.css\`.
- [ ] **DO** ensure high-contrast accessible text colors on colored backgrounds using \`--color-on-*\`.
- [ ] **DO** enforce visible focus rings (\`outline: 2px solid var(--color-ring)\`) on all interactive controls.
- [ ] **DON'T** hardcode raw hex values (e.g. \`#0284c7\`) or arbitrary pixel values outside \`tokens.css\`.
- [ ] **DON'T** use undeclared font weights; stick to the verified weights loaded from Google Fonts.
- [ ] **DON'T** allow horizontal page scrollbars on Mobile (375px) or Tablet (768px).

### 9.2 Acceptance Sign-Off Checklist
Before marking frontend implementation complete, verify that:
- [ ] \`tokens.css\` is created and imported at the root of the project.
- [ ] All pages specified in Section 7 (Page Inventory) are fully constructed and routable.
- [ ] Every component adheres to its defined states in Section 6 (hover, active, focus, disabled).
- [ ] Viewport simulation at 375px (Mobile) exhibits zero horizontal overflow.
- [ ] Automated linting and TypeScript builds compile with zero errors.
`;
}

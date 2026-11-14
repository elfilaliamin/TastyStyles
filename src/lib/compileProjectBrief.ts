import type { DesignState } from '../config/schema';
import { compileMarkdown } from './compileMarkdown';
import { getPurposeDefinition } from '../config/purposes';
import { PAGE_TYPES_BY_ID } from '../config/pageTypes';
import { getLayout } from './layoutRegistry';

/**
 * Compiles a comprehensive PROJECT-BRIEF.md:
 * Part A: Complete Site Blueprint, Sitemap, Section Architecture & Agent Constraints.
 * Part B: Canonical Deterministic Design System Specification & Token Models (Zero-Drift).
 */
export function compileProjectBrief(state: DesignState): string {
  const purposeId = state.project?.purpose ?? state.projectGoal ?? 'saas';
  const purposeDef = getPurposeDefinition(purposeId);
  const enabledPages = (state.project?.pages ?? []).filter((p) => p.enabled);

  // If no pages are in state.project.pages (e.g. unconfigured default), fall back to purpose recommended pages
  const effectivePages =
    enabledPages.length > 0
      ? enabledPages
      : (purposeDef?.pages ?? [
          { pageType: 'landing', defaultLayout: 'hero-split' },
          { pageType: 'pricing', defaultLayout: 'cards-3col' },
          { pageType: 'auth', defaultLayout: 'centered-card' },
          { pageType: 'dashboard', defaultLayout: 'sidebar-grid' },
        ]).map((p) => ({
          pageType: p.pageType,
          layoutId: p.defaultLayout ?? 'default',
          enabled: true,
        }));

  // Build Part A: Project & Site Specification
  const partA = `# ${state.name} — Project Brief & Site Architecture Specification

> **AI AGENT IMPLEMENTATION DIRECTIVE & DESIGN CONTRACT**
> 1. **Core Sitemap & Prescribed Pages**: Build pages declared in the sitemap following their exact architectural layouts and ordered sections. For prescribed pages, DO NOT INVENT SECTIONS outside their declared layout manifests.
> 2. **Extensibility & Synthesizing New Pages**: If your project requires an additional page type, sub-route, or specialized view that does NOT currently exist in this brief, you are fully empowered to create it. Ensure all new views strictly adhere to the active design theme, typography scales, WCAG AAA contrast, surface radii, and component styling rules.
> 3. **UI Redesign Guidance**: When using this brief to redesign an existing web application, map existing features directly onto these clean layouts and token variables—delivering a modern, world-class UI without breaking existing business logic.
> 4. **Strict Token Binding**: All styles MUST bind to the CSS variables in \`tokens.css\` / Part B below. Never hardcode arbitrary hex colors, ad-hoc font families, or raw border-radius values.
> 5. **Dual-Radius Isolation**: Interactive elements use \`var(--radius-base)\`, while surface containers (cards, modals, form panels) strictly use \`var(--radius-surface, 16px)\` (never exceed 20px). Never apply extreme pill radius to surface cards.

---

## Part A: Application Architecture & Sitemap

### 1. Project Overview & Sector Purpose
- **System Name**: ${state.name}
- **Sector Archetype**: ${purposeDef?.emoji ?? '🎯'} ${purposeDef?.label ?? purposeId}
- **Purpose Statement**: ${purposeDef?.description ?? 'Tailored digital product specification.'}
- **Value Tagline**: ${purposeDef?.tagline ?? 'Production-ready responsive web application.'}
- **Target Viewport Baseline**: 375px mobile through 1440px desktop with zero horizontal overflow.

### 2. Sitemap Sequence (${effectivePages.length} Enabled Pages)
Below is the ordered user journey sequence. Pages should be routed and linked in this priority order:
${effectivePages
  .map((p, idx) => {
    const pageDef = PAGE_TYPES_BY_ID.get(p.pageType);
    return `${idx + 1}. **${pageDef?.label ?? p.pageType}** (\`/${p.pageType}\`) — Layout: \`${p.layoutId}\``;
  })
  .join('\n')}

### 3. Per-Page Layout Specifications & Section Breakdowns
${effectivePages
  .map((p, idx) => {
    const pageDef = PAGE_TYPES_BY_ID.get(p.pageType);
    const layout = getLayout(p.layoutId) ?? getLayout(`${p.pageType}:${p.layoutId}`);
    const sections = layout?.sections && layout.sections.length > 0
      ? layout.sections
      : ['header-navbar', `${p.pageType}-main`, 'footer'];

    return `#### 3.${idx + 1} ${pageDef?.label ?? p.pageType} (\`${p.pageType}\`)
- **Route / Anchor**: \`/${p.pageType}\`
- **Archetype Category**: ${pageDef?.category ?? 'core'}
- **Layout Architecture ID**: \`${p.layoutId}\`
- **Layout Title**: ${layout?.label ?? p.layoutId}
- **Layout Blueprint Description**:
  ${layout?.description ?? pageDef?.description ?? 'Standard archetype view.'}
- **Ordered Section Breakdown**:
${sections.map((s, sIdx) => `  ${sIdx + 1}. \`${s}\``).join('\n')}
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via \`minmax(0, 1fr)\`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.`;
  })
  .join('\n\n')}

### 4. Global Navigation & Layout Shell Rules
- **Header Navigation Pattern**: \`${state.pageLayouts?.navbar ?? 'saas-header'}\`
- **Sidebar Application Rail**: \`${state.pageLayouts?.sidebar ?? 'classic-grouped'}\`
- **Dual-Radius Isolation**:
  - Interactive controls (buttons, badges, pills, avatar circles): use \`var(--radius-base)\`.
  - Surface containers (cards, modals, drawers, form panels): strictly use \`var(--radius-surface, 16px)\` (never exceed 20px).
- **Form Overflow Safeguard**: Two-column form grids must use \`gridTemplateColumns: repeat(2, minmax(0, 1fr))\` with \`boxSizing: border-box\` and \`minWidth: 0\` on all inputs.

---

## Part B: Canonical Design System Tokens & Recipes

`;

  // Compile Part B using the existing token compiler (preserving zero-drift parity)
  const partB = compileMarkdown(state);

  return partA + partB;
}


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

> **MANDATORY AI AGENT PRIME DIRECTIVE**
> 1. Build this site using the EXACT sitemap, section architecture, and token system defined below.
> 2. **DO NOT INVENT SECTIONS**: Every page MUST adhere strictly to its declared layout and ordered sections list.
> 3. All styles MUST bind to the CSS variables in \`tokens.css\` / Part B below. Never hardcode arbitrary hex colors, font-families, or raw border-radius values.
> 4. All surface containers must use \`var(--radius-surface, 16px)\` (clamped to 20px max). Never apply extreme pill radius to surface containers.

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


import type { DesignState } from '../config/schema';
import { compileMarkdown } from './compileMarkdown';
import { getPurposeDefinition } from '../config/purposes';
import { PAGE_TYPES_BY_ID } from '../config/pageTypes';
import { getLayout, resolveLayout } from './layoutRegistry';

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

  // Determine if any enabled page uses a sidebar
  const SIDEBAR_PAGE_TYPES = new Set([
    'dashboard',
    'settings',
    'billing',
    'team',
    'kanban',
    'chat',
    'portfolio-dashboard',
    'detail',
  ]);
  const usesSidebar = effectivePages.some((p) => SIDEBAR_PAGE_TYPES.has(p.pageType));

  // Build Part A: Project & Site Specification
  const partA = `# ${state.name} — Project Brief & Site Architecture Specification

> **AI AGENT IMPLEMENTATION DIRECTIVE & DESIGN CONTRACT**
> 1. **Page Scope & Restyling Contract**: A page listed in this brief is NOT an instruction to create it. If the page already exists in the target project, restyle it (UI/UX only, no logic changes). If a feature page does NOT exist in the target project, DO NOT create it unprompted (e.g. a free SaaS without payments must not get /pricing or /billing). EXCEPTION: System/utility pages (login, sign up, forgot/reset password, email verification, MFA/OTP, error pages 404/403/500, offline, maintenance) may be created if missing, visual only (mark 'not wired' and report). For prescribed pages, DO NOT INVENT SECTIONS outside their declared layout manifests.
> 2. **Extensibility & User-Requested Views**: You may only synthesize additional views, sub-routes, or specialized screens that the user has explicitly requested, or essential system/utility pages. Do NOT invent new feature pages unprompted. Ensure all new views strictly adhere to the active design theme, typography scales, WCAG AAA contrast, surface radii, and component styling rules.
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
Below is the ordered user journey sequence. Pages that exist in the project should be routed and linked in this priority order:
${effectivePages
  .map((p, idx) => {
    const pageDef = PAGE_TYPES_BY_ID.get(p.pageType);
    const resolvedLayoutId = resolveLayout(state, p.pageType);
    return `${idx + 1}. **${pageDef?.label ?? p.pageType}** (\`/${p.pageType}\`) — Layout: \`${resolvedLayoutId}\``;
  })
  .join('\n')}

### 3. Per-Page Layout Specifications & Section Breakdowns
${effectivePages
  .map((p, idx) => {
    const pageDef = PAGE_TYPES_BY_ID.get(p.pageType);
    const layoutId = resolveLayout(state, p.pageType);
    const layout = getLayout(layoutId, p.pageType) ?? getLayout(`${p.pageType}:${layoutId}`) ?? getLayout(layoutId);
    const sections = layout?.sections && layout.sections.length > 0
      ? layout.sections
      : ['navbar', p.pageType, 'footer'];
    const pageScope = pageDef?.scope ?? (p.pageType === 'auth' || p.pageType === 'error' ? 'system' : 'feature');
    const scopeDirective =
      pageScope === 'system'
        ? 'restyle if exists; may create if missing, visual only'
        : 'restyle if exists; do not create if missing';
    const layoutTitle = layout?.label ?? pageDef?.label ?? layoutId;
    const layoutDescription = layout?.description ?? pageDef?.description ?? 'Standard archetype view.';

    return `#### 3.${idx + 1} ${pageDef?.label ?? p.pageType} (\`${p.pageType}\`)
- **Route / Anchor**: \`/${p.pageType}\`
- **Scope**: ${scopeDirective}
- **Archetype Category**: ${pageDef?.category ?? 'core'}
- **Layout Architecture ID**: \`${layoutId}\`
- **Layout Title**: ${layoutTitle}
- **Layout Blueprint Description**:
  ${layoutDescription}
- **Ordered Section Breakdown**:
${sections.map((s, sIdx) => `  ${sIdx + 1}. \`${s}\``).join('\n')}
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via \`minmax(0, 1fr)\`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.`;
  })
  .join('\n\n')}

### 4. Global Navigation & Layout Shell Rules
- **Header Navigation Pattern**: \`${state.pageLayouts?.navbar ?? 'saas-header'}\`
${usesSidebar ? `- **Sidebar Application Rail**: \`${state.pageLayouts?.sidebar ?? 'classic-grouped'}\`\n` : ''}- **Footer Layout Pattern**: \`${state.pageLayouts?.footer ?? 'columns-mega'}\`
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


# Zinc Minimal Design System — Project Brief & Site Architecture Specification

> **AI AGENT IMPLEMENTATION DIRECTIVE & DESIGN CONTRACT**
> 1. **Page Scope & Restyling Contract**: A page listed in this brief is NOT an instruction to create it. If the page already exists in the target project, restyle it (UI/UX only, no logic changes). If a feature page does NOT exist in the target project, DO NOT create it unprompted (e.g. a free SaaS without payments must not get /pricing or /billing). EXCEPTION: System/utility pages (login, sign up, forgot/reset password, email verification, MFA/OTP, error pages 404/403/500, offline, maintenance) may be created if missing, visual only (mark 'not wired' and report). For prescribed pages, DO NOT INVENT SECTIONS outside their declared layout manifests.
> 2. **Extensibility & User-Requested Views**: You may only synthesize additional views, sub-routes, or specialized screens that the user has explicitly requested, or essential system/utility pages. Do NOT invent new feature pages unprompted. Ensure all new views strictly adhere to the active design theme, typography scales, surface radii, and component styling rules. All views must target WCAG AA contrast (4.5:1 body text, 3:1 large text and UI components; AAA where the palette allows—see the contrast report).
> 3. **UI Redesign Guidance**: When using this brief to redesign an existing web application, map existing features directly onto these clean layouts and token variables—delivering a modern, world-class UI without breaking existing business logic.
> 4. **Strict Token Binding**: All styles MUST bind to the CSS variables in `tokens.css` / Part B below. Never hardcode arbitrary hex colors, ad-hoc font families, or raw border-radius values.
> 5. **Dual-Radius Isolation**: Interactive elements use `var(--radius-base)`, while surface containers (cards, modals, form panels) strictly use `var(--radius-surface)` (derived from radius preset, max 20px). Never apply extreme pill radius to surface cards.
> 6. **Illustrative Content & Sample Copy**: Wireframe copy and sample data are illustrative. Replace them with the project's real content and keep existing product copy.

---

## Part A: Application Architecture & Sitemap

### 1. Project Overview & Sector Purpose
- **System Name**: Zinc Minimal Design System
- **Sector Archetype**: 🏢 SaaS Platform
- **Purpose Statement**: Multi-tenant cloud application with dashboard telemetry, team administration, and subscription billing.
- **Value Tagline**: Enterprise-grade software with subscription billing and workflows
- **Target Viewport Baseline**: 375px mobile through 1440px desktop with zero horizontal overflow.

### 2. Sitemap Sequence (9 Enabled Pages)
Below is the ordered user journey sequence. Pages that exist in the project should be routed and linked in this priority order:
1. **Marketing Landing Page** (`/landing`) — Layout: `hero-split`
2. **Pricing & Subscription Tiers** (`/pricing`) — Layout: `cards-3col`
3. **Authentication & Sign In** (`/auth`) — Layout: `centered-card`
4. **Application Dashboard & Analytics** (`/dashboard`) — Layout: `sidebar-grid`
5. **Account & Workspace Settings** (`/settings`) — Layout: `tabbed`
6. **Billing, Plans & Invoices** (`/billing`) — Layout: `default`
7. **Team Members & Permissions** (`/team`) — Layout: `default`
8. **Contact & Sales Inquiry** (`/contact`) — Layout: `default`
9. **System Error & HTTP Status** (`/error`) — Layout: `giant-hero`

### 3. Per-Page Layout Specifications & Section Breakdowns
#### 3.1 Marketing Landing Page (`landing`)
- **Route / Anchor**: `/landing`
- **Scope**: restyle if exists; do not create if missing
- **Archetype Category**: public
- **Layout Architecture ID**: `hero-split`
- **Layout Title**: Marketing Landing
- **Layout Blueprint Description**:
  Split hero with product mockup card on right, customer trust badges, and feature grid.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `landing`
  3. `footer`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

#### 3.2 Pricing & Subscription Tiers (`pricing`)
- **Route / Anchor**: `/pricing`
- **Scope**: restyle if exists; do not create if missing
- **Archetype Category**: public
- **Layout Architecture ID**: `cards-3col`
- **Layout Title**: 3-Card Tier
- **Layout Blueprint Description**:
  Side-by-side tier cards (Starter, Pro, Enterprise) with highlighted recommended plan.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `pricing`
  3. `footer`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

#### 3.3 Authentication & Sign In (`auth`)
- **Route / Anchor**: `/auth`
- **Scope**: restyle if exists; may create if missing, visual only
- **Archetype Category**: auth
- **Layout Architecture ID**: `centered-card`
- **Layout Title**: Centered Card (Default)
- **Layout Blueprint Description**:
  Single centered modal card with logo, credential inputs, primary button and account switch link.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `auth`
  3. `footer`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

#### 3.4 Application Dashboard & Analytics (`dashboard`)
- **Route / Anchor**: `/dashboard`
- **Scope**: restyle if exists; do not create if missing
- **Archetype Category**: core
- **Layout Architecture ID**: `sidebar-grid`
- **Layout Title**: Sidebar + Content
- **Layout Blueprint Description**:
  Left sidebar navigation with stat KPI cards and telemetry charts.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `sidebar`
  3. `dashboard`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

#### 3.5 Account & Workspace Settings (`settings`)
- **Route / Anchor**: `/settings`
- **Scope**: restyle if exists; do not create if missing
- **Archetype Category**: account
- **Layout Architecture ID**: `tabbed`
- **Layout Title**: Horizontal Tabs
- **Layout Blueprint Description**:
  Horizontal top tab bar switching between General & Profile, Notifications & Alerts, and Security & Access.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `sidebar`
  3. `settings`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

#### 3.6 Billing, Plans & Invoices (`billing`)
- **Route / Anchor**: `/billing`
- **Scope**: restyle if exists; do not create if missing
- **Archetype Category**: account
- **Layout Architecture ID**: `default`
- **Layout Title**: Billing, Plans & Invoices
- **Layout Blueprint Description**:
  Subscription usage meters, payment card details, and downloadable PDF invoices.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `sidebar`
  3. `billing`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

#### 3.7 Team Members & Permissions (`team`)
- **Route / Anchor**: `/team`
- **Scope**: restyle if exists; do not create if missing
- **Archetype Category**: account
- **Layout Architecture ID**: `default`
- **Layout Title**: Team Members & Permissions
- **Layout Blueprint Description**:
  Role-based access matrix, member invite dialog, and user status badges.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `sidebar`
  3. `team`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

#### 3.8 Contact & Sales Inquiry (`contact`)
- **Route / Anchor**: `/contact`
- **Scope**: restyle if exists; do not create if missing
- **Archetype Category**: public
- **Layout Architecture ID**: `default`
- **Layout Title**: Contact & Sales Inquiry
- **Layout Blueprint Description**:
  Multi-field conversion form with office details, map preview, and live support banner.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `contact`
  3. `footer`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

#### 3.9 System Error & HTTP Status (`error`)
- **Route / Anchor**: `/error`
- **Scope**: restyle if exists; may create if missing, visual only
- **Archetype Category**: system
- **Layout Architecture ID**: `giant-hero`
- **Layout Title**: Giant Hero
- **Layout Blueprint Description**:
  Bold status code typography with illustration, explanatory message, and navigation buttons.
- **Ordered Section Breakdown**:
  1. `navbar`
  2. `error`
  3. `footer`
- **Responsive Directives**:
  - Mobile (375px): Linear single-column stack, multi-column grids collapse via `minmax(0, 1fr)`.
  - Desktop (1280px+): Expanded multi-column canvas with fixed or sticky navigation rails.

### 4. Global Navigation & Layout Shell Rules
- **Header Navigation Pattern**: `saas-header`
- **Sidebar Application Rail**: `classic-grouped`
- **Footer Layout Pattern**: `columns-mega`
- **Dual-Radius Isolation**:
  - Interactive controls (buttons, badges, pills, avatar circles): use `var(--radius-base)`.
  - Surface containers (cards, modals, drawers, form panels): strictly use `var(--radius-surface)` (derived from radius preset, max 20px).
- **Form Overflow Safeguard**: Two-column form grids must use `gridTemplateColumns: repeat(2, minmax(0, 1fr))` with `boxSizing: border-box` and `minWidth: 0` on all inputs.

### 5. Conflict Precedence & Redesign Invariants

#### Conflict Resolution Order
When instructions, archetype layouts, or existing codebases conflict, resolve in this strict precedence order:
1. **Existing application routes, features, and domain content** (highest priority)
2. **Part A sitemap sequence and scope directives**
3. **Canonical CSS tokens** (`tokens.css`)
4. **Component recipes** (Section 6)
5. **Wireframe structural zones** (Section 7.3) as structural hints
6. **General prose descriptions** (lowest priority)

#### Invariant Constraints for AI Agents
- **Preserve Business Logic**: Never break, delete, or alter application routes, data-fetching logic, state machines, event handlers, props, DOM IDs, or `data-testid` attributes.
- **Presentation Only**: Restyling must strictly alter visual presentation (CSS classes, layout containers, typography, spacing, colors).
- **Approval Required**: Stop and request user confirmation before modifying any functional logic or omitting established product features.
- **Incremental Execution**: Refactor page-by-page. Run existing test suites after each page to verify zero functional regressions.
- **Transparency**: Explicitly report all skipped pages (due to feature scope) and all newly created system/utility pages to the user.

---

### Part B: Canonical Design System Tokens & Recipes

### Zinc Minimal Design System — Design System Specification

## 0. Agent Contract
- **Single Source of Truth**: This document is the definitive specification for all frontend UI development in this repository. Read it completely before generating code.
- **Directing AI Implementation & UI Redesigns**:
  - **Scope & Restyling Contract**: A page listed in this specification is NOT an instruction to create it. If the page already exists in the target project, restyle it (UI/UX only, no logic changes). If a feature page does NOT exist in the project, DO NOT create it unprompted. System/utility pages (auth, 404/500 error screens) may be created if missing, as visual presentation shells only. For existing pages, follow the declared architectural layouts, responsive patterns, and component recipes.
  - **Extensibility & User-Requested Views**: Do NOT invent new feature pages unprompted. You may only synthesize specialized views or sub-routes that the user has explicitly requested, or essential system/utility pages. Ensure all views follow the active theme's tokens, typography scales, contrast, and component styling rules.
  - **Aesthetic Quality Standard**: Direct all implementation toward high-end, responsive UI with harmonious hierarchy, intentional whitespace, and fluid adaptability from mobile (375px) to desktop (1440px). Ensure all text and interactive components target WCAG AA contrast (4.5:1 body text, 3:1 large text and UI components; AAA where the palette allows—see the contrast report).
- **Strict Token Adherence**: Create `src/styles/tokens.css` matching **Section 3** verbatim. Never write raw hex codes, arbitrary margins, or ad-hoc pixel font-sizes outside this token file.
- **Reference Variables**: In styles or components, exclusively use `var(--color-*)`, `var(--font-*)`, and `var(--spacing-*)` (or their configured Tailwind counterparts).
- **Execution Order**: Tokens (`tokens.css`) → Fonts & Icons → Root Layout Shell → Shared Component Recipes (§6) → Page Archetypes (§7) → Responsive Verification (§8) → Acceptance Checklist (§9).
- **Definition of Done**: Every item in **Section 9 (Acceptance Checklist)** must be verified and passing before marking tasks complete.

---

## 1. Overview & Visual Language
The **Zinc Minimal Design System** visual system pairs **Inter** (sans-serif) headings with **Inter** (sans-serif) body typography.
- **Default Profile**: `LIGHT MODE` (with full dark mode support).
- **Corner Curvature**: Base radius token `8px`.
- **Elevation Depth**: Base shadow token `0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)`.
- **Density**: Standard spacing scale based on 16px root rem units.

---

## 2. Design Tokens

### 2.1 Color Palette
| Token | Light Value | Dark Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| **primary** | `#18181b` | `#fafafa` | Brand anchor, primary call-to-actions, prominent buttons (fills/borders) |
| **primary-bg** | `rgba(24, 24, 27, 0.08)` | `rgba(250, 250, 250, 0.16)` | Brand tinted translucent background (cards, hero badges) |
| **primary-text** | `#18181b` | `#fafafa` | Accessible body/link text on background & surface (>= 4.5:1) |
| **secondary** | `#71717a` | `#a1a1aa` | Supporting elements, subtle badges, secondary buttons |
| **secondary-text** | `#6f6f78` | `#a1a1aa` | Accessible secondary copy & links (>= 4.5:1) |
| **accent** | `#2563eb` | `#38bdf8` | Focal highlights, active tab indicators, data charts |
| **accent-text** | `#2563eb` | `#38bdf8` | Accessible accent copy on background & surface (>= 4.5:1) |
| **background** | `#ffffff` | `#09090b` | Application canvas and page root background |
| **surface** | `#f4f4f5` | `#18181b` | Elevated cards, sidebars, modal panels, sheets |
| **text** | `#09090b` | `#f4f4f5` | High-contrast body copy, titles, and iconography |
| **border** | `#e4e4e7` | `#27272a` | Structural dividers, input strokes, container borders |
| **success** | `#10b981` | `#34d399` | Positive confirmations, successful task milestones (fills/icons) |
| **success-bg** | `rgba(16, 185, 129, 0.12)` | `rgba(52, 211, 153, 0.16)` | Success status badge and notification surface background |
| **success-text** | `#0b8059` | `#34d399` | Accessible success text & status notices (>= 4.5:1) |
| **warning** | `#f59e0b` | `#fbbf24` | Attention notices, non-fatal alert warnings (fills/icons) |
| **warning-bg** | `rgba(245, 158, 11, 0.12)` | `rgba(251, 191, 36, 0.16)` | Warning alert and attention banner surface background |
| **warning-text** | `#9a6407` | `#fbbf24` | Accessible warning text (>= 4.5:1) |
| **danger** | `#ef4444` | `#f87171` | Destructive actions, validation errors, system failures (fills/icons) |
| **danger-bg** | `rgba(239, 68, 68, 0.12)` | `rgba(248, 113, 113, 0.16)` | Destructive badge and validation error surface background |
| **danger-text** | `#cb3a3a` | `#f87171` | Accessible error & danger text (>= 4.5:1) |
| **info** | `#0284c7` | `#38bdf8` | Informational announcements, telemetry badges (fills/icons) |
| **info-bg** | `rgba(2, 132, 199, 0.12)` | `rgba(56, 189, 248, 0.16)` | Information banner and telemetry surface background |
| **info-text** | `#0275b1` | `#38bdf8` | Accessible info text (>= 4.5:1) |
| **on-primary** | `#ffffff` | `#000000` | High-contrast accessible text sitting on Primary |
| **on-secondary**| `#ffffff` | `#000000` | High-contrast accessible text sitting on Secondary |
| **on-accent** | `#ffffff` | `#000000` | High-contrast accessible text sitting on Accent |
| **on-success** | `#000000` | `#000000` | High-contrast accessible text sitting on Success |
| **on-warning** | `#000000` | `#000000` | High-contrast accessible text sitting on Warning |
| **on-danger** | `#000000` | `#000000` | High-contrast accessible text sitting on Danger |
| **on-info** | `#000000` | `#000000` | High-contrast accessible text sitting on Info |
| **muted** | `#64748b` | `#94a3b8` | Secondary helper labels, timestamps, disabled hints |
| **ring** | `#18181b` | `#38bdf8` | Accessible keyboard focus outline ring (2px offset) |
| **scrim** | `rgba(0, 0, 0, 0.5)` | `rgba(0, 0, 0, 0.75)` | Modal & drawer backdrop overlay mask |

> **Color Application Rule**: Use `*-text` tokens (`--color-primary-text`, `--color-success-text`, etc.) for text, labels, and links; use base colors for component fills, borders, and icons.

### 2.1b Contrast Report
> **Compliance Target**: Target: WCAG AA (4.5:1 body text, 3:1 large text and UI components); AAA where the palette allows. See the contrast report below.

#### Light Mode Contrast Table
| Evaluated Pair | Foreground | Background | Ratio | WCAG AA (4.5:1) | WCAG AAA (7.0:1) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text on background` | `#09090b` | `#ffffff` | **19.90:1** | ✅ Pass | ✅ Pass |
| `text on surface` | `#09090b` | `#f4f4f5` | **18.10:1** | ✅ Pass | ✅ Pass |
| `muted on background` | `#64748b` | `#ffffff` | **4.76:1** | ✅ Pass | — |
| `muted on surface` | `#64748b` | `#f4f4f5` | **4.33:1** | ❌ Fail | — |
| `on-primary on primary` | `#ffffff` | `#18181b` | **17.72:1** | ✅ Pass | ✅ Pass |
| `on-secondary on secondary` | `#ffffff` | `#71717a` | **4.83:1** | ✅ Pass | — |
| `on-accent on accent` | `#ffffff` | `#2563eb` | **5.17:1** | ✅ Pass | — |
| `on-success on success` | `#000000` | `#10b981` | **8.28:1** | ✅ Pass | ✅ Pass |
| `on-warning on warning` | `#000000` | `#f59e0b` | **9.78:1** | ✅ Pass | ✅ Pass |
| `on-danger on danger` | `#000000` | `#ef4444` | **5.58:1** | ✅ Pass | — |
| `on-info on info` | `#000000` | `#0284c7` | **5.13:1** | ✅ Pass | — |
| `primary-text on background` | `#18181b` | `#ffffff` | **17.72:1** | ✅ Pass | ✅ Pass |
| `primary-text on surface` | `#18181b` | `#f4f4f5` | **16.12:1** | ✅ Pass | ✅ Pass |
| `secondary-text on background` | `#6f6f78` | `#ffffff` | **4.98:1** | ✅ Pass | — |
| `secondary-text on surface` | `#6f6f78` | `#f4f4f5` | **4.53:1** | ✅ Pass | — |
| `accent-text on background` | `#2563eb` | `#ffffff` | **5.17:1** | ✅ Pass | — |
| `accent-text on surface` | `#2563eb` | `#f4f4f5` | **4.70:1** | ✅ Pass | — |
| `success-text on background` | `#0b8059` | `#ffffff` | **4.95:1** | ✅ Pass | — |
| `success-text on surface` | `#0b8059` | `#f4f4f5` | **4.50:1** | ✅ Pass | — |
| `warning-text on background` | `#9a6407` | `#ffffff` | **5.00:1** | ✅ Pass | — |
| `warning-text on surface` | `#9a6407` | `#f4f4f5` | **4.55:1** | ✅ Pass | — |
| `danger-text on background` | `#cb3a3a` | `#ffffff` | **4.99:1** | ✅ Pass | — |
| `danger-text on surface` | `#cb3a3a` | `#f4f4f5` | **4.54:1** | ✅ Pass | — |
| `info-text on background` | `#0275b1` | `#ffffff` | **5.02:1** | ✅ Pass | — |
| `info-text on surface` | `#0275b1` | `#f4f4f5` | **4.57:1** | ✅ Pass | — |
| `success on surface (fill only)` | `#10b981` | `#f4f4f5` | **2.31:1** | ⚠️ Fill Only | — |
| `warning on surface (fill only)` | `#f59e0b` | `#f4f4f5` | **1.95:1** | ⚠️ Fill Only | — |
| `danger on surface (fill only)` | `#ef4444` | `#f4f4f5` | **3.42:1** | ✅ Pass (UI) | — |
| `info on surface (fill only)` | `#0284c7` | `#f4f4f5` | **3.73:1** | ✅ Pass (UI) | — |

#### Dark Mode Contrast Table
| Evaluated Pair | Foreground | Background | Ratio | WCAG AA (4.5:1) | WCAG AAA (7.0:1) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text on background` | `#f4f4f5` | `#09090b` | **18.10:1** | ✅ Pass | ✅ Pass |
| `text on surface` | `#f4f4f5` | `#18181b` | **16.12:1** | ✅ Pass | ✅ Pass |
| `muted on background` | `#94a3b8` | `#09090b` | **7.76:1** | ✅ Pass | ✅ Pass |
| `muted on surface` | `#94a3b8` | `#18181b` | **6.91:1** | ✅ Pass | — |
| `on-primary on primary` | `#000000` | `#fafafa` | **20.12:1** | ✅ Pass | ✅ Pass |
| `on-secondary on secondary` | `#000000` | `#a1a1aa` | **8.19:1** | ✅ Pass | ✅ Pass |
| `on-accent on accent` | `#000000` | `#38bdf8` | **9.80:1** | ✅ Pass | ✅ Pass |
| `on-success on success` | `#000000` | `#34d399` | **10.92:1** | ✅ Pass | ✅ Pass |
| `on-warning on warning` | `#000000` | `#fbbf24` | **12.58:1** | ✅ Pass | ✅ Pass |
| `on-danger on danger` | `#000000` | `#f87171` | **7.59:1** | ✅ Pass | ✅ Pass |
| `on-info on info` | `#000000` | `#38bdf8` | **9.80:1** | ✅ Pass | ✅ Pass |
| `primary-text on background` | `#fafafa` | `#09090b` | **19.06:1** | ✅ Pass | ✅ Pass |
| `primary-text on surface` | `#fafafa` | `#18181b` | **16.97:1** | ✅ Pass | ✅ Pass |
| `secondary-text on background` | `#a1a1aa` | `#09090b` | **7.76:1** | ✅ Pass | ✅ Pass |
| `secondary-text on surface` | `#a1a1aa` | `#18181b` | **6.91:1** | ✅ Pass | — |
| `accent-text on background` | `#38bdf8` | `#09090b` | **9.29:1** | ✅ Pass | ✅ Pass |
| `accent-text on surface` | `#38bdf8` | `#18181b` | **8.27:1** | ✅ Pass | ✅ Pass |
| `success-text on background` | `#34d399` | `#09090b` | **10.35:1** | ✅ Pass | ✅ Pass |
| `success-text on surface` | `#34d399` | `#18181b` | **9.22:1** | ✅ Pass | ✅ Pass |
| `warning-text on background` | `#fbbf24` | `#09090b` | **11.92:1** | ✅ Pass | ✅ Pass |
| `warning-text on surface` | `#fbbf24` | `#18181b` | **10.61:1** | ✅ Pass | ✅ Pass |
| `danger-text on background` | `#f87171` | `#09090b` | **7.19:1** | ✅ Pass | ✅ Pass |
| `danger-text on surface` | `#f87171` | `#18181b` | **6.40:1** | ✅ Pass | — |
| `info-text on background` | `#38bdf8` | `#09090b` | **9.29:1** | ✅ Pass | ✅ Pass |
| `info-text on surface` | `#38bdf8` | `#18181b` | **8.27:1** | ✅ Pass | ✅ Pass |
| `success on surface (fill only)` | `#34d399` | `#18181b` | **9.22:1** | ✅ Pass (UI) | ✅ Pass |
| `warning on surface (fill only)` | `#fbbf24` | `#18181b` | **10.61:1** | ✅ Pass (UI) | ✅ Pass |
| `danger on surface (fill only)` | `#f87171` | `#18181b` | **6.40:1** | ✅ Pass (UI) | — |
| `info on surface (fill only)` | `#38bdf8` | `#18181b` | **8.27:1** | ✅ Pass (UI) | ✅ Pass |

#### Contrast Warnings & Remediation Recommendations
- ⚠️ **Light Mode Warning**: `muted` on `surface` achieves 4.33:1 (fails WCAG AA 4.5:1). Remedy: use `--color-text` for typography.

### 2.2 Typography Scale
- **Heading Font**: `Inter` (sans-serif)
- **Body Font**: `Inter` (sans-serif)
- **Base Size**: `16px` | **Modular Scale Ratio**: `1.125`

| Role | Step | Size (px) | Size (rem) | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (H1)** | `4` | `25.6px` | `1.600rem` | `700` | `1.15` | `-0.025em` |
| **Section (H2)** | `3` | `22.8px` | `1.425rem` | `700` | `1.2` | `-0.02em` |
| **Subsection (H3)** | `2` | `20.3px` | `1.269rem` | `600` | `1.25` | `-0.015em` |
| **Card Header (H4)** | `1` | `18px` | `1.125rem` | `600` | `1.3` | `-0.01em` |
| **Body Copy** | `0` | `16px` | `1.000rem` | `400` | `1.5` | `0em` |
| **Small / Caption** | `-1` | `14.2px` | `0.887rem` | `400` | `1.4` | `0.01em` |

### 2.3 Spacing Scale
| Token | Rem Value | Common Interface Usage |
| :--- | :--- | :--- |
| **spacing-xs** | `0.375rem` | Tight internal badge padding, icon gaps |
| **spacing-sm** | `0.75rem` | Button horizontal padding, form field gaps |
| **spacing-md** | `1rem` | Standard card internal padding, item separation |
| **spacing-lg** | `1.75rem` | Container section padding, grid column gaps |
| **spacing-xl** | `2.5rem` | Major layout gutter, hero section padding |

### 2.4 Border Radius, Elevation & Motion
- **Base Corner Radius (`--radius-base`)**: `8px` (buttons, inputs, tabs, interactive elements)
- **Surface Corner Radius (`--radius-surface`)**: `8px` (cards, dialogs, drawers; derived, max 20px). Use `var(--radius-surface)` with no fallback everywhere.
- **Pill Radius (`--radius-pill`)**: `9999px` (badges, switch toggles, search pills)
- **Elevation Shadows**:
  - `--shadow-sm`: `0 1px 2px rgba(0, 0, 0, 0.05)` (subtle cards, inputs)
  - `--shadow-base`: `0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)` (standard surface elevation)
  - `--shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` (popovers, tooltips)
  - `--shadow-lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` (modals, slide-over sheets)
  - `--shadow-hover`: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)` (card and interactive surface hover elevation)
- **Glass & Scrim**: `--blur-glass: 12px`, `--color-scrim: rgba(0, 0, 0, 0.5)`
- **Z-Index Hierarchy**: `--z-dropdown: 1000`, `--z-sticky: 1100`, `--z-modal: 1200`, `--z-toast: 1300`
- **Transitions**: `--duration-fast: 150ms`, `--duration-base: 200ms`, `--duration-slow: 300ms`, `--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1)`

### 2.5 Breakpoints & Test Viewports
- **Media Query Breakpoints**: `sm: 640px` (mobile-to-tablet), `lg: 1024px` (tablet-to-desktop), `wide: 1280px` (max-width canvas cap).
- **Test Viewports**: `375px` (Compact Mobile), `768px` (Tablet Portrait), `1280px` (Desktop Canvas).

---

## 3. CSS Variables Block
Paste this block into your global stylesheet (e.g. `src/styles/tokens.css`):

```css
:root {
  /* Colors (Light Mode) */
  --color-primary: #18181b;
  --color-primary-bg: rgba(24, 24, 27, 0.08);
  --color-primary-text: #18181b;
  --color-secondary: #71717a;
  --color-secondary-text: #6f6f78;
  --color-accent: #2563eb;
  --color-accent-text: #2563eb;
  --color-background: #ffffff;
  --color-surface: #f4f4f5;
  --color-text: #09090b;
  --color-border: #e4e4e7;
  --color-muted: #64748b;
  --color-ring: #18181b;
  --color-scrim: rgba(0, 0, 0, 0.5);

  /* Status Colors & Text-Safe Pairs (Light Mode) */
  --color-success: #10b981;
  --color-success-bg: rgba(16, 185, 129, 0.12);
  --color-success-text: #0b8059;
  --color-on-success: #000000;

  --color-warning: #f59e0b;
  --color-warning-bg: rgba(245, 158, 11, 0.12);
  --color-warning-text: #9a6407;
  --color-on-warning: #000000;

  --color-danger: #ef4444;
  --color-danger-bg: rgba(239, 68, 68, 0.12);
  --color-danger-text: #cb3a3a;
  --color-on-danger: #000000;

  --color-info: #0284c7;
  --color-info-bg: rgba(2, 132, 199, 0.12);
  --color-info-text: #0275b1;
  --color-on-info: #000000;

  --color-on-primary: #ffffff;
  --color-on-secondary: #ffffff;
  --color-on-accent: #ffffff;

  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-size-base: 16px;
  --font-scale: 1.125;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Typographic Hierarchy Steps */
  --font-size-step-4: 1.600rem; /* 25.6px (Display (H1)) */
  --font-size-step-3: 1.425rem; /* 22.8px (Section (H2)) */
  --font-size-step-2: 1.269rem; /* 20.3px (Subsection (H3)) */
  --font-size-step-1: 1.125rem; /* 18px (Card Header (H4)) */
  --font-size-step-0: 1.000rem; /* 16px (Body Copy) */
  --font-size-step-sub1: 0.887rem; /* 14.2px (Small / Caption) */

  /* Spacing Scale */
  --spacing-xs: 0.375rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.75rem;
  --spacing-xl: 2.5rem;

  /* Shape & Elevation */
  --radius-base: 8px;
  --radius-surface: 8px;
  --radius-pill: 9999px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-base: 0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --blur-glass: 12px;

  /* Z-Index Hierarchy */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-modal: 1200;
  --z-toast: 1300;

  /* Animation & Transitions */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);

  /* Icon System (lucide • outline • regular) */
  --icon-library: 'lucide';
  --icon-stroke: 1.75px;
  --icon-fill-opacity: 0;

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-lg: 1024px;
  --breakpoint-wide: 1280px;
}

/* Dark Mode Overrides */
[data-theme='dark'],
.dark {
  --color-primary: #fafafa;
  --color-primary-bg: rgba(250, 250, 250, 0.16);
  --color-primary-text: #fafafa;
  --color-secondary: #a1a1aa;
  --color-secondary-text: #a1a1aa;
  --color-accent: #38bdf8;
  --color-accent-text: #38bdf8;
  --color-background: #09090b;
  --color-surface: #18181b;
  --color-text: #f4f4f5;
  --color-border: #27272a;
  --color-muted: #94a3b8;
  --color-ring: #38bdf8;
  --color-scrim: rgba(0, 0, 0, 0.75);

  --color-success: #34d399;
  --color-success-bg: rgba(52, 211, 153, 0.16);
  --color-success-text: #34d399;
  --color-on-success: #000000;

  --color-warning: #fbbf24;
  --color-warning-bg: rgba(251, 191, 36, 0.16);
  --color-warning-text: #fbbf24;
  --color-on-warning: #000000;

  --color-danger: #f87171;
  --color-danger-bg: rgba(248, 113, 113, 0.16);
  --color-danger-text: #f87171;
  --color-on-danger: #000000;

  --color-info: #38bdf8;
  --color-info-bg: rgba(56, 189, 248, 0.16);
  --color-info-text: #38bdf8;
  --color-on-info: #000000;

  --color-on-primary: #000000;
  --color-on-secondary: #000000;
  --color-on-accent: #000000;
}

/* System Dark Mode (Applied when no data-theme is explicitly specified) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-primary: #fafafa;
    --color-primary-bg: rgba(250, 250, 250, 0.16);
    --color-primary-text: #fafafa;
    --color-secondary: #a1a1aa;
    --color-secondary-text: #a1a1aa;
    --color-accent: #38bdf8;
    --color-accent-text: #38bdf8;
    --color-background: #09090b;
    --color-surface: #18181b;
    --color-text: #f4f4f5;
    --color-border: #27272a;
    --color-muted: #94a3b8;
    --color-ring: #38bdf8;
    --color-scrim: rgba(0, 0, 0, 0.75);

    --color-success: #34d399;
    --color-success-bg: rgba(52, 211, 153, 0.16);
    --color-success-text: #34d399;
    --color-on-success: #000000;

    --color-warning: #fbbf24;
    --color-warning-bg: rgba(251, 191, 36, 0.16);
    --color-warning-text: #fbbf24;
    --color-on-warning: #000000;

    --color-danger: #f87171;
    --color-danger-bg: rgba(248, 113, 113, 0.16);
    --color-danger-text: #f87171;
    --color-on-danger: #000000;

    --color-info: #38bdf8;
    --color-info-bg: rgba(56, 189, 248, 0.16);
    --color-info-text: #38bdf8;
    --color-on-info: #000000;

    --color-on-primary: #000000;
    --color-on-secondary: #000000;
    --color-on-accent: #000000;
  }
}
```

---

## 4. Tailwind CSS Configuration
Add this configuration inside `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

// Tailwind Theme Configuration for: Zinc Minimal Design System
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-bg': 'var(--color-primary-bg)',
        'primary-text': 'var(--color-primary-text)',
        secondary: 'var(--color-secondary)',
        'secondary-text': 'var(--color-secondary-text)',
        accent: 'var(--color-accent)',
        'accent-text': 'var(--color-accent-text)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        'success-bg': 'var(--color-success-bg)',
        'success-text': 'var(--color-success-text)',
        warning: 'var(--color-warning)',
        'warning-bg': 'var(--color-warning-bg)',
        'warning-text': 'var(--color-warning-text)',
        danger: 'var(--color-danger)',
        'danger-bg': 'var(--color-danger-bg)',
        'danger-text': 'var(--color-danger-text)',
        info: 'var(--color-info)',
        'info-bg': 'var(--color-info-bg)',
        'info-text': 'var(--color-info-text)',
        'on-primary': 'var(--color-on-primary)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-accent': 'var(--color-on-accent)',
        'on-success': 'var(--color-on-success)',
        'on-warning': 'var(--color-on-warning)',
        'on-danger': 'var(--color-on-danger)',
        'on-info': 'var(--color-on-info)',
        muted: 'var(--color-muted)',
        ring: 'var(--color-ring)',
        scrim: 'var(--color-scrim)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        brand: 'var(--radius-base)',
        surface: 'var(--radius-surface)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        brand: 'var(--shadow-base)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        hover: 'var(--shadow-hover)',
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
      },
      spacing: {
        'ts-xs': 'var(--spacing-xs)',
        'ts-sm': 'var(--spacing-sm)',
        'ts-md': 'var(--spacing-md)',
        'ts-lg': 'var(--spacing-lg)',
        'ts-xl': 'var(--spacing-xl)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 5. Icon & Font System

### 5.1 Icon Library: LUCIDE
- **Package**: `lucide-react`
- **Installation**:
  ```bash
  npm install lucide-react
  ```
- **Style Mode**: `OUTLINE`
- **Stroke Geometry**: `1.75px` (1.75px line width)
- **Duotone Depth**: Disabled
- **Component Import Example**:
  ```tsx
  import { Sparkles } from 'lucide-react';

  export const ActionIcon = () => (
    <Sparkles
      size={20}
      strokeWidth={1.75}
      fill="none"
    />
  );
  ```

### 5.2 Google Fonts Embed
**HTML `<head>` tag**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**CSS `@import`**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

---

## 6. Component Recipes
Build every component using the exact token dimensions and interactive state definitions below:

### 6.1 Primary Button
- **Description**: Main high-emphasis call to action for the primary task on a screen.
- **Height**: Small (`36px`), Medium (`42px`), Large (`48px`)
- **Horizontal Padding**: Small (`0 var(--spacing-sm)`), Medium (`0 var(--spacing-md)`), Large (`0 var(--spacing-lg)`)
- **Border**: `1px solid transparent` | **Radius**: `var(--radius-base)` | **Shadow**: `var(--shadow-base)`
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-0); font-weight: 600;`
- **State Behavior**:
  - *Default*: `background-color: var(--color-primary); color: var(--color-on-primary);`
  - *Hover*: `filter: brightness(1.08); transform: translateY(-1px);`
  - *Active*: `transform: scale(0.98); filter: brightness(0.95);`
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: 2px;`
  - *Disabled*: `opacity: 0.45; cursor: not-allowed; pointer-events: none;`
  

### 6.2 Secondary Button
- **Description**: Medium-emphasis alternative button for supporting or secondary actions.
- **Height**: Small (`36px`), Medium (`42px`), Large (`48px`)
- **Horizontal Padding**: Small (`0 var(--spacing-sm)`), Medium (`0 var(--spacing-md)`), Large (`0 var(--spacing-lg)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-base)` | **Shadow**: `none`
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-0); font-weight: 500;`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); color: var(--color-text);`
  - *Hover*: `background-color: var(--color-background); border-color: var(--color-primary);`
  - *Active*: `transform: scale(0.98);`
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: 2px;`
  - *Disabled*: `opacity: 0.45; cursor: not-allowed; pointer-events: none;`
  

### 6.3 Text Input & Select
- **Description**: Standard single-line text fields, search boxes, and dropdown selects.
- **Height**: Small (`36px`), Medium (`42px`), Large (`48px`)
- **Horizontal Padding**: Small (`0 var(--spacing-sm)`), Medium (`0 var(--spacing-md)`), Large (`0 var(--spacing-md)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-base)` 
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-0);`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); color: var(--color-text);`
  - *Hover*: `border-color: var(--color-muted);`
  
  - *Focus*: `border-color: var(--color-ring); outline: 2px solid var(--color-ring); outline-offset: 0;`
  - *Disabled*: `opacity: 0.5; background-color: var(--color-background); cursor: not-allowed;`
  - *Error*: `border-color: var(--color-danger); outline: 2px solid var(--color-danger);`

### 6.4 Card & Container Surface
- **Description**: Standard elevated container surface for grouping related content.
- **Height**: Small (`auto`), Medium (`auto`), Large (`auto`)
- **Horizontal Padding**: Small (`var(--spacing-sm)`), Medium (`var(--spacing-md)`), Large (`var(--spacing-lg)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-surface)` | **Shadow**: `var(--shadow-base)`
- **Typography**: `font-family: var(--font-body); color: var(--color-text);`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); border: 1px solid var(--color-border);`
  - *Hover*: `box-shadow: var(--shadow-hover); border-color: var(--color-muted);`
  
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: 2px;`
  
  

### 6.5 Status Badge & Pill
- **Description**: Compact status indicator for categories, states, and counts.
- **Height**: Small (`20px`), Medium (`24px`), Large (`28px`)
- **Horizontal Padding**: Small (`0 var(--spacing-xs)`), Medium (`0 var(--spacing-sm)`), Large (`0 var(--spacing-sm)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-pill)` 
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-sub1); font-weight: 600;`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border);`
  - *Hover*: `background-color: var(--color-background);`
  - *Active*: `transform: scale(0.96);`
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: 1px;`
  - *Disabled*: `opacity: 0.5; pointer-events: none;`
  

### 6.6 Alert & Toast Notification
- **Description**: System message box communicating status, warnings, errors, or success. Variants use dedicated tinted background and text-safe status tokens.
- **Height**: Small (`auto`), Medium (`auto`), Large (`auto`)
- **Horizontal Padding**: Small (`var(--spacing-sm)`), Medium (`var(--spacing-md)`), Large (`var(--spacing-md)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-base)` | **Shadow**: `var(--shadow-base)`
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-0);`
- **State Behavior**:
  - *Default*: `background-color: var(--color-info-bg); color: var(--color-info-text); border-left: 4px solid var(--color-info);`
  - *Hover*: `filter: brightness(0.98);`
  - *Active*: `filter: brightness(0.95);`
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: 2px;`
  - *Disabled*: `opacity: 0.5; pointer-events: none;`
  - *Error*: `background-color: var(--color-danger-bg); color: var(--color-danger-text); border-left: 4px solid var(--color-danger);`

### 6.7 Data Table & Rows
- **Description**: Tabular presentation with header row and striped/bordered data cells.
- **Height**: Small (`36px`), Medium (`44px`), Large (`52px`)
- **Horizontal Padding**: Small (`6px var(--spacing-sm)`), Medium (`10px var(--spacing-md)`), Large (`14px var(--spacing-md)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-base)` 
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-0);`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);`
  - *Hover*: `background-color: var(--color-background);`
  - *Active*: `background-color: var(--color-primary-bg);`
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: -2px;`
  - *Disabled*: `opacity: 0.45; pointer-events: none;`
  

### 6.8 Modal Dialog & Drawer
- **Description**: High-elevation overlay container for focused workflows, confirmations, and forms.
- **Height**: Small (`auto`), Medium (`auto`), Large (`auto`)
- **Horizontal Padding**: Small (`var(--spacing-md)`), Medium (`var(--spacing-lg)`), Large (`var(--spacing-xl)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-surface)` | **Shadow**: `var(--shadow-lg)`
- **Typography**: `font-family: var(--font-body); color: var(--color-text);`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); box-shadow: var(--shadow-lg);`
  
  
  - *Focus*: `outline: none;`
  
  

### 6.9 Tabs & Segmented Control
- **Description**: Horizontal tab switchers and segmented pills for toggling views.
- **Height**: Small (`32px`), Medium (`38px`), Large (`44px`)
- **Horizontal Padding**: Small (`0 var(--spacing-sm)`), Medium (`0 var(--spacing-md)`), Large (`0 var(--spacing-md)`)
- **Border**: `none` | **Radius**: `var(--radius-base)` 
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-sub1); font-weight: 500;`
- **State Behavior**:
  - *Default*: `background-color: transparent; color: var(--color-muted);`
  - *Hover*: `color: var(--color-text); background-color: var(--color-background);`
  - *Active*: `color: var(--color-primary-text); border-bottom: 2px solid var(--color-primary); font-weight: 600;`
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: 2px;`
  - *Disabled*: `opacity: 0.4; cursor: not-allowed; pointer-events: none;`
  

### 6.10 Toggle Switch
- **Description**: Binary toggle switch for instant state enable/disable preferences.
- **Height**: Small (`20px`), Medium (`24px`), Large (`28px`)
- **Horizontal Padding**: Small (`2px`), Medium (`2px`), Large (`2px`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-pill)` 
- **Typography**: `font-family: var(--font-body);`
- **State Behavior**:
  - *Default*: `background-color: var(--color-border);`
  - *Hover*: `filter: brightness(0.95);`
  - *Checked*: `background-color: var(--color-primary); border-color: var(--color-primary);`
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: 2px;`
  - *Disabled*: `opacity: 0.4; cursor: not-allowed; pointer-events: none;`
  

### 6.11 Checkbox & Radio
- **Description**: Selection controls for lists, options, and multi-select forms.
- **Height**: Small (`16px`), Medium (`20px`), Large (`24px`)
- **Horizontal Padding**: Small (`0`), Medium (`0`), Large (`0`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-base)` 
- **Typography**: `font-family: var(--font-body);`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); border: 1px solid var(--color-border);`
  - *Hover*: `border-color: var(--color-primary);`
  - *Checked*: `background-color: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary);`
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: 2px;`
  - *Disabled*: `opacity: 0.4; cursor: not-allowed; pointer-events: none;`
  

### 6.12 Tooltip & Micro-Popover
- **Description**: Compact contextual helper floating above or below interactive targets.
- **Height**: Small (`auto`), Medium (`auto`), Large (`auto`)
- **Horizontal Padding**: Small (`4px var(--spacing-xs)`), Medium (`6px var(--spacing-sm)`), Large (`8px var(--spacing-sm)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-base)` | **Shadow**: `var(--shadow-md)`
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-sub1); font-weight: 500;`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); color: var(--color-text); box-shadow: var(--shadow-md);`
  
  
  
  
  

### 6.13 Dropdown Menu & Context Menu
- **Description**: Floating selection list for secondary navigation actions, filters, and commands.
- **Height**: Small (`auto`), Medium (`auto`), Large (`auto`)
- **Horizontal Padding**: Small (`var(--spacing-xs)`), Medium (`var(--spacing-xs)`), Large (`var(--spacing-xs)`)
- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-surface)` | **Shadow**: `var(--shadow-lg)`
- **Typography**: `font-family: var(--font-body); font-size: var(--font-size-step-0);`
- **State Behavior**:
  - *Default*: `background-color: var(--color-surface); border: 1px solid var(--color-border); box-shadow: var(--shadow-lg);`
  - *Hover*: `background-color: var(--color-background);`
  
  - *Focus*: `outline: 2px solid var(--color-ring); outline-offset: -1px;`
  
  

---

## 7. Page Inventory & Wireframe Architecture

> **Notice on Wireframe Content**: Wireframe copy and sample data shown below are illustrative placeholders. Implementations must replace them with real project domain content and preserve existing product copy.

### 7.0 Active Target Project Goal: SAAS
This application architecture is configured specifically for the **SaaS Platform** sector:
> *Multi-tenant analytics, permissions & subscription operations*

### 7.1 Configured Layout Archetypes Matrix
The following layout variants have been selected in this design system. Any AI agent or developer generating pages must adhere to these chosen archetypes:

| Surface / Page | Configured Archetype | Variant Title | Core Structural Placement |
| :--- | :--- | :--- | :--- |
| **NAVBAR** | `saas-header` | Modern SaaS Header | Full-width app header with brand breadcrumbs, command bar (Cmd+K), and user profile drawer. |
| **SIDEBAR** | `classic-grouped` | Classic Grouped | Categorized collapsible navigation groups with unread notification badges and workspace switcher. |
| **FOOTER** | `columns-mega` | Multi-Column Mega Footer | Comprehensive grid with brand column, product/solution/resource/legal links, system status, and social bar. |
| **LANDING** | `hero-split` | Marketing Landing | Split hero with product mockup card on right, customer trust badges, and feature grid. |
| **PRICING** | `cards-3col` | 3-Card Tier | Side-by-side tier cards (Starter, Pro, Enterprise) with highlighted recommended plan. |
| **AUTH** | `centered-card` | Centered Card (Default) | Single centered modal card with logo, credential inputs, primary button and account switch link. |
| **DASHBOARD** | `sidebar-grid` | Sidebar + Content | Left sidebar navigation with stat KPI cards and telemetry charts. |
| **SETTINGS** | `tabbed` | Horizontal Tabs | Horizontal top tab bar switching between General & Profile, Notifications & Alerts, and Security & Access. |
| **BILLING** | `default` | Billing & Invoices | Subscription usage meters, payment card details, and downloadable PDF invoices. |
| **TEAM** | `default` | Team Members & Permissions | Team member directory table with role badges, invite modal trigger, and permission toggles. |
| **CONTACT** | `default` | Contact & Sales Inquiry | Multi-field conversion form with office details, map preview, and live support banner. |
| **ERROR** | `giant-hero` | Giant Hero | Bold status code typography with illustration, explanatory message, and navigation buttons. |

---

### 7.2 Default Application Shell & New Page Blueprint
When creating **ANY** new page, dashboard module, or custom view not explicitly inventoried below, start with this **Master Application Shell** and layout structure as the default:

#### A. Master Layout Shell Architecture
- **Root Container**: Full viewport height (`100vh`), `overflow-hidden`, with canvas background (`var(--color-background)`) and text color (`var(--color-text)`).
- **Primary Global Sidebar**: Fixed to left margin using the configured **`classic-grouped`** sidebar archetype (`w-64` to `w-72`, border-r `var(--color-border)`). On Mobile (<640px), collapses into an off-canvas drawer or sticky bottom navigation bar.
- **Top Application Header**: Sticky top navigation using the configured **`saas-header`** header archetype (`z-20`). Renders as a full-width header bar (`h-16`, border-b `var(--color-border)`). Contains brand logo, search palette trigger, notification bell, and user avatar.
- **Global / Contextual Footer**: Configured **`columns-mega`** footer archetype applied across public and content-centric surfaces (omitted in authenticated sidebar app layouts).
- **Main Viewport Canvas**: Fluid scrollable container (`flex-1 overflow-y-auto`), bounded by wide container cap (`1280px`) with standard padding (`var(--spacing-lg)` = `1.75rem`).

#### B. Default New Page Structural Zones
Organize every new page into these four canonical vertical zones:
1. **Header & Context Zone**:
   - Breadcrumb navigation: uppercase small tracking label (`var(--color-muted)`, `var(--font-size-step-sub1)`).
   - Page Heading: `H1` with `var(--font-heading)`, `700` weight, and size `var(--font-size-step-4)`.
   - Action Bar: Aligned to top-right. Maximum of 2 secondary outlined buttons + exactly 1 primary CTA button (`var(--color-primary)` background, `var(--color-on-primary)` text).
2. **Summary / Metric Strip Zone (When applicable)**:
   - 2 to 4 responsive metric cards in a grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` with `var(--spacing-md)` gap).
   - Surface cards with `var(--radius-surface)` border radius and `var(--shadow-base)` elevation.
3. **Primary Content / Data Surface Zone**:
   - The central payload (e.g. data table, Kanban board, form group, or detail split pane).
   - Encapsulated in a card container: `background-color: var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-surface)`, `padding: var(--spacing-lg)`.
4. **Contextual Footer / Status Zone**:
   - Result counts, active filter tags, pagination controls, or timestamp of last synchronization.

#### C. Starter Code Blueprint (React & Tailwind CSS)
Use this exact component structure as the foundational boilerplate for any new page:

```tsx
import React from 'react';

export interface NewPageProps {
  title: string;
  category?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  isPublic?: boolean;
}

export const StandardPageShell: React.FC<NewPageProps> = ({
  title,
  category = 'Application',
  actions,
  children,
  isPublic = false,
}) => {
  return (
    <div className="flex h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-[var(--font-body)] overflow-hidden">
      {/* 1. Global Navigation Sidebar: classic-grouped */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]">
        {/* Render classic-grouped navigation */}
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. Global Top App Header: saas-header */}
        <header className="h-16 px-[var(--spacing-md)] lg:px-[var(--spacing-lg)] border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between flex-shrink-0 z-10">
          {/* Render saas-header controls */}
        </header>

        {/* 3. Main Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-[var(--spacing-md)] lg:p-[var(--spacing-lg)] max-w-[var(--container-max-width,1280px)] w-full mx-auto flex flex-col gap-[var(--spacing-lg)]">
          {/* Zone 1: Breadcrumb & Title Header */}
          <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--spacing-md)] pb-[var(--spacing-md)] border-b border-[var(--color-border)]">
            <div>
              <div className="text-[var(--font-size-step-sub1)] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-1">
                {category}
              </div>
              <h1 className="text-[var(--font-size-step-4)] font-bold font-[var(--font-heading)] text-[var(--color-text)]">
                {title}
              </h1>
            </div>
            {actions && <div className="flex items-center gap-[var(--spacing-sm)]">{actions}</div>}
          </section>

          {/* Zone 2 & 3: Content Body & Surface */}
          <section className="flex-1 flex flex-col gap-[var(--spacing-md)]">
            {children}
          </section>
        </main>

        {/* 4. Global / Contextual Footer: rendered ONLY for public/content pages */}
        {isPublic && (
          <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--spacing-md)] text-[var(--font-size-step-sub1)] text-[var(--color-muted)] flex items-center justify-between">
            {/* Render columns-mega */}
          </footer>
        )}
      </div>
    </div>
  );
};
```

---

### 7.3 Specific Page Archetype Wireframes & Guidelines
Implement the specific application pages according to their chosen wireframe architecture and responsive specifications.
> *Notice: If an archetype originated from another sector catalog, use its layout structure only; ignore any sector-specific sample copy and imagery.*

#### 7.3.1 Modern SaaS Header (`navbar`)
- **Configured Archetype**: `saas-header`
- **Description**: Full-width app header with brand breadcrumbs, command bar (Cmd+K), and user profile drawer.
- **Structural Wireframe**:
```text
+-------------------------------------------------------+
| [Brand] / Project    [Search or Cmd+K]   (+) [Bell] [User]|
+-------------------------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Search collapses to search icon button; breadcrumb shortens to current entity.
- **Tablet (640px–1023px) Responsive Rule**: Compact search bar with breadcrumb trail and quick action buttons.

#### 7.3.2 Classic Grouped (`sidebar`)
- **Configured Archetype**: `classic-grouped`
- **Description**: Categorized collapsible navigation groups with unread notification badges and workspace switcher.
- **Structural Wireframe**:
```text
+---------------+---------------------------------------+
| [Brand]       | Main Workspace Content                |
|               |                                       |
| CORE SYSTEM   |                                       |
| - Dashboard   |                                       |
| - Reports [3] |                                       |
|               |                                       |
| ADMIN         |                                       |
| - Settings    |                                       |
+---------------+---------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Sidebar collapses off-screen into an accessible sliding drawer opened by hamburger button.
- **Tablet (640px–1023px) Responsive Rule**: Sidebar collapses to a 64px compact icon rail or sliding overlay drawer.

#### 7.3.3 Multi-Column Mega Footer (`footer`)
- **Configured Archetype**: `columns-mega`
- **Description**: Comprehensive grid with brand column, product/solution/resource/legal links, system status, and social bar.
- **Structural Wireframe**:
```text
+-------------------------------------------------------+
| [Brand]     Product      Solutions    Resources    Legal      |
| Description Features     SaaS         Docs         Privacy    |
| [Status]    Pricing      Security     API          Terms      |
|-------------------------------------------------------|
| (c) 2026 Brand Name. All rights reserved.    [gh] [tw] [dc]   |
+-------------------------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Columns collapse into vertical stack with full-width link items.
- **Tablet (640px–1023px) Responsive Rule**: Balanced 4-column responsive grid with brand header.

#### 7.3.4 Marketing Landing (`landing`)
- **Configured Archetype**: `hero-split`
- **Description**: Split hero with product mockup card on right, customer trust badges, and feature grid.
- **Structural Wireframe**:
```text
+-----------------------+-------------------------------+
| Headline & Pitch      | [ Interactive Product Mockup ]|
| [Get Started] [Demo]  | [ Verified Token Live Card   ]|
+-----------------------+-------------------------------+
| [Feature 1]       [Feature 2]       [Feature 3]       |
+-------------------------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Hero content stacks vertically with headline first, CTA second, mockup third.
- **Tablet (640px–1023px) Responsive Rule**: Mockup scales down proportionately; feature row wraps into 2-column grid.

#### 7.3.5 3-Card Tier (`pricing`)
- **Configured Archetype**: `cards-3col`
- **Description**: Side-by-side tier cards (Starter, Pro, Enterprise) with highlighted recommended plan.
- **Structural Wireframe**:
```text
+---------------+---------------+---------------+
| Starter Plan  | Pro (Popular) | Enterprise    |
| $19/mo        | $49/mo (Star) | Custom        |
| - 5 Members   | - Unlimited   | - Dedicated   |
| [Choose]      | [Start Trial] | [Contact]     |
+---------------+---------------+---------------+
```
- **Mobile (<640px) Responsive Rule**: Cards stack vertically with the Popular/Pro tier highlighted and displayed first or centered.
- **Tablet (640px–1023px) Responsive Rule**: 3 cards compress horizontally with compact margins or wrap into 2+1 layout.

#### 7.3.6 Centered Card (Default) (`auth`)
- **Configured Archetype**: `centered-card`
- **Description**: Single centered modal card with logo, credential inputs, primary button and account switch link.
- **Structural Wireframe**:
```text
+-----------------------------------+
|               [Logo]              |
|        +-----------------+        |
|        |   Sign In Card  |        |
|        | [Email        ] |        |
|        | [Password     ] |        |
|        | [  Sign In -> ] |        |
|        +-----------------+        |
+-----------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Card expands to 100% viewport width with margin flush to borders and sticky bottom action button.
- **Tablet (640px–1023px) Responsive Rule**: Centered floating card with 440px max-width on surface canvas with comfortable margins.

#### 7.3.7 Sidebar + Content (`dashboard`)
- **Configured Archetype**: `sidebar-grid`
- **Description**: Left sidebar navigation with stat KPI cards and telemetry charts.
- **Structural Wireframe**:
```text
+-------+-----------------------------------------------+
| Nav   | [KPI 1] [KPI 2] [KPI 3]                       |
| Links | [       Visual Chart Area         ]           |
|       | [ Recent Events Stream            ]           |
+-------+-----------------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Sidebar hidden into drawer; KPI cards stack single-column (or 2-up for mini stats).
- **Tablet (640px–1023px) Responsive Rule**: Sidebar collapses to compact icon rail; KPI grid shifts to 2 columns.

#### 7.3.8 Horizontal Tabs (`settings`)
- **Configured Archetype**: `tabbed`
- **Description**: Horizontal top tab bar switching between General & Profile, Notifications & Alerts, and Security & Access.
- **Structural Wireframe**:
```text
+-------------------------------------------------------+
| [General & Profile]   [Notifications & Alerts]   [Security & Access] |
|                                                       |
| Display Name: [Jane Doe                             ] |
| Email:        [user@example.com                     ] |
| [Save Changes]                                        |
+-------------------------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Tabs become horizontally scrollable strip with bottom border indicator.
- **Tablet (640px–1023px) Responsive Rule**: Full tab bar with comfortable spacing and inline form inputs.

#### 7.3.9 Billing & Invoices (`billing`)
- **Configured Archetype**: `default`
- **Description**: Subscription usage meters, payment card details, and downloadable PDF invoices.
- **Structural Wireframe**:
```text
+-------------------------------------------------------+
| Plan: Pro Tier ($49/mo)              [Upgrade Plan]   |
| Usage: 8,420 / 10,000 API calls      [████████░░] 84% |
+-------------------------------------------------------+
| Invoice ID     Date         Amount     Status  Action |
| INV-2026-001   Nov 01, 2026 $49.00     Paid    [PDF]  |
| INV-2026-002   Oct 01, 2026 $49.00     Paid    [PDF]  |
+-------------------------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Invoice table wraps inside horizontal scroll box; plan cards stack.
- **Tablet (640px–1023px) Responsive Rule**: Two-tier summary with plan card above responsive invoice table.

#### 7.3.10 Team Members & Permissions (`team`)
- **Configured Archetype**: `default`
- **Description**: Team member directory table with role badges, invite modal trigger, and permission toggles.
- **Structural Wireframe**:
```text
+-------------------------------------------------------+
| Team Directory (12 Members)           [+ Invite Member]|
| Filter: [All Roles ▼]                 [Search members]|
+-------------------------------------------------------+
| Member Name       Role       Access Level     Status  |
| Jane Doe          Admin      Full Control     Active  |
| Alex Smith        Editor     Write & Publish  Active  |
+-------------------------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Member cards stack vertically with role badges and action ellipsis menu.
- **Tablet (640px–1023px) Responsive Rule**: Compact table with role badges and inline action triggers.

#### 7.3.11 Contact & Sales Inquiry (`contact`)
- **Configured Archetype**: `default`
- **Description**: Multi-field conversion form with office details, map preview, and live support banner.
- **Structural Wireframe**:
```text
+-------------------------------+-----------------------+
| Inquire & Get in Touch        | Office & Global Hubs  |
| Full Name: [John Doe        ] | 100 Innovation Way    |
| Work Email: [user@example.com]| San Francisco, CA     |
| [Send Message ->]             | Support: 24/7 Live    |
+-------------------------------+-----------------------+
```
- **Mobile (<640px) Responsive Rule**: Office details collapse beneath the inquiry form in a single column.
- **Tablet (640px–1023px) Responsive Rule**: 50/50 balanced split between inquiry form and contact info cards.

#### 7.3.12 Giant Hero (`error`)
- **Configured Archetype**: `giant-hero`
- **Description**: Bold status code typography with illustration, explanatory message, and navigation buttons.
- **Structural Wireframe**:
```text
+-------------------------------------------------------+
|                         404                           |
|                  Page Not Located                     |
|      The token or resource you requested has moved    |
|             [Return to Safety]  [View Docs]           |
+-------------------------------------------------------+
```
- **Mobile (<640px) Responsive Rule**: Giant status code font clamps gracefully; action buttons stack full width.
- **Tablet (640px–1023px) Responsive Rule**: Hero text centered with generous padding and inline buttons.


---

## 8. Responsive Breakpoints & Execution Rules
- **Mobile (<640px)**:
  - Strict single-column vertical flow with full-width container bounds.
  - Interactive targets must have at least `44px` minimum tap target dimension. Controls smaller than 44px (e.g. 32px or 36px icon buttons, checkboxes, chips) must provide a 44px minimum touch hit area on viewports <640px (using transparent padding, negative margin offsets, or `min-h-[44px] min-w-[44px] flex items-center justify-center`).
  - Fixed-width sidebars or columns must collapse off-screen into drawer sheets or bottom navigation bars.
  - Data tables must be wrapped inside an `overflow-x: auto` scrolling box.
- **Tablet (640px to 1023px)**:
  - 2-column balanced grid layouts with `--spacing-md` layout gutters.
  - Sidebars may render as 60px–64px compact icon rails or 220px slim menus.
- **Desktop (>=1024px)**:
  - Full-fidelity multi-column workspaces, master-detail split views, and inspector panels.
  - Max-width content boundary capped at `1280px` with `--spacing-xl` margins.
- **Theme & Dark Mode**:
  - Implement dark mode toggle via `data-theme="dark"` on `<html>` or `<body>`.
  - Default to user system preference via `@media (prefers-color-scheme: dark)`.
  - Ensure zero flash of unstyled content (FOUC) on page load via inline theme script.
- **Accessibility & Motion**:
  - Provide a keyboard-accessible skip link (`<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to main content</a>`) as the first focusable element.
  - Respect `@media (prefers-reduced-motion: reduce)` by disabling all animations or reducing transition durations to `<= 0.01ms`.
  - Modal dialogs and off-canvas drawers must implement a focus trap, have `aria-modal="true"`, dismiss on `Escape` key, and return focus to the trigger element on close.
  - Use proper ARIA landmarks and roles: `role="navigation"` on sidebar/header, `role="tablist"` / `role="tab"` / `aria-selected` on tabs, and `role="dialog"` on modals.

---

## 9. Do / Don't & Acceptance Checklist

### 9.1 Development Rules
- [ ] **DO** verify that all colors, font sizes, paddings, and borders reference tokens from `tokens.css`.
- [ ] **DO** ensure high-contrast accessible text colors on colored backgrounds using `--color-on-*`.
- [ ] **DO** enforce visible focus rings (`outline: 2px solid var(--color-ring)`) on all interactive controls.
- [ ] **DO** ensure controls smaller than 44px receive at least a 44px minimum hit area on Mobile (<640px).
- [ ] **DON'T** hardcode raw hex values (e.g. `#0284c7`) or arbitrary pixel values outside `tokens.css`.
- [ ] **DON'T** use undeclared font weights; stick to the verified weights loaded from Google Fonts.
- [ ] **DON'T** allow horizontal page scrollbars on Mobile (375px) or Tablet (768px).

### 9.2 Acceptance Sign-Off Checklist
Before marking frontend implementation complete, run and verify these checks:
- [ ] 1. **Token Verification**: All colors, radii, shadows, and fonts bind strictly to `tokens.css` variables with no ad-hoc hex values or hardcoded font sizes.
  - Run verification command:
    ```bash
    grep -rnE "#[0-9a-fA-F]{3,8}\b" src --include=*.{ts,tsx,css} --exclude=tokens.css
    ```
    *(Expected: 0 matches outside `tokens.css`)*
- [ ] 2. **Responsive Integrity**: Zero horizontal overflow from 375px mobile through 1440px desktop; 2-column form fields use `minmax(0, 1fr)`.
  - Run browser/Playwright verification at 375, 768, and 1280 viewports:
    ```javascript
    document.documentElement.scrollWidth <= window.innerWidth
    ```
    *(Expected: `true` at 375px, 768px, and 1280px widths)*
- [ ] 3. **Theme & Contrast**: Dark/light mode toggle functions without flash; all text meets WCAG AA contrast (4.5:1 body, 3:1 large text/UI components).
- [ ] 4. **Accessibility & Motion**: Skip link present; modals trap focus and dismiss on Esc; `prefers-reduced-motion` suppresses transitions; interactive controls have visible focus rings; touch targets on mobile (<640px) achieve 44px minimum hit area.
- [ ] 5. **Layout & Scope Adherence**: Every page declared in the sitemap that exists in the project is restyled; missing feature pages were NOT created; missing system pages were added as visual shells and reported. Wireframe structural zones match prescribed archetype without invented sections.
- [ ] 6. **Zero Logic Regression**: Application routes, data fetching, form handlers, state, and test IDs remain intact; test suite passes without regressions.

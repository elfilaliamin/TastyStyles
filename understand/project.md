# TastyStyles — Comprehensive AI Agent Architectural Knowledge Base

> **Target Audience**: Autonomous AI Coding Agents & Systems Architects  
> **Repository Root**: `c:\Users\PC\Desktop\TastyStyles`  
> **Scope**: Full system breakdown, file-by-file dependencies, data flow lifecycles, invariant contracts, and token architectures.

---

## 1. System Mission & Operational Model

TastyStyles is a deterministic design token workbench, responsive multi-page preview engine, and agent design specification generator.

### Primary Operational Objectives:
1. **Interactive Token Synthesis**: Allows real-time editing of 8 design system dimensions: colors (light/dark modes), typography (headings, body, base sizes, scale ratios), surface elevation (shadows), corner geometry (radii), spacing scales, layout archetypes, icon systems, and goal focus sectors.
2. **Deterministic Token Resolution**: Compiles raw user inputs into canonical design tokens with strict type-safety, WCAG 2.1 AA and APCA $L_c$ accessibility checks, and zero drift across deliverables.
3. **Live Sandbox Preview**: Injects runtime CSS variables (`--ts-*`) into 26 full-page archetypes, interactive component primitives, and responsive viewport shells (`375px`, `768px`, `100%`).
4. **Artifact Compilation for Coding Agents**: Generates a standardized, 10-section `DESIGN.md` specification along with production-ready `tailwind.config.js`, `tokens.css`, `tokens.ts`, `tokens.json` (W3C DTCG), and an in-memory downloadable ZIP package.

---

## 2. Global Architecture & Data Flow Lifecycle

```
[User Interaction / Preset Selection / Goal Focus]
                     │
                     ▼
           [ControlsPanel Component]
                     │
         (Dispatches DesignAction)
                     ▼
          [designReducer.ts (Pure)]
                     │
     (Validates against DesignStateSchema)
                     ▼
          [DesignContext State Tree]
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
 [lib/tokenModel.ts]       [lib/contrast.ts]
        │                         │
 (resolveTokens & CSS)    (WCAG & APCA Score)
        │                         │
        ├─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
[Preview Sandbox]        [Header / Badges]        [Export Pipeline]
(--ts-* CSS Variables)   (ContrastBadge UI)       (lib/exportUtils.ts)
  ├─ 26 Full Pages                                 ├─ tailwind.config.js
  ├─ Primitives                                    ├─ tokens.css
  ├─ Composite Blocks                              ├─ tokens.ts
  └─ Wireframe Shells                              ├─ tokens.json (DTCG)
                                                   ├─ in-memory ZIP Blob
                                                   └─ compileMarkdown.ts -> DESIGN.md
```

### Lifecycle Invariants:
1. **Zero-Drift Contract**: Canonical token values declared in `tokens.css` must strictly match the CSS block embedded inside `DESIGN.md`, tested automatically by `scripts/verify.ts`.
2. **Dual-Radius Isolation Contract**:
   - Control primitives (buttons, chips, badge pills, circular avatars) consume `--ts-radius` (`tokens.radius`).
   - Surfaces (cards, dialogs, drawers, panels, textareas, and code blocks) strictly consume `--ts-radius-surface` (dynamically clamped to a maximum of `20px` to prevent pill/capsule deformation).
3. **No Unstyled Resets in Grid Tracks**: Form grids must explicitly declare `minmax(0, 1fr)` tracks and inputs must enforce `width: 100%; box-sizing: border-box; min-width: 0;` to prevent intrinsic input sizes from overflowing card boundaries.

---

## 3. Directory Blueprint & Module Roles

```
c:\Users\PC\Desktop\TastyStyles\
├── index.html                   # Root HTML entry template
├── package.json                 # Dependency graph & verification scripts
├── vite.config.ts               # Vite bundler configuration
├── tsconfig.json                # TypeScript project configuration
├── tailwind.config.js           # Tailwind configuration for editor shell
├── postcss.config.js            # PostCSS pipeline
├── scripts/
│   └── verify.ts                # Zero-drift parity & schema test runner
├── understand/
│   ├── overview.md              # High-level architecture & Mermaid diagram
│   └── project.md               # This authoritative agent knowledge base
└── src/
    ├── main.tsx                 # React application bootstrapper
    ├── App.tsx                  # Top-level workspace coordinator
    ├── App.css / index.css      # Base styling and font imports
    ├── types/                   # TypeScript interface definitions
    ├── config/                  # Static registries, schemas, presets & catalogs
    ├── context/                 # State management & React context providers
    ├── lib/                     # Pure functional token engine & exporters
    └── components/              # UI components
        ├── common/              # Universal editor building blocks
        ├── controls/            # Left-hand token customization sidebar
        ├── layout/              # Shell chrome (Header, ExportBar, Badges)
        ├── markdown/            # Live specification viewers
        ├── blocks/              # Shared high-fidelity composite preview blocks
        └── preview/             # Live sandboxed preview canvas
            ├── components/      # UI primitive showcases
            ├── navigation/      # Dynamic headers & sidebars
            ├── pages/           # 26 Domain-specific full-page archetypes
            └── wireframes/      # Structural layout benchmarks
```

---

## 4. File-by-File Technical Directory

### 4.1 Entry Points & Build Pipeline
| File Path | Purpose | Key Exports / Behaviors | Connected Files |
| :--- | :--- | :--- | :--- |
| `index.html` | Application HTML host. | Mounts `#root` container, sets viewport metadata. | Loads `src/main.tsx`. |
| `src/main.tsx` | React 19 application bootstrapper. | Renders `<App />` into DOM wrapped in `React.StrictMode`. | Imports `src/App.tsx`, `src/index.css`. |
| `src/App.tsx` | Main workspace layout controller. | Coordinates `Header`, `ControlsPanel`, `PreviewPane`, `ExportBar`, and `MarkdownModal`. | Wraps children in `DesignProvider` & `EditorThemeProvider`. |
| `scripts/verify.ts` | CI/CD Zero-Drift & Regression gate. | Validates all 6 JSON registries with Zod, checks WCAG/APCA contrast, verifies all 12 presets for zero drift. | Imports `schema.ts`, `compileMarkdown.ts`, `exportUtils.ts`, `tokenModel.ts`. |

---

### 4.2 Configuration, Schemas & Registries (`src/config/`)
| File Path | Purpose | Key Exports / Behaviors | Connected Files |
| :--- | :--- | :--- | :--- |
| `src/config/schema.ts` | Single source of type-safety & Zod contracts. | Exports `DesignStateSchema`, `DesignState`, `ColorModeSchema`, `TypographySchema`, `PresetEntrySchema`, `RegistriesSchema`. | Consumed by `DesignContext`, `verify.ts`, `designReducer.ts`. |
| `src/config/presets.json` | 12 Canonical industry-inspired presets. | Defines complete token states for: `zinc-minimal`, `cyber-neon`, `editorial-luxury`, `sunset-amber`, `nordic-forest`, `stripe-indigo`, `linear-obsidian`, `airbnb-coral`, `vercel-stark`, `supabase-emerald`, `notion-ivory`, `spotify-pulse`. | Loaded by `registry.ts`, verified by `verify.ts`. |
| `src/config/previews.ts` | Goal-to-Archetype mapping system. | Exports `GOAL_SECTORS`, `PREVIEWS`, `getGoalPreviewGroups()`, maps goals to recommended pages and component primitives. | Consumed by `GoalSelector.tsx`, `PreviewPane.tsx`. |
| `src/config/mediaCatalog.ts` | Curated CDN photography catalog. | Provides categorized high-res Unsplash CDN photos (e-commerce, portfolio, streaming, editorial, avatars) with fallback colors. | Consumed by all commerce, content, and public preview pages. |
| `src/config/layoutCatalog.ts` | Archetype layout metadata. | Maps layout IDs (`hero-centered`, `split-screen`, `bento-grid`, etc.) to preview pages with UX descriptions. | Consumed by `LayoutSection.tsx`. |
| `src/config/recipes.ts` | Standardized component recipes. | Defines token requirements and CSS specifications for standard UI patterns (buttons, inputs, cards, dialogs, badges). | Consumed by `compileMarkdown.ts`. |
| `src/config/fonts.json` | Google Fonts registry. | Defines font families, categories (sans, serif, mono, display), and supported font weights. | Consumed by `registry.ts`, `TypographySection.tsx`. |
| `src/config/radius.json` | Border radius token registry. | Defines `sharp` (0px), `rounded-sm` (4px), `rounded` (8px), `rounded-lg` (16px), and `pill` (24px). | Consumed by `registry.ts`, `ComponentSection.tsx`. |
| `src/config/shadows.json` | Box shadow token registry. | Defines `none`, `subtle`, `soft`, `layered`, `glow`, and `float`. | Consumed by `registry.ts`, `ComponentSection.tsx`. |
| `src/config/spacing.json` | Spacing scale definitions. | Defines `compact`, `comfortable`, and `spacious` scale multipliers. | Consumed by `registry.ts`, `ComponentSection.tsx`. |
| `src/config/layouts.json` | Structural layout wireframe definitions. | Lists base layout wireframe keys (`sidebar-content`, `bento-grid`, `landing`, `dashboard-split`). | Consumed by `registry.ts`, `LayoutWireframe.tsx`. |

---

### 4.3 State Management & Context (`src/context/`)
| File Path | Purpose | Key Exports / Behaviors | Connected Files |
| :--- | :--- | :--- | :--- |
| `src/context/DesignContext.tsx` | React Context for the design system. | Exports `DesignProvider`, `useDesign()`, computes active colors, light/dark modes, and derived token states. | Consumed by all preview pages, controls, and layout chrome. |
| `src/context/designReducer.ts` | Deterministic state transitions. | Exports `designReducer`, `defaultInitialState`, handles actions (`SET_COLOR`, `SET_TYPOGRAPHY`, `LOAD_PRESET`, `SET_RADIUS`, etc.). | Internal to `DesignContext.tsx`. |
| `src/context/EditorThemeContext.tsx` | Editor UI theme controller. | Manages the theme of the editor workspace itself (light vs. dark) separate from preview state. | Consumed by `App.tsx`, `Header.tsx`. |

---

### 4.4 Deterministic Core Logic & Exporters (`src/lib/`)
| File Path | Purpose | Key Exports / Behaviors | Connected Files |
| :--- | :--- | :--- | :--- |
| `src/lib/tokenModel.ts` | Master Token Compiler & Variable Generator. | Exports `resolveTokens()`, `generateUnifiedCssTokens()`, `getPreviewCssVariables()`, computes type scales, dynamically clamps `--radius-surface` to `20px`. | Consumed by `DesignContext`, `PreviewPane`, `exportUtils`, `verify.ts`. |
| `src/lib/contrast.ts` | Real-time accessibility calculation engine. | Exports `calculateContrastRatio()` (WCAG 2.1 AA/AAA), `calculateAPCA()` (Advanced Perceptual Contrast Algorithm $L_c$), `getBestContrastingColor()`, `checkColorHarmony()`. | Consumed by `tokenModel.ts`, `ContrastBadge.tsx`, `MockCard.tsx`. |
| `src/lib/compileMarkdown.ts` | Full specification generator. | Compiles `DesignState` into an exhaustive 10-section `DESIGN.md` spec optimized for consumption by AI coding agents. | Consumed by `MarkdownPane.tsx`, `MarkdownModal.tsx`, `ExportBar.tsx`, `verify.ts`. |
| `src/lib/exportUtils.ts` | Multi-format code & archive packager. | Exports `generateCssTokens()`, `generateTailwindConfig()`, `generateTypeScriptTokens()`, `generateDtcgTokens()`, `createZipBlob()`. Generates in-memory ZIP package without external dependencies. | Consumed by `ExportBar.tsx`, `verify.ts`. |
| `src/lib/registry.ts` | Registry lookup helpers. | Provides type-safe getters: `getFontEntry()`, `getRadiusEntry()`, `getShadowEntry()`, `getSpacingEntry()`, `getLayoutEntry()`. | Consumed by `tokenModel.ts`, `ControlsPanel.tsx`. |
| `src/lib/fonts.ts` | Google Fonts runtime loader. | Injects dynamically configured Google Font `<link>` stylesheet tags into the document head. | Consumed by `DesignContext.tsx`. |

---

### 4.5 Controls Panel (`src/components/controls/`)
| File Path | Purpose | Key Elements | Connected Files |
| :--- | :--- | :--- | :--- |
| `ControlsPanel.tsx` | Left-hand accordion drawer coordinator. | Houses `GoalSelector`, `PresetSection`, `ColorSection`, `TypographySection`, `LayoutSection`, `ComponentSection`, `IconSection`. | Mounted in `App.tsx`. |
| `GoalSelector.tsx` | Industry sector target selector. | Dropdown allowing user to select goal (B2B SaaS, E-Commerce, Portfolio, etc.), automatically filtering relevant pages in `PreviewPane`. | Dispatches to `DesignContext`. |
| `PresetSection.tsx` | 1-click iconic design system picker. | Visual grid displaying 12 curated website presets with color swatches and typography badges. | Triggers `LOAD_PRESET` action. |
| `ColorSection.tsx` | Dual-mode palette manager. | Primary, secondary, accent, surface, background, border, and text hex inputs with color pickers and live contrast badges. | Dispatches `SET_COLOR` actions. |
| `TypographySection.tsx` | Typography scale editor. | Font family selectors, base size slider (12–20px), scale ratio presets (Minor Second to Golden Ratio), visual scale preview. | Dispatches `SET_TYPOGRAPHY`. |
| `LayoutSection.tsx` | Page archetype layout picker. | Lets users toggle between 3+ distinct UX layouts per page archetype (e.g. Hero-Centered vs. Split-Screen). | Dispatches `SET_LAYOUT`. |
| `ComponentSection.tsx` | Geometry & elevation controls. | Controls border radius scale (`sharp` to `pill`), box shadow elevation, and spacing scale multiplier. | Dispatches `SET_RADIUS`, `SET_SHADOW`, `SET_SPACING`. |
| `IconSection.tsx` | Multi-library icon system manager. | Toggles icon library (`lucide`, `tabler`, `phosphor`), style (`outline`, `solid`, `duotone`), and stroke weights. | Dispatches `SET_ICONS`. |

---

### 4.6 Preview Engine & Sandbox (`src/components/preview/`)
| File Path | Purpose | Key Elements | Connected Files |
| :--- | :--- | :--- | :--- |
| `PreviewPane.tsx` | Live rendering sandbox container. | Injects `--ts-*` variables into container style, manages Goal Focus filter, renders two-tier dropdown (`Pages` vs. `Primitives`). | Mounted in `App.tsx`. |
| `ViewportSwitcher.tsx` | Responsive device frame simulator. | Switches viewport widths between Mobile (`375px`), Tablet (`768px`), and Desktop (`100%`). | Mounted in preview toolbar. |
| `LayoutWireframe.tsx` | Structural fallback & layout visualizer. | Renders wireframe archetypes (`sidebar-content`, `bento-grid`, `landing`, `dashboard-split`). | Mounted when viewing wireframe modes. |
| `MockCard.tsx` | Interactive single-card token inspector. | Compact card showcasing primary button, secondary button, input field, and contrast verification badge. | Embedded in preview canvas. |
| `navigation/DynamicNavbar.tsx` | Context-aware navigation bar. | Adapts header navigation layout dynamically based on current page goal (SaaS, eCommerce, Media, etc.). | Rendered in full-page archetypes. |
| `navigation/DynamicSidebar.tsx` | Context-aware application sidebar. | Multi-tier navigation sidebar with collapsible workspaces, badges, and user account status. | Rendered in dashboard and core archetypes. |

---

### 4.7 Shared Composite Blocks (`src/components/blocks/`)
| File Path | Purpose | Key Features | Used By Pages |
| :--- | :--- | :--- | :--- |
| `CalendarAvailabilityBlock.tsx` | Booking & scheduling widget. | Month view calendar, date picker, available time slot pills, and timezone selector. | `BookingPage.tsx` |
| `CheckoutInvoiceBlock.tsx` | E-commerce summary & invoice. | Order breakdown, coupon code input, fee computation, and payment method selector. | `CheckoutPage.tsx`, `BillingPage.tsx` |
| `DiscussionReviewBlock.tsx` | Forum & discussion feed. | Upvoting controls, nested comment threads, author badges, and reply inputs. | `CommunityForumPage.tsx`, `ProductDetailPage.tsx` |
| `FilterToolbarBlock.tsx` | Catalog filter & search bar. | Search input, sort dropdown, faceted tag chips, and view density switcher. | `ProductCatalogPage.tsx`, `MarketplacePage.tsx` |
| `IdentityBadgeBlock.tsx` | User profile card. | Avatar, verification badge, bio, social links, follower metrics, and action buttons. | `PortfolioPage.tsx`, `TeamMembersPage.tsx` |
| `MediaHeroBlock.tsx` | Visual hero banner. | High-res background image, contrast overlay gradient, title, and primary CTA. | `LandingPage.tsx`, `EditorialPage.tsx` |
| `ProgressMeterBlock.tsx` | Telemetry & campaign progress bar. | Tier progress indicator, percentage label, target metric, and milestones. | `CharityPage.tsx`, `DashboardPage.tsx` |

---

### 4.8 Full-Page Preview Archetypes (`src/components/preview/pages/`)
TastyStyles provides 26 full-page archetypes organized into 6 domains:

#### Public Domain (`pages/public/`)
- `LandingPage.tsx`: Hero-split, hero-centered, and bento-grid layouts with value props, live metric cards, and feature matrices.
- `PricingPage.tsx`: 3-tier pricing cards, comparison feature matrix table, and monthly/annual billing toggles.
- `ContactPage.tsx`: Support inquiry form with protected two-column grid inputs and multi-channel sidebar cards.
- `BlogArticlePage.tsx`: Long-form editorial typography article with pull-quotes, inline code snippets, and author bio.

#### Auth Domain (`pages/auth/`)
- `AuthPage.tsx`: Sign-in, sign-up, password reset, and magic link states with OAuth provider buttons and testimonial panels.
- `OnboardingPage.tsx`: Multi-step setup wizard with team role selection, workspace naming, and checklist progress indicators.

#### Core Domain (`pages/core/`)
- `DashboardPage.tsx`: Operational telemetry dashboard with 4 KPI cards, throughput charts, health checks, and active cluster tables.
- `KanbanPage.tsx`: Project task board with draggable columns, priority tags, milestone timelines, and assignee avatars.
- `ChatInboxPage.tsx`: Real-time messaging split view with channel list, chat message bubbles, and thread drawer.
- `ItemDetailPage.tsx`: Deep resource inspector with hardware telemetry specs, live logs terminal, and network status.

#### Commerce Domain (`pages/commerce/`)
- `ProductCatalogPage.tsx`: E-commerce catalog with facet filters, price range sliders, sorting, and responsive product cards.
- `ProductDetailPage.tsx`: Multi-image thumbnail gallery, size/color selectors, inventory counter, and customer reviews.
- `CheckoutPage.tsx`: Multi-step checkout with address form, shipping selector, and live order summary invoice.
- `MarketplacePage.tsx`: Two-sided marketplace directory with listing cards, seller ratings, and modal booking sheets.
- `BookingPage.tsx`: Appointment booking engine with interactive calendar date grid and morning/afternoon time slot pills.

#### Content Domain (`pages/content/`)
- `PortfolioPage.tsx`: Interactive case study showcase, client quote tiles, and interactive project engagement cost calculator.
- `EditorialPage.tsx`: Magazine editorial with high-contrast typography, cover photography, and pull quotes.
- `StreamingPage.tsx`: Media streaming dashboard with 16:9 player surface, episode playlist, and season selector.
- `CharityPage.tsx`: Non-profit campaign with live thermometer donation meter, preset donation amounts, and field photos.
- `CommunityForumPage.tsx`: Q&A forum with pinned announcements, vote counts, reply counters, and tag badges.

#### Account & System Domain (`pages/account/` & `pages/system/`)
- `SettingsPage.tsx`: Profile identity, notifications preferences, and API security token panels.
- `BillingPage.tsx`: Subscription plan cards, usage quotas, payment methods, and invoice history tables.
- `TeamMembersPage.tsx`: Organization directory with role permissions, invite member modal, and member cards.
- `ErrorPage.tsx`: 404, 500, and network offline error states with stack trace viewer and recovery actions.
- `EmptyStatePage.tsx`: Clean empty state illustration cards with primary and secondary call-to-action triggers.
- `SuccessConfirmPage.tsx`: Order completion and confirmation cards with order numbers, receipt breakdowns, and next steps.

---

### 4.9 Wizard Shell, Markdown & Common Primitives
| File Path | Purpose | Key Responsibilities |
| :--- | :--- | :--- |
| `src/components/controls/PurposePicker.tsx` | Startup purpose selection panel. | Interactive cards for E-Commerce, SaaS, Portfolio, Marketplace, and Media purposes that unlock Advanced controls on selection. |
| `src/components/controls/ControlsPanel.tsx` | Advanced token and system controls. | Direct controls for system name, project purpose, presets, colors, typography, icon systems, layouts, and component radii/shadows. |
| `src/lib/compileProjectBrief.ts` | Complete project brief compiler. | Generates `PROJECT-BRIEF.md` containing Part A (Site Blueprint & Sitemap) and Part B (Design Tokens). |
| `src/lib/layoutRegistry.ts` | Plugin layout and section registry. | Auto-discovers and validates layout manifests from `src/layouts/` and sections from `src/sections/`. |
| `src/components/layout/Header.tsx` | Top workspace navigation bar. | Shows system title, preset badge, contrast ratio pill, theme toggle, and JSON import/export triggers. |
| `src/components/layout/ContrastBadge.tsx` | Live accessibility indicator. | Displays WCAG ratio (e.g. `12.4:1 AA`) and APCA $L_c$ rating; changes color dynamically on contrast failures. |
| `src/components/layout/ExportBar.tsx` | Bottom export toolbar. | 1-click copy for Markdown, copy for AI prompt, and "Download Spec Bundle (.zip)" trigger. |
| `src/components/markdown/MarkdownPane.tsx` | Live markdown preview panel. | Side-by-side or bottom split pane rendering the compiled `PROJECT-BRIEF.md` with syntax highlighting. |
| `src/components/markdown/MarkdownModal.tsx` | Fullscreen specification modal. | Fullscreen dialog for inspecting the compiled design guidelines and copying system instructions. |
| `src/components/common/AppIcon.tsx` | Universal icon abstraction. | Dynamically maps icon names to Lucide, Tabler, Phosphor, Heroicons, or Remixicon based on icon state. |
| `src/components/common/Accordion.tsx` | Collapsible section container. | Accessible disclosure widget used throughout `ControlsPanel`. |
| `src/components/common/SegmentedControl.tsx` | Pill tab switcher. | Accessible animated segmented tab strip for mode, viewport, and category switches. |
| `src/components/common/Toast.tsx` | Notification banner. | Transient feedback alert for export actions, copy-to-clipboard events, and preset loads. |
| `src/components/common/ErrorFallback.tsx` | React error boundary UI. | Catches preview rendering exceptions and displays human-readable stack traces with a reset button. |

---

## 5. CSS Custom Properties Reference

### Preview Sandbox Variables (`--ts-*`)
These variables are computed dynamically by `getPreviewCssVariables(state)` in `tokenModel.ts` and injected into the `.preview-sandbox` DOM container:

```css
/* Color Palette */
--ts-color-primary: #...;
--ts-color-secondary: #...;
--ts-color-accent: #...;
--ts-color-background: #...;
--ts-color-surface: #...;
--ts-color-text: #...;
--ts-color-border: #...;
--ts-color-success: #10b981;
--ts-color-warning: #f59e0b;
--ts-color-danger: #ef4444;
--ts-color-info: #0284c7;
--ts-color-on-primary: #...;
--ts-color-on-secondary: #...;
--ts-color-on-accent: #...;

/* Typography */
--ts-font-heading: 'Inter', sans-serif;
--ts-font-body: 'Inter', sans-serif;
--ts-base-size: 16px;
--ts-scale: 1.125;
--ts-text-display: 2.441rem;
--ts-text-section: 1.953rem;
--ts-text-subsection: 1.563rem;
--ts-text-card: 1.25rem;
--ts-text-body: 1rem;
--ts-text-caption: 0.8rem;

/* Geometry & Spacing */
--ts-radius: 24px;                  /* Controls, buttons, chips, tags */
--ts-radius-surface: 20px;          /* Clamped for cards, containers, dialogs */
--ts-shadow: 0 4px 12px rgba(...);  /* Elevation */
--ts-space-xs: 4px;
--ts-space-sm: 8px;
--ts-space-md: 16px;
--ts-space-lg: 24px;
--ts-space-xl: 32px;

/* Icon Geometry */
--ts-icon-stroke: 1.5px;
--ts-icon-fill-opacity: 0;
```

---

## 6. Verification, Testing & Quality Gates

TastyStyles employs a multi-tiered verification pipeline that must pass before any commit:

1. **Type Checking**:
   `npx tsc -b` validates strict TypeScript compilation across all 90 source files with zero errors.
2. **Linting**:
   `npm run lint` (`oxlint`) checks all source files for syntax bugs, invalid regexes, and unused imports in under 300ms.
3. **Registry & Zero-Drift Parity**:
   `npm test` (`tsx scripts/verify.ts`) automatically validates:
   - All 6 JSON registries conform to their Zod schemas.
   - Roundtrip JSON serialization of default design states.
   - High contrast (21:1) and low contrast (1.24:1) calculations against WCAG and APCA standards.
   - The existence of all 10 mandatory sections in generated `DESIGN.md`.
   - Export utilities generate valid CSS custom properties, Tailwind config objects, TypeScript code, and W3C DTCG tokens.
   - In-memory ZIP package creation without native C++ dependencies.
   - Zero-drift parity across all 12 presets: the CSS block inside `DESIGN.md` strictly matches `tokens.css`.
4. **Production Build**:
   `npm run build` runs `tsc -b && vite build` ensuring production assets are bundled and tree-shaken cleanly.

---

## 7. Guidelines for AI Agents Modifying This Codebase

When tasked with implementing features, adding presets, or modifying previews in TastyStyles, follow these strict rules:

1. **Preserve the Zero-Drift Parity**:
   Never add an ad-hoc token variable to `compileMarkdown.ts` without also adding it to `tokenModel.ts` and updating `scripts/verify.ts`.
2. **Respect the Surface vs. Control Radius Boundary**:
   - For `<button>`, small icon tags, chips, or circular badges: use `var(--ts-radius)`.
   - For cards, containers, dialogs, modals, textareas, and code blocks: **ALWAYS** use `var(--ts-radius-surface, 16px)`. Never use `var(--ts-radius)` directly on a multi-line container.
3. **Prevent Input Overflows in Grids**:
   Whenever adding side-by-side inputs in a grid, always specify `gridTemplateColumns: 'repeat(..., minmax(0, 1fr))'` and ensure inputs carry `width: '100%'`, `boxSizing: 'border-box'`, and `minWidth: 0`.
4. **Keep Media Copyright-Safe**:
   When previews require imagery, source exclusively from [`src/config/mediaCatalog.ts`](file:///c:/Users/PC/Desktop/TastyStyles/src/config/mediaCatalog.ts) (which uses curated, high-performance, copyright-safe Unsplash CDN URLs with aspect-ratio containment and lazy loading).
5. **Execute Quality Checks**:
   Always run `npx tsc -b`, `npm run lint`, and `npm test` before concluding your turn.


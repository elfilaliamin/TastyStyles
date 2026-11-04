export interface LayoutCatalogItem {
  page: string;
  id: string;
  title: string;
  description: string;
  variant: string;
  ascii: string;
  mobile: string;
  tablet: string;
}

export const LAYOUT_CATALOG: Record<string, LayoutCatalogItem[]> = {
  auth: [
    {
      page: 'auth',
      id: 'centered-card',
      title: 'Centered Card (Default)',
      description: 'Single centered modal card with logo, credential inputs, primary button and account switch link.',
      variant: 'centered-card',
      ascii: `+-----------------------------------+
|               [Logo]              |
|        +-----------------+        |
|        |   Sign In Card  |        |
|        | [Email        ] |        |
|        | [Password     ] |        |
|        | [  Sign In -> ] |        |
|        +-----------------+        |
+-----------------------------------+`,
      mobile: 'Card expands to 100% viewport width with margin flush to borders and sticky bottom action button.',
      tablet: 'Centered floating card with 440px max-width on surface canvas with comfortable margins.',
    },
    {
      page: 'auth',
      id: 'split',
      title: 'Split Showcase',
      description: 'Brand marketing graphic and testimonial on the left half; credentials form on the right half.',
      variant: 'split',
      ascii: `+-----------------+-----------------+
|  Brand & Vision |  Sign In Form   |
|  "Automate..."  |  [Email       ] |
|                 |  [Password    ] |
|  [Testimonial ] |  [ Continue ->] |
+-----------------+-----------------+`,
      mobile: 'Left brand showcase collapses completely; form occupies 100% full-width view.',
      tablet: 'Side-by-side 50/50 split remains with compacted padding and simplified testimonial card.',
    },
    {
      page: 'auth',
      id: 'split-image',
      title: 'Split Screen 2 (Image)',
      description: 'Editorial workspace photograph with glass quote badge on left; authentication card on right.',
      variant: 'split-image',
      ascii: `+=================+-----------------+
| [Photography    |  Sign In Card   |
|  Workspace]     |  [Email       ] |
|  +------------+ |  [Password    ] |
|  | Glass Card | |  [ Submit ->  ] |
+=================+-----------------+`,
      mobile: 'Photography half is hidden; auth card takes primary focus on clean surface canvas.',
      tablet: 'Photography column shrinks to 40% width with subtle gradient overlay; form takes 60%.',
    },
    {
      page: 'auth',
      id: 'social-first',
      title: 'Social-Login-First',
      description: 'High-prominence Google, Apple & GitHub OAuth buttons placed above secondary email divider.',
      variant: 'social-first',
      ascii: `+-----------------------------------+
|        +-----------------+        |
|        | [G Continue]    |        |
|        | [Apple] [GitHub]|        |
|        | --- OR EMAIL ---|        |
|        | [Email        ] |        |
|        +-----------------+        |
+-----------------------------------+`,
      mobile: 'Social login buttons stack vertically or stay in high-accessibility full-width touch targets.',
      tablet: 'Centered card layout with 440px max-width and quick 1-tap OAuth providers.',
    },
    {
      page: 'auth',
      id: 'full-background',
      title: 'Full-Page Floating',
      description: 'Vibrant ambient gradient mesh filling the canvas with an elevated frosted-glass floating card.',
      variant: 'full-background',
      ascii: `+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
| ~ Ambient Gradient Mesh ~         |
|        +-----------------+        |
|        | [Glass Surface] |        |
|        | [Credentials  ] |        |
|        +-----------------+        |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+`,
      mobile: 'Background gradient remains subtle with blurred backdrop under an edge-to-edge frosted card.',
      tablet: 'Floating glass card with 20px blur backdrop and 460px max-width.',
    },
    {
      page: 'auth',
      id: 'full-background-image',
      title: 'Full-Page Floating 2 (Image)',
      description: 'Full-bleed atmospheric photography under dark scrim with centered glass credentials dialog.',
      variant: 'full-background-image',
      ascii: `+===================================+
| [Full Bleed Dark Photographic BG] |
|        +-----------------+        |
|        | [Frosted Dialog]|        |
|        | [Email / Pass ] |        |
|        +-----------------+        |
+===================================+`,
      mobile: 'Background photo dims with 80% opacity dark scrim for optimal input legibility.',
      tablet: 'Centered floating dialog with elevated box-shadow and crisp contrasting inputs.',
    },
    {
      page: 'auth',
      id: 'single-field',
      title: 'Minimal Multi-Step',
      description: 'Progressive disclosure (Google/Notion style): single input per step with progress indicators.',
      variant: 'single-field',
      ascii: `+-----------------------------------+
|         Step 1 of 2  (o) ( )      |
|                                   |
|         Enter your email:         |
|         [user@company.com]        |
|         [ Continue ->    ]        |
+-----------------------------------+`,
      mobile: 'Focus auto-centers on active field with keypad-friendly layout and instant validation.',
      tablet: 'Clean minimal card with smooth animated step transitions and breadcrumb indicators.',
    },
    {
      page: 'auth',
      id: 'modal-overlay',
      title: 'Modal Overlay',
      description: 'In-app dialog overlay over dimmed operational dashboard with close button.',
      variant: 'modal-overlay',
      ascii: `+-----------------------------------+
| [Dimmed Host Dashboard View]      |
|        +-------------------+      |
|        | Sign In       [X] |      |
|        | [Credentials    ] |      |
|        +-------------------+      |
+-----------------------------------+`,
      mobile: 'Converts from floating dialog to bottom sliding drawer sheet with handle bar.',
      tablet: 'Centered dialog modal with backdrop blur and escape/click-outside dismiss actions.',
    },
    {
      page: 'auth',
      id: 'minimal',
      title: 'Minimal Clean',
      description: 'Stripped-back editorial auth layout with pure typography and minimal distraction.',
      variant: 'minimal',
      ascii: `+-----------------------------------+
| [Brand Logo]                      |
| Sign In                           |
| [Email Input]                     |
| [Password Input]                  |
| [Sign In Button]                  |
+-----------------------------------+`,
      mobile: 'Full-width text inputs with flush horizontal padding and clear contrast labels.',
      tablet: 'Constrained 380px single-column editorial layout.',
    },
    {
      page: 'auth',
      id: 'glassmorphism',
      title: 'Glassmorphism Card',
      description: 'Translucent frosted glass card with saturated backdrop filter and specular border highlights.',
      variant: 'glassmorphism',
      ascii: `+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
|  * Ambient Light Spheres *        |
|       +-------------------+       |
|       |  Frosted Glass    |       |
|       |  [Credentials]    |       |
|       +-------------------+       |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+`,
      mobile: 'Glass blur drops to 12px for smooth 60fps mobile GPU rendering.',
      tablet: 'Centered frosted glass container with 24px backdrop blur and luminous border.',
    },
  ],

  navbar: [
    {
      page: 'navbar',
      id: 'saas-header',
      title: 'Modern SaaS Header',
      description: 'Full-width app header with brand breadcrumbs, command bar (Cmd+K), and user profile drawer.',
      variant: 'navbar-saas',
      ascii: `+-------------------------------------------------------+
| [TS] App / Project   [Search or Cmd+K]   (+) [Bell] [User]|
+-------------------------------------------------------+`,
      mobile: 'Search collapses to search icon button; breadcrumb shortens to current entity.',
      tablet: 'Compact search bar with breadcrumb trail and quick action buttons.',
    },
    {
      page: 'navbar',
      id: 'minimal-center',
      title: 'Minimalist Clean',
      description: 'Centered navigation links with brand logo on left and primary CTA button on right.',
      variant: 'navbar-center',
      ascii: `+-------------------------------------------------------+
| [Logo]            Features  Pricing  Docs        [Sign In]|
+-------------------------------------------------------+`,
      mobile: 'Center links collapse into animated hamburger drawer navigation menu.',
      tablet: 'Links condense with smaller padding and primary action button remains visible.',
    },
    {
      page: 'navbar',
      id: 'floating-pill',
      title: 'Floating Island Pill',
      description: 'Detached pill navigation bar with frosted-glass backdrop blur and shadow elevation.',
      variant: 'navbar-floating',
      ascii: `   +-------------------------------------------------+
   | [Logo]   Product   Enterprise   Resources  [Get Started]|
   +-------------------------------------------------+`,
      mobile: 'Pill expands to edge-to-edge flush bar with sticky top behavior.',
      tablet: 'Floating pill remains centered with 92% width and soft backdrop blur.',
    },
    {
      page: 'navbar',
      id: 'tabbed-nav',
      title: 'Tabbed Subnav Header',
      description: 'Two-tier header combining top global workspace controls with secondary tabbed navigation.',
      variant: 'navbar-tabbed',
      ascii: `+-------------------------------------------------------+
| [Logo] Workspace Switcher               [Notifications] [User]|
+-------------------------------------------------------+
| Overview   Analytics   Team   Settings   Billing              |
+-------------------------------------------------------+`,
      mobile: 'Subnav tabs become horizontally scrollable strip with active indicator pill.',
      tablet: 'Full two-tier header remains intact with responsive tab spacing.',
    },
    {
      page: 'navbar',
      id: 'ecommerce-action',
      title: 'Command & Actions Bar',
      description: 'Dense operational toolbar with search, metrics & quick tools.',
      variant: 'navbar-command',
      ascii: `+-------------------------------------------------------+
| [Brand] [All Categories v] [Search catalog...] [Cart] [Account]|
+-------------------------------------------------------+`,
      mobile: 'Search input moves into dedicated second line; category dropdown compresses.',
      tablet: 'Unified single-line toolbar with inline category selector and action icons.',
    },
  ],

  sidebar: [
    {
      page: 'sidebar',
      id: 'classic-grouped',
      title: 'Classic Grouped',
      description: 'Categorized collapsible navigation groups with unread notification badges and workspace switcher.',
      variant: 'sidebar-content',
      ascii: `+---------------+---------------------------------------+
| [TS] Brand    | Main Workspace Content                |
|               |                                       |
| CORE SYSTEM   |                                       |
| - Dashboard   |                                       |
| - Tokens [3]  |                                       |
|               |                                       |
| ADMIN         |                                       |
| - Settings    |                                       |
+---------------+---------------------------------------+`,
      mobile: 'Sidebar collapses off-screen into an accessible sliding drawer opened by hamburger button.',
      tablet: 'Sidebar collapses to a 64px compact icon rail or sliding overlay drawer.',
    },
    {
      page: 'sidebar',
      id: 'compact-rail',
      title: 'Compact Icon Rail',
      description: 'Space-saving slim icon rail with tooltips and flyout targets.',
      variant: 'sidebar-rail',
      ascii: `+---+---------------------------------------------------+
|[*]| Header & Workspace                                |
|   |                                                   |
|[D]| Metrics & Content Cards                           |
|[P]|                                                   |
|[T]|                                                   |
|[S]|                                                   |
+---+---------------------------------------------------+`,
      mobile: 'Converts into a sticky bottom navigation bar with active icon highlights.',
      tablet: '60px slim vertical icon rail with tooltips on hover and modal flyout menus.',
    },
    {
      page: 'sidebar',
      id: 'dual-pane',
      title: 'Dual-Pane Master Nav',
      description: 'Workspace switcher rail paired with contextual sub-menu navigation column.',
      variant: 'sidebar-dual',
      ascii: `+-+-------+---------------------------------------------+
|1|Files  | Active File Document View                   |
|2|Tokens |                                             |
|3|Styles |                                             |
| |Specs  |                                             |
+-+-------+---------------------------------------------+`,
      mobile: 'Secondary column hides; primary rail accessible via bottom or drawer switcher.',
      tablet: 'Primary rail remains fixed; secondary sub-menu collapses to collapsible accordion.',
    },
    {
      page: 'sidebar',
      id: 'floating-card',
      title: 'Floating Detached Card',
      description: 'Elevated floating card sidebar detached from screen edges with rounded corners.',
      variant: 'sidebar-floating',
      ascii: `  +-----+   +-------------------------------------------+
  | Card|   | Main Canvas                               |
  | Nav |   |                                           |
  |     |   |                                           |
  +-----+   +-------------------------------------------+`,
      mobile: 'Collapses to floating action button (FAB) that triggers modal navigation sheet.',
      tablet: 'Floating card docks slightly closer to canvas border with reduced padding.',
    },
    {
      page: 'sidebar',
      id: 'workspace-shell',
      title: 'Enterprise App Shell',
      description: 'Full-bleed sidebar with org switcher, breadcrumb hierarchy and footer user card.',
      variant: 'sidebar-nav',
      ascii: `+-----------------+-------------------------------------+
| Org: Acme Corp v| Breadcrumb / Route                  |
| Projects        | Content Grid                        |
| Team Management |                                     |
| [User Profile  ]|                                     |
+-----------------+-------------------------------------+`,
      mobile: 'Converts to sliding sheet drawer triggered from header hamburger toggle.',
      tablet: 'Sidebar narrows to 220px with truncated labels and icon emphasis.',
    },
  ],

  dashboard: [
    {
      page: 'dashboard',
      id: 'sidebar-grid',
      title: 'Sidebar + Content',
      description: 'Left sidebar navigation with stat KPI cards and telemetry charts.',
      variant: 'sidebar-grid',
      ascii: `+-------+-----------------------------------------------+
| Nav   | [KPI 1] [KPI 2] [KPI 3]                       |
| Links | [       Visual Chart Area         ]           |
|       | [ Recent Events Stream            ]           |
+-------+-----------------------------------------------+`,
      mobile: 'Sidebar hidden into drawer; KPI cards stack single-column (or 2-up for mini stats).',
      tablet: 'Sidebar collapses to compact icon rail; KPI grid shifts to 2 columns.',
    },
    {
      page: 'dashboard',
      id: 'header-compact',
      title: 'Header Compact',
      description: 'Top horizontal navigation bar with full-bleed metric strips and wide analytics graph.',
      variant: 'header-compact',
      ascii: `+-------------------------------------------------------+
| [Brand] Metrics   Events   Audits                     [User]  |
+-------------------------------------------------------+
| [KPI 1]   [KPI 2]   [KPI 3]   [KPI 4]                         |
| [               Interactive Chart Area               ]        |
+-------------------------------------------------------+`,
      mobile: 'Header turns to hamburger; metric strips become horizontally scrollable.',
      tablet: 'Top nav remains; metric row wraps cleanly into 2x2 grid.',
    },
    {
      page: 'dashboard',
      id: 'analytical',
      title: 'Analytical Matrix',
      description: 'Dense multi-metric KPI matrix and dual comparative analytics graphs.',
      variant: 'analytical',
      ascii: `+-------------------------------------------------------+
| [ 4x KPI Summary Cards                              ] |
| [ Primary Telemetry Graph ] [ Secondary Radar Chart ] |
| [ Full Tabular Audit Logs                           ] |
+-------------------------------------------------------+`,
      mobile: 'Dual graphs stack vertically; audit table gets horizontal scrolling wrapper.',
      tablet: 'Graphs adapt to 50/50 split; table displays primary 3 columns.',
    },
    {
      page: 'dashboard',
      id: 'feed-focus',
      title: 'Feed & Telemetry',
      description: 'Realtime streaming event logs alongside system diagnostic gauges.',
      variant: 'sidebar-content',
      ascii: `+-------------------------------+-----------------------+
| Realtime Event Stream         | System Resource Meter |
| [Log line 1.................] | CPU: [=====    ] 62%  |
| [Log line 2.................] | Mem: [======== ] 84%  |
+-------------------------------+-----------------------+`,
      mobile: 'System resource meters move to top row; event log streams below in single column.',
      tablet: '60/40 side-by-side split retained with compact timestamp formatting.',
    },
  ],

  landing: [
    {
      page: 'landing',
      id: 'hero-split',
      title: 'Marketing Landing',
      description: 'Split hero with product mockup card on right, customer trust badges, and feature grid.',
      variant: 'hero-split',
      ascii: `+-----------------------+-------------------------------+
| Headline & Pitch      | [ Interactive Product Mockup ]|
| [Get Started] [Demo]  | [ Verified Token Live Card   ]|
+-----------------------+-------------------------------+
| [Feature 1]       [Feature 2]       [Feature 3]       |
+-------------------------------------------------------+`,
      mobile: 'Hero content stacks vertically with headline first, CTA second, mockup third.',
      tablet: 'Mockup scales down proportionately; feature row wraps into 2-column grid.',
    },
    {
      page: 'landing',
      id: 'hero-centered',
      title: 'Hero Centered',
      description: 'Centered headline with trust badges, dual primary CTAs, and wide central product preview.',
      variant: 'hero-centered',
      ascii: `+-------------------------------------------------------+
|                     Grand Headline                    |
|        Subheadline explaining value proposition       |
|             [Primary Action]  [Secondary]             |
|                                                       |
|       +---------------------------------------+       |
|       |         Wide Centered Preview         |       |
|       +---------------------------------------+       |
+-------------------------------------------------------+`,
      mobile: 'Buttons stack full-width; preview scales down to 100% viewport width.',
      tablet: 'Preview container constrained with 24px side gutters; CTAs remain inline.',
    },
    {
      page: 'landing',
      id: 'feature-grid',
      title: 'Feature Grid',
      description: 'Bento box style modular cards showcasing distinct capabilities and integrations.',
      variant: 'feature-grid',
      ascii: `+-------------------------------------------------------+
| [Large Bento Feature Card 1   ] [Compact Feature 2]   |
| [Feature 3] [Feature 4]         [Feature 5]           |
+-------------------------------------------------------+`,
      mobile: 'Bento grid converts into single-column vertical stack with full card widths.',
      tablet: 'Bento grid reorganizes into balanced 2-column layout.',
    },
  ],

  pricing: [
    {
      page: 'pricing',
      id: 'cards-3col',
      title: '3-Card Tier',
      description: 'Side-by-side tier cards (Starter, Pro, Enterprise) with highlighted recommended plan.',
      variant: 'cards-3col',
      ascii: `+---------------+---------------+---------------+
| Starter Plan  | Pro (Popular) | Enterprise    |
| $19/mo        | $49/mo (Star) | Custom        |
| - 5 Members   | - Unlimited   | - Dedicated   |
| [Choose]      | [Start Trial] | [Contact]     |
+---------------+---------------+---------------+`,
      mobile: 'Cards stack vertically with the Popular/Pro tier highlighted and displayed first or centered.',
      tablet: '3 cards compress horizontally with compact margins or wrap into 2+1 layout.',
    },
    {
      page: 'pricing',
      id: 'table-matrix',
      title: 'Matrix Table',
      description: 'Detailed feature matrix table comparing 30+ capabilities across all subscription tiers.',
      variant: 'table-matrix',
      ascii: `+----------------------+---------+---------+------------+
| Feature              | Starter | Pro     | Enterprise |
| Unlimited Tokens     |   No    |   Yes   |    Yes     |
| Custom Registries    |   No    |   Yes   |    Yes     |
| Dedicated Support    |   No    |   No    |    Yes     |
+----------------------+---------+---------+------------+`,
      mobile: 'Table wraps in an overflow-x scroll container with sticky left feature column.',
      tablet: 'Full comparison table visible with comfortable text sizing.',
    },
    {
      page: 'pricing',
      id: 'compact-toggle',
      title: 'Compact List',
      description: 'Horizontal compact plan tier rows with monthly/annual billing toggle.',
      variant: 'compact-toggle',
      ascii: `+-------------------------------------------------------+
| Billing: [ Monthly | Annual (Save 20%) ]              |
| [O] Starter     -- Basic Token Exports       -- $19/mo|
| [*] Pro         -- Full Agent Handoff        -- $49/mo|
| [O] Enterprise  -- Custom Private Registries -- Custom|
+-------------------------------------------------------+`,
      mobile: 'Plan rows expand vertically with price and CTA aligned underneath description.',
      tablet: 'Horizontal row cards maintain clean spacing and right-aligned buttons.',
    },
  ],

  kanban: [
    {
      page: 'kanban',
      id: 'board-columns',
      title: 'Columns Board',
      description: 'Multi-stage sprint pipeline columns (Backlog, In Progress, Review, Done).',
      variant: 'board-columns',
      ascii: `+-----------+-----------+-----------+-----------+
| Backlog   | In Prog   | Review    | Done      |
| [Card 1]  | [Card 3]  | [Card 5]  | [Card 7]  |
| [Card 2]  | [Card 4]  | [Card 6]  |           |
+-----------+-----------+-----------+-----------+`,
      mobile: 'Columns convert to horizontally swipable snap cards or single-column accordion tabs.',
      tablet: 'Board scrolls horizontally or renders 2 columns side-by-side with horizontal scrollbar.',
    },
    {
      page: 'kanban',
      id: 'timeline-list',
      title: 'Roadmap List',
      description: 'Milestone timeline list with task progress status bars and deliverable dates.',
      variant: 'timeline-list',
      ascii: `+-------------------------------------------------------+
| Q1 Milestones                      Progress: [=====   ] 65%   |
| - [x] Token Registry Compiler      Done      (Oct 28)         |
| - [>] Responsive Viewport Sandbox  In Prog   (Nov 04)         |
| - [ ] Figma Token Importer         Scheduled (Nov 15)         |
+-------------------------------------------------------+`,
      mobile: 'Timeline tracks stack vertically with status pill beneath task title.',
      tablet: 'Full-width milestone items with progress bar and assignees visible.',
    },
    {
      page: 'kanban',
      id: 'compact-grid',
      title: 'Compact Grid',
      description: 'Dense task cards matrix organized by priority badges and assignees.',
      variant: 'compact-grid',
      ascii: `+---------------------------+---------------------------+
| [DES-101] Token Parser    | [ENG-204] Contrast Engine |
| Priority: High   [Avatar] | Priority: Medium [Avatar] |
+---------------------------+---------------------------+`,
      mobile: 'Grid switches to 1 column with full-width cards and touch-friendly tap targets.',
      tablet: '2-column balanced grid with priority badges and action menus.',
    },
  ],

  chat: [
    {
      page: 'chat',
      id: 'split-pane',
      title: 'Master Split',
      description: 'Left conversation threads list alongside active active message stream and composer.',
      variant: 'split-pane',
      ascii: `+-------------------+-----------------------------------+
| Channels / People | Active Conversation Stream        |
| - #design-system  | User: "Added new navbar layouts"  |
| - #engineering    | Agent: "Compiling tokens..."      |
|                   | [ Type a message...          ] [^]|
+-------------------+-----------------------------------+`,
      mobile: 'Master/detail split collapses: user views either thread list OR message stream with back button.',
      tablet: 'Thread column compresses to 240px; conversation pane occupies remaining space.',
    },
    {
      page: 'chat',
      id: 'compact-feed',
      title: 'Floating Feed',
      description: 'Single focused conversation stream with collapsible metadata drawer and sticky bottom composer.',
      variant: 'compact-feed',
      ascii: `+-------------------------------------------------------+
| Header: #design-tokens-team              [Members] [Search]   |
| Message stream with timestamps and code snippets              |
| [ Message composer with format controls             ] [Send]  |
+-------------------------------------------------------+`,
      mobile: 'Message bubbles wrap cleanly to max-width 85%; composer stays docked above keyboard.',
      tablet: 'Max-width 720px centered stream with comfortable padding.',
    },
    {
      page: 'chat',
      id: 'minimal-bubble',
      title: 'Minimal Bubbles',
      description: 'Streamlined conversational bubble stream with avatar indicators and reactions.',
      variant: 'minimal-bubble',
      ascii: `+-------------------------------------------------------+
| (Avatar) "Here is the compiled token JSON"            |
|          { "color": { "primary": "#0284c7" } }        |
|                                (Avatar) "Looks great!"|
+-------------------------------------------------------+`,
      mobile: 'Avatars shrink to 28px; code blocks wrap in horizontal scroll boxes.',
      tablet: 'Avatars and chat bubbles centered with standard margins.',
    },
  ],

  settings: [
    {
      page: 'settings',
      id: 'tabbed',
      title: 'Horizontal Tabs',
      description: 'Horizontal top tab bar switching between Profile, Preferences, Security, and Integrations.',
      variant: 'tabbed',
      ascii: `+-------------------------------------------------------+
| [Profile]   [Preferences]   [Security]   [API Keys]           |
|                                                       |
| Display Name: [Alex Rivers                          ] |
| Email:        [alex@tastystyles.io                  ] |
| [Save Changes]                                        |
+-------------------------------------------------------+`,
      mobile: 'Tabs become horizontally scrollable strip with bottom border indicator.',
      tablet: 'Full tab bar with comfortable spacing and inline form inputs.',
    },
    {
      page: 'settings',
      id: 'stacked-cards',
      title: 'Stacked Cards',
      description: 'Vertical stacked section cards on a single scrollable page with individual save actions.',
      variant: 'stacked-cards',
      ascii: `+-------------------------------------------------------+
| [ Card 1: Profile Information ]                       |
| [ Card 2: Security & 2-Factor Authentication ]        |
| [ Card 3: Notification Preferences ]                  |
+-------------------------------------------------------+`,
      mobile: 'Card actions span full width at bottom of each card.',
      tablet: 'Cards render with unified border radius and box-shadow elevation.',
    },
    {
      page: 'settings',
      id: 'sidebar-nav',
      title: 'Sidebar Nav',
      description: 'Left sub-navigation link list paired with right-hand settings form body.',
      variant: 'sidebar-nav',
      ascii: `+---------------+---------------------------------------+
| Settings Nav  | Section Title                         |
| - General     | Form fields, toggles & inputs         |
| - Team        |                                       |
| - Billing     | [Save Changes Button]                 |
+---------------+---------------------------------------+`,
      mobile: 'Sidebar navigation turns into top select dropdown or drawer menu.',
      tablet: '200px sub-nav rail with form inputs filling remaining horizontal space.',
    },
  ],

  error: [
    {
      page: 'error',
      id: 'giant-hero',
      title: 'Giant Hero',
      description: 'Bold status code typography with illustration, explanatory message, and navigation buttons.',
      variant: 'giant-hero',
      ascii: `+-------------------------------------------------------+
|                         404                           |
|                  Page Not Located                     |
|      The token or resource you requested has moved    |
|             [Return to Safety]  [View Docs]           |
+-------------------------------------------------------+`,
      mobile: 'Giant status code font clamps gracefully; action buttons stack full width.',
      tablet: 'Hero text centered with generous padding and inline buttons.',
    },
    {
      page: 'error',
      id: 'split-terminal',
      title: 'Split Debugger',
      description: 'Simulated CLI trace logs and endpoint diagnostics paired with friendly recovery actions.',
      variant: 'split-terminal',
      ascii: `+-----------------------+-------------------------------+
| Friendly Explanation  | Simulated CLI Debugger Shell  |
| Error: 500 Failure    | $ agy spec verify --target    |
| [Try Again]           | [ERR] Socket connection reset |
+-----------------------+-------------------------------+`,
      mobile: 'Terminal window moves underneath recovery actions with horizontal code scrolling.',
      tablet: '50/50 split remains with dark terminal window and monospaced code trace.',
    },
    {
      page: 'error',
      id: 'dialog-card',
      title: 'Dialog Card',
      description: 'In-app alert modal card with status badge and primary recovery actions.',
      variant: 'dialog-card',
      ascii: `+-------------------------------------------------------+
|        +-------------------------------------+        |
|        | [!] HTTP 403 Forbidden Access       |        |
|        | Insufficient team role permissions. |        |
|        | [Request Access]  [Go to Dashboard] |        |
|        +-------------------------------------+        |
+-------------------------------------------------------+`,
      mobile: 'Card expands to 100% width with flush margins and touch-sized buttons.',
      tablet: 'Floating dialog card centered with 480px max-width.',
    },
    {
      page: 'error',
      id: 'minimal',
      title: 'Minimal Clean',
      description: 'Editorial documentation link layout with subtle monochrome status badge.',
      variant: 'minimal',
      ascii: `+-------------------------------------------------------+
| Status: 404 Not Found                                 |
| We could not locate the requested resource.           |
| Helpful Links: Documentation -> | System Status ->    |
+-------------------------------------------------------+`,
      mobile: 'Links stack vertically with high-contrast tap targets.',
      tablet: 'Clean left-aligned editorial layout with inline link list.',
    },
  ],

  onboarding: [
    {
      page: 'onboarding',
      id: 'wizard-stepper',
      title: 'Wizard Stepper',
      description: 'Horizontal multi-step progress stepper with next/back buttons and field cards.',
      variant: 'header-compact',
      ascii: `+-------------------------------------------------------+
| Step 1: Workspace -> [Step 2: Team] -> Step 3: Launch  |
|                                                       |
| Configure your organization workspace name:           |
| [ Workspace Name Input                              ] |
| [ < Back ]                            [ Next Step > ] |
+-------------------------------------------------------+`,
      mobile: 'Stepper numbers compress into "Step 2 of 3" text; action buttons dock to bottom.',
      tablet: 'Full horizontal stepper bar with icons and titles.',
    },
    {
      page: 'onboarding',
      id: 'card-stack',
      title: 'Card Stack',
      description: 'Interactive stacked setup cards where completing each card unlocks the next milestone.',
      variant: 'cards-3col',
      ascii: `+-------------------------------------------------------+
| [x] 1. Choose Design Tokens Palette (Completed)       |
| [>] 2. Configure Typography & Google Fonts (Active)   |
| [ ] 3. Review Responsive Breakpoints                  |
+-------------------------------------------------------+`,
      mobile: 'Cards stack vertically with prominent checkmark badges.',
      tablet: 'Cards render with hover state elevation and step guidance.',
    },
    {
      page: 'onboarding',
      id: 'minimal-modal',
      title: 'Minimal Modal',
      description: 'Centered focused dialog with clear single-task checklist and skip action.',
      variant: 'minimal-modal',
      ascii: `+-------------------------------------------------------+
|        +-------------------------------------+        |
|        | Welcome to TastyStyles!             |        |
|        | Let us tailor your workspace setup. |        |
|        | [Get Started ->]          [Skip]    |        |
|        +-------------------------------------+        |
+-------------------------------------------------------+`,
      mobile: 'Modal takes full-bleed view with sticky confirmation trigger.',
      tablet: 'Centered elevated card with 460px max width.',
    },
  ],

  emptyState: [
    {
      page: 'emptyState',
      id: 'centered-action',
      title: 'Centered Action',
      description: 'Minimalist illustration with bold headline, descriptive copy, and primary creation button.',
      variant: 'centered-action',
      ascii: `+-------------------------------------------------------+
|                     [Empty Box Icon]                  |
|                    No Design Tokens Yet               |
|      Get started by creating your first token palette |
|                 [ + Create Token Palette ]            |
+-------------------------------------------------------+`,
      mobile: 'Button takes full container width with accessible 44px height.',
      tablet: 'Centered element group with generous whitespace.',
    },
    {
      page: 'emptyState',
      id: 'illustration-card',
      title: 'Illustrated Card',
      description: 'Elevated template starter card offering ready-made starter kits.',
      variant: 'dialog-card',
      ascii: `+-------------------------------------------------------+
|        +-------------------------------------+        |
|        | [ Starter Template Kit ]            |        |
|        | Pick from 6 pre-built design specs: |        |
|        | - SaaS Dashboard Kit                |        |
|        | - E-Commerce Storefront             |        |
|        +-------------------------------------+        |
+-------------------------------------------------------+`,
      mobile: 'Starter templates stack into full-width button rows.',
      tablet: '2-column starter kit picker card with hover states.',
    },
    {
      page: 'emptyState',
      id: 'checklist-guide',
      title: 'Guided Checklist',
      description: 'Interactive onboarding setup checklist guiding the user to their first action.',
      variant: 'stacked-cards',
      ascii: `+-------------------------------------------------------+
| Quick Start Checklist:                                |
| [ ] 1. Choose primary and accent brand colors         |
| [ ] 2. Select heading and body Google fonts           |
| [ ] 3. Export specification for your AI coding agent  |
+-------------------------------------------------------+`,
      mobile: 'Checklist rows format with touch-friendly checkboxes.',
      tablet: 'Wide list layout with direct quick-action links.',
    },
  ],

  success: [
    {
      page: 'success',
      id: 'celebration-card',
      title: 'Celebration Card',
      description: 'Centered confirmation modal with receipt badge, celebratory graphics, and next steps.',
      variant: 'celebration-card',
      ascii: `+-------------------------------------------------------+
|        +-------------------------------------+        |
|        |           [Check Circle]            |        |
|        |         Tokens Exported!            |        |
|        | Receipt ID: #TS-94827               |        |
|        | [Download ZIP Bundle]  [Close]      |        |
|        +-------------------------------------+        |
+-------------------------------------------------------+`,
      mobile: 'Card expands to 100% width with vertical stacked actions.',
      tablet: 'Centered card with 440px max width and shadow elevation.',
    },
    {
      page: 'success',
      id: 'receipt-summary',
      title: 'Receipt Summary',
      description: 'Itemized transaction breakdown with next steps and audit trail details.',
      variant: 'table-matrix',
      ascii: `+-------------------------------------------------------+
| Transaction Receipt: #TS-88219                        |
| - Spec File: DESIGN.md                      Included  |
| - Tailwind Config: tailwind.config.ts       Included  |
| - CSS Custom Properties: tokens.css         Included  |
| [Download All Files]                  [Go to App ->]  |
+-------------------------------------------------------+`,
      mobile: 'Receipt line items stack labels and values vertically.',
      tablet: 'Itemized tabular receipt with right-aligned action buttons.',
    },
    {
      page: 'success',
      id: 'minimal-banner',
      title: 'Minimal Banner',
      description: 'Clean top-flush notification bar with confirmation indicator.',
      variant: 'minimal-banner',
      ascii: `+-------------------------------------------------------+
| [Check] Specification successfully compiled. [View Spec] [X]  |
+-------------------------------------------------------+`,
      mobile: 'Banner wraps into 2 lines with action link flush right.',
      tablet: 'Single-line top banner with dismiss button.',
    },
  ],

  'ecommerce-catalog': [
    {
      page: 'ecommerce-catalog',
      id: 'faceted-sidebar',
      title: 'Faceted Sidebar (Baymard Std)',
      description: 'Standard desktop e-commerce with 240px left facet tree and responsive 3/4-column product grid.',
      variant: 'sidebar-content',
      ascii: '+-------+-----------------------+\n|Filters| [Prod 1] [Prod 2]     |\n|Price  | $64.00   $120.00      |\n|Color  | [Prod 3] [Prod 4]     |\n+-------+-----------------------+',
      mobile: 'Filter sidebar collapses into a floating bottom sheet trigger.',
      tablet: 'Grid scales to 2-columns; filters become compact drawer.',
    },
    {
      page: 'ecommerce-catalog',
      id: 'top-filter-bar',
      title: 'Top Filter Bar (Modern DTC)',
      description: 'Horizontal pill drawer freeing maximum width for high-resolution lifestyle imagery.',
      variant: 'landing',
      ascii: '+-------------------------------+\n|[Category ▼] [Size ▼] [Price ▼]|\n+-------------------------------+\n|[Product 1 (Large)] [Prod 2]   |\n+-------------------------------+',
      mobile: 'Filter pills scroll horizontally with smooth gradient edge fade.',
      tablet: 'Pill bar remains pinned at top during product feed scroll.',
    },
    {
      page: 'ecommerce-catalog',
      id: 'split-map-view',
      title: 'Split Map & Local Stays',
      description: '50/50 desktop split view connecting physical inventory locations with responsive product list.',
      variant: 'split',
      ascii: '+---------------+---------------+\n| Product List  | Interactive   |\n| - Item A $80  | Map Pins      |\n| - Item B $120 | [SF Store]    |\n+---------------+---------------+',
      mobile: 'Defaults to list view with floating [Show Map] bottom pill.',
      tablet: 'Maintains 50/50 split with compacted product card padding.',
    },
  ],

  'product-detail': [
    {
      page: 'product-detail',
      id: 'split-sticky-buy',
      title: 'Split Sticky Buy Box',
      description: 'Baymard conversion benchmark: multi-image gallery on left, sticky buy box on right.',
      variant: 'split',
      ascii: '+---------------+---------------+\n| Gallery Mock  | Apex Studio 27|\n| [Thumb 1]     | $349.00       |\n| [Thumb 2]     | [Add to Cart] |\n+---------------+---------------+',
      mobile: 'Image gallery becomes swipeable carousel; buy bar sticks to bottom.',
      tablet: '50/50 split maintained with comfortable margins.',
    },
    {
      page: 'product-detail',
      id: 'vertical-scroll-story',
      title: 'Vertical Storytelling',
      description: 'Apple/Tesla standard: full-bleed lifestyle images with floating glass buy box.',
      variant: 'minimal',
      ascii: '+-------------------------------+\n| [Full-Bleed Lifestyle Photo]  |\n| +---------------------------+ |\n| | Floating Buy Box: $349    | |\n+-------------------------------+',
      mobile: 'Floating buy box docks to bottom edge.',
      tablet: 'Full-width photography with centered 480px buy card.',
    },
    {
      page: 'product-detail',
      id: 'two-column-tabs',
      title: 'Spec-Dense Two-Column',
      description: 'Top compact gallery and buy box; bottom wide technical specs and review histogram.',
      variant: 'bento-grid',
      ascii: '+-------+-------+---------------+\n| Img   | Buy   | Full Specs    |\n+-------+-------+ Tabbed Matrix |\n| Customer Reviews Histogram    |\n+-------------------------------+',
      mobile: 'Specs and reviews collapse into clean expandable accordions.',
      tablet: 'Tab navigation remains visible on surface.',
    },
  ],

  checkout: [
    {
      page: 'checkout',
      id: 'slide-over-cart',
      title: 'Slide-Over Cart Drawer',
      description: 'Shopify standard: off-canvas drawer overlaying active view with instant 1-tap checkout.',
      variant: 'sidebar-content',
      ascii: '+-----------------------+-------+\n| Active Store Canvas   | Cart  |\n| (Dimmed Background)   | Items |\n|                       | $240  |\n+-----------------------+-------+',
      mobile: 'Drawer expands to 100% full-width view.',
      tablet: '380px drawer overlay on right edge with backdrop blur.',
    },
    {
      page: 'checkout',
      id: 'one-page-accordion',
      title: 'One-Page Stepped Accordion',
      description: 'Baymard benchmark: 1. Shipping Address -> 2. Payment Method -> 3. Final Review.',
      variant: 'minimal',
      ascii: '+-------------------------------+-------------------+\n| 1. Shipping Details           | Order Summary     |\n| 2. Payment Method             | Subtotal: $140    |\n| 3. Review Order               | [Place Order]     |\n+-------------------------------+-------------------+',
      mobile: 'Order summary docks above step 1 or floats at top.',
      tablet: 'Single column with summary card pinned on right.',
    },
    {
      page: 'checkout',
      id: 'split-order-rail',
      title: 'Split Order Rail',
      description: '60% left checkout inputs; 40% right sticky itemized summary rail with trust badges.',
      variant: 'split',
      ascii: '+-----------------------+-----------------------+\n| Checkout Inputs       | Sticky Order Summary  |\n| Name, Address, Card   | Items, Taxes, Total   |\n+-----------------------+-----------------------+',
      mobile: 'Order summary placed above payment inputs.',
      tablet: 'Split ratio adapts to 55/45.',
    },
  ],

  marketplace: [
    {
      page: 'marketplace',
      id: 'split-map-list',
      title: 'Split Map & Listings',
      description: 'Airbnb benchmark: 50% scrollable listing cards with price badges + 50% sticky vector map.',
      variant: 'split',
      ascii: '+---------------+---------------+\n| Stays Feed    | Vector Map    |\n| - Loft $220   | [$220] [$175] |\n| - Studio $175 | [$340]        |\n+---------------+---------------+',
      mobile: 'List view by default with floating [Show Map] toggle button.',
      tablet: '50/50 split maintained with compact card padding.',
    },
    {
      page: 'marketplace',
      id: 'hero-directory-categories',
      title: 'Directory & Categories',
      description: 'Top search and location bar + categorized listing carousels with Superhost badges.',
      variant: 'bento-grid',
      ascii: '+-------------------------------+\n| [Where to?] [Dates] [Guests]  |\n+-------------------------------+\n| Category Rows: Lofts, Beach   |\n+-------------------------------+',
      mobile: 'Category pills scroll horizontally.',
      tablet: '2-card carousel rows with touch swipe.',
    },
    {
      page: 'marketplace',
      id: 'supplier-operator-dashboard',
      title: 'Supplier Host Hub',
      description: 'Host workspace console with occupancy metrics, booking requests, and payout tables.',
      variant: 'sidebar-grid',
      ascii: '+-------+-----------------------+\n| Host  | Telemetry: 84% Occup. |\n| Nav   | Inquiries Queue       |\n| Payout| Monthly Payout: $4.2k |\n+-------+-----------------------+',
      mobile: 'Sidebar collapses to top icon rail.',
      tablet: 'Standard workspace shell layout.',
    },
  ],

  booking: [
    {
      page: 'booking',
      id: 'split-calendar-slots',
      title: 'Split Calendar & Slots',
      description: 'Calendly standard: monthly calendar on left, 30-min time pills on right with timezone converter.',
      variant: 'split',
      ascii: '+---------------+---------------+\n| Month Calendar| Morning:      |\n| Mo Tu We Th Fr| [09:00] [10:00|\n| 16 Selected   | Afternoon:    |\n+---------------+---------------+',
      mobile: 'Calendar stacked above time slots.',
      tablet: 'Comfortable side-by-side view.',
    },
    {
      page: 'booking',
      id: 'stepped-service-wizard',
      title: 'Stepped Service Wizard',
      description: 'Linear 4-step wizard: Service Selection -> Staff Provider -> Date & Time -> Deposit.',
      variant: 'minimal',
      ascii: '+-------------------------------------------------------+\n| Step 1: Select Service -> Step 2: Staff -> Step 3: Cal|\n+-------------------------------------------------------+',
      mobile: 'Step progress bar pinned at top.',
      tablet: 'Wizard card centered with comfortable margins.',
    },
    {
      page: 'booking',
      id: 'horizontal-timeline-roster',
      title: 'Multi-Staff Day Roster',
      description: 'Day-view horizontal time-block grid for multi-doctor clinics and salons.',
      variant: 'bento-grid',
      ascii: '+-----------+-----------+-----------+\n| Dr. Sarah | Dr. Marcus| Dr. Elena |\n| [9:00 AM] | [Booked]  | [9:00 AM] |\n+-----------+-----------+-----------+',
      mobile: 'Staff members become tabbed switcher.',
      tablet: 'Horizontal scrollable roster.',
    },
  ],

  editorial: [
    {
      page: 'editorial',
      id: 'masonry-frontpage',
      title: 'Masonry News Frontpage',
      description: 'NYT standard: 2-column lead story with headline + 1-column trending list + 3-col topic grid.',
      variant: 'bento-grid',
      ascii: '+-------------------+-----------+\n| Lead Story Hero   | Trending  |\n| Large Cover Photo | 1. DTCG v2|\n+-------------------+-----------+',
      mobile: 'Stories stack vertically in chronological order.',
      tablet: '2-column responsive masonry.',
    },
    {
      page: 'editorial',
      id: 'focused-prose-toc',
      title: 'Focused Reader & TOC',
      description: 'Medium standard: centered 680px prose column with left sticky Table of Contents and progress line.',
      variant: 'sidebar-content',
      ascii: '+-------+-----------------------+\n| TOC   | Longform Prose Column |\n| Sec 1 | Pull quote typography |\n| Sec 2 | [45% Reading Progress]|\n+-------+-----------------------+',
      mobile: 'TOC collapses into a top drawer button.',
      tablet: 'TOC narrows to 180px with subtle line dividers.',
    },
    {
      page: 'editorial',
      id: 'paywall-meter-overlay',
      title: 'Metered Subscription Scrim',
      description: 'Paragraphs 1-2 legible, then frosted gradient scrim leading into subscriber sign-up card.',
      variant: 'minimal',
      ascii: '+-------------------------------+\n| Paragraphs 1-2 Preview...     |\n| ~~~~~ Frosted Blur Scrim ~~~~~|\n| [Unlock Unlimited Access - $5]|\n+-------------------------------+',
      mobile: 'Paywall card fills 100% viewport width.',
      tablet: 'Centered 460px glass paywall dialog.',
    },
  ],

  charity: [
    {
      page: 'charity',
      id: 'hero-impact-thermometer',
      title: 'Cause Hero & Thermometer',
      description: 'UNICEF standard: live fundraising progress bar with preset dollar donation chips and tax receipt notice.',
      variant: 'landing',
      ascii: '+-------------------------------+-----------------------+\n| Cause Video / Story           | Progress: $78k of 100k|\n| Clean Water Appeal            | [$25][$50][$100][Custom\n+-------------------------------+-----------------------+',
      mobile: 'Thermometer and donation chips stack below cause image.',
      tablet: 'Side-by-side layout with 55/45 width ratio.',
    },
    {
      page: 'charity',
      id: 'split-cause-calculator',
      title: 'Interactive Impact Calculator',
      description: 'Left documentary video; right interactive slider showing tangible impact ($50 = 10 clean water kits).',
      variant: 'split',
      ascii: '+---------------+---------------+\n| Video Story   | Impact Meter  |\n| Documentary   | $50 = 10 Kits |\n+---------------+---------------+',
      mobile: 'Calculator placed directly below video player.',
      tablet: 'Maintains 50/50 split.',
    },
    {
      page: 'charity',
      id: 'donor-wall-transparency',
      title: 'Donor Wall & Audited Pie',
      description: 'Financial allocation pie chart breakdown + live chronological donor tribute feed.',
      variant: 'bento-grid',
      ascii: '+-------------------+-----------+\n| Financial Pie     | Live Donor|\n| 88% Direct Pgms   | Ticker    |\n+-------------------+-----------+',
      mobile: 'Donor ticker scrolls vertically.',
      tablet: '2-column transparency dashboard.',
    },
  ],

  forum: [
    {
      page: 'forum',
      id: 'three-column-reddit',
      title: 'Three-Column Community',
      description: 'Reddit standard: left channels rail (220px) + center thread stream + right community rules.',
      variant: 'sidebar-content',
      ascii: '+-----+-------------------+-----+\n|# gen| Upvote Stream     |About|\n|# dev| ▲ 142 Title Here  |Rules|\n+-----+-------------------+-----+',
      mobile: 'Channels collapse into slide-out navigation drawer.',
      tablet: 'Right about rail hidden; center thread expands.',
    },
    {
      page: 'forum',
      id: 'split-qa-solved',
      title: 'Q&A Solved with Upvoting',
      description: 'StackOverflow standard: question card with vertical vote counter + green pinned Accepted Solution box.',
      variant: 'minimal',
      ascii: '+-------------------------------------------------------+\n| ▲ 42 Question Title                                   |\n| [✓ Accepted Solution: Green Pinned Card]             |\n+-------------------------------------------------------+',
      mobile: 'Vote buttons placed horizontally below title.',
      tablet: 'Full-width reading with comfortable margins.',
    },
    {
      page: 'forum',
      id: 'compact-thread-table',
      title: 'Compact Discussion Table',
      description: 'HackerNews standard: dense 1-line table rows displaying title, reply count, and author avatars.',
      variant: 'table',
      ascii: '+-------------------------------+-------+-------+-------+\n| Discussion Topic              |Replies| Views |Author |\n+-------------------------------+-------+-------+-------+',
      mobile: 'Views and author columns collapse.',
      tablet: 'Compact tabular view with hover row highlight.',
    },
  ],

  streaming: [
    {
      page: 'streaming',
      id: 'cinema-theater',
      title: 'Cinema Theater Canvas',
      description: 'Netflix standard: 16:9 full-width cinema viewport with ambient backdrop glow and lower episode tabs.',
      variant: 'landing',
      ascii: '+-------------------------------------------------------+\n| [16:9 Cinema Viewport - 4K Playback]                  |\n+-------------------------------------------------------+\n| [Episodes (12)]   [Cast & Crew]   [Related Media]     |\n+-------------------------------------------------------+',
      mobile: 'Video sticks to top on scroll.',
      tablet: 'Cinema canvas adapts to tablet aspect ratio.',
    },
    {
      page: 'streaming',
      id: 'live-stream-split',
      title: 'Live Stream & Superchat',
      description: 'Twitch standard: 70% video player on left; 30% live interactive chat stream on right with superchats.',
      variant: 'split',
      ascii: '+-----------------------+-------+\n| Live Video Stream     | Live  |\n| Keynote Broadcast     | Chat  |\n|                       | Stream|\n+-----------------------+-------+',
      mobile: 'Chat collapses below video stream.',
      tablet: 'Split view with 65/35 ratio.',
    },
    {
      page: 'streaming',
      id: 'audio-queue-rail',
      title: 'Audio Player & Queue',
      description: 'Spotify standard: left album art + center waveform progress player + right upcoming queue rail.',
      variant: 'sidebar-content',
      ascii: '+-------+-----------------------+-------+\n| Cover | Waveform Player       | Queue |\n| Art   | ━━━━━●━━━━━━━━        | List  |\n+-------+-----------------------+-------+',
      mobile: 'Queue rail collapses into modal sheet.',
      tablet: 'Compact audio player bar.',
    },
  ],

  portfolio: [
    {
      page: 'portfolio',
      id: 'case-study-hero',
      title: 'Case Study Hero & Metrics',
      description: 'ReadCV benchmark: statement typography intro + 2-column full-bleed project cards with impact metrics.',
      variant: 'bento-grid',
      ascii: '+-------------------------------------------------------+\n| Statement: Alex Rivers — Staff Product Designer       |\n+---------------------------+---------------------------+\n| [Project 1: +340% Veloc.] | [Project 2: 65% Latency]  |\n+---------------------------+---------------------------+',
      mobile: 'Project cards stack in single column.',
      tablet: '2-column responsive grid.',
    },
    {
      page: 'portfolio',
      id: 'minimalist-editorial',
      title: 'Minimalist Editorial',
      description: 'Substack standard: text-first chronological narrative of work, speaking engagements, and patents.',
      variant: 'minimal',
      ascii: '+-------------------------------------------------------+\n| Chronological Career Narrative & Selected Writing     |\n| - 2026: TastyStyles Autonomous Token Engine           |\n+-------------------------------------------------------+',
      mobile: 'Single column with comfortable line length.',
      tablet: 'Centered 720px max reading width.',
    },
    {
      page: 'portfolio',
      id: 'interactive-grid-gallery',
      title: 'Filterable Work Gallery',
      description: 'Dribbble standard: multi-column card grid with category tabs (UI/UX, Tokens, Mobile).',
      variant: 'bento-grid',
      ascii: '+-------------------------------------------------------+\n| [All Work]  [UI/UX Design]  [Token Compilers] [Mobile]|\n+-------+-------+-------+-------+-------+-------+-------+\n| Card 1| Card 2| Card 3| Card 4| Card 5| Card 6| Card 7|\n+-------+-------+-------+-------+-------+-------+-------+',
      mobile: 'Grid scales to 1-2 columns.',
      tablet: '3-column responsive card grid.',
    },
  ],

  detail: [
    {
      page: 'detail',
      id: 'split-sidepanel',
      title: 'Split Sidepanel',
      description: 'Main entity summary with right-hand metadata panel and action inspector.',
      variant: 'sidebar-content',
      ascii: `+-------------------------------+-----------------------+
| Main Entity Summary           | Metadata Inspector    |
| - Token Name: Primary Brand   | Created: 2026-11-04   |
| - Value: #0284c7              | Author: Alex Rivers   |
| - Contrast: 21.0:1 AAA Pass   | [Edit Token] [Delete] |
+-------------------------------+-----------------------+`,
      mobile: 'Metadata panel collapses below entity summary in single vertical column.',
      tablet: 'Sidepanel narrows to 240px; main view adapts gracefully.',
    },
    {
      page: 'detail',
      id: 'full-document',
      title: 'Full Document',
      description: 'Single column longform editorial view with complete specification properties.',
      variant: 'minimal',
      ascii: `+-------------------------------------------------------+
| Token Entity Specification: Primary Brand             |
|                                                       |
| Mathematical Definitions, APCA Contrast Scores, and   |
| Associated Component Recipes...                       |
+-------------------------------------------------------+`,
      mobile: 'Text margins shrink to comfortable mobile reading margins.',
      tablet: 'Single column constrained to 720px max reading width.',
    },
    {
      page: 'detail',
      id: 'tabbed-media',
      title: 'Tabbed Inspector',
      description: 'Tabbed inspector with specs, live code previews, and history logs.',
      variant: 'tabbed',
      ascii: `+-------------------------------------------------------+
| [Overview]   [CSS Variable]   [Tailwind]   [Audit Log]        |
|                                                       |
| Live code block preview and token value inspection    |
+-------------------------------------------------------+`,
      mobile: 'Tabs become horizontal scroll strip; code blocks scroll horizontally.',
      tablet: 'Tab bar and code blocks fit standard tablet dimensions.',
    },
  ],
};

/**
 * Helper to fetch catalog items for an active page key
 */
export function getLayoutsForPage(page: string): LayoutCatalogItem[] {
  return LAYOUT_CATALOG[page] ?? [];
}


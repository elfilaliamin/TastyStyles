import type { DesignState } from '../config/schema';
import {
  getFontEntry,
  getLayoutEntry,
  getRadiusEntry,
  getShadowEntry,
  getSpacingEntry,
} from './registry';

/**
 * Computes typography scale sizes
 */
function computeTypeScale(baseSize: number, scale: number) {
  const steps = [
    { role: 'Display (H1)', exp: 4, weight: '700', tracking: '-0.025em', lineHeight: '1.15' },
    { role: 'Section (H2)', exp: 3, weight: '700', tracking: '-0.02em', lineHeight: '1.2' },
    { role: 'Subsection (H3)', exp: 2, weight: '600', tracking: '-0.015em', lineHeight: '1.25' },
    { role: 'Card Header (H4)', exp: 1, weight: '600', tracking: '-0.01em', lineHeight: '1.3' },
    { role: 'Body Copy', exp: 0, weight: '400', tracking: '0em', lineHeight: '1.5' },
    { role: 'Small / Caption', exp: -1, weight: '400', tracking: '0.01em', lineHeight: '1.4' },
  ];

  return steps.map((step) => {
    const px = Math.round(baseSize * Math.pow(scale, step.exp) * 10) / 10;
    const rem = (px / 16).toFixed(3);
    return {
      ...step,
      px: `${px}px`,
      rem: `${rem}rem`,
    };
  });
}

/**
 * Compiles a live DesignState into an exact 9-section Markdown specification
 */
export function compileMarkdown(state: DesignState): string {
  const headingFont = getFontEntry(state.typography.headingFont) ?? {
    id: state.typography.headingFont,
    label: state.typography.headingFont,
    family: state.typography.headingFont,
    category: 'sans-serif' as const,
    weights: [400, 700],
  };

  const bodyFont = getFontEntry(state.typography.bodyFont) ?? {
    id: state.typography.bodyFont,
    label: state.typography.bodyFont,
    family: state.typography.bodyFont,
    category: 'sans-serif' as const,
    weights: [400, 500, 700],
  };

  const layout = getLayoutEntry(state.layout) ?? {
    id: state.layout,
    label: 'Standard Layout',
    description: 'Responsive multi-tier web layout structure.',
    wireframe: 'sidebar-content',
    responsiveRules: 'Adapts fluidly between mobile (<640px) and desktop (>1024px).',
  };

  const radius = getRadiusEntry(state.radius) ?? {
    id: state.radius,
    label: state.radius,
    value: '8px',
  };

  const shadow = getShadowEntry(state.shadow) ?? {
    id: state.shadow,
    label: state.shadow,
    value: '0 4px 12px rgba(0,0,0,0.08)',
  };

  const spacing = getSpacingEntry(state.spacing) ?? {
    id: state.spacing,
    label: 'Comfortable',
    baseFactor: 1.0,
    scale: {
      xs: '0.375rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.75rem',
      xl: '2.5rem',
    },
  };

  const typeScale = computeTypeScale(state.typography.baseSize, state.typography.scale);

  // Unique font families for link snippet
  const uniqueFamilies = Array.from(new Set([headingFont.family, bodyFont.family]));
  const fontLinkParams = uniqueFamilies
    .map((f) => `family=${f.replace(/\s+/g, '+')}:wght@400;500;600;700`)
    .join('&');
  const googleFontsUrl = `https://fonts.googleapis.com/css2?${fontLinkParams}&display=swap`;

  return `# ${state.name} — Design System Specification

## 1. Intent & Overview
The ${state.name} design system establishes a cohesive, accessible visual language pairing the \`${headingFont.family}\` heading typeface with \`${bodyFont.family}\` body typography. It defaults to the **${state.activeMode.toUpperCase()}** color profile and organizes application interfaces around the **${layout.label}** architecture archetype, with unified \`${radius.value}\` corner curvature and \`${shadow.label}\` depth elevation.

---

## 2. Design Tokens

### 2.1 Color Tokens
| Token | Light Hex | Dark Hex | Role & Usage |
| :--- | :--- | :--- | :--- |
| **primary** | \`${state.colors.light.primary}\` | \`${state.colors.dark.primary}\` | Brand anchor, key call-to-actions, prominent buttons |
| **secondary** | \`${state.colors.light.secondary}\` | \`${state.colors.dark.secondary}\` | Secondary buttons, subtle badges, supporting interactive elements |
| **accent** | \`${state.colors.light.accent}\` | \`${state.colors.dark.accent}\` | Focal highlights, active states, key data visualizations |
| **background** | \`${state.colors.light.background}\` | \`${state.colors.dark.background}\` | Base application canvas and page background |
| **surface** | \`${state.colors.light.surface}\` | \`${state.colors.dark.surface}\` | Elevated component cards, navigation panels, dialogs |
| **text** | \`${state.colors.light.text}\` | \`${state.colors.dark.text}\` | High-contrast body copy, titles, and iconography |
| **border** | \`${state.colors.light.border}\` | \`${state.colors.dark.border}\` | Subtle dividers, component outlines, input boundaries |

### 2.2 Typography Scale
- **Heading Font**: \`${headingFont.family}\` (weights: \`${headingFont.weights.join(', ')}\`)
- **Body Font**: \`${bodyFont.family}\` (weights: \`${bodyFont.weights.join(', ')}\`)
- **Scale Factor**: \`${state.typography.scale}\` (Base Size: \`${state.typography.baseSize}px\`)

| Role | Family | Size (px) | Size (rem) | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${typeScale
  .map(
    (t) =>
      `| **${t.role}** | \`${t.role.includes('H') ? headingFont.family : bodyFont.family}\` | \`${t.px}\` | \`${t.rem}\` | \`${t.weight}\` | \`${t.lineHeight}\` | \`${t.tracking}\` |`
  )
  .join('\n')}

### 2.3 Spacing Scale (${spacing.label})
| Token | Value (rem) | Typical Application |
| :--- | :--- | :--- |
| **spacing-xs** | \`${spacing.scale.xs}\` | Tight internal badge padding, icon gaps |
| **spacing-sm** | \`${spacing.scale.sm}\` | Button horizontal padding, form field vertical gaps |
| **spacing-md** | \`${spacing.scale.md}\` | Standard card internal padding, list item separation |
| **spacing-lg** | \`${spacing.scale.lg}\` | Container section padding, grid column gaps |
| **spacing-xl** | \`${spacing.scale.xl}\` | Major layout gutter, hero section padding |

### 2.4 Border Radius & Shadows
| Token | Resolved CSS Value | Description |
| :--- | :--- | :--- |
| **radius-base** | \`${radius.value}\` | Standard radius applied across buttons, cards, and inputs |
| **shadow-base** | \`${shadow.value}\` | Elevation style applied across cards, popovers, and menus |

---

## 3. CSS Variables Block
Paste this block into your global stylesheet (e.g. \`:root\` in \`index.css\`):

\`\`\`css
:root {
  /* Colors (Light Mode) */
  --color-primary: ${state.colors.light.primary};
  --color-secondary: ${state.colors.light.secondary};
  --color-accent: ${state.colors.light.accent};
  --color-background: ${state.colors.light.background};
  --color-surface: ${state.colors.light.surface};
  --color-text: ${state.colors.light.text};
  --color-border: ${state.colors.light.border};

  /* Typography */
  --font-heading: '${headingFont.family}', ${headingFont.category};
  --font-body: '${bodyFont.family}', ${bodyFont.category};
  --font-size-base: ${state.typography.baseSize}px;
  --font-scale: ${state.typography.scale};

  /* Spacing */
  --spacing-xs: ${spacing.scale.xs};
  --spacing-sm: ${spacing.scale.sm};
  --spacing-md: ${spacing.scale.md};
  --spacing-lg: ${spacing.scale.lg};
  --spacing-xl: ${spacing.scale.xl};

  /* Shape & Elevation */
  --radius-base: ${radius.value};
  --shadow-base: ${shadow.value};
}

/* Dark Mode Overrides */
[data-theme='dark'],
.dark {
  --color-primary: ${state.colors.dark.primary};
  --color-secondary: ${state.colors.dark.secondary};
  --color-accent: ${state.colors.dark.accent};
  --color-background: ${state.colors.dark.background};
  --color-surface: ${state.colors.dark.surface};
  --color-text: ${state.colors.dark.text};
  --color-border: ${state.colors.dark.border};
}
\`\`\`

---

## 4. Tailwind CSS Configuration Snippet
Add this configuration snippet inside \`tailwind.config.js\` under \`theme.extend\`:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', '${headingFont.category}'],
        body: ['var(--font-body)', '${bodyFont.category}'],
      },
      borderRadius: {
        brand: 'var(--radius-base)',
      },
      boxShadow: {
        brand: 'var(--shadow-base)',
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
};
\`\`\`

---

## 5. Layout Architecture: ${layout.label}
- **Archetype**: \`${layout.id}\`
- **Structure**: ${layout.description}
- **Responsive Architecture**: ${layout.responsiveRules}

### 5.1 Page Layout Archetypes
- **Authentication (Login / Signup)**: \`${state.pageLayouts?.auth ?? 'centered-card'}\`
  - Container Style: \`${state.pageLayouts?.authCardStyle ?? 'elevated'}\`
  - Social SSO Integration: ${state.pageLayouts?.authSocialButtons !== false ? 'Enabled' : 'Disabled'}
- **Error & System State Pages**: \`${state.pageLayouts?.error ?? 'giant-hero'}\`
  - Default Status Code: HTTP \`${state.pageLayouts?.errorCode ?? '404'}\`
  - Technical Trace Diagnostics: ${state.pageLayouts?.errorShowTrace !== false ? 'Visible' : 'Hidden'}
- **Dashboard & Telemetry**: \`${state.pageLayouts?.dashboard ?? 'sidebar-grid'}\`
- **Landing & Public Marketing**: \`${state.pageLayouts?.landing ?? 'hero-split'}\`
- **Pricing & Plans**: \`${state.pageLayouts?.pricing ?? 'cards-3col'}\`
- **Kanban & Sprint Board**: \`${state.pageLayouts?.kanban ?? 'board-columns'}\`
- **Chat & Autonomous Inbox**: \`${state.pageLayouts?.chat ?? 'split-pane'}\`
- **Settings & Preferences**: \`${state.pageLayouts?.settings ?? 'tabbed'}\`

---

## 6. Responsive Breakpoints & Rules
- **Mobile (<640px)**:
  - Single column fluid flow with sticky bottom action controls or drawer navigation.
  - Type-scale clamps: Display (H1) reduces by one scale step to preserve viewport balance.
  - Spacing density contracts to \`--spacing-sm\` for margins and paddings.
- **Tablet (640px to 1024px)**:
  - Two-column adaptive grid; side navigation converts to a compact rail or sliding sheet.
  - Standard \`--spacing-md\` layout gutters.
- **Desktop (>1024px)**:
  - Multi-column full-fidelity layout with permanent side navigation and dedicated inspector panes.
  - Generous max-width content container (\`1280px\` / \`80rem\`) with \`--spacing-xl\` layout padding.

---

## 7. Component Rules

### 7.1 Buttons
- **Primary Button**:
  - Background: \`var(--color-primary)\`
  - Text: High-contrast auto-selected foreground color
  - Border Radius: \`var(--radius-base)\`
  - Shadow: \`var(--shadow-base)\`
  - Padding: \`var(--spacing-sm) var(--spacing-md)\`
  - Hover: Opacity 0.92 with subtle brightness increase (filter: brightness(1.08))
  - Active: Scale transform \`scale(0.98)\`
  - Focus: \`outline: 2px solid var(--color-accent); outline-offset: 2px;\`
  - Disabled: \`opacity: 0.45; cursor: not-allowed; pointer-events: none;\`
- **Secondary Button**:
  - Background: \`transparent\` or \`var(--color-surface)\`
  - Border: \`1px solid var(--color-border)\`
  - Text: \`var(--color-text)\`
  - Hover: \`background: rgba(125, 125, 125, 0.1)\`

### 7.2 Inputs & Form Controls
- **Text Input**:
  - Background: \`var(--color-surface)\`
  - Border: \`1px solid var(--color-border)\`
  - Text: \`var(--color-text)\`
  - Border Radius: \`var(--radius-base)\`
  - Padding: \`var(--spacing-sm) var(--spacing-md)\`
  - Focus: \`border-color: var(--color-accent); box-shadow: 0 0 0 2px var(--color-accent);\`, outline none
  - Disabled: \`opacity: 0.5; background: rgba(0, 0, 0, 0.05);\`

### 7.3 Cards & Containers
- Background: \`var(--color-surface)\`
- Border: \`1px solid var(--color-border)\`
- Border Radius: \`var(--radius-base)\`
- Shadow: \`var(--shadow-base)\`
- Padding: \`var(--spacing-lg)\`

### 7.4 Badges
- Background: \`var(--color-secondary)\` with 15% opacity
- Text: \`var(--color-primary)\`
- Border: \`1px solid var(--color-border)\`
- Border Radius: \`9999px\`
- Padding: \`var(--spacing-xs) var(--spacing-sm)\`

---

## 8. Do / Don't Guidelines for AI Coding Agents
- **DO**: Reference CSS custom properties (\`var(--color-primary)\`, etc.) rather than hardcoded hex values.
- **DO**: Maintain at least a 4.5:1 WCAG AA contrast ratio between text and its immediate background.
- **DO**: Use \`var(--radius-base)\` consistently across all buttons, form fields, and cards.
- **DO**: Apply visible focus rings using \`var(--color-accent)\` for keyboard accessibility.
- **DON'T**: Invent arbitrary spacing values; strictly utilize the \`--spacing-*\` token scale.
- **DON'T**: Apply font weights other than the declared weights (\`${headingFont.weights.join(', ')}\` for headings; \`${bodyFont.weights.join(', ')}\` for body).
- **DON'T**: Rely exclusively on hover states for critical actions—ensure mobile touch targets are at least \`44px\`.

---

## 9. Google Fonts Import Snippet

### HTML \`<head>\` Link:
\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${googleFontsUrl}" rel="stylesheet">
\`\`\`

### CSS \`@import\`:
\`\`\`css
@import url('${googleFontsUrl}');
\`\`\`
`;
}

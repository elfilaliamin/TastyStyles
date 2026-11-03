import { DesignStateSchema, type DesignState } from '../config/schema';
import { getFontEntry, getRadiusEntry, getShadowEntry, getSpacingEntry } from './registry';

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/markdown'): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportJsonState(state: DesignState): void {
  const json = JSON.stringify(state, null, 2);
  downloadFile(json, 'tastystyles-state.json', 'application/json');
}

export function parseImportedJson(jsonString: string): { success: true; state: DesignState } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(jsonString);
    const result = DesignStateSchema.safeParse(parsed);
    if (!result.success) {
      const messages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
      return { success: false, error: `Invalid design state: ${messages}` };
    }
    return { success: true, state: result.data };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Invalid JSON file.' };
  }
}

/**
 * Generate pure CSS Custom Properties block
 */
export function generateCssTokens(state: DesignState): string {
  const headingFont = getFontEntry(state.typography.headingFont) ?? { family: state.typography.headingFont, category: 'sans-serif' };
  const bodyFont = getFontEntry(state.typography.bodyFont) ?? { family: state.typography.bodyFont, category: 'sans-serif' };
  const radius = getRadiusEntry(state.radius) ?? { value: '8px' };
  const shadow = getShadowEntry(state.shadow) ?? { value: 'none' };
  const spacing = getSpacingEntry(state.spacing) ?? {
    scale: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
  };

  return `/* ==========================================================================
   TastyStyles Design System Tokens — ${state.name}
   Generated automatically for production styling
   ========================================================================== */

:root {
  /* Color Palette (Light Mode Default) */
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
  --font-base-size: ${state.typography.baseSize}px;
  --font-scale-ratio: ${state.typography.scale};

  /* Elevation & Geometry */
  --radius-brand: ${radius.value};
  --shadow-brand: ${shadow.value};

  /* Spacing Scale */
  --spacing-xs: ${spacing.scale.xs};
  --spacing-sm: ${spacing.scale.sm};
  --spacing-md: ${spacing.scale.md};
  --spacing-lg: ${spacing.scale.lg};
  --spacing-xl: ${spacing.scale.xl};
}

/* Dark Mode Tokens */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: ${state.colors.dark.primary};
    --color-secondary: ${state.colors.dark.secondary};
    --color-accent: ${state.colors.dark.accent};
    --color-background: ${state.colors.dark.background};
    --color-surface: ${state.colors.dark.surface};
    --color-text: ${state.colors.dark.text};
    --color-border: ${state.colors.dark.border};
  }
}

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
`;
}

/**
 * Generate Tailwind CSS Config (tailwind.config.ts)
 */
export function generateTailwindConfig(state: DesignState): string {
  const headingFont = getFontEntry(state.typography.headingFont) ?? { family: state.typography.headingFont, category: 'sans-serif' };
  const bodyFont = getFontEntry(state.typography.bodyFont) ?? { family: state.typography.bodyFont, category: 'sans-serif' };
  const radius = getRadiusEntry(state.radius) ?? { value: '8px' };
  const shadow = getShadowEntry(state.shadow) ?? { value: 'none' };

  return `import type { Config } from 'tailwindcss';

// TastyStyles Tailwind Theme Configuration for: ${state.name}
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, ${state.colors.light.primary})',
        secondary: 'var(--color-secondary, ${state.colors.light.secondary})',
        accent: 'var(--color-accent, ${state.colors.light.accent})',
        background: 'var(--color-background, ${state.colors.light.background})',
        surface: 'var(--color-surface, ${state.colors.light.surface})',
        text: 'var(--color-text, ${state.colors.light.text})',
        border: 'var(--color-border, ${state.colors.light.border})',
      },
      fontFamily: {
        heading: ['"${headingFont.family}"', '${headingFont.category}'],
        body: ['"${bodyFont.family}"', '${bodyFont.category}'],
      },
      borderRadius: {
        brand: '${radius.value}',
      },
      boxShadow: {
        brand: '${shadow.value}',
      },
      spacing: {
        'ts-xs': 'var(--spacing-xs, 0.25rem)',
        'ts-sm': 'var(--spacing-sm, 0.5rem)',
        'ts-md': 'var(--spacing-md, 1rem)',
        'ts-lg': 'var(--spacing-lg, 1.5rem)',
        'ts-xl': 'var(--spacing-xl, 2rem)',
      },
    },
  },
  plugins: [],
};

export default config;
`;
}

/**
 * Generate TypeScript Tokens Object (tokens.ts)
 */
export function generateTypeScriptTokens(state: DesignState): string {
  return `/**
 * TastyStyles Design System Tokens: ${state.name}
 * Typed constant contract for React / React Native / Node
 */

export const designTokens = {
  name: ${JSON.stringify(state.name)},
  activeMode: ${JSON.stringify(state.activeMode)},
  colors: {
    light: ${JSON.stringify(state.colors.light, null, 6).replace(/\n/g, '\n  ')},
    dark: ${JSON.stringify(state.colors.dark, null, 6).replace(/\n/g, '\n  ')},
  },
  typography: {
    headingFont: ${JSON.stringify(state.typography.headingFont)},
    bodyFont: ${JSON.stringify(state.typography.bodyFont)},
    scale: ${state.typography.scale},
    baseSize: ${state.typography.baseSize},
  },
  geometry: {
    radius: ${JSON.stringify(state.radius)},
    shadow: ${JSON.stringify(state.shadow)},
    spacing: ${JSON.stringify(state.spacing)},
    layout: ${JSON.stringify(state.layout)},
  },
  pageLayouts: ${JSON.stringify(state.pageLayouts, null, 4).replace(/\n/g, '\n  ')},
} as const;

export type DesignTokens = typeof designTokens;
`;
}

/**
 * Generate Antigravity CLI Command
 */
export function generateAgyCliCommand(state: DesignState): string {
  const slug = state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `# Import and apply this design system using the Antigravity CLI:
# Target specification: ${slug}.json
agy token apply --name "${state.name}" \\
  --mode "${state.activeMode}" \\
  --primary "${state.colors[state.activeMode].primary}" \\
  --accent "${state.colors[state.activeMode].accent}" \\
  --heading-font "${state.typography.headingFont}" \\
  --body-font "${state.typography.bodyFont}" \\
  --layout "${state.layout}" \\
  --radius "${state.radius}" \\
  --shadow "${state.shadow}"

# Or save the specification directly into your repo rules:
cat << 'EOF' > .agents/design-spec.md
# Run 'agy agent run' to build components matching this spec.
EOF
`;
}



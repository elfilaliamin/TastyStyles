import { DesignStateSchema, type DesignState } from '../config/schema';
import { getFontEntry, getRadiusEntry, getSpacingEntry } from './registry';
import { GOAL_DEFINITIONS } from '../config/previews';

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
  downloadBlob(blob, filename);
}

export function downloadBlob(blob: Blob, filename: string): void {
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

import { generateUnifiedCssTokens, resolveTokens } from './tokenModel';

/**
 * Generate pure CSS Custom Properties block
 * Uses canonical single source of truth from tokenModel
 */
export function generateCssTokens(state: DesignState): string {
  return generateUnifiedCssTokens(state);
}

/**
 * Generate Tailwind CSS Config (tailwind.config.ts)
 */
export function generateTailwindConfig(state: DesignState): string {
  const tokens = resolveTokens(state);

  return `import type { Config } from 'tailwindcss';

// TastyStyles Tailwind Theme Configuration for: ${state.name}
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
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
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',
        'on-primary': 'var(--color-on-primary)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-accent': 'var(--color-on-accent)',
        muted: 'var(--color-muted)',
        ring: 'var(--color-ring)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', '${tokens.typography.headingCategory}'],
        body: ['var(--font-body)', '${tokens.typography.bodyCategory}'],
      },
      borderRadius: {
        brand: 'var(--radius-base)',
        surface: 'var(--radius-surface)',
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
  projectGoal: ${JSON.stringify(state.projectGoal ?? 'saas')},
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

/**
 * Generate W3C Design Tokens Community Group (DTCG) Standard JSON
 * Compatible with Figma Tokens / Tokens Studio, Style Dictionary & Supernova
 */
export function generateDtcgTokens(state: DesignState): string {
  const headingFont = getFontEntry(state.typography.headingFont) ?? { family: state.typography.headingFont, category: 'sans-serif' };
  const bodyFont = getFontEntry(state.typography.bodyFont) ?? { family: state.typography.bodyFont, category: 'sans-serif' };
  const radius = getRadiusEntry(state.radius) ?? { value: '8px' };
  const spacing = getSpacingEntry(state.spacing) ?? {
    scale: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
  };

  const dtcg = {
    $name: state.name,
    $version: '1.0.0',
    $description: `W3C Design Token Community Group (DTCG) specification for ${state.name}`,
    $metadata: {
      goal: state.projectGoal ?? 'saas',
      pageLayouts: state.pageLayouts,
    },
    color: {
      light: {
        primary: { $value: state.colors.light.primary, $type: 'color', $description: 'Primary brand accent for light mode' },
        secondary: { $value: state.colors.light.secondary, $type: 'color', $description: 'Secondary brand hue for light mode' },
        accent: { $value: state.colors.light.accent, $type: 'color', $description: 'High-contrast accent color' },
        background: { $value: state.colors.light.background, $type: 'color', $description: 'Main canvas background' },
        surface: { $value: state.colors.light.surface, $type: 'color', $description: 'Card and surface container background' },
        text: { $value: state.colors.light.text, $type: 'color', $description: 'Primary text color' },
        border: { $value: state.colors.light.border, $type: 'color', $description: 'Structural border and divider' },
      },
      dark: {
        primary: { $value: state.colors.dark.primary, $type: 'color', $description: 'Primary brand accent for dark mode' },
        secondary: { $value: state.colors.dark.secondary, $type: 'color', $description: 'Secondary brand hue for dark mode' },
        accent: { $value: state.colors.dark.accent, $type: 'color', $description: 'High-contrast accent color' },
        background: { $value: state.colors.dark.background, $type: 'color', $description: 'Main canvas background' },
        surface: { $value: state.colors.dark.surface, $type: 'color', $description: 'Card and surface container background' },
        text: { $value: state.colors.dark.text, $type: 'color', $description: 'Primary text color' },
        border: { $value: state.colors.dark.border, $type: 'color', $description: 'Structural border and divider' },
      },
    },
    typography: {
      fontFamily: {
        heading: { $value: headingFont.family, $type: 'fontFamily' },
        body: { $value: bodyFont.family, $type: 'fontFamily' },
      },
      fontSize: {
        base: { $value: `${state.typography.baseSize}px`, $type: 'dimension' },
      },
      scaleRatio: {
        $value: state.typography.scale,
        $type: 'number',
      },
    },
    border: {
      radius: {
        brand: { $value: radius.value, $type: 'dimension' },
      },
    },
    spacing: {
      xs: { $value: spacing.scale.xs, $type: 'dimension' },
      sm: { $value: spacing.scale.sm, $type: 'dimension' },
      md: { $value: spacing.scale.md, $type: 'dimension' },
      lg: { $value: spacing.scale.lg, $type: 'dimension' },
      xl: { $value: spacing.scale.xl, $type: 'dimension' },
    },
  };

  return JSON.stringify(dtcg, null, 2);
}

// CRC-32 Lookup Table for In-Memory ZIP Generation
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
})();

function calculateCrc32(bytes: Uint8Array): number {
  let crc = 0 ^ (-1);
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

/**
 * Pure TypeScript In-Memory ZIP Builder (PKZip 2.0 uncompressed store format)
 * Generates standards-compliant .zip archives with zero external dependencies
 */
export function createZipBlob(files: { name: string; content: string }[]): Blob {
  const encoder = new TextEncoder();
  const fileEntries: {
    nameBytes: Uint8Array;
    dataBytes: Uint8Array;
    crc: number;
    offset: number;
  }[] = [];

  let currentOffset = 0;
  const parts: Uint8Array[] = [];

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = encoder.encode(file.content);
    const crc = calculateCrc32(dataBytes);

    const header = new Uint8Array(30);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x04034b50, true); // Local header signature
    view.setUint16(4, 20, true);         // Version needed: 2.0
    view.setUint16(6, 0, true);          // General purpose bit flag
    view.setUint16(8, 0, true);          // Compression method: 0 (stored)
    view.setUint16(10, 0, true);         // Mod time
    view.setUint16(12, 0, true);         // Mod date
    view.setUint32(14, crc, true);       // CRC-32
    view.setUint32(18, dataBytes.length, true); // Compressed size
    view.setUint32(22, dataBytes.length, true); // Uncompressed size
    view.setUint16(26, nameBytes.length, true); // Filename length
    view.setUint16(28, 0, true);         // Extra field length

    fileEntries.push({
      nameBytes,
      dataBytes,
      crc,
      offset: currentOffset,
    });

    parts.push(header);
    parts.push(nameBytes);
    parts.push(dataBytes);

    currentOffset += 30 + nameBytes.length + dataBytes.length;
  }

  const centralDirStart = currentOffset;
  let centralDirSize = 0;

  for (const entry of fileEntries) {
    const cdHeader = new Uint8Array(46);
    const view = new DataView(cdHeader.buffer);
    view.setUint32(0, 0x02014b50, true); // Central directory signature
    view.setUint16(4, 20, true);         // Version made by
    view.setUint16(6, 20, true);         // Version needed
    view.setUint16(8, 0, true);          // Bit flag
    view.setUint16(10, 0, true);         // Compression method: 0
    view.setUint16(12, 0, true);         // Mod time
    view.setUint16(14, 0, true);         // Mod date
    view.setUint32(16, entry.crc, true); // CRC-32
    view.setUint32(20, entry.dataBytes.length, true); // Compressed size
    view.setUint32(24, entry.dataBytes.length, true); // Uncompressed size
    view.setUint16(28, entry.nameBytes.length, true); // Filename length
    view.setUint16(30, 0, true);         // Extra field length
    view.setUint16(32, 0, true);         // File comment length
    view.setUint16(34, 0, true);         // Disk number start
    view.setUint16(36, 0, true);         // Internal file attributes
    view.setUint32(38, 0, true);         // External file attributes
    view.setUint32(42, entry.offset, true); // Relative offset of local header

    parts.push(cdHeader);
    parts.push(entry.nameBytes);

    centralDirSize += 46 + entry.nameBytes.length;
  }

  // End of central directory record (EOCD)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true); // EOCD signature
  eocdView.setUint16(4, 0, true);          // Disk number
  eocdView.setUint16(6, 0, true);          // Start disk
  eocdView.setUint16(8, fileEntries.length, true);  // Entries on this disk
  eocdView.setUint16(10, fileEntries.length, true); // Total entries
  eocdView.setUint32(12, centralDirSize, true);     // Central directory size
  eocdView.setUint32(16, centralDirStart, true);    // Offset of central directory
  eocdView.setUint16(20, 0, true);         // Comment length

  parts.push(eocd);

  return new Blob(parts as unknown as BlobPart[], { type: 'application/zip' });
}

/**
 * Generate AGENTS.md instructions for autonomous coding agents (Claude, Gemini, Cursor, Copilot)
 */
export function generateAgentRulesSnippet(state: DesignState): string {
  const goal = state.projectGoal ?? 'saas';
  const goalDef = GOAL_DEFINITIONS[goal] ?? GOAL_DEFINITIONS.saas;
  const pageLayouts = state.pageLayouts ?? {};

  const layoutEntries = Object.entries(pageLayouts)
    .filter(([, val]) => Boolean(val))
    .map(([page, layout]) => `- **${page}**: \`${layout}\``)
    .join('\n');

  return `# AI Coding Agent Contract & Design Rules: ${state.name}

> This file provides authoritative constraints for autonomous AI coding agents (Claude, Gemini, Copilot, Cursor).

## P0 Prime Directive
1. Read \`DESIGN.md\` and \`tokens.css\` before writing any frontend markup or components.
2. NEVER hardcode raw color hex values, font sizes in raw px, or arbitrary border radiuses.
3. Every style property MUST bind strictly to CSS variables defined in \`tokens.css\` or Tailwind classes mapped to them.

## Target Domain Architecture: ${goalDef.emoji} ${goalDef.label}
- **Sector Purpose**: ${goalDef.tagline}
- **Default Application Header**: \`${pageLayouts.navbar ?? goalDef.defaultNavbar ?? 'saas-header'}\`
- **Default Application Sidebar**: \`${pageLayouts.sidebar ?? goalDef.defaultSidebar ?? 'classic-grouped'}\`
- **Recommended Page Suite**: ${goalDef.recommendedPreviews.join(', ')}

## Mandatory Page Layout Specifications
When generating or extending frontend pages for this application, the AI agent MUST use the configured archetypes below as the mandatory foundation:
${layoutEntries || '- (Using defaults specified in DESIGN.md Section 7)'}

## Critical Tokens
- Primary Brand: \`var(--color-primary)\`
- Text on Primary: \`var(--color-on-primary)\`
- Surface Background: \`var(--color-surface)\`
- Viewport Background: \`var(--color-background)\`
- Heading Font: \`var(--font-heading)\` (${state.typography.headingFont})
- Body Font: \`var(--font-body)\` (${state.typography.bodyFont})
- Base Border Radius: \`var(--radius-base)\`
- Elevation Shadow: \`var(--shadow-base)\`

## Component Compliance
- All interactive controls must expose visible focus states using \`var(--color-ring)\`.
- Follow the component dimensions and state matrices detailed in \`DESIGN.md\` Section 6.
- All layouts must pass 375px mobile responsiveness without horizontal scrolling.
`;
}

/**
 * Download Complete Token Bundle as a .zip Package
 */
export function downloadZipBundle(state: DesignState, compiledMarkdown: string): void {
  const slug = state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const files = [
    { name: 'PROJECT-BRIEF.md', content: compiledMarkdown },
    { name: 'DESIGN.md', content: compiledMarkdown },
    { name: `${slug}-spec.md`, content: compiledMarkdown },
    { name: 'tokens.css', content: generateCssTokens(state) },
    { name: 'tailwind.config.ts', content: generateTailwindConfig(state) },
    { name: 'tokens.ts', content: generateTypeScriptTokens(state) },
    { name: 'tokens.dtcg.json', content: generateDtcgTokens(state) },
    { name: 'tastystyles-state.json', content: JSON.stringify(state, null, 2) },
    { name: 'AGENTS.md', content: generateAgentRulesSnippet(state) },
  ];

  const zipBlob = createZipBlob(files);
  downloadBlob(zipBlob, `${slug}-design-tokens.zip`);
}



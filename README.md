# TastyStyles 🎨

> Visually configure design tokens and export unambiguous Markdown specifications for AI coding agents.

TastyStyles is a static web application where you can visually design color palettes, typography scales, layout archetypes, border radii, shadows, and spacing density—then instantly export a comprehensive, zero-placeholder Markdown design system spec tailored for AI code generators.

---

## Stack
- **Vite + React + TypeScript**
- **Tailwind CSS** for the tool's own Slate/Zinc dark UI
- **Pure CSS Custom Properties** for the preview pane (isolated styling)
- **Lucide React** icons
- **Zod** runtime validation for registries and JSON state
- **Google Fonts** dynamically injected on the fly
- **Docker + Nginx** multi-stage container deployment

---

## Getting Started

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev

# 3. Build for production
npm run build
```

### Docker Deployment
```bash
# Build and run container on port 3004
docker compose up -d --build

# Open in browser
http://localhost:3004
```

---

## How to Add a New Style

TastyStyles is strictly data-driven. **No component code changes are required** to add new styles, typography, archetypes, or presets. Everything is defined in JSON files located in `src/config/` and validated at startup using Zod schemas in `src/config/schema.ts`.

### 1. Adding a Font (`src/config/fonts.json`)
Append a new entry with the Google Font family name, category, and desired weights:
```json
{
  "id": "caveat",
  "label": "Caveat",
  "family": "Caveat",
  "category": "display",
  "weights": [400, 700]
}
```

### 2. Adding a Layout Archetype (`src/config/layouts.json`)
Append a new entry with an archetype `id`, `label`, `description`, `wireframe` key, and `responsiveRules`:
```json
{
  "id": "docs-three-column",
  "label": "Documentation 3-Column",
  "description": "Left book navigation, centered readable prose column, and right-hand table of contents sticky rail.",
  "wireframe": "sidebar-content",
  "responsiveRules": "Right rail hides under 1280px; left navigation collapses into top sheet under 768px."
}
```

### 3. Adding a Border Radius (`src/config/radius.json`)
Append a new entry with `id`, `label`, and valid CSS length:
```json
{
  "id": "extra-large",
  "label": "Extra Large (24px)",
  "value": "24px"
}
```

### 4. Adding a Shadow (`src/config/shadows.json`)
Append a new entry with `id`, `label`, and valid CSS `box-shadow` string:
```json
{
  "id": "cyber-glow",
  "label": "Electric Cyber Glow",
  "value": "0 0 25px rgba(236, 72, 153, 0.4), 0 0 10px rgba(236, 72, 153, 0.25)"
}
```

### 5. Adding a Spacing Density (`src/config/spacing.json`)
Append a new spacing scale entry with `id`, `label`, `baseFactor`, and scale steps:
```json
{
  "id": "ultra-dense",
  "label": "Ultra Dense",
  "baseFactor": 0.5,
  "scale": {
    "xs": "0.125rem",
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "0.875rem",
    "xl": "1.25rem"
  }
}
```

### 6. Adding a Theme Preset (`src/config/presets.json`)
Append a curated preset defining full light and dark palettes and token references:
```json
{
  "id": "amethyst-haze",
  "label": "Amethyst Haze",
  "description": "Deep purple and lavender tones with high-contrast text for creative design tooling.",
  "state": {
    "name": "Amethyst Haze System",
    "activeMode": "dark",
    "colors": {
      "light": {
        "primary": "#7c3aed",
        "secondary": "#a78bfa",
        "accent": "#ec4899",
        "background": "#faf5ff",
        "surface": "#ffffff",
        "text": "#2e1065",
        "border": "#e9d5ff"
      },
      "dark": {
        "primary": "#a855f7",
        "secondary": "#c084fc",
        "accent": "#f472b6",
        "background": "#0f0728",
        "surface": "#1e1040",
        "text": "#f5f3ff",
        "border": "#3b1e70"
      }
    },
    "typography": {
      "headingFont": "space-grotesk",
      "bodyFont": "inter",
      "scale": 1.15,
      "baseSize": 16
    },
    "layout": "bento-grid",
    "radius": "rounded-lg",
    "shadow": "soft",
    "spacing": "comfortable"
  }
}
```

---

## Workspace Rules for Agents
Please see `.agents/rules`:
> "New styles are added only as JSON entries in src/config/, following the README."

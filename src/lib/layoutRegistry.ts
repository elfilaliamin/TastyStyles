import React from 'react';
import {
  LayoutManifestSchema,
  SectionManifestSchema,
  type LayoutManifest,
  type SectionManifest,
} from '../config/schema';

// Module maps loaded via Vite import.meta.glob
const rawLayoutManifests: Record<string, { manifest?: LayoutManifest }> =
  typeof (import.meta as any).glob === 'function'
    ? (import.meta as any).glob('../layouts/**/manifest.ts', { eager: true })
    : {};

const rawLayoutComponents: Record<string, () => Promise<{ default: React.ComponentType<any> }>> =
  typeof (import.meta as any).glob === 'function'
    ? (import.meta as any).glob('../layouts/**/Layout.tsx')
    : {};

const rawSectionManifests: Record<string, { manifest?: SectionManifest }> =
  typeof (import.meta as any).glob === 'function'
    ? (import.meta as any).glob('../sections/**/manifest.ts', { eager: true })
    : {};

const rawSectionComponents: Record<string, () => Promise<{ default: React.ComponentType<any> }>> =
  typeof (import.meta as any).glob === 'function'
    ? (import.meta as any).glob('../sections/**/Section.tsx')
    : {};

// Registry collections
const layoutsMap = new Map<string, LayoutManifest>();
const layoutsByPageType = new Map<string, LayoutManifest[]>();
const sectionsMap = new Map<string, SectionManifest>();

export function registerLayout(manifestRaw: unknown): LayoutManifest {
  const parsed = LayoutManifestSchema.parse(manifestRaw);
  const compositeKey = `${parsed.pageType}:${parsed.id}`;

  if (layoutsMap.has(compositeKey)) {
    throw new Error(`Duplicate layout registered: pageType="${parsed.pageType}", id="${parsed.id}"`);
  }

  layoutsMap.set(compositeKey, parsed);
  // Also store by id for direct lookup if unambiguous
  if (!layoutsMap.has(parsed.id)) {
    layoutsMap.set(parsed.id, parsed);
  }

  const existing = layoutsByPageType.get(parsed.pageType) ?? [];
  existing.push(parsed);
  layoutsByPageType.set(parsed.pageType, existing);

  return parsed;
}

export function registerSection(manifestRaw: unknown): SectionManifest {
  const parsed = SectionManifestSchema.parse(manifestRaw);
  if (sectionsMap.has(parsed.id)) {
    throw new Error(`Duplicate section registered: id="${parsed.id}"`);
  }
  sectionsMap.set(parsed.id, parsed);
  return parsed;
}

// In Vite, initialize from eager glob
for (const [path, mod] of Object.entries(rawLayoutManifests)) {
  if (mod?.manifest) {
    try {
      registerLayout(mod.manifest);
    } catch (e) {
      console.error(`Failed to register layout manifest at ${path}:`, e);
      throw e;
    }
  }
}

for (const [path, mod] of Object.entries(rawSectionManifests)) {
  if (mod?.manifest) {
    try {
      registerSection(mod.manifest);
    } catch (e) {
      console.error(`Failed to register section manifest at ${path}:`, e);
      throw e;
    }
  }
}

export function getAllLayouts(): LayoutManifest[] {
  // Return unique manifests
  const seen = new Set<LayoutManifest>();
  for (const m of layoutsMap.values()) {
    seen.add(m);
  }
  return Array.from(seen);
}

export function getLayoutsForPage(pageType: string): LayoutManifest[] {
  return layoutsByPageType.get(pageType) ?? [];
}

export function getLayout(idOrComposite: string): LayoutManifest | undefined {
  return layoutsMap.get(idOrComposite);
}

export function getAllSections(): SectionManifest[] {
  return Array.from(sectionsMap.values());
}

export function getSection(id: string): SectionManifest | undefined {
  return sectionsMap.get(id);
}

export function getLayoutComponentLoader(
  pageType: string,
  layoutId: string
): (() => Promise<{ default: React.ComponentType<any> }>) | undefined {
  const expectedEnd = `/layouts/${pageType}/${layoutId}/Layout.tsx`;
  for (const [path, loader] of Object.entries(rawLayoutComponents)) {
    if (path.endsWith(expectedEnd)) {
      return loader;
    }
  }
  return undefined;
}

export function getSectionComponentLoader(
  sectionName: string
): (() => Promise<{ default: React.ComponentType<any> }>) | undefined {
  const expectedEnd = `/sections/${sectionName}/Section.tsx`;
  for (const [path, loader] of Object.entries(rawSectionComponents)) {
    if (path.endsWith(expectedEnd)) {
      return loader;
    }
  }
  return undefined;
}


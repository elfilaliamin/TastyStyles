import React from 'react';
import {
  LayoutManifestSchema,
  SectionManifestSchema,
  type LayoutManifest,
  type SectionManifest,
  type DesignState,
} from '../config/schema';
import {
  PAGE_LAYOUTS_KEY_TO_PAGE_TYPE,
  PAGE_TYPE_TO_PAGE_LAYOUTS_KEY,
  PAGE_TYPES_BY_ID,
} from '../config/pageTypes';

import { ALL_LAYOUT_MANIFESTS } from '../layouts/manifestRegistry';
import { ALL_SECTION_MANIFESTS } from '../sections/manifestRegistry';

// Module maps loaded via Vite import.meta.glob
const rawLayoutComponents: Record<string, () => Promise<{ default: React.ComponentType<any> }>> =
  typeof (import.meta as any).glob === 'function'
    ? (import.meta as any).glob('../layouts/**/Layout.tsx')
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
    return layoutsMap.get(compositeKey)!;
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
    return sectionsMap.get(parsed.id)!;
  }
  sectionsMap.set(parsed.id, parsed);
  return parsed;
}

// Statically initialize all manifests
for (const m of ALL_LAYOUT_MANIFESTS) {
  registerLayout(m);
}

for (const s of ALL_SECTION_MANIFESTS) {
  registerSection(s);
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

export function getLayout(idOrComposite: string, pageType?: string): LayoutManifest | undefined {
  if (pageType) {
    const compositeKey = `${pageType}:${idOrComposite}`;
    if (layoutsMap.has(compositeKey)) {
      return layoutsMap.get(compositeKey);
    }
  }
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

/**
 * Resolves the canonical layout ID for a given page type from DesignState.
 * Prioritizes state.project.pages as the single source of truth,
 * falling back to state.pageLayouts, and then the page registry default.
 */
export function resolveLayout(state: DesignState, pageType: string): string {
  const canonicalPageType = PAGE_LAYOUTS_KEY_TO_PAGE_TYPE[pageType] ?? pageType;
  const pageLayoutsKey = PAGE_TYPE_TO_PAGE_LAYOUTS_KEY[canonicalPageType] ?? pageType;

  // 1. Primary canonical source: state.project.pages
  const pageEntry = state.project?.pages?.find(
    (p) => p.pageType === canonicalPageType || p.pageType === pageType
  );
  if (pageEntry?.layoutId && pageEntry.layoutId !== 'default') {
    return pageEntry.layoutId;
  }

  // 2. Secondary source: state.pageLayouts
  const fromPageLayouts =
    (state.pageLayouts as any)?.[pageLayoutsKey] ??
    (state.pageLayouts as any)?.[pageType];
  if (typeof fromPageLayouts === 'string' && fromPageLayouts.length > 0 && fromPageLayouts !== 'default') {
    return fromPageLayouts;
  }

  // 3. Fallback to page entry layoutId if 'default' or defaultLayout from pageTypes
  if (pageEntry?.layoutId) {
    return pageEntry.layoutId;
  }

  const pageDef = PAGE_TYPES_BY_ID.get(canonicalPageType);
  return pageDef?.defaultLayout ?? 'default';
}



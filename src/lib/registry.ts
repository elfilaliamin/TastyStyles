import {
  RegistriesSchema,
  type Registries,
  type FontEntry,
  type LayoutEntry,
  type RadiusEntry,
  type ShadowEntry,
  type SpacingEntry,
  type PresetEntry,
} from '../config/schema';

import fontsRaw from '../config/fonts.json';
import layoutsRaw from '../config/layouts.json';
import radiusRaw from '../config/radius.json';
import shadowsRaw from '../config/shadows.json';
import spacingRaw from '../config/spacing.json';
import presetsRaw from '../config/presets.json';

export interface RegistryValidationResult {
  success: boolean;
  registries?: Registries;
  error?: string;
  errorDetails?: Array<{ path: string; message: string }>;
}

export function validateAllRegistries(): RegistryValidationResult {
  const combined = {
    fonts: fontsRaw,
    layouts: layoutsRaw,
    radius: radiusRaw,
    shadows: shadowsRaw,
    spacing: spacingRaw,
    presets: presetsRaw,
  };

  const result = RegistriesSchema.safeParse(combined);

  if (!result.success) {
    const errorDetails = result.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    return {
      success: false,
      error: 'Registry configuration failed Zod validation at startup.',
      errorDetails,
    };
  }

  return {
    success: true,
    registries: result.data,
  };
}

// Initialized at module load
const validationResult = validateAllRegistries();

export const isRegistryValid = validationResult.success;
export const registryError = validationResult.error;
export const registryErrorDetails = validationResult.errorDetails;

export const registries: Registries = validationResult.success
  ? validationResult.registries!
  : {
      fonts: [],
      layouts: [],
      radius: [],
      shadows: [],
      spacing: [],
      presets: [],
    };

// Convenience lookup helpers
export function getFontEntry(id: string): FontEntry | undefined {
  return registries.fonts.find((f) => f.id === id);
}

export function getLayoutEntry(id: string): LayoutEntry | undefined {
  return registries.layouts.find((l) => l.id === id);
}

export function getRadiusEntry(id: string): RadiusEntry | undefined {
  return registries.radius.find((r) => r.id === id);
}

export function getShadowEntry(id: string): ShadowEntry | undefined {
  return registries.shadows.find((s) => s.id === id);
}

export function getSpacingEntry(id: string): SpacingEntry | undefined {
  return registries.spacing.find((s) => s.id === id);
}

export function getPresetEntry(id: string): PresetEntry | undefined {
  return registries.presets.find((p) => p.id === id);
}


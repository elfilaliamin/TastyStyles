import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import type {
  IconLibrary,
  IconWeight,
} from '../../config/schema';
import {
  Check,
  Copy,
  Sliders,
  Feather,
} from 'lucide-react';
import { AppIcon, type IconName } from '../common/AppIcon';

interface LibraryOption {
  id: IconLibrary;
  name: string;
  badge: string;
  pkg: string;
  description: string;
}

const LIBRARIES: LibraryOption[] = [
  {
    id: 'lucide',
    name: 'Lucide Icons',
    badge: 'React & Tailwind',
    pkg: 'lucide-react',
    description: 'Clean geometric vector stroke icons. The official standard for modern web and SaaS apps.',
  },
  {
    id: 'tabler',
    name: 'Tabler Icons',
    badge: '5,200+ Icons',
    pkg: '@tabler/icons-react',
    description: 'Pixel-perfect stroke icon set crafted on a 24x24 grid for dashboards, analytics & tools.',
  },
  {
    id: 'phosphor',
    name: 'Phosphor Icons',
    badge: 'Figma Native',
    pkg: '@phosphor-icons/react',
    description: 'Flexible, consistent icon family with 6 distinct weights, duotone layers, and Figma sync.',
  },
  {
    id: 'heroicons',
    name: 'Heroicons',
    badge: 'Tailwind Standard',
    pkg: '@heroicons/react',
    description: 'Handcrafted UI icons by Tailwind Labs with dedicated outline and solid sets.',
  },
  {
    id: 'remix',
    name: 'Remix Icon',
    badge: '2,800+ Symbols',
    pkg: 'remixicon-react',
    description: 'Neutral-style system icons with balanced visual rhythm for web, iOS, and Android.',
  },
];

interface WeightOption {
  id: IconWeight;
  label: string;
  value: string;
  num: number;
}

const WEIGHTS: WeightOption[] = [
  { id: 'thin', label: 'Thin', value: '1.25px', num: 1.25 },
  { id: 'light', label: 'Light', value: '1.5px', num: 1.5 },
  { id: 'regular', label: 'Regular', value: '1.75px', num: 1.75 },
  { id: 'medium', label: 'Medium', value: '2.25px', num: 2.25 },
  { id: 'bold', label: 'Bold', value: '2.75px', num: 2.75 },
];

export const IconSection: React.FC = () => {
  const { state, dispatch } = useDesign();
  const [copied, setCopied] = useState(false);

  const icons = state.icons ?? {
    library: 'lucide',
    mode: 'outline',
    duotone: false,
    weight: 'regular',
  };

  const currentLibrary = icons.library;
  const currentMode = icons.mode;
  const isDuotone = icons.duotone;
  const currentWeight = icons.weight;

  const currentWeightDef =
    WEIGHTS.find((w) => w.id === currentWeight) ?? WEIGHTS[2];
  const activeLibDef =
    LIBRARIES.find((l) => l.id === currentLibrary) ?? LIBRARIES[0];

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(`npm i ${activeLibDef.pkg}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* 1. ICON LIBRARIES SELECTOR */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-sky-500" />
            Icon Library
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            {LIBRARIES.length} Available
          </span>
        </label>

        <div className="grid grid-cols-1 gap-2">
          {LIBRARIES.map((lib) => {
            const isSelected = currentLibrary === lib.id;

            return (
              <button
                key={lib.id}
                type="button"
                onClick={() =>
                  dispatch({ type: 'SET_ICON_LIBRARY', library: lib.id })
                }
                className={`p-2.5 rounded-xl border text-left transition-all focus-ring group cursor-pointer ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/70 dark:bg-sky-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-sky-500 bg-sky-500'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        isSelected
                          ? 'text-sky-600 dark:text-sky-400'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {lib.name}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {lib.badge}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 pl-5.5 leading-snug">
                  {lib.description}
                </p>

                <div className="mt-2 pl-5.5 flex items-center gap-2">
                  <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    npm i {lib.pkg}
                  </code>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ICON SETTINGS: OUTLINE/SOLID, DUOTONE, WEIGHTS */}
      <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-sky-500" />
            Icon Geometry & Styling
          </span>
          <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-semibold uppercase">
            {currentMode} • {currentWeightDef.value}
          </span>
        </div>

        {/* Setting A: Outline vs Solid */}
        <div>
          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
            Style Mode (Outline / Solid)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_ICON_MODE', mode: 'outline' })}
              className={`p-2 rounded-lg border text-center transition-all focus-ring cursor-pointer flex flex-col items-center gap-1 ${
                currentMode === 'outline'
                  ? 'border-sky-500 bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm ring-1 ring-sky-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="w-5 h-5 rounded border-2 border-current flex items-center justify-center">
                <div className="w-1.5 h-1.5 border border-current rounded-full" />
              </div>
              <span className="text-xs font-bold">Outline</span>
              <span className="text-[10px] opacity-75">Stroked paths</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_ICON_MODE', mode: 'solid' })}
              className={`p-2 rounded-lg border text-center transition-all focus-ring cursor-pointer flex flex-col items-center gap-1 ${
                currentMode === 'solid'
                  ? 'border-sky-500 bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm ring-1 ring-sky-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="w-5 h-5 rounded bg-current flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white dark:bg-slate-900 rounded-full" />
              </div>
              <span className="text-xs font-bold">Solid</span>
              <span className="text-[10px] opacity-75">Filled silhouettes</span>
            </button>
          </div>
        </div>

        {/* Setting B: Duotone Accent */}
        <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Duotone Accent
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Adds 20% accent fill beneath stroke paths for visual depth
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                dispatch({ type: 'SET_ICON_DUOTONE', duotone: !isDuotone })
              }
              role="switch"
              aria-checked={isDuotone}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring ${
                isDuotone ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isDuotone ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Setting C: Weights (Stroke Widths) */}
        <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
            Stroke Weight
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {WEIGHTS.map((w) => {
              const isSelected = currentWeight === w.id;

              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'SET_ICON_WEIGHT', weight: w.id })
                  }
                  className={`p-1.5 rounded-lg border text-center transition-all focus-ring cursor-pointer flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'border-sky-500 bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm ring-1 ring-sky-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800'
                  }`}
                  title={`${w.label} (${w.value})`}
                >
                  <div
                    className="w-5 h-0.5 rounded-full transition-all"
                    style={{
                      backgroundColor: 'currentColor',
                      height: `${w.num}px`,
                    }}
                  />
                  <span className="text-[11px] font-bold leading-none">
                    {w.label}
                  </span>
                  <span className="text-[9px] font-mono opacity-70">
                    {w.value}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. LIVE INTERACTIVE ICON PREVIEW MATRIX */}
      <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Live Icon Geometry
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyInstall}
            className="text-[10px] font-mono px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            title="Copy install command"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>npm i {activeLibDef.pkg}</span>
              </>
            )}
          </button>
        </div>

        {/* 8 Live Icons Matrix rendered with active library */}
        <div className="grid grid-cols-4 gap-2 py-1">
          {([
            { id: 'sparkles' as IconName, name: 'Sparkles' },
            { id: 'shield' as IconName, name: 'Shield' },
            { id: 'palette' as IconName, name: 'Palette' },
            { id: 'layers' as IconName, name: 'Layers' },
            { id: 'settings' as IconName, name: 'Settings' },
            { id: 'search' as IconName, name: 'Search' },
            { id: 'bell' as IconName, name: 'Bell' },
            { id: 'folder' as IconName, name: 'Folder' },
          ]).map(({ id, name }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center p-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 gap-1.5 transition-all group hover:border-sky-300 dark:hover:border-sky-800"
            >
              <div
                className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${
                  currentMode === 'solid'
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                    : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                <AppIcon name={id} size={20} />
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 group-hover:text-sky-500 transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

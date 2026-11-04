import React from 'react';
import { useDesign } from '../../context/DesignContext';
import type { DesignState } from '../../config/schema';
import { Sparkles, Shield, Palette } from 'lucide-react';

interface IconStyleOption {
  id: DesignState['iconStyle'];
  title: string;
  subtitle: string;
  description: string;
  strokeWidth: number;
  isDuotone?: boolean;
  isBadged?: boolean;
}

const ICON_OPTIONS: IconStyleOption[] = [
  {
    id: 'clean-outline',
    title: 'Clean Outline',
    subtitle: '1.75px Classic Stroke',
    description: 'Modern, balanced stroke with crisp line terminals. The industry standard for SaaS and web apps.',
    strokeWidth: 1.75,
  },
  {
    id: 'bold-stroke',
    title: 'Bold Stroke',
    subtitle: '2.5px Heavy Stroke',
    description: 'High-visibility, expressive line weight providing strong visual anchor points and immediate recognition.',
    strokeWidth: 2.5,
  },
  {
    id: 'minimal-thin',
    title: 'Minimal Thin',
    subtitle: '1.25px Refined Stroke',
    description: 'Delicate, technical line weight designed for luxury brands, complex data tools, and editorial layouts.',
    strokeWidth: 1.25,
  },
  {
    id: 'duotone',
    title: 'Duotone Accent',
    subtitle: 'Multi-Tone Layered',
    description: 'Rich two-tone depth featuring high-contrast stroke outlines with soft tinted accent surface fills.',
    strokeWidth: 1.75,
    isDuotone: true,
  },
  {
    id: 'solid-badge',
    title: 'Solid Badge',
    subtitle: 'Enclosed Geo Badge',
    description: 'Icons encapsulated inside soft geometric surface containers with subtle borders and shadows.',
    strokeWidth: 1.75,
    isBadged: true,
  },
];

export const IconSection: React.FC = () => {
  const { state, dispatch } = useDesign();
  const currentStyle = state.iconStyle ?? 'clean-outline';

  const handleSelect = (style: DesignState['iconStyle']) => {
    dispatch({ type: 'SET_ICON_STYLE', style });
  };

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-1 gap-2">
        {ICON_OPTIONS.map((opt) => {
          const isSelected = currentStyle === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 focus-ring group cursor-pointer ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/70 dark:bg-sky-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-900'
              }`}
            >
              {/* Live Icon Sample Box */}
              <div
                className={`flex items-center gap-1.5 p-2 rounded-lg border transition-colors flex-shrink-0 ${
                  isSelected
                    ? 'border-sky-400 dark:border-sky-600 bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400'
                    : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300'
                }`}
              >
                {[Sparkles, Shield, Palette].map((Icon, i) => (
                  <div
                    key={i}
                    className={opt.isBadged ? 'p-1 rounded bg-slate-200/60 dark:bg-slate-800' : ''}
                  >
                    <Icon
                      style={{
                        width: '16px',
                        height: '16px',
                        fill: opt.isDuotone ? 'currentColor' : 'none',
                        fillOpacity: opt.isDuotone ? 0.2 : 0,
                      }}
                      strokeWidth={opt.strokeWidth}
                    />
                  </div>
                ))}
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-bold ${
                      isSelected
                        ? 'text-sky-600 dark:text-sky-400'
                        : 'text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400'
                    }`}
                  >
                    {opt.title}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {opt.subtitle}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-snug">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

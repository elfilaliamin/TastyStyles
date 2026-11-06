import React, { useState } from 'react';
import { PresetSection } from '../../controls/PresetSection';
import { ColorSection } from '../../controls/ColorSection';
import { TypographySection } from '../../controls/TypographySection';
import { ComponentSection } from '../../controls/ComponentSection';
import { IconSection } from '../../controls/IconSection';
import { ArrowLeft, ArrowRight, Sparkles, Palette, Type, Sliders, Shapes } from 'lucide-react';

interface ThemeStepProps {
  onBack: () => void;
  onNext: () => void;
}

type ThemeSubTab = 'presets' | 'colors' | 'typography' | 'components' | 'icons';

export const ThemeStep: React.FC<ThemeStepProps> = ({ onBack, onNext }) => {
  const [subTab, setSubTab] = useState<ThemeSubTab>('presets');

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold">
            4
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Style Theme & Design Tokens</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Fine-tune the design system tokens for your project. Choose from pre-crafted presets or customize colors, fonts, radius, shadows, and icons.
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="grid grid-cols-5 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setSubTab('presets')}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            subTab === 'presets'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Presets</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('colors')}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            subTab === 'colors'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('typography')}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            subTab === 'typography'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fonts</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('components')}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            subTab === 'components'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Shapes</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('icons')}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
            subTab === 'icons'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Shapes className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Icons</span>
        </button>
      </div>

      {/* Subtab Content */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3.5">
        {subTab === 'presets' && <PresetSection />}
        {subTab === 'colors' && <ColorSection />}
        {subTab === 'typography' && <TypographySection />}
        {subTab === 'components' && <ComponentSection />}
        {subTab === 'icons' && <IconSection />}
      </div>

      {/* Navigation Footer */}
      <div className="pt-3 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-2 shadow-sm transition-all"
        >
          <span>Review Project Brief</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};


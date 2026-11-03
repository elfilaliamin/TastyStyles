import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { Accordion } from '../common/Accordion';
import { ColorSection } from './ColorSection';
import { TypographySection } from './TypographySection';
import { LayoutSection } from './LayoutSection';
import { ComponentSection } from './ComponentSection';
import { PresetSection } from './PresetSection';
import { Palette, Type, LayoutGrid, Sliders, Sparkles } from 'lucide-react';

export const ControlsPanel: React.FC = () => {
  const { state, dispatch } = useDesign();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950/80 transition-colors">
      {/* Spec name header input */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <label htmlFor="design-system-name" className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
          System Name
        </label>
        <input
          id="design-system-name"
          type="text"
          value={state.name}
          onChange={(e) => dispatch({ type: 'SET_NAME', name: e.target.value })}
          className="w-full px-3 py-2 text-sm font-semibold rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-ring transition-colors"
          placeholder="e.g. TastyStyles Spec"
        />
      </div>

      {/* Accordion groups - scrollable list */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-200 dark:divide-slate-800/60 pb-16 lg:pb-6">
        <Accordion
          title="Presets"
          subtitle="Pre-configured design archetypes"
          icon={<Sparkles className="w-4 h-4" />}
          defaultOpen={false}
        >
          <PresetSection />
        </Accordion>

        <Accordion
          title="Colors & WCAG Contrast"
          subtitle="Light/dark palette and contrast"
          icon={<Palette className="w-4 h-4" />}
          defaultOpen={true}
        >
          <ColorSection />
        </Accordion>

        <Accordion
          title="Typography"
          subtitle="Google Fonts, scale, and base size"
          icon={<Type className="w-4 h-4" />}
          defaultOpen={true}
        >
          <TypographySection />
        </Accordion>

        <Accordion
          title="Layout"
          subtitle="Responsive layout options for active preview"
          icon={<LayoutGrid className="w-4 h-4 text-sky-500" />}
          defaultOpen={true}
        >
          <LayoutSection />
        </Accordion>

        <Accordion
          title="Component Styling"
          subtitle="Radius, shadows, and spacing tokens"
          icon={<Sliders className="w-4 h-4" />}
          defaultOpen={true}
        >
          <ComponentSection />
        </Accordion>
      </div>
    </div>
  );
};

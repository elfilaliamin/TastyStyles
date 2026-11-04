import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { Accordion } from '../common/Accordion';
import { ColorSection } from './ColorSection';
import { TypographySection } from './TypographySection';
import { LayoutSection } from './LayoutSection';
import { ComponentSection } from './ComponentSection';
import { IconSection } from './IconSection';
import { PresetSection } from './PresetSection';
import { Palette, Type, LayoutGrid, Sliders, Sparkles, Shapes } from 'lucide-react';
import { GOAL_DEFINITIONS } from '../../config/previews';
import type { ProjectGoal } from '../../config/schema';
import { GoalSelector } from './GoalSelector';

export const ControlsPanel: React.FC = () => {
  const { state, dispatch, setActivePreview } = useDesign();
  const currentGoal: ProjectGoal = state.projectGoal ?? 'saas';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950/80 transition-colors">
      {/* Spec name header input */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <label htmlFor="design-system-name" className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
          System Name
        </label>
        <input
          id="design-system-name"
          type="text"
          value={state.name}
          onChange={(e) => dispatch({ type: 'SET_NAME', name: e.target.value })}
          className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-ring transition-colors"
          placeholder="e.g. TastyStyles Spec"
        />
      </div>

      {/* Target Goal / Sector Selector */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 transition-colors">
        <GoalSelector
          currentGoal={currentGoal}
          onSelectGoal={(nextGoal) => {
            dispatch({ type: 'SET_PROJECT_GOAL', goal: nextGoal });
            const def = GOAL_DEFINITIONS[nextGoal];
            if (def?.recommendedPreviews?.[0]) {
              setActivePreview(def.recommendedPreviews[0]);
            }
          }}
        />
      </div>

      {/* Accordion groups - scrollable list (all menus inside collapsed by default) */}
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
          defaultOpen={false}
        >
          <ColorSection />
        </Accordion>

        <Accordion
          title="Typography"
          subtitle="Google Fonts, scale, and base size"
          icon={<Type className="w-4 h-4" />}
          defaultOpen={false}
        >
          <TypographySection />
        </Accordion>

        <Accordion
          title="Icons & Libraries"
          subtitle="Icon libraries, outline/solid, duotone & weights"
          icon={<Shapes className="w-4 h-4 text-sky-500" />}
          defaultOpen={false}
        >
          <IconSection />
        </Accordion>

        <Accordion
          title="Layout"
          subtitle="Responsive layout options for active preview"
          icon={<LayoutGrid className="w-4 h-4 text-sky-500" />}
          defaultOpen={false}
        >
          <LayoutSection />
        </Accordion>

        <Accordion
          title="Component Styling"
          subtitle="Radius, shadows, and spacing tokens"
          icon={<Sliders className="w-4 h-4" />}
          defaultOpen={false}
        >
          <ComponentSection />
        </Accordion>
      </div>
    </div>
  );
};

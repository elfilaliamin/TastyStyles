import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { Accordion } from '../common/Accordion';
import { ColorSection } from './ColorSection';
import { TypographySection } from './TypographySection';
import { LayoutSection } from './LayoutSection';
import { ComponentSection } from './ComponentSection';
import { IconSection } from './IconSection';
import { PresetSection } from './PresetSection';
import { Palette, Type, LayoutGrid, Sliders, Sparkles, Shapes, PanelLeftClose } from 'lucide-react';

interface ControlsPanelProps {
  onClose?: () => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ onClose }) => {
  const { state, dispatch } = useDesign();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950/80 transition-colors">
      {/* Spec name header input */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="design-system-name" className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            System Name
          </label>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus-ring"
              title="Collapse Editor Sidebar (Ctrl+B)"
              aria-label="Collapse Editor Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>
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

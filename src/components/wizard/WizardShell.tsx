import React, { useState } from 'react';
import { PurposeStep } from './steps/PurposeStep';
import { PagesStep } from './steps/PagesStep';
import { LayoutsStep } from './steps/LayoutsStep';
import { ThemeStep } from './steps/ThemeStep';
import { ReviewStep } from './steps/ReviewStep';
import { ControlsPanel } from '../controls/ControlsPanel';
import {
  Sparkles,
  Layers,
  LayoutTemplate,
  Palette,
  CheckCircle2,
  Sliders,
  Compass,
} from 'lucide-react';

export type WizardStepId = 'purpose' | 'pages' | 'layouts' | 'theme' | 'review';

interface WizardShellProps {
  onOpenExportModal: () => void;
  onNotify?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const WizardShell: React.FC<WizardShellProps> = ({ onOpenExportModal, onNotify }) => {
  const [currentStep, setCurrentStep] = useState<WizardStepId>('purpose');
  const [mode, setMode] = useState<'wizard' | 'advanced'>('wizard');

  const steps: Array<{ id: WizardStepId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'purpose', label: 'Purpose', icon: Sparkles },
    { id: 'pages', label: 'Pages', icon: Layers },
    { id: 'layouts', label: 'Layouts', icon: LayoutTemplate },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'review', label: 'Review', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950/80 transition-colors">
      {/* Top Stepper Bar & Mode Switcher */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
        {mode === 'wizard' ? (
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none flex-1">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isPast = idx < currentStepIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap focus-ring ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : isPast
                      ? 'text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/40'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Advanced Token Controls
            </span>
          </div>
        )}

        {/* Mode Toggle Button */}
        <button
          type="button"
          onClick={() => setMode(mode === 'wizard' ? 'advanced' : 'wizard')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-slate-900 transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          {mode === 'wizard' ? (
            <>
              <Sliders className="w-3 h-3 text-slate-500" />
              <span>Advanced</span>
            </>
          ) : (
            <>
              <Compass className="w-3 h-3 text-sky-500" />
              <span>Wizard</span>
            </>
          )}
        </button>
      </div>

      {/* Main Step Content Area */}
      <div className="flex-1 overflow-y-auto">
        {mode === 'advanced' ? (
          <ControlsPanel />
        ) : (
          <>
            {currentStep === 'purpose' && (
              <PurposeStep onNext={() => setCurrentStep('pages')} />
            )}
            {currentStep === 'pages' && (
              <PagesStep
                onBack={() => setCurrentStep('purpose')}
                onNext={() => setCurrentStep('layouts')}
              />
            )}
            {currentStep === 'layouts' && (
              <LayoutsStep
                onBack={() => setCurrentStep('pages')}
                onNext={() => setCurrentStep('theme')}
              />
            )}
            {currentStep === 'theme' && (
              <ThemeStep
                onBack={() => setCurrentStep('layouts')}
                onNext={() => setCurrentStep('review')}
              />
            )}
            {currentStep === 'review' && (
              <ReviewStep
                onBack={() => setCurrentStep('theme')}
                onOpenExportModal={onOpenExportModal}
                onNotify={onNotify}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};


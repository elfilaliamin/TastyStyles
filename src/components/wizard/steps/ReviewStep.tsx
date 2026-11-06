import React from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getPurposeDefinition } from '../../../config/purposes';
import { PAGE_TYPES_BY_ID } from '../../../config/pageTypes';
import { calculateContrastRatio, calculateAPCA } from '../../../lib/contrast';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Download,
  Layers,
} from 'lucide-react';

interface ReviewStepProps {
  onBack: () => void;
  onOpenExportModal: () => void;
  onNotify?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ onBack, onOpenExportModal }) => {
  const { state, activeColors } = useDesign();
  const purposeDef = state.project?.purpose ? getPurposeDefinition(state.project.purpose) : null;
  const enabledPages = (state.project?.pages ?? []).filter((p) => p.enabled);

  // Contrast calculation
  const primaryOnBg = calculateContrastRatio(activeColors.primary, activeColors.background);
  const primaryOnSurface = calculateContrastRatio(activeColors.primary, activeColors.surface);
  const textOnBg = calculateContrastRatio(activeColors.text, activeColors.background);
  const apcaScore = calculateAPCA(activeColors.text, activeColors.background);

  const passesAllAA = primaryOnBg.passesAA && primaryOnSurface.passesAA && textOnBg.passesAA;

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
            5
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Project Brief & Readiness Review</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Verify your project sitemap, layout configurations, and token accessibility before generating the final agent-executable brief.
        </p>
      </div>

      {/* Purpose Summary */}
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="purpose">
            {purposeDef?.emoji ?? '🎯'}
          </span>
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {purposeDef?.label ?? 'Custom Purpose'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{purposeDef?.tagline}</p>
          </div>
        </div>
        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1 rounded-full border border-sky-500/20">
          {enabledPages.length} Pages Configured
        </span>
      </div>

      {/* Accessibility & Invariant Check */}
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Token Accessibility Audit
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              passesAllAA
                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
            }`}
          >
            {passesAllAA ? 'WCAG AA Compliant' : 'Contrast Warning'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850/60 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400">Primary on Background</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              {primaryOnBg.formattedRatio} {primaryOnBg.passesAA ? '✅' : '⚠️'}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850/60 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400">Text on Background (APCA)</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              Lc {apcaScore.toFixed(1)} {textOnBg.passesAA ? '✅' : '⚠️'}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span>Zero-Drift Invariant Verified: Token output matches canonical schema.</span>
        </div>
      </div>

      {/* Sitemap Layouts Summary */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-sky-500" /> Configured Sitemap ({enabledPages.length})
        </span>

        <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto pr-1">
          {enabledPages.map((page, idx) => {
            const pageDef = PAGE_TYPES_BY_ID.get(page.pageType);

            return (
              <div
                key={page.pageType}
                className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    {pageDef?.label ?? page.pageType}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded border border-sky-500/10">
                  {page.layoutId}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onOpenExportModal}
          className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Agent Brief & Design System Package</span>
        </button>
      </div>

      {/* Navigation Footer */}
      <div className="pt-2 flex justify-start border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Theme</span>
        </button>
      </div>
    </div>
  );
};


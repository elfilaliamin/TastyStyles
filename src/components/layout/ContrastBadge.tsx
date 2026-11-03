import React from 'react';
import { calculateContrastRatio } from '../../lib/contrast';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ContrastBadgeProps {
  foreground: string;
  background: string;
  label: string;
}

export const ContrastBadge: React.FC<ContrastBadgeProps> = ({ foreground, background, label }) => {
  const result = calculateContrastRatio(foreground, background);
  const isPassing = result.passesAA;

  return (
    <div
      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors ${
        isPassing
          ? 'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-200'
      }`}
    >
      <div className="flex items-center gap-2">
        {isPassing ? (
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        ) : (
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        )}
        <span className="font-medium text-[11px] text-slate-800 dark:text-slate-200">{label}:</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono font-semibold">{result.formattedRatio}</span>
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            isPassing
              ? result.passesAAA
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                : 'bg-sky-500/20 text-sky-700 dark:text-sky-300'
              : 'bg-red-500/20 text-red-700 dark:text-red-300'
          }`}
        >
          {result.level}
        </span>
      </div>
    </div>
  );
};

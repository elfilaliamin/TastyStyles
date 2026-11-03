import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: string;
  errorDetails?: Array<{ path: string; message: string }>;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, errorDetails }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900 border border-red-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 text-red-400 mb-4">
          <AlertTriangle className="w-8 h-8 flex-shrink-0" />
          <h1 className="text-xl font-bold tracking-tight">Configuration Registry Error</h1>
        </div>
        <p className="text-slate-300 text-sm mb-4">
          {error || 'One or more style registry JSON files in src/config/ failed validation.'}
        </p>

        {errorDetails && errorDetails.length > 0 && (
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-6 font-mono text-xs overflow-x-auto max-h-60">
            <div className="text-red-400 font-semibold mb-2">Validation Issues:</div>
            {errorDetails.map((issue, idx) => (
              <div key={idx} className="mb-1 text-slate-300">
                <span className="text-amber-400 font-bold">{issue.path || 'root'}</span>: {issue.message}
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-slate-400 mb-6 bg-slate-800/50 p-3 rounded-lg">
          Please check your entries in <code className="text-sky-300">src/config/*.json</code> against <code className="text-sky-300">src/config/schema.ts</code>.
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-colors focus-ring"
        >
          <RefreshCw className="w-4 h-4" />
          Reload Application
        </button>
      </div>
    </div>
  );
};


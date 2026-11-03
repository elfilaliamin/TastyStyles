export interface Option<T extends string = string> {
  id: T;
  label: string;
  sublabel?: string;
}

interface SegmentedControlProps<T extends string> {
  label?: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block">{label}</label>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors">
        {options.map((option) => {
          const isSelected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-lg transition-all text-center flex flex-col items-center justify-center focus-ring ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/80'
              }`}
            >
              <span>{option.label}</span>
              {option.sublabel && (
                <span
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {option.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

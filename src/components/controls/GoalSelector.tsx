import React, { useState, useRef, useEffect } from 'react';
import { Target, ChevronDown, Check, Search } from 'lucide-react';
import { GOAL_DEFINITIONS } from '../../config/previews';
import type { ProjectGoal } from '../../config/schema';

interface GoalSelectorProps {
  currentGoal: ProjectGoal;
  onSelectGoal: (goal: ProjectGoal) => void;
}

export const GoalSelector: React.FC<GoalSelectorProps> = ({ currentGoal, onSelectGoal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeDef = GOAL_DEFINITIONS[currentGoal] ?? GOAL_DEFINITIONS.saas;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearch('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const allGoals = Object.values(GOAL_DEFINITIONS);
  const filteredGoals = search.trim()
    ? allGoals.filter(
        (g) =>
          g.label.toLowerCase().includes(search.toLowerCase()) ||
          g.tagline.toLowerCase().includes(search.toLowerCase())
      )
    : allGoals;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Header Label Bar */}
      <div className="flex items-center justify-between mb-1.5">
        <label
          id="goal-selector-label"
          className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
        >
          <Target className="w-3.5 h-3.5 text-sky-500" />
          <span>Target Goal / Sector</span>
        </label>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-semibold border border-sky-200 dark:border-sky-800">
          {activeDef.emoji} Active
        </span>
      </div>

      {/* Custom Trigger Button */}
      <button
        type="button"
        aria-labelledby="goal-selector-label"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 focus-ring shadow-sm transition-all duration-150 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/70 border border-sky-200/80 dark:border-sky-800/80 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
            {activeDef.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate flex items-center gap-1.5">
              <span>{activeDef.label}</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight">
              {activeDef.tagline}
            </div>
          </div>
        </div>

        <div className="pl-2 shrink-0">
          <ChevronDown
            className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-sky-500' : ''
            }`}
          />
        </div>
      </button>

      {/* Floating Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select target project goal"
          className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95"
        >
          {/* Quick Filter Search Bar */}
          <div className="p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sector or purpose..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          {/* Goals Options List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-1">
            {filteredGoals.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching sectors found
              </div>
            ) : (
              filteredGoals.map((goal) => {
                const isSelected = goal.id === currentGoal;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelectGoal(goal.id);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500/10 dark:bg-sky-500/15 text-sky-900 dark:text-sky-200'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0 border ${
                          isSelected
                            ? 'bg-sky-500/20 border-sky-400/50'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700/80'
                        }`}
                      >
                        {goal.emoji}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{goal.label}</span>
                          <span className="text-[9px] px-1 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-normal">
                            {goal.recommendedPreviews.length} views
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                          {goal.tagline}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="shrink-0 text-sky-500 pr-1">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

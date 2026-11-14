import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavRowProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  counts?: Record<string, number>;
  className?: string;
}

export const CategoryNavRow: React.FC<CategoryNavRowProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  counts,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const distance = 140;
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 250);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    if (e.deltaY !== 0) {
      el.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  const handleSelect = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    onSelectCategory(cat);
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className={`relative flex items-center gap-1 ${className}`}>
      {/* Scroll Left Button */}
      <button
        type="button"
        onClick={() => handleScroll('left')}
        disabled={!canScrollLeft}
        aria-label="Scroll categories left"
        className={`p-1 rounded-md transition-all flex-shrink-0 cursor-pointer ${
          canScrollLeft
            ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-xs'
            : 'opacity-25 text-slate-400 cursor-not-allowed border border-transparent'
        }`}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Tabs Track */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        onWheel={handleWheel}
        className="flex items-center gap-1 overflow-x-auto py-1 px-0.5 scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.4) transparent',
        }}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = counts ? counts[cat] : undefined;

          return (
            <button
              key={cat}
              type="button"
              onClick={(e) => handleSelect(cat, e)}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-1 cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs scale-[1.02]'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80'
              }`}
            >
              <span>{cat}</span>
              {count !== undefined && (
                <span
                  className={`text-[9px] px-1 py-0.2 rounded-full font-mono ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/70 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        disabled={!canScrollRight}
        aria-label="Scroll categories right"
        className={`p-1 rounded-md transition-all flex-shrink-0 cursor-pointer ${
          canScrollRight
            ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-xs'
            : 'opacity-25 text-slate-400 cursor-not-allowed border border-transparent'
        }`}
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

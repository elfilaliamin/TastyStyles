import React from 'react';
import { AppIcon } from '../common/AppIcon';

export interface FilterFacetOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterFacet {
  id: string;
  label: string;
  options: FilterFacetOption[];
}

export interface FilterToolbarBlockProps {
  searchPlaceholder?: string;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  facets?: FilterFacet[];
  activeFacetValues?: Record<string, string>;
  onFacetChange?: (facetId: string, value: string) => void;
  sortOptions?: Array<{ label: string; value: string }>;
  activeSort?: string;
  onSortChange?: (val: string) => void;
  totalResults?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FilterToolbarBlock: React.FC<FilterToolbarBlockProps> = ({
  searchPlaceholder = 'Search items, tags, categories...',
  searchTerm = '',
  onSearchChange,
  facets = [],
  activeFacetValues = {},
  onFacetChange,
  sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Highest Rated', value: 'rating' },
  ],
  activeSort = 'featured',
  onSortChange,
  totalResults,
  className = '',
  style = {},
}) => {

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-sm)',
        padding: 'var(--ts-space-md)',
        backgroundColor: 'var(--ts-color-surface)',
        border: '1px solid var(--ts-color-border)',
        borderRadius: 'var(--ts-radius)',
        boxShadow: 'var(--ts-shadow)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Top Search & Sort Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--ts-space-sm)' }}>
        {/* Search Input Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            padding: '6px 12px',
            fontSize: 'calc(var(--ts-base-size) * 0.85)',
            flex: '1 1 260px',
            maxWidth: '480px',
          }}
        >
          <AppIcon name="search" size={15} style={{ opacity: 0.5 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: 'var(--ts-color-text)',
              width: '100%',
              fontSize: 'inherit',
            }}
          />
        </div>

        {/* Right side: Sort + Results Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {totalResults !== undefined && (
            <span style={{ fontSize: '12px', opacity: 0.7 }}>
              <strong style={{ opacity: 1 }}>{totalResults}</strong> results
            </span>
          )}

          {sortOptions.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', opacity: 0.6 }}>Sort:</span>
              <select
                value={activeSort}
                onChange={(e) => onSortChange?.(e.target.value)}
                style={{
                  backgroundColor: 'var(--ts-color-background)',
                  color: 'var(--ts-color-text)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  padding: '5px 8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Filter Facet Pills */}
      {facets.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingTop: '4px' }}>
          {facets.map((facet) => {
            const currentVal = activeFacetValues[facet.id] ?? 'all';
            return (
              <div key={facet.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>{facet.label}:</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {facet.options.map((opt) => {
                    const isSelected = currentVal === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onFacetChange?.(facet.id, opt.value)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 'var(--ts-radius)',
                          border: isSelected ? '1px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                          backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.12)' : 'var(--ts-color-background)',
                          color: isSelected ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                          fontSize: '11px',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>{opt.label}</span>
                        {opt.count !== undefined && (
                          <span style={{ opacity: 0.6, fontSize: '10px' }}>({opt.count})</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

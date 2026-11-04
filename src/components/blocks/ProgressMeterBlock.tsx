import React from 'react';

export interface ProgressMeterBlockProps {
  label: string;
  currentValue: number;
  targetValue: number;
  unitPrefix?: string;
  unitSuffix?: string;
  subtitle?: string;
  variant?: 'linear' | 'thermometer' | 'pill';
  badge?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ProgressMeterBlock: React.FC<ProgressMeterBlockProps> = ({
  label,
  currentValue,
  targetValue,
  unitPrefix = '',
  unitSuffix = '',
  subtitle,
  variant = 'linear',
  badge,
  className = '',
  style = {},
}) => {
  const percentage = Math.min(Math.round((currentValue / (targetValue || 1)) * 100), 100);

  return (
    <div
      className={className}
      style={{
        padding: 'var(--ts-space-md)',
        backgroundColor: 'var(--ts-color-surface)',
        border: '1px solid var(--ts-color-border)',
        borderRadius: 'var(--ts-radius)',
        boxShadow: 'var(--ts-shadow)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.7 }}>
            {label}
          </span>
          {badge && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                color: 'var(--ts-color-primary)',
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '14px', color: 'var(--ts-color-primary)' }}>
          {percentage}%
        </div>
      </div>

      {/* Progress Track */}
      <div
        style={{
          width: '100%',
          height: variant === 'thermometer' ? '12px' : '8px',
          borderRadius: '9999px',
          backgroundColor: 'var(--ts-color-background)',
          border: '1px solid var(--ts-color-border)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'var(--ts-color-primary)',
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '12px' }}>
        <div>
          <span style={{ fontWeight: 800, fontFamily: 'var(--ts-font-heading)' }}>
            {unitPrefix}{currentValue.toLocaleString()}{unitSuffix}
          </span>
          <span style={{ opacity: 0.6, marginLeft: '4px' }}>
            of {unitPrefix}{targetValue.toLocaleString()}{unitSuffix}
          </span>
        </div>
        {subtitle && (
          <span style={{ fontSize: '11px', opacity: 0.7, fontWeight: 500 }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

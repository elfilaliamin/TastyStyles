import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { getBestContrastingColor } from '../../lib/contrast';
import { AppIcon } from '../common/AppIcon';

export interface IdentityBadgeBlockProps {
  name: string;
  title?: string;
  avatarUrl?: string;
  initials?: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  statusText?: string;
  badge?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const IdentityBadgeBlock: React.FC<IdentityBadgeBlockProps> = ({
  name,
  title,
  initials,
  rating,
  reviewCount,
  verified = false,
  statusText,
  badge,
  className = '',
  style = {},
}) => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const fallbackInitials = initials ?? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--ts-space-md)',
        backgroundColor: 'var(--ts-color-surface)',
        border: '1px solid var(--ts-color-border)',
        borderRadius: 'var(--ts-radius)',
        boxShadow: 'var(--ts-shadow)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryTextColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '14px',
            flexShrink: 0,
          }}
        >
          {fallbackInitials}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
              {name}
            </span>
            {verified && (
              <span title="Verified Provider" style={{ color: 'var(--ts-color-primary)', display: 'inline-flex' }}>
                <AppIcon name="shieldCheck" size={15} />
              </span>
            )}
            {badge && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(2, 132, 199, 0.12)',
                  color: 'var(--ts-color-primary)',
                  border: '1px solid rgba(2, 132, 199, 0.25)',
                }}
              >
                {badge}
              </span>
            )}
          </div>
          {title && (
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7, marginTop: '1px' }}>
              {title}
            </div>
          )}
          {rating !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', marginTop: '3px' }}>
              <span style={{ color: '#f59e0b', display: 'inline-flex' }}>
                <AppIcon name="sparkles" size={12} />
              </span>
              <span style={{ fontWeight: 700 }}>{rating.toFixed(1)}</span>
              {reviewCount !== undefined && <span style={{ opacity: 0.6 }}>({reviewCount} reviews)</span>}
            </div>
          )}
        </div>
      </div>

      {statusText && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: 'var(--ts-radius)',
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span>{statusText}</span>
        </div>
      )}
    </div>
  );
};

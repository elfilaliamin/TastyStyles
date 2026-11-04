import React from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import { AppIcon } from '../../common/AppIcon';

export const FeedbackPreview: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-surface)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        borderRadius: 'var(--ts-radius-surface, 16px)',
        border: '1px solid var(--ts-color-border)',
        boxShadow: 'var(--ts-shadow)',
        padding: 'var(--ts-space-lg)',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-lg)',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 700,
            margin: 0,
          }}
        >
          Feedback, Badges & Overlays
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: 'var(--ts-base-size)', opacity: 0.8 }}>
          Informational banners, severity alerts, status chips, and contextual dialogs.
        </p>
      </div>

      {/* Alert Banners */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
        {/* Info Alert */}
        <div
          style={{
            padding: 'var(--ts-space-md)',
            borderRadius: 'var(--ts-radius)',
            backgroundColor: 'var(--ts-color-background)',
            borderLeft: '4px solid var(--ts-color-accent)',
            borderTop: '1px solid var(--ts-color-border)',
            borderRight: '1px solid var(--ts-color-border)',
            borderBottom: '1px solid var(--ts-color-border)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <AppIcon name="info" size={18} style={{ color: 'var(--ts-color-accent)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.9)' }}>
              Design Spec Synced
            </div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.8, marginTop: '2px' }}>
              Your design token registry changes were automatically formatted into standard CSS variables.
            </div>
          </div>
        </div>

        {/* Success Alert */}
        <div
          style={{
            padding: 'var(--ts-space-md)',
            borderRadius: 'var(--ts-radius)',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <AppIcon name="checkCircle" size={18} style={{ color: 'var(--color-success, #10b981)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.9)', color: 'var(--color-success, #10b981)' }}>
              WCAG 2.1 AA Compliance Verified
            </div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.8, marginTop: '2px' }}>
              All foreground and background combinations meet the minimum 4.5:1 ratio requirement.
            </div>
          </div>
        </div>

        {/* Warning Alert */}
        <div
          style={{
            padding: 'var(--ts-space-md)',
            borderRadius: 'var(--ts-radius)',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <AppIcon name="alert" size={18} style={{ color: 'var(--color-warning, #f59e0b)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.9)', color: 'var(--color-warning, #f59e0b)' }}>
              Unsaved Local Token Overrides
            </div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.8, marginTop: '2px' }}>
              Custom hex overrides exist in local memory. Export spec to persist into your codebase.
            </div>
          </div>
        </div>
      </div>

      {/* Badges / Chips Showcase */}
      <div>
        <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: 'var(--ts-space-sm)', opacity: 0.7 }}>
          Status Chips & Pills
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ts-space-xs)' }}>
          <span
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: '9999px',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
            }}
          >
            Primary Pill
          </span>

          <span
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              color: 'var(--ts-color-text)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 500,
            }}
          >
            Outlined Rounded
          </span>

          <span
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--ts-color-accent)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: '9999px',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
            }}
          >
            Accent Highlight
          </span>

          <span
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: 'var(--color-danger, #ef4444)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: '9999px',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
            }}
          >
            Error Tag
          </span>
        </div>
      </div>

      {/* Modal Dialog Snippet Preview */}
      <div
        style={{
          borderTop: '1px solid var(--ts-color-border)',
          paddingTop: 'var(--ts-space-md)',
        }}
      >
        <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: 'var(--ts-space-sm)', opacity: 0.7 }}>
          Embedded Dialog Simulation
        </div>
        <div
          style={{
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-md)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-sm)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AppIcon name="bell" size={16} style={{ color: 'var(--ts-color-primary)' }} />
              <span style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
                Publish Spec to Repository?
              </span>
            </div>
            <AppIcon name="close" size={16} style={{ opacity: 0.6, cursor: 'pointer' }} />
          </div>
          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8 }}>
            This will commit the updated Tailwind and CSS custom properties snippet directly to your git worktree.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--ts-space-xs)', marginTop: '4px' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--ts-color-border)',
                color: 'var(--ts-color-text)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Confirm Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

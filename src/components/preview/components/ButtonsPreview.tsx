import React from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import { ArrowRight, Download, Trash2, Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export const ButtonsPreview: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const accentTextColor = getBestContrastingColor(activeColors.accent);

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-surface)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        borderRadius: 'var(--ts-radius)',
        border: '1px solid var(--ts-color-border)',
        boxShadow: 'var(--ts-shadow)',
        padding: 'var(--ts-space-lg)',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-lg)',
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Sparkles style={{ width: '16px', height: '16px', color: 'var(--ts-color-accent)' }} />
          <h2
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Button & Action Controls
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: 'var(--ts-base-size)', opacity: 0.8 }}>
          Primary interactive hierarchy, hover and disabled states, and responsive touch sizes.
        </p>
      </div>

      {/* Primary & Variant Buttons Row */}
      <div>
        <div
          style={{
            fontSize: 'calc(var(--ts-base-size) * 0.8)',
            fontWeight: 600,
            marginBottom: 'var(--ts-space-sm)',
            opacity: 0.7,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Variant Hierarchy
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ts-space-sm)', alignItems: 'center' }}>
          {/* Primary */}
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <span>Primary Brand</span>
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </button>

          {/* Accent */}
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-accent)',
              color: accentTextColor,
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Sparkles style={{ width: '14px', height: '14px' }} />
            <span>Accent Action</span>
          </button>

          {/* Secondary Outline */}
          <button
            type="button"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--ts-color-text)',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Download style={{ width: '14px', height: '14px' }} />
            <span>Secondary Outline</span>
          </button>

          {/* Ghost / Subtle */}
          <button
            type="button"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--ts-color-text)',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid transparent',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Ghost Link
          </button>

          {/* Destructive */}
          <button
            type="button"
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              borderRadius: 'var(--ts-radius)',
              border: 'none',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Trash2 style={{ width: '14px', height: '14px' }} />
            <span>Destructive</span>
          </button>
        </div>
      </div>

      {/* Button Sizes Row */}
      <div>
        <div
          style={{
            fontSize: 'calc(var(--ts-base-size) * 0.8)',
            fontWeight: 600,
            marginBottom: 'var(--ts-space-sm)',
            opacity: 0.7,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Scale & Sizes
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ts-space-sm)', alignItems: 'center' }}>
          {/* Small */}
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Small (32px)
          </button>

          {/* Medium (Default) */}
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Medium (40px)
          </button>

          {/* Large */}
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-md) var(--ts-space-lg)',
              border: 'none',
              fontSize: 'var(--ts-base-size)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Large (48px)
          </button>
        </div>
      </div>

      {/* States: Disabled & Loading */}
      <div>
        <div
          style={{
            fontSize: 'calc(var(--ts-base-size) * 0.8)',
            fontWeight: 600,
            marginBottom: 'var(--ts-space-sm)',
            opacity: 0.7,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Interactive States
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ts-space-sm)', alignItems: 'center' }}>
          {/* Success Active */}
          <button
            type="button"
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 style={{ width: '15px', height: '15px' }} />
            <span>Success State</span>
          </button>

          {/* Loading */}
          <button
            type="button"
            disabled
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              opacity: 0.7,
              cursor: 'wait',
            }}
          >
            <Loader2 style={{ width: '15px', height: '15px', animation: 'spin 1s linear infinite' }} />
            <span>Processing...</span>
          </button>

          {/* Disabled */}
          <button
            type="button"
            disabled
            style={{
              backgroundColor: 'var(--ts-color-border)',
              color: 'var(--ts-color-text)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 500,
              opacity: 0.45,
              cursor: 'not-allowed',
            }}
          >
            Disabled State
          </button>

          {/* Icon Button */}
          <button
            type="button"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title="Send Message"
          >
            <Send style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};


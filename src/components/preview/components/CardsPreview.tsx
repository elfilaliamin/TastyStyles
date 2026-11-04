import React from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import { TrendingUp, Check, ArrowRight, Mail } from 'lucide-react';

export const CardsPreview: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '840px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-lg)',
        fontFamily: 'var(--ts-font-body)',
        color: 'var(--ts-color-text)',
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
          Cards & Content Surfaces
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: 'var(--ts-base-size)', opacity: 0.8 }}>
          Modular cards, elevation depths, and layout containers styled strictly via active tokens.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--ts-space-md)',
        }}
      >
        {/* Card 1: Metric KPI Card */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-lg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-md)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7, fontWeight: 500 }}>
                Total Generated Specs
              </span>
              <div
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.2)',
                  fontWeight: 800,
                  marginTop: '4px',
                }}
              >
                128,490
              </div>
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                fontSize: 'calc(var(--ts-base-size) * 0.75)',
                fontWeight: 600,
              }}
            >
              <TrendingUp style={{ width: '12px', height: '12px' }} />
              +24.8%
            </span>
          </div>

          {/* Mini trend visualization bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '48px', paddingTop: '8px' }}>
            {[30, 45, 25, 60, 80, 50, 75, 95, 85].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  backgroundColor: i === 8 ? 'var(--ts-color-accent)' : 'var(--ts-color-primary)',
                  borderRadius: 'calc(var(--ts-radius) * 0.4)',
                  opacity: i === 8 ? 1 : 0.65,
                }}
              />
            ))}
          </div>

          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.65 }}>
            Compared to previous 30-day window
          </div>
        </div>

        {/* Card 2: User Profile Card */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--ts-space-md)',
          }}
        >
          {/* Avatar with presence badge */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '9999px',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--ts-font-heading)',
                fontWeight: 700,
                fontSize: 'calc(var(--ts-base-size) * 1.2)',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              AR
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '14px',
                height: '14px',
                borderRadius: '9999px',
                backgroundColor: '#10b981',
                border: '2px solid var(--ts-color-surface)',
              }}
              title="Online"
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontWeight: 700,
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
              }}
            >
              Alex Rivers
            </div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.75 }}>
              Lead Systems Architect
            </div>
          </div>

          <span
            style={{
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: '9999px',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
              color: 'var(--ts-color-accent)',
            }}
          >
            Verified Author
          </span>

          <button
            type="button"
            style={{
              width: '100%',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Mail style={{ width: '14px', height: '14px' }} />
            <span>Connect Agent</span>
          </button>
        </div>

        {/* Card 3: Pricing Tier Card */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '2px solid var(--ts-color-accent)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-lg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-md)',
            position: 'relative',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                  fontWeight: 700,
                }}
              >
                Enterprise AI
              </span>
              <span
                style={{
                  backgroundColor: 'var(--ts-color-accent)',
                  color: getBestContrastingColor(activeColors.accent),
                  fontSize: 'calc(var(--ts-base-size) * 0.7)',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                POPULAR
              </span>
            </div>

            <div style={{ marginTop: 'var(--ts-space-sm)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.2)',
                  fontWeight: 800,
                }}
              >
                $49
              </span>
              <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7 }}>/ month</span>
            </div>

            {/* Features */}
            <div style={{ marginTop: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Unlimited Token Sync', 'Multi-Agent Handoff', 'WCAG Contrast Guard'].map((feat) => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                  <Check style={{ width: '14px', height: '14px', color: 'var(--ts-color-accent)', flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            style={{
              width: '100%',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <span>Upgrade Workspace</span>
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';

export const PricingPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const [annual, setAnnual] = useState(true);
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.pricing ?? 'cards-3col';

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever free',
      desc: 'Ideal for independent developers experimenting with design systems.',
      features: ['Up to 3 active projects', 'Standard Markdown export', 'Community support', 'Basic WCAG checks'],
      highlight: false,
    },
    {
      name: 'Professional',
      price: annual ? '$24' : '$29',
      period: 'per month',
      desc: 'For product teams standardizing design-to-code pipelines.',
      features: ['Unlimited design systems', 'Dynamic Google Fonts injection', 'AI Agent rule configs', 'Priority support', 'Custom style registries'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: annual ? '$79' : '$99',
      period: 'per seat / month',
      desc: 'Dedicated enterprise infrastructure with multi-repo synchronization.',
      features: ['Custom SSO & SAML', 'Dedicated Slack support', '99.99% uptime SLA', 'Audit log exports', 'Custom deployment targets'],
      highlight: false,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DynamicNavbar />
      <div
        style={{
          padding: 'var(--ts-space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-xl)',
          maxWidth: '880px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
      {/* Header with Title & Cycle Switcher */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ts-space-xs)' }}>
        <h1
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 800,
            margin: 0,
          }}
        >
          Simple, Transparent Plans
        </h1>
        <p style={{ margin: 0, fontSize: 'var(--ts-base-size)', opacity: 0.8, maxWidth: '500px' }}>
          Choose the right plan to accelerate your frontend engineering workflow.
        </p>

        {/* Billing cycle toggle */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: '9999px',
            padding: '4px',
            marginTop: 'var(--ts-space-sm)',
            gap: '4px',
          }}
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: !annual ? 'var(--ts-color-primary)' : 'transparent',
              color: !annual ? primaryTextColor : 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: annual ? 'var(--ts-color-primary)' : 'transparent',
              color: annual ? primaryTextColor : 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Annual (Save 20%)</span>
          </button>
        </div>
      </div>

      {/* 1. COMPACT LIST VIEW LAYOUT */}
      {layout === 'compact-toggle' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
          {plans.map((p) => (
            <div
              key={p.name}
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: p.highlight ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                boxShadow: 'var(--ts-shadow)',
                padding: 'var(--ts-space-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '16px' }}>{p.name}</span>
                  {p.highlight && (
                    <span style={{ backgroundColor: 'var(--ts-color-accent)', color: getBestContrastingColor(activeColors.accent), padding: '1px 8px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700 }}>
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.75 }}>{p.desc}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '20px' }}>{p.price}</span>
                  <span style={{ fontSize: '11px', opacity: 0.7, marginLeft: '4px' }}>{p.period}</span>
                </div>
                <button
                  type="button"
                  style={{
                    backgroundColor: p.highlight ? 'var(--ts-color-primary)' : 'transparent',
                    color: p.highlight ? primaryTextColor : 'var(--ts-color-text)',
                    border: p.highlight ? 'none' : '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Choose {p.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. MATRIX TABLE COMPARISON LAYOUT */}
      {layout === 'table-matrix' && (
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-md)',
            overflowX: 'auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--ts-color-border)', textAlign: 'left' }}>
                <th style={{ padding: '12px', fontSize: '14px' }}>Platform Features</th>
                <th style={{ padding: '12px', fontSize: '14px' }}>Starter ($0)</th>
                <th style={{ padding: '12px', fontSize: '14px', color: 'var(--ts-color-primary)' }}>Professional ({annual ? '$24' : '$29'})</th>
                <th style={{ padding: '12px', fontSize: '14px' }}>Enterprise ({annual ? '$79' : '$99'})</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feat: 'Active Design Systems', f1: '3', f2: 'Unlimited', f3: 'Unlimited' },
                { feat: 'Markdown AI Spec Generation', f1: '✓', f2: '✓', f3: '✓' },
                { feat: 'W3C DTCG Token Export (Figma)', f1: '—', f2: '✓', f3: '✓' },
                { feat: 'Full In-Memory ZIP Bundler', f1: '—', f2: '✓', f3: '✓' },
                { feat: 'WCAG 2.1 AAA Realtime Contrast', f1: 'Normal Text', f2: 'AA & AAA', f3: 'Custom Audits' },
                { feat: 'Dedicated SAML SSO & Slack Support', f1: '—', f2: '—', f3: '✓' },
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--ts-color-border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{row.feat}</td>
                  <td style={{ padding: '10px 12px', opacity: 0.8 }}>{row.f1}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--ts-color-primary)' }}>{row.f2}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{row.f3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. DEFAULT: 3-COLUMN TIER CARDS LAYOUT */}
      {layout === 'cards-3col' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--ts-space-md)',
            alignItems: 'stretch',
          }}
        >
          {plans.map((p) => (
            <div
              key={p.name}
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: p.highlight ? '2px solid var(--ts-color-accent)' : '1px solid var(--ts-color-border)',
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
              {p.highlight && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--ts-color-accent)',
                    color: getBestContrastingColor(activeColors.accent),
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    fontSize: 'calc(var(--ts-base-size) * 0.72)',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  MOST POPULAR
                </span>
              )}

              <div>
                <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))' }}>
                  {p.name}
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.75, minHeight: '36px' }}>
                  {p.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: 'var(--ts-space-md) 0' }}>
                  <span
                    style={{
                      fontFamily: 'var(--ts-font-heading)',
                      fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.3)',
                      fontWeight: 800,
                    }}
                  >
                    {p.price}
                  </span>
                  <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7 }}>{p.period}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.features.map((feat) => (
                    <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                      <AppIcon name="check" size={15} style={{ color: 'var(--ts-color-accent)', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                style={{
                  width: '100%',
                  backgroundColor: p.highlight ? 'var(--ts-color-primary)' : 'transparent',
                  color: p.highlight ? primaryTextColor : 'var(--ts-color-text)',
                  border: p.highlight ? 'none' : '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-sm) var(--ts-space-md)',
                  fontSize: 'calc(var(--ts-base-size) * 0.9)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <span>{p.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}</span>
                <AppIcon name="arrowRight" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

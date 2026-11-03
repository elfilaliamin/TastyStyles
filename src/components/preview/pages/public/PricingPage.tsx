import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { Check, ArrowRight } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { activeColors } = useDesign();
  const [annual, setAnnual] = useState(true);
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

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
        padding: 'var(--ts-space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-xl)',
        maxWidth: '880px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
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

      {/* Plan Cards Grid */}
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
              borderRadius: 'var(--ts-radius)',
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
                    <Check style={{ width: '15px', height: '15px', color: 'var(--ts-color-accent)', flexShrink: 0 }} />
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
                borderRadius: 'var(--ts-radius)',
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
              <ArrowRight style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Snapshot Table */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-md)',
          overflowX: 'auto',
        }}
      >
        <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, marginBottom: 'var(--ts-space-sm)' }}>
          Feature Matrix Snapshot
        </div>
        <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--ts-color-border)', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Capability</th>
              <th style={{ padding: '8px 12px' }}>Starter</th>
              <th style={{ padding: '8px 12px' }}>Professional</th>
              <th style={{ padding: '8px 12px' }}>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cap: 'Markdown AI Spec Generation', free: 'Basic', pro: 'Full (9 Sections)', ent: 'Full + Custom' },
              { cap: 'Automated WCAG Auditing', free: 'Normal Text', pro: 'AA & AAA + Alerts', ent: 'Custom Thresholds' },
              { cap: 'Multi-Stage Dockerfile', free: '—', pro: 'Included', ent: 'Hardened Distroless' },
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: idx === 2 ? 'none' : '1px solid var(--ts-color-border)', opacity: 0.9 }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>{row.cap}</td>
                <td style={{ padding: '8px 12px' }}>{row.free}</td>
                <td style={{ padding: '8px 12px', color: 'var(--ts-color-accent)', fontWeight: 600 }}>{row.pro}</td>
                <td style={{ padding: '8px 12px' }}>{row.ent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

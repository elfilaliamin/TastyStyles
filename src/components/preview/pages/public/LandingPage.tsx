import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { ArrowRight, Sparkles, Zap, Shield, Layers } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

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
      {/* Navbar */}
      <header
        style={{
          borderBottom: '1px solid var(--ts-color-border)',
          backgroundColor: 'var(--ts-color-surface)',
          padding: 'var(--ts-space-md) var(--ts-space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
            }}
          >
            A
          </div>
          <span
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontWeight: 700,
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
            }}
          >
            ApexDesign
          </span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-md)' }}>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8, cursor: 'pointer' }}>Features</span>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8, cursor: 'pointer' }}>Documentation</span>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8, cursor: 'pointer' }}>Pricing</span>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              boxShadow: 'var(--ts-shadow)',
              cursor: 'pointer',
            }}
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: 'var(--ts-space-xl) var(--ts-space-lg)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--ts-space-md)',
          maxWidth: '780px',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            borderRadius: '9999px',
            fontSize: 'calc(var(--ts-base-size) * 0.75)',
            fontWeight: 600,
            color: 'var(--ts-color-accent)',
          }}
        >
          <Sparkles style={{ width: '13px', height: '13px' }} />
          Next-Gen AI Design System Builder
        </span>

        <h1
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * var(--ts-scale) * 1.1)',
            fontWeight: 800,
            lineHeight: 1.15,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Build Beautiful Interfaces With Strict Token Precision
        </h1>

        <p
          style={{
            fontSize: 'var(--ts-base-size)',
            lineHeight: 1.6,
            opacity: 0.85,
            maxWidth: '580px',
            margin: 0,
          }}
        >
          Configure cohesive color palettes, typography scales, and modular components once.
          Export deterministic Markdown specifications that AI agents execute flawlessly.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ts-space-sm)', justifyContent: 'center', marginTop: 'var(--ts-space-xs)' }}>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-sm) var(--ts-space-lg)',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.95)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <span>Start Free Trial</span>
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </button>

          <button
            type="button"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--ts-color-text)',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              padding: 'var(--ts-space-sm) var(--ts-space-lg)',
              fontSize: 'calc(var(--ts-base-size) * 0.95)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Explore Live Demo
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section
        style={{
          padding: 'var(--ts-space-lg)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--ts-space-md)',
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {[
          { icon: <Zap style={{ width: '20px', height: '20px', color: 'var(--ts-color-accent)' }} />, title: 'Realtime Compilation', desc: 'Changes propagate across preview cards and spec documents in under 100ms.' },
          { icon: <Shield style={{ width: '20px', height: '20px', color: 'var(--ts-color-primary)' }} />, title: 'WCAG 2.1 Compliant', desc: 'Continuous contrast auditing ensures accessible typography ratios automatically.' },
          { icon: <Layers style={{ width: '20px', height: '20px', color: 'var(--ts-color-secondary)' }} />, title: 'Extensible Registries', desc: 'Add new styles in JSON configuration with zero manual component modification.' },
        ].map((feat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-xs)',
            }}
          >
            <div style={{ marginBottom: '4px' }}>{feat.icon}</div>
            <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))' }}>
              {feat.title}
            </div>
            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8, lineHeight: 1.5 }}>
              {feat.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid var(--ts-color-border)',
          padding: 'var(--ts-space-md) var(--ts-space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'calc(var(--ts-base-size) * 0.8)',
          opacity: 0.7,
        }}
      >
        <span>© 2026 ApexDesign System Inc.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Status</span>
        </div>
      </footer>
    </div>
  );
};

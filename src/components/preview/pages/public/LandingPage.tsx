import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { ArrowRight, Sparkles, Zap, Shield, Layers, CheckCircle2, Code2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.landing ?? 'hero-split';

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
      {/* Universal Navbar */}
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

      {/* 1. HERO SPLIT SHOWCASE LAYOUT */}
      {layout === 'hero-split' && (
        <section
          style={{
            padding: 'var(--ts-space-xl) var(--ts-space-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--ts-space-xl)',
            maxWidth: '1000px',
            margin: '0 auto',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                color: 'var(--ts-color-primary)',
                fontSize: 'calc(var(--ts-base-size) * 0.78)',
                fontWeight: 600,
                alignSelf: 'flex-start',
              }}
            >
              <Sparkles style={{ width: '13px', height: '13px' }} />
              Next-Gen Design System Token Compiler
            </span>
            <h1
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.3)',
                fontWeight: 900,
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Build UI tokens with deterministic precision.
            </h1>
            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.95)', opacity: 0.8, lineHeight: 1.5 }}>
              Deterministic token contracts tested with WCAG 2.1 AAA contrast and ready for autonomous AI coding agents.
            </p>
            <div style={{ display: 'flex', gap: 'var(--ts-space-sm)', flexWrap: 'wrap' }}>
              <button
                type="button"
                style={{
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  borderRadius: 'var(--ts-radius)',
                  padding: 'var(--ts-space-sm) var(--ts-space-lg)',
                  border: 'none',
                  fontSize: 'calc(var(--ts-base-size) * 0.9)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--ts-shadow)',
                  cursor: 'pointer',
                }}
              >
                <span>Compile Specification</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Mockup Card */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 style={{ width: '18px', height: '18px', color: 'var(--ts-color-accent)' }} />
              <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '13px' }}>tokens.config.json</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontFamily: 'monospace', opacity: 0.9 }}>
              <div>--color-primary: <span style={{ color: 'var(--ts-color-primary)', fontWeight: 700 }}>{activeColors.primary}</span></div>
              <div>--color-accent: <span style={{ color: 'var(--ts-color-accent)', fontWeight: 700 }}>{activeColors.accent}</span></div>
              <div>--radius-brand: <span>{state.radius}</span></div>
              <div>--font-heading: <span>{state.typography.headingFont}</span></div>
            </div>
            <div style={{ padding: '8px', borderRadius: 'var(--ts-radius)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: '14px', height: '14px' }} />
              <span>WCAG 2.1 Contrast Verified</span>
            </div>
          </div>
        </section>
      )}

      {/* 2. HERO CENTERED LAYOUT */}
      {layout === 'hero-centered' && (
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
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              color: 'var(--ts-color-primary)',
              fontSize: 'calc(var(--ts-base-size) * 0.78)',
              fontWeight: 600,
            }}
          >
            <Sparkles style={{ width: '13px', height: '13px' }} />
            Next-Gen Design System Token Compiler
          </span>

          <h1
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * var(--ts-scale) * 1.1)',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Design tokens built for autonomous agents.
          </h1>

          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))', opacity: 0.8, maxWidth: '600px', lineHeight: 1.5 }}>
            Generate zero-drift specifications, pure CSS custom property variables, and Tailwind themes.
          </p>

          <div style={{ display: 'flex', gap: 'var(--ts-space-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm) var(--ts-space-lg)',
                border: 'none',
                fontSize: 'calc(var(--ts-base-size) * 0.9)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--ts-shadow)',
                cursor: 'pointer',
              }}
            >
              <span>Compile Specification</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </section>
      )}

      {/* 3. FEATURE GRID LAYOUT */}
      {layout === 'feature-grid' && (
        <section style={{ padding: 'var(--ts-space-lg)', maxWidth: '960px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.2)', fontWeight: 800, margin: 0 }}>
              Engineered for Production Rigor
            </h2>
            <p style={{ margin: '4px 0 0 0', opacity: 0.7, fontSize: '13px' }}>
              Four pillars ensuring zero visual drift across autonomous agent builds.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--ts-space-md)' }}>
            {[
              { title: 'Zero Hallucinations', desc: 'Strict machine-readable rules eliminating guesswork.', icon: <Zap style={{ width: '20px', height: '20px', color: 'var(--ts-color-primary)' }} /> },
              { title: 'WCAG 2.1 AAA', desc: 'Real-time mathematical luminance verification formula.', icon: <Shield style={{ width: '20px', height: '20px', color: 'var(--ts-color-accent)' }} /> },
              { title: 'Pure CSS Variables', desc: 'Scoped custom properties preventing collision cascades.', icon: <Layers style={{ width: '20px', height: '20px', color: 'var(--ts-color-primary)' }} /> },
              { title: 'W3C DTCG Standard', desc: 'Figma Tokens and Style Dictionary ready exports.', icon: <Code2 style={{ width: '20px', height: '20px', color: 'var(--ts-color-accent)' }} /> },
            ].map((f, i) => (
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
                  gap: '8px',
                }}
              >
                {f.icon}
                <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, fontSize: '14px' }}>{f.title}</div>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.75, lineHeight: 1.4 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Universal Features Banner */}
      <section
        style={{
          borderTop: '1px solid var(--ts-color-border)',
          backgroundColor: 'var(--ts-color-surface)',
          padding: 'var(--ts-space-xl) var(--ts-space-lg)',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--ts-space-md)',
          }}
        >
          {[
            { icon: <Zap style={{ width: '20px', height: '20px', color: 'var(--ts-color-primary)' }} />, title: 'Deterministic Compiler', desc: 'Mathematical ratios ensure identical rendering across browsers and runtimes.' },
            { icon: <Shield style={{ width: '20px', height: '20px', color: 'var(--ts-color-accent)' }} />, title: 'Accessibility First', desc: 'High-precision sRGB contrast calculations prevent unreadable color combinations.' },
            { icon: <Layers style={{ width: '20px', height: '20px', color: 'var(--ts-color-primary)' }} />, title: 'Pure CSS Isolation', desc: 'Strictly zero stylesheet interference between sandbox views and your design tokens.' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
              <div>{f.icon}</div>
              <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
                {f.title}
              </span>
              <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.75, lineHeight: 1.4 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

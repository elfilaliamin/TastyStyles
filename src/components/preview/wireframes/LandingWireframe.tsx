import React from 'react';

export const LandingWireframe: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        borderRadius: 'var(--ts-radius)',
        border: '1px solid var(--ts-color-border)',
        flex: 1,
        minHeight: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navbar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--ts-space-md) var(--ts-space-lg)',
          borderBottom: '1px solid var(--ts-color-border)',
          backgroundColor: 'var(--ts-color-surface)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontWeight: 700,
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
            color: 'var(--ts-color-primary)',
          }}
        >
          Acme Brand
        </div>
        <div style={{ display: 'flex', gap: 'var(--ts-space-md)', alignItems: 'center' }}>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>Features</span>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>Pricing</span>
          <button
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: 'var(--ts-color-background)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              border: 'none',
              fontWeight: 600,
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              boxShadow: 'var(--ts-shadow)',
              cursor: 'pointer',
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero section */}
      <section
        style={{
          padding: 'var(--ts-space-xl) var(--ts-space-lg)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--ts-space-md)',
        }}
      >
        <span
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            padding: 'var(--ts-space-xs) var(--ts-space-md)',
            borderRadius: '9999px',
            fontSize: 'calc(var(--ts-base-size) * 0.8)',
            fontWeight: 600,
            color: 'var(--ts-color-accent)',
          }}
        >
          Announcing Version 2.0
        </span>

        <h1
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.2)',
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: '600px',
            margin: 0,
          }}
        >
          Modern Digital Experiences Built with Speed
        </h1>

        <p
          style={{
            fontSize: 'var(--ts-base-size)',
            maxWidth: '480px',
            opacity: 0.8,
            margin: 0,
          }}
        >
          Deliver pixel-perfect interfaces powered by deterministic AI design specifications.
        </p>

        <div style={{ display: 'flex', gap: 'var(--ts-space-sm)', marginTop: 'var(--ts-space-sm)' }}>
          <button
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: 'var(--ts-color-background)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-lg)',
              border: 'none',
              fontWeight: 600,
              boxShadow: 'var(--ts-shadow)',
              cursor: 'pointer',
            }}
          >
            Start Free Trial
          </button>
          <button
            style={{
              backgroundColor: 'transparent',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-lg)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Live Demo
          </button>
        </div>
      </section>

      {/* 3 Value props */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--ts-space-md)',
          padding: 'var(--ts-space-md) var(--ts-space-lg)',
          backgroundColor: 'var(--ts-color-surface)',
          borderTop: '1px solid var(--ts-color-border)',
        }}
      >
        {['Instant Sync', 'Zero Runtime Lock-in', '100% Type-Safe'].map((prop) => (
          <div key={prop} style={{ textAlign: 'center', padding: 'var(--ts-space-sm)' }}>
            <div
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontWeight: 600,
                fontSize: 'calc(var(--ts-base-size) * 0.95)',
              }}
            >
              {prop}
            </div>
            <p
              style={{
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                opacity: 0.7,
                margin: '4px 0 0 0',
              }}
            >
              Guaranteed consistency across all frontends.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};


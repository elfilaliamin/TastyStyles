import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import { AppIcon } from '../../common/AppIcon';
import { getPurposeDefinition } from '../../../config/purposes';

export interface DynamicFooterProps {
  brandName?: string;
  tagline?: string;
  className?: string;
  style?: React.CSSProperties;
}

const CURRENT_YEAR = new Date().getFullYear();

export const DynamicFooter: React.FC<DynamicFooterProps> = ({
  brandName,
  tagline,
  className = '',
  style: userStyle = {},
}) => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const name = brandName ?? state.name ?? 'ApexDesign';
  const purposeDef = state.project?.purpose ? getPurposeDefinition(state.project.purpose) : null;
  const currentTagline = tagline ?? purposeDef?.tagline ?? 'Engineered with deterministic tokens and zero-drift UI parity.';
  const footerLayout = state.pageLayouts?.footer ?? 'columns-mega';

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  // 1. MINIMAL INLINE (Single-line horizontal toolbar)
  if (footerLayout === 'minimal-inline') {
    return (
      <footer
        className={className}
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          borderTop: '1px solid var(--ts-color-border)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          padding: '20px 24px',
          width: '100%',
          boxSizing: 'border-box',
          marginTop: 'auto',
          ...userStyle,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '13px',
          }}
        >
          {/* Left: Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: 'var(--ts-radius-surface, 6px)',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '11px',
              }}
            >
              {name.substring(0, 2).toUpperCase()}
            </div>
            <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700 }}>{name}</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ opacity: 0.65, fontSize: '12px' }}>© {CURRENT_YEAR}</span>
          </div>

          {/* Center: Inline Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontWeight: 500, opacity: 0.85 }}>
            <span style={{ cursor: 'pointer' }}>Features</span>
            <span style={{ cursor: 'pointer' }}>Pricing</span>
            <span style={{ cursor: 'pointer' }}>Docs</span>
            <span style={{ cursor: 'pointer' }}>Privacy</span>
            <span style={{ cursor: 'pointer' }}>Terms</span>
          </div>

          {/* Right: Social & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', opacity: 0.75 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span>Operational</span>
            </div>
            <span style={{ cursor: 'pointer', opacity: 0.75 }}>
              <AppIcon name="code" size={14} />
            </span>
            <span style={{ cursor: 'pointer', opacity: 0.75 }}>
              <AppIcon name="share" size={14} />
            </span>
          </div>
        </div>
      </footer>
    );
  }

  // 2. CENTERED NEWSLETTER & COMMUNITY (Prominent newsletter capture box)
  if (footerLayout === 'centered-newsletter') {
    return (
      <footer
        className={className}
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          borderTop: '1px solid var(--ts-color-border)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          padding: '56px 24px 32px',
          width: '100%',
          boxSizing: 'border-box',
          marginTop: 'auto',
          ...userStyle,
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px',
          }}
        >
          {/* Brand Logo Avatar */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--ts-radius-surface, 10px)',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '16px',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            {name.substring(0, 2).toUpperCase()}
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '20px', fontWeight: 800, margin: 0 }}>
              Stay Updated with {name}
            </h3>
            <p style={{ margin: '8px 0 0', fontSize: '14px', opacity: 0.75, maxWidth: '440px' }}>
              Subscribe to our engineering dispatch for the latest token releases, security advisories, and architecture guides.
            </p>
          </div>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              gap: '8px',
              width: '100%',
              maxWidth: '460px',
            }}
          >
            <input
              type="email"
              placeholder="Enter your work email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 'var(--ts-radius)',
                border: '1px solid var(--ts-color-border)',
                backgroundColor: 'var(--ts-color-background)',
                color: 'var(--ts-color-text)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: 'var(--ts-shadow)',
                whiteSpace: 'nowrap',
              }}
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          {/* Centered Navigation Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', fontSize: '13px', opacity: 0.8, paddingTop: '12px' }}>
            <span style={{ cursor: 'pointer' }}>Features</span>
            <span style={{ cursor: 'pointer' }}>Pricing</span>
            <span style={{ cursor: 'pointer' }}>Changelog</span>
            <span style={{ cursor: 'pointer' }}>Documentation</span>
            <span style={{ cursor: 'pointer' }}>System Status</span>
            <span style={{ cursor: 'pointer' }}>Security</span>
          </div>

          {/* Social & Copyright */}
          <div
            style={{
              borderTop: '1px solid var(--ts-color-border)',
              paddingTop: '20px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              fontSize: '12px',
              opacity: 0.7,
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ cursor: 'pointer' }}>GitHub</span>
              <span>•</span>
              <span style={{ cursor: 'pointer' }}>Discord</span>
              <span>•</span>
              <span style={{ cursor: 'pointer' }}>Twitter / X</span>
            </div>
            <div>© {CURRENT_YEAR} {name}. All rights reserved. Zero-drift design token engine.</div>
          </div>
        </div>
      </footer>
    );
  }

  // 3. ASYMMETRIC SPLIT (Bold Left Statement, Right Link Rails)
  if (footerLayout === 'split-brand-legal') {
    return (
      <footer
        className={className}
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          borderTop: '1px solid var(--ts-color-border)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          padding: '60px 24px 36px',
          width: '100%',
          boxSizing: 'border-box',
          marginTop: 'auto',
          ...userStyle,
        }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Bold Wordmark & Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--ts-radius-surface, 8px)',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '14px',
                }}
              >
                {name.substring(0, 2).toUpperCase()}
              </div>
              <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 900, fontSize: '24px', letterSpacing: '-0.02em' }}>
                {name}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, opacity: 0.8, maxWidth: '420px' }}>
              {currentTagline} Autonomous tokens, full accessibility validation, and code generation across platforms.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span>SLA 99.99% • Worldwide Distributed Edge</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', opacity: 0.65 }}>
              © {CURRENT_YEAR} {name}. Designed for agents & engineers.
            </div>
          </div>

          {/* Right Column: Dual Rails & Legal */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Product Matrix
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px', opacity: 0.8 }}>
                <span style={{ cursor: 'pointer' }}>Design Tokens</span>
                <span style={{ cursor: 'pointer' }}>Component Sandbox</span>
                <span style={{ cursor: 'pointer' }}>WCAG Audit Tool</span>
                <span style={{ cursor: 'pointer' }}>Tailwind Sync</span>
                <span style={{ cursor: 'pointer' }}>CLI Importers</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Governance
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px', opacity: 0.8 }}>
                <span style={{ cursor: 'pointer' }}>Security Whitepaper</span>
                <span style={{ cursor: 'pointer' }}>Terms of Service</span>
                <span style={{ cursor: 'pointer' }}>Privacy Shield</span>
                <span style={{ cursor: 'pointer' }}>Cookie Preferences</span>
                <span style={{ cursor: 'pointer' }}>Status Page</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 4. BENTO CARDS GRID (Modular pod layout)
  if (footerLayout === 'bento-grid') {
    return (
      <footer
        className={className}
        style={{
          backgroundColor: 'var(--ts-color-background)',
          borderTop: '1px solid var(--ts-color-border)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          padding: '48px 24px 32px',
          width: '100%',
          boxSizing: 'border-box',
          marginTop: 'auto',
          ...userStyle,
        }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Bento Cards Container */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Card 1: Brand & Dispatch */}
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--ts-radius-surface, 6px)',
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '12px',
                    }}
                  >
                    {name.substring(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '16px' }}>{name}</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.75, lineHeight: 1.5 }}>
                  {currentTagline}
                </p>
              </div>
              <div style={{ fontSize: '11px', opacity: 0.65 }}>
                © {CURRENT_YEAR} {name}. Autonomous token pipeline.
              </div>
            </div>

            {/* Card 2: System Health SLA */}
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.6 }}>
                  Infrastructure Status
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>Operational 99.98%</span>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: '12px', opacity: 0.7 }}>
                  All nodes and token registries operating without latency spikes.
                </p>
              </div>
              <button
                type="button"
                style={{
                  alignSelf: 'flex-start',
                  padding: '5px 12px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  color: 'var(--ts-color-text)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Live Metrics →
              </button>
            </div>

            {/* Card 3: Quick Navigation */}
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.6 }}>
                  Quick Access
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '10px', fontSize: '12px', fontWeight: 500 }}>
                  <span style={{ cursor: 'pointer' }}>Features</span>
                  <span style={{ cursor: 'pointer' }}>Pricing</span>
                  <span style={{ cursor: 'pointer' }}>Docs</span>
                  <span style={{ cursor: 'pointer' }}>Tokens</span>
                  <span style={{ cursor: 'pointer' }}>Privacy</span>
                  <span style={{ cursor: 'pointer' }}>Security</span>
                </div>
              </div>
              <div style={{ fontSize: '11px', opacity: 0.65 }}>Updated weekly</div>
            </div>

            {/* Card 4: Community & Social */}
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.6 }}>
                  Join the Community
                </span>
                <p style={{ margin: '6px 0 0', fontSize: '12px', opacity: 0.75 }}>
                  Collaborate with 12,000+ engineers building agent-driven software.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    borderRadius: 'var(--ts-radius)',
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <AppIcon name="messageSquare" size={12} />
                  <span>Discord</span>
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    borderRadius: 'var(--ts-radius)',
                    backgroundColor: 'var(--ts-color-background)',
                    border: '1px solid var(--ts-color-border)',
                    color: 'var(--ts-color-text)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <AppIcon name="code" size={12} />
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // 5. DEFAULT: MULTI-COLUMN MEGA FOOTER (Rich directory with sections)
  return (
    <footer
      className={className}
      style={{
        backgroundColor: 'var(--ts-color-surface)',
        borderTop: '1px solid var(--ts-color-border)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        padding: '48px 24px 32px',
        width: '100%',
        boxSizing: 'border-box',
        marginTop: 'auto',
        ...userStyle,
      }}
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {/* Top Section: Brand + Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: '36px',
            alignItems: 'flex-start',
          }}
        >
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--ts-radius-surface, 8px)',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '13px',
                }}
              >
                {name.substring(0, 2).toUpperCase()}
              </div>
              <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '18px' }}>
                {name}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.75, lineHeight: 1.6 }}>
              {currentTagline}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--ts-color-primary)', fontWeight: 600 }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Col 1: Product */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>
              Product
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', opacity: 0.8 }}>
              <span style={{ cursor: 'pointer' }}>Features & Tools</span>
              <span style={{ cursor: 'pointer' }}>Live Sandbox</span>
              <span style={{ cursor: 'pointer' }}>Token Compiler</span>
              <span style={{ cursor: 'pointer' }}>WCAG 2.1 AAA Audit</span>
              <span style={{ cursor: 'pointer' }}>Changelog</span>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>
              Solutions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', opacity: 0.8 }}>
              <span style={{ cursor: 'pointer' }}>SaaS Platforms</span>
              <span style={{ cursor: 'pointer' }}>E-Commerce & Retail</span>
              <span style={{ cursor: 'pointer' }}>Creative Studios</span>
              <span style={{ cursor: 'pointer' }}>Developer Workspaces</span>
              <span style={{ cursor: 'pointer' }}>Enterprise Security</span>
            </div>
          </div>

          {/* Col 3: Resources */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>
              Resources
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', opacity: 0.8 }}>
              <span style={{ cursor: 'pointer' }}>Documentation</span>
              <span style={{ cursor: 'pointer' }}>API Reference</span>
              <span style={{ cursor: 'pointer' }}>Design Token Matrix</span>
              <span style={{ cursor: 'pointer' }}>Tailwind Configuration</span>
              <span style={{ cursor: 'pointer' }}>Community Discord</span>
            </div>
          </div>

          {/* Col 4: Legal & Trust */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>
              Legal & Trust
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', opacity: 0.8 }}>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
              <span style={{ cursor: 'pointer' }}>Security Whitepaper</span>
              <span style={{ cursor: 'pointer' }}>Cookie Settings</span>
              <span style={{ cursor: 'pointer' }}>GDPR Compliance</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Social */}
        <div
          style={{
            borderTop: '1px solid var(--ts-color-border)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            opacity: 0.75,
          }}
        >
          <div>
            © {CURRENT_YEAR} {name}. All rights reserved. Built with deterministic design tokens.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AppIcon name="code" size={14} />
              <span>GitHub</span>
            </span>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AppIcon name="share" size={14} />
              <span>Twitter</span>
            </span>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AppIcon name="messageSquare" size={14} />
              <span>Discord</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

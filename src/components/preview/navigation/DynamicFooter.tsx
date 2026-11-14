import React from 'react';
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

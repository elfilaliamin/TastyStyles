import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';

export const SuccessConfirmPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.success ?? 'celebration-card';

  // VARIANT 2: RECEIPT SUMMARY (Itemized transaction breakdown)
  if (layout === 'receipt-summary') {
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
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-xl)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ts-color-border)', paddingBottom: 'var(--ts-space-sm)' }}>
            <div>
              <div style={{ fontWeight: 800, fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 1.1)' }}>
                Compilation Manifest Receipt
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.65 }}>ID: #TS-94827 • Target: Autonomous AI Agents</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '9999px' }}>
              <AppIcon name="check" size={12} /> Compiled
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { file: 'DESIGN.md', desc: 'Canonical 10-section agent specification contract', status: 'Passed AAA' },
              { file: 'tokens.css', desc: 'Normalized CSS variables block with exact var() mapping', status: 'Clean' },
              { file: 'tailwind.config.ts', desc: 'Typed Tailwind preset consuming pure CSS variables', status: 'Ready' },
              { file: 'tokens.dtcg.json', desc: 'W3C Design Token Community Group standard format', status: 'Validated' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AppIcon name="fileText" size={14} style={{ color: 'var(--ts-color-primary)' }} />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.82)', fontFamily: 'monospace' }}>{item.file}</span>
                    <div style={{ fontSize: '11px', opacity: 0.65 }}>{item.desc}</div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.8 }}>{item.status}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--ts-space-xs)' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-xs) var(--ts-space-md)',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <AppIcon name="download" size={14} />
              <span>Download ZIP Bundle</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 3: MINIMAL BANNER
  if (layout === 'minimal-banner') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            width: '100%',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid #10b981',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AppIcon name="checkCircle" size={16} />
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.88)' }}>Specification Compiled Successfully</span>
              <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, marginLeft: '8px' }}>
                All tokens, recipes, and breakpoints exported to DESIGN.md.
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                fontSize: 'calc(var(--ts-base-size) * 0.78)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              View Spec
            </button>
            <button type="button" aria-label="Dismiss banner" style={{ background: 'none', border: 'none', color: 'var(--ts-color-text)', opacity: 0.5, cursor: 'pointer', padding: '4px' }}>
              <AppIcon name="close" size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 1: CELEBRATION CARD (Default)
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
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '540px',
          width: '100%',
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'calc(var(--ts-radius-surface, 16px) * 1.25)',
          padding: 'var(--ts-space-xl) var(--ts-space-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--ts-space-md)',
          boxShadow: 'var(--ts-shadow)',
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981',
          }}
        >
          <AppIcon name="checkCircle" size={36} />
        </div>

        {/* Text Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '2px 10px',
              borderRadius: '9999px',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
              color: 'var(--ts-color-primary)',
              margin: '0 auto',
            }}
          >
            <AppIcon name="sparkles" size={12} />
            <span>Agent Spec Handoff Ready</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
              fontWeight: 800,
              margin: '4px 0 0 0',
            }}
          >
            Design Spec Synchronized!
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 'calc(var(--ts-base-size) * 0.88)',
              opacity: 0.75,
              maxWidth: '400px',
              lineHeight: 1.5,
            }}
          >
            Your current typography, color palette, responsive wireframes, and component recipes are certified and ready for AI agent implementation.
          </p>
        </div>

        {/* Receipt / Details Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-xs)',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.65 }}>Specification ID</span>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', fontFamily: 'monospace', fontWeight: 600 }}>
              TS-SPEC-2026-X948
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.65 }}>WCAG 2.1 Contrast</span>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AppIcon name="shieldCheck" size={13} />
              Certified AAA Pass
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.65 }}>Output Bundles</span>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', fontWeight: 600 }}>
              DESIGN.md + tokens.css
            </span>
          </div>
        </div>

        {/* Action Button Group */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--ts-space-sm)',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <button
            type="button"
            style={{
              flex: 1,
              minWidth: '160px',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <AppIcon name="copy" size={15} />
            <span>Copy Spec URL</span>
          </button>

          <button
            type="button"
            style={{
              flex: 1,
              minWidth: '160px',
              backgroundColor: 'transparent',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <span>Back to Dashboard</span>
            <AppIcon name="externalLink" size={13} style={{ opacity: 0.7 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

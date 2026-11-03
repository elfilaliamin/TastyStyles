import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const SuccessConfirmPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

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
          borderRadius: 'calc(var(--ts-radius) * 1.5)',
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
          <CheckCircle2 style={{ width: '38px', height: '38px' }} />
        </div>

        {/* Heading */}
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 700,
              color: '#10b981',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <Sparkles style={{ width: '12px', height: '12px' }} />
            Handoff Ready & Verified
          </span>
          <h1
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.15)',
              fontWeight: 800,
              margin: 'var(--ts-space-xs) 0 4px 0',
            }}
          >
            Specification Compiled!
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              opacity: 0.75,
              lineHeight: 1.4,
            }}
          >
            Your deterministic design system Markdown spec is verified and ready for autonomous AI coding agents.
          </p>
        </div>

        {/* Verification Summary Receipt Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: 'calc(var(--ts-base-size) * 0.82)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ opacity: 0.7 }}>Specification Name</span>
            <span style={{ fontWeight: 700 }}>{state.name || 'Custom Specification'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ opacity: 0.7 }}>Target Agent Model</span>
            <span style={{ fontWeight: 600 }}>Gemini 2.5 Pro / Claude 3.7</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ opacity: 0.7 }}>WCAG 2.1 Contrast</span>
            <span style={{ fontWeight: 600, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck style={{ width: '13px', height: '13px' }} />
              Certified AAA
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ opacity: 0.7 }}>Token Scope Sections</span>
            <span style={{ fontWeight: 600 }}>9 Compliant Sections</span>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--ts-color-border)',
              paddingTop: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 'calc(var(--ts-base-size) * 0.72)',
              fontFamily: 'monospace',
            }}
          >
            <span style={{ opacity: 0.6 }}>SHA-256: 7f8b91c...e41a</span>
            <span style={{ color: 'var(--ts-color-primary)', fontWeight: 600 }}>Zero Hallucinations</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 'var(--ts-space-xs)', flexWrap: 'wrap', justifyContent: 'center' }}>
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
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <span>View Deployed Spec</span>
            <ExternalLink style={{ width: '14px', height: '14px' }} />
          </button>

          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
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
            <Copy style={{ width: '14px', height: '14px' }} />
            <span>Copy Handoff Prompt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

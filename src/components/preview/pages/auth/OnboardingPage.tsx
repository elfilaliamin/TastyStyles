import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';

export const OnboardingPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.onboarding ?? 'wizard-stepper';
  const [teamSize, setTeamSize] = useState('5-20');

  // VARIANT 2: CARD STACK
  if (layout === 'card-stack') {
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
          gap: 'var(--ts-space-md)',
        }}
      >
        <div style={{ maxWidth: '580px', width: '100%', textAlign: 'center', marginBottom: 'var(--ts-space-xs)' }}>
          <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 1.3)', fontWeight: 800, margin: 0 }}>
            Workspace Setup Checklist
          </h2>
          <p style={{ fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.7, margin: '4px 0 0 0' }}>
            Complete the milestones below to calibrate your agent design token handoff.
          </p>
        </div>

        <div style={{ maxWidth: '580px', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
          {[
            { id: 1, title: 'Choose Token Palette & Accent', done: true, icon: <AppIcon name="palette" size={16} /> },
            { id: 2, title: 'Configure Typography Scale & Google Fonts', done: true, icon: <AppIcon name="type" size={16} /> },
            { id: 3, title: 'Calibrate Spacing & Border Radius', active: true, icon: <AppIcon name="sliders" size={16} /> },
            { id: 4, title: 'Verify WCAG 2.1 Contrast Pass', pending: true, icon: <AppIcon name="layers" size={16} /> },
          ].map((step) => (
            <div
              key={step.id}
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: step.active ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm) var(--ts-space-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: step.done ? 'rgba(16, 185, 129, 0.15)' : step.active ? 'var(--ts-color-primary)' : 'var(--ts-color-background)',
                    color: step.done ? '#10b981' : step.active ? primaryTextColor : 'var(--ts-color-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  {step.done ? <AppIcon name="check" size={14} /> : step.id}
                </div>
                <div>
                  <div style={{ fontWeight: step.active ? 700 : 600, fontSize: 'calc(var(--ts-base-size) * 0.88)' }}>{step.title}</div>
                  <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.65 }}>
                    {step.done ? 'Configured and locked in schema' : step.active ? 'In progress — awaiting confirmation' : 'Queued next'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                style={{
                  padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                  borderRadius: 'var(--ts-radius)',
                  border: '1px solid var(--ts-color-border)',
                  backgroundColor: step.active ? 'var(--ts-color-primary)' : 'var(--ts-color-background)',
                  color: step.active ? primaryTextColor : 'var(--ts-color-text)',
                  fontSize: 'calc(var(--ts-base-size) * 0.75)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {step.done ? 'Edit' : step.active ? 'Configure' : 'Start'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VARIANT 3: MINIMAL MODAL
  if (layout === 'minimal-modal') {
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
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '460px',
            width: '100%',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            padding: 'var(--ts-space-xl)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--ts-space-md)',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppIcon name="sparkles" size={26} />
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 1.2)', fontWeight: 800, margin: 0 }}>
              Welcome to TastyStyles
            </h2>
            <p style={{ margin: '8px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75, lineHeight: 1.5 }}>
              Deterministic token compilation and UI/UX sandbox tailored for autonomous coding agents.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <button
              type="button"
              style={{
                width: '100%',
                padding: 'var(--ts-space-xs) var(--ts-space-md)',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                fontWeight: 700,
                fontSize: 'calc(var(--ts-base-size) * 0.88)',
                cursor: 'pointer',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              Get Started with Preset
            </button>
            <button
              type="button"
              style={{
                width: '100%',
                padding: 'var(--ts-space-xs) var(--ts-space-md)',
                backgroundColor: 'transparent',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                color: 'var(--ts-color-text)',
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
                cursor: 'pointer',
              }}
            >
              Skip Setup
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 1: WIZARD STEPPER (Default)
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
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-xl)',
          width: '100%',
          maxWidth: '520px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-md)',
        }}
      >
        {/* Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(var(--ts-base-size) * 0.75)', fontWeight: 600, opacity: 0.7, marginBottom: '6px' }}>
            <span>STEP 2 OF 3</span>
            <span>Configure Team Space</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--ts-color-background)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: '66%', height: '100%', backgroundColor: 'var(--ts-color-primary)', borderRadius: '9999px' }} />
          </div>
        </div>

        {/* Header */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Tell us about your team
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75 }}>
            Help us calibrate default workspace permissions and AI agent quota.
          </p>
        </div>

        {/* Form Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
          <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>Team / Organization Size</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ts-space-xs)' }}>
            {['1-5', '5-20', '20+'].map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setTeamSize(sz)}
                style={{
                  padding: 'var(--ts-space-sm)',
                  borderRadius: 'var(--ts-radius)',
                  border: teamSize === sz ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                  backgroundColor: teamSize === sz ? 'var(--ts-color-background)' : 'transparent',
                  color: teamSize === sz ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                  fontWeight: 700,
                  fontSize: 'calc(var(--ts-base-size) * 0.85)',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {sz} Members
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--ts-space-sm)' }}>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              opacity: 0.7,
            }}
          >
            <AppIcon name="arrowLeft" size={14} /> Back
          </button>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-lg)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <span>Continue</span>
            <AppIcon name="arrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

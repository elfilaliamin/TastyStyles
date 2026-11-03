import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { activeColors } = useDesign();
  const [teamSize, setTeamSize] = useState('5-20');
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
          <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8 }}>
            We'll tailor your design system token scale and component defaults based on your setup.
          </p>
        </div>

        {/* Workspace Name Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>Workspace Name</label>
          <input
            type="text"
            defaultValue="Acme Frontend Core"
            style={{
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              outline: 'none',
            }}
          />
        </div>

        {/* Team Size Radio Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>How many engineers build UI?</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--ts-space-xs)' }}>
            {[
              { id: '1-4', label: '1–4 devs', desc: 'Solo / Tiny team' },
              { id: '5-20', label: '5–20 devs', desc: 'Growing squad' },
              { id: '20+', label: '20+ devs', desc: 'Enterprise division' },
            ].map((size) => {
              const active = teamSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setTeamSize(size.id)}
                  style={{
                    backgroundColor: active ? 'var(--ts-color-background)' : 'transparent',
                    border: `2px solid ${active ? 'var(--ts-color-accent)' : 'var(--ts-color-border)'}`,
                    borderRadius: 'var(--ts-radius)',
                    padding: 'var(--ts-space-sm)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--ts-color-text)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.85)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{size.label}</span>
                    {active && <Check style={{ width: '14px', height: '14px', color: 'var(--ts-color-accent)' }} />}
                  </div>
                  <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.7 }}>{size.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--ts-space-xs)' }}>
          <button
            type="button"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid var(--ts-color-border)',
              color: 'var(--ts-color-text)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft style={{ width: '14px', height: '14px' }} />
            <span>Previous</span>
          </button>

          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-lg)',
              fontWeight: 600,
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <span>Continue</span>
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

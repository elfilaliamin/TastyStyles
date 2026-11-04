import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import { getBestContrastingColor } from '../../lib/contrast';
import { AppIcon } from '../common/AppIcon';

export const MockCard: React.FC = () => {
  const { activeColors } = useDesign();
  const [inputValue, setInputValue] = useState('agentic-builder@antigravity.ai');
  const [submitted, setSubmitted] = useState(false);

  // Determine contrasting button text color dynamically
  const primaryBtnTextColor = getBestContrastingColor(activeColors.primary);

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-surface)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        borderRadius: 'var(--ts-radius)',
        boxShadow: 'var(--ts-shadow)',
        border: '1px solid var(--ts-color-border)',
        padding: 'var(--ts-space-lg)',
        maxWidth: '640px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
        transition: 'all 0.15s ease-in-out',
      }}
    >
      {/* Top Header Row with Badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--ts-space-sm)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--ts-color-secondary)',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            fontSize: 'calc(var(--ts-base-size) * 0.75)',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          <AppIcon name="sparkles" size={12} />
          Verified Token Spec
        </span>

        <span
          style={{
            fontSize: 'calc(var(--ts-base-size) * 0.75)',
            color: 'var(--ts-color-accent)',
            fontWeight: 600,
          }}
        >
          Active Release
        </span>
      </div>

      {/* Main Heading & Body copy */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 700,
            lineHeight: 1.2,
            margin: '0 0 var(--ts-space-xs) 0',
            color: 'var(--ts-color-text)',
          }}
        >
          Automate Design System Handoffs
        </h2>

        <p
          style={{
            fontSize: 'var(--ts-base-size)',
            lineHeight: 1.5,
            margin: 0,
            opacity: 0.85,
            color: 'var(--ts-color-text)',
          }}
        >
          Visually configure cross-platform design tokens and export unambiguous Markdown
          specifications that autonomous AI coders follow with zero hallucinations.
        </p>
      </div>

      {/* Text Input Control */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-xs)',
        }}
      >
        <label
          htmlFor="preview-card-email-input"
          style={{
            fontSize: 'calc(var(--ts-base-size) * 0.8)',
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          Recipient Agent Endpoint
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="preview-card-email-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter destination..."
            style={{
              width: '100%',
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'var(--ts-font-body)',
              transition: 'border-color 0.15s ease',
            }}
          />
        </div>
      </div>

      {/* Action Buttons Row */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--ts-space-sm)',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingTop: 'var(--ts-space-xs)',
        }}
      >
        <button
          type="button"
          onClick={() => setSubmitted(!submitted)}
          style={{
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryBtnTextColor,
            borderRadius: 'var(--ts-radius)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-sm) var(--ts-space-lg)',
            border: 'none',
            fontSize: 'calc(var(--ts-base-size) * 0.9)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'opacity 0.15s, transform 0.1s',
          }}
        >
          {submitted ? (
            <>
              <AppIcon name="check" size={16} />
              <span>Spec Deployed</span>
            </>
          ) : (
            <>
              <span>Deploy Specification</span>
              <AppIcon name="arrowRight" size={16} />
            </>
          )}
        </button>

        <button
          type="button"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--ts-color-text)',
            borderRadius: 'var(--ts-radius)',
            border: '1px solid var(--ts-color-border)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            fontSize: 'calc(var(--ts-base-size) * 0.9)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.15s',
          }}
        >
          Inspect Tokens
        </button>
      </div>
    </div>
  );
};


import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  FolderPlus,
  Plus,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const EmptyStatePage: React.FC = () => {
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
          border: '2px dashed var(--ts-color-border)',
          borderRadius: 'calc(var(--ts-radius) * 1.5)',
          padding: 'var(--ts-space-xl) var(--ts-space-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--ts-space-md)',
          boxShadow: 'var(--ts-shadow)',
        }}
      >
        {/* Empty State Icon Contained Circle */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ts-color-primary)',
          }}
        >
          <FolderPlus style={{ width: '32px', height: '32px' }} />
        </div>

        {/* Text Copy */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.1)',
              fontWeight: 800,
              margin: '0 0 var(--ts-space-xs) 0',
            }}
          >
            No Design Specifications Yet
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              opacity: 0.75,
              lineHeight: 1.5,
              maxWidth: '420px',
            }}
          >
            You haven't compiled any design tokens or component rules for your autonomous AI agents. Start from scratch or load an archetype.
          </p>
        </div>

        {/* Primary Call to Actions */}
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
            <Plus style={{ width: '15px', height: '15px' }} />
            <span>Create New Specification</span>
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
            <BookOpen style={{ width: '15px', height: '15px' }} />
            <span>Documentation Guide</span>
          </button>
        </div>

        {/* Quick Starter Presets Pills */}
        <div
          style={{
            borderTop: '1px solid var(--ts-color-border)',
            paddingTop: 'var(--ts-space-sm)',
            width: '100%',
          }}
        >
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, marginBottom: '8px' }}>
            Or quick start from curated archetype presets:
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { name: 'Nordic Forest', color: '#1b4332' },
              { name: 'Cyber Neon', color: '#00f5d4' },
              { name: 'Zinc Minimal', color: '#18181b' },
              { name: 'Sunset Amber', color: '#f97316' },
            ].map((preset) => (
              <span
                key={preset.name}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '3px 8px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  fontSize: 'calc(var(--ts-base-size) * 0.72)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: preset.color,
                  }}
                />
                <span>{preset.name}</span>
                <ArrowRight style={{ width: '10px', height: '10px', opacity: 0.5 }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

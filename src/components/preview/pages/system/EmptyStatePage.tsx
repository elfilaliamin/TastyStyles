import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';

export const EmptyStatePage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.emptyState ?? 'centered-action';

  // VARIANT 2: ILLUSTRATION CARD (Starter Template Kit)
  if (layout === 'illustration-card') {
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
            maxWidth: '620px',
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
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(var(--ts-color-primary), 0.12)',
                color: 'var(--ts-color-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--ts-space-xs)',
              }}
            >
              <AppIcon name="sparkles" size={24} />
            </div>
            <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 1.25)', fontWeight: 800, margin: 0 }}>
              Kickstart with a Starter Kit
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.7 }}>
              You don’t have any active tokens yet. Pick a verified starter kit below to pre-populate your design spec:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--ts-space-sm)' }}>
            {[
              { title: 'SaaS Dashboard Pro', desc: 'Enterprise data tables, status badges & metric cards', archetype: 'Neo-Brutalist' },
              { title: 'Editorial Minimalist', desc: 'Focus on serif typography, generous whitespace & contrast', archetype: 'Swiss Minimal' },
              { title: 'DevOps Cloud Console', desc: 'Dark-mode first, dense monospaced terminal grids', archetype: 'Cyberpunk' },
              { title: 'Mobile E-Commerce', desc: 'Rounded pill buttons, soft shadows & vibrant accents', archetype: 'Soft UI Pastel' },
            ].map((kit, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.88)' }}>{kit.title}</div>
                  <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.7, marginTop: '2px' }}>{kit.desc}</div>
                </div>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    borderRadius: 'var(--ts-radius)',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                  }}
                >
                  Apply Kit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 3: CHECKLIST GUIDE
  if (layout === 'checklist-guide') {
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
          <div>
            <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 1.25)', fontWeight: 800, margin: 0 }}>
              Quick Start Checklist
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.7 }}>
              Follow these three simple steps to prepare your system for autonomous agent code generation.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
            {[
              { num: '1', title: 'Pick Brand Colors & Status Spectrum', desc: 'Ensure WCAG 2.1 AAA passes on primary & background', done: false },
              { num: '2', title: 'Calibrate Type Scale & Google Fonts', desc: 'Select harmonious heading and body font pairings', done: false },
              { num: '3', title: 'Export DESIGN.md & tokens.css', desc: 'Handoff the truth to Gemini, Claude, or Copilot agents', done: false },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: 'var(--ts-space-sm)',
                  borderRadius: 'var(--ts-radius-surface, 12px)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '12px',
                    flexShrink: 0,
                  }}
                >
                  {item.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>{item.title}</div>
                  <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.65 }}>{item.desc}</div>
                </div>
                <AppIcon name="arrowRight" size={14} style={{ opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 1: CENTERED ACTION (Default)
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
          borderRadius: 'calc(var(--ts-radius-surface, 16px) * 1.25)',
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
          <AppIcon name="folderPlus" size={32} />
        </div>

        {/* Text Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
          <h2
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
              fontWeight: 800,
              margin: 0,
            }}
          >
            No Design Tokens Found
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              opacity: 0.75,
              maxWidth: '380px',
              lineHeight: 1.5,
            }}
          >
            Your current workspace has no active style tokens registered. Start by assembling your brand palette or load a curated archetype.
          </p>
        </div>

        {/* Action Button Group */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--ts-space-sm)',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 'var(--ts-space-xs)',
          }}
        >
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
            <AppIcon name="plus" size={16} />
            <span>Create Token Palette</span>
          </button>

          <button
            type="button"
            style={{
              backgroundColor: 'transparent',
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
            <AppIcon name="bookOpen" size={14} style={{ opacity: 0.7 }} />
            <span>Browse Templates</span>
          </button>
        </div>
      </div>
    </div>
  );
};

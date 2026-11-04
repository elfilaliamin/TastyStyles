import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import { AppIcon } from '../../common/AppIcon';

export const PopupsPreview: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  // Interactive live trigger state
  const [activeToast, setActiveToast] = useState<'success' | 'warning' | 'error' | null>('success');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'destructive' | 'authorize'>('destructive');
  const [alertDismissed, setAlertDismissed] = useState<boolean>(false);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '880px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-xl)',
        fontFamily: 'var(--ts-font-body)',
        color: 'var(--ts-color-text)',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(var(--ts-color-primary), 0.12)',
              color: 'var(--ts-color-primary)',
              fontSize: 'calc(var(--ts-base-size) * 0.72)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <AppIcon name="bell" size={12} />
            Component Primitives
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Notifications, Alerts & Confirmation Popups
        </h2>
        <p style={{ margin: '6px 0 0 0', fontSize: 'var(--ts-base-size)', opacity: 0.8 }}>
          Transient toasts, contextual status alert banners, and high-stakes modal confirmation popups styled with active design tokens.
        </p>
      </div>

      {/* Interactive Trigger Bar */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius-surface, 16px)',
          padding: 'var(--ts-space-md)',
          boxShadow: 'var(--ts-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 700 }}>
              Live Trigger Sandbox
            </div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>
              Test popup behaviors and contextual overlays directly inside the preview canvas.
            </div>
          </div>
          {alertDismissed && (
            <button
              type="button"
              onClick={() => setAlertDismissed(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                backgroundColor: 'transparent',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                color: 'var(--ts-color-text)',
                fontSize: 'calc(var(--ts-base-size) * 0.75)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <AppIcon name="rotateCw" size={12} />
              Reset Dismissed Alerts
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveToast('success')}
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              color: 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.8)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="check" size={14} style={{ color: '#10b981' }} />
            Trigger Success Toast
          </button>

          <button
            type="button"
            onClick={() => setActiveToast('warning')}
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              color: 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.8)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="alert" size={14} style={{ color: '#f59e0b' }} />
            Trigger Warning Toast
          </button>

          <button
            type="button"
            onClick={() => {
              setModalType('destructive');
              setShowModal(true);
            }}
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              fontSize: 'calc(var(--ts-base-size) * 0.8)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="trash" size={14} />
            Open Destructive Modal
          </button>

          <button
            type="button"
            onClick={() => {
              setModalType('authorize');
              setShowModal(true);
            }}
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.8)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="shield" size={14} />
            Open Authorize Dialog
          </button>
        </div>
      </div>

      {/* SECTION 1: SYSTEM ALERT BANNERS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.9)', fontWeight: 700 }}>
            1. System Alert Banners
          </div>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.6 }}>
            Inline & persistent surface notifications
          </span>
        </div>

        {/* Solid Accent Banner */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryTextColor,
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-md)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '240px' }}>
            <AppIcon name="sparkles" size={18} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.88)' }}>
                Deterministic Token Engine Active
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.9 }}>
                Styles are live synchronized to DESIGN.md spec with zero hallucination risk.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: primaryTextColor,
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: 'var(--ts-radius)',
                padding: '4px 12px',
                fontSize: 'calc(var(--ts-base-size) * 0.78)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Informational Alert */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderLeft: '4px solid var(--ts-color-primary)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <AppIcon name="info" size={18} style={{ color: 'var(--ts-color-primary)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.88)' }}>
              Design Token Handoff Available
            </div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.75, marginTop: '2px' }}>
              Your workspace includes 18 deterministic design token exports. Compatible with Claude Code, Gemini CLI, and GitHub Copilot.
            </div>
          </div>
        </div>

        {/* Success Alert */}
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderLeft: '4px solid #10b981',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AppIcon name="check" size={18} style={{ color: '#10b981' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.88)', color: '#10b981' }}>
                WCAG 2.1 Contrast Verified (21.0:1 AAA)
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.8, marginTop: '2px' }}>
                All text colors pass enhanced accessibility thresholds across light and dark system surfaces.
              </div>
            </div>
          </div>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              fontSize: 'calc(var(--ts-base-size) * 0.72)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            PASSING
          </span>
        </div>

        {/* Warning Alert with Inline Action & Dismiss */}
        {!alertDismissed && (
          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AppIcon name="alert" size={18} style={{ color: '#f59e0b' }} />
              <div>
                <span style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.85)', color: '#d97706' }}>
                  Uncommitted Spec Modifications:
                </span>{' '}
                <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.85 }}>
                  You have 2 pending color overrides not yet saved to git repo.
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--ts-radius)',
                  padding: '4px 10px',
                  fontSize: 'calc(var(--ts-base-size) * 0.75)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Sync Now
              </button>
              <button
                type="button"
                onClick={() => setAlertDismissed(true)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--ts-color-text)',
                  opacity: 0.6,
                  padding: '4px',
                  borderRadius: 'var(--ts-radius)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Dismiss alert"
              >
                <AppIcon name="close" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Error / Destructive Alert */}
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderLeft: '4px solid #ef4444',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AppIcon name="alert" size={18} style={{ color: '#ef4444' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.88)', color: '#ef4444' }}>
                Token Build Failed on Line 42
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.8, marginTop: '2px' }}>
                Encountered malformed color hex token <code>#f0f0fzz</code> in custom config schema.
              </div>
            </div>
          </div>
          <button
            type="button"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: 'var(--ts-radius)',
              color: '#ef4444',
              padding: '3px 8px',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Retry Validation
          </button>
        </div>
      </div>

      {/* SECTION 2: FLOATING TOAST NOTIFICATIONS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.9)', fontWeight: 700 }}>
            2. Toast Notifications (Floating Stack)
          </div>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.6 }}>
            Transient bottom / top-right notification toasts
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--ts-space-md)' }}>
          {/* Success Toast */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-md)',
              boxShadow: 'var(--ts-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-xs)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: '#10b981',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                  }}
                >
                  <AppIcon name="check" size={15} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                    Export Ready for Download
                  </div>
                  <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.6 }}>
                    2 seconds ago
                  </div>
                </div>
              </div>
              <AppIcon name="close" size={14} style={{ opacity: 0.5, cursor: 'pointer' }} />
            </div>
            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.8, lineHeight: 1.4 }}>
              Zero-drift tokens zip package with Tailwind CSS v4 and typography scale compiled.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                style={{
                  padding: '3px 10px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  border: 'none',
                  fontSize: 'calc(var(--ts-base-size) * 0.75)',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
              >
                <AppIcon name="download" size={12} />
                Download Spec (.zip)
              </button>
            </div>
          </div>

          {/* Actionable User Notification Toast */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-md)',
              boxShadow: 'var(--ts-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-xs)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: 'var(--ts-color-primary)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                    fontSize: '11px',
                  }}
                >
                  AR
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                    Alex Rivers commented
                  </div>
                  <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.6 }}>
                    3 minutes ago
                  </div>
                </div>
              </div>
              <AppIcon name="close" size={14} style={{ opacity: 0.5, cursor: 'pointer' }} />
            </div>
            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.8, lineHeight: 1.4 }}>
              &ldquo;Please ensure the primary button uses 9999px pill radius for mobile CTA consistency.&rdquo;
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                style={{
                  padding: '3px 10px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  color: 'var(--ts-color-text)',
                  border: '1px solid var(--ts-color-border)',
                  fontSize: 'calc(var(--ts-base-size) * 0.75)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reply
              </button>
              <button
                type="button"
                style={{
                  padding: '3px 10px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'transparent',
                  color: 'var(--ts-color-text)',
                  border: 'none',
                  opacity: 0.7,
                  fontSize: 'calc(var(--ts-base-size) * 0.75)',
                  cursor: 'pointer',
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: CONFIRMATION POPUPS & MODAL DIALOGS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.9)', fontWeight: 700 }}>
            3. Confirmation Popups & Modal Overlays
          </div>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.6 }}>
            Dual-action dialogs & decision barriers
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--ts-space-lg)' }}>
          {/* Confirmation Popup A: Destructive Action Confirmation */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-lg)',
              boxShadow: 'var(--ts-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AppIcon name="trash" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 1.05)', fontFamily: 'var(--ts-font-heading)' }}>
                  Delete Design System Palette?
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.6, marginTop: '2px' }}>
                  Action requires owner confirmation
                </div>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8, lineHeight: 1.5 }}>
              Are you sure you want to permanently delete <strong>Sunset Amber v2</strong>? This will remove all 24 compiled archetype previews and disconnect existing agent pipelines.
            </p>

            <div
              style={{
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                backgroundColor: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--ts-radius)',
                fontSize: 'calc(var(--ts-base-size) * 0.75)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AppIcon name="alert" size={13} />
              <span>This operation cannot be reversed once confirmed.</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--ts-space-xs)' }}>
              <button
                type="button"
                style={{
                  padding: 'var(--ts-space-xs) var(--ts-space-md)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  color: 'var(--ts-color-text)',
                  fontSize: 'calc(var(--ts-base-size) * 0.82)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                style={{
                  padding: 'var(--ts-space-xs) var(--ts-space-md)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: 'calc(var(--ts-base-size) * 0.82)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
                }}
              >
                <AppIcon name="trash" size={14} />
                Delete Palette
              </button>
            </div>
          </div>

          {/* Confirmation Popup B: Permission Authorization Confirmation */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-lg)',
              boxShadow: 'var(--ts-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(var(--ts-color-primary), 0.12)',
                  color: 'var(--ts-color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AppIcon name="shield" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 1.05)', fontFamily: 'var(--ts-font-heading)' }}>
                  Authorize Agent Token Handoff?
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.6, marginTop: '2px' }}>
                  Workspace permission approval
                </div>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8, lineHeight: 1.5 }}>
              TastyStyles autonomous compiler requests access to inject CSS variable bindings into <code>src/styles/tokens.css</code>.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                backgroundColor: 'var(--ts-color-background)',
                borderRadius: 'var(--ts-radius)',
                border: '1px solid var(--ts-color-border)',
                fontSize: 'calc(var(--ts-base-size) * 0.78)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AppIcon name="check" size={12} style={{ color: '#10b981' }} />
                <span>Read active color palette & font pairings</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AppIcon name="check" size={12} style={{ color: '#10b981' }} />
                <span>Write tailwind.config.ts token mappings</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--ts-space-xs)' }}>
              <button
                type="button"
                style={{
                  padding: 'var(--ts-space-xs) var(--ts-space-md)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--ts-color-border)',
                  color: 'var(--ts-color-text)',
                  fontSize: 'calc(var(--ts-base-size) * 0.82)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Deny
              </button>
              <button
                type="button"
                style={{
                  padding: 'var(--ts-space-xs) var(--ts-space-md)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  border: 'none',
                  fontSize: 'calc(var(--ts-base-size) * 0.82)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                Authorize Handoff
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Popup C: Floating Cookie / Action Consent Sheet */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-md) var(--ts-space-lg)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-md)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '280px', flex: 1 }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ts-color-primary)',
                flexShrink: 0,
              }}
            >
              <AppIcon name="info" size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.88)' }}>
                Cookie & Telemetry Preferences
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.75, marginTop: '2px' }}>
                We use strictly functional cookies to preserve your theme presets and local accessibility audits.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              style={{
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: 'transparent',
                border: '1px solid var(--ts-color-border)',
                color: 'var(--ts-color-text)',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Manage Preferences
            </button>
            <button
              type="button"
              style={{
                padding: 'var(--ts-space-xs) var(--ts-space-md)',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Modal Backdrop & Overlay Simulation */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--ts-space-md)',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-xl)',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: modalType === 'destructive' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(var(--ts-color-primary), 0.12)',
                    color: modalType === 'destructive' ? '#ef4444' : 'var(--ts-color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {modalType === 'destructive' ? (
                    <AppIcon name="alert" size={18} />
                  ) : (
                    <AppIcon name="shield" size={18} />
                  )}
                </div>
                <div style={{ fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 1.1)', fontFamily: 'var(--ts-font-heading)' }}>
                  {modalType === 'destructive' ? 'Confirm Deletion' : 'Grant AI Compiler Authorization'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--ts-color-text)',
                  opacity: 0.6,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <AppIcon name="close" size={18} />
              </button>
            </div>

            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.88)', opacity: 0.8, lineHeight: 1.5 }}>
              {modalType === 'destructive'
                ? 'This action cannot be undone. Are you certain you want to proceed with purging all local token overrides?'
                : 'TastyStyles will configure automated style syncing for this session. You can revoke permissions anytime.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--ts-space-xs)' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: 'var(--ts-space-xs) var(--ts-space-md)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  color: 'var(--ts-color-text)',
                  fontSize: 'calc(var(--ts-base-size) * 0.82)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: 'var(--ts-space-xs) var(--ts-space-md)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: modalType === 'destructive' ? '#ef4444' : 'var(--ts-color-primary)',
                  color: modalType === 'destructive' ? '#ffffff' : primaryTextColor,
                  border: 'none',
                  fontSize: 'calc(var(--ts-base-size) * 0.82)',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {modalType === 'destructive' ? 'Yes, Delete' : 'Confirm & Authorize'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Floating Toast Notification Overlay */}
      {activeToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'sticky',
            bottom: '16px',
            alignSelf: 'flex-end',
            zIndex: 100,
            maxWidth: '380px',
            width: '100%',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.25)',
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeToast === 'success' && <AppIcon name="check" size={18} style={{ color: '#10b981' }} />}
            {activeToast === 'warning' && <AppIcon name="alert" size={18} style={{ color: '#f59e0b' }} />}
            {activeToast === 'error' && <AppIcon name="alert" size={18} style={{ color: '#ef4444' }} />}
            <div>
              <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.82)' }}>
                {activeToast === 'success' && 'Live Toast: Action Successful'}
                {activeToast === 'warning' && 'Live Toast: Cautionary Warning'}
                {activeToast === 'error' && 'Live Toast: Request Terminated'}
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.7 }}>
                Rendered with current design tokens.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveToast(null)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--ts-color-text)',
              opacity: 0.6,
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            <AppIcon name="close" size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

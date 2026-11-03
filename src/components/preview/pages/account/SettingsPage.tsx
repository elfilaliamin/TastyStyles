import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  User,
  Bell,
  Lock,
  Save,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security'>('general');
  const [toggles, setToggles] = useState({
    mfa: true,
    emailAlerts: true,
    autoSync: false,
    telemetry: true,
    weeklyReport: false,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        padding: 'var(--ts-space-lg)',
        maxWidth: '860px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
      }}
    >
      {/* Title & Description */}
      <div>
        <h1
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 800,
            margin: 0,
          }}
        >
          System & Workspace Settings
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75 }}>
          Manage your profile identity, security posture, and automation preferences.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--ts-space-sm)',
          borderBottom: '1px solid var(--ts-color-border)',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'general', label: 'General & Profile', icon: <User style={{ width: '14px', height: '14px' }} /> },
          { id: 'notifications', label: 'Notifications & Alerts', icon: <Bell style={{ width: '14px', height: '14px' }} /> },
          { id: 'security', label: 'Security & Access', icon: <Lock style={{ width: '14px', height: '14px' }} /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--ts-color-primary)' : '2px solid transparent',
                color: isActive ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                fontWeight: isActive ? 700 : 500,
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.7,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Settings Card */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-md)',
        }}
      >
        {activeTab === 'general' && (
          <>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                  fontWeight: 700,
                  margin: '0 0 var(--ts-space-xs) 0',
                }}
              >
                Profile Identity
              </h3>
              <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7 }}>
                This name and avatar appear in collaborative token change reviews.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--ts-space-sm)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Alex Rivers"
                  style={{
                    width: '100%',
                    padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                    backgroundColor: 'var(--ts-color-background)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius)',
                    color: 'var(--ts-color-text)',
                    fontSize: 'calc(var(--ts-base-size) * 0.85)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: '4px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="alex.rivers@tastystyles.io"
                  style={{
                    width: '100%',
                    padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                    backgroundColor: 'var(--ts-color-background)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius)',
                    color: 'var(--ts-color-text)',
                    fontSize: 'calc(var(--ts-base-size) * 0.85)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--ts-color-border)', paddingTop: 'var(--ts-space-md)' }}>
              <h3
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                  fontWeight: 700,
                  margin: '0 0 var(--ts-space-xs) 0',
                }}
              >
                Workspace Preferences
              </h3>
            </div>

            {/* Toggle Switches */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
              {[
                {
                  key: 'autoSync' as const,
                  title: 'Continuous Git Synchronization',
                  desc: 'Automatically commit updated Markdown design specs to your main repository branch.',
                },
                {
                  key: 'telemetry' as const,
                  title: 'Deterministic Token Verification',
                  desc: 'Run background WCAG 2.1 contrast formulas against every color permutation.',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--ts-space-md)',
                    padding: 'var(--ts-space-xs) 0',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, marginTop: '2px' }}>
                      {item.desc}
                    </div>
                  </div>

                  {/* Accessible Pill Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={toggles[item.key]}
                    onClick={() => toggle(item.key)}
                    style={{
                      width: '42px',
                      height: '24px',
                      borderRadius: '9999px',
                      backgroundColor: toggles[item.key] ? 'var(--ts-color-primary)' : 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                      position: 'relative',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'background-color 0.2s ease',
                      padding: 0,
                    }}
                  >
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: toggles[item.key] ? primaryTextColor : 'var(--ts-color-text)',
                        position: 'absolute',
                        top: '2px',
                        left: toggles[item.key] ? '20px' : '2px',
                        transition: 'left 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                  fontWeight: 700,
                  margin: '0 0 var(--ts-space-xs) 0',
                }}
              >
                Notification Channels
              </h3>
              <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7 }}>
                Decide when and where you receive automated agent handoff alerts.
              </p>
            </div>

            {[
              {
                key: 'emailAlerts' as const,
                title: 'Critical Contrast Violations',
                desc: 'Immediate dispatch when a token configuration fails WCAG 4.5:1 minimums.',
              },
              {
                key: 'weeklyReport' as const,
                title: 'Weekly Design System Drift Report',
                desc: 'Consolidated summary of components diverging from active design tokens.',
              },
            ].map((item) => (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--ts-space-md)',
                  padding: 'var(--ts-space-xs) 0',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={toggles[item.key]}
                  onClick={() => toggle(item.key)}
                  style={{
                    width: '42px',
                    height: '24px',
                    borderRadius: '9999px',
                    backgroundColor: toggles[item.key] ? 'var(--ts-color-primary)' : 'var(--ts-color-background)',
                    border: '1px solid var(--ts-color-border)',
                    position: 'relative',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'background-color 0.2s ease',
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: toggles[item.key] ? primaryTextColor : 'var(--ts-color-text)',
                      position: 'absolute',
                      top: '2px',
                      left: toggles[item.key] ? '20px' : '2px',
                      transition: 'left 0.2s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                  fontWeight: 700,
                  margin: '0 0 var(--ts-space-xs) 0',
                }}
              >
                Security Posture
              </h3>
              <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7 }}>
                Protect sensitive API credentials and autonomous agent execution boundaries.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--ts-space-xs) 0',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                  Hardware FIDO2 / MFA
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, marginTop: '2px' }}>
                  Require cryptographic hardware key verification for specification deployments.
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={toggles.mfa}
                onClick={() => toggle('mfa')}
                style={{
                  width: '42px',
                  height: '24px',
                  borderRadius: '9999px',
                  backgroundColor: toggles.mfa ? 'var(--ts-color-primary)' : 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  position: 'relative',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.2s ease',
                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: toggles.mfa ? primaryTextColor : 'var(--ts-color-text)',
                    position: 'absolute',
                    top: '2px',
                    left: toggles.mfa ? '20px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                />
              </button>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div
          style={{
            borderTop: '1px solid var(--ts-color-border)',
            paddingTop: 'var(--ts-space-md)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--ts-space-xs)',
          }}
        >
          <button
            type="button"
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              color: 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
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
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <Save style={{ width: '14px', height: '14px' }} />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};

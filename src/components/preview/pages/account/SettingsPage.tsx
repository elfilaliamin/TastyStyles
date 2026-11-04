import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  User,
  Bell,
  Lock,
  Save,
  Shield,
  Key,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.settings ?? 'tabbed';

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

  const tabs = [
    { id: 'general' as const, label: 'General & Profile', icon: <User style={{ width: '14px', height: '14px' }} /> },
    { id: 'notifications' as const, label: 'Notifications & Alerts', icon: <Bell style={{ width: '14px', height: '14px' }} /> },
    { id: 'security' as const, label: 'Security & Access', icon: <Lock style={{ width: '14px', height: '14px' }} /> },
  ];

  const renderGeneralSection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--ts-space-md)' }}>
        <div>
          <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: '6px' }}>
            Full Name
          </label>
          <input
            type="text"
            defaultValue="Alex Rivers"
            style={{
              width: '100%',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              outline: 'none',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: '6px' }}>
            Work Email
          </label>
          <input
            type="email"
            defaultValue="alex.rivers@tastystyles.io"
            style={{
              width: '100%',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              outline: 'none',
            }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: '6px' }}>
          Role & Team Title
        </label>
        <input
          type="text"
          defaultValue="Lead Design Systems Architect"
          style={{
            width: '100%',
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            borderRadius: 'var(--ts-radius)',
            border: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-background)',
            color: 'var(--ts-color-text)',
            fontSize: 'calc(var(--ts-base-size) * 0.85)',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
      {[
        { key: 'emailAlerts' as const, label: 'Email Security Alerts', desc: 'Notify immediately when token export keys are regenerated.' },
        { key: 'autoSync' as const, label: 'Auto-Sync to GitHub', desc: 'Push token commits automatically on every design release.' },
        { key: 'weeklyReport' as const, label: 'Weekly Contrast Audit Digest', desc: 'Summary of all WCAG compliance and agent handoffs.' },
      ].map((item) => (
        <div
          key={item.key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--ts-space-xs) 0',
            borderBottom: '1px solid var(--ts-color-border)',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>{item.label}</div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.65 }}>{item.desc}</div>
          </div>
          <button
            type="button"
            onClick={() => toggle(item.key)}
            style={{
              width: '40px',
              height: '22px',
              borderRadius: '9999px',
              backgroundColor: toggles[item.key] ? 'var(--ts-color-primary)' : 'var(--ts-color-border)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: toggles[item.key] ? primaryTextColor : 'var(--ts-color-surface)',
                position: 'absolute',
                top: '3px',
                left: toggles[item.key] ? '21px' : '3px',
                transition: 'left 0.2s ease',
              }}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const renderSecuritySection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield style={{ width: '15px', height: '15px', color: 'var(--ts-color-primary)' }} />
            <span>Two-Factor Authentication (2FA)</span>
          </div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.65 }}>Hardware key or authenticator app confirmation.</div>
        </div>
        <button
          type="button"
          onClick={() => toggle('mfa')}
          style={{
            width: '40px',
            height: '22px',
            borderRadius: '9999px',
            backgroundColor: toggles.mfa ? 'var(--ts-color-primary)' : 'var(--ts-color-border)',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: toggles.mfa ? primaryTextColor : 'var(--ts-color-surface)',
              position: 'absolute',
              top: '3px',
              left: toggles.mfa ? '21px' : '3px',
              transition: 'left 0.2s ease',
            }}
          />
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--ts-space-xs)', borderTop: '1px solid var(--ts-color-border)' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Key style={{ width: '15px', height: '15px', opacity: 0.7 }} />
            <span>Agent API Tokens</span>
          </div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.65 }}>Active token key: `ts_live_948f2...` (Full access)</div>
        </div>
        <button
          type="button"
          style={{
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            fontSize: 'calc(var(--ts-base-size) * 0.75)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Rotate Key
        </button>
      </div>
    </div>
  );

  // VARIANT 2: STACKED CARDS
  if (layout === 'stacked-cards') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          padding: 'var(--ts-space-md)',
          maxWidth: '820px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-md)',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))', fontWeight: 800, margin: 0 }}>
            Workspace Settings
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.7 }}>
            All organization preferences and security configurations in a unified view.
          </p>
        </div>

        {/* Card 1: Profile */}
        <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-md)', boxShadow: 'var(--ts-shadow)' }}>
          <h2 style={{ margin: '0 0 var(--ts-space-sm) 0', fontSize: 'calc(var(--ts-base-size) * 0.95)', fontWeight: 700 }}>Profile Identity</h2>
          {renderGeneralSection()}
          <div style={{ marginTop: 'var(--ts-space-md)', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" style={{ backgroundColor: 'var(--ts-color-primary)', color: primaryTextColor, border: 'none', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-xs) var(--ts-space-md)', fontSize: 'calc(var(--ts-base-size) * 0.82)', fontWeight: 600, cursor: 'pointer' }}>
              Update Profile
            </button>
          </div>
        </div>

        {/* Card 2: Notifications */}
        <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-md)', boxShadow: 'var(--ts-shadow)' }}>
          <h2 style={{ margin: '0 0 var(--ts-space-sm) 0', fontSize: 'calc(var(--ts-base-size) * 0.95)', fontWeight: 700 }}>Notifications & Alerts</h2>
          {renderNotificationsSection()}
        </div>

        {/* Card 3: Security */}
        <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-md)', boxShadow: 'var(--ts-shadow)' }}>
          <h2 style={{ margin: '0 0 var(--ts-space-sm) 0', fontSize: 'calc(var(--ts-base-size) * 0.95)', fontWeight: 700 }}>Security & API Access</h2>
          {renderSecuritySection()}
        </div>
      </div>
    );
  }

  // VARIANT 3: SIDEBAR NAV
  if (layout === 'sidebar-nav') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          padding: 'var(--ts-space-md)',
          maxWidth: '920px',
          margin: '0 auto',
          display: 'flex',
          gap: 'var(--ts-space-md)',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {/* Left Sub-nav */}
        <div
          style={{
            width: '200px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <div style={{ fontWeight: 800, fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 1.05)', marginBottom: '8px' }}>
            Settings
          </div>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                borderRadius: 'var(--ts-radius)',
                border: 'none',
                backgroundColor: activeTab === t.id ? 'var(--ts-color-surface)' : 'transparent',
                color: activeTab === t.id ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                fontWeight: activeTab === t.id ? 700 : 500,
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Right Form Body */}
        <div
          style={{
            flex: 1,
            minWidth: '280px',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            padding: 'var(--ts-space-md)',
            boxShadow: 'var(--ts-shadow)',
          }}
        >
          {activeTab === 'general' && renderGeneralSection()}
          {activeTab === 'notifications' && renderNotificationsSection()}
          {activeTab === 'security' && renderSecuritySection()}

          <div style={{ marginTop: 'var(--ts-space-md)', display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid var(--ts-color-border)', paddingTop: 'var(--ts-space-sm)' }}>
            <button type="button" style={{ padding: 'var(--ts-space-xs) var(--ts-space-md)', backgroundColor: 'var(--ts-color-primary)', color: primaryTextColor, border: 'none', borderRadius: 'var(--ts-radius)', fontSize: 'calc(var(--ts-base-size) * 0.82)', fontWeight: 600, cursor: 'pointer' }}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 1: TABBED (Default)
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
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
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

      {/* Card Content Area */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-lg)',
        }}
      >
        {activeTab === 'general' && renderGeneralSection()}
        {activeTab === 'notifications' && renderNotificationsSection()}
        {activeTab === 'security' && renderSecuritySection()}

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

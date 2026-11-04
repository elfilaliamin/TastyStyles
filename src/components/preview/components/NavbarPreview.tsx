import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import {
  Search,
  Bell,
  Command,
  ChevronDown,
  Sparkles,
  Plus,
  Activity,
} from 'lucide-react';

export const NavbarPreview: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.navbar ?? 'saas-header';
  const [activeTab, setActiveTab] = useState('overview');

  const weightMap: Record<string, number> = {
    thin: 1.25,
    light: 1.5,
    regular: 1.75,
    medium: 2.25,
    bold: 2.75,
  };
  const strokeWidth = state.icons?.weight ? weightMap[state.icons.weight] ?? 1.75 : 1.75;

  // =========================================================================
  // 1. MODERN SAAS APP HEADER (Default)
  // =========================================================================
  if (layout === 'saas-header') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        <header
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            borderBottom: '1px solid var(--ts-color-border)',
            boxShadow: 'var(--ts-shadow)',
            padding: '0 var(--ts-space-lg)',
            minHeight: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-md)',
            boxSizing: 'border-box',
          }}
        >
          {/* Left: Brand + Monogram + Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 'calc(var(--ts-base-size) * 0.85)',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                TS
              </div>
              <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
                {state.name}
              </span>
            </div>

            <div style={{ height: '18px', width: '1px', backgroundColor: 'var(--ts-color-border)' }} className="hidden sm:block" />

            <div className="hidden md:flex items-center gap-1.5 text-xs opacity-75">
              <span>Workspaces</span>
              <span>/</span>
              <span style={{ fontWeight: 600, color: 'var(--ts-color-primary)' }}>Design System</span>
            </div>
          </div>

          {/* Center: Global Search Input with Command Key Shortcut */}
          <div className="hidden lg:flex items-center" style={{ flex: '0 1 360px' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: '6px 12px',
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
              }}
            >
              <Search style={{ width: '14px', height: '14px', opacity: 0.5 }} strokeWidth={strokeWidth} />
              <input
                type="text"
                readOnly
                value="Search tokens, components..."
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  color: 'var(--ts-color-text)',
                  width: '100%',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                }}
              />
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  fontSize: '10px',
                  fontWeight: 600,
                  opacity: 0.7,
                }}
              >
                <Command style={{ width: '10px', height: '10px' }} strokeWidth={strokeWidth} />
                <span>K</span>
              </span>
            </div>
          </div>

          {/* Right: Actions, Notifications, and User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-sm)' }}>
            <button
              type="button"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: 'transparent',
                border: '1px solid var(--ts-color-border)',
                color: 'var(--ts-color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell style={{ width: '15px', height: '15px' }} strokeWidth={strokeWidth} />
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ts-color-primary)',
                }}
              />
            </button>

            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: '6px 14px',
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <Plus style={{ width: '14px', height: '14px' }} strokeWidth={strokeWidth} />
              <span className="hidden sm:inline">Add Token</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '4px', cursor: 'pointer' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
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
              <ChevronDown style={{ width: '12px', height: '12px', opacity: 0.6 }} strokeWidth={strokeWidth} />
            </div>
          </div>
        </header>

        {/* Showcase Context Card */}
        <div style={{ padding: 'var(--ts-space-md)', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sparkles style={{ width: '14px', height: '14px', color: 'var(--ts-color-primary)' }} strokeWidth={strokeWidth} />
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 0.95)', fontWeight: 700, margin: 0 }}>
              Layout: Modern SaaS Header
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.75 }}>
            Industry-standard SaaS top navigation bar featuring global ⌘K search, contextual breadcrumbs, notification badges, and user profile drawer.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. MINIMALIST CENTERED NAVIGATION
  // =========================================================================
  if (layout === 'minimal-center') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        <header
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            borderBottom: '1px solid var(--ts-color-border)',
            boxShadow: 'var(--ts-shadow)',
            padding: '0 var(--ts-space-xl)',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          {/* Left: Brand Monogram */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '12px',
              }}
            >
              TS
            </div>
            <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
              {state.name}
            </span>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-1" style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600 }}>
            {['Product', 'Documentation', 'Tokens', 'Changelog', 'Pricing'].map((item, idx) => (
              <button
                key={item}
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 'var(--ts-radius)',
                  color: idx === 0 ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                  backgroundColor: idx === 0 ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
                  fontWeight: idx === 0 ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right: Direct CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ts-color-text)',
                padding: '6px 12px',
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: '6px 14px',
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              Get Started
            </button>
          </div>
        </header>

        <div style={{ padding: 'var(--ts-space-md)', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sparkles style={{ width: '14px', height: '14px', color: 'var(--ts-color-primary)' }} strokeWidth={strokeWidth} />
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 0.95)', fontWeight: 700, margin: 0 }}>
              Layout: Minimalist Centered Nav
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.75 }}>
            Editorial and marketing-oriented centered link cluster flanked by prominent brand identity and high-converting primary CTAs.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. FLOATING ISLAND PILL HEADER
  // =========================================================================
  if (layout === 'floating-pill') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)', position: 'relative' }}>
        {/* Mock background pattern */}
        <div
          style={{
            height: '200px',
            borderRadius: 'var(--ts-radius)',
            border: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-surface)',
            position: 'relative',
            overflow: 'hidden',
            padding: 'var(--ts-space-xl)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* The Floating Pill Header floating on top */}
          <header
            style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 32px)',
              maxWidth: '680px',
              backgroundColor: `${activeColors.surface}ee`,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${activeColors.border}`,
              borderRadius: '9999px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.25)',
              zIndex: 10,
              boxSizing: 'border-box',
            }}
          >
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
                  fontWeight: 800,
                  fontSize: '11px',
                }}
              >
                TS
              </div>
              <span style={{ fontWeight: 800, fontSize: '13px' }}>{state.name}</span>
            </div>

            <nav className="hidden sm:flex items-center gap-1" style={{ fontSize: '12px', fontWeight: 600 }}>
              {['Home', 'Components', 'Tokens', 'Docs'].map((item, idx) => (
                <span
                  key={item}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    backgroundColor: idx === 0 ? 'var(--ts-color-background)' : 'transparent',
                    color: idx === 0 ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </span>
              ))}
            </nav>

            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: '9999px',
                padding: '5px 12px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              Launch App
            </button>
          </header>

          <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))', fontWeight: 800, margin: '24px 0 6px 0' }}>
            Elevate Your Canvas Navigation
          </h2>
          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.7 }}>
            Floating frosted pill header optimized for landing pages, modern portfolios, and spatial app shells.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. TABBED SUBNAV HEADER
  // =========================================================================
  if (layout === 'tabbed-nav') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        <header
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            borderBottom: '1px solid var(--ts-color-border)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Row 1: Brand & Utilities */}
          <div
            style={{
              padding: '0 var(--ts-space-lg)',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--ts-color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '11px',
                }}
              >
                TS
              </div>
              <span style={{ fontWeight: 800, fontSize: '14px' }}>{state.name}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 8px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  fontSize: '12px',
                }}
              >
                <Activity style={{ width: '13px', height: '13px', color: '#10b981' }} strokeWidth={strokeWidth} />
                <span style={{ fontWeight: 600 }}>v2.4.0 Live</span>
              </div>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '10px',
                }}
              >
                TS
              </div>
            </div>
          </div>

          {/* Row 2: Navigation Tabs */}
          <div style={{ padding: '0 var(--ts-space-lg)', display: 'flex', gap: 'var(--ts-space-md)', overflowX: 'auto' }}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'tokens', label: 'Token Matrix' },
              { id: 'components', label: 'Components' },
              { id: 'wcag', label: 'Accessibility Audit' },
              { id: 'releases', label: 'Version Releases' },
              { id: 'settings', label: 'Settings' },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: isSelected ? '2px solid var(--ts-color-primary)' : '2px solid transparent',
                    color: isSelected ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: 'calc(var(--ts-base-size) * 0.82)',
                    padding: '12px 4px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        <div style={{ padding: 'var(--ts-space-md)', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sparkles style={{ width: '14px', height: '14px', color: 'var(--ts-color-primary)' }} strokeWidth={strokeWidth} />
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 0.95)', fontWeight: 700, margin: 0 }}>
              Layout: Tabbed Subnavigation Header
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.75 }}>
            Two-tier operational header featuring top utility tools and integrated sliding bottom subnav tabs with persistent active indicator.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. E-COMMERCE / COMMAND ACTION HEADER
  // =========================================================================
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
      <header
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          borderBottom: '1px solid var(--ts-color-border)',
          boxShadow: 'var(--ts-shadow)',
          padding: '12px var(--ts-space-lg)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--ts-space-md)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '12px',
            }}
          >
            TS
          </div>
          <span style={{ fontWeight: 800, fontSize: '15px' }}>Store & Catalog</span>
        </div>

        {/* Global Search Bar with Category Dropdown */}
        <div style={{ flex: '1 1 320px', display: 'flex', alignItems: 'center', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: '4px 8px' }}>
          <select
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--ts-color-text)',
              paddingRight: '6px',
              borderRight: '1px solid var(--ts-color-border)',
              marginRight: '6px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option>All Items</option>
            <option>Tokens</option>
            <option>Components</option>
            <option>Templates</option>
          </select>
          <input
            type="text"
            readOnly
            value="Quick jump or command..."
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: 'var(--ts-color-text)',
              width: '100%',
              fontSize: '12px',
            }}
          />
          <Search style={{ width: '15px', height: '15px', opacity: 0.5 }} strokeWidth={strokeWidth} />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <Plus style={{ width: '13px', height: '13px' }} strokeWidth={strokeWidth} />
            <span>Create Entity</span>
          </button>
        </div>
      </header>

      <div style={{ padding: 'var(--ts-space-md)', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Sparkles style={{ width: '14px', height: '14px', color: 'var(--ts-color-primary)' }} strokeWidth={strokeWidth} />
          <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 0.95)', fontWeight: 700, margin: 0 }}>
            Layout: E-Commerce / Command Action Header
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.75 }}>
          Integrated multi-parameter search bar with inline category picker, primary catalog creation trigger, and fast entity access.
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import { AppIcon } from '../../common/AppIcon';
import type { PageLayouts } from '../../../config/schema';

export interface DynamicNavbarProps {
  variant?: PageLayouts['navbar'];
  brandName?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DynamicNavbar: React.FC<DynamicNavbarProps> = ({
  variant,
  brandName,
  activeTab: controlledActiveTab,
  onTabChange,
  className = '',
  style: userStyle = {},
}) => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = variant ?? state.pageLayouts?.navbar ?? 'saas-header';
  const name = brandName ?? state.name ?? 'ApexDesign';

  const [localActiveTab, setLocalActiveTab] = useState('overview');
  const activeTab = controlledActiveTab ?? localActiveTab;
  const handleTabClick = (tab: string) => {
    setLocalActiveTab(tab);
    onTabChange?.(tab);
  };

  // 1. MODERN SAAS APP HEADER
  if (layout === 'saas-header') {
    return (
      <header
        className={className}
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
          flexShrink: 0,
          width: '100%',
          zIndex: 10,
          ...userStyle,
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
              {name.substring(0, 2).toUpperCase()}
            </div>
            <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
              {name}
            </span>
          </div>

          <div style={{ height: '18px', width: '1px', backgroundColor: 'var(--ts-color-border)' }} className="hidden sm:block" />

          <div className="hidden md:flex items-center gap-1.5 text-xs opacity-75">
            <span>Platform</span>
            <span>/</span>
            <span style={{ fontWeight: 600, color: 'var(--ts-color-primary)' }}>Overview</span>
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
            <AppIcon name="search" size={14} style={{ opacity: 0.5 }} />
            <input
              type="text"
              readOnly
              value="Search resources, tokens, docs..."
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
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: '4px',
                padding: '2px 5px',
                fontSize: '10px',
                fontWeight: 600,
                opacity: 0.7,
              }}
            >
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: Actions, Notifications & User Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-sm)' }}>
          <div
            className="hidden sm:flex items-center gap-1.5"
            style={{
              backgroundColor: 'rgba(2, 132, 199, 0.08)',
              border: '1px solid var(--ts-color-primary)',
              borderRadius: 'var(--ts-radius)',
              padding: '4px 8px',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
              color: 'var(--ts-color-primary)',
            }}
          >
            <AppIcon name="sparkles" size={12} />
            <span>AI Ready</span>
          </div>

          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              borderRadius: 'var(--ts-radius)',
              padding: '6px 14px',
              border: 'none',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              boxShadow: 'var(--ts-shadow)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AppIcon name="plus" size={14} />
            <span>Create</span>
          </button>

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
            <AppIcon name="bell" size={15} />
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

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              cursor: 'pointer',
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
                fontSize: '11px',
              }}
            >
              AR
            </div>
            <AppIcon name="chevronDown" size={12} style={{ opacity: 0.6 }} />
          </div>
        </div>
      </header>
    );
  }

  // 2. MINIMALIST CENTERED NAVIGATION
  if (layout === 'minimal-center') {
    return (
      <header
        className={className}
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
          flexShrink: 0,
          width: '100%',
          zIndex: 10,
          ...userStyle,
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
            {name.substring(0, 2).toUpperCase()}
          </div>
          <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
            {name}
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
    );
  }

  // 3. FLOATING ISLAND PILL HEADER
  if (layout === 'floating-pill') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 16px',
          boxSizing: 'border-box',
          zIndex: 20,
          ...userStyle,
        }}
      >
        <header
          style={{
            width: '100%',
            maxWidth: '760px',
            backgroundColor: `${activeColors.surface}f2`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${activeColors.border}`,
            borderRadius: '9999px',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 36px -12px rgba(0,0,0,0.22)',
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
                fontSize: '10px',
              }}
            >
              {name.substring(0, 2).toUpperCase()}
            </div>
            <span style={{ fontWeight: 800, fontSize: '13px' }}>{name}</span>
          </div>

          <nav className="hidden sm:flex items-center gap-1" style={{ fontSize: '12px', fontWeight: 600 }}>
            {['Features', 'Docs', 'Pricing'].map((item) => (
              <span
                key={item}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Launch App
            </button>
          </div>
        </header>
      </div>
    );
  }

  // 4. TABBED SUBNAVIGATION HEADER
  if (layout === 'tabbed-nav') {
    return (
      <header
        className={className}
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          borderBottom: '1px solid var(--ts-color-border)',
          boxShadow: 'var(--ts-shadow)',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          boxSizing: 'border-box',
          flexShrink: 0,
          zIndex: 10,
          ...userStyle,
        }}
      >
        {/* Row 1: Top Utility Bar */}
        <div
          style={{
            padding: '10px var(--ts-space-lg)',
            borderBottom: '1px solid var(--ts-color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              {name.substring(0, 2).toUpperCase()}
            </div>
            <span style={{ fontWeight: 800, fontSize: '14px' }}>{name}</span>
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
              <AppIcon name="activity" size={13} style={{ color: '#10b981' }} />
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
              AR
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
            { id: 'releases', label: 'Releases' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
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
    );
  }

  // 5. E-COMMERCE / COMMAND ACTION HEADER
  return (
    <header
      className={className}
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
        flexShrink: 0,
        width: '100%',
        zIndex: 10,
        ...userStyle,
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
          {name.substring(0, 2).toUpperCase()}
        </div>
        <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '15px' }}>
          {name} Store
        </span>
      </div>

      {/* Broad Search Bar with Category Dropdown */}
      <div
        className="hidden md:flex items-center flex-1"
        style={{
          maxWidth: '520px',
          backgroundColor: 'var(--ts-color-background)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            padding: '8px 12px',
            backgroundColor: 'var(--ts-color-surface)',
            borderRight: '1px solid var(--ts-color-border)',
            fontSize: '12px',
            fontWeight: 600,
            opacity: 0.8,
            cursor: 'pointer',
          }}
        >
          All Categories
        </span>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', flex: 1, gap: '6px' }}>
          <AppIcon name="search" size={14} style={{ opacity: 0.5 }} />
          <input
            type="text"
            readOnly
            value="Search design kits, themes, presets..."
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: 'var(--ts-color-text)',
              width: '100%',
              fontSize: '12px',
              padding: '6px 0',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {/* Right Action Icons & Basket */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          style={{
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryTextColor,
            borderRadius: 'var(--ts-radius)',
            padding: '6px 12px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <AppIcon name="plus" size={13} />
          <span>New Order</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              background: 'transparent',
              color: 'var(--ts-color-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title="Wishlist"
          >
            <AppIcon name="heart" size={15} />
          </button>
          <button
            type="button"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--ts-radius)',
              border: '1px solid var(--ts-color-border)',
              background: 'transparent',
              color: 'var(--ts-color-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
            title="Shopping Cart"
          >
            <AppIcon name="shoppingCart" size={15} />
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                fontSize: '9px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};


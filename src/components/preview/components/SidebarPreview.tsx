import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import {
  LayoutDashboard,
  Layers,
  Palette,
  Type,
  Sliders,
  ShieldCheck,
  Settings,
  Users,
  FileCode,
  Folder,
  ChevronDown,
  LogOut,
  Plus,
  GitBranch,
  Terminal,
} from 'lucide-react';

export const SidebarPreview: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.sidebar ?? 'classic-grouped';
  const [activeItem, setActiveItem] = useState('tokens');

  const strokeWidth =
    state.iconStyle === 'bold-stroke'
      ? 2.5
      : state.iconStyle === 'minimal-thin'
      ? 1.25
      : 1.75;

  // =========================================================================
  // 1. CLASSIC GROUPED SIDEBAR (Default)
  // =========================================================================
  if (layout === 'classic-grouped') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--ts-space-lg)', minHeight: '480px' }}>
          {/* The Sidebar */}
          <aside
            style={{
              width: '260px',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'var(--ts-space-md)',
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            <div>
              {/* Brand Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: 'var(--ts-space-md)', borderBottom: '1px solid var(--ts-color-border)' }}>
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
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px', lineHeight: 1.2 }}>{state.name}</div>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>Enterprise Token Engine</div>
                </div>
              </div>

              {/* Navigation Section 1: CORE */}
              <div style={{ marginTop: 'var(--ts-space-md)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5, marginBottom: '6px', paddingLeft: '8px' }}>
                  Core System
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { id: 'tokens', label: 'Design Tokens', icon: Palette, badge: 'Live' },
                    { id: 'typography', label: 'Typography', icon: Type },
                    { id: 'components', label: 'Components', icon: Layers, badge: '24' },
                  ].map((item) => {
                    const isSelected = activeItem === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveItem(item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: 'calc(var(--ts-radius) - 2px)',
                          border: 'none',
                          backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'transparent',
                          color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '13px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon style={{ width: '16px', height: '16px' }} strokeWidth={strokeWidth} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            style={{
                              padding: '1px 6px',
                              borderRadius: '9999px',
                              fontSize: '10px',
                              fontWeight: 700,
                              backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--ts-color-border)',
                              color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Section 2: CONFIGURATION */}
              <div style={{ marginTop: 'var(--ts-space-md)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5, marginBottom: '6px', paddingLeft: '8px' }}>
                  Governance
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[
                    { id: 'wcag', label: 'WCAG AAA Guard', icon: ShieldCheck },
                    { id: 'tokens_export', label: 'Token Exporter', icon: FileCode },
                    { id: 'team', label: 'Team & Roles', icon: Users },
                    { id: 'settings', label: 'Preferences', icon: Settings },
                  ].map((item) => {
                    const isSelected = activeItem === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveItem(item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: 'calc(var(--ts-radius) - 2px)',
                          border: 'none',
                          backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'transparent',
                          color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '13px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon style={{ width: '16px', height: '16px' }} strokeWidth={strokeWidth} />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* User Footer Profile Pill */}
            <div
              style={{
                paddingTop: 'var(--ts-space-sm)',
                borderTop: '1px solid var(--ts-color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
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
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>Alex Rivers</div>
                  <div style={{ fontSize: '10px', opacity: 0.6 }}>alex@company.com</div>
                </div>
              </div>
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--ts-color-text)', opacity: 0.5, cursor: 'pointer', padding: '4px' }}
                title="Sign out"
              >
                <LogOut style={{ width: '14px', height: '14px' }} strokeWidth={strokeWidth} />
              </button>
            </div>
          </aside>

          {/* Simulated Right Content */}
          <div
            style={{
              flex: 1,
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Layers style={{ width: '32px', height: '32px', color: 'var(--ts-color-primary)', marginBottom: '12px' }} strokeWidth={strokeWidth} />
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, margin: '0 0 6px 0' }}>
              Selected Surface: {activeItem.toUpperCase()}
            </h3>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.7, maxWidth: '340px' }}>
              The classic grouped sidebar provides familiar category hierarchy with section headers, counters, and footer account controls.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. COMPACT ICON RAIL
  // =========================================================================
  if (layout === 'compact-rail') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--ts-space-lg)', minHeight: '460px' }}>
          {/* Slim Icon Rail */}
          <aside
            style={{
              width: '64px',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 8px',
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
              {/* Brand Logo */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                }}
              >
                TS
              </div>

              {/* Vertical Icon Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center' }}>
                {[
                  { id: 'dashboard', icon: LayoutDashboard, title: 'Dashboard' },
                  { id: 'tokens', icon: Palette, title: 'Tokens' },
                  { id: 'typography', icon: Type, title: 'Typography' },
                  { id: 'components', icon: Layers, title: 'Components' },
                  { id: 'governance', icon: ShieldCheck, title: 'Security' },
                  { id: 'settings', icon: Settings, title: 'Settings' },
                ].map((item) => {
                  const isSelected = activeItem === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveItem(item.id)}
                      title={item.title}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--ts-radius)',
                        border: 'none',
                        backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'transparent',
                        color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Icon style={{ width: '18px', height: '18px' }} strokeWidth={strokeWidth} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Avatar */}
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
                cursor: 'pointer',
              }}
            >
              AR
            </div>
          </aside>

          {/* Right Simulated Content */}
          <div
            style={{
              flex: 1,
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Sliders style={{ width: '32px', height: '32px', color: 'var(--ts-color-primary)', marginBottom: '12px' }} strokeWidth={strokeWidth} />
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, margin: '0 0 6px 0' }}>
              Compact Icon Rail Navigation
            </h3>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.7, maxWidth: '360px' }}>
              Ultra-compact vertical icon rail maximizing canvas width for complex canvas-based tools, code editors, and telemetry dashboards.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. DUAL-PANE SIDEBAR
  // =========================================================================
  if (layout === 'dual-pane') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        <div style={{ display: 'flex', gap: '0', minHeight: '460px', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', overflow: 'hidden' }}>
          {/* Pane 1: Slim Icon Rail */}
          <div
            style={{
              width: '56px',
              backgroundColor: 'var(--ts-color-background)',
              borderRight: '1px solid var(--ts-color-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 0',
              gap: '14px',
            }}
          >
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
            {[LayoutDashboard, Layers, FileCode, Settings].map((Icon, i) => (
              <button
                key={i}
                type="button"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--ts-radius)',
                  border: 'none',
                  backgroundColor: i === 1 ? 'var(--ts-color-primary)' : 'transparent',
                  color: i === 1 ? primaryTextColor : 'var(--ts-color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Icon style={{ width: '16px', height: '16px' }} strokeWidth={strokeWidth} />
              </button>
            ))}
          </div>

          {/* Pane 2: Tree / Sub-Folder Menu */}
          <div
            style={{
              width: '210px',
              backgroundColor: 'var(--ts-color-surface)',
              borderRight: '1px solid var(--ts-color-border)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '13px' }}>Components Explorer</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
              {[
                { name: 'Buttons & CTAs', active: false },
                { name: 'Form Inputs', active: false },
                { name: 'Surface Cards', active: true },
                { name: 'Data Tables', active: false },
                { name: 'Feedback Banners', active: false },
              ].map((sub, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 8px',
                    borderRadius: 'var(--ts-radius)',
                    backgroundColor: sub.active ? 'var(--ts-color-primary)' : 'transparent',
                    color: sub.active ? primaryTextColor : 'var(--ts-color-text)',
                    fontWeight: sub.active ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  <Folder style={{ width: '13px', height: '13px' }} strokeWidth={strokeWidth} />
                  <span>{sub.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div style={{ flex: 1, backgroundColor: 'var(--ts-color-background)', padding: 'var(--ts-space-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, margin: '0 0 6px 0' }}>Dual-Pane Explorer View</h3>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.7 }}>
              Combines a primary domain rail with an expanded secondary tree pane, ideal for deep hierarchical navigation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. FLOATING DETACHED CARD SIDEBAR
  // =========================================================================
  if (layout === 'floating-card') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--ts-space-lg)', minHeight: '460px', padding: '16px', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)' }}>
          <aside
            style={{
              width: '240px',
              backgroundColor: 'var(--ts-color-surface)',
              borderRadius: 'calc(var(--ts-radius) * 1.5)',
              border: '1px solid var(--ts-color-border)',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: 'var(--ts-color-primary)', color: primaryTextColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>
                  TS
                </div>
                <span style={{ fontWeight: 800, fontSize: '14px' }}>{state.name}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {['Overview', 'Tokens', 'Components', 'Accessibility', 'Settings'].map((item, idx) => (
                  <div
                    key={item}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--ts-radius)',
                      backgroundColor: idx === 1 ? 'rgba(2, 132, 199, 0.1)' : 'transparent',
                      color: idx === 1 ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                      fontWeight: idx === 1 ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Storage Quota Card */}
            <div style={{ padding: '12px', borderRadius: 'var(--ts-radius)', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)', fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: 600 }}>
                <span>Token Storage</span>
                <span>84%</span>
              </div>
              <div style={{ width: '100%', height: '4px', borderRadius: '2px', backgroundColor: 'var(--ts-color-border)', overflow: 'hidden' }}>
                <div style={{ width: '84%', height: '100%', backgroundColor: 'var(--ts-color-primary)' }} />
              </div>
            </div>
          </aside>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, margin: '0 0 6px 0' }}>Floating Island Sidebar</h3>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.7 }}>
                Elevated detached sidebar container with generous radius, isolated from surrounding viewport walls.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. ENTERPRISE WORKSPACE SHELL
  // =========================================================================
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
      <div style={{ display: 'flex', gap: 'var(--ts-space-lg)', minHeight: '460px' }}>
        <aside
          style={{
            width: '260px',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <div>
            {/* Workspace Switcher Dropdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                marginBottom: '14px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '4px', backgroundColor: 'var(--ts-color-primary)', color: primaryTextColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '10px' }}>
                  TS
                </div>
                <span style={{ fontWeight: 700, fontSize: '12px' }}>Acme Corp Prod</span>
              </div>
              <ChevronDown style={{ width: '12px', height: '12px', opacity: 0.5 }} strokeWidth={strokeWidth} />
            </div>

            {/* Quick Action */}
            <button
              type="button"
              style={{
                width: '100%',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                marginBottom: '16px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <Plus style={{ width: '14px', height: '14px' }} strokeWidth={strokeWidth} />
              <span>Create Design Spec</span>
            </button>

            {/* Git Branch & Sync */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', opacity: 0.7, padding: '0 4px 12px 4px', borderBottom: '1px solid var(--ts-color-border)' }}>
              <GitBranch style={{ width: '13px', height: '13px', color: 'var(--ts-color-primary)' }} strokeWidth={strokeWidth} />
              <span style={{ fontWeight: 600 }}>Branch: main</span>
              <span style={{ marginLeft: 'auto', color: '#10b981', fontWeight: 700 }}>● Synced</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: 'var(--ts-radius)', backgroundColor: 'var(--ts-color-background)', fontSize: '11px' }}>
            <Terminal style={{ width: '14px', height: '14px', color: 'var(--ts-color-primary)' }} strokeWidth={strokeWidth} />
            <span style={{ fontWeight: 600 }}>CLI Daemon Active</span>
          </div>
        </aside>

        <div style={{ flex: 1, backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--ts-space-xl)' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, margin: '0 0 6px 0' }}>Enterprise Workspace Shell</h3>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.7 }}>
              Engineered for multi-tenant organizations with quick-create actions, git branch context, and daemon sync status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

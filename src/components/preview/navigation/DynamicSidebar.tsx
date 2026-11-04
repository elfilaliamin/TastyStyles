import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import { AppIcon, type IconName } from '../../common/AppIcon';
import type { PageLayouts } from '../../../config/schema';

export interface DynamicSidebarProps {
  variant?: PageLayouts['sidebar'];
  activeItem?: string;
  onSelectItem?: (id: string) => void;
  brandName?: string;
  className?: string;
  style?: React.CSSProperties;
}

const sidebarIconMap: Record<string, IconName> = {
  dashboard: 'layers',
  tokens: 'palette',
  typography: 'sparkles',
  components: 'folder',
  wcag: 'shield',
  tokens_export: 'download',
  team: 'user',
  settings: 'settings',
  governance: 'shield',
  code: 'code',
  database: 'database',
};

export const DynamicSidebar: React.FC<DynamicSidebarProps> = ({
  variant,
  activeItem: controlledActiveItem,
  onSelectItem,
  brandName,
  className = '',
  style: userStyle = {},
}) => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = variant ?? state.pageLayouts?.sidebar ?? 'classic-grouped';
  const name = brandName ?? state.name ?? 'ApexDesign';

  const [localActiveItem, setLocalActiveItem] = useState('dashboard');
  const activeItem = controlledActiveItem ?? localActiveItem;
  const handleItemClick = (id: string) => {
    setLocalActiveItem(id);
    onSelectItem?.(id);
  };

  // 1. CLASSIC GROUPED SIDEBAR
  if (layout === 'classic-grouped') {
    return (
      <aside
        className={className}
        style={{
          width: '260px',
          maxWidth: '100%',
          height: '100%',
          backgroundColor: 'var(--ts-color-surface)',
          borderRight: '1px solid var(--ts-color-border)',
          boxShadow: 'var(--ts-shadow)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'var(--ts-space-md)',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflowY: 'auto',
          zIndex: 10,
          ...userStyle,
        }}
      >
        <div>
          {/* Brand Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingBottom: 'var(--ts-space-md)',
              borderBottom: '1px solid var(--ts-color-border)',
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
              {name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px', lineHeight: 1.2 }}>{name}</div>
              <div style={{ fontSize: '11px', opacity: 0.6 }}>Enterprise Token Engine</div>
            </div>
          </div>

          {/* Navigation Section 1: CORE */}
          <div style={{ marginTop: 'var(--ts-space-md)' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: 0.5,
                marginBottom: '6px',
                paddingLeft: '8px',
              }}
            >
              Core System
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'tokens', label: 'Design Tokens', badge: 'Live' },
                { id: 'typography', label: 'Typography' },
                { id: 'components', label: 'Components', badge: '24' },
              ].map((item) => {
                const isSelected = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--ts-radius)',
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
                      <AppIcon name={sidebarIconMap[item.id] ?? 'folder'} size={16} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '9999px',
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--ts-color-background)',
                          border: isSelected ? 'none' : '1px solid var(--ts-color-border)',
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

          {/* Navigation Section 2: GOVERNANCE */}
          <div style={{ marginTop: 'var(--ts-space-lg)' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: 0.5,
                marginBottom: '6px',
                paddingLeft: '8px',
              }}
            >
              Governance & Ops
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { id: 'wcag', label: 'Accessibility WCAG' },
                { id: 'tokens_export', label: 'Export DTCG' },
                { id: 'team', label: 'Team Roles' },
                { id: 'settings', label: 'System Settings' },
              ].map((item) => {
                const isSelected = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--ts-radius)',
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
                      <AppIcon name={sidebarIconMap[item.id] ?? 'folder'} size={16} />
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
            <AppIcon name="logOut" size={14} />
          </button>
        </div>
      </aside>
    );
  }

  // 2. COMPACT ICON RAIL
  if (layout === 'compact-rail') {
    return (
      <aside
        className={className}
        style={{
          width: '64px',
          height: '100%',
          backgroundColor: 'var(--ts-color-surface)',
          borderRight: '1px solid var(--ts-color-border)',
          boxShadow: 'var(--ts-shadow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 8px',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflowY: 'auto',
          zIndex: 10,
          ...userStyle,
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
            {name.substring(0, 2).toUpperCase()}
          </div>

          {/* Vertical Icon Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center' }}>
            {[
              { id: 'dashboard', title: 'Dashboard' },
              { id: 'tokens', title: 'Tokens' },
              { id: 'typography', title: 'Typography' },
              { id: 'components', title: 'Components' },
              { id: 'governance', title: 'Security' },
              { id: 'settings', title: 'Settings' },
            ].map((item) => {
              const isSelected = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
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
                  <AppIcon name={sidebarIconMap[item.id] ?? 'folder'} size={18} />
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
    );
  }

  // 3. DUAL-PANE SIDEBAR
  if (layout === 'dual-pane') {
    return (
      <aside
        className={className}
        style={{
          display: 'flex',
          height: '100%',
          flexShrink: 0,
          zIndex: 10,
          ...userStyle,
        }}
      >
        {/* Pane 1: Slim Icon Rail */}
        <div
          style={{
            width: '60px',
            height: '100%',
            backgroundColor: 'var(--ts-color-surface)',
            borderRight: '1px solid var(--ts-color-border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px 8px',
            flexShrink: 0,
            overflowY: 'auto',
            gap: '14px',
            boxSizing: 'border-box',
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
            {name.substring(0, 2).toUpperCase()}
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--ts-color-border)' }} />
          {[
            { id: 'code' },
            { id: 'layers' },
            { id: 'database' },
            { id: 'settings' },
          ].map((item, idx) => (
            <button
              key={item.id}
              type="button"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: idx === 0 ? 'var(--ts-color-background)' : 'transparent',
                border: idx === 0 ? '1px solid var(--ts-color-border)' : 'none',
                color: 'var(--ts-color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <AppIcon name={sidebarIconMap[item.id] ?? 'folder'} size={16} />
            </button>
          ))}
        </div>

        {/* Pane 2: Expanded Explorer Pane */}
        <div
          style={{
            width: '200px',
            height: '100%',
            backgroundColor: 'var(--ts-color-surface)',
            borderRight: '1px solid var(--ts-color-border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 12px',
            flexShrink: 0,
            overflowY: 'auto',
            gap: '8px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
            Explorer
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
            {['src/styles/tokens.css', 'src/config/schema.ts', 'src/lib/contrast.ts', 'DESIGN.md'].map((file, idx) => (
              <div
                key={file}
                style={{
                  padding: '6px 8px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: idx === 0 ? 'rgba(2, 132, 199, 0.12)' : 'transparent',
                  color: idx === 0 ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                  fontWeight: idx === 0 ? 600 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <AppIcon name="folder" size={12} />
                <span style={{ fontFamily: 'monospace', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  // 4. FLOATING DETACHED CARD SIDEBAR
  if (layout === 'floating-card') {
    return (
      <aside
        className={className}
        style={{
          width: '240px',
          maxWidth: 'calc(100% - 24px)',
          height: 'calc(100% - 24px)',
          margin: '12px',
          backgroundColor: 'var(--ts-color-surface)',
          borderRadius: 'var(--ts-radius-surface, 16px)',
          border: '1px solid var(--ts-color-border)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflowY: 'auto',
          zIndex: 10,
          ...userStyle,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
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
            <span style={{ fontWeight: 800, fontSize: '14px' }}>{name}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['Overview', 'Tokens', 'Components', 'Accessibility', 'Settings'].map((item, idx) => (
              <div
                key={item}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: idx === 0 ? 'rgba(2, 132, 199, 0.1)' : 'transparent',
                  color: idx === 0 ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                  fontWeight: idx === 0 ? 700 : 500,
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
        <div
          style={{
            padding: '12px',
            borderRadius: 'var(--ts-radius)',
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            fontSize: '11px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: 600 }}>
            <span>Token Storage</span>
            <span>84%</span>
          </div>
          <div style={{ width: '100%', height: '4px', borderRadius: '2px', backgroundColor: 'var(--ts-color-border)', overflow: 'hidden' }}>
            <div style={{ width: '84%', height: '100%', backgroundColor: 'var(--ts-color-primary)' }} />
          </div>
        </div>
      </aside>
    );
  }

  // 5. ENTERPRISE WORKSPACE SHELL
  return (
    <aside
      className={className}
      style={{
        width: '260px',
        maxWidth: '100%',
        height: '100%',
        backgroundColor: 'var(--ts-color-surface)',
        borderRight: '1px solid var(--ts-color-border)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        flexShrink: 0,
        overflowY: 'auto',
        zIndex: 10,
        ...userStyle,
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
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '4px',
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
            <span style={{ fontWeight: 700, fontSize: '12px' }}>Acme Corp Prod</span>
          </div>
          <AppIcon name="chevronDown" size={12} style={{ opacity: 0.5 }} />
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
          <AppIcon name="plus" size={14} />
          <span>Create Design Spec</span>
        </button>

        {/* Git Branch & Sync */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            opacity: 0.7,
            padding: '0 4px 12px 4px',
            borderBottom: '1px solid var(--ts-color-border)',
          }}
        >
          <AppIcon name="gitBranch" size={13} style={{ color: 'var(--ts-color-primary)' }} />
          <span style={{ fontWeight: 600 }}>Branch: main</span>
          <span style={{ marginLeft: 'auto', color: '#10b981', fontWeight: 700 }}>● Synced</span>
        </div>

        {/* Navigation list in workspace shell */}
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'tokens', label: 'Tokens' },
            { id: 'components', label: 'Components' },
            { id: 'settings', label: 'Settings' },
          ].map((item) => {
            const isSelected = activeItem === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '7px 10px',
                  borderRadius: 'var(--ts-radius)',
                  border: 'none',
                  backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'transparent',
                  color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <AppIcon name={sidebarIconMap[item.id] ?? 'folder'} size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px',
          borderRadius: 'var(--ts-radius)',
          backgroundColor: 'var(--ts-color-background)',
          fontSize: '11px',
        }}
      >
        <AppIcon name="terminal" size={14} style={{ color: 'var(--ts-color-primary)' }} />
        <span style={{ fontWeight: 600 }}>CLI Daemon Active</span>
      </div>
    </aside>
  );
};


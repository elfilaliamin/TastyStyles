import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { AppIcon } from '../../common/AppIcon';
import { DynamicSidebar } from '../navigation/DynamicSidebar';

export const SidebarPreview: React.FC = () => {
  const { state } = useDesign();
  const layout = state.pageLayouts?.sidebar ?? 'classic-grouped';
  const [activeItem, setActiveItem] = useState('tokens');

  const descriptions: Record<string, { title: string; desc: string }> = {
    'classic-grouped': {
      title: 'Classic Grouped Sidebar',
      desc: 'The classic grouped sidebar provides familiar category hierarchy with section headers, counters, and footer account controls.',
    },
    'compact-rail': {
      title: 'Compact Icon Rail Navigation',
      desc: 'Ultra-compact vertical icon rail maximizing canvas width for complex canvas-based tools, code editors, and telemetry dashboards.',
    },
    'dual-pane': {
      title: 'Dual-Pane Explorer View',
      desc: 'Combines a primary domain rail with an expanded secondary tree pane, ideal for deep hierarchical navigation.',
    },
    'floating-card': {
      title: 'Floating Island Sidebar',
      desc: 'Elevated detached sidebar container with generous radius, isolated from surrounding viewport walls.',
    },
    'workspace-shell': {
      title: 'Enterprise Workspace Shell',
      desc: 'Engineered for multi-tenant organizations with quick-create actions, git branch context, and daemon sync status.',
    },
  };

  const currentInfo = descriptions[layout] ?? descriptions['classic-grouped'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: 'var(--ts-color-background)',
      }}
    >
      <DynamicSidebar activeItem={activeItem} onSelectItem={setActiveItem} className="w-full md:w-auto flex-1 md:flex-initial" />

      {/* Simulated Right Content - hidden on 375px mobile to give sidebar full canvas, visible on tablet & desktop */}
      <main
        className="hidden md:flex"
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: 'var(--ts-color-background)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'var(--ts-space-xl)',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            width: '100%',
            padding: 'var(--ts-space-lg)',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AppIcon name="layers" size={32} style={{ color: 'var(--ts-color-primary)', marginBottom: '12px' }} />
          <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, margin: '0 0 6px 0', fontSize: 'calc(var(--ts-base-size) * 1.05)' }}>
            {currentInfo.title}
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', opacity: 0.75, maxWidth: '380px', lineHeight: 1.5 }}>
            {currentInfo.desc}
          </p>
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Active Selection: <span style={{ color: 'var(--ts-color-primary)' }}>{activeItem.toUpperCase()}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

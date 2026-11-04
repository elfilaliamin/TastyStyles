import React from 'react';
import { useDesign } from '../../../context/DesignContext';
import { AppIcon } from '../../common/AppIcon';
import { DynamicNavbar } from '../navigation/DynamicNavbar';

export const NavbarPreview: React.FC = () => {
  const { state } = useDesign();
  const layout = state.pageLayouts?.navbar ?? 'saas-header';

  const descriptions: Record<string, { title: string; desc: string }> = {
    'saas-header': {
      title: 'Layout: Modern SaaS Header',
      desc: 'Industry-standard SaaS top navigation bar featuring global ⌘K search, contextual breadcrumbs, notification badges, and user profile drawer.',
    },
    'minimal-center': {
      title: 'Layout: Minimalist Centered Nav',
      desc: 'Clean, distraction-free marketing navigation with brand logo on left, centered navigation anchors, and direct conversion triggers.',
    },
    'floating-pill': {
      title: 'Layout: Floating Island Pill Header',
      desc: 'Modern detached pill navigation bar with rounded borders and blurred backdrop filter floating atop page content.',
    },
    'tabbed-nav': {
      title: 'Layout: Tabbed Subnavigation Header',
      desc: 'Two-tier operational header featuring top utility tools and integrated sliding bottom subnav tabs with persistent active indicator.',
    },
    'ecommerce-action': {
      title: 'Layout: Command & Action Navigation',
      desc: 'High-utility header with product category dropdown, global catalog search input, shopping cart indicator, and action triggers.',
    },
  };

  const currentInfo = descriptions[layout] ?? descriptions['saas-header'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'var(--ts-color-background)',
      }}
    >
      <DynamicNavbar />

      {/* Showcase Context Body */}
      <main
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: 'var(--ts-color-background)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--ts-space-xl)',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            padding: 'var(--ts-space-lg)',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <AppIcon name="sparkles" size={16} style={{ color: 'var(--ts-color-primary)' }} />
            <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 1.05)', fontWeight: 700, margin: 0 }}>
              {currentInfo.title}
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75, lineHeight: 1.5 }}>
            {currentInfo.desc}
          </p>
        </div>
      </main>
    </div>
  );
};

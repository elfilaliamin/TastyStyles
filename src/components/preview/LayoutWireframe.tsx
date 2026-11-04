import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { getLayoutEntry } from '../../lib/registry';
import { SidebarContentWireframe } from './wireframes/SidebarContentWireframe';
import { BentoGridWireframe } from './wireframes/BentoGridWireframe';
import { LandingWireframe } from './wireframes/LandingWireframe';
import { DashboardSplitWireframe } from './wireframes/DashboardSplitWireframe';

// Small component lookup map
const WIREFRAME_MAP: Record<string, React.ComponentType> = {
  'sidebar-content': SidebarContentWireframe,
  'bento-grid': BentoGridWireframe,
  'landing': LandingWireframe,
  'dashboard-split': DashboardSplitWireframe,
};

// Generic fallback wireframe for any custom added registry items
const GenericLayoutFallback: React.FC<{ label: string; desc: string }> = ({ label, desc }) => (
  <div
    style={{
      padding: 'var(--ts-space-xl)',
      backgroundColor: 'var(--ts-color-background)',
      color: 'var(--ts-color-text)',
      fontFamily: 'var(--ts-font-body)',
      borderRadius: 'var(--ts-radius-surface, 16px)',
      border: '1px solid var(--ts-color-border)',
      flex: 1,
      minHeight: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ts-space-md)',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        padding: 'var(--ts-space-xs) var(--ts-space-sm)',
        borderRadius: '9999px',
        backgroundColor: 'var(--ts-color-accent)',
        color: 'var(--ts-color-background)',
        fontSize: 'calc(var(--ts-base-size) * 0.75)',
        fontWeight: 700,
      }}
    >
      Dynamic Layout Archetype
    </div>
    <h2
      style={{
        fontFamily: 'var(--ts-font-heading)',
        fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
        fontWeight: 700,
        margin: 0,
      }}
    >
      {label}
    </h2>
    <p
      style={{
        maxWidth: '450px',
        fontSize: 'var(--ts-base-size)',
        opacity: 0.8,
        margin: 0,
      }}
    >
      {desc}
    </p>
  </div>
);

export const LayoutWireframe: React.FC = () => {
  const { state } = useDesign();
  const layout = getLayoutEntry(state.layout);

  if (!layout) {
    return <GenericLayoutFallback label="Custom Layout" desc="Dynamic layout from registry configuration." />;
  }

  const WireframeComponent = WIREFRAME_MAP[layout.wireframe];
  if (!WireframeComponent) {
    return <GenericLayoutFallback label={layout.label} desc={layout.description} />;
  }

  return <WireframeComponent />;
};


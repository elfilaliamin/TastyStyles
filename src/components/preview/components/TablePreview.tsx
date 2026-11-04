import React from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getBestContrastingColor } from '../../../lib/contrast';
import { AppIcon } from '../../common/AppIcon';

export const TablePreview: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  const rows = [
    { name: 'Core Design Tokens', category: 'Styling', status: 'Active', latency: '4ms', version: 'v2.4.0' },
    { name: 'Button & Controls Engine', category: 'Components', status: 'Active', latency: '6ms', version: 'v2.1.2' },
    { name: 'Markdown AI Generator', category: 'Compiler', status: 'Active', latency: '12ms', version: 'v3.0.0' },
    { name: 'WCAG Contrast Verifier', category: 'Accessibility', status: 'Passing', latency: '2ms', version: 'v1.8.4' },
    { name: 'Google Fonts Link Injector', category: 'Typography', status: 'Active', latency: '18ms', version: 'v1.4.1' },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-surface)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        borderRadius: 'var(--ts-radius-surface, 16px)',
        border: '1px solid var(--ts-color-border)',
        boxShadow: 'var(--ts-shadow)',
        padding: 'var(--ts-space-lg)',
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Data Tables & Entity Lists
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 'var(--ts-base-size)', opacity: 0.8 }}>
            Tabular layout with headers, status pills, and interactive row controls.
          </p>
        </div>
        <button
          type="button"
          style={{
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryTextColor,
            border: 'none',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            padding: 'var(--ts-space-xs) var(--ts-space-md)',
            fontSize: 'calc(var(--ts-base-size) * 0.85)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          + Export CSV
        </button>
      </div>

      {/* Table Container */}
      <div
        style={{
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius-surface, 16px)',
          overflowX: 'auto',
          backgroundColor: 'var(--ts-color-background)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                borderBottom: '1px solid var(--ts-color-border)',
              }}
            >
              <th style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Entity Name</span>
                  <AppIcon name="arrowUpDown" size={12} style={{ opacity: 0.5 }} />
                </div>
              </th>
              <th style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', fontWeight: 600 }}>Category</th>
              <th style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', fontWeight: 600 }}>Status</th>
              <th style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', fontWeight: 600 }}>Latency</th>
              <th style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.name}
                style={{
                  borderBottom: idx === rows.length - 1 ? 'none' : '1px solid var(--ts-color-border)',
                  backgroundColor: idx % 2 === 1 ? 'rgba(125, 125, 125, 0.03)' : 'transparent',
                }}
              >
                <td style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{row.name}</span>
                    <AppIcon name="externalLink" size={12} style={{ opacity: 0.4 }} />
                  </div>
                </td>
                <td style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', opacity: 0.8 }}>
                  {row.category}
                </td>
                <td style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)' }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: 'calc(var(--ts-base-size) * 0.72)',
                      fontWeight: 600,
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                    }}
                  >
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', fontFamily: 'monospace', opacity: 0.85 }}>
                  {row.latency}
                </td>
                <td style={{ padding: 'var(--ts-space-sm) var(--ts-space-md)', textAlign: 'right' }}>
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--ts-color-text)',
                      opacity: 0.7,
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <AppIcon name="moreHorizontal" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>
        <span>Showing 5 verified subsystems</span>
        <span>Version 2.4 Active Spec</span>
      </div>
    </div>
  );
};


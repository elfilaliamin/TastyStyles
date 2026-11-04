import React from 'react';

export const BentoGridWireframe: React.FC = () => {
  return (
    <div
      style={{
        padding: 'var(--ts-space-lg)',
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
      }}
    >
      <div style={{ marginBottom: 'var(--ts-space-md)' }}>
        <span
          style={{
            fontSize: 'calc(var(--ts-base-size) * 0.75)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--ts-color-accent)',
            fontWeight: 700,
          }}
        >
          Modular Architecture
        </span>
        <h2
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 700,
            margin: '4px 0 0 0',
          }}
        >
          Bento Grid Layout Archetype
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gridAutoRows: '120px',
          gap: 'var(--ts-space-md)',
        }}
      >
        {/* Large featured cell */}
        <div
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-lg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: 'var(--ts-color-background)',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                borderRadius: '9999px',
                fontSize: 'calc(var(--ts-base-size) * 0.75)',
                fontWeight: 600,
              }}
            >
              Featured Hero Cell
            </span>
            <h3
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                fontWeight: 700,
                marginTop: 'var(--ts-space-md)',
              }}
            >
              Dynamic Data Visualization
            </h3>
            <p
              style={{
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                opacity: 0.8,
                marginTop: 'var(--ts-space-xs)',
              }}
            >
              Multi-span modular cards provide strong visual contrast and focal points.
            </p>
          </div>
          <div
            style={{
              height: '40px',
              backgroundColor: 'var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 8px)',
              opacity: 0.4,
            }}
          />
        </div>

        {/* Cell 2 */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>
            Performance
          </div>
          <div
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
              fontWeight: 700,
              color: 'var(--ts-color-primary)',
            }}
          >
            99.98%
          </div>
        </div>

        {/* Cell 3 */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>
            Latency
          </div>
          <div
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
              fontWeight: 700,
              color: 'var(--ts-color-accent)',
            }}
          >
            14ms
          </div>
        </div>
      </div>
    </div>
  );
};


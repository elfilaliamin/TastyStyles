import React from 'react';

export const DashboardSplitWireframe: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        borderRadius: 'var(--ts-radius)',
        border: '1px solid var(--ts-color-border)',
        flex: 1,
        minHeight: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {/* Primary Analytics Stream (Left 65%) */}
      <div
        style={{
          flex: 2,
          padding: 'var(--ts-space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-md)',
          borderRight: '1px solid var(--ts-color-border)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                fontWeight: 700,
                margin: 0,
              }}
            >
              Realtime Telemetry
            </h2>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7 }}>
              Operations stream & distributed traces
            </span>
          </div>
          <span
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: '9999px',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
              color: 'var(--ts-color-accent)',
            }}
          >
            LIVE STREAMING
          </span>
        </div>

        {/* Analytics Chart Box */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-md)',
            height: '160px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px',
          }}
        >
          {[40, 65, 30, 85, 95, 60, 75, 90, 110, 80].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}px`,
                backgroundColor: i === 8 ? 'var(--ts-color-accent)' : 'var(--ts-color-primary)',
                opacity: i === 8 ? 1 : 0.7,
                borderRadius: 'calc(var(--ts-radius) * 0.5)',
              }}
            />
          ))}
        </div>

        {/* 2 sub-metrics */}
        <div style={{ display: 'flex', gap: 'var(--ts-space-md)' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm)',
            }}
          >
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>
              Peak Throughput
            </div>
            <div
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontWeight: 700,
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
              }}
            >
              142.8 GB/s
            </div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-sm)',
            }}
          >
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>
              Worker Count
            </div>
            <div
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontWeight: 700,
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
              }}
            >
              32 Nodes
            </div>
          </div>
        </div>
      </div>

      {/* Inspector Drawer (Right 35%) */}
      <div
        style={{
          flex: 1,
          backgroundColor: 'var(--ts-color-surface)',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-sm)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontWeight: 700,
            fontSize: 'calc(var(--ts-base-size) * 0.9)',
            borderBottom: '1px solid var(--ts-color-border)',
            paddingBottom: 'var(--ts-space-xs)',
          }}
        >
          Node Inspector
        </div>

        {[
          { key: 'Cluster Region', val: 'us-east-1' },
          { key: 'SSL Status', val: 'Active (TLS 1.3)' },
          { key: 'Memory Usage', val: '4.8 GB / 16 GB' },
          { key: 'Pod Health', val: '100% Passing' },
        ].map((item) => (
          <div
            key={item.key}
            style={{
              padding: 'var(--ts-space-xs) 0',
              borderBottom: '1px solid var(--ts-color-border)',
              fontSize: 'calc(var(--ts-base-size) * 0.8)',
            }}
          >
            <div style={{ opacity: 0.6 }}>{item.key}</div>
            <div style={{ fontWeight: 600, marginTop: '2px' }}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


import React from 'react';

export const SidebarContentWireframe: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        minHeight: '100%',
        height: '100%',
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        borderRadius: 'var(--ts-radius)',
        border: '1px solid var(--ts-color-border)',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '180px',
          backgroundColor: 'var(--ts-color-surface)',
          borderRight: '1px solid var(--ts-color-border)',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-sm)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
            fontWeight: 700,
            color: 'var(--ts-color-primary)',
            marginBottom: 'var(--ts-space-sm)',
          }}
        >
          Workspace
        </div>

        {['Dashboard', 'Analytics', 'Settings', 'Integrations'].map((item, idx) => (
          <div
            key={item}
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              fontWeight: idx === 0 ? 600 : 400,
              backgroundColor: idx === 0 ? 'var(--ts-color-primary)' : 'transparent',
              color: idx === 0 ? 'var(--ts-color-background)' : 'var(--ts-color-text)',
              cursor: 'pointer',
            }}
          >
            {item}
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          padding: 'var(--ts-space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-md)',
          overflowY: 'auto',
        }}
      >
        {/* Header Breadcrumb */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--ts-color-border)',
            paddingBottom: 'var(--ts-space-sm)',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
                fontWeight: 700,
                margin: 0,
              }}
            >
              Overview Dashboard
            </h2>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                opacity: 0.75,
              }}
            >
              Active system metrics and layout wireframe verification.
            </p>
          </div>
          <button
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: 'var(--ts-color-background)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              border: 'none',
              fontWeight: 600,
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
              boxShadow: 'var(--ts-shadow)',
              cursor: 'pointer',
            }}
          >
            + Create Item
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 'var(--ts-space-sm)',
          }}
        >
          {[
            { label: 'Total Revenue', value: '$48,290', delta: '+12.4%' },
            { label: 'Active Sessions', value: '2,845', delta: '+8.1%' },
            { label: 'Conversion Rate', value: '4.6%', delta: '+1.2%' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                boxShadow: 'var(--ts-shadow)',
                padding: 'var(--ts-space-md)',
              }}
            >
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                  fontWeight: 700,
                  marginTop: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 'calc(var(--ts-base-size) * 0.75)',
                  color: 'var(--ts-color-accent)',
                  marginTop: '4px',
                  fontWeight: 600,
                }}
              >
                {stat.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Large content surface */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            boxShadow: 'var(--ts-shadow)',
            padding: 'var(--ts-space-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '140px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-accent)',
              opacity: 0.2,
              marginBottom: '8px',
            }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 'calc(var(--ts-base-size) * 0.9)',
              fontWeight: 500,
            }}
          >
            Primary Content Stream Area
          </p>
        </div>
      </main>
    </div>
  );
};


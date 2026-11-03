import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { TrendingUp, Plus, Activity, Cpu, Database, Server } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        padding: 'var(--ts-space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
        maxWidth: '920px',
        margin: '0 auto',
      }}
    >
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--ts-space-sm)' }}>
        <div>
          <h1
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
              fontWeight: 800,
              margin: 0,
            }}
          >
            Telemetry & Cluster Health
          </h1>
          <p style={{ margin: '2px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8 }}>
            Realtime metrics across edge nodes and autonomous agent runtimes.
          </p>
        </div>

        <button
          type="button"
          style={{
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryTextColor,
            border: 'none',
            borderRadius: 'var(--ts-radius)',
            padding: 'var(--ts-space-xs) var(--ts-space-md)',
            fontWeight: 600,
            fontSize: 'calc(var(--ts-base-size) * 0.85)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: 'var(--ts-shadow)',
          }}
        >
          <Plus style={{ width: '15px', height: '15px' }} />
          <span>Deploy Cluster</span>
        </button>
      </div>

      {/* 4 Metric KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--ts-space-sm)' }}>
        {[
          { label: 'Active Clusters', value: '48 Nodes', delta: '+4 today', icon: <Server style={{ width: '16px', height: '16px', color: 'var(--ts-color-primary)' }} /> },
          { label: 'Avg Latency', value: '18.4 ms', delta: '-2.1 ms', icon: <Activity style={{ width: '16px', height: '16px', color: 'var(--ts-color-accent)' }} /> },
          { label: 'CPU Utilization', value: '42.8%', delta: 'Optimal', icon: <Cpu style={{ width: '16px', height: '16px', color: '#10b981' }} /> },
          { label: 'Memory Storage', value: '1.2 TB', delta: '82% free', icon: <Database style={{ width: '16px', height: '16px', color: 'var(--ts-color-secondary)' }} /> },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--ts-space-xs)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>{stat.label}</span>
              {stat.icon}
            </div>
            <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', color: 'var(--ts-color-accent)', fontWeight: 600 }}>
              {stat.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart Container */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
              Execution Throughput
            </div>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>
              Operations per minute across global regions
            </span>
          </div>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#10b981',
              fontSize: 'calc(var(--ts-base-size) * 0.75)',
              fontWeight: 600,
            }}
          >
            <TrendingUp style={{ width: '13px', height: '13px' }} />
            +18.2% vs last cycle
          </span>
        </div>

        {/* Bar chart mock */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px', paddingTop: '12px' }}>
          {[35, 55, 40, 70, 85, 60, 75, 90, 110, 80, 95, 120].map((h, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '4px' }}>
              <div
                style={{
                  width: '100%',
                  height: `${h}px`,
                  backgroundColor: idx === 11 ? 'var(--ts-color-accent)' : 'var(--ts-color-primary)',
                  borderRadius: 'calc(var(--ts-radius) * 0.4)',
                  opacity: idx === 11 ? 1 : 0.7,
                }}
              />
              <span style={{ fontSize: '9px', opacity: 0.5 }}>{idx + 1}h</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Mini List */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-xs)',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.9)', marginBottom: '4px' }}>
          Recent Deployment Audit
        </div>
        {[
          { action: 'Tokens synced to GitHub repository', target: 'main @ 3f29a0', time: '4m ago', status: 'Success' },
          { action: 'Modular type scale recalculated', target: 'scale: 1.15', time: '18m ago', status: 'Success' },
          { action: 'Automated contrast audit passed', target: '4.82:1 ratio', time: '1h ago', status: 'Passing' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 0',
              borderBottom: idx === 2 ? 'none' : '1px solid var(--ts-color-border)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
            }}
          >
            <div>
              <span style={{ fontWeight: 600 }}>{item.action}</span>
              <span style={{ opacity: 0.65, marginLeft: '8px' }}>({item.target})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ opacity: 0.5, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>{item.time}</span>
              <span
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: 'calc(var(--ts-base-size) * 0.7)',
                  fontWeight: 600,
                }}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


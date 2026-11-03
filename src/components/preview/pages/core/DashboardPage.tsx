import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { TrendingUp, Plus, Activity, Cpu, Database, Server, Terminal, ShieldCheck, BarChart2 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.dashboard ?? 'sidebar-grid';

  // 1. ANALYTICAL MATRIX LAYOUT
  if (layout === 'analytical') {
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
          maxWidth: '1040px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.2)', fontWeight: 800, margin: 0 }}>
              Analytical Telemetry Grid
            </h1>
            <p style={{ margin: '2px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.82)', opacity: 0.75 }}>
              Dense multi-cluster throughput & latency telemetry matrix.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ padding: '4px 10px', borderRadius: 'var(--ts-radius)', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', fontSize: '12px', fontWeight: 600 }}>
              Live 1s Refresh
            </span>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: '4px 12px',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Export Metrics
            </button>
          </div>
        </div>

        {/* 6 Metric KPI Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--ts-space-xs)' }}>
          {[
            { label: 'Ingress QPS', val: '48.2k', delta: '+12%', color: 'var(--ts-color-primary)' },
            { label: 'Egress BW', val: '1.4 Gbps', delta: '+8%', color: 'var(--ts-color-accent)' },
            { label: 'p99 Latency', val: '14.2 ms', delta: '-1.8 ms', color: '#10b981' },
            { label: 'Fault Rate', val: '0.002%', delta: '0.0%', color: '#10b981' },
            { label: 'Active Runtimes', val: '1,280', delta: '+34', color: 'var(--ts-color-secondary)' },
            { label: 'Token Cache Hit', val: '99.4%', delta: '+0.2%', color: 'var(--ts-color-primary)' },
          ].map((kpi, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm)',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ fontSize: '11px', opacity: 0.7 }}>{kpi.label}</div>
              <div style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))', fontWeight: 800, margin: '2px 0' }}>
                {kpi.val}
              </div>
              <div style={{ fontSize: '10px', color: kpi.color, fontWeight: 700 }}>{kpi.delta} vs prev</div>
            </div>
          ))}
        </div>

        {/* Dual Analytics Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'var(--ts-space-md)' }}>
          <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>Throughput Distribution</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '110px' }}>
              {[40, 65, 80, 50, 90, 75, 110, 85, 95, 120, 100, 130].map((h, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: 'var(--ts-color-primary)', height: `${h * 0.7}px`, borderRadius: '2px' }} />
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>Node Cluster Health</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'us-east-edge-01', load: '42%', status: 'Healthy' },
                { name: 'eu-west-edge-04', load: '68%', status: 'Healthy' },
                { name: 'ap-south-edge-09', load: '31%', status: 'Optimal' },
              ].map((node, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ fontFamily: 'monospace' }}>{node.name}</span>
                  <span style={{ opacity: 0.7 }}>{node.load}</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{node.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. HEADER COMPACT LAYOUT
  if (layout === 'header-compact') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Navbar */}
        <div
          style={{
            borderBottom: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-surface)',
            padding: 'var(--ts-space-sm) var(--ts-space-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 style={{ width: '18px', height: '18px', color: 'var(--ts-color-primary)' }} />
            <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '14px' }}>
              Executive Telemetry
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
            <span style={{ fontWeight: 600, color: 'var(--ts-color-primary)' }}>Overview</span>
            <span style={{ opacity: 0.7 }}>Infrastructure</span>
            <span style={{ opacity: 0.7 }}>Agents</span>
          </div>
        </div>

        <div style={{ padding: 'var(--ts-space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)', maxWidth: '960px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          {/* Horizontal metric strips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--ts-space-sm)' }}>
            {[
              { label: 'System Health', val: '99.98%', icon: <ShieldCheck style={{ width: '16px', height: '16px', color: '#10b981' }} /> },
              { label: 'Active Edge Nodes', val: '48 / 50', icon: <Server style={{ width: '16px', height: '16px', color: 'var(--ts-color-primary)' }} /> },
              { label: 'Avg Cycle Duration', val: '42.6 s', icon: <Activity style={{ width: '16px', height: '16px', color: 'var(--ts-color-accent)' }} /> },
            ].map((m, i) => (
              <div key={i} style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {m.icon}
                <div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>{m.label}</div>
                  <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '16px' }}>{m.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Wide Telemetry Card */}
          <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>Global Latency & Traffic Distribution</div>
              <span style={{ color: 'var(--ts-color-accent)', fontSize: '12px', fontWeight: 600 }}>All Regions Normal</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
              {[25, 45, 60, 50, 75, 90, 65, 80, 110, 95, 105, 125, 90, 100].map((h, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: 'var(--ts-color-primary)', height: `${h}px`, borderRadius: '3px', opacity: i === 13 ? 1 : 0.7 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. FEED & TELEMETRY FOCUS LAYOUT
  if (layout === 'feed-focus') {
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
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.1)', fontWeight: 800, margin: 0 }}>
            Live Agentic Runtime Stream
          </h1>
          <p style={{ margin: '2px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8 }}>
            Realtime activity feed synchronized with autonomous execution logs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'var(--ts-space-md)' }}>
          {/* Live Activity Stream */}
          <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal style={{ width: '14px', height: '14px', color: 'var(--ts-color-primary)' }} />
              <span>Event Audit Stream</span>
            </div>
            {[
              { text: 'Gemini subagent executed test suite: 14 passing', time: '12s ago', tag: 'Agent' },
              { text: 'CSS Custom property tokens compiled to dist/', time: '45s ago', tag: 'Build' },
              { text: 'APCA contrast check passed: Lc 114.0 on canvas', time: '2m ago', tag: 'WCAG' },
              { text: 'Figma DTCG tokens exported to tokens.dtcg.json', time: '5m ago', tag: 'Export' },
              { text: 'Git remote verified: main branch in sync', time: '12m ago', tag: 'Git' },
            ].map((ev, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i === 4 ? 'none' : '1px solid var(--ts-color-border)', fontSize: '12px' }}>
                <div>
                  <span style={{ fontWeight: 600 }}>{ev.text}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span style={{ fontSize: '10px', opacity: 0.6 }}>{ev.time}</span>
                  <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)' }}>
                    {ev.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* System Resources */}
          <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius)', padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px' }}>Cluster Capacity Allocation</div>
            {[
              { label: 'Compute Allocation', pct: 68, color: 'var(--ts-color-primary)' },
              { label: 'Memory Cache Hit Rate', pct: 92, color: 'var(--ts-color-accent)' },
              { label: 'Network Bandwidth', pct: 44, color: '#10b981' },
            ].map((res, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ opacity: 0.8 }}>{res.label}</span>
                  <span style={{ fontWeight: 700 }}>{res.pct}%</span>
                </div>
                <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--ts-color-background)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${res.pct}%`, backgroundColor: res.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. DEFAULT: SIDEBAR & GRID LAYOUT
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

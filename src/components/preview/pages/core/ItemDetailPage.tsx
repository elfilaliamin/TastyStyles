import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  Server,
  Activity,
  CheckCircle2,
  ChevronRight,
  MoreVertical,
  RotateCw,
  ExternalLink,
  Shield,
  Clock,
  Terminal,
  Cpu,
  HardDrive,
} from 'lucide-react';

export const ItemDetailPage: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'network' | 'security'>('overview');

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
        maxWidth: '1020px',
        margin: '0 auto',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ts-space-xs)',
          fontSize: 'calc(var(--ts-base-size) * 0.8)',
          opacity: 0.75,
        }}
      >
        <span>Infrastructure</span>
        <ChevronRight style={{ width: '14px', height: '14px' }} />
        <span>Edge Clusters</span>
        <ChevronRight style={{ width: '14px', height: '14px' }} />
        <span style={{ fontWeight: 600, color: 'var(--ts-color-primary)', opacity: 1 }}>
          cluster-amber-09
        </span>
      </div>

      {/* Entity Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'var(--ts-space-md)',
          paddingBottom: 'var(--ts-space-sm)',
          borderBottom: '1px solid var(--ts-color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-md)' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <Server style={{ width: '24px', height: '24px', color: 'var(--ts-color-primary)' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-sm)', flexWrap: 'wrap' }}>
              <h1
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                cluster-amber-09
              </h1>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: 'calc(var(--ts-base-size) * 0.75)',
                  fontWeight: 600,
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle2 style={{ width: '12px', height: '12px' }} />
                Healthy
              </span>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: 'var(--ts-radius)',
                  fontSize: 'calc(var(--ts-base-size) * 0.72)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  opacity: 0.8,
                }}
              >
                v2.14.0-stable
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75 }}>
              Dedicated inference worker fleet in eu-central-1 (Frankfurt).
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-xs)', flexWrap: 'wrap' }}>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <RotateCw style={{ width: '14px', height: '14px' }} />
            <span>Restart</span>
          </button>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <span>Edit Configuration</span>
          </button>
          <button
            type="button"
            aria-label="More options"
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MoreVertical style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--ts-space-sm)',
          borderBottom: '1px solid var(--ts-color-border)',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'logs', label: 'Live Logs & Traces' },
          { id: 'network', label: 'Network & Ingress' },
          { id: 'security', label: 'Security & Certs' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--ts-color-primary)' : '2px solid transparent',
                color: isActive ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                fontWeight: isActive ? 700 : 500,
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.7,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Two Column Layout (Main content 2/3 + Sidebar 1/3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--ts-space-md)',
          alignItems: 'start',
        }}
      >
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)', flex: '2' }}>
          {/* Hardware Specs Card */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-md)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                fontWeight: 700,
                margin: '0 0 var(--ts-space-sm) 0',
              }}
            >
              Hardware Allocation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--ts-space-sm)' }}>
              <div
                style={{
                  padding: 'var(--ts-space-sm)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
                  <Cpu style={{ width: '14px', height: '14px' }} />
                  <span>CPU Cores</span>
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 1.1)', fontWeight: 700, marginTop: '4px' }}>32 vCPUs</div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.7 }}>28% utilized</div>
              </div>

              <div
                style={{
                  padding: 'var(--ts-space-sm)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
                  <Activity style={{ width: '14px', height: '14px' }} />
                  <span>Memory RAM</span>
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 1.1)', fontWeight: 700, marginTop: '4px' }}>128 GB</div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.7 }}>54.2 GB in use</div>
              </div>

              <div
                style={{
                  padding: 'var(--ts-space-sm)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
                  <HardDrive style={{ width: '14px', height: '14px' }} />
                  <span>NVMe Storage</span>
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 1.1)', fontWeight: 700, marginTop: '4px' }}>2.0 TB</div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.7 }}>RAID 10 Striped</div>
              </div>
            </div>
          </div>

          {/* Activity Timeline Card */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-md)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ts-space-sm)' }}>
              <h3
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Recent Activity & Deployments
              </h3>
              <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>Realtime sync</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
              {[
                { time: '3 mins ago', title: 'Automated health-check passed', desc: 'All 6 replica pods responded within 12ms', status: 'ok' },
                { time: '42 mins ago', title: 'Hot reload config synced', desc: 'Applied token spec update #814f9a to runner', status: 'ok' },
                { time: '2 hours ago', title: 'Auto-scaled up +2 worker threads', desc: 'High load spike detected in pipeline ingress', status: 'warn' },
                { time: '1 day ago', title: 'Cluster certificate renewed', desc: 'Let\'s Encrypt TLS wildcard cert auto-renewed', status: 'ok' },
              ].map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--ts-space-sm)',
                    padding: 'var(--ts-space-xs) 0',
                    borderBottom: idx < 3 ? '1px solid var(--ts-color-border)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: log.status === 'ok' ? '#10b981' : 'var(--ts-color-accent)',
                      marginTop: '6px',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>{log.title}</span>
                      <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.6 }}>{log.time}</span>
                    </div>
                    <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.8, marginTop: '2px' }}>
                      {log.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column (1/3) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)', minWidth: '240px' }}>
          {/* Metadata Card */}
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
            <h4
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * 0.9)',
                fontWeight: 700,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: 0.75,
              }}
            >
              Cluster Details
            </h4>

            {[
              { label: 'Cluster ID', value: 'cl-amber-9428-eu' },
              { label: 'Region', value: 'eu-central-1a' },
              { label: 'Primary IP', value: '194.28.10.42' },
              { label: 'Created By', value: 'alex.rivers@agentic' },
              { label: 'Created At', value: 'Oct 14, 2026' },
            ].map((meta, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(var(--ts-base-size) * 0.8)' }}>
                <span style={{ opacity: 0.7 }}>{meta.label}</span>
                <span style={{ fontWeight: 600 }}>{meta.value}</span>
              </div>
            ))}

            <div style={{ paddingTop: 'var(--ts-space-xs)', borderTop: '1px solid var(--ts-color-border)' }}>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, marginBottom: '6px' }}>
                Resource Tags
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {['production', 'inference', 'v2', 'billing-tier-1'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 'calc(var(--ts-base-size) * 0.7)',
                      padding: '2px 6px',
                      borderRadius: 'var(--ts-radius)',
                      backgroundColor: 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-xs)',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * 0.9)',
                fontWeight: 700,
                margin: '0 0 var(--ts-space-xs) 0',
              }}
            >
              Developer Tools
            </h4>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                color: 'var(--ts-color-text)',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal style={{ width: '14px', height: '14px', color: 'var(--ts-color-primary)' }} />
                <span>SSH Web Terminal</span>
              </span>
              <ExternalLink style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            </button>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                color: 'var(--ts-color-text)',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield style={{ width: '14px', height: '14px', color: 'var(--ts-color-accent)' }} />
                <span>Security Sandbox Log</span>
              </span>
              <Clock style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


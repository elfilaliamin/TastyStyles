import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';

export const ItemDetailPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.detail ?? 'split-sidepanel';
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'network' | 'security'>('overview');

  const renderHardwareSpecs = () => (
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
        <div style={{ padding: 'var(--ts-space-sm)', borderRadius: 'var(--ts-radius)', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
            <AppIcon name="cpu" size={14} />
            <span>CPU Cores</span>
          </div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 1.1)', fontWeight: 700, marginTop: '4px' }}>32 vCPUs</div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.7 }}>28% utilized</div>
        </div>

        <div style={{ padding: 'var(--ts-space-sm)', borderRadius: 'var(--ts-radius)', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
            <AppIcon name="activity" size={14} />
            <span>Memory RAM</span>
          </div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 1.1)', fontWeight: 700, marginTop: '4px' }}>128 GB</div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.7 }}>54.2 GB in use</div>
        </div>

        <div style={{ padding: 'var(--ts-space-sm)', borderRadius: 'var(--ts-radius)', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
            <AppIcon name="hardDrive" size={14} />
            <span>NVMe Storage</span>
          </div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 1.1)', fontWeight: 700, marginTop: '4px' }}>2.0 TB</div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.7 }}>RAID 10 Striped</div>
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
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
        <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))', fontWeight: 700, margin: 0 }}>
          Recent Activity & Deployments
        </h3>
        <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>Realtime sync</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
        {[
          { time: '3 mins ago', title: 'Automated health-check passed', desc: 'All 6 replica pods responded within 12ms', status: 'ok' },
          { time: '42 mins ago', title: 'Hot reload config synced', desc: 'Applied token spec update #814f9a to runner', status: 'ok' },
          { time: '2 hours ago', title: 'Auto-scaled up +2 worker threads', desc: 'High load spike detected in pipeline ingress', status: 'warn' },
        ].map((log, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ts-space-sm)', fontSize: 'calc(var(--ts-base-size) * 0.8)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: log.status === 'ok' ? '#10b981' : '#f59e0b', marginTop: '6px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{log.title}</div>
              <div style={{ opacity: 0.7, fontSize: 'calc(var(--ts-base-size) * 0.72)' }}>{log.desc}</div>
            </div>
            <div style={{ opacity: 0.55, fontSize: 'calc(var(--ts-base-size) * 0.7)' }}>{log.time}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMetadataSidebar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
      {/* Node Info */}
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
        <h4 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 0.9)', fontWeight: 700, margin: 0 }}>
          Cluster Diagnostics
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'calc(var(--ts-base-size) * 0.78)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ opacity: 0.7 }}>Control Plane:</span>
            <span style={{ fontWeight: 600 }}>us-east-virginia-1</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ opacity: 0.7 }}>Kubernetes Version:</span>
            <span style={{ fontFamily: 'monospace' }}>v1.29.3-eks</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ opacity: 0.7 }}>Ingress IP:</span>
            <span style={{ fontFamily: 'monospace' }}>192.168.42.108</span>
          </div>
        </div>
      </div>

      {/* Developer Tools */}
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
        <h4 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 0.9)', fontWeight: 700, margin: '0 0 var(--ts-space-xs) 0' }}>
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
            <AppIcon name="terminal" size={14} style={{ color: 'var(--ts-color-primary)' }} />
            <span>SSH Web Terminal</span>
          </span>
          <AppIcon name="externalLink" size={12} style={{ opacity: 0.6 }} />
        </button>
      </div>
    </div>
  );

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
        maxWidth: layout === 'full-document' ? '820px' : '1020px',
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
        <AppIcon name="chevronRight" size={14} />
        <span>Edge Clusters</span>
        <AppIcon name="chevronRight" size={14} />
        <span style={{ fontWeight: 600, color: 'var(--ts-color-primary)', opacity: 1 }}>
          cluster-amber-09
        </span>
      </div>

      {/* Entity Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--ts-space-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-sm)' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppIcon name="server" size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * 1.15)', fontWeight: 800 }}>
                cluster-amber-09.prod
              </h2>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', padding: '1px 8px', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 600 }}>
                <AppIcon name="checkCircle" size={11} /> Healthy
              </span>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.7 }}>
              High-concurrency token compilation node — Region: US-East
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-xs)' }}>
          <button
            type="button"
            style={{
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              color: 'var(--ts-color-text)',
              fontSize: 'calc(var(--ts-base-size) * 0.8)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="rotateCw" size={13} />
            <span>Restart Pods</span>
          </button>
        </div>
      </div>

      {/* VARIANT: FULL DOCUMENT (Single-column editorial view) */}
      {layout === 'full-document' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
          {renderHardwareSpecs()}
          {renderTimeline()}
          {renderMetadataSidebar()}
        </div>
      )}

      {/* VARIANT: TABBED MEDIA */}
      {layout === 'tabbed-media' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
          <div style={{ display: 'flex', gap: 'var(--ts-space-sm)', borderBottom: '1px solid var(--ts-color-border)' }}>
            {[
              { id: 'overview' as const, label: 'Overview Metrics' },
              { id: 'logs' as const, label: 'Live Pod Logs' },
              { id: 'network' as const, label: 'Cluster Config' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--ts-color-primary)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--ts-color-primary)' : 'var(--ts-color-text)',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontSize: 'calc(var(--ts-base-size) * 0.85)',
                  padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && renderHardwareSpecs()}
          {activeTab === 'logs' && renderTimeline()}
          {activeTab === 'network' && renderMetadataSidebar()}
        </div>
      )}

      {/* VARIANT: SPLIT SIDEPANEL (Default) */}
      {(layout === 'split-sidepanel' || !['full-document', 'tabbed-media'].includes(layout)) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--ts-space-md)',
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)', gridColumn: 'span 2' }}>
            {renderHardwareSpecs()}
            {renderTimeline()}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            {renderMetadataSidebar()}
          </div>
        </div>
      )}
    </div>
  );
};

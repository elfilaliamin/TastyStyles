import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';

export interface ErrorDetails {
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
}

export const ErrorPage: React.FC = () => {
  const { state, dispatch, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  const errorLayout = state.pageLayouts?.error ?? 'giant-hero';
  const showTrace = state.pageLayouts?.errorShowTrace !== false;
  const configuredCode = state.pageLayouts?.errorCode ?? '404';

  const [copied, setCopied] = useState(false);

  const errorRegistry: Record<string, ErrorDetails> = {
    '404': {
      title: 'Resource Specification Not Found',
      desc: 'The requested design token route, preset, or namespace does not exist in this workspace.',
      color: 'var(--ts-color-primary)',
      icon: <AppIcon name="alert" size={42} style={{ color: 'var(--ts-color-accent)' }} />,
    },
    '500': {
      title: 'Internal Compiler Exception',
      desc: 'The autonomous AST token compiler encountered an unexpected runtime parsing error.',
      color: '#ef4444',
      icon: <AppIcon name="serverCrash" size={42} style={{ color: '#ef4444' }} />,
    },
    '403': {
      title: 'Access Restricted / Forbidden',
      desc: 'Your active agent session lacks permissions to mutate production design tokens in this namespace.',
      color: '#f59e0b',
      icon: <AppIcon name="shieldAlert" size={42} style={{ color: '#f59e0b' }} />,
    },
    '502': {
      title: 'Bad Gateway / Upstream Disconnected',
      desc: 'Unable to establish connection with the upstream agent runner inference endpoint.',
      color: '#8b5cf6',
      icon: <AppIcon name="wifiOff" size={42} style={{ color: '#8b5cf6' }} />,
    },
  };

  const current = errorRegistry[configuredCode] ?? errorRegistry['404'];

  const handleCodeChange = (code: '404' | '403' | '500') => {
    dispatch({
      type: 'SET_PAGE_LAYOUT',
      updates: { errorCode: code },
    });
  };

  const handleCopyTrace = () => {
    setCopied(true);
    navigator.clipboard?.writeText(
      `[ERROR] ${configuredCode}: ${current.title}. Trace ID: tr-81a9f02b-20261103. Endpoint: /api/v1/specs/nordic-forest`
    );
    setTimeout(() => setCopied(false), 2000);
  };

  // Reusable Code Switcher Bar
  const renderCodeSelector = () => (
    <div
      style={{
        display: 'inline-flex',
        gap: '4px',
        backgroundColor: 'var(--ts-color-surface)',
        padding: '3px',
        borderRadius: 'var(--ts-radius)',
        border: '1px solid var(--ts-color-border)',
      }}
    >
      {(['404', '500', '403'] as const).map((code) => {
        const isSelected = configuredCode === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleCodeChange(code)}
            style={{
              padding: '2px 8px',
              borderRadius: 'calc(var(--ts-radius) - 2px)',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'calc(var(--ts-base-size) * 0.72)',
              fontWeight: 700,
              backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'transparent',
              color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
              transition: 'all 0.15s ease',
            }}
          >
            HTTP {code}
          </button>
        );
      })}
    </div>
  );

  // Diagnostic Trace Box
  const renderTraceBox = () => (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--ts-color-background)',
        border: '1px solid var(--ts-color-border)',
        borderRadius: 'var(--ts-radius)',
        padding: 'var(--ts-space-xs) var(--ts-space-sm)',
        fontSize: 'calc(var(--ts-base-size) * 0.72)',
        fontFamily: 'monospace',
        textAlign: 'left',
        opacity: 0.85,
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>Trace ID:</strong> tr-81a9f02b-20261103</span>
        <button
          type="button"
          onClick={handleCopyTrace}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--ts-color-primary)',
            cursor: 'pointer',
            fontSize: 'calc(var(--ts-base-size) * 0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: 0,
          }}
        >
          <AppIcon name="copy" size={11} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div><strong>Endpoint:</strong> /api/v1/specs/nordic-forest/schema</div>
      <div><strong>Status:</strong> HTTP {configuredCode} ({current.title})</div>
    </div>
  );

  // 1. Split Terminal Debugger Layout
  if (errorLayout === 'split-terminal') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          padding: 'var(--ts-space-lg)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'var(--ts-space-lg)',
          alignItems: 'center',
          maxWidth: '1060px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
          <div>
            <div style={{ marginBottom: 'var(--ts-space-xs)' }}>{renderCodeSelector()}</div>
            <span
              style={{
                display: 'inline-block',
                fontSize: 'calc(var(--ts-base-size) * 0.75)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: current.color,
                marginTop: 'var(--ts-space-xs)',
              }}
            >
              System Error Exception
            </span>
            <h1
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.1)',
                fontWeight: 800,
                margin: '4px 0 var(--ts-space-xs) 0',
                lineHeight: 1.25,
              }}
            >
              {current.title}
            </h1>
            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.9)', opacity: 0.8, lineHeight: 1.5 }}>
              {current.desc}
            </p>
          </div>

          <div
            style={{
              padding: 'var(--ts-space-sm)',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.8)' }}>
              Recommended Recovery:
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: 'calc(var(--ts-base-size) * 0.78)', opacity: 0.85, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Verify the active branch specification checksum.</li>
              <li>Inspect agent execution boundaries in the sidebar.</li>
              <li>Fallback to the default Nordic Forest archetype preset.</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: 'var(--ts-space-xs)', flexWrap: 'wrap' }}>
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
              <AppIcon name="home" size={14} />
              <span>Back to Safety</span>
            </button>

            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                color: 'var(--ts-color-text)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-xs) var(--ts-space-md)',
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <AppIcon name="rotateCw" size={14} />
              <span>Retry Request</span>
            </button>
          </div>
        </div>

        {/* Right Column: Simulated Terminal Debugger */}
        <div
          style={{
            backgroundColor: '#0a0f1d',
            borderRadius: 'calc(var(--ts-radius-surface, 16px) * 1.25)',
            border: '1px solid #1e293b',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              backgroundColor: '#111827',
              padding: '8px 12px',
              borderBottom: '1px solid #1f2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AppIcon name="terminal" size={12} />
              <span>spec-debugger — zsh</span>
            </div>
            <div style={{ width: '40px' }} />
          </div>

          <div
            style={{
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '12px',
              lineHeight: 1.6,
              color: '#e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ color: '#64748b' }}>
              $ agy spec verify --target current
            </div>
            <div style={{ color: '#38bdf8' }}>
              [INFO] Scanning registered token models...
            </div>
            <div style={{ color: '#10b981' }}>
              [OK] Loaded schema version: 1.0.0
            </div>
            <div style={{ color: '#f43f5e', fontWeight: 600 }}>
              [FATAL {configuredCode}] Exception encountered:
            </div>
            <div style={{ paddingLeft: '12px', color: '#fda4af' }}>
              &gt; {current.title}
              <br />
              &gt; Trace ID: tr-81a9f02b-20261103
              <br />
              &gt; Frame: ASTParser.execute (compileMarkdown.ts:245:12)
            </div>
            <div style={{ color: '#eab308' }}>
              [WARN] Autonomous agent recovery daemon standing by.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', color: '#a855f7' }}>
              <span>root@antigravity:~#</span>
              <span style={{ animation: 'pulse 1s infinite', color: '#10b981' }}>▋</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Dialog Modal Card Layout
  if (errorLayout === 'dialog-card') {
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
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ marginBottom: 'var(--ts-space-sm)' }}>{renderCodeSelector()}</div>

        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'calc(var(--ts-radius-surface, 16px) * 1.25)',
            boxShadow: 'var(--ts-shadow)',
            maxWidth: '480px',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              borderBottom: '1px solid var(--ts-color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--ts-color-background)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {current.icon}
              <span style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.9)' }}>
                System Notification
              </span>
            </div>
            <span
              style={{
                fontSize: 'calc(var(--ts-base-size) * 0.72)',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
              }}
            >
              HTTP {configuredCode}
            </span>
          </div>

          <div style={{ padding: 'var(--ts-space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                  fontWeight: 800,
                  margin: '0 0 6px 0',
                }}
              >
                {current.title}
              </h2>
              <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8, lineHeight: 1.4 }}>
                {current.desc}
              </p>
            </div>

            {showTrace && renderTraceBox()}
          </div>

          <div
            style={{
              padding: 'var(--ts-space-sm) var(--ts-space-md)',
              borderTop: '1px solid var(--ts-color-border)',
              backgroundColor: 'var(--ts-color-background)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--ts-space-xs)',
            }}
          >
            <button
              type="button"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                fontWeight: 600,
                color: 'var(--ts-color-text)',
                cursor: 'pointer',
              }}
            >
              Report Issue
            </button>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-xs) var(--ts-space-md)',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              Dismiss & Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Minimal Clean Editorial Layout
  if (errorLayout === 'minimal') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          padding: 'var(--ts-space-xl)',
          maxWidth: '680px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-md)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.7 }}>
            <span>TastyStyles</span>
            <AppIcon name="chevronRight" size={13} />
            <span>Specifications</span>
            <AppIcon name="chevronRight" size={13} />
            <span style={{ fontWeight: 600 }}>Status</span>
          </div>
          <div>{renderCodeSelector()}</div>
        </div>

        <div style={{ borderBottom: '1px solid var(--ts-color-border)', paddingBottom: 'var(--ts-space-md)' }}>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 700, color: current.color }}>
            HTTP {configuredCode} EXCEPTION
          </div>
          <h1
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
              fontWeight: 800,
              margin: '6px 0 var(--ts-space-xs) 0',
            }}
          >
            {current.title}
          </h1>
          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.9)', opacity: 0.8, lineHeight: 1.5 }}>
            {current.desc}
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.78)', fontWeight: 600, marginBottom: '6px' }}>
            Search Available Specifications & Guides
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            }}
          >
            <AppIcon name="search" size={15} style={{ opacity: 0.5 }} />
            <input
              type="text"
              placeholder="Search components, design tokens, color scales..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--ts-color-text)',
                width: '100%',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
              }}
            />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, marginBottom: '8px' }}>
            Or jump directly to standard workspace hubs:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--ts-space-xs)' }}>
            {[
              { label: 'System Dashboard', desc: 'Active clusters & metrics' },
              { label: 'Component Catalog', desc: 'Buttons, forms & cards' },
              { label: 'Color & Contrast Guard', desc: 'WCAG AAA verification' },
              { label: 'Documentation & Guides', desc: 'Agent integration rules' },
            ].map((link, i) => (
              <div
                key={i}
                style={{
                  padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.82)' }}>{link.label}</div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.7 }}>{link.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {showTrace && renderTraceBox()}
      </div>
    );
  }

  // 4. Default Giant Typographic Hero Layout
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
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 'var(--ts-space-md)',
      }}
    >
      <div>{renderCodeSelector()}</div>

      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'calc(var(--ts-radius-surface, 16px) * 1.25)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-xl) var(--ts-space-lg)',
          maxWidth: '520px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--ts-space-md)',
        }}
      >
        <div>{current.icon}</div>

        <div>
          <div
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * 3.6)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: current.color,
            }}
          >
            {configuredCode}
          </div>
          <h1
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
              fontWeight: 800,
              margin: 'var(--ts-space-xs) 0 4px 0',
            }}
          >
            {current.title}
          </h1>
          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75, lineHeight: 1.4 }}>
            {current.desc}
          </p>
        </div>

        {showTrace && renderTraceBox()}

        <div style={{ display: 'flex', gap: 'var(--ts-space-xs)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-background)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="rotateCw" size={13} />
            <span>Retry Request</span>
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
            <AppIcon name="home" size={14} />
            <span>Return to Safety</span>
          </button>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  Lock,
  Mail,
  ArrowRight,
  GitBranch,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const primaryTextColor = getBestContrastingColor(activeColors.primary);

  const authLayout = state.pageLayouts?.auth ?? 'split';
  const cardStyle = state.pageLayouts?.authCardStyle ?? 'elevated';
  const showSocial = state.pageLayouts?.authSocialButtons !== false;

  // Resolve card surface style
  const getCardStyle = (): React.CSSProperties => {
    switch (cardStyle) {
      case 'bordered':
        return {
          backgroundColor: 'var(--ts-color-surface)',
          border: '2px solid var(--ts-color-primary)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'none',
        };
      case 'flat':
        return {
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'none',
        };
      case 'glass':
        return {
          backgroundColor: `${activeColors.surface}dd`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${activeColors.border}cc`,
          borderRadius: 'var(--ts-radius)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.25)',
        };
      case 'elevated':
      default:
        return {
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          boxShadow: 'var(--ts-shadow)',
        };
    }
  };

  // Reusable Auth Form Component
  const renderAuthForm = (isMinimal: boolean = false) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
        width: '100%',
      }}
    >
      {/* Brand Icon & Heading */}
      <div style={{ textAlign: isMinimal ? 'left' : 'center' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--ts-radius)',
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryTextColor,
            margin: isMinimal ? '0 0 var(--ts-space-sm) 0' : '0 auto var(--ts-space-sm) auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 'calc(var(--ts-base-size) * 1.1)',
          }}
        >
          TS
        </div>
        <h2
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 800,
            margin: 0,
          }}
        >
          {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8 }}>
          {tab === 'signin'
            ? 'Enter your credentials to manage your design system specs.'
            : 'Start generating machine-ready tokens for AI agents.'}
        </p>
      </div>

      {/* Tab Switcher */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
          backgroundColor: 'var(--ts-color-background)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius)',
          padding: '3px',
        }}
      >
        <button
          type="button"
          onClick={() => setTab('signin')}
          style={{
            padding: 'var(--ts-space-xs)',
            borderRadius: 'calc(var(--ts-radius) * 0.8)',
            border: 'none',
            backgroundColor: tab === 'signin' ? 'var(--ts-color-primary)' : 'transparent',
            color: tab === 'signin' ? primaryTextColor : 'var(--ts-color-text)',
            fontWeight: tab === 'signin' ? 700 : 500,
            fontSize: 'calc(var(--ts-base-size) * 0.82)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setTab('signup')}
          style={{
            padding: 'var(--ts-space-xs)',
            borderRadius: 'calc(var(--ts-radius) * 0.8)',
            border: 'none',
            backgroundColor: tab === 'signup' ? 'var(--ts-color-primary)' : 'transparent',
            color: tab === 'signup' ? primaryTextColor : 'var(--ts-color-text)',
            fontWeight: tab === 'signup' ? 700 : 500,
            fontSize: 'calc(var(--ts-base-size) * 0.82)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Social SSO Button */}
      {showSocial && (
        <>
          <button
            type="button"
            style={{
              width: '100%',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              color: 'var(--ts-color-text)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <GitBranch style={{ width: '15px', height: '15px' }} />
            <span>Continue with GitHub</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--ts-color-border)' }} />
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.6, textTransform: 'uppercase' }}>
              or continue with email
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--ts-color-border)' }} />
          </div>
        </>
      )}

      {/* Form Fields */}
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}
      >
        <div>
          <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: '4px' }}>
            Work Email
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            }}
          >
            <Mail style={{ width: '15px', height: '15px', opacity: 0.5 }} />
            <input
              type="email"
              placeholder="alex@company.com"
              defaultValue="alex.rivers@tastystyles.io"
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>
              Password
            </label>
            {tab === 'signin' && (
              <a href="#reset" onClick={(e) => e.preventDefault()} style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', color: 'var(--ts-color-primary)', textDecoration: 'none' }}>
                Forgot password?
              </a>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            }}
          >
            <Lock style={{ width: '15px', height: '15px', opacity: 0.5 }} />
            <input
              type="password"
              placeholder="••••••••••••"
              defaultValue="supersecrettoken"
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

        <button
          type="submit"
          style={{
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryTextColor,
            border: 'none',
            borderRadius: 'var(--ts-radius)',
            padding: 'var(--ts-space-xs) var(--ts-space-md)',
            fontSize: 'calc(var(--ts-base-size) * 0.85)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: 'var(--ts-shadow)',
            marginTop: 'var(--ts-space-xs)',
          }}
        >
          <span>{tab === 'signin' ? 'Sign In to Workspace' : 'Create Free Account'}</span>
          <ArrowRight style={{ width: '15px', height: '15px' }} />
        </button>
      </form>

      {/* Footer Text */}
      <div style={{ textAlign: isMinimal ? 'left' : 'center', fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.75 }}>
        By continuing, you agree to the{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span> and{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
      </div>
    </div>
  );

  // 1. Split Showcase Layout (Dual-Pane Hero + Form)
  if (authLayout === 'split') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Side: Branded Hero Showcase Banner */}
        <div
          style={{
            backgroundColor: 'var(--ts-color-surface)',
            borderRight: '1px solid var(--ts-color-border)',
            padding: 'var(--ts-space-xl)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--ts-space-lg)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--ts-space-lg)' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--ts-radius)',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 'calc(var(--ts-base-size) * 0.9)',
                }}
              >
                TS
              </div>
              <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * 1.1)' }}>
                {state.name || 'TastyStyles'}
              </span>
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 8px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                fontSize: 'calc(var(--ts-base-size) * 0.72)',
                fontWeight: 700,
                marginBottom: 'var(--ts-space-sm)',
              }}
            >
              <Sparkles style={{ width: '12px', height: '12px' }} />
              Deterministic Token Handoff
            </span>

            <h1
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.1)',
                fontWeight: 800,
                lineHeight: 1.25,
                margin: '0 0 var(--ts-space-sm) 0',
              }}
            >
              Automate design token workflows without hallucinations.
            </h1>

            <p style={{ fontSize: 'calc(var(--ts-base-size) * 0.9)', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
              Visually assemble tokens, verify WCAG 2.1 AAA contrast, and export markdown specifications tailored for autonomous coding agents.
            </p>

            {/* Feature Highlights */}
            <div style={{ marginTop: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Instant WCAG 2.1 AAA contrast matrix verification',
                'Multi-agent handoff for Gemini, Claude & Copilot',
                'Zero-drift JSON registry schema compiler',
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'calc(var(--ts-base-size) * 0.82)' }}>
                  <CheckCircle2 style={{ width: '15px', height: '15px', color: 'var(--ts-color-primary)', flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div
            style={{
              padding: 'var(--ts-space-md)',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.82)', fontStyle: 'italic', opacity: 0.85, lineHeight: 1.4 }}>
              "TastyStyles eliminated 90% of our frontend handoff friction. Our AI coding agents implement specs flawlessly."
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                AR
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
                <span style={{ fontWeight: 700 }}>Alex Rivers</span> &bull; Lead Systems Architect
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form Container */}
        <div
          style={{
            padding: 'var(--ts-space-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: '420px', ...getCardStyle(), padding: 'var(--ts-space-xl)' }}>
            {renderAuthForm()}
          </div>
        </div>
      </div>
    );
  }

  // 2. Minimalist Single Column Layout
  if (authLayout === 'minimal') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          padding: 'var(--ts-space-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {renderAuthForm(true)}
        </div>
      </div>
    );
  }

  // 3. Glassmorphism Modern Glow Layout
  if (authLayout === 'glassmorphism') {
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
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient Color Auras */}
        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            backgroundColor: activeColors.primary,
            opacity: 0.25,
            filter: 'blur(60px)',
            top: '15%',
            left: '20%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            backgroundColor: activeColors.accent,
            opacity: 0.2,
            filter: 'blur(50px)',
            bottom: '15%',
            right: '20%',
            pointerEvents: 'none',
          }}
        />

        {/* Frosted Glass Card */}
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            padding: 'var(--ts-space-xl)',
            borderRadius: 'calc(var(--ts-radius) * 1.25)',
            backgroundColor: `${activeColors.surface}aa`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${activeColors.border}88`,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {renderAuthForm()}
        </div>
      </div>
    );
  }

  // 4. Default Centered Card Layout
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
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: 'var(--ts-space-xl)',
          ...getCardStyle(),
        }}
      >
        {renderAuthForm()}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  Apple,
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [singleStep, setSingleStep] = useState<1 | 2>(1);
  const [emailInput, setEmailInput] = useState('alex.rivers@tastystyles.io');
  const [passwordInput, setPasswordInput] = useState('supersecrettoken');

  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const authLayout = state.pageLayouts?.auth ?? 'centered-card';
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

  // Reusable Social Login Buttons
  const renderSocialButtons = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
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
        <svg style={{ width: '15px', height: '15px', flexShrink: 0 }} viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24z" />
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <button
          type="button"
          style={{
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            color: 'var(--ts-color-text)',
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            fontSize: 'calc(var(--ts-base-size) * 0.8)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <Apple style={{ width: '14px', height: '14px' }} />
          <span>Apple</span>
        </button>
        <button
          type="button"
          style={{
            backgroundColor: 'var(--ts-color-background)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            color: 'var(--ts-color-text)',
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            fontSize: 'calc(var(--ts-base-size) * 0.8)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <svg style={{ width: '14px', height: '14px', fill: 'currentColor' }} viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub</span>
        </button>
      </div>
    </div>
  );

  // Divider
  const renderDivider = (text: string = 'or continue with email') => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--ts-color-border)' }} />
      <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {text}
      </span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--ts-color-border)' }} />
    </div>
  );

  // Common Header & Logo
  const renderHeader = (isMinimal: boolean = false) => (
    <div style={{ textAlign: isMinimal ? 'left' : 'center', width: '100%' }}>
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
          boxShadow: 'var(--ts-shadow)',
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
        {tab === 'signin' ? 'Welcome back' : 'Create your account'}
      </h2>
      <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8 }}>
        {tab === 'signin'
          ? 'Enter your credentials to access your workspace.'
          : 'Start building deterministic design systems today.'}
      </p>
    </div>
  );

  // Common Form Fields Component
  const renderFormFields = () => (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)', width: '100%' }}>
      {/* Email Field with Label & Validation Error */}
      <div>
        <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: '4px' }}>
          Work email
        </label>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--ts-color-background)',
            border: showErrors ? '1px solid #ef4444' : '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            transition: 'border-color 0.15s ease',
          }}
        >
          <Mail style={{ width: '15px', height: '15px', opacity: 0.5 }} />
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="alex@company.com"
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
        {showErrors && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: 'calc(var(--ts-base-size) * 0.72)', marginTop: '4px', fontWeight: 500 }}>
            <AlertCircle style={{ width: '12px', height: '12px' }} />
            <span>Please enter a valid work email address.</span>
          </div>
        )}
      </div>

      {/* Password Field with Label, Show/Hide Toggle & Forgot Link */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>
            Password
          </label>
          {tab === 'signin' && (
            <a
              href="#reset"
              onClick={(e) => e.preventDefault()}
              style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', color: 'var(--ts-color-primary)', textDecoration: 'none', fontWeight: 600 }}
            >
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
            border: showErrors ? '1px solid #ef4444' : '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            transition: 'border-color 0.15s ease',
          }}
        >
          <Lock style={{ width: '15px', height: '15px', opacity: 0.5 }} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="••••••••••••"
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: 'var(--ts-color-text)',
              width: '100%',
              fontSize: 'calc(var(--ts-base-size) * 0.85)',
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'var(--ts-color-text)',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
            }}
            title={showPassword ? 'Hide password' : 'Show password'}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff style={{ width: '15px', height: '15px' }} /> : <Eye style={{ width: '15px', height: '15px' }} />}
          </button>
        </div>
        {showErrors && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: 'calc(var(--ts-base-size) * 0.72)', marginTop: '4px', fontWeight: 500 }}>
            <AlertCircle style={{ width: '12px', height: '12px' }} />
            <span>Password must be at least 8 characters with a symbol.</span>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      <button
        type="submit"
        style={{
          width: '100%',
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
          minHeight: '40px',
        }}
      >
        <span>{tab === 'signin' ? 'Sign In to Workspace' : 'Create Free Account'}</span>
        <ArrowRight style={{ width: '15px', height: '15px' }} />
      </button>
    </form>
  );

  // Common Bottom Switch Link & Terms
  const renderBottomLinks = () => (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)', width: '100%' }}>
      {/* Switch between Sign In & Sign Up */}
      <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)' }}>
        <span style={{ opacity: 0.75 }}>
          {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
        </span>
        <button
          type="button"
          onClick={() => setTab(tab === 'signin' ? 'signup' : 'signin')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            color: 'var(--ts-color-primary)',
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {tab === 'signin' ? 'Sign up' : 'Sign in'}
        </button>
      </div>

      {/* Terms & Privacy on Sign Up */}
      {tab === 'signup' && (
        <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.7 }}>
          By creating an account, you agree to our{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span> and{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
        </div>
      )}

      {/* Interactive Simulation Error Toggle */}
      <div style={{ marginTop: '4px' }}>
        <button
          type="button"
          onClick={() => setShowErrors(!showErrors)}
          style={{
            background: 'none',
            border: '1px dashed var(--ts-color-border)',
            borderRadius: 'var(--ts-radius)',
            padding: '2px 8px',
            fontSize: '10px',
            opacity: 0.6,
            cursor: 'pointer',
            color: 'var(--ts-color-text)',
          }}
        >
          {showErrors ? '✓ Hide Validation Errors' : '⚠ Simulate Validation Errors'}
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // 1. SPLIT SCREEN LAYOUT
  // =========================================================================
  if (authLayout === 'split') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          flex: 1,
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
              <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))' }}>
                {state.name}
              </span>
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                color: 'var(--ts-color-primary)',
                fontSize: 'calc(var(--ts-base-size) * 0.75)',
                fontWeight: 600,
                marginBottom: 'var(--ts-space-sm)',
              }}
            >
              <Sparkles style={{ width: '13px', height: '13px' }} />
              Deterministic Token Handoff
            </span>

            <h1
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.1)',
                fontWeight: 900,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Automate design token workflows without hallucinations.
            </h1>

            <p style={{ margin: 'var(--ts-space-sm) 0 var(--ts-space-md) 0', fontSize: 'calc(var(--ts-base-size) * 0.88)', opacity: 0.8, lineHeight: 1.5 }}>
              Visually assemble tokens, verify WCAG 2.1 AAA contrast, and export markdown specifications tailored for autonomous coding agents.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Instant WCAG 2.1 AAA contrast matrix verification',
                'Multi-agent handoff for Gemini, Claude & Copilot',
                'Zero-drift JSON registry schema compiler',
              ].map((text, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'calc(var(--ts-base-size) * 0.82)' }}>
                  <CheckCircle2 style={{ width: '15px', height: '15px', color: 'var(--ts-color-primary)', flexShrink: 0 }} />
                  <span>{text}</span>
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
              fontSize: 'calc(var(--ts-base-size) * 0.8)',
            }}
          >
            <p style={{ margin: '0 0 8px 0', fontStyle: 'italic', opacity: 0.9 }}>
              &ldquo;TastyStyles eliminated 90% of our frontend handoff friction. Our AI coding agents implement specs flawlessly.&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '10px',
                }}
              >
                AR
              </div>
              <span style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>Alex Rivers — Lead Systems Architect</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--ts-space-lg)',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: 'var(--ts-space-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
              ...getCardStyle(),
            }}
          >
            {renderHeader()}
            {showSocial && (
              <>
                {renderSocialButtons()}
                {renderDivider()}
              </>
            )}
            {renderFormFields()}
            {renderBottomLinks()}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2b. SPLIT SCREEN (IMAGE COVER) LAYOUT
  // =========================================================================
  if (authLayout === 'split-image') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          boxSizing: 'border-box',
        }}
      >
        {/* Left / Side: Rich Editorial Work Image with Tinted Gradient & Testimonial Overlay */}
        <div
          style={{
            position: 'relative',
            minHeight: '360px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'var(--ts-space-xl)',
            backgroundColor: '#090d16',
          }}
        >
          {/* Work background image */}
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="Modern Creative Work Studio"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.68) contrast(1.05)',
            }}
          />

          {/* Color harmony overlay utilizing brand primary and background tokens */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, rgba(9, 13, 22, 0.75) 0%, ${activeColors.primary}33 50%, rgba(9, 13, 22, 0.9) 100%)`,
            }}
          />

          {/* Top Brand Badge */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 'calc(var(--ts-base-size) * 0.95)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              TS
            </div>
            <span
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontWeight: 800,
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {state.name}
            </span>
          </div>

          {/* Bottom Quote & Feature Overlay Card in Frosted Glass */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'var(--ts-space-lg)',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              marginTop: 'var(--ts-space-lg)',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: 'calc(var(--ts-base-size) * 0.75)', fontWeight: 600, marginBottom: '8px' }}>
              <Sparkles style={{ width: '13px', height: '13px' }} />
              <span>Enterprise Design Engineering</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))',
                fontWeight: 700,
                margin: '0 0 8px 0',
                color: '#ffffff',
                lineHeight: 1.3,
              }}
            >
              &ldquo;TastyStyles keeps our cross-functional teams in lockstep across 14 product surfaces.&rdquo;
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.85, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '9px',
                }}
              >
                SR
              </div>
              <span style={{ fontWeight: 600 }}>Sarah Reynolds</span>
              <span>— VP of Product Experience</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--ts-space-lg)',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: 'var(--ts-space-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
              ...getCardStyle(),
            }}
          >
            {renderHeader()}
            {showSocial && (
              <>
                {renderSocialButtons()}
                {renderDivider()}
              </>
            )}
            {renderFormFields()}
            {renderBottomLinks()}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. SOCIAL-LOGIN-FIRST LAYOUT
  // =========================================================================
  if (authLayout === 'social-first') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          flex: 1,
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
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
            ...getCardStyle(),
          }}
        >
          {renderHeader()}

          {/* Social login buttons sit PROMINENTLY AT THE TOP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              style={{
                width: '100%',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                color: 'var(--ts-color-text)',
                padding: '10px 14px',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              <svg style={{ width: '16px', height: '16px', flexShrink: 0 }} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              style={{
                width: '100%',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                color: 'var(--ts-color-text)',
                padding: '10px 14px',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              <Apple style={{ width: '16px', height: '16px' }} />
              <span>Continue with Apple</span>
            </button>
            <button
              type="button"
              style={{
                width: '100%',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                color: 'var(--ts-color-text)',
                padding: '10px 14px',
                fontSize: 'calc(var(--ts-base-size) * 0.85)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              <svg style={{ width: '15px', height: '15px', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {renderDivider('or with your email address')}
          {renderFormFields()}
          {renderBottomLinks()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. FULL-PAGE BACKGROUND WITH FLOATING FORM
  // =========================================================================
  if (authLayout === 'full-background' || authLayout === 'glassmorphism') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          flex: 1,
          padding: 'var(--ts-space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Full-bleed vibrant gradient background mesh */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 15% 20%, ${activeColors.primary}33 0%, transparent 45%), radial-gradient(circle at 85% 80%, ${activeColors.accent}33 0%, transparent 45%), radial-gradient(circle at 50% 50%, ${activeColors.surface} 0%, var(--ts-color-background) 100%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Subtle decorative grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${activeColors.border} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        {/* Floating Frosted Glass Card */}
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            padding: 'var(--ts-space-xl)',
            borderRadius: 'calc(var(--ts-radius) * 1.25)',
            backgroundColor: `${activeColors.surface}cc`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${activeColors.border}`,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
          }}
        >
          {renderHeader()}
          {showSocial && (
            <>
              {renderSocialButtons()}
              {renderDivider()}
            </>
          )}
          {renderFormFields()}
          {renderBottomLinks()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4b. FULL-PAGE FLOATING 2 (IMAGE BACKGROUND)
  // =========================================================================
  if (authLayout === 'full-background-image') {
    return (
      <div
        style={{
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          flex: 1,
          padding: 'var(--ts-space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#090d16',
        }}
      >
        {/* Full-bleed atmospheric workplace background photography */}
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80"
          alt="Modern Architecture Workspace Studio"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.6) contrast(1.08)',
          }}
        />

        {/* Brand tint and vignette overlay for maximum field contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 50%, rgba(9, 13, 22, 0.45) 0%, rgba(9, 13, 22, 0.85) 100%), linear-gradient(135deg, ${activeColors.primary}22 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Floating Frosted Glass Form Card */}
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            padding: 'var(--ts-space-xl)',
            borderRadius: 'calc(var(--ts-radius) * 1.25)',
            backgroundColor: `${activeColors.surface}dd`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${activeColors.border}ee`,
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
          }}
        >
          {renderHeader()}
          {showSocial && (
            <>
              {renderSocialButtons()}
              {renderDivider()}
            </>
          )}
          {renderFormFields()}
          {renderBottomLinks()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. MINIMAL SINGLE-FIELD / MULTI-STEP (Google / Notion style)
  // =========================================================================
  if (authLayout === 'single-field' || authLayout === 'minimal') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          flex: 1,
          padding: 'var(--ts-space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: 'var(--ts-space-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
            ...getCardStyle(),
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--ts-radius)',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                marginBottom: 'var(--ts-space-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 'calc(var(--ts-base-size) * 0.95)',
              }}
            >
              TS
            </div>
            <h2
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.2)',
                fontWeight: 800,
                margin: 0,
              }}
            >
              {singleStep === 1 ? 'Sign in to TastyStyles' : 'Enter your password'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.8 }}>
              {singleStep === 1
                ? 'to continue to your Design Token workspace'
                : `Signing in as ${emailInput}`}
            </p>
          </div>

          {/* STEP 1: Ask for Email Only */}
          {singleStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setSingleStep(2); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600, marginBottom: '4px' }}>
                  Email or username
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
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@company.com"
                    autoFocus
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      color: 'var(--ts-color-text)',
                      width: '100%',
                      fontSize: 'calc(var(--ts-base-size) * 0.88)',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
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
                  minHeight: '40px',
                }}
              >
                <span>Continue</span>
                <ArrowRight style={{ width: '15px', height: '15px' }} />
              </button>

              {showSocial && (
                <>
                  {renderDivider('or use a passkey / SSO')}
                  {renderSocialButtons()}
                </>
              )}
            </form>
          )}

          {/* STEP 2: Ask for Password */}
          {singleStep === 2 && (
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
              {/* Selected Email Pill with Change Link */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  border: '1px solid var(--ts-color-border)',
                  backgroundColor: 'var(--ts-color-background)',
                  fontSize: 'calc(var(--ts-base-size) * 0.8)',
                }}
              >
                <span style={{ fontWeight: 600 }}>{emailInput}</span>
                <button
                  type="button"
                  onClick={() => setSingleStep(1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--ts-color-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '11px',
                  }}
                >
                  Change
                </button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: 'calc(var(--ts-base-size) * 0.8)', fontWeight: 600 }}>
                    Enter password
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', color: 'var(--ts-color-primary)', textDecoration: 'none', fontWeight: 600 }}>
                    Forgot password?
                  </a>
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
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    autoFocus
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      color: 'var(--ts-color-text)',
                      width: '100%',
                      fontSize: 'calc(var(--ts-base-size) * 0.88)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.6 }}
                  >
                    {showPassword ? <EyeOff style={{ width: '15px', height: '15px' }} /> : <Eye style={{ width: '15px', height: '15px' }} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSingleStep(1)}
                  style={{
                    backgroundColor: 'var(--ts-color-background)',
                    color: 'var(--ts-color-text)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius)',
                    padding: 'var(--ts-space-xs) var(--ts-space-md)',
                    fontSize: 'calc(var(--ts-base-size) * 0.82)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ArrowLeft style={{ width: '14px', height: '14px' }} />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    borderRadius: 'var(--ts-radius)',
                    padding: 'var(--ts-space-xs) var(--ts-space-md)',
                    fontSize: 'calc(var(--ts-base-size) * 0.85)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {renderBottomLinks()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. MODAL OR SLIDE-OVER OVERLAY LAYOUT
  // =========================================================================
  if (authLayout === 'modal-overlay') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          minHeight: '100%',
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--ts-space-lg)',
        }}
      >
        {/* Simulated Underlying Application Host Page */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: 'var(--ts-space-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
            opacity: 0.35,
            filter: 'blur(3px)',
            pointerEvents: 'none',
          }}
        >
          {/* Mock nav */}
          <div style={{ height: '36px', borderBottom: '1px solid var(--ts-color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800 }}>TastyStyles Dashboard</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '60px', height: '14px', backgroundColor: 'var(--ts-color-border)', borderRadius: '4px' }} />
              <div style={{ width: '60px', height: '14px', backgroundColor: 'var(--ts-color-border)', borderRadius: '4px' }} />
            </div>
          </div>
          {/* Mock content grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ height: '90px', backgroundColor: 'var(--ts-color-surface)', borderRadius: '8px', border: '1px solid var(--ts-color-border)' }} />
            <div style={{ height: '90px', backgroundColor: 'var(--ts-color-surface)', borderRadius: '8px', border: '1px solid var(--ts-color-border)' }} />
            <div style={{ height: '90px', backgroundColor: 'var(--ts-color-surface)', borderRadius: '8px', border: '1px solid var(--ts-color-border)' }} />
          </div>
          <div style={{ height: '160px', backgroundColor: 'var(--ts-color-surface)', borderRadius: '8px', border: '1px solid var(--ts-color-border)' }} />
        </div>

        {/* Modal Backdrop Shade */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />

        {/* Centered Modal Overlay Card with Close Button */}
        <div
          style={{
            width: '100%',
            maxWidth: '430px',
            padding: 'var(--ts-space-xl)',
            borderRadius: 'calc(var(--ts-radius) * 1.2)',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
          }}
        >
          {/* Close button */}
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ts-color-text)',
              opacity: 0.6,
              padding: '4px',
              borderRadius: '4px',
            }}
            title="Close dialog"
            aria-label="Close dialog"
          >
            <X style={{ width: '18px', height: '18px' }} />
          </button>

          {renderHeader()}
          {showSocial && (
            <>
              {renderSocialButtons()}
              {renderDivider()}
            </>
          )}
          {renderFormFields()}
          {renderBottomLinks()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 1. DEFAULT: CENTERED CARD LAYOUT
  // =========================================================================
  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        flex: 1,
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
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-md)',
          ...getCardStyle(),
        }}
      >
        {renderHeader()}
        {showSocial && (
          <>
            {renderSocialButtons()}
            {renderDivider()}
          </>
        )}
        {renderFormFields()}
        {renderBottomLinks()}
      </div>
    </div>
  );
};

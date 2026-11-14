import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';

export const LandingPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.landing ?? 'hero-split';

  // Interactive states for rich archetypes
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'support' | 'analytics' | 'pipeline' | 'growth'>('support');
  const [openFaqWarm, setOpenFaqWarm] = useState<number | null>(0);
  const [openFaqFintech, setOpenFaqFintech] = useState<number | null>(0);
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [wellnessInquirySent, setWellnessInquirySent] = useState(false);

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
      {/* Dynamic Navbar connected to Navbar layout selection */}
      <DynamicNavbar />

      {/* ==============================================================
          1. HERO SPLIT SHOWCASE LAYOUT (CLASSIC)
          ============================================================== */}
      {layout === 'hero-split' && (
        <section
          style={{
            padding: 'var(--ts-space-xl) var(--ts-space-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'var(--ts-space-xl)',
            maxWidth: '1000px',
            margin: '0 auto',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--ts-radius-button, 9999px)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                color: 'var(--ts-color-primary)',
                fontSize: 'calc(var(--ts-base-size) * 0.78)',
                fontWeight: 600,
                alignSelf: 'flex-start',
              }}
            >
              <AppIcon name="sparkles" size={13} />
              Next-Gen Design System Token Compiler
            </span>
            <h1
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * 1.3)',
                fontWeight: 900,
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Build UI tokens with deterministic precision.
            </h1>
            <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.95)', opacity: 0.8, lineHeight: 1.5 }}>
              Deterministic token contracts tested with WCAG 2.1 AAA contrast and ready for autonomous AI coding agents.
            </p>
            <div style={{ display: 'flex', gap: 'var(--ts-space-sm)', flexWrap: 'wrap' }}>
              <button
                type="button"
                style={{
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  borderRadius: 'var(--ts-radius-button, 9999px)',
                  padding: 'var(--ts-space-sm) var(--ts-space-lg)',
                  border: 'none',
                  fontSize: 'calc(var(--ts-base-size) * 0.9)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--ts-shadow)',
                  cursor: 'pointer',
                }}
              >
                <span>Compile Specification</span>
                <AppIcon name="arrowRight" size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Mockup Card */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              boxShadow: 'var(--ts-shadow)',
              padding: 'var(--ts-space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AppIcon name="code" size={18} style={{ color: 'var(--ts-color-accent)' }} />
              <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '13px' }}>tokens.config.json</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontFamily: 'monospace', opacity: 0.9 }}>
              <div>--color-primary: <span style={{ color: 'var(--ts-color-primary)', fontWeight: 700 }}>{activeColors.primary}</span></div>
              <div>--color-accent: <span style={{ color: 'var(--ts-color-accent)', fontWeight: 700 }}>{activeColors.accent}</span></div>
              <div>--radius-brand: <span>{state.radius}</span></div>
              <div>--font-heading: <span>{state.typography.headingFont}</span></div>
            </div>
            <div style={{ padding: '8px', borderRadius: 'var(--ts-radius-surface, 8px)', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)', color: 'var(--ts-color-primary)', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AppIcon name="checkCircle" size={14} />
              <span>WCAG 2.1 Contrast Verified</span>
            </div>
          </div>
        </section>
      )}

      {/* ==============================================================
          2. HERO CENTERED LAYOUT (CLASSIC)
          ============================================================== */}
      {layout === 'hero-centered' && (
        <section
          style={{
            padding: 'var(--ts-space-xl) var(--ts-space-lg)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--ts-space-md)',
            maxWidth: '780px',
            margin: '0 auto',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--ts-radius-button, 9999px)',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              color: 'var(--ts-color-primary)',
              fontSize: 'calc(var(--ts-base-size) * 0.78)',
              fontWeight: 600,
            }}
          >
            <AppIcon name="sparkles" size={13} />
            Next-Gen Design System Token Compiler
          </span>

          <h1
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale) * var(--ts-scale) * 1.1)',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Design tokens built for autonomous agents.
          </h1>

          <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * var(--ts-scale))', opacity: 0.8, maxWidth: '600px', lineHeight: 1.5 }}>
            Generate zero-drift specifications, pure CSS custom property variables, and Tailwind themes.
          </p>

          <div style={{ display: 'flex', gap: 'var(--ts-space-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                borderRadius: 'var(--ts-radius-button, 9999px)',
                padding: 'var(--ts-space-sm) var(--ts-space-lg)',
                border: 'none',
                fontSize: 'calc(var(--ts-base-size) * 0.9)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--ts-shadow)',
                cursor: 'pointer',
              }}
            >
              <span>Compile Specification</span>
              <AppIcon name="arrowRight" size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ==============================================================
          3. FEATURE GRID LAYOUT (CLASSIC)
          ============================================================== */}
      {layout === 'feature-grid' && (
        <section style={{ padding: 'var(--ts-space-lg)', maxWidth: '960px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.2)', fontWeight: 800, margin: 0 }}>
              Engineered for Production Rigor
            </h2>
            <p style={{ margin: '4px 0 0 0', opacity: 0.7, fontSize: '13px' }}>
              Four pillars ensuring zero visual drift across autonomous agent builds.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--ts-space-md)' }}>
            {[
              { title: 'Zero Hallucinations', desc: 'Strict machine-readable rules eliminating guesswork.', icon: <AppIcon name="zap" size={20} style={{ color: 'var(--ts-color-primary)' }} /> },
              { title: 'WCAG 2.1 AAA', desc: 'Real-time mathematical luminance verification formula.', icon: <AppIcon name="shield" size={20} style={{ color: 'var(--ts-color-accent)' }} /> },
              { title: 'Pure CSS Variables', desc: 'Scoped custom properties preventing collision cascades.', icon: <AppIcon name="layers" size={20} style={{ color: 'var(--ts-color-primary)' }} /> },
              { title: 'W3C DTCG Standard', desc: 'Figma Tokens and Style Dictionary ready exports.', icon: <AppIcon name="code" size={20} style={{ color: 'var(--ts-color-accent)' }} /> },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  boxShadow: 'var(--ts-shadow)',
                  padding: 'var(--ts-space-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {f.icon}
                <div style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, fontSize: '14px' }}>{f.title}</div>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.75, lineHeight: 1.4 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==============================================================
          4. WARM EDITORIAL AI ARCHETYPE (INSPIRED BY CRISP - IMAGE 1)
          ============================================================== */}
      {layout === 'warm-editorial' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', width: '100%', paddingBottom: '60px' }}>
          {/* Top Warm Hero Split */}
          <section
            style={{
              maxWidth: '1120px',
              margin: '0 auto',
              width: '100%',
              padding: '40px 24px 0',
              boxSizing: 'border-box',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Left Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    color: 'var(--ts-color-primary)',
                    padding: '4px 12px',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <AppIcon name="sparkles" size={13} />
                  Enterprise AI Platform
                </span>
              </div>
              <h1
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'clamp(32px, 4vw, 46px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: 0,
                  color: 'var(--ts-color-text)',
                }}
              >
                Build Smarter Products with AI That{' '}
                <span style={{ color: 'var(--ts-color-accent)' }}>Actually Works</span>
              </h1>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, opacity: 0.8, maxWidth: '460px' }}>
                Deliver personalized AI assistants in minutes — seamlessly integrated with your stack, production guardrails, and real-time observability.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    padding: '12px 24px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  Start Free Trial
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    color: 'var(--ts-color-text)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    padding: '12px 24px',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Live Demo
                </button>
              </div>
            </div>

            {/* Right Architectural 3D Structure + Floating Glass Interface Widget */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--ts-radius-surface, 24px)',
                overflow: 'hidden',
                boxShadow: 'var(--ts-shadow)',
                border: '1px solid var(--ts-color-border)',
                minHeight: '360px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 60%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80') center/cover no-repeat`,
              }}
            >
              {/* Floating UI Widget Card */}
              <div
                style={{
                  width: '90%',
                  maxWidth: '380px',
                  backgroundColor: 'var(--ts-color-surface)',
                  color: 'var(--ts-color-text)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                  border: '1px solid var(--ts-color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--ts-color-border)', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    <span style={{ fontWeight: 800, fontSize: '13px' }}>Agentic Pipeline v2.4</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--ts-color-primary)', fontWeight: 700 }}>● Active</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '12px' }}>
                  <div style={{ backgroundColor: 'var(--ts-color-background)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--ts-color-border)' }}>
                    <div style={{ opacity: 0.6, fontSize: '10px' }}>LATENCY SLA</div>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--ts-color-primary)' }}>18ms</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--ts-color-background)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--ts-color-border)' }}>
                    <div style={{ opacity: 0.6, fontSize: '10px' }}>ACCURACY</div>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--ts-color-accent)' }}>99.8%</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.8 }}>
                    <span>Deterministic Token Conformance</span>
                    <span style={{ fontWeight: 700 }}>100%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: 'var(--ts-color-border)', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--ts-color-primary)' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partner Trust Ribbon */}
          <section style={{ textAlign: 'center', borderTop: '1px solid var(--ts-color-border)', borderBottom: '1px solid var(--ts-color-border)', padding: '24px 20px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6, fontWeight: 700 }}>
              Trusted by forward-thinking teams worldwide
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', marginTop: '16px', opacity: 0.75, fontWeight: 800 }}>
              {['Wealthfront', 'Outreach', 'Square', 'Webflow', 'Rippling'].map((b) => (
                <span key={b} style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '16px' }}>{b}</span>
              ))}
            </div>
          </section>

          {/* 6-Feature Grid */}
          <section style={{ maxWidth: '1120px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: '0 0 8px 0' }}>
                Powerful Features Built for Intelligent Products
              </h2>
              <p style={{ margin: 0, opacity: 0.75, fontSize: '14px' }}>
                Everything you need to orchestrate autonomous customer experiences with confidence.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
              {[
                { title: 'Intelligent Workflow Automation', desc: 'Auto-compile multi-step user actions and trigger downstream CRM webhooks with zero manual code.', icon: 'zap' as const },
                { title: 'Real-Time Data Intelligence', desc: 'Stream telemetry and vector queries from your data lake directly into low-latency inference buffers.', icon: 'activity' as const },
                { title: 'Built for Scalable Growth', desc: 'Scale seamlessly from prototype to enterprise volumes with multi-tenant workspace isolation.', icon: 'trendingUp' as const },
                { title: 'Enterprise-Ready Security Framework', desc: 'End-to-end encryption, SOC2 certified compliance, and audit logging on every agent dispatch.', icon: 'shieldCheck' as const },
                { title: 'Developer-Centric Integration Tools', desc: 'Native SDKs for TypeScript, Python, and Go with automatic OpenAPI contract verification.', icon: 'code' as const },
                { title: 'High-Performance AI Engine', desc: 'Sub-50ms token generation with smart speculative decoding and automated model fallbacks.', icon: 'cpu' as const },
              ].map((feat, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                      color: 'var(--ts-color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AppIcon name={feat.icon} size={20} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '16px', fontWeight: 800, margin: 0 }}>
                    {feat.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.75, lineHeight: 1.5 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Workflow Tabs Section */}
          <section style={{ maxWidth: '1120px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '26px', fontWeight: 900, margin: 0 }}>
                Built for Teams Driving Exceptional Experiences
              </h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {[
                { id: 'support', label: 'Customer Support' },
                { id: 'analytics', label: 'Product Analytics' },
                { id: 'pipeline', label: 'Ingestion Pipelines' },
                { id: 'growth', label: 'Growth Marketing' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveWorkflowTab(tab.id as typeof activeWorkflowTab)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    border: activeWorkflowTab === tab.id ? 'none' : '1px solid var(--ts-color-border)',
                    backgroundColor: activeWorkflowTab === tab.id ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                    color: activeWorkflowTab === tab.id ? primaryTextColor : 'var(--ts-color-text)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 24px)',
                padding: '32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                gap: '32px',
                alignItems: 'center',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ts-color-primary)', fontWeight: 800 }}>
                  Active Module: {activeWorkflowTab.toUpperCase()}
                </span>
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '22px', fontWeight: 900, margin: 0 }}>
                  AI assistance across every customer interaction
                </h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, lineHeight: 1.6 }}>
                  {activeWorkflowTab === 'support' && 'Resolve 84% of inbound inquiries instantly with contextual answers verified against your live product docs and API specs.'}
                  {activeWorkflowTab === 'analytics' && 'Identify user friction points and drop-off funnels autonomously through continuous behavioral session aggregation.'}
                  {activeWorkflowTab === 'pipeline' && 'Transform unstructured logs into structured parquet tables with streaming schema validation and automated alerting.'}
                  {activeWorkflowTab === 'growth' && 'Hyper-personalize customer landing pages and onboarding sequences dynamically based on conversion intent scores.'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ts-color-primary)', fontSize: '13px', fontWeight: 700 }}>
                  Explore {activeWorkflowTab} workflow <AppIcon name="arrowRight" size={14} />
                </div>
              </div>

              {/* Visual Analytics UI Card (Replaces Raw Code Console) */}
              <div
                style={{
                  backgroundColor: 'var(--ts-color-background)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  border: '1px solid var(--ts-color-border)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ts-color-border)', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AppIcon name="activity" size={16} style={{ color: 'var(--ts-color-primary)' }} />
                    <span style={{ fontWeight: 800, fontSize: '13px' }}>Live Pipeline Telemetry</span>
                  </div>
                  <span style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', color: 'var(--ts-color-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>
                    ACTIVE SPRINT
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <div style={{ backgroundColor: 'var(--ts-color-surface)', padding: '12px', borderRadius: '10px', border: '1px solid var(--ts-color-border)' }}>
                    <div style={{ fontSize: '11px', opacity: 0.65 }}>Sessions Ingested</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--ts-color-primary)', marginTop: '2px' }}>1,482</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--ts-color-surface)', padding: '12px', borderRadius: '10px', border: '1px solid var(--ts-color-border)' }}>
                    <div style={{ fontSize: '11px', opacity: 0.65 }}>Automation Rate</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--ts-color-accent)', marginTop: '2px' }}>99.98%</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span>Inference Resource Load</span>
                    <span style={{ fontWeight: 700 }}>24%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: 'var(--ts-color-border)', overflow: 'hidden' }}>
                    <div style={{ width: '24%', height: '100%', backgroundColor: 'var(--ts-color-primary)' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Confidence Banner */}
          <section
            style={{
              maxWidth: '1120px',
              margin: '0 auto',
              width: '100%',
              padding: '0 24px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 24px)',
                padding: '48px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: '0 0 8px 0' }}>
                  Designed for Teams That Ship with Confidence
                </h2>
                <p style={{ margin: 0, opacity: 0.75, fontSize: '14px' }}>
                  Enterprise reliability, audited permissions, and dedicated SLAs protecting your mission-critical pipelines.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {[
                  { title: 'Production-Ready, Day Fifteen', desc: 'Out of the box turnkey integrations with your vector databases, monitoring tools, and CI/CD pipelines.' },
                  { title: 'Built to Scale with Your Business', desc: 'Elastic compute cluster scaling from 10 to 10M concurrent user sessions without throttling.' },
                  { title: 'Designed for Enterprise Security', desc: 'Granular field-level redaction, isolated tenant VPCs, and zero model training on your private data.' },
                ].map((item, i) => (
                  <div key={i} style={{ borderLeft: '3px solid var(--ts-color-primary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontWeight: 800, fontSize: '15px' }}>{item.title}</div>
                    <p style={{ margin: 0, fontSize: '13px', opacity: 0.75, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Founder Testimonial Line Art Sketches */}
          <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '26px', fontWeight: 900, margin: '0 0 6px 0' }}>
                Trusted by Teams Building with AI
              </h2>
              <p style={{ margin: 0, opacity: 0.7, fontSize: '13px' }}>
                Read how forward-thinking leaders rely on deterministic agent workflows.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 20px)',
                padding: '32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '24px',
                alignItems: 'center',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              {/* Sketches Column */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80"
                  alt="Founder Sarah"
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--ts-color-primary)' }}
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80"
                  alt="Founder Josh"
                  style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--ts-color-accent)' }}
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=140&q=80"
                  alt="Founder Marcus"
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--ts-color-primary)' }}
                />
              </div>

              {/* Quote Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ts-color-primary)' }}>Outreach Tech Group</span>
                <p style={{ margin: 0, fontSize: '15px', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "This platform helped us deploy custom AI workflows without touching our backend code. We have reduced customer escalation tickets by 72% in our very first quarter."
                </p>
                <div>
                  <span style={{ fontWeight: 800, fontSize: '14px' }}>Josh Wu</span>
                  <span style={{ opacity: 0.6, fontSize: '12px' }}> — Principal Systems Engineer</span>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Accordion */}
          <section style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '26px', fontWeight: 900, margin: '0 0 6px 0' }}>
                Everything You Need to Know Before Getting Started
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { q: 'What problems does this AI platform solve?', a: 'It bridges the gap between raw LLM models and enterprise applications, providing automatic schema validation, token compilation, and deterministic state management.' },
                { q: 'Who is this platform designed for?', a: 'Engineering teams, product managers, and design system leads who require reliable, non-hallucinating agent outputs in production.' },
                { q: 'Do I need dedicated ML or AI expertise to use it?', a: 'Not at all. You interact via standardized REST APIs, TypeScript SDKs, and pre-built declarative workflows.' },
                { q: 'How does the platform handle data security and privacy?', a: 'Your data is strictly partitioned in your choice of cloud region with zero model retraining on customer inputs.' },
              ].map((faq, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqWarm(openFaqWarm === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--ts-color-text)',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ transform: openFaqWarm === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                      <AppIcon name="chevronDown" size={16} />
                    </span>
                  </button>
                  {openFaqWarm === i && (
                    <div style={{ padding: '0 20px 16px', fontSize: '13px', opacity: 0.8, lineHeight: 1.6, borderTop: '1px solid var(--ts-color-border)', paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Grand CTA Banner */}
          <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div
              style={{
                borderRadius: 'var(--ts-radius-surface, 24px)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                padding: '48px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: 0 }}>
                Start Building Smarter with AI Today
              </h2>
              <p style={{ margin: 0, opacity: 0.75, fontSize: '14px', maxWidth: '480px' }}>
                Join forward-thinking product teams building deterministic experiences. Get started in minutes.
              </p>
              <button
                type="button"
                style={{
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  border: 'none',
                  borderRadius: 'var(--ts-radius-button, 9999px)',
                  padding: '12px 32px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                Get Started
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ==============================================================
          5. ORGANIC WELLNESS ARCHETYPE (INSPIRED BY INTERBEING - IMAGE 2)
          ============================================================== */}
      {layout === 'organic-wellness' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', width: '100%', paddingBottom: '60px' }}>
          {/* Serene Travertine & Interior Hero */}
          <section
            style={{
              maxWidth: '1120px',
              margin: '20px auto 0',
              width: '100%',
              padding: '0 24px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                borderRadius: 'var(--ts-radius-surface, 28px)',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '460px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '48px 36px',
                color: '#ffffff',
                boxShadow: 'var(--ts-shadow)',
                background: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.35) 60%), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat`,
              }}
            >
              <div style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <span style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ts-color-accent)', fontWeight: 700 }}>
                  HOLISTIC SANCTUARY & WELLNESS
                </span>
                <h1
                  style={{
                    fontFamily: 'var(--ts-font-heading)',
                    fontSize: 'clamp(32px, 4.5vw, 48px)',
                    fontWeight: 900,
                    lineHeight: 1.15,
                    margin: 0,
                  }}
                >
                  Find Your Enlightenment Through Modern Wellness
                </h1>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, opacity: 0.9 }}>
                  Empower your mind, body, and soul with our science-backed and soul-nourishing programs.
                </p>
                <div>
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      border: 'none',
                      borderRadius: 'var(--ts-radius-button, 9999px)',
                      padding: '12px 28px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: 'var(--ts-shadow)',
                    }}
                  >
                    Get Free Consultancy
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* "Why Choosing Us" Split */}
          <section
            style={{
              maxWidth: '1120px',
              margin: '0 auto',
              width: '100%',
              padding: '0 24px',
              boxSizing: 'border-box',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Left Artisanal Imagery */}
            <div
              style={{
                borderRadius: 'var(--ts-radius-surface, 24px)',
                overflow: 'hidden',
                height: '320px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80"
                alt="Artisanal meditation ceramics"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Right Benefits List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0' }}>
                  Why Choosing Us
                </h2>
                <p style={{ margin: 0, opacity: 0.75, fontSize: '14px' }}>
                  Evidence-based holistic living practices guiding you from stress into equilibrium.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { title: 'Expert-Led Programs', desc: 'Curated by licensed psychologists, breathwork instructors, and certified mindfulness facilitators.' },
                  { title: 'Accessible for Everyone', desc: 'Adaptive exercises suited for beginners through seasoned practitioners with flexible pacing.' },
                  { title: 'Mind-Body Approach', desc: 'Integrated physical restorative postures paired with nervous system downregulation.' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--ts-color-surface)',
                      border: '1px solid var(--ts-color-border)',
                      borderRadius: 'var(--ts-radius-surface, 16px)',
                      padding: '16px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '15px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', opacity: 0.75 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Courses / Offerings 3-Card Grid */}
          <section style={{ maxWidth: '1120px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0' }}>
                Courses & Series
              </h2>
              <p style={{ margin: 0, opacity: 0.75, fontSize: '14px' }}>
                Immersion courses designed to align physical health with emotional resilience.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
              {[
                { title: 'Mindfulness Series', lessons: '24 Video Lessons • Weekly In-Person Practice', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80' },
                { title: 'Breathwork Series', lessons: '12 Video Lessons • Guided Audio Sequences', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80' },
                { title: 'Kindness and Empathy', lessons: '16 Video Lessons • Monthly Community Circle', img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80' },
              ].map((course, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 20px)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '18px', fontWeight: 800, margin: 0 }}>
                      {course.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>
                      {course.lessons}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Alternating Zigzag Stories */}
          <section style={{ maxWidth: '1120px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '32px', alignItems: 'center' }}>
              <div style={{ borderRadius: 'var(--ts-radius-surface, 20px)', overflow: 'hidden', height: '280px' }}>
                <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=700&q=80" alt="Joy in sunlight" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ts-color-primary)', fontWeight: 800 }}>EXPERIENCES</span>
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '24px', fontWeight: 900, margin: 0 }}>What You'll Experience</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, lineHeight: 1.6 }}>
                  Feel energized, centered, and aligned with passion and joy in every aspect of your life through restorative holistic routines.
                </p>
                <div style={{ color: 'var(--ts-color-primary)', fontSize: '13px', fontWeight: 700 }}>More Info →</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '32px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ts-color-primary)', fontWeight: 800 }}>OUR METHODS</span>
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '24px', fontWeight: 900, margin: 0 }}>Backed By Science & Spirit</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, lineHeight: 1.6 }}>
                  We take wellness seriously; every session, tool, and method we use is thoughtfully tailored for your personalized healing journey.
                </p>
                <div style={{ color: 'var(--ts-color-primary)', fontSize: '13px', fontWeight: 700 }}>More Info →</div>
              </div>
              <div style={{ borderRadius: 'var(--ts-radius-surface, 20px)', overflow: 'hidden', height: '280px' }}>
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80" alt="Meditation peace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </section>

          {/* Preset-Themed Lead-Gen Banner */}
          <section style={{ maxWidth: '1120px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                borderRadius: 'var(--ts-radius-surface, 28px)',
                padding: '48px 36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '36px',
                alignItems: 'center',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '30px', fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
                  Start Your Wellness Journey Today
                </h2>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, lineHeight: 1.6 }}>
                  Whether you're seeking inner peace, physical vitality, or spiritual clarity, our certified facilitators will guide you every step of the way.
                </p>
              </div>

              {/* Consultation Card Form */}
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  color: 'var(--ts-color-text)',
                  borderRadius: 'var(--ts-radius-surface, 20px)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: 'var(--ts-shadow)',
                  border: '1px solid var(--ts-color-border)',
                }}
              >
                {wellnessInquirySent ? (
                  <div style={{ color: 'var(--ts-color-primary)', fontWeight: 700, fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
                    ✓ Thank you! A dedicated wellness consultant will reach out within 24 hours.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setWellnessInquirySent(true);
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', color: 'var(--ts-color-text)', fontSize: '13px', width: '100%', boxSizing: 'border-box' }}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-background)', color: 'var(--ts-color-text)', fontSize: '13px', width: '100%', boxSizing: 'border-box' }}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: 'var(--ts-color-primary)',
                        color: primaryTextColor,
                        border: 'none',
                        borderRadius: 'var(--ts-radius-button, 9999px)',
                        padding: '12px',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        marginTop: '4px',
                        boxShadow: 'var(--ts-shadow)',
                      }}
                    >
                      Join a Program
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ==============================================================
          6. CYBER SPOTLIGHT STUDIO ARCHETYPE (INSPIRED BY CERAVE - IMAGE 3)
          ============================================================== */}
      {layout === 'cyber-spotlight' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '70px', width: '100%', paddingBottom: '60px' }}>
          {/* Volumetric Spotlight Ray Hero */}
          <section
            style={{
              position: 'relative',
              padding: '60px 24px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Luminous Spotlight Ray from Top-Right (Dynamic based on Preset Primary) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: '10%',
                width: '350px',
                height: '400px',
                background: 'radial-gradient(circle at top, var(--ts-color-primary) 0%, transparent 70%)',
                opacity: 0.15,
                filter: 'blur(35px)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 1 }}>
              <span
                style={{
                  padding: '4px 14px',
                  borderRadius: 'var(--ts-radius-button, 9999px)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  color: 'var(--ts-color-primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <AppIcon name="sparkles" size={13} />
                Intelligent Conversation Suite
              </span>

              <h1
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'clamp(34px, 5vw, 54px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: 0,
                  color: 'var(--ts-color-text)',
                  letterSpacing: '-0.02em',
                }}
              >
                Smarter Conversations Powered by an Intelligent AI Assistant
              </h1>

              <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, opacity: 0.8, maxWidth: '600px' }}>
                Streamline workflows, automate conversations, and deliver unmatched customer experiences with conversational AI built for scale.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    padding: '12px 28px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  Get Started
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    color: 'var(--ts-color-text)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    padding: '12px 28px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Live Demo
                </button>
              </div>

              {/* Central Floating App Shell Mockup */}
              <div
                style={{
                  marginTop: '32px',
                  width: '100%',
                  maxWidth: '780px',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 20px)',
                  boxShadow: 'var(--ts-shadow)',
                  overflow: 'hidden',
                  textAlign: 'left',
                }}
              >
                {/* Window Bar */}
                <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--ts-color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--ts-color-background)' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  </div>
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>ai-assistant.live/session</span>
                </div>
                {/* Chat Shell Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--ts-color-primary)', color: primaryTextColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AppIcon name="bot" size={18} />
                    </div>
                    <div style={{ backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)', padding: '10px 16px', borderRadius: '12px', fontSize: '13px' }}>
                      "How can I help accelerate your development sprint today?"
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ backgroundColor: 'var(--ts-color-primary)', color: primaryTextColor, padding: '10px 16px', borderRadius: '12px', fontSize: '13px' }}>
                      "Audit our design tokens and verify zero CSS drift across repositories."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Glowing Glass Pillars */}
          <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { title: 'Adaptive Intelligence', desc: 'Real-time contextual learning from your custom corpus.' },
                { title: 'Active Privacy', desc: 'Enterprise data shielding with dedicated zero-retention.' },
                { title: 'Seamless Flow', desc: 'Fluid bi-directional voice and text streaming.' },
                { title: 'Scalable by Design', desc: 'Sub-second latency backed by global edge compute.' },
              ].map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ts-color-text)' }}>{p.title}</div>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.75, lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3-Tier Glass Pricing Cards */}
          <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: '0 0 8px 0' }}>
                Pricing for Smarter AI Conversations
              </h2>
              {/* Monthly / Yearly Toggle */}
              <div style={{ display: 'inline-flex', padding: '4px', borderRadius: 'var(--ts-radius-button, 9999px)', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)' }}>
                <button
                  type="button"
                  onClick={() => setPricingCycle('monthly')}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    border: 'none',
                    backgroundColor: pricingCycle === 'monthly' ? 'var(--ts-color-primary)' : 'transparent',
                    color: pricingCycle === 'monthly' ? primaryTextColor : 'var(--ts-color-text)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setPricingCycle('yearly')}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    border: 'none',
                    backgroundColor: pricingCycle === 'yearly' ? 'var(--ts-color-primary)' : 'transparent',
                    color: pricingCycle === 'yearly' ? primaryTextColor : 'var(--ts-color-text)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Yearly (Save 20%)
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
              {[
                { name: 'Base Plan', price: '$0', desc: 'Essential conversational AI for small teams', highlight: false, cta: 'Get Started' },
                { name: 'Pro Plan', price: pricingCycle === 'monthly' ? '$125' : '$99', desc: 'Advanced reasoning agents with unlimited tokens', highlight: true, cta: 'Start 14-Day Free Trial' },
                { name: 'Enterprise', price: '$100+', desc: 'Dedicated cluster, SLA, and custom fine-tuning', highlight: false, cta: 'Contact Sales' },
              ].map((tier, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: tier.highlight ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 20px)',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '20px',
                    boxShadow: tier.highlight ? 'var(--ts-shadow)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 800 }}>{tier.name}</div>
                    <div style={{ fontSize: '13px', opacity: 0.75 }}>{tier.desc}</div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--ts-color-primary)', marginTop: '12px' }}>
                      {tier.price} <span style={{ fontSize: '13px', color: 'var(--ts-color-text)', opacity: 0.6, fontWeight: 500 }}>/ month</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    style={{
                      backgroundColor: tier.highlight ? 'var(--ts-color-primary)' : 'var(--ts-color-background)',
                      color: tier.highlight ? primaryTextColor : 'var(--ts-color-text)',
                      border: tier.highlight ? 'none' : '1px solid var(--ts-color-border)',
                      borderRadius: 'var(--ts-radius-button, 9999px)',
                      padding: '10px 20px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Grand Reflective Brand Typography Footer */}
          <footer style={{ borderTop: '1px solid var(--ts-color-border)', paddingTop: '40px', textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontSize: 'clamp(48px, 10vw, 100px)',
                fontWeight: 900,
                letterSpacing: '0.08em',
                color: 'var(--ts-color-text)',
                opacity: 0.25,
                textShadow: '0 0 30px var(--ts-color-primary)',
                userSelect: 'none',
              }}
            >
              CERAVE
            </div>
            <p style={{ margin: '12px 0 0 0', fontSize: '12px', opacity: 0.6 }}>
              © 2026 Cerave AI. Autonomous conversational architectures.
            </p>
          </footer>
        </div>
      )}

      {/* ==============================================================
          7. FINTECH OPERATIONS & CRYPTO ARCHETYPE (INSPIRED BY BANKIN - IMAGE 4)
          ============================================================== */}
      {layout === 'fintech-flow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', width: '100%', paddingBottom: '60px' }}>
          {/* Preset-Themed Gradient Hero with Floating Phone */}
          <section
            style={{
              background: 'linear-gradient(135deg, var(--ts-color-primary) 0%, var(--ts-color-surface) 100%)',
              color: primaryTextColor,
              padding: '60px 24px 80px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <h1
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'clamp(32px, 4.5vw, 48px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Powering Secure Crypto Payments and Modern Financial Operations
              </h1>

              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, opacity: 0.9, maxWidth: '640px' }}>
                An enterprise-grade infrastructure to manage cryptocurrency, digital assets, transfers, and financial workflows — built with security, compliance, and reliability at the core.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    color: 'var(--ts-color-text)',
                    border: 'none',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    padding: '12px 28px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  Open Account
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: primaryTextColor,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 'var(--ts-radius-button, 9999px)',
                    padding: '12px 28px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Explore Contract
                </button>
              </div>

              {/* Floating Phone Balance Frame */}
              <div
                style={{
                  marginTop: '32px',
                  width: '280px',
                  backgroundColor: 'var(--ts-color-surface)',
                  color: 'var(--ts-color-text)',
                  borderRadius: '32px',
                  border: '4px solid var(--ts-color-border)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', opacity: 0.7, fontWeight: 600 }}>Total Balance</span>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--ts-color-primary)' }}>
                  Rp 1.457.078.000
                </div>
                <div style={{ backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)', padding: '8px 12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ts-color-primary)', fontWeight: 700 }}>
                  <span>+ Rp 1.999.000</span>
                  <span>Received</span>
                </div>
              </div>
            </div>
          </section>

          {/* Trusted Partners Ribbon */}
          <section style={{ textAlign: 'center', borderBottom: '1px solid var(--ts-color-border)', paddingBottom: '24px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6, fontWeight: 700 }}>
              Our Recent Clients & Trusted Partners
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', marginTop: '14px', opacity: 0.75, fontWeight: 800 }}>
              {['Shopify', 'Trustpilot', 'coinbase', 'PayPal', 'Razorpay'].map((p) => (
                <span key={p} style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '16px' }}>{p}</span>
              ))}
            </div>
          </section>

          {/* 4 Banking Feature Cards */}
          <section style={{ maxWidth: '1120px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0' }}>
                Everything You Need to Run Modern Banking
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Secure Account', desc: 'Instant biometric security, multi-sig signers, and encrypted audit trails.', highlighted: true },
                { title: 'Payments & Transfers', desc: 'Cross-border liquidity pools with sub-second finality and zero fees.', highlighted: false },
                { title: 'System Integration', desc: 'Unified SDKs with automated webhook dispatches for accounting tools.', highlighted: false },
                { title: 'Compliance Tools', desc: 'Real-time sanctions screening, automated KYC/AML verification, and tax logs.', highlighted: false },
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: card.highlighted ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                    color: card.highlighted ? primaryTextColor : 'var(--ts-color-text)',
                    border: `1px solid ${card.highlighted ? 'var(--ts-color-primary)' : 'var(--ts-color-border)'}`,
                    borderRadius: 'var(--ts-radius-surface, 20px)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '16px' }}>{card.title}</div>
                  <p style={{ margin: 0, fontSize: '13px', opacity: card.highlighted ? 0.9 : 0.75, lineHeight: 1.5 }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Alternating Device KYC & Settlement Showcase */}
          <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '36px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '32px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ts-color-primary)', fontWeight: 800 }}>ONBOARDING AGILITY</span>
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '22px', fontWeight: 900, margin: 0 }}>
                  Know Your Customers Before You Even Talk to Them
                </h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, lineHeight: 1.6 }}>
                  Automated biometric match algorithms with document liveness detection and sanction list querying in under 3 seconds.
                </p>
              </div>

              {/* Mockup Box */}
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '13px' }}>Alex Morgan</span>
                  <span style={{ backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)', color: 'var(--ts-color-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>VERIFIED</span>
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>Risk Assessment: Low • Sanction Match: None</div>
              </div>
            </div>
          </section>

          {/* FAQ Accordion */}
          <section style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '26px', fontWeight: 900, margin: '0 0 6px 0' }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { q: 'What is this platform used for?', a: 'It provides non-custodial and custodial payment orchestration, automated currency exchange, and ledger reconciliation for modern fintech companies.' },
                { q: 'Can this platform be integrated with existing core systems?', a: 'Yes, via RESTful webhooks, ISO 20022 messaging, and pre-built connectors for major banking rails.' },
                { q: 'Does this platform support multiple blockchains?', a: 'It supports major L1 and L2 networks with automatic gas abstraction and unified settlement.' },
              ].map((faq, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqFintech(openFaqFintech === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--ts-color-text)',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ transform: openFaqFintech === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                      <AppIcon name="chevronDown" size={16} />
                    </span>
                  </button>
                  {openFaqFintech === i && (
                    <div style={{ padding: '0 20px 16px', fontSize: '13px', opacity: 0.8, lineHeight: 1.6, borderTop: '1px solid var(--ts-color-border)', paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Cyan Gradient CTA Banner */}
          <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
            <div
              style={{
                borderRadius: 'var(--ts-radius-surface, 24px)',
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                padding: '48px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: 0 }}>
                Start Building Secure Crypto Infrastructure Today
              </h2>
              <p style={{ margin: 0, opacity: 0.85, fontSize: '14px', maxWidth: '480px' }}>
                Launch next-generation financial products with automated compliance and robust treasury rails.
              </p>
              <button
                type="button"
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  color: 'var(--ts-color-text)',
                  border: 'none',
                  borderRadius: 'var(--ts-radius-button, 9999px)',
                  padding: '12px 32px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Get Started
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Universal Features Banner for classic archetypes */}
      {(layout === 'hero-split' || layout === 'hero-centered' || layout === 'feature-grid') && (
        <section
          style={{
            borderTop: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-surface)',
            padding: 'var(--ts-space-xl) var(--ts-space-lg)',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              maxWidth: '880px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--ts-space-md)',
            }}
          >
            {[
              { icon: <AppIcon name="zap" size={20} style={{ color: 'var(--ts-color-primary)' }} />, title: 'Deterministic Compiler', desc: 'Mathematical ratios ensure identical rendering across browsers and runtimes.' },
              { icon: <AppIcon name="shield" size={20} style={{ color: 'var(--ts-color-accent)' }} />, title: 'Accessibility First', desc: 'High-precision sRGB contrast calculations prevent unreadable color combinations.' },
              { icon: <AppIcon name="layers" size={20} style={{ color: 'var(--ts-color-primary)' }} />, title: 'Pure CSS Isolation', desc: 'Strictly zero stylesheet interference between sandbox views and your design tokens.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
                <div>{f.icon}</div>
                <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>
                  {f.title}
                </span>
                <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.8)', opacity: 0.75, lineHeight: 1.4 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

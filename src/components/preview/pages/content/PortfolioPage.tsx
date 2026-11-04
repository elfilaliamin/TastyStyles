import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { IdentityBadgeBlock } from '../../../blocks/IdentityBadgeBlock';
import { AppIcon } from '../../../common/AppIcon';

export const PortfolioPage: React.FC = () => {
  const { state } = useDesign();
  const layout = state.pageLayouts?.portfolio ?? 'case-study-hero';

  const caseStudies = [
    {
      title: 'TastyStyles Autonomous UI Engine',
      category: 'Design Systems · Token Compilers · React',
      metric: '+340% Agent Coding Velocity',
      description: 'Single-source-of-truth token architecture preventing frontend drift across Gemini, Claude, and Copilot.',
    },
    {
      title: 'Apex Cloud Telemetry Grid',
      category: 'Distributed Systems · Realtime Observability',
      metric: 'Reduced p99 Incident Resolution by 65%',
      description: 'Dense sub-second telemetry matrix visualizing 48 edge clusters and autonomous runtime daemons.',
    },
  ];

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
      <DynamicNavbar />

      <main style={{ padding: 'var(--ts-space-xl) var(--ts-space-lg)', maxWidth: '980px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xl)' }}>
        {/* Intro Statement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>Available for Select Q1 Enterprise Projects</span>
          </div>
          <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.5)', fontWeight: 900, margin: 0, lineHeight: 1.15 }}>
            Alex Rivers — Staff Product Designer & Token Architect.
          </h1>
          <p style={{ margin: 0, fontSize: '15px', opacity: 0.8, maxWidth: '640px', lineHeight: 1.6 }}>
            Specializing in high-density enterprise SaaS shells, deterministic design token compilers, and autonomous AI coding ground truth.
          </p>
        </div>

        {/* Layout Options: Minimalist Editorial vs Interactive Grid Gallery vs Case Study Hero */}
        {layout === 'minimalist-editorial' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
              Chronological Impact & Advisory
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { year: '2024–Present', role: 'Staff Token Architect', org: 'TastyStyles Protocol', impact: 'Built zero-drift deterministic token compiler and universal layout archetype engine.' },
                { year: '2022–2024', role: 'Principal Design Technologist', org: 'Apex Cloud Systems', impact: 'Led migration of 400+ micro-frontends to W3C DTCG standard with 99.8% test coverage.' },
                { year: '2019–2022', role: 'Lead Design Systems Engineer', org: 'Vance Dynamics', impact: 'Designed multi-brand component library servicing 1.2M daily active enterprise users.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 'var(--ts-space-md)',
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '15px' }}>{item.role} · {item.org}</span>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', opacity: 0.6 }}>{item.year}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.75, lineHeight: 1.5 }}>{item.impact}</p>
                </div>
              ))}
            </div>
          </div>
        ) : layout === 'interactive-grid-gallery' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
              Visual Engineering Gallery
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'var(--ts-space-md)' }}>
              {caseStudies.map((cs, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    overflow: 'hidden',
                    boxShadow: 'var(--ts-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: '140px',
                      backgroundColor: 'var(--ts-color-background)',
                      borderBottom: '1px solid var(--ts-color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AppIcon name="sparkles" size={40} style={{ color: 'var(--ts-color-primary)', opacity: 0.8 }} />
                  </div>
                  <div style={{ padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ts-color-primary)' }}>{cs.category}</div>
                    <div style={{ fontWeight: 800, fontSize: '14px' }}>{cs.title}</div>
                    <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>{cs.metric}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Selected Case Studies (Case Study Hero Layout) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
              Selected Production Engagements
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'var(--ts-space-lg)' }}>
              {caseStudies.map((cs, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 'var(--ts-space-lg)',
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius-surface, 16px)',
                    boxShadow: 'var(--ts-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ts-color-primary)', display: 'inline-block', marginBottom: '6px' }}>
                      {cs.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '17px', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                      {cs.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', opacity: 0.75, lineHeight: 1.5 }}>
                      {cs.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--ts-color-border)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                      {cs.metric}
                    </span>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--ts-color-primary)',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>Read Spec</span>
                      <AppIcon name="chevronDown" size={12} style={{ transform: 'rotate(-90deg)' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verification Card */}
        <IdentityBadgeBlock
          name="Alex Rivers"
          title="Principal Design Systems Architect"
          rating={5.0}
          reviewCount={42}
          verified
          statusText="Based in San Francisco · PST"
          badge="Verified Architect"
        />
      </main>
    </div>
  );
};

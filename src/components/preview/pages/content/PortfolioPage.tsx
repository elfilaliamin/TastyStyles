import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { IdentityBadgeBlock } from '../../../blocks/IdentityBadgeBlock';
import { AppIcon } from '../../../common/AppIcon';
import { MEDIA_CATALOG, type PortfolioProjectItem } from '../../../../config/mediaCatalog';

export const PortfolioPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.portfolio ?? 'case-study-hero';

  const projects: PortfolioProjectItem[] = MEDIA_CATALOG.portfolio;
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const [selectedTier, setSelectedTier] = useState<'audit' | 'sprint' | 'retainer'>('sprint');

  const testimonials = [
    {
      id: 't1',
      client: 'Sarah Lin',
      role: 'VP of Engineering, Solstice Labs',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
      quote: 'Alex delivered our design token compiler 3 weeks ahead of schedule. Zero CSS drift across 14 repositories on launch day.',
    },
    {
      id: 't2',
      client: 'Marcus Vance',
      role: 'Head of Product, Helios Energy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      quote: 'The telemetry visualization performance was stunning. Even on mobile devices, 120,000 live inverter nodes render flawlessly at 60fps.',
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

      <main
        style={{
          padding: 'var(--ts-space-xl) var(--ts-space-lg)',
          maxWidth: '1080px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-xl)',
        }}
      >
        {/* Intro Statement Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--ts-space-md)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>Available for Select Q1 Enterprise Projects</span>
            </div>
            <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.5)', fontWeight: 900, margin: 0, lineHeight: 1.15 }}>
              Alex Rivers — Staff Product Designer & Token Architect.
            </h1>
            <p style={{ margin: 0, fontSize: '15px', opacity: 0.8, lineHeight: 1.6 }}>
              Specializing in high-density enterprise SaaS shells, deterministic design token compilers, and autonomous AI coding ground truth.
            </p>
          </div>

          <IdentityBadgeBlock
            name="Alex Rivers"
            title="@alexrivers.design"
            verified={true}
            statusText="Accepting Q1 Inquiries"
          />
        </div>

        {/* 1. CASE STUDY HERO LAYOUT */}
        {layout === 'case-study-hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            {/* Project Picker Chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.6, marginRight: '4px' }}>
                Featured Projects:
              </span>
              {projects.map((p) => {
                const isSelected = p.id === activeProject.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProjectId(p.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      border: isSelected ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                      backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                      color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      minHeight: '36px',
                    }}
                  >
                    {p.title.split(':')[0]}
                  </button>
                );
              })}
            </div>

            {/* Main Featured Case Study Card */}
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                overflow: 'hidden',
                boxShadow: 'var(--ts-shadow)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              }}
            >
              {/* Left Column: Visual Media with Device Shimmer */}
              <div style={{ position: 'relative', minHeight: '300px', backgroundColor: '#090d16', overflow: 'hidden' }}>
                <img
                  src={activeProject.coverImage}
                  alt={activeProject.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {activeProject.clientLogoText} · {activeProject.year}
                </div>
              </div>

              {/* Right Column: Case Narrative & Quantified Outcome */}
              <div style={{ padding: 'var(--ts-space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ts-color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {activeProject.category}
                  </span>
                </div>

                <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '20px', fontWeight: 800, margin: 0 }}>
                  {activeProject.title}
                </h2>

                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, opacity: 0.85 }}>
                  {activeProject.summary}
                </p>

                {/* Quantified Business Metric Card */}
                <div
                  style={{
                    padding: 'var(--ts-space-md)',
                    borderRadius: 'var(--ts-radius)',
                    backgroundColor: 'var(--ts-color-background)',
                    border: '1px solid var(--ts-color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--ts-color-primary)', fontFamily: 'var(--ts-font-heading)' }}>
                    {activeProject.metric}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 800, fontSize: '13px' }}>{activeProject.metricLabel}</span>
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>Verified production telemetry audit</span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--ts-color-background)',
                        border: '1px solid var(--ts-color-border)',
                        fontSize: '11px',
                        fontWeight: 600,
                        opacity: 0.8,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MINIMALIST EDITORIAL LAYOUT */}
        {layout === 'minimalist-editorial' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
              Chronological Impact & Advisory
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { year: '2024–Present', role: 'Staff Token Architect', org: 'TastyStyles Protocol', impact: 'Built zero-drift deterministic token compiler and universal layout archetype engine servicing autonomous agent runtimes.' },
                { year: '2022–2024', role: 'Principal Design Technologist', org: 'Solstice Labs (San Francisco)', impact: 'Led migration of 400+ micro-frontends to W3C DTCG standard with automated APCA contrast verification.' },
                { year: '2019–2022', role: 'Lead Design Systems Engineer', org: 'Helios Energy Network', impact: 'Designed multi-brand component library servicing 1.2M daily active enterprise users at 60fps.' },
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
        )}

        {/* 3. INTERACTIVE GRID GALLERY LAYOUT */}
        {layout === 'interactive-grid-gallery' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
              Visual Engineering Gallery
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'var(--ts-space-md)' }}>
              {projects.map((cs) => (
                <div
                  key={cs.id}
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
                  <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={cs.coverImage}
                      alt={cs.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '10px',
                        fontWeight: 700,
                      }}
                    >
                      {cs.metric}
                    </div>
                  </div>

                  <div style={{ padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ts-color-primary)' }}>{cs.category}</span>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{cs.title}</h3>
                    <p style={{ margin: 0, fontSize: '12px', opacity: 0.75, lineHeight: 1.5, flex: 1 }}>{cs.summary}</p>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {cs.tags.slice(0, 3).map((tag) => (
                        <span key={tag} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Client Testimonials Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
            Executive Client Testimonials
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'var(--ts-space-md)' }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: 'var(--ts-space-lg)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  boxShadow: 'var(--ts-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic', opacity: 0.9 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={t.avatar}
                    alt={t.client}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '13px' }}>{t.client}</div>
                    <div style={{ fontSize: '11px', opacity: 0.6 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Estimator & Services Tiers */}
        <div
          style={{
            padding: 'var(--ts-space-lg)',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            borderRadius: 'var(--ts-radius-surface, 16px)',
            boxShadow: 'var(--ts-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-md)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '16px', fontWeight: 800, margin: 0 }}>
                Project Engagement Calculator
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.7 }}>
                Direct sprint estimation for design token architecture & enterprise component systems.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'audit' as const, label: 'Token Audit', price: '$4.5k' },
                { id: 'sprint' as const, label: '2-Week Sprint', price: '$12k' },
                { id: 'retainer' as const, label: 'Monthly Retainer', price: '$8k/mo' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--ts-radius)',
                    border: selectedTier === tier.id ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                    backgroundColor: selectedTier === tier.id ? 'var(--ts-color-primary)' : 'var(--ts-color-background)',
                    color: selectedTier === tier.id ? primaryTextColor : 'var(--ts-color-text)',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {tier.label} ({tier.price})
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: 'var(--ts-space-md)',
              borderRadius: 'var(--ts-radius)',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px' }}>
                {selectedTier === 'audit' && 'Comprehensive DTCG Token & Contrast Audit (5 Days)'}
                {selectedTier === 'sprint' && 'Full App Design System & Component Library Sprint (14 Days)'}
                {selectedTier === 'retainer' && 'Ongoing Autonomous Agent Alignment & Codebase Synchronization'}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>
                Includes CI/CD contrast regression tests, Figma token sync, and Next.js / Tailwind exporter.
              </div>
            </div>

            <button
              type="button"
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                border: 'none',
                borderRadius: 'var(--ts-radius)',
                padding: '10px 20px',
                fontWeight: 700,
                fontSize: '13px',
                minHeight: '44px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <AppIcon name="mail" size={16} />
              <span>Initiate Project Inquiry</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

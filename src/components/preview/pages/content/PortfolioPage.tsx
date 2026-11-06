import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { AppIcon } from '../../../common/AppIcon';
import { MEDIA_CATALOG, type PortfolioProjectItem } from '../../../../config/mediaCatalog';

export const PortfolioPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.portfolio ?? 'bento-developer';

  const projects: PortfolioProjectItem[] = MEDIA_CATALOG.portfolio;
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Interactive Terminal state
  const [terminalCommand, setTerminalCommand] = useState('cat resume.json');

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
          maxWidth: layout === 'split-showcase' ? '1200px' : '1040px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-xl)',
        }}
      >
        {/* ==============================================================
            1. BENTO DEVELOPER LAYOUT (DEFAULT)
            ============================================================== */}
        {(layout === 'bento-developer' || layout === 'case-study-hero') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            {/* Top Bento Row: Profile Hero + Status & Skills Quick Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--ts-space-md)' }}>
              {/* Profile Card */}
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ts-space-md)',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80"
                    alt="Alex Rivers"
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--ts-color-primary)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '20px', fontWeight: 900, margin: 0 }}>
                        Alex Rivers
                      </h1>
                      <span style={{ color: 'var(--ts-color-primary)', fontSize: '14px' }}>★</span>
                    </div>
                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: 600, opacity: 0.85 }}>
                      Staff Design Technologist & Systems Architect
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>Available for Select Q1 Work</span>
                    </div>
                  </div>
                </div>

                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, opacity: 0.85 }}>
                  Specializing in declarative design tokens, deterministic UI compilers, high-density enterprise application shells, and AI coding agent ground truth.
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <a
                    href="#contact"
                    style={{
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      padding: '8px 16px',
                      borderRadius: 'var(--ts-radius-surface, 10px)',
                      fontWeight: 700,
                      fontSize: '12px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Get in Touch</span>
                    <AppIcon name="arrowRight" size={13} />
                  </a>
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'var(--ts-color-background)',
                      color: 'var(--ts-color-text)',
                      border: '1px solid var(--ts-color-border)',
                      padding: '8px 14px',
                      borderRadius: 'var(--ts-radius-surface, 10px)',
                      fontWeight: 600,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <AppIcon name="download" size={13} />
                    <span>Resume PDF</span>
                  </button>
                </div>
              </div>

              {/* Skills & Spoken Languages Card */}
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ts-space-md)',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--ts-color-accent)', marginBottom: '4px' }}>
                    Core Technical Stack
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['TypeScript', 'React 19', 'Design Tokens', 'Tailwind CSS', 'Vite', 'Node.js', 'Go', 'Zod', 'WCAG AAA', 'AST Compilers'].map((sk) => (
                      <span
                        key={sk}
                        style={{
                          padding: '3px 9px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--ts-color-background)',
                          border: '1px solid var(--ts-color-border)',
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--ts-color-border)', paddingTop: 'var(--ts-space-sm)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--ts-color-primary)', marginBottom: '4px' }}>
                    Spoken & Programming Languages
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', fontSize: '12px' }}>
                    <div>• English <span style={{ opacity: 0.6 }}>(Native)</span></div>
                    <div>• TypeScript <span style={{ opacity: 0.6 }}>(Expert)</span></div>
                    <div>• Spanish <span style={{ opacity: 0.6 }}>(Fluent)</span></div>
                    <div>• Go & Python <span style={{ opacity: 0.6 }}>(Proficient)</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Projects Showcase Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '18px', fontWeight: 800, margin: 0 }}>
                  Featured Engineering Projects
                </h2>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>Click to inspect case study</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 'var(--ts-space-md)' }}>
                {projects.map((proj) => {
                  const isSelected = proj.id === activeProject.id;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      style={{
                        backgroundColor: 'var(--ts-color-surface)',
                        border: `1px solid ${isSelected ? 'var(--ts-color-primary)' : 'var(--ts-color-border)'}`,
                        borderRadius: 'var(--ts-radius-surface, 16px)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 10px 25px -5px rgba(0,0,0,0.1)' : 'var(--ts-shadow)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: '#ffffff',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: 700,
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          {proj.category}
                        </span>
                      </div>
                      <div style={{ padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                        <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '15px', fontWeight: 800, margin: 0 }}>
                          {proj.title}
                        </h3>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: 1.5, flex: 1 }}>
                          {proj.summary}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--ts-color-border)', paddingTop: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>
                            {proj.metric}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ts-color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>Read Story</span>
                            <AppIcon name="arrowRight" size={11} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Work Experiences & Education 2-Column Split */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--ts-space-md)' }}>
              {/* Experiences Timeline */}
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ts-space-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AppIcon name="activity" size={16} style={{ color: 'var(--ts-color-primary)' }} />
                  <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '16px', fontWeight: 800, margin: 0 }}>
                    Career Experiences
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    {
                      role: 'Staff Design Technologist',
                      company: 'ApexDesign Labs',
                      period: '2024 — Present',
                      bullets: 'Architected automated token compilers eliminating CSS drift across 14 enterprise repositories.',
                    },
                    {
                      role: 'Lead Frontend Systems Engineer',
                      company: 'Solstice Networks',
                      period: '2021 — 2024',
                      bullets: 'Engineered realtime telemetry dashboard rendering 120,000 WebSocket nodes at 60fps.',
                    },
                    {
                      role: 'Senior UI/UX Engineer',
                      company: 'Helios Mobile',
                      period: '2018 — 2021',
                      bullets: 'Built multi-tenant fintech component library certified for WCAG 2.1 AAA accessibility.',
                    },
                  ].map((exp, i) => (
                    <div key={i} style={{ borderLeft: '2px solid var(--ts-color-primary)', paddingLeft: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 800, fontSize: '13px' }}>{exp.role}</span>
                        <span style={{ fontSize: '10px', opacity: 0.6, fontFamily: 'monospace' }}>{exp.period}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ts-color-primary)', fontWeight: 600 }}>{exp.company}</div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8, lineHeight: 1.5 }}>
                        {exp.bullets}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Honors */}
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ts-space-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AppIcon name="award" size={16} style={{ color: 'var(--ts-color-accent)' }} />
                  <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '16px', fontWeight: 800, margin: 0 }}>
                    Education & Credentials
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    {
                      degree: 'M.S. in Computer Science (HCI)',
                      school: 'Stanford University',
                      year: '2016 — 2018',
                      detail: 'Focus on declarative UI compilation, visual perception modeling, and design systems.',
                    },
                    {
                      degree: 'B.S. in Software Engineering',
                      school: 'UC Berkeley',
                      year: '2012 — 2016',
                      detail: 'Magna Cum Laude • ACM Student Chapter President.',
                    },
                    {
                      degree: 'Certifications & Honors',
                      school: 'W3C & AWS',
                      year: '2023 — 2025',
                      detail: 'Certified Accessibility Specialist (CPACC) • AWS Solutions Architect Associate.',
                    },
                  ].map((edu, i) => (
                    <div key={i} style={{ borderLeft: '2px solid var(--ts-color-accent)', paddingLeft: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 800, fontSize: '13px' }}>{edu.degree}</span>
                        <span style={{ fontSize: '10px', opacity: 0.6, fontFamily: 'monospace' }}>{edu.year}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ts-color-accent)', fontWeight: 600 }}>{edu.school}</div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8, lineHeight: 1.5 }}>
                        {edu.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact & Inquiries Section */}
            <div
              id="contact"
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: 'var(--ts-space-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ts-space-md)',
              }}
            >
              <div style={{ maxWidth: '600px' }}>
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0' }}>
                  Let's Build Something Exceptional
                </h3>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.8, lineHeight: 1.6 }}>
                  Whether you need a dedicated token architecture sprint, an enterprise design system audit, or are exploring fulltime leadership roles, send a note directly below.
                </p>
              </div>

              {contactSubmitted ? (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--ts-radius-surface, 10px)',
                    backgroundColor: '#10b98115',
                    border: '1px solid #10b98140',
                    color: '#10b981',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  ✓ Thank you! Your inquiry has been delivered directly to Alex's inbox. Expect a response within 24 hours.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}
                >
                  <input
                    type="text"
                    placeholder="Your Name & Company"
                    required
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--ts-color-border)',
                      backgroundColor: 'var(--ts-color-background)',
                      color: 'var(--ts-color-text)',
                      fontSize: '13px',
                    }}
                  />
                  <input
                    type="email"
                    placeholder="your.email@company.com"
                    required
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--ts-color-border)',
                      backgroundColor: 'var(--ts-color-background)',
                      color: 'var(--ts-color-text)',
                      fontSize: '13px',
                    }}
                  />
                  <div style={{ gridColumn: '1 / -1' }}>
                    <textarea
                      placeholder="Brief description of your project scope or opportunity..."
                      rows={3}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--ts-color-border)',
                        backgroundColor: 'var(--ts-color-background)',
                        color: 'var(--ts-color-text)',
                        fontSize: '13px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      width: 'fit-content',
                    }}
                  >
                    Send Direct Message
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ==============================================================
            2. TIMELINE EDITORIAL LAYOUT
            ============================================================== */}
        {layout === 'timeline-editorial' && (
          <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xl)' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                alt="Alex Rivers"
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--ts-color-primary)' }}
              />
              <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: 0 }}>
                Alex Rivers
              </h1>
              <p style={{ margin: 0, fontSize: '15px', opacity: 0.8, maxWidth: '520px' }}>
                Staff Design Technologist specializing in declarative UI systems, mathematical token compilers, and scalable frontend engineering.
              </p>
            </div>

            {/* Narrative Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--ts-color-primary)', borderBottom: '1px solid var(--ts-color-border)', paddingBottom: '6px' }}>
                Chronological Career Timeline
              </h3>
              {[
                { year: '2024 — Present', title: 'Staff Design Technologist', org: 'ApexDesign Labs', text: 'Architected automated token compiler eliminating CSS drift across 14 enterprise repositories.' },
                { year: '2021 — 2024', title: 'Lead Frontend Systems Engineer', org: 'Solstice Networks', text: 'Engineered realtime telemetry dashboard rendering 120,000 WebSocket nodes at 60fps.' },
                { year: '2018 — 2021', title: 'Senior UI/UX Engineer', org: 'Helios Mobile', text: 'Built multi-tenant fintech component library certified for WCAG 2.1 AAA accessibility.' },
                { year: '2016 — 2018', title: 'M.S. in Computer Science', org: 'Stanford University', text: 'Human-Computer Interaction, declarative compilers, and graphic visual systems.' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '130px', flexShrink: 0, fontFamily: 'monospace', fontSize: '12px', opacity: 0.6 }}>
                    {item.year}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '14px' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ts-color-primary)', fontWeight: 600 }}>{item.org}</div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.8, lineHeight: 1.5 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==============================================================
            3. SPLIT SHOWCASE LAYOUT
            ============================================================== */}
        {layout === 'split-showcase' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--ts-space-xl)' }}>
            {/* Left Sticky Profile Rail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)', alignSelf: 'start' }}>
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: 'var(--ts-space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ts-space-md)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80"
                  alt="Alex Rivers"
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--ts-color-primary)' }}
                />
                <div>
                  <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '24px', fontWeight: 900, margin: 0 }}>
                    Alex Rivers
                  </h1>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 600, color: 'var(--ts-color-primary)' }}>
                    Staff Design Technologist
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.8, lineHeight: 1.6 }}>
                  Designing declarative systems and compilers that bridge Figma design tokens with production code.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', borderTop: '1px solid var(--ts-color-border)', paddingTop: '12px' }}>
                  <div>📍 San Francisco, CA (Remote)</div>
                  <div>💼 Available for Select Consulting</div>
                  <div>🌐 alexrivers.design • github.com/alexrivers</div>
                </div>
              </div>
            </div>

            {/* Right Scrollable Content Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
              {/* Featured Work */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>Selected Projects</h3>
                {projects.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      backgroundColor: 'var(--ts-color-surface)',
                      border: '1px solid var(--ts-color-border)',
                      borderRadius: 'var(--ts-radius-surface, 12px)',
                      padding: '16px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    <img src={p.coverImage} alt={p.title} style={{ width: '90px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '14px' }}>{p.title}</div>
                      <div style={{ fontSize: '12px', opacity: 0.75, margin: '2px 0' }}>{p.summary}</div>
                      <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>{p.metric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            4. COMPACT TERMINAL DEVELOPER CONSOLE LAYOUT
            ============================================================== */}
        {layout === 'compact-terminal' && (
          <div
            style={{
              backgroundColor: '#0f172a',
              color: '#38bdf8',
              fontFamily: 'monospace',
              borderRadius: 'var(--ts-radius-surface, 12px)',
              border: '1px solid #1e293b',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Terminal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>
              <span style={{ fontSize: '12px', opacity: 0.6 }}>alex@macbook-pro: ~/portfolio</span>
              <span style={{ fontSize: '11px', color: '#10b981' }}>● Online</span>
            </div>

            {/* Quick Command Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['cat resume.json', 'cat skills.txt', 'cat projects.md', 'contact --send'].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => setTerminalCommand(cmd)}
                  style={{
                    backgroundColor: terminalCommand === cmd ? '#38bdf8' : '#1e293b',
                    color: terminalCommand === cmd ? '#0f172a' : '#94a3b8',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  $ {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Command Output */}
            <div style={{ backgroundColor: '#020617', padding: '16px', borderRadius: '8px', fontSize: '13px', lineHeight: 1.6, overflowX: 'auto' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>$ {terminalCommand}</div>
              {terminalCommand === 'cat resume.json' && (
                <pre style={{ margin: 0, color: '#f8fafc' }}>
{`{
  "name": "Alex Rivers",
  "role": "Staff Design Technologist",
  "status": "Available for Select Q1 Work",
  "experiences": [
    { "company": "ApexDesign", "role": "Staff Technologist", "years": "2024-Present" },
    { "company": "Solstice Labs", "role": "Lead Architect", "years": "2021-2024" }
  ],
  "education": "M.S. Computer Science (Stanford) • B.S. Software Engineering (UC Berkeley)",
  "languages": ["English (Native)", "Spanish (Fluent)", "TypeScript", "Go", "Python"]
}`}
                </pre>
              )}
              {terminalCommand === 'cat skills.txt' && (
                <pre style={{ margin: 0, color: '#10b981' }}>
{`FRONTEND:  React 19, TypeScript, Next.js, Tailwind CSS, Vite, WebGL
SYSTEMS:   Design Tokens (W3C DTCG), AST Compilers, State Machines
STANDARDS: WCAG 2.1 AAA Accessibility, APCA Contrast Engine`}
                </pre>
              )}
              {terminalCommand === 'cat projects.md' && (
                <pre style={{ margin: 0, color: '#fbbf24' }}>
{`# 1. TastyStyles Token Engine: 0 CSS drift across 14 repos
# 2. SolarPulse Telemetry: 120k live WebSocket nodes @ 60fps
# 3. Helios Mobile Wallet: Biometric fintech security`}
                </pre>
              )}
              {terminalCommand === 'contact --send' && (
                <div style={{ color: '#38bdf8' }}>
                  Ready to connect? Email directly at: alex@rivers.design
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

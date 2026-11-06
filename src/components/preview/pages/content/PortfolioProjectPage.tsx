import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { AppIcon } from '../../../common/AppIcon';
import { MEDIA_CATALOG, type PortfolioProjectItem } from '../../../../config/mediaCatalog';

export const PortfolioProjectPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.portfolioProject ?? 'case-study-narrative';

  const projects = MEDIA_CATALOG.portfolio;
  const [activeId, setActiveId] = useState<string>(projects[0].id);
  const project: PortfolioProjectItem = projects.find((p) => p.id === activeId) || projects[0];

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
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-lg)',
        }}
      >
        {/* Project Switcher Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.6 }}>
              Select Case Study:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--ts-radius-surface, 8px)',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: p.id === activeId ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                    color: p.id === activeId ? primaryTextColor : 'var(--ts-color-text)',
                    border: '1px solid var(--ts-color-border)',
                  }}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href="#demo"
              onClick={(e) => e.preventDefault()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ts-color-primary)',
                textDecoration: 'none',
              }}
            >
              <AppIcon name="externalLink" size={13} />
              <span>Live Deployment</span>
            </a>
            <a
              href="#repo"
              onClick={(e) => e.preventDefault()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ts-color-text)',
                opacity: 0.75,
                textDecoration: 'none',
              }}
            >
              <AppIcon name="code" size={13} />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>

        {/* 1. CASE STUDY NARRATIVE (DEFAULT) */}
        {layout === 'case-study-narrative' && (
          <article style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            {/* Header / Hero */}
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
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span
                  style={{
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.category}
                </span>
                <span style={{ fontSize: '12px', opacity: 0.6 }}>2025–2026 Production System</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--ts-font-heading)',
                  fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.5)',
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                {project.title} — {project.client}
              </h1>

              <p style={{ margin: 0, fontSize: '15px', opacity: 0.85, lineHeight: 1.6, maxWidth: '780px' }}>
                {project.summary}
              </p>

              {/* Meta Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 'var(--ts-space-sm)',
                  paddingTop: 'var(--ts-space-md)',
                  borderTop: '1px solid var(--ts-color-border)',
                }}
              >
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>My Role</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>Lead Architect & Fullstack</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Timeline</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>3 Months to General Availability</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Stack</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{project.tags.join(', ')}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Key Impact</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>{project.metric}</div>
                </div>
              </div>
            </div>

            {/* Visual Hero Mockup Image */}
            <div
              style={{
                borderRadius: 'var(--ts-radius-surface, 16px)',
                overflow: 'hidden',
                border: '1px solid var(--ts-color-border)',
                boxShadow: 'var(--ts-shadow)',
                maxHeight: '440px',
                position: 'relative',
              }}
            >
              <img
                src={project.coverImage}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px 20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              >
                Figure 1.0 — High-fidelity production telemetry interface running in production cluster.
              </div>
            </div>

            {/* Challenge & Solution 2-Column Split */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--ts-space-md)' }}>
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 12px)',
                  padding: 'var(--ts-space-lg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                  <AppIcon name="alertTriangle" size={15} />
                  <span>The Challenge</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, opacity: 0.85 }}>
                  Design tokens diverged significantly across web, iOS, and Android clients. A single color change required 14 pull requests across disparate repositories, leading to inconsistent branding, broken WCAG contrast compliance, and wasted engineering hours.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 12px)',
                  padding: 'var(--ts-space-lg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                  <AppIcon name="checkCircle" size={15} />
                  <span>The Solution</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, opacity: 0.85 }}>
                  Engineered an automated single-source-of-truth compiler that strictly serializes W3C DTCG tokens directly to Tailwind, CSS custom properties, and native Android/iOS constants with zero drift and sub-second build times.
                </p>
              </div>
            </div>

            {/* Metrics Impact Section */}
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: 'var(--ts-space-lg)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '16px', fontWeight: 800, margin: '0 0 var(--ts-space-sm) 0' }}>
                Quantifiable Engineering Results
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--ts-space-sm)' }}>
                {[
                  { metric: '0 CSS Drift', label: '100% token mathematical equivalence' },
                  { metric: '< 45ms', label: 'Incremental build time on change' },
                  { metric: '21.0:1', label: 'WCAG AAA contrast verified across all states' },
                  { metric: '99.4%', label: 'Test coverage across compiler rules' },
                ].map((m, idx) => (
                  <div key={idx} style={{ padding: 'var(--ts-space-sm)', backgroundColor: 'var(--ts-color-background)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius-surface, 8px)' }}>
                    <div style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '18px', fontWeight: 900, color: 'var(--ts-color-primary)' }}>
                      {m.metric}
                    </div>
                    <div style={{ fontSize: '11px', opacity: 0.75, marginTop: '2px' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}

        {/* 2. TECHNICAL BREAKDOWN LAYOUT */}
        {layout === 'technical-breakdown' && (
          <article style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <div style={{ padding: 'var(--ts-space-md)', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius-surface, 12px)' }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--ts-color-accent)' }}>
                Architecture Blueprint
              </span>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '20px', fontWeight: 800, margin: '4px 0 8px 0' }}>
                {project.title} Architectural Pipeline
              </h2>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  backgroundColor: 'var(--ts-color-background)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: '8px',
                  padding: '16px',
                  overflowX: 'auto',
                  lineHeight: 1.5,
                }}
              >
                {`[DesignState JSON (Zod Validated)]
      │
      ├──> tokenModel.ts (Canonical CSS Vars & Dual Radius Isolation)
      │       ├──> Live Browser DOM (--ts-*)
      │       └──> Export: CSS Custom Properties
      │
      ├──> exportUtils.ts
      │       ├──> Tailwind Config Theme Generator
      │       ├──> W3C DTCG Format (Design Tokens Community Group)
      │       └──> Kotlin / Swift Native Constants
      │
      └──> compileProjectBrief.ts
              └──> PROJECT-BRIEF.md (Autonomous LLM Ground Truth Contract)`}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--ts-space-md)' }}>
              <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius-surface, 12px)', padding: 'var(--ts-space-md)' }}>
                <h4 style={{ fontWeight: 700, margin: '0 0 6px 0', fontSize: '13px' }}>Latency & Memory Optimization</h4>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: 1.5 }}>
                  Utilized in-memory buffer compression via pure TypeScript without external Node/C++ binary dependencies, enabling 100% web worker sandboxing and instantaneous client-side ZIP bundle packaging.
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius-surface, 12px)', padding: 'var(--ts-space-md)' }}>
                <h4 style={{ fontWeight: 700, margin: '0 0 6px 0', fontSize: '13px' }}>Dual-Radius Isolation</h4>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: 1.5 }}>
                  Strict decoupling of outer surface radius (`--ts-radius-surface`) and interactive button radius (`--ts-radius-interactive`) prevents cascading CSS distortion across complex nested component trees.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* 3. MINIMAL ARTICLE LAYOUT */}
        {layout === 'minimal-article' && (
          <article
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
              lineHeight: 1.7,
              fontSize: '15px',
            }}
          >
            <div style={{ fontSize: '12px', opacity: 0.6 }}>Technical Retrospective • 6 min read</div>
            <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '28px', fontWeight: 900, margin: 0 }}>
              The Philosophy Behind {project.title}
            </h1>
            <p style={{ margin: 0, opacity: 0.9 }}>
              When building modern user interfaces at scale, the primary failure mode is rarely the inability to write CSS. It is the steady accumulation of imperceptible drift between what designers envision and what autonomous code produces.
            </p>
            <blockquote
              style={{
                borderLeft: '4px solid var(--ts-color-primary)',
                margin: '12px 0',
                paddingLeft: '16px',
                fontStyle: 'italic',
                opacity: 0.9,
              }}
            >
              "Consistency isn't a discipline problem; it is a compiler problem. If your design system requires manual synchronization, it has already drifted."
            </blockquote>
            <p style={{ margin: 0, opacity: 0.9 }}>
              By modeling all styles declaratively as pure mathematical tokens and enforcing zero-drift validation through automated CI quality gates, we eliminated design review bottlenecks completely.
            </p>
          </article>
        )}
      </main>
    </div>
  );
};

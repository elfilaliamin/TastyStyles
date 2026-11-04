import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { MediaHeroBlock } from '../../../blocks/MediaHeroBlock';
import { DiscussionReviewBlock } from '../../../blocks/DiscussionReviewBlock';
import { AppIcon } from '../../../common/AppIcon';
import { MEDIA_CATALOG, type EditorialArticleItem } from '../../../../config/mediaCatalog';

export const EditorialPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.editorial ?? 'masonry-frontpage';

  const articles: EditorialArticleItem[] = MEDIA_CATALOG.editorial;

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
          padding: 'var(--ts-space-lg)',
          maxWidth: '1080px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-xl)',
        }}
      >
        {/* Editorial Hero Banner */}
        <MediaHeroBlock
          variant="editorial-banner"
          badge="Longform Investigation · Issue #48"
          title="The Evolution of Autonomous Design Systems in Production"
          subtitle="How machine-readable design token contracts, deterministic APCA calculations, and semantic primitives completely eradicate frontend hallucination."
        />

        {/* 1. MASONRY FRONTPAGE LAYOUT */}
        {layout === 'masonry-frontpage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
                Frontpage Dispatches & Essays
              </span>
              <span style={{ fontSize: '11px', opacity: 0.7 }}>Curated by the Editorial Board</span>
            </div>

            {/* Masonry Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'var(--ts-space-md)',
              }}
            >
              {articles.map((art) => (
                <article
                  key={art.id}
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
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 700,
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {art.category}
                    </span>
                  </div>

                  <div style={{ padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '17px', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                      {art.title}
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, opacity: 0.8, flex: 1 }}>
                      {art.excerpt}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--ts-color-border)', paddingTop: '10px', marginTop: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                          src={art.authorAvatar}
                          alt={art.author}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '11px' }}>{art.author}</div>
                          <div style={{ fontSize: '10px', opacity: 0.6 }}>{art.authorRole}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', opacity: 0.7, fontFamily: 'monospace' }}>
                        {art.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 2. FOCUSED PROSE TOC LAYOUT */}
        {layout === 'focused-prose-toc' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 'var(--ts-space-xl)', alignItems: 'flex-start' }}>
            {/* Sticky TOC on Left */}
            <aside
              style={{
                position: 'sticky',
                top: '20px',
                padding: 'var(--ts-space-md)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 12px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.6 }}>
                Table of Contents
              </div>
              <a href="#bottlenecks" style={{ color: 'var(--ts-color-primary)', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                1. Semantic Token Ambiguity
              </a>
              <a href="#perceptual-math" style={{ color: 'var(--ts-color-text)', fontSize: '12px', opacity: 0.8, textDecoration: 'none' }}>
                2. APCA Contrast Realities
              </a>
              <a href="#universal-molecules" style={{ color: 'var(--ts-color-text)', fontSize: '12px', opacity: 0.8, textDecoration: 'none' }}>
                3. Composable Domain Shells
              </a>
              <a href="#agent-handoff" style={{ color: 'var(--ts-color-text)', fontSize: '12px', opacity: 0.8, textDecoration: 'none' }}>
                4. Automated Agent Guardrails
              </a>
            </aside>

            {/* Focused Reader Article */}
            <article style={{ gridColumn: 'span 2', fontSize: '15px', lineHeight: 1.8, opacity: 0.9 }}>
              <h2 id="bottlenecks" style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '20px', fontWeight: 800, marginTop: 0 }}>
                1. The Silent Crisis of Semantic Drift
              </h2>
              <p>
                When autonomous engineering agents interact with design codebases, the single largest bottleneck has never been syntax—it has always been semantic ambiguity. A conventional Figma frame or loose CSS sheet leaves critical edge cases unrepresented.
              </p>

              <blockquote
                style={{
                  borderLeft: '4px solid var(--ts-color-primary)',
                  margin: '24px 0',
                  paddingLeft: '16px',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: '17px',
                  color: 'var(--ts-color-text)',
                  opacity: 0.95,
                }}
              >
                "A design system is not a visual gallery. It is a mathematical contract between token primitives, contextual state machines, and autonomous coding runtimes."
              </blockquote>

              <h2 id="perceptual-math" style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '20px', fontWeight: 800 }}>
                2. Why APCA Trumps WCAG 2.1 in Modern Token Systems
              </h2>
              <p>
                By introducing universal composable molecules—from transactional checkout drawers to calendar availability matrices—TastyStyles enables a zero-drift guarantee where every frontend archetype is grounded in canonical token reality.
              </p>
            </article>
          </div>
        )}

        {/* 3. PAYWALL METER OVERLAY LAYOUT */}
        {layout === 'paywall-meter-overlay' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)', position: 'relative' }}>
            <article style={{ fontSize: '15px', lineHeight: 1.8, maxWidth: '720px', margin: '0 auto', opacity: 0.88 }}>
              <p>
                When autonomous engineering agents interact with design codebases, the single largest bottleneck has never been syntax—it has always been semantic ambiguity. A conventional Figma frame or loose CSS sheet leaves critical edge cases unrepresented.
              </p>
            </article>

            {/* Paywall Gate Sheet */}
            <div
              style={{
                padding: 'var(--ts-space-xl)',
                backgroundColor: 'var(--ts-color-surface)',
                border: '2px solid var(--ts-color-primary)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.25)',
                textAlign: 'center',
                maxWidth: '580px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <AppIcon name="lock" size={28} style={{ color: 'var(--ts-color-primary)' }} />
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ts-color-primary)' }}>
                Free Article Limit Reached (3 / 3)
              </div>
              <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '18px', margin: 0 }}>
                Unlock Unlimited In-Depth Architectural Dispatches
              </h3>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.75, lineHeight: 1.5 }}>
                Support independent, high-rigor engineering journalism. Subscriptions fund deep investigations into agentic design runtimes.
              </p>
              <button
                type="button"
                style={{
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  border: 'none',
                  borderRadius: 'var(--ts-radius)',
                  padding: '10px 24px',
                  fontWeight: 700,
                  fontSize: '13px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Join for $5 / month
              </button>
            </div>
          </div>
        )}

        {/* Reader Comments */}
        <DiscussionReviewBlock
          mode="chat"
          title="Reader Discussion & Debate"
          totalCount={48}
        />
      </main>
    </div>
  );
};

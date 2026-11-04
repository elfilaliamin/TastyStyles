import React from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { MediaHeroBlock } from '../../../blocks/MediaHeroBlock';
import { DiscussionReviewBlock } from '../../../blocks/DiscussionReviewBlock';
import { AppIcon } from '../../../common/AppIcon';

export const EditorialPage: React.FC = () => {
  const { state } = useDesign();
  const layout = state.pageLayouts?.editorial ?? 'masonry-frontpage';

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

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '960px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xl)' }}>
        {/* Editorial Hero Banner */}
        <MediaHeroBlock
          variant="editorial-banner"
          badge="Longform Investigation · Issue #48"
          title="The Evolution of Autonomous Design Systems in Production"
          subtitle="How machine-readable design token contracts, deterministic APCA calculations, and semantic primitives completely eradicate frontend hallucination."
        />

        {/* Layout Switch: Masonry Frontpage vs Focused Prose TOC vs Paywall Meter */}
        {layout === 'focused-prose-toc' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 'var(--ts-space-xl)', alignItems: 'flex-start' }}>
            {/* Sticky TOC on Left */}
            <aside
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: 'var(--ts-space-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '12px',
                boxShadow: 'var(--ts-shadow)',
              }}
              className="hidden md:flex"
            >
              <div style={{ fontWeight: 800, textTransform: 'uppercase', opacity: 0.6, fontSize: '11px' }}>Table of Contents</div>
              <div style={{ color: 'var(--ts-color-primary)', fontWeight: 700 }}>1. The Semantic Ambiguity Crisis</div>
              <div style={{ opacity: 0.75 }}>2. Deterministic Contracts & Runtimes</div>
              <div style={{ opacity: 0.75 }}>3. Elimination of CSS Cascades</div>
              <div style={{ opacity: 0.75 }}>4. Production Verification Metrics</div>
            </aside>

            {/* Main Reading Column */}
            <article style={{ flex: 1, fontSize: '15px', lineHeight: 1.8, opacity: 0.88 }}>
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
              <p>
                By introducing universal composable molecules—from transactional checkout drawers to calendar availability matrices—TastyStyles enables a zero-drift guarantee where every frontend archetype is grounded in canonical token reality.
              </p>
            </article>
          </div>
        ) : layout === 'paywall-meter-overlay' ? (
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
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--ts-radius)',
                  padding: '8px 24px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Join for $5 / month
              </button>
            </div>
          </div>
        ) : (
          /* Masonry Frontpage Default */
          <article style={{ fontSize: '15px', lineHeight: 1.8, maxWidth: '720px', margin: '0 auto', opacity: 0.88 }}>
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

            <p>
              By introducing universal composable molecules—from transactional checkout drawers to calendar availability matrices—TastyStyles enables a zero-drift guarantee where every frontend archetype is grounded in canonical token reality.
            </p>
          </article>
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

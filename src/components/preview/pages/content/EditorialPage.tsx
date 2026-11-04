import React from 'react';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { MediaHeroBlock } from '../../../blocks/MediaHeroBlock';
import { DiscussionReviewBlock } from '../../../blocks/DiscussionReviewBlock';

export const EditorialPage: React.FC = () => {

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

        {/* Prose Reading Canvas */}
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

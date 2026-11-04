import React from 'react';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { MediaHeroBlock } from '../../../blocks/MediaHeroBlock';
import { DiscussionReviewBlock } from '../../../blocks/DiscussionReviewBlock';

export const StreamingPage: React.FC = () => {

  return (
    <div
      style={{
        backgroundColor: '#05070d',
        color: '#f8fafc',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DynamicNavbar />

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '1240px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
        {/* Cinema Video Canvas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
          {/* Main 70% Video Player */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <MediaHeroBlock
              variant="video-player"
              badge="Live Developer Keynote"
              title="Autonomous Codebase Refactoring with Gemini 2.0 & Claude 3.5"
              subtitle="Watch autonomous agents navigate thousands of token dependencies and resolve regressions in real time."
              duration="1:24:00"
            />
          </div>

          {/* Right 30% Live Chat Stream */}
          <div>
            <DiscussionReviewBlock
              mode="chat"
              title="Live Stream Interactive Chat"
              totalCount={1420}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

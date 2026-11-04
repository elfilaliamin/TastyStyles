import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { DiscussionReviewBlock } from '../../../blocks/DiscussionReviewBlock';
import { AppIcon } from '../../../common/AppIcon';

export const CommunityForumPage: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const [activeChannel, setActiveChannel] = useState('general');

  const channels = [
    { id: 'general', name: 'general-discussion', count: 420 },
    { id: 'tokens', name: 'design-tokens-dtcg', count: 184 },
    { id: 'showcase', name: 'agent-builds', count: 96 },
    { id: 'qa', name: 'troubleshooting', count: 312 },
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

      <main style={{ padding: 'var(--ts-space-lg)', maxWidth: '1160px', width: '100%', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
        {/* Forum Header Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.15)', fontWeight: 800, margin: 0 }}>
              Developer Community & Token Forum
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.7 }}>
              Technical discussions, implementation solutions, and autonomous agent patterns.
            </p>
          </div>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: '6px 14px',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AppIcon name="plus" size={14} />
            <span>Create Discussion</span>
          </button>
        </div>

        {/* 3-Column / Main Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 'var(--ts-space-lg)', alignItems: 'flex-start' }}>
          {/* Left Rail: Channels */}
          <aside
            style={{
              padding: 'var(--ts-space-md)',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>
              Channels
            </div>
            {channels.map((ch) => {
              const isSelected = activeChannel === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveChannel(ch.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--ts-radius)',
                    border: 'none',
                    backgroundColor: isSelected ? 'var(--ts-color-primary)' : 'transparent',
                    color: isSelected ? primaryTextColor : 'var(--ts-color-text)',
                    fontWeight: isSelected ? 800 : 500,
                    fontSize: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span># {ch.name}</span>
                  <span style={{ fontSize: '10px', opacity: 0.7 }}>{ch.count}</span>
                </button>
              );
            })}
          </aside>

          {/* Center Column: Questions & Threads */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            <DiscussionReviewBlock
              mode="qa"
              title="Active Solved Threads (#general)"
              totalCount={420}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

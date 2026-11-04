import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { DiscussionReviewBlock } from '../../../blocks/DiscussionReviewBlock';
import { AppIcon } from '../../../common/AppIcon';

interface ThreadItem {
  id: string;
  title: string;
  category: string;
  author: string;
  avatar: string;
  votes: number;
  replies: number;
  views: number;
  timeAgo: string;
  isSolved: boolean;
  acceptedSnippet?: string;
  tags: string[];
}

export const CommunityForumPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.forum ?? 'three-column-reddit';

  const [activeChannel, setActiveChannel] = useState('general');
  const [filterSolved, setFilterSolved] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [selectedThreadId, setSelectedThreadId] = useState<string>('t1');

  const channels = [
    { id: 'general', name: 'general-discussion', count: 420 },
    { id: 'tokens', name: 'design-tokens-dtcg', count: 184 },
    { id: 'showcase', name: 'agent-builds', count: 96 },
    { id: 'qa', name: 'troubleshooting', count: 312 },
  ];

  const threads: ThreadItem[] = [
    {
      id: 't1',
      title: 'How to automate WCAG APCA contrast ratio enforcement with DTCG tokens?',
      category: 'design-tokens-dtcg',
      author: 'alex.dev',
      avatar: 'AD',
      votes: 48,
      replies: 14,
      views: 1240,
      timeAgo: '2h ago',
      isSolved: true,
      acceptedSnippet: 'export const tokenContrastCheck = (foreground: string, background: string) => {\n  return calcAPCA(foreground, background) >= 60;\n};',
      tags: ['wcag', 'apca', 'tokens'],
    },
    {
      id: 't2',
      title: 'Vite build error when importing dynamic Lucide icons across multiple themes',
      category: 'troubleshooting',
      author: 'sarah_k',
      avatar: 'SK',
      votes: 31,
      replies: 9,
      views: 890,
      timeAgo: '4h ago',
      isSolved: true,
      acceptedSnippet: 'import { AppIcon } from "./common/AppIcon";\n// Use static mapping to prevent dynamic glob import overhead',
      tags: ['vite', 'lucide', 'react'],
    },
    {
      id: 't3',
      title: 'RFC: Multi-brand design system inheritance with CSS custom property overrides',
      category: 'general-discussion',
      author: 'marcus_ds',
      avatar: 'MD',
      votes: 22,
      replies: 6,
      views: 640,
      timeAgo: '7h ago',
      isSolved: false,
      tags: ['rfc', 'css-vars', 'multi-brand'],
    },
    {
      id: 't4',
      title: 'Showcase: Autonomous agent UI compiler generating full SaaS layouts in 3s',
      category: 'agent-builds',
      author: 'elena_ai',
      avatar: 'EA',
      votes: 95,
      replies: 28,
      views: 3120,
      timeAgo: '1d ago',
      isSolved: false,
      tags: ['showcase', 'gemini-agent', 'codegen'],
    },
  ];

  const filteredThreads = threads.filter((t) => {
    if (filterSolved === 'solved') return t.isSolved;
    if (filterSolved === 'unsolved') return !t.isSolved;
    return true;
  });

  const selectedThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

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
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-md)',
        }}
      >
        {/* Forum Header Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
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
              padding: '8px 16px',
              fontWeight: 700,
              fontSize: '13px',
              minHeight: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AppIcon name="plus" size={15} />
            <span>Create Discussion</span>
          </button>
        </div>

        {/* 1. THREE-COLUMN REDDIT LAYOUT */}
        {layout === 'three-column-reddit' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 'var(--ts-space-md)',
              alignItems: 'flex-start',
            }}
          >
            {/* Left Rail: Channels & Rules */}
            <aside
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ts-space-sm)',
              }}
            >
              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
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
                        minHeight: '40px',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span># {ch.name}</span>
                      <span style={{ fontSize: '10px', opacity: 0.7 }}>{ch.count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Guidelines Card */}
              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  fontSize: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', opacity: 0.7 }}>Posting Rules</div>
                <div style={{ opacity: 0.8 }}>1. Include reproduction code for bug reports.</div>
                <div style={{ opacity: 0.8 }}>2. Respect token naming specifications.</div>
                <div style={{ opacity: 0.8 }}>3. Mark accepted solutions once verified.</div>
              </div>
            </aside>

            {/* Middle Column: Threads Feed */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
              {filteredThreads.map((t) => (
                <div
                  key={t.id}
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius)',
                    padding: 'var(--ts-space-md)',
                    display: 'flex',
                    gap: 'var(--ts-space-md)',
                    alignItems: 'flex-start',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  {/* Upvote Pill */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      backgroundColor: 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                      borderRadius: 'var(--ts-radius)',
                      padding: '6px 8px',
                      minWidth: '40px',
                    }}
                  >
                    <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: 'inherit' }}>
                      <AppIcon name="chevron-up" size={16} />
                    </button>
                    <span style={{ fontSize: '12px', fontWeight: 800 }}>{t.votes}</span>
                    <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: 'inherit' }}>
                      <AppIcon name="chevron-down" size={16} />
                    </button>
                  </div>

                  {/* Thread Content */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '11px', opacity: 0.7 }}>
                      <span style={{ fontWeight: 700 }}>#{t.category}</span>
                      <span>·</span>
                      <span>Posted by {t.author} {t.timeAgo}</span>
                      {t.isSolved && (
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            color: 'var(--color-success, #16a34a)',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <AppIcon name="check" size={10} />
                          Solved
                        </span>
                      )}
                    </div>

                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, fontFamily: 'var(--ts-font-heading)' }}>
                      {t.title}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '10px',
                            padding: '2px 6px',
                            backgroundColor: 'var(--ts-color-background)',
                            borderRadius: '4px',
                            border: '1px solid var(--ts-color-border)',
                            opacity: 0.8,
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                      <span style={{ fontSize: '11px', opacity: 0.7, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AppIcon name="message-square" size={12} />
                        {t.replies} comments
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Rail: Community Stats */}
            <aside
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ts-space-sm)',
              }}
            >
              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '13px' }}>About TastyStyles Hub</div>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: 1.5 }}>
                  The worldwide community for frontend engineers, autonomous agents, and design system architects.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px', paddingTop: '8px', borderTop: '1px solid var(--ts-color-border)' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 800 }}>18.4k</div>
                    <div style={{ fontSize: '10px', opacity: 0.6 }}>Members</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-success, #16a34a)' }}>412</div>
                    <div style={{ fontSize: '10px', opacity: 0.6 }}>Online Now</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* 2. SPLIT QA SOLVED LAYOUT */}
        {layout === 'split-qa-solved' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setFilterSolved('all')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '1px solid var(--ts-color-border)',
                  backgroundColor: filterSolved === 'all' ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                  color: filterSolved === 'all' ? primaryTextColor : 'var(--ts-color-text)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: '36px',
                }}
              >
                All Questions ({threads.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterSolved('solved')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '1px solid var(--ts-color-border)',
                  backgroundColor: filterSolved === 'solved' ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                  color: filterSolved === 'solved' ? primaryTextColor : 'var(--ts-color-text)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: '36px',
                }}
              >
                Answered & Solved ({threads.filter((t) => t.isSolved).length})
              </button>
              <button
                type="button"
                onClick={() => setFilterSolved('unsolved')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '1px solid var(--ts-color-border)',
                  backgroundColor: filterSolved === 'unsolved' ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                  color: filterSolved === 'unsolved' ? primaryTextColor : 'var(--ts-color-text)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: '36px',
                }}
              >
                Needs Answer ({threads.filter((t) => !t.isSolved).length})
              </button>
            </div>

            {/* Split QA Layout: Left question list, right expanded verified solution */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'var(--ts-space-md)',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
                {filteredThreads.map((t) => {
                  const isSelected = t.id === selectedThread.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedThreadId(t.id)}
                      style={{
                        padding: 'var(--ts-space-md)',
                        backgroundColor: isSelected ? 'var(--ts-color-surface)' : 'transparent',
                        border: isSelected ? '2px solid var(--ts-color-primary)' : '1px solid var(--ts-color-border)',
                        borderRadius: 'var(--ts-radius)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.6 }}>#{t.category}</span>
                        {t.isSolved ? (
                          <span style={{ fontSize: '11px', color: 'var(--color-success, #16a34a)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <AppIcon name="check-circle" size={13} />
                            Accepted Solution
                          </span>
                        ) : (
                          <span style={{ fontSize: '11px', opacity: 0.5 }}>Unresolved</span>
                        )}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1.4 }}>{t.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.7 }}>
                        <span>{t.votes} votes · {t.replies} answers</span>
                        <span>{t.timeAgo}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verified Solution Side Panel */}
              <div
                style={{
                  padding: 'var(--ts-space-lg)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ts-space-md)',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      backgroundColor: selectedThread.isSolved ? 'rgba(34, 197, 94, 0.15)' : 'var(--ts-color-background)',
                      color: selectedThread.isSolved ? 'var(--color-success, #16a34a)' : 'inherit',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    {selectedThread.isSolved ? 'VERIFIED ANSWER' : 'QUESTION DETAILS'}
                  </span>
                  <span style={{ fontSize: '12px', opacity: 0.6, marginLeft: 'auto' }}>
                    Asked by {selectedThread.author}
                  </span>
                </div>

                <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '17px', margin: 0, fontWeight: 800 }}>
                  {selectedThread.title}
                </h2>

                {selectedThread.acceptedSnippet ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, opacity: 0.8 }}>Accepted Code Implementation:</div>
                    <pre
                      style={{
                        padding: 'var(--ts-space-md)',
                        backgroundColor: 'var(--ts-color-background)',
                        border: '1px solid var(--ts-color-border)',
                        borderRadius: 'var(--ts-radius)',
                        fontSize: '12px',
                        overflowX: 'auto',
                        fontFamily: 'monospace',
                        color: 'var(--ts-color-primary)',
                        margin: 0,
                      }}
                    >
                      {selectedThread.acceptedSnippet}
                    </pre>
                  </div>
                ) : (
                  <div style={{ padding: 'var(--ts-space-lg)', textAlign: 'center', opacity: 0.6, fontSize: '13px' }}>
                    No accepted answer yet. Contribute a solution below!
                  </div>
                )}

                <DiscussionReviewBlock
                  mode="qa"
                  title="Discussion Replies"
                  totalCount={selectedThread.replies}
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. COMPACT THREAD TABLE LAYOUT */}
        {layout === 'compact-thread-table' && (
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              overflow: 'hidden',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--ts-color-background)', borderBottom: '1px solid var(--ts-color-border)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 700, width: '50%' }}>Topic</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700 }}>Category</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'center' }}>Replies</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'center' }}>Views</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {threads.map((t, i) => (
                    <tr
                      key={t.id}
                      style={{
                        borderBottom: i < threads.length - 1 ? '1px solid var(--ts-color-border)' : 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {t.isSolved && (
                            <span style={{ color: 'var(--color-success, #16a34a)', display: 'inline-flex' }}>
                              <AppIcon name="check-circle" size={15} />
                            </span>
                          )}
                          <div style={{ fontWeight: 600 }}>{t.title}</div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--ts-color-background)',
                            border: '1px solid var(--ts-color-border)',
                            fontSize: '11px',
                            fontWeight: 600,
                          }}
                        >
                          {t.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700 }}>{t.replies}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', opacity: 0.7 }}>{t.views}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', opacity: 0.7, fontSize: '12px' }}>{t.timeAgo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

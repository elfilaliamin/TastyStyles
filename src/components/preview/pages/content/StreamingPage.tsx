import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { MediaHeroBlock } from '../../../blocks/MediaHeroBlock';
import { DiscussionReviewBlock } from '../../../blocks/DiscussionReviewBlock';
import { AppIcon } from '../../../common/AppIcon';

export const StreamingPage: React.FC = () => {
  const { activeColors, state } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.streaming ?? 'cinema-theater';

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const episodes = [
    { id: 'ep1', title: 'Ep. 01: Multi-Agent Choreography in Modern IDEs', duration: '48:12', date: 'Yesterday', views: '12.4k' },
    { id: 'ep2', title: 'Ep. 02: Zero-Runtime CSS Token Compilation', duration: '52:40', date: '3 days ago', views: '9.8k' },
    { id: 'ep3', title: 'Ep. 03: APCA vs WCAG 2.1 Contrast Deep Dive', duration: '41:15', date: 'Last week', views: '15.2k' },
    { id: 'ep4', title: 'Ep. 04: Designing for 375px Mobile Viewports', duration: '36:50', date: '2 weeks ago', views: '8.1k' },
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
          padding: 'var(--ts-space-lg)',
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-lg)',
        }}
      >
        {/* 1. CINEMA THEATER LAYOUT */}
        {layout === 'cinema-theater' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            <MediaHeroBlock
              variant="video-player"
              badge="4K Ultra HD · Theater Mode"
              title="Autonomous Codebase Refactoring with Gemini 2.0 & Claude 3.5"
              subtitle="Watch autonomous agents navigate thousands of token dependencies and resolve regressions in real time."
              duration="1:24:00"
            />

            {/* Video Metadata Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                paddingBottom: 'var(--ts-space-md)',
                borderBottom: '1px solid var(--ts-color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                  }}
                >
                  TS
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '15px' }}>TastyStyles Engineering Studio</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>128K subscribers · Premiered 2 hours ago</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    borderRadius: 'var(--ts-radius)',
                    padding: '8px 18px',
                    fontWeight: 700,
                    fontSize: '13px',
                    minHeight: '44px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <AppIcon name="bell" size={15} />
                  <span>Subscribe</span>
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'var(--ts-color-surface)',
                    border: '1px solid var(--ts-color-border)',
                    color: 'var(--ts-color-text)',
                    borderRadius: 'var(--ts-radius)',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 600,
                    minHeight: '44px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <AppIcon name="share-2" size={15} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Catalog Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
              <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '18px', margin: 0, fontWeight: 800 }}>
                More Episodes in this Series
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: 'var(--ts-space-md)',
                }}
              >
                {episodes.map((ep) => (
                  <div
                    key={ep.id}
                    style={{
                      backgroundColor: 'var(--ts-color-surface)',
                      border: '1px solid var(--ts-color-border)',
                      borderRadius: 'var(--ts-radius)',
                      overflow: 'hidden',
                      boxShadow: 'var(--ts-shadow)',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        height: '130px',
                        backgroundColor: '#090d16',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8',
                        position: 'relative',
                      }}
                    >
                      <AppIcon name="play-circle" size={36} />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          color: '#fff',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {ep.duration}
                      </span>
                    </div>
                    <div style={{ padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', lineHeight: 1.4 }}>{ep.title}</div>
                      <div style={{ fontSize: '11px', opacity: 0.6 }}>{ep.views} views · {ep.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. LIVE STREAM SPLIT LAYOUT */}
        {layout === 'live-stream-split' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'var(--ts-space-lg)',
              alignItems: 'flex-start',
            }}
          >
            {/* Main Video Stream & Info */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
              <MediaHeroBlock
                variant="video-player"
                badge="LIVE NOW · 4.2k WATCHING"
                title="Building Production Design Systems Live with Antigravity"
                subtitle="Live interactive demo: configuring design tokens, custom components, and layout responsive trees."
                duration="LIVE"
              />

              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Broadcast Host: @sarah_systems</h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.7 }}>Category: Software & Game Development</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    style={{
                      padding: '6px 14px',
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      border: 'none',
                      borderRadius: 'var(--ts-radius)',
                      fontWeight: 700,
                      fontSize: '12px',
                      minHeight: '40px',
                      cursor: 'pointer',
                    }}
                  >
                    Follow Streamer
                  </button>
                </div>
              </div>
            </div>

            {/* Right Live Chat Stream */}
            <div style={{ width: '100%' }}>
              <DiscussionReviewBlock
                mode="chat"
                title="Live Stream Interactive Chat"
                totalCount={1420}
              />
            </div>
          </div>
        )}

        {/* 3. AUDIO QUEUE RAIL LAYOUT */}
        {layout === 'audio-queue-rail' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-lg)' }}>
            {/* Audio Now Playing Card */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(2, 132, 199, 0.1)',
                    color: 'var(--ts-color-primary)',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  AUDIO STREAMING / PODCAST
                </span>
                <span style={{ fontSize: '12px', opacity: 0.6 }}>Hi-Res Lossless 24-bit / 96kHz</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--ts-color-primary)',
                    color: primaryTextColor,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  <AppIcon name={isPlayingAudio ? 'pause' : 'play'} size={24} />
                </button>
                <div>
                  <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '18px', margin: 0, fontWeight: 800 }}>
                    Track 01: Algorithmic Color Scales and Harmony Engines
                  </h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.7 }}>
                    The TastyStyles Podcast · Episode 42 · Hosted by Dr. Aris Thorne
                  </p>
                </div>
              </div>

              {/* Progress Scrubber */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'var(--ts-color-background)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ width: '42%', height: '100%', backgroundColor: 'var(--ts-color-primary)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.7 }}>
                  <span>18:40</span>
                  <span>44:30</span>
                </div>
              </div>
            </div>

            {/* Split: Notes vs Queue */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'var(--ts-space-md)',
                alignItems: 'flex-start',
              }}
            >
              {/* Show Notes */}
              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '14px', fontWeight: 800, margin: 0 }}>
                  Episode Notes & Key Timestamps
                </h3>
                <p style={{ fontSize: '12px', lineHeight: 1.6, opacity: 0.8, margin: 0 }}>
                  In this episode, we explore mathematical perceptual color uniform spaces (OKLCH, CAM16) and how modern design systems calculate accessible foreground tokens on dynamic backgrounds.
                </p>
                <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                  <div style={{ color: 'var(--ts-color-primary)', fontWeight: 600 }}>04:12 - Why sRGB Euclidean distance fails contrast</div>
                  <div style={{ color: 'var(--ts-color-primary)', fontWeight: 600 }}>16:45 - The APCA algorithm vs WCAG 2.1</div>
                  <div style={{ color: 'var(--ts-color-primary)', fontWeight: 600 }}>31:20 - Automated token pipelines in CI/CD</div>
                </div>
              </div>

              {/* Up Next Queue */}
              <div
                style={{
                  padding: 'var(--ts-space-md)',
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '14px', fontWeight: 800, margin: 0 }}>
                  Up Next in Queue (3 items)
                </h3>
                {episodes.slice(1).map((ep) => (
                  <div
                    key={ep.id}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--ts-radius)',
                      backgroundColor: 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AppIcon name="music" size={14} />
                      <span style={{ fontWeight: 600 }}>{ep.title}</span>
                    </div>
                    <span style={{ opacity: 0.6, fontSize: '11px' }}>{ep.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

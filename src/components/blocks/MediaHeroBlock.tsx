import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import { getBestContrastingColor } from '../../lib/contrast';
import { AppIcon } from '../common/AppIcon';

export interface MediaHeroBlockProps {
  variant?: 'video-player' | 'photo-mosaic' | 'editorial-banner';
  title?: string;
  subtitle?: string;
  badge?: string;
  duration?: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const MediaHeroBlock: React.FC<MediaHeroBlockProps> = ({
  variant = 'video-player',
  title = 'The Evolution of Design Systems in Autonomous AI Run-times',
  subtitle = 'An exhaustive engineering deep-dive into zero-drift token compilation and semantic component contracts.',
  badge = 'Live 4K Stream',
  duration = '42:15',
  isPlaying = false,
  onTogglePlay,
  className = '',
  style = {},
}) => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const [playing, setPlaying] = useState(isPlaying);

  const togglePlay = () => {
    setPlaying(!playing);
    onTogglePlay?.();
  };

  // 1. VIDEO PLAYER VARIANT (Streaming, LMS, Cinema)
  if (variant === 'video-player') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          backgroundColor: '#090d16',
          borderRadius: 'var(--ts-radius-surface, 16px)',
          border: '1px solid var(--ts-color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--ts-shadow)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          ...style,
        }}
      >
        {/* 16:9 Viewport Canvas */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: '440px',
            backgroundColor: '#05070d',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            color: '#f8fafc',
          }}
        >
          {badge && (
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <span>{badge}</span>
            </div>
          )}

          {/* Central Play/Pause Trigger */}
          <button
            type="button"
            onClick={togglePlay}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              transition: 'transform 0.2s ease',
            }}
          >
            {playing ? (
              <span style={{ fontWeight: 800, fontSize: '18px' }}>❚❚</span>
            ) : (
              <span style={{ fontWeight: 800, fontSize: '20px', marginLeft: '3px' }}>▶</span>
            )}
          </button>

          {/* Bottom Player Controls Scrubber */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {/* Timeline Bar */}
            <div style={{ width: '100%', height: '4px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.2)', position: 'relative' }}>
              <div style={{ width: '38%', height: '100%', backgroundColor: 'var(--ts-color-primary)', borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              <span>16:04 / {duration}</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ cursor: 'pointer' }}>1080p HD</span>
                <span style={{ cursor: 'pointer' }}>⛶ Fullscreen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Strip */}
        <div style={{ padding: 'var(--ts-space-md)', backgroundColor: 'var(--ts-color-surface)' }}>
          <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '16px', margin: '0 0 4px 0' }}>
            {title}
          </h3>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.75, lineHeight: 1.5 }}>
            {subtitle}
          </p>
        </div>
      </div>
    );
  }

  // 2. PHOTO MOSAIC VARIANT (Marketplace, Stays, Real Estate)
  if (variant === 'photo-mosaic') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 140px)',
          gap: '8px',
          borderRadius: 'var(--ts-radius-surface, 16px)',
          overflow: 'hidden',
          boxSizing: 'border-box',
          ...style,
        }}
      >
        <div
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
            backgroundColor: 'var(--ts-color-surface)',
            border: '1px solid var(--ts-color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <AppIcon name="palette" size={32} style={{ color: 'var(--ts-color-primary)' }} />
          <span style={{ fontWeight: 700, fontSize: '13px' }}>Primary Showcase Asset</span>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              opacity: 0.7,
            }}
          >
            Gallery Preview {i}
          </div>
        ))}
      </div>
    );
  }

  // 3. EDITORIAL BANNER VARIANT
  return (
    <div
      className={className}
      style={{
        padding: 'var(--ts-space-xl)',
        backgroundColor: 'var(--ts-color-surface)',
        border: '1px solid var(--ts-color-border)',
        borderRadius: 'var(--ts-radius-surface, 16px)',
        boxShadow: 'var(--ts-shadow)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {badge && (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--ts-color-primary)',
            display: 'inline-block',
            marginBottom: '8px',
          }}
        >
          {badge}
        </span>
      )}
      <h2 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.3)', fontWeight: 900, margin: '0 0 10px 0', lineHeight: 1.2 }}>
        {title}
      </h2>
      <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.95)', opacity: 0.8, maxWidth: '680px', lineHeight: 1.6 }}>
        {subtitle}
      </p>
    </div>
  );
};


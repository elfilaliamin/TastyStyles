import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import { getBestContrastingColor } from '../../lib/contrast';
import { AppIcon } from '../common/AppIcon';

export interface DiscussionItem {
  id: string;
  author: string;
  role?: string;
  avatarInitials?: string;
  timestamp: string;
  content: string;
  rating?: number; // 1 to 5 stars
  upvotes?: number;
  isAcceptedAnswer?: boolean;
}

export interface DiscussionReviewBlockProps {
  mode?: 'reviews' | 'qa' | 'chat';
  title?: string;
  items?: DiscussionItem[];
  averageRating?: number;
  totalCount?: number;
  onPost?: (text: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DiscussionReviewBlock: React.FC<DiscussionReviewBlockProps> = ({
  mode = 'reviews',
  title,
  items = [
    {
      id: '1',
      author: 'David Chen',
      role: 'Verified Buyer',
      avatarInitials: 'DC',
      timestamp: '2 days ago',
      content: 'The build quality and dynamic token compilation surpassed my expectations. APCA contrast scores match our compliance standards perfectly.',
      rating: 5,
      upvotes: 42,
      isAcceptedAnswer: true,
    },
    {
      id: '2',
      author: 'Elena Rostova',
      role: 'Staff Engineer',
      avatarInitials: 'ER',
      timestamp: '5 days ago',
      content: 'Great attention to detail in the multi-library vector icon system. Would love to see additional booking time-slot layouts in the next release.',
      rating: 4,
      upvotes: 18,
    },
  ],
  averageRating = 4.8,
  totalCount = 124,
  onPost,
  className = '',
  style = {},
}) => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const [newComment, setNewComment] = useState('');

  const defaultTitle = mode === 'qa'
    ? 'Community Questions & Answers'
    : mode === 'chat'
    ? 'Live Discussion Stream'
    : 'Customer Reviews & Feedback';

  return (
    <div
      className={className}
      style={{
        padding: 'var(--ts-space-lg)',
        backgroundColor: 'var(--ts-color-surface)',
        border: '1px solid var(--ts-color-border)',
        borderRadius: 'var(--ts-radius-surface, 16px)',
        boxShadow: 'var(--ts-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Header with Title and Rating summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ts-color-border)', paddingBottom: '12px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '15px', margin: 0 }}>
            {title ?? defaultTitle}
          </h3>
          <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '2px' }}>
            {totalCount} total contributions
          </div>
        </div>

        {mode === 'reviews' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#f59e0b', display: 'inline-flex' }}>
              <AppIcon name="sparkles" size={16} />
            </span>
            <span style={{ fontFamily: 'var(--ts-font-heading)', fontWeight: 800, fontSize: '16px' }}>
              {averageRating.toFixed(1)}
            </span>
            <span style={{ fontSize: '11px', opacity: 0.6 }}>/ 5.0</span>
          </div>
        )}
      </div>

      {/* Discussion / Reviews Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 'var(--ts-space-md)',
              borderRadius: 'var(--ts-radius-surface, 12px)',
              backgroundColor: item.isAcceptedAnswer ? 'rgba(16, 185, 129, 0.06)' : 'var(--ts-color-background)',
              border: item.isAcceptedAnswer ? '1px solid #10b981' : '1px solid var(--ts-color-border)',
              display: 'flex',
              gap: '12px',
            }}
          >
            {/* Left Upvote or Avatar */}
            {mode === 'qa' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '36px' }}>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ts-color-primary)', padding: '2px' }}
                >
                  ▲
                </button>
                <span style={{ fontWeight: 800, fontSize: '13px' }}>{item.upvotes ?? 0}</span>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, padding: '2px' }}
                >
                  ▼
                </button>
              </div>
            ) : (
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '11px',
                  flexShrink: 0,
                }}
              >
                {item.avatarInitials ?? item.author.substring(0, 2).toUpperCase()}
              </div>
            )}

            {/* Comment Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px' }}>{item.author}</span>
                  {item.role && (
                    <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', opacity: 0.7 }}>
                      {item.role}
                    </span>
                  )}
                  {item.isAcceptedAnswer && (
                    <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <AppIcon name="shieldCheck" size={12} /> Accepted Solution
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '10px', opacity: 0.5 }}>{item.timestamp}</span>
              </div>

              {item.rating && (
                <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', fontSize: '12px', marginBottom: '6px' }}>
                  {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                </div>
              )}

              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, opacity: 0.85 }}>
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Composer */}
      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--ts-color-border)', paddingTop: '12px' }}>
        <input
          type="text"
          placeholder={mode === 'qa' ? 'Add your answer or clarification...' : 'Write your comment or review...'}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--ts-radius-surface, 8px)',
            border: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-background)',
            color: 'var(--ts-color-text)',
            fontSize: '12px',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (newComment.trim()) {
              onPost?.(newComment);
              setNewComment('');
            }
          }}
          style={{
            backgroundColor: 'var(--ts-color-primary)',
            color: primaryTextColor,
            border: 'none',
            borderRadius: 'var(--ts-radius)',
            padding: '8px 16px',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};


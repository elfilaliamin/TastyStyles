import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';

interface ChatThread {
  id: string;
  name: string;
  avatarText: string;
  isAi?: boolean;
  status: 'online' | 'offline' | 'busy';
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

export const ChatInboxPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.chat ?? 'split-pane';

  const [selectedThreadId, setSelectedThreadId] = useState('t-ai');
  const [inputText, setInputText] = useState('');
  const [mobilePane, setMobilePane] = useState<'threads' | 'messages'>('messages');

  const threads: ChatThread[] = [
    {
      id: 't-ai',
      name: 'Agentic Architect AI',
      avatarText: 'AI',
      isAi: true,
      status: 'online',
      lastMessage: 'Verified: All WCAG 2.1 contrast ratios pass AAA.',
      time: '12:40 PM',
      unreadCount: 1,
    },
    {
      id: 't-alex',
      name: 'Alex Rivers',
      avatarText: 'AR',
      status: 'online',
      lastMessage: 'Let’s update the base font size to 16px before the release.',
      time: '11:15 AM',
    },
    {
      id: 't-elena',
      name: 'Elena Rostova',
      avatarText: 'ER',
      status: 'busy',
      lastMessage: 'Docker production build passed in 42s.',
      time: 'Yesterday',
    },
    {
      id: 't-dev',
      name: 'Frontend Core Sync',
      avatarText: 'FC',
      status: 'offline',
      lastMessage: 'Merged PR #89: Viewport fixed height container.',
      time: 'Oct 31',
    },
  ];

  const activeThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const messages = [
    {
      id: 'm1',
      sender: 'Elena Rostova',
      avatar: 'ER',
      isAi: false,
      text: 'Morning team! Are we aligned on locking the design tokens schema for the v2 agent release?',
      time: '10:14 AM',
    },
    {
      id: 'm2',
      sender: 'Alex Rivers',
      avatar: 'AR',
      isAi: false,
      text: 'Yes, just ran contrast checks against all 6 curated style archetypes.',
      time: '10:18 AM',
    },
    {
      id: 'm3',
      sender: 'Agentic Architect AI',
      avatar: 'AI',
      isAi: true,
      text: 'Verified: All WCAG 2.1 contrast ratios pass AAA. The token map includes explicit semantic tokens for status, on-colors, and strict CSS variable bindings.',
      time: '12:40 PM',
      codeSnippet: `/* tokens.css exported from TastyStyles */\n:root {\n  --color-primary: ${activeColors.primary};\n  --color-secondary: ${activeColors.secondary};\n  --color-accent: ${activeColors.accent};\n  --font-heading: ${state.typography.headingFont};\n}`,
    },
  ];

  // VARIANT 2: COMPACT FEED (Focused single-channel conversation stream)
  if (layout === 'compact-feed') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          height: '100%',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: 'var(--ts-shadow)',
          borderRadius: 'var(--ts-radius)',
          overflow: 'hidden',
          border: '1px solid var(--ts-color-border)',
        }}
      >
        {/* Stream Header */}
        <div
          style={{
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            borderBottom: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AppIcon name="hash" size={18} style={{ color: 'var(--ts-color-primary)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.95)' }}>#design-tokens-team</div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.65 }}>Continuous synchronization for autonomous coding agents</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AppIcon name="users" size={14} /> 18 members
            </span>
          </div>
        </div>

        {/* Message stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', gap: 'var(--ts-space-sm)', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: msg.isAi ? 'var(--ts-color-primary)' : 'var(--ts-color-secondary)',
                  color: primaryTextColor,
                  fontSize: 'calc(var(--ts-base-size) * 0.72)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {msg.isAi ? <AppIcon name="bot" size={16} /> : msg.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>{msg.sender}</span>
                  <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.55 }}>{msg.time}</span>
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', lineHeight: 1.45 }}>{msg.text}</div>
                {msg.codeSnippet && (
                  <pre
                    style={{
                      marginTop: '8px',
                      padding: 'var(--ts-space-sm)',
                      backgroundColor: 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                      borderRadius: 'var(--ts-radius)',
                      fontSize: 'calc(var(--ts-base-size) * 0.75)',
                      fontFamily: 'monospace',
                      overflowX: 'auto',
                    }}
                  >
                    <code>{msg.codeSnippet}</code>
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Composer */}
        <div style={{ padding: 'var(--ts-space-xs) var(--ts-space-sm)', borderTop: '1px solid var(--ts-color-border)', backgroundColor: 'var(--ts-color-surface)', display: 'flex', alignItems: 'center', gap: 'var(--ts-space-xs)' }}>
          <input
            type="text"
            placeholder="Send message to #design-tokens-team..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              color: 'var(--ts-color-text)',
              outline: 'none',
            }}
          />
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="send" size={14} />
          </button>
        </div>
      </div>
    );
  }

  // VARIANT 3: MINIMAL BUBBLE (Streamlined conversational bubble stream)
  if (layout === 'minimal-bubble') {
    return (
      <div
        style={{
          backgroundColor: 'var(--ts-color-background)',
          color: 'var(--ts-color-text)',
          fontFamily: 'var(--ts-font-body)',
          width: '100%',
          height: '100%',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '680px',
          margin: '0 auto',
          padding: 'var(--ts-space-md)',
          gap: 'var(--ts-space-md)',
        }}
      >
        <div style={{ textAlign: 'center', opacity: 0.6, fontSize: 'calc(var(--ts-base-size) * 0.75)' }}>
          Today — Chat Session with {activeThread.name}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-sm)' }}>
          {messages.map((msg, index) => {
            const isUser = index % 2 === 1;
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  gap: '8px',
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: msg.isAi ? 'var(--ts-color-primary)' : 'var(--ts-color-secondary)',
                      color: primaryTextColor,
                      fontSize: '10px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {msg.isAi ? <AppIcon name="bot" size={14} /> : msg.avatar}
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '80%',
                    backgroundColor: isUser ? 'var(--ts-color-primary)' : 'var(--ts-color-surface)',
                    color: isUser ? primaryTextColor : 'var(--ts-color-text)',
                    border: isUser ? 'none' : '1px solid var(--ts-color-border)',
                    borderRadius: 'var(--ts-radius)',
                    padding: 'var(--ts-space-xs) var(--ts-space-sm)',
                    boxShadow: 'var(--ts-shadow)',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.85)', lineHeight: 1.4 }}>{msg.text}</p>
                  {msg.codeSnippet && (
                    <pre
                      style={{
                        marginTop: '6px',
                        padding: '6px',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 'calc(var(--ts-radius) * 0.5)',
                        fontSize: '11px',
                        overflowX: 'auto',
                      }}
                    >
                      <code>{msg.codeSnippet}</code>
                    </pre>
                  )}
                  <div style={{ textAlign: 'right', fontSize: '10px', opacity: 0.6, marginTop: '4px' }}>{msg.time}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Type a bubble..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: '9999px',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              color: 'var(--ts-color-text)',
              outline: 'none',
            }}
          />
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="send" size={14} />
          </button>
        </div>
      </div>
    );
  }

  // VARIANT 1: MASTER SPLIT (Default) - with responsive mobilePane toggle
  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        height: '100%',
        minHeight: '520px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      }}
    >
      {/* Left Column: Thread List */}
      <div
        className="ts-chat-thread-column"
        style={{
          width: '280px',
          borderRight: '1px solid var(--ts-color-border)',
          backgroundColor: 'var(--ts-color-surface)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Thread Search Header */}
        <div
          style={{
            padding: 'var(--ts-space-sm)',
            borderBottom: '1px solid var(--ts-color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-xs)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--ts-font-heading)',
                fontWeight: 700,
                fontSize: 'calc(var(--ts-base-size) * 0.95)',
              }}
            >
              Messages
            </span>
            <span
              style={{
                fontSize: 'calc(var(--ts-base-size) * 0.72)',
                backgroundColor: 'var(--ts-color-background)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: '9999px',
                padding: '1px 6px',
                fontWeight: 600,
              }}
            >
              4 Active
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.8)',
            }}
          >
            <AppIcon name="search" size={13} style={{ opacity: 0.5 }} />
            <input
              type="text"
              placeholder="Search chats..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--ts-color-text)',
                width: '100%',
                fontSize: 'calc(var(--ts-base-size) * 0.8)',
              }}
            />
          </div>
        </div>

        {/* Thread List Items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {threads.map((thread) => {
            const isSelected = thread.id === selectedThreadId;
            return (
              <div
                key={thread.id}
                onClick={() => {
                  setSelectedThreadId(thread.id);
                  setMobilePane('messages');
                }}
                style={{
                  padding: 'var(--ts-space-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ts-space-xs)',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--ts-color-border)',
                  backgroundColor: isSelected ? 'var(--ts-color-background)' : 'transparent',
                  borderLeft: isSelected ? '3px solid var(--ts-color-primary)' : '3px solid transparent',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {/* Avatar with status indicator */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: thread.isAi ? 'var(--ts-color-primary)' : 'var(--ts-color-secondary)',
                      color: primaryTextColor,
                      fontSize: 'calc(var(--ts-base-size) * 0.75)',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {thread.isAi ? <AppIcon name="bot" size={18} /> : thread.avatarText}
                  </div>
                  <div
                    style={{
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      backgroundColor:
                        thread.status === 'online'
                          ? '#10b981'
                          : thread.status === 'busy'
                          ? '#ef4444'
                          : '#9ca3af',
                      border: '2px solid var(--ts-color-surface)',
                      position: 'absolute',
                      bottom: '-1px',
                      right: '-1px',
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 'calc(var(--ts-base-size) * 0.85)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {thread.name}
                    </span>
                    <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.68)', opacity: 0.6 }}>
                      {thread.time}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 'calc(var(--ts-base-size) * 0.75)',
                      opacity: 0.7,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {thread.lastMessage}
                  </div>
                </div>

                {thread.unreadCount && (
                  <span
                    style={{
                      backgroundColor: 'var(--ts-color-primary)',
                      color: primaryTextColor,
                      borderRadius: '9999px',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '1px 5px',
                    }}
                  >
                    {thread.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation Stream */}
      <div
        className="ts-chat-message-column"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--ts-color-background)',
          minWidth: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            borderBottom: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setMobilePane(mobilePane === 'threads' ? 'messages' : 'threads')}
              className="ts-chat-mobile-toggle"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--ts-color-text)',
                cursor: 'pointer',
                padding: '4px',
              }}
              aria-label="Toggle threads list"
            >
              <AppIcon name="arrowLeft" size={16} />
            </button>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: activeThread.isAi ? 'var(--ts-color-primary)' : 'var(--ts-color-secondary)',
                color: primaryTextColor,
                fontSize: 'calc(var(--ts-base-size) * 0.75)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {activeThread.isAi ? <AppIcon name="bot" size={16} /> : activeThread.avatarText}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.9)' }}>
                {activeThread.name}
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AppIcon name="circle" size={6} style={{ fill: '#10b981', color: '#10b981' }} />
                <span>Active now</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7 }}>
            <button type="button" aria-label="Audio Call" style={{ background: 'none', border: 'none', color: 'var(--ts-color-text)', cursor: 'pointer', padding: '6px' }}>
              <AppIcon name="phone" size={16} />
            </button>
            <button type="button" aria-label="Video Call" style={{ background: 'none', border: 'none', color: 'var(--ts-color-text)', cursor: 'pointer', padding: '6px' }}>
              <AppIcon name="video" size={16} />
            </button>
            <button type="button" aria-label="More Options" style={{ background: 'none', border: 'none', color: 'var(--ts-color-text)', cursor: 'pointer', padding: '6px' }}>
              <AppIcon name="moreVertical" size={16} />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--ts-space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', gap: 'var(--ts-space-sm)', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: msg.isAi ? 'var(--ts-color-primary)' : 'var(--ts-color-secondary)',
                  color: primaryTextColor,
                  fontSize: 'calc(var(--ts-base-size) * 0.72)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {msg.isAi ? <AppIcon name="bot" size={16} /> : msg.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>{msg.sender}</span>
                  <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.7)', opacity: 0.55 }}>{msg.time}</span>
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', lineHeight: 1.45 }}>{msg.text}</div>
                {msg.codeSnippet && (
                  <pre
                    style={{
                      marginTop: '8px',
                      padding: 'var(--ts-space-sm)',
                      backgroundColor: 'var(--ts-color-surface)',
                      border: '1px solid var(--ts-color-border)',
                      borderRadius: 'var(--ts-radius)',
                      fontSize: 'calc(var(--ts-base-size) * 0.75)',
                      fontFamily: 'monospace',
                      overflowX: 'auto',
                    }}
                  >
                    <code>{msg.codeSnippet}</code>
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div
          style={{
            padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            borderTop: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-surface)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ts-space-xs)',
          }}
        >
          <button
            type="button"
            aria-label="Attach file"
            style={{ background: 'none', border: 'none', color: 'var(--ts-color-text)', opacity: 0.6, cursor: 'pointer', padding: '6px' }}
          >
            <AppIcon name="paperclip" size={16} />
          </button>
          <input
            type="text"
            placeholder="Type your message or prompt..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              color: 'var(--ts-color-text)',
              outline: 'none',
            }}
          />
          <button
            type="button"
            aria-label="Insert emoji"
            style={{ background: 'none', border: 'none', color: 'var(--ts-color-text)', opacity: 0.6, cursor: 'pointer', padding: '6px' }}
          >
            <AppIcon name="smile" size={16} />
          </button>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <AppIcon name="send" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

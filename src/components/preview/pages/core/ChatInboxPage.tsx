import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  CheckCheck,
  Bot,
  Circle,
} from 'lucide-react';

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
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const [selectedThreadId, setSelectedThreadId] = useState('t-ai');
  const [inputText, setInputText] = useState('');

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
      {/* Left Column: Thread List (Hidden on tiny widths or scaled) */}
      <div
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
            <Search style={{ width: '13px', height: '13px', opacity: 0.5 }} />
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
                onClick={() => setSelectedThreadId(thread.id)}
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
                    {thread.isAi ? <Bot style={{ width: '18px', height: '18px' }} /> : thread.avatarText}
                  </div>
                  <div
                    style={{
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      backgroundColor:
                        thread.status === 'online' ? '#10b981' : thread.status === 'busy' ? '#f59e0b' : '#9ca3af',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      border: '2px solid var(--ts-color-surface)',
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontWeight: isSelected ? 700 : 600,
                        fontSize: 'calc(var(--ts-base-size) * 0.82)',
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
                      fontSize: 'calc(var(--ts-base-size) * 0.74)',
                      opacity: 0.7,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '2px',
                    }}
                  >
                    {thread.lastMessage}
                  </div>
                </div>

                {/* Unread dot */}
                {thread.unreadCount && (
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ts-color-accent)',
                      color: '#ffffff',
                      fontSize: '9px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
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

      {/* Right Column: Chat Conversation Stream & Input */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--ts-color-background)',
          overflow: 'hidden',
        }}
      >
        {/* Chat Header Bar */}
        <div
          style={{
            padding: 'var(--ts-space-sm) var(--ts-space-md)',
            borderBottom: '1px solid var(--ts-color-border)',
            backgroundColor: 'var(--ts-color-surface)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-xs)' }}>
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
              {activeThread.isAi ? <Bot style={{ width: '16px', height: '16px' }} /> : activeThread.avatarText}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'calc(var(--ts-base-size) * 0.88)' }}>
                {activeThread.name}
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Circle style={{ width: '6px', height: '6px', fill: '#10b981', color: '#10b981' }} />
                <span>Active Agent Session</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-xs)' }}>
            <button
              type="button"
              aria-label="Call"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ts-color-text)',
                opacity: 0.7,
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <Phone style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              type="button"
              aria-label="Video"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ts-color-text)',
                opacity: 0.7,
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <Video style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              type="button"
              aria-label="Options"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ts-color-text)',
                opacity: 0.7,
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <MoreVertical style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--ts-space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-sm)',
          }}
        >
          {/* Incoming message */}
          <div style={{ display: 'flex', gap: 'var(--ts-space-xs)', maxWidth: '80%' }}>
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm)',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', lineHeight: 1.4 }}>
                Greetings! I have analyzed the token specifications for the Nordic Forest and Cyber Neon presets. All color scales conform to WCAG 2.1 AAA.
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.68)', opacity: 0.6, marginTop: '4px', textAlign: 'right' }}>
                12:38 PM
              </div>
            </div>
          </div>

          {/* Outgoing message */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{
                backgroundColor: 'var(--ts-color-primary)',
                color: primaryTextColor,
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm)',
                maxWidth: '80%',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', lineHeight: 1.4 }}>
                Awesome! Can you also verify the fluid typography scale clamp formulas for mobile viewports?
              </div>
              <div
                style={{
                  fontSize: 'calc(var(--ts-base-size) * 0.68)',
                  opacity: 0.8,
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '4px',
                }}
              >
                <span>12:39 PM</span>
                <CheckCheck style={{ width: '12px', height: '12px' }} />
              </div>
            </div>
          </div>

          {/* Incoming response */}
          <div style={{ display: 'flex', gap: 'var(--ts-space-xs)', maxWidth: '80%' }}>
            <div
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius)',
                padding: 'var(--ts-space-sm)',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', lineHeight: 1.4 }}>
                Checked. Base font: 16px with scale 1.25 (Major Third) resolves to 16px min, 31.25px max. No overflow detected.
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.68)', opacity: 0.6, marginTop: '4px', textAlign: 'right' }}>
                12:40 PM
              </div>
            </div>
          </div>
        </div>

        {/* Input Bar */}
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
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ts-color-text)',
              opacity: 0.6,
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <Paperclip style={{ width: '16px', height: '16px' }} />
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
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ts-color-text)',
              opacity: 0.6,
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <Smile style={{ width: '16px', height: '16px' }} />
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
            <Send style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};


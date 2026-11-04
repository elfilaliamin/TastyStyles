import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';

interface KanbanTask {
  id: string;
  tag: string;
  title: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee: string;
  comments: number;
  attachments?: number;
  dueDate?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  accentColor: string;
  tasks: KanbanTask[];
}

export const KanbanPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.kanban ?? 'board-columns';
  const [searchQuery, setSearchQuery] = useState('');

  const columns: KanbanColumn[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      accentColor: 'var(--ts-color-text)',
      tasks: [
        {
          id: 't-1',
          tag: 'DES-102',
          title: 'Implement color contrast validation in token parser',
          priority: 'high',
          assignee: 'AR',
          comments: 4,
          attachments: 2,
          dueDate: 'Nov 8',
        },
        {
          id: 't-2',
          tag: 'SPEC-44',
          title: 'Add support for fluid clamp typography scales',
          priority: 'medium',
          assignee: 'SL',
          comments: 1,
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      accentColor: 'var(--ts-color-accent)',
      tasks: [
        {
          id: 't-3',
          tag: 'FE-89',
          title: 'Refactor preview canvas viewport container for fixed height scrolling',
          priority: 'urgent',
          assignee: 'EM',
          comments: 7,
          attachments: 3,
          dueDate: 'Today',
        },
        {
          id: 't-4',
          tag: 'CORE-12',
          title: 'Compile design tokens directly into CSS custom properties',
          priority: 'high',
          assignee: 'AR',
          comments: 3,
        },
      ],
    },
    {
      id: 'review',
      title: 'In Review / QA',
      accentColor: 'var(--ts-color-primary)',
      tasks: [
        {
          id: 't-5',
          tag: 'DOCK-04',
          title: 'Docker multi-stage Alpine build optimization',
          priority: 'medium',
          assignee: 'JK',
          comments: 2,
          attachments: 1,
          dueDate: 'Nov 6',
        },
      ],
    },
    {
      id: 'done',
      title: 'Completed',
      accentColor: '#10b981',
      tasks: [
        {
          id: 't-6',
          tag: 'JSON-01',
          title: 'Zod schema validation across all 6 style registries',
          priority: 'low',
          assignee: 'EM',
          comments: 5,
        },
        {
          id: 't-7',
          tag: 'THEME-02',
          title: 'Synchronize editor theme with dark/light mode switcher',
          priority: 'medium',
          assignee: 'AR',
          comments: 8,
          dueDate: 'Completed',
        },
      ],
    },
  ];

  const getPriorityStyle = (priority: KanbanTask['priority']) => {
    switch (priority) {
      case 'urgent':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', label: 'Urgent' };
      case 'high':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', label: 'High' };
      case 'medium':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6', label: 'Medium' };
      case 'low':
      default:
        return { bg: 'rgba(156, 163, 175, 0.15)', text: '#9ca3af', label: 'Low' };
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        padding: 'var(--ts-space-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
      }}
    >
      {/* Top Board Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--ts-space-sm)',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
              fontWeight: 800,
              margin: 0,
            }}
          >
            Sprint 14 Board
          </h1>
          <p style={{ margin: '2px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75 }}>
            Deliverables tracking for the TastyStyles design token engine.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-xs)', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
            }}
          >
            <AppIcon name="search" size={14} style={{ opacity: 0.5 }} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--ts-color-text)',
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
                width: '110px',
              }}
            />
          </div>

          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              color: 'var(--ts-color-text)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <AppIcon name="filter" size={13} />
            <span>Filter</span>
          </button>

          <button
            type="button"
            style={{
              backgroundColor: 'var(--ts-color-primary)',
              color: primaryTextColor,
              border: 'none',
              borderRadius: 'var(--ts-radius)',
              padding: 'var(--ts-space-xs) var(--ts-space-md)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--ts-shadow)',
            }}
          >
            <AppIcon name="plus" size={14} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Layout Variant: 2. TIMELINE LIST */}
      {layout === 'timeline-list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-md)' }}>
          <div style={{ backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', borderRadius: 'var(--ts-radius-surface, 16px)', padding: 'var(--ts-space-md)', boxShadow: 'var(--ts-shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ts-space-sm)' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 'calc(var(--ts-base-size) * 0.95)', fontWeight: 700 }}>Q4 Engineering Milestones</h3>
                <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.75)', opacity: 0.7 }}>4 of 7 deliverables completed (68%)</span>
              </div>
              <div style={{ width: '120px', height: '8px', backgroundColor: 'var(--ts-color-background)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', backgroundColor: 'var(--ts-color-primary)', borderRadius: '9999px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
              {columns.flatMap((c) => c.tasks.map((t) => ({ ...t, status: c.title }))).map((task) => (
                <div
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--ts-space-sm)',
                    borderRadius: 'var(--ts-radius-surface, 12px)',
                    border: '1px solid var(--ts-color-border)',
                    backgroundColor: 'var(--ts-color-background)',
                    gap: 'var(--ts-space-md)',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px', flex: 1 }}>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', opacity: 0.6 }}>{task.tag}</span>
                    <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600 }}>{task.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)' }}>
                      {task.status}
                    </span>
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>{task.dueDate ?? 'Ongoing'}</span>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--ts-color-primary)', color: primaryTextColor, fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {task.assignee}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Layout Variant: 3. COMPACT GRID */}
      {layout === 'compact-grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--ts-space-sm)' }}>
          {columns.flatMap((c) => c.tasks.map((t) => ({ ...t, status: c.title }))).map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: 'var(--ts-space-sm)',
                boxShadow: 'var(--ts-shadow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontFamily: 'monospace', opacity: 0.6 }}>{task.tag}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ts-color-primary)' }}>{task.status}</span>
              </div>
              <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.85)', fontWeight: 600, lineHeight: 1.3 }}>{task.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', borderTop: '1px solid var(--ts-color-border)', fontSize: '11px', opacity: 0.7 }}>
                <span>{task.dueDate ?? 'Backlog'}</span>
                <span>{task.comments} notes</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Layout Variant: 1. BOARD COLUMNS (Default) */}
      {(layout === 'board-columns' || !['timeline-list', 'compact-grid'].includes(layout)) && (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: 'var(--ts-space-md)',
          alignItems: 'start',
        }}
      >
        {columns.map((column) => {
          const filteredTasks = column.tasks.filter(
            (t) =>
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.tag.toLowerCase().includes(searchQuery.toLowerCase())
          );

          return (
            <div
              key={column.id}
              style={{
                backgroundColor: 'var(--ts-color-surface)',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'var(--ts-radius-surface, 16px)',
                padding: 'var(--ts-space-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ts-space-sm)',
                boxShadow: 'var(--ts-shadow)',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '2px 4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: column.accentColor,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--ts-font-heading)',
                      fontWeight: 700,
                      fontSize: 'calc(var(--ts-base-size) * 0.88)',
                    }}
                  >
                    {column.title}
                  </span>
                  <span
                    style={{
                      fontSize: 'calc(var(--ts-base-size) * 0.75)',
                      padding: '1px 6px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--ts-color-background)',
                      border: '1px solid var(--ts-color-border)',
                      fontWeight: 600,
                      opacity: 0.8,
                    }}
                  >
                    {filteredTasks.length}
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="Add item"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--ts-color-text)',
                    cursor: 'pointer',
                    opacity: 0.6,
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <AppIcon name="plus" size={14} />
                </button>
              </div>

              {/* Task Cards Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ts-space-xs)' }}>
                {filteredTasks.map((task) => {
                  const pri = getPriorityStyle(task.priority);
                  return (
                    <div
                      key={task.id}
                      style={{
                        backgroundColor: 'var(--ts-color-background)',
                        border: '1px solid var(--ts-color-border)',
                        borderRadius: 'var(--ts-radius-surface, 12px)',
                        padding: 'var(--ts-space-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--ts-space-xs)',
                        cursor: 'grab',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      {/* Priority and Tag Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: 'calc(var(--ts-base-size) * 0.7)',
                            fontWeight: 600,
                            padding: '1px 6px',
                            borderRadius: 'var(--ts-radius)',
                            backgroundColor: pri.bg,
                            color: pri.text,
                          }}
                        >
                          {pri.label}
                        </span>

                        <span
                          style={{
                            fontSize: 'calc(var(--ts-base-size) * 0.72)',
                            fontFamily: 'monospace',
                            opacity: 0.65,
                          }}
                        >
                          {task.tag}
                        </span>
                      </div>

                      {/* Title */}
                      <div
                        style={{
                          fontSize: 'calc(var(--ts-base-size) * 0.84)',
                          fontWeight: 600,
                          lineHeight: 1.35,
                        }}
                      >
                        {task.title}
                      </div>

                      {/* Footer Info Row */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '4px',
                          borderTop: '1px solid var(--ts-color-border)',
                          marginTop: '2px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.7 }}>
                          {task.dueDate && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: 'calc(var(--ts-base-size) * 0.7)' }}>
                              <AppIcon name="clock" size={11} />
                              <span>{task.dueDate}</span>
                            </div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: 'calc(var(--ts-base-size) * 0.7)' }}>
                            <AppIcon name="messageSquare" size={11} />
                            <span>{task.comments}</span>
                          </div>
                          {task.attachments && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: 'calc(var(--ts-base-size) * 0.7)' }}>
                              <AppIcon name="paperclip" size={11} />
                              <span>{task.attachments}</span>
                            </div>
                          )}
                        </div>

                        {/* Assignee Avatar */}
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--ts-color-primary)',
                            color: primaryTextColor,
                            fontSize: '9px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {task.assignee}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

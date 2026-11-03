import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import {
  Plus,
  Search,
  Filter,
  MessageSquare,
  Paperclip,
  Clock,
} from 'lucide-react';

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
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
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
            <Search style={{ width: '14px', height: '14px', opacity: 0.5 }} />
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
            <Filter style={{ width: '13px', height: '13px' }} />
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
            <Plus style={{ width: '14px', height: '14px' }} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
                borderRadius: 'var(--ts-radius)',
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
                  <Plus style={{ width: '14px', height: '14px' }} />
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
                        borderRadius: 'var(--ts-radius)',
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
                              <Clock style={{ width: '11px', height: '11px' }} />
                              <span>{task.dueDate}</span>
                            </div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: 'calc(var(--ts-base-size) * 0.7)' }}>
                            <MessageSquare style={{ width: '11px', height: '11px' }} />
                            <span>{task.comments}</span>
                          </div>
                          {task.attachments && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: 'calc(var(--ts-base-size) * 0.7)' }}>
                              <Paperclip style={{ width: '11px', height: '11px' }} />
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
    </div>
  );
};

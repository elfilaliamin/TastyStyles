import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { AppIcon } from '../../../common/AppIcon';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Designer' | 'Developer' | 'AI Agent';
  avatarBg: string;
  isAi?: boolean;
  status: 'active' | 'invited';
  lastActive: string;
}

export const TeamMembersPage: React.FC = () => {
  const { activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Designer');

  const members: TeamMember[] = [
    {
      id: 'm-1',
      name: 'Alex Rivers',
      email: 'alex.rivers@tastystyles.io',
      role: 'Owner',
      avatarBg: 'var(--ts-color-primary)',
      status: 'active',
      lastActive: 'Just now',
    },
    {
      id: 'm-2',
      name: 'Elena Rostova',
      email: 'elena.rostova@tastystyles.io',
      role: 'Admin',
      avatarBg: 'var(--ts-color-secondary)',
      status: 'active',
      lastActive: '14 mins ago',
    },
    {
      id: 'm-3',
      name: 'Gemini Agent Orchestrator',
      email: 'agentic-builder@antigravity.ai',
      role: 'AI Agent',
      avatarBg: 'var(--ts-color-primary)',
      isAi: true,
      status: 'active',
      lastActive: 'Continuous',
    },
    {
      id: 'm-4',
      name: 'Marcus Vance',
      email: 'marcus.v@tastystyles.io',
      role: 'Designer',
      avatarBg: '#8b5cf6',
      status: 'active',
      lastActive: '2 days ago',
    },
    {
      id: 'm-5',
      name: 'Sarah Lin',
      email: 'sarah.lin@partnercorp.com',
      role: 'Developer',
      avatarBg: '#06b6d4',
      status: 'invited',
      lastActive: 'Invite pending',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        padding: 'var(--ts-space-lg)',
        maxWidth: '860px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-md)',
      }}
    >
      {/* Header */}
      <div>
        <h1
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            fontWeight: 800,
            margin: 0,
          }}
        >
          Team & Access Control
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: 'calc(var(--ts-base-size) * 0.85)', opacity: 0.75 }}>
          Manage workspace collaborators, autonomous bot credentials, and permission scopes.
        </p>
      </div>

      {/* Invite Member Card */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius-surface, 12px)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-sm)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontWeight: 700,
            fontSize: 'calc(var(--ts-base-size) * 0.95)',
          }}
        >
          Invite New Collaborator
        </span>

        <div style={{ display: 'flex', gap: 'var(--ts-space-xs)', flexWrap: 'wrap' }}>
          <div
            style={{
              flex: 1,
              minWidth: '220px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 12px)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
            }}
          >
            <AppIcon name="mail" size={14} style={{ opacity: 0.5 }} />
            <input
              type="email"
              placeholder="colleague@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--ts-color-text)',
                width: '100%',
                fontSize: 'calc(var(--ts-base-size) * 0.82)',
              }}
            />
          </div>

          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            style={{
              backgroundColor: 'var(--ts-color-background)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 8px)',
              color: 'var(--ts-color-text)',
              padding: 'var(--ts-space-xs) var(--ts-space-sm)',
              fontSize: 'calc(var(--ts-base-size) * 0.82)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <option value="Designer">Designer (Edit tokens)</option>
            <option value="Developer">Developer (Read specs)</option>
            <option value="Admin">Admin (Full access)</option>
          </select>

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
              whiteSpace: 'nowrap',
            }}
          >
            <AppIcon name="userPlus" size={14} />
            <span>Send Invite</span>
          </button>
        </div>
      </div>

      {/* Member Roster List */}
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius-surface, 16px)',
          boxShadow: 'var(--ts-shadow)',
          padding: 'var(--ts-space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ts-space-xs)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ts-space-xs)' }}>
          <span
            style={{
              fontFamily: 'var(--ts-font-heading)',
              fontWeight: 700,
              fontSize: 'calc(var(--ts-base-size) * 0.95)',
            }}
          >
            Workspace Members ({members.length})
          </span>
          <span style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.7 }}>
            5 / 10 seats filled
          </span>
        </div>

        {members.map((member, idx) => (
          <div
            key={member.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--ts-space-xs) 0',
              borderBottom: idx < members.length - 1 ? '1px solid var(--ts-color-border)' : 'none',
              gap: 'var(--ts-space-sm)',
              flexWrap: 'wrap',
            }}
          >
            {/* Member Details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-xs)' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: member.avatarBg,
                  color: primaryTextColor,
                  fontSize: 'calc(var(--ts-base-size) * 0.75)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {member.isAi ? <AppIcon name="bot" size={16} /> : member.name.charAt(0)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 600, fontSize: 'calc(var(--ts-base-size) * 0.85)' }}>
                    {member.name}
                  </span>
                  {member.status === 'invited' && (
                    <span
                      style={{
                        fontSize: 'calc(var(--ts-base-size) * 0.68)',
                        padding: '1px 5px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        color: '#f59e0b',
                        fontWeight: 600,
                      }}
                    >
                      Pending
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.72)', opacity: 0.7 }}>
                  {member.email}
                </div>
              </div>
            </div>

            {/* Role and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ts-space-sm)' }}>
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontSize: 'calc(var(--ts-base-size) * 0.75)',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--ts-radius)',
                    backgroundColor: 'var(--ts-color-background)',
                    border: '1px solid var(--ts-color-border)',
                  }}
                >
                  {member.role}
                </span>
                <div style={{ fontSize: 'calc(var(--ts-base-size) * 0.68)', opacity: 0.6, marginTop: '2px' }}>
                  {member.lastActive}
                </div>
              </div>

              <button
                type="button"
                aria-label="Options"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ts-color-text)',
                  opacity: 0.6,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <AppIcon name="moreVertical" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

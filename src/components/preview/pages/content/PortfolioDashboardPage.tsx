import React, { useState } from 'react';
import { useDesign } from '../../../../context/DesignContext';
import { getBestContrastingColor } from '../../../../lib/contrast';
import { DynamicNavbar } from '../../navigation/DynamicNavbar';
import { DynamicSidebar } from '../../navigation/DynamicSidebar';
import { AppIcon } from '../../../common/AppIcon';

interface SectionVisibility {
  profile: boolean;
  experiences: boolean;
  education: boolean;
  projects: boolean;
  skills: boolean;
  languages: boolean;
  contact: boolean;
}

export const PortfolioDashboardPage: React.FC = () => {
  const { state, activeColors } = useDesign();
  const primaryTextColor = getBestContrastingColor(activeColors.primary);
  const layout = state.pageLayouts?.portfolioDashboard ?? 'analytics-cms-split';

  // Section visibility states (allowing the owner to control what appears)
  const [sections, setSections] = useState<SectionVisibility>({
    profile: true,
    experiences: true,
    education: true,
    projects: true,
    skills: true,
    languages: true,
    contact: true,
  });

  const toggleSection = (key: keyof SectionVisibility) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Content state for projects
  const [projectList, setProjectList] = useState([
    { id: '1', title: 'TastyStyles Token Engine', status: 'Published', views: '8,420', category: 'Open Source', date: 'Nov 2026' },
    { id: '2', title: 'SolarPulse Telemetry Grid', status: 'Published', views: '4,190', category: 'Enterprise SaaS', date: 'Oct 2026' },
    { id: '3', title: 'Helios Mobile Wallet', status: 'Published', views: '2,210', category: 'FinTech', date: 'Aug 2026' },
    { id: '4', title: 'Agentic Architect IDE Extension', status: 'Draft', views: '—', category: 'Developer Tool', date: 'In Progress' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Open Source');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setProjectList([
      {
        id: String(Date.now()),
        title: newTitle.trim(),
        status: 'Draft',
        views: '0',
        category: newCategory,
        date: 'Just now',
      },
      ...projectList,
    ]);
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: layout === 'compact-overview' ? 'column' : 'row',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar for sidebar-grid layout */}
      {layout === 'analytics-cms-split' && (
        <DynamicSidebar className="hidden md:flex shrink-0" brandName="Portfolio CMS" />
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        {layout === 'compact-overview' && <DynamicNavbar brandName="Portfolio CMS" />}

        <main
          style={{
            padding: 'var(--ts-space-lg) var(--ts-space-md)',
            maxWidth: '1040px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ts-space-lg)',
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ts-color-primary)', textTransform: 'uppercase' }}>
                  Owner Dashboard
                </span>
                <span style={{ padding: '2px 8px', borderRadius: '12px', backgroundColor: 'var(--ts-color-surface)', border: '1px solid var(--ts-color-border)', fontSize: '11px', fontWeight: 600 }}>
                  Live Mode
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * 1.25)', fontWeight: 800, margin: '2px 0 0 0' }}>
                Portfolio Analytics & Content Manager
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                style={{
                  backgroundColor: 'var(--ts-color-primary)',
                  color: primaryTextColor,
                  border: 'none',
                  borderRadius: 'var(--ts-radius-surface, 10px)',
                  padding: '8px 14px',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <AppIcon name="plus" size={14} />
                <span>Add Project</span>
              </button>
            </div>
          </div>

          {/* 1. VISITOR ANALYTICS TELEMETRY */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--ts-space-sm)' }}>
            {[
              { label: 'Total Unique Visitors', value: '14,820', delta: '+22.4%', color: '#10b981', icon: 'user' },
              { label: 'Case Study Pageviews', value: '42,190', delta: '+14.1%', color: '#10b981', icon: 'activity' },
              { label: 'Average Dwell Time', value: '3m 48s', delta: '+35s', color: 'var(--ts-color-primary)', icon: 'clock' },
              { label: 'New Client Inquiries', value: '24', delta: '4 this week', color: 'var(--ts-color-accent)', icon: 'mail' },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 12px)',
                  padding: 'var(--ts-space-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>{stat.label}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: stat.color }}>{stat.delta}</span>
                </div>
                <div style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '22px', fontWeight: 900 }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* 2. SECTION VISIBILITY CONTROLLER ("Control what appears") */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '15px', fontWeight: 800, margin: 0 }}>
                  Landing Page Section Visibility
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.75 }}>
                  Toggle which resume sections are visible to visitors on your public portfolio landing page.
                </p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--ts-color-primary)', fontWeight: 600 }}>
                {Object.values(sections).filter(Boolean).length} of 7 Active
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 'var(--ts-space-xs)' }}>
              {[
                { key: 'profile' as const, label: 'Profile Bio & Hero', desc: 'Avatar, title, availability' },
                { key: 'experiences' as const, label: 'Work Experiences', desc: 'Career timeline & roles' },
                { key: 'education' as const, label: 'Education & Honors', desc: 'Degrees & institutions' },
                { key: 'projects' as const, label: 'Featured Projects', desc: 'Showcase tiles & metrics' },
                { key: 'skills' as const, label: 'Technical Skills', desc: 'Categorized tech stack' },
                { key: 'languages' as const, label: 'Languages', desc: 'Spoken & programming' },
                { key: 'contact' as const, label: 'Contact & Booking', desc: 'Direct inquiry form' },
              ].map((sec) => {
                const isEnabled = sections[sec.key];
                return (
                  <div
                    key={sec.key}
                    onClick={() => toggleSection(sec.key)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--ts-radius-surface, 10px)',
                      backgroundColor: 'var(--ts-color-background)',
                      border: `1px solid ${isEnabled ? 'var(--ts-color-primary)' : 'var(--ts-color-border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: isEnabled ? 'var(--ts-color-text)' : 'inherit', opacity: isEnabled ? 1 : 0.6 }}>
                        {sec.label}
                      </div>
                      <div style={{ fontSize: '10px', opacity: 0.55 }}>{sec.desc}</div>
                    </div>
                    <div
                      style={{
                        width: '32px',
                        height: '18px',
                        borderRadius: '9px',
                        backgroundColor: isEnabled ? 'var(--ts-color-primary)' : 'var(--ts-color-border)',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isEnabled ? 'flex-end' : 'flex-start',
                        transition: 'background-color 0.2s',
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. CONTENT MANAGER: PUBLISHED PROJECTS & CASE STUDIES */}
          <div
            style={{
              backgroundColor: 'var(--ts-color-surface)',
              border: '1px solid var(--ts-color-border)',
              borderRadius: 'var(--ts-radius-surface, 16px)',
              padding: 'var(--ts-space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ts-space-md)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--ts-font-heading)', fontSize: '15px', fontWeight: 800, margin: 0 }}>
                  Published Projects & Deep-Dive Blogs
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.75 }}>
                  Manage and publish your case studies and project retrospective articles.
                </p>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--ts-color-border)', opacity: 0.7 }}>
                    <th style={{ padding: '8px 12px' }}>Project Title</th>
                    <th style={{ padding: '8px 12px' }}>Category</th>
                    <th style={{ padding: '8px 12px' }}>Status</th>
                    <th style={{ padding: '8px 12px' }}>Views</th>
                    <th style={{ padding: '8px 12px' }}>Updated</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectList.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--ts-color-border)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 700 }}>{p.title}</td>
                      <td style={{ padding: '10px 12px', opacity: 0.8 }}>{p.category}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '10px',
                            fontWeight: 700,
                            backgroundColor: p.status === 'Published' ? '#10b98120' : '#f59e0b20',
                            color: p.status === 'Published' ? '#10b981' : '#f59e0b',
                            border: `1px solid ${p.status === 'Published' ? '#10b98140' : '#f59e0b40'}`,
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{p.views}</td>
                      <td style={{ padding: '10px 12px', opacity: 0.7 }}>{p.date}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setProjectList(
                              projectList.map((item) =>
                                item.id === p.id
                                  ? { ...item, status: item.status === 'Published' ? 'Draft' : 'Published' }
                                  : item
                              )
                            );
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid var(--ts-color-border)',
                            borderRadius: '6px',
                            padding: '3px 8px',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: 'var(--ts-color-text)',
                          }}
                        >
                          {p.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Adding New Project */}
          {showAddModal && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                padding: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--ts-color-surface)',
                  border: '1px solid var(--ts-color-border)',
                  borderRadius: 'var(--ts-radius-surface, 16px)',
                  padding: '24px',
                  maxWidth: '440px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: 'var(--ts-shadow)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Add New Project / Blog</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', opacity: 0.6 }}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Autonomous Token Compiler"
                      required
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--ts-color-border)',
                        backgroundColor: 'var(--ts-color-background)',
                        color: 'var(--ts-color-text)',
                        boxSizing: 'border-box',
                        fontSize: '13px',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--ts-color-border)',
                        backgroundColor: 'var(--ts-color-background)',
                        color: 'var(--ts-color-text)',
                        boxSizing: 'border-box',
                        fontSize: '13px',
                      }}
                    >
                      <option value="Open Source">Open Source</option>
                      <option value="Enterprise SaaS">Enterprise SaaS</option>
                      <option value="Developer Tool">Developer Tool</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Research & AI">Research & AI</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--ts-color-border)',
                        background: 'transparent',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '6px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'var(--ts-color-primary)',
                        color: primaryTextColor,
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

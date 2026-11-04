import type { PreviewComponentType } from '../types';

export interface PreviewDefinition {
  id: PreviewComponentType;
  label: string;
  shortLabel: string;
  category: 'Primitives' | 'Public' | 'Auth' | 'Core' | 'Account' | 'System';
  description: string;
  hasCustomLayouts: boolean;
}

export const PREVIEW_REGISTRY: PreviewDefinition[] = [
  // Component Primitives
  { id: 'overview', label: 'Component Card (Overview)', shortLabel: 'Overview', category: 'Primitives', description: 'Core component design token stress test card', hasCustomLayouts: false },
  { id: 'buttons', label: 'Buttons & Actions', shortLabel: 'Buttons', category: 'Primitives', description: 'Primary, secondary, outline, ghost and icon buttons', hasCustomLayouts: false },
  { id: 'forms', label: 'Form Controls & Inputs', shortLabel: 'Forms', category: 'Primitives', description: 'Text inputs, selects, toggles, checkboxes and validation states', hasCustomLayouts: false },
  { id: 'cards', label: 'Cards & Surfaces Showcase', shortLabel: 'Cards', category: 'Primitives', description: 'Card elevations, borders, glass surfaces, and badges', hasCustomLayouts: false },
  { id: 'feedback', label: 'Feedback, Badges & Alerts', shortLabel: 'Feedback', category: 'Primitives', description: 'Banners, toasts, pill badges, and status indicators', hasCustomLayouts: false },
  { id: 'table', label: 'Data Tables & Lists', shortLabel: 'Tables', category: 'Primitives', description: 'Tabular data display, search filters, and pagination', hasCustomLayouts: false },
  { id: 'navbar', label: 'Navbar & Navigation Header', shortLabel: 'Navbar', category: 'Primitives', description: 'Application headers, top navigation bars, actions and breadcrumbs', hasCustomLayouts: true },
  { id: 'sidebar', label: 'Sidebar Navigation & Rails', shortLabel: 'Sidebar', category: 'Primitives', description: 'Left sidebar navigation, icon rails, dual pane and tree menus', hasCustomLayouts: true },

  // Public Pages
  { id: 'landing', label: 'Landing / Homepage', shortLabel: 'Landing', category: 'Public', description: 'Hero section, feature matrix, customer testimonial, and CTA', hasCustomLayouts: true },
  { id: 'pricing', label: 'Pricing & Plans', shortLabel: 'Pricing', category: 'Public', description: 'Plan tier cards, feature comparison table, and billing toggle', hasCustomLayouts: true },
  { id: 'blog', label: 'Blog / Long Article', shortLabel: 'Blog', category: 'Public', description: 'Editorial typography, reading time, callouts, and author card', hasCustomLayouts: false },
  { id: 'contact', label: 'Contact & Validation Form', shortLabel: 'Contact', category: 'Public', description: 'Input fields, validation states, office cards, and FAQ accordion', hasCustomLayouts: false },

  // Auth & Onboarding
  { id: 'auth', label: 'Auth (Login / Signup / Reset)', shortLabel: 'Auth & Login', category: 'Auth', description: 'Interactive multi-layout authentication interface', hasCustomLayouts: true },
  { id: 'onboarding', label: 'Onboarding Wizard (3 Steps)', shortLabel: 'Onboarding', category: 'Auth', description: 'Multi-step guided setup workflow with progress indicators', hasCustomLayouts: true },

  // Core Application
  { id: 'dashboard', label: 'Dashboard & Telemetry', shortLabel: 'Dashboard', category: 'Core', description: 'KPI cards, visual charts, telemetry meters, and activity logs', hasCustomLayouts: true },
  { id: 'detail', label: 'Item Detail & Diagnostics', shortLabel: 'Item Detail', category: 'Core', description: 'Single entity deep view with tabs, side info, and actions', hasCustomLayouts: true },
  { id: 'kanban', label: 'Kanban & Sprint Board', shortLabel: 'Kanban Board', category: 'Core', description: 'Multi-stage task workflow board with priority tags', hasCustomLayouts: true },
  { id: 'chat', label: 'Chat & Autonomous Inbox', shortLabel: 'Chat & Inbox', category: 'Core', description: 'Split-view conversation threads and message composer', hasCustomLayouts: true },

  // Account & Workspace
  { id: 'settings', label: 'Settings & Preferences', shortLabel: 'Settings', category: 'Account', description: 'User profile, appearance, notifications, and security tabs', hasCustomLayouts: true },
  { id: 'billing', label: 'Billing & Invoices', shortLabel: 'Billing', category: 'Account', description: 'Payment method, invoice history, and subscription details', hasCustomLayouts: false },
  { id: 'team', label: 'Team & Access Control', shortLabel: 'Team Members', category: 'Account', description: 'Role assignments, invites, member table, and permissions', hasCustomLayouts: false },

  // System States
  { id: 'error', label: 'System Error & Status (404/500/403)', shortLabel: 'Error & Status', category: 'System', description: 'Polymorphic HTTP error states with selectable layouts', hasCustomLayouts: true },
  { id: 'empty-state', label: 'Empty State (No Data)', shortLabel: 'Empty State', category: 'System', description: 'Zero-data screens with illustrations and quick-start actions', hasCustomLayouts: true },
  { id: 'success', label: 'Success & Confirmation', shortLabel: 'Success Confirm', category: 'System', description: 'Transaction confirmation, order summaries, and next steps', hasCustomLayouts: true },
];

export function getPreviewIndex(id: PreviewComponentType): number {
  return PREVIEW_REGISTRY.findIndex((p) => p.id === id);
}

export function getNextPreview(id: PreviewComponentType): PreviewComponentType {
  const index = getPreviewIndex(id);
  if (index === -1 || index >= PREVIEW_REGISTRY.length - 1) {
    return PREVIEW_REGISTRY[0].id;
  }
  return PREVIEW_REGISTRY[index + 1].id;
}

export function getPrevPreview(id: PreviewComponentType): PreviewComponentType {
  const index = getPreviewIndex(id);
  if (index <= 0) {
    return PREVIEW_REGISTRY[PREVIEW_REGISTRY.length - 1].id;
  }
  return PREVIEW_REGISTRY[index - 1].id;
}

export function getPreviewDefinition(id: PreviewComponentType): PreviewDefinition {
  return PREVIEW_REGISTRY.find((p) => p.id === id) ?? PREVIEW_REGISTRY[0];
}


export * from '../config/schema';

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';
export type MobileTab = 'controls' | 'preview';

export type PreviewComponentType =
  // Component Primitives
  | 'overview'
  | 'buttons'
  | 'forms'
  | 'cards'
  | 'feedback'
  | 'table'
  | 'navbar'
  | 'sidebar'
  // Layout Wireframe
  | 'layout'
  // Public Pages
  | 'landing'
  | 'pricing'
  | 'blog'
  | 'contact'
  // Auth & Onboarding
  | 'auth'
  | 'onboarding'
  // Core App
  | 'dashboard'
  | 'detail'
  | 'kanban'
  | 'chat'
  // Account & Admin
  | 'settings'
  | 'billing'
  | 'team'
  // System States
  | 'error'
  | 'empty-state'
  | 'success';

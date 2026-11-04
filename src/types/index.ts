export * from '../config/schema';

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';
export type MobileTab = 'controls' | 'preview';

export type PreviewComponentType =
  // Component Primitives
  | 'buttons'
  | 'forms'
  | 'cards'
  | 'feedback'
  | 'popups'
  | 'table'
  | 'navbar'
  | 'sidebar'
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

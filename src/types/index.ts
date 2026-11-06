export * from '../config/schema';

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';
export type MobileTab = 'controls' | 'preview';

export type PreviewComponentType =
  // Public Pages
  | 'landing'
  | 'pricing'
  | 'blog'
  | 'contact'
  | 'editorial'
  | 'portfolio'
  // Commerce & Transactional
  | 'ecommerce-catalog'
  | 'product-detail'
  | 'checkout'
  | 'marketplace'
  | 'booking'
  // Community & Social
  | 'charity'
  | 'forum'
  | 'streaming'
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

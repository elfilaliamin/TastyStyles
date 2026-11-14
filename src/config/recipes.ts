export interface ComponentRecipeState {
  default: string;
  hover?: string;
  active?: string;
  focus?: string;
  disabled?: string;
  error?: string;
}

export interface ComponentRecipe {
  id: string;
  name: string;
  category: 'action' | 'input' | 'surface' | 'feedback' | 'navigation' | 'data';
  description: string;
  height: { sm: string; md: string; lg: string };
  padding: { sm: string; md: string; lg: string };
  radius: string;
  border: string;
  shadow?: string;
  typography: string;
  states: ComponentRecipeState;
}

export const COMPONENT_RECIPES: ComponentRecipe[] = [
  {
    id: 'button-primary',
    name: 'Primary Button',
    category: 'action',
    description: 'Main high-emphasis call to action for the primary task on a screen.',
    height: { sm: '36px', md: '42px', lg: '48px' },
    padding: {
      sm: '0 var(--spacing-sm)',
      md: '0 var(--spacing-md)',
      lg: '0 var(--spacing-lg)',
    },
    radius: 'var(--radius-base)',
    border: '1px solid transparent',
    shadow: 'var(--shadow-base)',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-0); font-weight: 600;',
    states: {
      default: 'background-color: var(--color-primary); color: var(--color-on-primary);',
      hover: 'filter: brightness(1.08); transform: translateY(-1px);',
      active: 'transform: scale(0.98); filter: brightness(0.95);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: 2px;',
      disabled: 'opacity: 0.45; cursor: not-allowed; pointer-events: none;',
    },
  },
  {
    id: 'button-secondary',
    name: 'Secondary Button',
    category: 'action',
    description: 'Medium-emphasis alternative button for supporting or secondary actions.',
    height: { sm: '36px', md: '42px', lg: '48px' },
    padding: {
      sm: '0 var(--spacing-sm)',
      md: '0 var(--spacing-md)',
      lg: '0 var(--spacing-lg)',
    },
    radius: 'var(--radius-base)',
    border: '1px solid var(--color-border)',
    shadow: 'none',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-0); font-weight: 500;',
    states: {
      default: 'background-color: var(--color-surface); color: var(--color-text);',
      hover: 'background-color: var(--color-background); border-color: var(--color-primary);',
      active: 'transform: scale(0.98);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: 2px;',
      disabled: 'opacity: 0.45; cursor: not-allowed; pointer-events: none;',
    },
  },
  {
    id: 'input-text',
    name: 'Text Input & Select',
    category: 'input',
    description: 'Standard single-line text fields, search boxes, and dropdown selects.',
    height: { sm: '36px', md: '42px', lg: '48px' },
    padding: {
      sm: '0 var(--spacing-sm)',
      md: '0 var(--spacing-md)',
      lg: '0 var(--spacing-md)',
    },
    radius: 'var(--radius-base)',
    border: '1px solid var(--color-border)',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-0);',
    states: {
      default: 'background-color: var(--color-surface); color: var(--color-text);',
      hover: 'border-color: var(--color-muted);',
      focus: 'border-color: var(--color-ring); outline: 2px solid var(--color-ring); outline-offset: 0;',
      disabled: 'opacity: 0.5; background-color: var(--color-background); cursor: not-allowed;',
      error: 'border-color: var(--color-danger); outline: 2px solid var(--color-danger);',
    },
  },
  {
    id: 'card-surface',
    name: 'Card & Container Surface',
    category: 'surface',
    description: 'Standard elevated container surface for grouping related content.',
    height: { sm: 'auto', md: 'auto', lg: 'auto' },
    padding: {
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-lg)',
    },
    radius: 'var(--radius-surface)',
    border: '1px solid var(--color-border)',
    shadow: 'var(--shadow-base)',
    typography: 'font-family: var(--font-body); color: var(--color-text);',
    states: {
      default: 'background-color: var(--color-surface); border: 1px solid var(--color-border);',
      hover: 'box-shadow: var(--shadow-hover); border-color: var(--color-muted);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: 2px;',
    },
  },
  {
    id: 'badge-pill',
    name: 'Status Badge & Pill',
    category: 'feedback',
    description: 'Compact status indicator for categories, states, and counts.',
    height: { sm: '20px', md: '24px', lg: '28px' },
    padding: {
      sm: '0 var(--spacing-xs)',
      md: '0 var(--spacing-sm)',
      lg: '0 var(--spacing-sm)',
    },
    radius: 'var(--radius-pill)',
    border: '1px solid var(--color-border)',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-sub1); font-weight: 600;',
    states: {
      default: 'background-color: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border);',
      hover: 'background-color: var(--color-background);',
      active: 'transform: scale(0.96);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: 1px;',
      disabled: 'opacity: 0.5; pointer-events: none;',
    },
  },
  {
    id: 'alert-banner',
    name: 'Alert & Toast Notification',
    category: 'feedback',
    description: 'System message box communicating status, warnings, errors, or success. Variants use dedicated tinted background and text-safe status tokens.',
    height: { sm: 'auto', md: 'auto', lg: 'auto' },
    padding: {
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-md)',
    },
    radius: 'var(--radius-base)',
    border: '1px solid var(--color-border)',
    shadow: 'var(--shadow-base)',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-0);',
    states: {
      default: 'background-color: var(--color-info-bg); color: var(--color-info-text); border-left: 4px solid var(--color-info);',
      hover: 'filter: brightness(0.98);',
      active: 'filter: brightness(0.95);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: 2px;',
      disabled: 'opacity: 0.5; pointer-events: none;',
      error: 'background-color: var(--color-danger-bg); color: var(--color-danger-text); border-left: 4px solid var(--color-danger);',
    },
  },
  {
    id: 'table-data',
    name: 'Data Table & Rows',
    category: 'data',
    description: 'Tabular presentation with header row and striped/bordered data cells.',
    height: { sm: '36px', md: '44px', lg: '52px' },
    padding: {
      sm: '6px var(--spacing-sm)',
      md: '10px var(--spacing-md)',
      lg: '14px var(--spacing-md)',
    },
    radius: 'var(--radius-base)',
    border: '1px solid var(--color-border)',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-0);',
    states: {
      default: 'background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);',
      hover: 'background-color: var(--color-background);',
      active: 'background-color: var(--color-primary-bg);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: -2px;',
      disabled: 'opacity: 0.45; pointer-events: none;',
    },
  },
  {
    id: 'modal-dialog',
    name: 'Modal Dialog & Drawer',
    category: 'surface',
    description: 'High-elevation overlay container for focused workflows, confirmations, and forms.',
    height: { sm: 'auto', md: 'auto', lg: 'auto' },
    padding: {
      sm: 'var(--spacing-md)',
      md: 'var(--spacing-lg)',
      lg: 'var(--spacing-xl)',
    },
    radius: 'var(--radius-surface)',
    border: '1px solid var(--color-border)',
    shadow: 'var(--shadow-lg)',
    typography: 'font-family: var(--font-body); color: var(--color-text);',
    states: {
      default: 'background-color: var(--color-surface); box-shadow: var(--shadow-lg);',
      focus: 'outline: none;',
    },
  },
  {
    id: 'tabs-nav',
    name: 'Tabs & Segmented Control',
    category: 'navigation',
    description: 'Horizontal tab switchers and segmented pills for toggling views.',
    height: { sm: '32px', md: '38px', lg: '44px' },
    padding: {
      sm: '0 var(--spacing-sm)',
      md: '0 var(--spacing-md)',
      lg: '0 var(--spacing-md)',
    },
    radius: 'var(--radius-base)',
    border: 'none',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-sub1); font-weight: 500;',
    states: {
      default: 'background-color: transparent; color: var(--color-muted);',
      hover: 'color: var(--color-text); background-color: var(--color-background);',
      active: 'color: var(--color-primary-text); border-bottom: 2px solid var(--color-primary); font-weight: 600;',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: 2px;',
      disabled: 'opacity: 0.4; cursor: not-allowed; pointer-events: none;',
    },
  },
  {
    id: 'toggle-switch',
    name: 'Toggle Switch',
    category: 'input',
    description: 'Binary toggle switch for instant state enable/disable preferences.',
    height: { sm: '20px', md: '24px', lg: '28px' },
    padding: {
      sm: '2px',
      md: '2px',
      lg: '2px',
    },
    radius: 'var(--radius-pill)',
    border: '1px solid var(--color-border)',
    typography: 'font-family: var(--font-body);',
    states: {
      default: 'background-color: var(--color-border);',
      hover: 'filter: brightness(0.95);',
      active: 'background-color: var(--color-primary); border-color: var(--color-primary);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: 2px;',
      disabled: 'opacity: 0.4; cursor: not-allowed; pointer-events: none;',
    },
  },
  {
    id: 'checkbox-control',
    name: 'Checkbox & Radio',
    category: 'input',
    description: 'Selection controls for lists, options, and multi-select forms.',
    height: { sm: '16px', md: '20px', lg: '24px' },
    padding: {
      sm: '0',
      md: '0',
      lg: '0',
    },
    radius: 'var(--radius-base)',
    border: '1px solid var(--color-border)',
    typography: 'font-family: var(--font-body);',
    states: {
      default: 'background-color: var(--color-surface); border: 1px solid var(--color-border);',
      hover: 'border-color: var(--color-primary);',
      active: 'background-color: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: 2px;',
      disabled: 'opacity: 0.4; cursor: not-allowed; pointer-events: none;',
    },
  },
  {
    id: 'tooltip-popover',
    name: 'Tooltip & Micro-Popover',
    category: 'feedback',
    description: 'Compact contextual helper floating above or below interactive targets.',
    height: { sm: 'auto', md: 'auto', lg: 'auto' },
    padding: {
      sm: '4px var(--spacing-xs)',
      md: '6px var(--spacing-sm)',
      lg: '8px var(--spacing-sm)',
    },
    radius: 'var(--radius-base)',
    border: '1px solid var(--color-border)',
    shadow: 'var(--shadow-md)',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-sub1); font-weight: 500;',
    states: {
      default: 'background-color: var(--color-surface); color: var(--color-text); box-shadow: var(--shadow-md);',
    },
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu & Context Menu',
    category: 'navigation',
    description: 'Floating selection list for secondary navigation actions, filters, and commands.',
    height: { sm: 'auto', md: 'auto', lg: 'auto' },
    padding: {
      sm: 'var(--spacing-xs)',
      md: 'var(--spacing-xs)',
      lg: 'var(--spacing-xs)',
    },
    radius: 'var(--radius-surface)',
    border: '1px solid var(--color-border)',
    shadow: 'var(--shadow-lg)',
    typography: 'font-family: var(--font-body); font-size: var(--font-size-step-0);',
    states: {
      default: 'background-color: var(--color-surface); border: 1px solid var(--color-border); box-shadow: var(--shadow-lg);',
      hover: 'background-color: var(--color-background);',
      focus: 'outline: 2px solid var(--color-ring); outline-offset: -1px;',
    },
  },
];


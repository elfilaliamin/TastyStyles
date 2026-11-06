import fs from 'fs';
import path from 'path';
import { PAGE_TYPES_BY_ID } from '../src/config/pageTypes';

const [,, pageType, layoutId, labelArg] = process.argv;

if (!pageType || !layoutId) {
  console.error('Usage: npm run new:layout <pageType> <layoutId> [label]');
  console.error('Example: npm run new:layout landing bento-editorial "Bento Editorial"');
  process.exit(1);
}

const pageDef = PAGE_TYPES_BY_ID.get(pageType);
if (!pageDef) {
  console.warn(`⚠️ Warning: pageType '${pageType}' is not yet registered in src/config/pageTypes.ts.`);
}

const label = labelArg || layoutId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
const targetDir = path.resolve('src/layouts', pageType, layoutId);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Layout directory already exists: ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

// 1. Write manifest.ts
const manifestContent = `import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: ${JSON.stringify(layoutId)},
  pageType: ${JSON.stringify(pageType)},
  label: ${JSON.stringify(label)},
  purposes: ['saas', 'ecommerce', 'portfolio'],
  sections: ['navbar', ${JSON.stringify(layoutId + '-hero')}, 'features', 'footer'],
  description: ${JSON.stringify(`${label} archetype architecture with structured responsive sections.`)},
  tags: [${JSON.stringify(pageType)}, ${JSON.stringify(layoutId)}],
};
`;

fs.writeFileSync(path.join(targetDir, 'manifest.ts'), manifestContent, 'utf-8');

// 2. Write Layout.tsx
const layoutContent = `import React from 'react';
import { useDesign } from '../../../context/DesignContext';

export const Layout: React.FC = () => {
  const { activeColors } = useDesign();

  return (
    <div
      style={{
        backgroundColor: 'var(--ts-color-background)',
        color: 'var(--ts-color-text)',
        fontFamily: 'var(--ts-font-body)',
        width: '100%',
        minHeight: '100%',
        padding: 'var(--ts-space-lg)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ts-space-lg)',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--ts-color-surface)',
          border: '1px solid var(--ts-color-border)',
          borderRadius: 'var(--ts-radius-surface, 16px)',
          padding: 'var(--ts-space-xl)',
          boxShadow: 'var(--ts-shadow)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--ts-font-heading)',
            fontSize: 'calc(var(--ts-base-size) * var(--ts-scale) * var(--ts-scale))',
            margin: 0,
            fontWeight: 800,
          }}
        >
          ${label}
        </h1>
        <p style={{ marginTop: '8px', opacity: 0.8, fontSize: 'var(--ts-base-size)' }}>
          Generated archetype layout for \`${pageType}\`. Composed cleanly with isolated surface radius.
        </p>
      </div>
    </div>
  );
};

export default Layout;
`;

fs.writeFileSync(path.join(targetDir, 'Layout.tsx'), layoutContent, 'utf-8');

// 3. Write placeholder thumb.png.meta / thumb.txt
fs.writeFileSync(path.join(targetDir, 'thumb.txt'), `Thumbnail placeholder for ${layoutId}`, 'utf-8');

console.log(`✅ Successfully scaffolded layout:`);
console.log(`   Directory: src/layouts/${pageType}/${layoutId}/`);
console.log(`   - manifest.ts`);
console.log(`   - Layout.tsx`);
console.log(`   - thumb.txt`);


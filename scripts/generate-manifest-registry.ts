import fs from 'fs';
import path from 'path';

function getFiles(dir: string, fileMatch: string): string[] {
  let res: string[] = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      res = res.concat(getFiles(p, fileMatch));
    } else if (f === fileMatch) {
      res.push(p);
    }
  }
  return res;
}

// 1. Layouts
const layoutFiles = getFiles('src/layouts', 'manifest.ts').sort();
const layoutImports: string[] = [];
const layoutItems: string[] = [];
layoutFiles.forEach((m, idx) => {
  const rel = './' + path.relative('src/layouts', m).replace(/\\/g, '/').replace(/\.ts$/, '');
  const varName = `layout_${idx}`;
  layoutImports.push(`import { manifest as ${varName} } from '${rel}';`);
  layoutItems.push(varName);
});

const layoutRegistryContent = `import type { LayoutManifest } from '../config/schema';
${layoutImports.join('\n')}

export const ALL_LAYOUT_MANIFESTS: LayoutManifest[] = [
  ${layoutItems.join(',\n  ')},
];
`;

fs.writeFileSync('src/layouts/manifestRegistry.ts', layoutRegistryContent, 'utf8');
console.log(`Generated src/layouts/manifestRegistry.ts with ${layoutItems.length} layouts.`);

// 2. Sections
const sectionFiles = getFiles('src/sections', 'manifest.ts').sort();
const sectionImports: string[] = [];
const sectionItems: string[] = [];
sectionFiles.forEach((m, idx) => {
  const rel = './' + path.relative('src/sections', m).replace(/\\/g, '/').replace(/\.ts$/, '');
  const varName = `section_${idx}`;
  sectionImports.push(`import { manifest as ${varName} } from '${rel}';`);
  sectionItems.push(varName);
});

const sectionRegistryContent = `import type { SectionManifest } from '../config/schema';
${sectionImports.join('\n')}

export const ALL_SECTION_MANIFESTS: SectionManifest[] = [
  ${sectionItems.join(',\n  ')},
];
`;

fs.writeFileSync('src/sections/manifestRegistry.ts', sectionRegistryContent, 'utf8');
console.log(`Generated src/sections/manifestRegistry.ts with ${sectionItems.length} sections.`);

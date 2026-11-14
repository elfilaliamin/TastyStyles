import * as fs from 'fs';
import * as path from 'path';
import { compileProjectBrief } from '../src/lib/compileProjectBrief';
import { defaultInitialState, designReducer } from '../src/context/designReducer';

const outDir = path.resolve('understand/after');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Default SaaS
fs.writeFileSync(path.join(outDir, 'default-saas.json'), JSON.stringify(defaultInitialState, null, 2));
fs.writeFileSync(path.join(outDir, 'default-saas.md'), compileProjectBrief(defaultInitialState));

// 2. Presets
const presetsToExport = ['cyber-neon', 'editorial-luxury', 'zinc-minimal'];
for (const pid of presetsToExport) {
  const st = designReducer(defaultInitialState, { type: 'LOAD_PRESET', id: pid });
  fs.writeFileSync(path.join(outDir, `preset-${pid}.md`), compileProjectBrief(st));
}

console.log('✅ Generated after exports in understand/after/:');
for (const f of fs.readdirSync(outDir)) {
  console.log(` - ${f} (${fs.statSync(path.join(outDir, f)).size} bytes)`);
}

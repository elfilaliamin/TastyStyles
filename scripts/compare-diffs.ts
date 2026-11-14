import * as fs from 'fs';

const baseMd = fs.readFileSync('understand/baseline/default-saas.md', 'utf8');
const afterMd = fs.readFileSync('understand/after/default-saas.md', 'utf8');

console.log('Baseline size:', baseMd.length, 'After size:', afterMd.length);

const baseH1 = baseMd.split('\n').filter(l => /^#\s/.test(l));
const afterH1 = afterMd.split('\n').filter(l => /^#\s/.test(l));
console.log('Baseline H1 count:', baseH1.length, baseH1);
console.log('After H1 count:', afterH1.length, afterH1);

const checkTerms = [
  'Alex Rivers',
  'alex@tastystyles.io',
  'Rp 1.457.078.000',
  'Tokens [3]',
  'WCAG AAA contrast',
  '### 2.1b Contrast Report',
  'Conflict Precedence & Redesign Invariants',
  'Acceptance Sign-Off Checklist',
  'sidebar-grid',
  'three-column-reddit',
];

console.log('\n--- Term Checks (Default SaaS) ---');
checkTerms.forEach(t => {
  console.log(`${t.padEnd(42)} | Baseline: ${baseMd.includes(t)} | After: ${afterMd.includes(t)}`);
});

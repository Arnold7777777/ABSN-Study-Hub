/* Rewrite the filter-chip numbers on infographics.html.
 *
 * The numbers on those buttons are a promise: click "Renal & fluids 110" and
 * you should get 110 cards. They drift as cards are added, and twenty of them
 * were wrong - one by twelve.
 *
 * Counting the attributes in Python got this wrong twice, because the page's
 * own filter splits data-mod and data-exam on a middle dot that lives in the
 * source as "&middot;" and in the DOM as "·". So don't re-implement the
 * filter: drive it. Click each chip, read the page's own "N of M showing",
 * and write that number back.
 *
 *   node tools/refresh-infographic-counts.mjs [http://127.0.0.1:8898/...]
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
const page = join(here, '..', 'infographics.html');
const url = process.argv[2] || 'http://127.0.0.1:8898/ABSN-Study-Hub/infographics.html';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await p.goto(url, { waitUntil: 'load' });
await p.waitForTimeout(800);

const chips = await p.$$eval('.fb[data-k]', els => els
  .filter(e => e.querySelector('.fn'))
  .map(e => ({ k: e.dataset.k, v: e.dataset.v })));

const real = [];
for (const c of chips) {
  await p.reload({ waitUntil: 'load' });
  await p.waitForTimeout(250);
  await p.click(`.fb[data-k="${c.k}"][data-v="${c.v.replace(/"/g, '\\"')}"]`);
  await p.waitForTimeout(150);
  const n = await p.evaluate(() => {
    const m = document.getElementById('count').textContent.match(/([\d,]+)\s+of\s+([\d,]+)/);
    return m ? [m[1], m[2]] : null;
  });
  real.push({ ...c, shown: n[0], total: n[1] });
}
await browser.close();

let html = readFileSync(page, 'utf8');
const changed = [];
for (const c of real) {
  const rx = new RegExp(
    `(data-k="${c.k}" data-v="${c.v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*>[^<]*<span class="fn">)([\\d,]+)(</span>)`);
  html = html.replace(rx, (m, a, was, b) => {
    if (was !== c.shown) changed.push(`${c.k} ${c.v || '(none)'}  ${was} -> ${c.shown}`);
    return a + c.shown + b;
  });
}
writeFileSync(page, html);
console.log(`${real[0].total} cards; ${changed.length} chip counts corrected`);
changed.forEach(c => console.log('   ' + c));

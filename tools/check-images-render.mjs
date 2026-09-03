/* Confirm every <img> on a page actually paints.
 *
 * A missing xmlns is invisible to every other check: the file is valid XML, it
 * serves 200, the CSS aspect-ratio reserves the right-sized box, and rendering
 * the same markup inline in HTML works fine. Only a standalone SVG loaded
 * through <img> needs the namespace, and without it the browser paints nothing
 * while everything else looks correct. Fourteen anatomy diagrams and two STI
 * diagrams shipped that way.
 *
 *   node tools/check-images-render.mjs page.html [more.html ...]
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

const BASE = process.env.BASE || 'http://127.0.0.1:8898/ABSN-Study-Hub/';
const pages = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
let bad = 0;

for (const page of pages) {
  const http = [];
  p.removeAllListeners('response');
  p.on('response', r => { if (r.status() >= 400) http.push(r.status() + ' ' + r.url().split('/').pop()); });
  await p.goto(BASE + page.split('/').map(encodeURIComponent).join('/'), { waitUntil: 'load' });
  await p.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true));
  await p.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await p.waitForTimeout(2200);
  const broken = await p.evaluate(async () => {
    const out = [];
    for (const i of document.querySelectorAll('img')) {
      // a lightbox <img> sits empty until a click fills it - not a broken image
      if (!i.getAttribute('src')) continue;
      if (!i.complete) await new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 1500); });
      // an SVG with only a viewBox reports naturalWidth 0 even when it paints,
      // so decode() is the honest test of whether the bytes are usable
      let ok = true;
      try { await i.decode(); } catch { ok = false; }
      if (!ok) out.push(i.getAttribute('src'));
    }
    return out;
  });
  if (broken.length || http.length) {
    bad++;
    console.log(page, '\n   broken:', broken, http.length ? '\n   http: ' + http.join(', ') : '');
  }
}
console.log(bad ? `\n${bad}/${pages.length} pages have an image that does not render`
                : `all images render on ${pages.length} pages`);
await b.close();
process.exit(bad ? 1 : 0);

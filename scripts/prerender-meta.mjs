// Runs after `vite build`. Writes one HTML file per route with its own title, description and canonical,
// so crawlers and link previews get page-specific metadata without running JavaScript.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://prismconsulting.org';
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const routes = JSON.parse(readFileSync(new URL('../src/content/routes.json', import.meta.url), 'utf8'));
const shell = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const fill = (r, robots = 'index, follow, max-image-preview:large') => shell
  .split('__TITLE__').join(esc(r.title))
  .split('__DESC__').join(esc(r.description))
  .split('__URL__').join(SITE + r.path)
  .split('__ROBOTS__').join(robots);

for (const r of routes) {
  const dir = join(dist, r.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), fill(r));
}
writeFileSync(join(dist, '404.html'), fill({ path: '/404/', title: 'Page not found – Prism Consulting', description: 'The page you were looking for could not be found.' }, 'noindex'));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
console.log(`Pre-rendered metadata for ${routes.length} routes + 404.html + sitemap.xml`);

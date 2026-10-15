import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { discover } from './catalog.mjs';
import { buildThumbnails } from './thumbnails.mjs';
import { catalogIndex } from '../dist/catalog-tools.js';
const root = fileURLToPath(new URL('../', import.meta.url));
const families = await discover(root);
if (!families.length) throw new Error('No complete variants found');
const shell = await readFile(path.join(root, 'dist/index.html'), 'utf8');
const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function page(title, description, pathname) {
  const fullTitle = `${title} — design-style-mds`;
  const url = `https://styles.kurtian.dev${pathname}`;
  return shell.replace(/<title>[^<]*<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*(")/g, (_, start, end) => start + escape(description) + end)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, (_, start, end) => start + escape(fullTitle) + end)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
}
// Only generated route output is replaced. Authored assets and source designs are untouched.
await rm(path.join(root, 'dist/styles'), { recursive: true, force: true });
for (const family of families) {
  const dir = path.join(root, 'dist/styles', family.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), page(family.name, family.description, `/styles/${family.slug}`));
  for (const variant of family.variants) {
    await mkdir(path.join(dir, variant.slug), { recursive: true });
    await writeFile(path.join(dir, variant.slug, 'index.html'), page(variant.name, variant.description, `/styles/${family.slug}/${variant.slug}`));
    await writeFile(path.join(root, 'dist', variant.path), variant.markdown);
  }
}
await writeFile(path.join(root, 'dist/catalog.json'), JSON.stringify(catalogIndex(families)));
await writeFile(path.join(root, 'dist/thumbnails.css'), buildThumbnails(await readFile(path.join(root, 'dist/themes.css'), 'utf8'), families));
console.log(`Built ${families.length} families, ${families.flatMap(f=>f.variants).length} variants, and all direct routes.`);

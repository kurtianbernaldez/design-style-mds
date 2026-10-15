import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import { discover, parseDesign } from '../scripts/catalog.mjs';
import {catalogIndex, searchFamilies} from '../dist/catalog-tools.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const families=await discover(root);
const designs=families.flatMap(f=>f.variants);
const expected=['minimalism/clean-product','minimalism/editorial','minimalism/monochrome','brutalism/raw-web','brutalism/editorial','brutalism/colorful','glassmorphism/dark-glass','glassmorphism/light-glass','glassmorphism/vibrant-glass'];
test('all requested families have complete discoverable variants',()=>{
  assert.equal(families.length,43);assert.equal(designs.length,129);
  for (const slug of ['doodle','isometric','gothic','mosaic']) assert.equal(families.find(f=>f.slug===slug)?.variants.length,3);
  assert.deepEqual(designs.slice(0,9).map(v=>`${v.family}/${v.slug}`),expected);
  assert(families.some(f=>f.slug==='solarpunk' && f.variants.some(v=>v.slug==='organic')));
  assert(families.every(f=>f.variants.length>=3));
});
test('metadata parser rejects malformed, duplicate, and path-mismatched files',()=>{
  const sample=designs[0];
  assert.throws(()=>parseDesign('No metadata','minimalism','clean-product'),/frontmatter/);
  assert.throws(()=>parseDesign(sample.markdown,'brutalism','clean-product'),/disagree/);
  assert.throws(()=>parseDesign(sample.markdown.replace('tags:','unknown: test\ntags:'),sample.family,sample.slug),/unsupported/);
  assert.throws(()=>parseDesign(sample.markdown.replace('tags:','name: Duplicate\ntags:'),sample.family,sample.slug),/duplicate/);
});
test('every design covers complete interface behavior with no unresolved placeholders',()=>{
  for(const v of designs){
    for(const heading of ['Core Principles','Color System','Typography','Spacing','Layout and Grid','Components','Buttons','Forms','Cards','Navigation and Menus','Tabs','Modals and Overlays','Badges and Feedback','Icons, Imagery, and Illustration','Data Visualization','Motion and Animation','Interaction States','Responsive Behavior','Accessibility','Implementation Guidance','Do',"Don't"]){
      assert(v.markdown.includes(` ${heading}\n`),`${v.path}: missing ${heading}`);
    }
    assert(!/\b(?:TODO|TO_FILL|TBD)\b/.test(v.markdown),v.path);
    assert(v.markdown.includes('Focus-visible'),`${v.path}: missing focus guidance`);
  }
});
test('built downloads match source byte-for-byte and deep routes have matching titles',async()=>{
  for(const f of families){assert((await readFile(path.join(root,'dist/styles',f.slug,'index.html'),'utf8')).includes(`${f.name} — design-style-mds`));}
  for(const v of designs){
    assert.equal(await readFile(path.join(root,'dist',v.path),'utf8'),v.markdown);
    assert((await readFile(path.join(root,'dist/styles',v.family,v.slug,'index.html'),'utf8')).includes(`${v.name} — design-style-mds`));
  }
  const index = await readFile(path.join(root,'dist/catalog.json'),'utf8');
  assert.deepEqual(JSON.parse(index),catalogIndex(families));
  assert(Buffer.byteLength(index)<100_000,'Homepage metadata must not embed full source documents');
});
test('search matches family, variant, and tags while sorting preserves the catalog',()=>{
  const index = catalogIndex(families), original = JSON.stringify(index);
  assert(searchFamilies(index,'  SKETCHBOOK  ').some(f=>f.slug==='doodle'));
  assert.deepEqual(searchFamilies(index,'axonometric').map(f=>f.slug),['isometric']);
  assert(searchFamilies(index,'pointed arches').some(f=>f.slug==='gothic'));
  assert.equal(searchFamilies(index,'no-such-family-xyz').length,0);
  const asc=searchFamilies(index,'','name-asc').map(f=>f.name);
  assert.deepEqual(searchFamilies(index,'','name-desc').map(f=>f.name),[...asc].reverse());
  assert.equal(searchFamilies(index,'   ').length,families.length);
  assert.equal(JSON.stringify(index),original);
});
test('all variants have unique names, source bodies, and actual preview captures',async()=>{
  const names = new Set(), bodies = new Set(), captures = new Set();
  for(const v of designs) {
    const name = v.name.toLowerCase();
    const body = v.markdown.split('---').slice(2).join('---').replace(/^# .+$/m,'').trim();
    assert(!names.has(name),v.path+' repeats a name'); names.add(name);
    assert(!bodies.has(body),v.path+' repeats a document'); bodies.add(body);
    const image=await readFile(path.join(root,'dist/assets/previews',`${v.family}--${v.slug}.webp`));
    assert.equal(image.toString('ascii',8,12),'WEBP');
    const hash=createHash('sha256').update(image).digest('hex');
    assert(!captures.has(hash),v.path+' repeats a preview capture'); captures.add(hash);
  }
});
test('deep routes publish matching canonical and social metadata',async()=>{
  for(const f of families) {
    for(const entry of [f,...f.variants]) {
      const route=entry===f?`/styles/${f.slug}`:`/styles/${f.slug}/${entry.slug}`;
      const html=await readFile(path.join(root,'dist',route,'index.html'),'utf8');
      assert(html.includes(`<link rel="canonical" href="https://styles.kurtian.dev${route}">`));
      assert(html.includes(`<meta property="og:url" content="https://styles.kurtian.dev${route}">`));
      assert(html.includes(`<meta property="og:title" content="${entry.name} — design-style-mds">`));
    }
  }
});
function luminance(hex){const rgb=hex.replace('#','').match(/../g).map(c=>parseInt(c,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
test('documented opaque text and control token pairs meet their contrast targets',()=>{
  for(const v of designs){const tokens=Object.fromEntries([...v.markdown.matchAll(/^\| `([a-z-]+)` \| `(#[0-9a-f]{6})`/gm)].map(m=>[m[1],m[2]]));
    for(const name of ['ink','muted','error','success','warning']) assert(contrast(tokens[name],tokens.surface)>=4.5,`${v.path}: ${name}/surface`);
    assert(contrast(tokens['on-accent'],tokens.accent)>=4.5,`${v.path}: action label`);
    assert(contrast(tokens['control-line'],tokens.surface)>=3,`${v.path}: control boundary`);
  }
});
test('actual glass recipes preserve readable text across every bounded environment color',async()=>{
  const css=await readFile(path.join(root,'dist/identities.css'),'utf8');
  for(const v of designs.filter(v=>v.family==='glassmorphism')){
    const selector=`[data-theme="glassmorphism/${v.slug}"]`;
    const body=css.slice(css.indexOf(selector+' {')+selector.length).split('}')[0];
    const match=body.match(/--glass:rgb\((\d+) (\d+) (\d+) \/ ([.\d]+)\)/);
    assert(match,`${v.path}: no actual transparent recipe`);
    const alpha=Number(match[4]);assert(alpha<.6 && alpha>.2,`${v.path}: effectively opaque`);
    const env=body.match(/--environment:([^;]+)/)[1];
    const endpoints=[...env.matchAll(/#[0-9a-f]{6}/g)].map(m=>m[0]);assert(endpoints.length>=3);
    const tokens=Object.fromEntries([...v.markdown.matchAll(/^\| `([a-z-]+)` \| `(#[0-9a-f]{6})`/gm)].map(m=>[m[1],m[2]]));
    for(const bg of endpoints){
      const base=bg.slice(1).match(/../g).map(x=>parseInt(x,16));
      const composite='#'+base.map((c,i)=>Math.round(Number(match[i+1])*alpha+c*(1-alpha)).toString(16).padStart(2,'0')).join('');
      for(const fg of ['ink','muted']) assert(contrast(tokens[fg],composite)>=4.5,`${v.path}: ${fg} on composite over ${bg}`);
      for(const fg of ['ink','muted']) assert(contrast(tokens[fg],bg)>=4.5,`${v.path}: ${fg} on unpaneled environment ${bg}`);
    }
  }
});
test('showcase anchor targets and ARIA references resolve, and local assets exist',async()=>{
  for(const file of ['index.html','preview.html']){
    const html=await readFile(path.join(root,'dist',file),'utf8');const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`${file}: duplicate IDs`);
    for(const match of html.matchAll(/(?:aria-controls|aria-labelledby|for)="([^"]+)"/g)){for(const id of match[1].split(' '))assert(ids.includes(id),`${file}: missing ${id}`);}
    for(const match of html.matchAll(/(?:src|href)="(\/[a-z]+\.(?:js|css))"/g))assert((await readFile(path.join(root,'dist',match[1]))).length>0);
    for(const match of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(match[1]),`${file}: missing anchor ${match[1]}`);
  }
});
test('license retains the original MIT notice',async()=>{
  const license=await readFile(path.join(root,'LICENSE'),'utf8');assert(license.includes('Copyright (c) 2026 VoltAgent'));assert(license.includes('Permission is hereby granted'));
});
test('server returns root, every family and variant, Markdown, assets, and real 404s',async()=>{
  const {handleRequest}=await import('../scripts/serve.mjs');
  async function request(url){let status,headers,body;await handleRequest({url,method:'GET'},{writeHead(s,h){status=s;headers=h;},end(value){body=String(value);}});return {status,headers,body};}
  for(const route of ['/', '/app.js','/preview.html','/themes.css',...families.map(f=>`/styles/${f.slug}`),...designs.flatMap(v=>[`/styles/${v.family}/${v.slug}`,`/${v.path}`])]){
    const response=await request(route);assert.equal(response.status,200,route);assert(response.body.length>0,route);
  }
  assert.equal((await request('/styles/unknown-family')).status,404);
  assert.equal((await request('/styles/minimalism/missing')).status,404);
  assert.equal((await request('/..%2fLICENSE')).status,403);
  assert.equal((await request('/%zz')).status,400);
});
test('every style directory has a complete file and every landing card has a real theme',async()=>{
  const directories=(await readdir(path.join(root,'styles'),{withFileTypes:true})).filter(d=>d.isDirectory());
  const thumbs=await readFile(path.join(root,'dist/thumbnails.css'),'utf8');
  for(const dir of directories){
    const family=families.find(f=>f.slug===dir.name);assert(family,`${dir.name}: unfinished family`);
    assert(thumbs.includes(`[data-card-theme="${family.slug}/${family.variants[0].slug}"]`),`${dir.name}: missing thumbnail`);
    const image=await readFile(path.join(root,'dist/assets/previews',`${family.slug}--${family.variants[0].slug}.webp`));
    assert.equal(image.toString('ascii',0,4),'RIFF');assert.equal(image.toString('ascii',8,12),'WEBP');assert(image.length>1000);
    assert(!(await readFile(path.join(root,'styles',dir.name,'README.md'),'utf8')).includes('Planned family'));
  }
});

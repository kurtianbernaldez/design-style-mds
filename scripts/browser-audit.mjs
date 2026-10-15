// Local, dependency-free visual review. Start Chrome with remote debugging on 9222.
// npm run build; node scripts/browser-audit.mjs [before|after|thumbnails]
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const mode=process.argv[2]||'after';
const origin=process.env.PREVIEW_ORIGIN||'http://127.0.0.1:4173';
const catalog=JSON.parse(await readFile(new URL('../dist/catalog.json',import.meta.url)));
// The browser receives only metadata; audit expectations come from authored files.
await Promise.all(catalog.flatMap(f=>f.variants).map(async v=>{
  v.markdown=await readFile(new URL('../'+v.path,import.meta.url),'utf8');
}));
const list=catalog.flatMap(f=>f.variants).filter(v=>!process.argv[3] || process.argv[3].split(",").some(prefix=>`${v.family}/${v.slug}`.startsWith(prefix)));
const debugOrigin=process.env.CHROME_DEBUG_ORIGIN||'http://127.0.0.1:9222';
const {webSocketDebuggerUrl}=await (await fetch(`${debugOrigin}/json/new?about:blank`,{method:'PUT'})).json();
const socket=new WebSocket(webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map(),errors=[];
socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text);if(m.method==='Network.responseReceived' && m.params.response.status>=400 && !m.params.response.url.endsWith('/favicon.ico')) errors.push(m.params.response.status+' '+m.params.response.url);});
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});socket.send(JSON.stringify({id:key,method,params}));});
const evaluate=async expression=>(await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true})).result.value;
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
const navigate=async url=>{await send('Page.bringToFront');await send('Page.navigate',{url});for(let i=0;i<100;i++){if(await evaluate(`document.readyState==='complete' && location.href===${JSON.stringify(url)}`))break;await new Promise(r=>setTimeout(r,30));}await evaluate('document.fonts.ready');await new Promise(r=>setTimeout(r,350));};
const out=mode==='thumbnails'?new URL('../dist/assets/previews/',import.meta.url).pathname:`/tmp/design-style-mds-${mode}/`;
await mkdir(out,{recursive:true});const report=[];
try{
for(const v of list){const theme=`${v.family}/${v.slug}`;
 for(const width of (['thumbnails','contrast'].includes(mode)?[1100]:[1100,390,320])){
  await send('Emulation.setDeviceMetricsOverride',{width,height:850,deviceScaleFactor:1,mobile:false});
  await navigate(`${origin}/preview.html?theme=${encodeURIComponent(theme)}`);
  const state=await evaluate(`(()=>({theme:document.documentElement.dataset.theme,width:innerWidth,scroll:document.documentElement.scrollWidth,heading:document.querySelector('h1').textContent,overflows:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width && (r.right>innerWidth+2||r.left< -2)}).slice(0,12).map(e=>e.className)}))()`);
  const contrastIssues=await evaluate(`(()=>{
   const rgba=s=>{const a=s.match(/[\\d.]+/g)?.map(Number);return a?.length>=3?[...a.slice(0,3),a[3]??1]:null};
   const lum=c=>c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
   return [...document.querySelectorAll('.lead,.project-card h2,.project-card>p,.project-rows span,.feature-card h3,.feature-card p,.feature-index,.primary,.secondary,.badge,.caption,.stats strong,.stats>div>span,.demo-tabs button,.price-card p,.demo-form label')].flatMap(e=>{
    if(!e.getBoundingClientRect().width||e.disabled||e.closest('[aria-hidden=true]'))return [];const c=getComputedStyle(e);let n=e,bg;
    while(n){const s=getComputedStyle(n);if(s.backgroundImage!=='none')return [];const b=rgba(s.backgroundColor);if(b&&b[3]===1){bg=b;break}if(b&&b[3]>0)return [];n=n.parentElement}
    const fg=rgba(c.color);if(!bg||!fg)return [];const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);const large=parseFloat(c.fontSize)>=24||(parseFloat(c.fontSize)>=18.66&&parseFloat(c.fontWeight)>=700);return ratio>=(large?3:4.5)-.02?[]:[{element:e.className||e.tagName,text:e.textContent.trim().slice(0,35),ratio:Math.round(ratio*100)/100,fg:c.color,bg:bg.slice(0,3)}];
   });
  })()`);
  state.contrastIssues=contrastIssues;
  if(mode!=="before")assert.equal(contrastIssues.length,0,`${theme}: opaque text contrast ${JSON.stringify(contrastIssues)}`);

  report.push({theme,width,...state});
  if(mode!=='before'){assert.equal(state.theme,theme);assert(state.scroll<=width+1,`${theme} at ${width}: overflow ${state.scroll}: ${state.overflows}`);assert.deepEqual(state.overflows,[],`${theme} at ${width}: clipped content`);}
  if(mode!=='contrast'){
  const shot=await send('Page.captureScreenshot',{format:mode==='thumbnails'?'webp':'png',quality:mode==='thumbnails'?82:undefined,captureBeyondViewport:false});
  await writeFile(`${out}${v.family}--${v.slug}${mode==='thumbnails'?'':`-${width}`}.${mode==='thumbnails'?'webp':'png'}`,Buffer.from(shot.data,'base64'));
  }
  if(mode==='after'){
   if(width===1100){
    await evaluate("document.querySelector('#features').scrollIntoView()");
    const detail=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    await writeFile(`${out}${v.family}--${v.slug}-features.png`,Buffer.from(detail.data,'base64'));
    await evaluate('scrollTo(0,0)');
   }
   const material=await evaluate(`(()=>{const p=getComputedStyle(document.querySelector('.project-card'));const b=getComputedStyle(document.querySelector('.icon-button'));return {blur:p.backdropFilter,shadow:p.boxShadow,border:p.borderTopWidth,buttonShadow:b.boxShadow,fonts:[...document.fonts].map(f=>({name:f.family,status:f.status}))}})()`);
   if(v.family==='glassmorphism')assert.notEqual(material.blur,'none',theme+' must keep glass on mobile');
   if(v.family==='neumorphism'){assert.equal(material.border,'0px');assert.notEqual(material.buttonShadow,'none');}
   const result=await evaluate(`(async()=>{document.querySelector('[data-open]').click();const open=document.querySelector('dialog').open;document.querySelector('#cancel-dialog').click();await new Promise(r=>setTimeout(r,350));document.querySelector('#activity-tab').click();return {open,closed:!document.querySelector('dialog').open,activity:!document.querySelector('#activity').hidden}})()`);assert.deepEqual(result,{open:true,closed:true,activity:true});
  }
 }
 console.log(theme);
}
if(mode!=='thumbnails') await writeFile(`${out}report${process.argv[3] ? "-"+process.argv[3].replaceAll("/","-").replaceAll(",","_") : ""}.json`,JSON.stringify(report,null,2));
if(mode==='after'){
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await navigate(origin+'/styles/minimalism/editorial');
 for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('#showcase')?.contentDocument?.querySelector('#name')"))break;await new Promise(r=>setTimeout(r,30));}
 const originalFrame=await evaluate("window.reviewFrame=document.querySelector('#showcase');reviewFrame.contentDocument.querySelector('#name').value='Kept while comparing';true");
 await evaluate("document.querySelector('[data-variant=monochrome]').click()");await new Promise(r=>setTimeout(r,100));
  await evaluate("document.querySelector('[data-view=source]').click()");
  for(let i=0;i<100;i++){if(await evaluate("document.querySelector('#design-source').textContent.startsWith('---')"))break;await new Promise(r=>setTimeout(r,30));}
 const switched=await evaluate(`({same:reviewFrame===document.querySelector('#showcase'),value:reviewFrame.contentDocument.querySelector('#name').value,theme:reviewFrame.contentDocument.documentElement.dataset.theme,path:document.querySelector('#repo-path').textContent,source:document.querySelector('#design-source').textContent.startsWith('---'),url:location.pathname})`);
 assert.equal(switched.same,true);assert.equal(switched.value,'Kept while comparing');assert.equal(switched.theme,'minimalism/monochrome');assert.equal(switched.path,'styles/minimalism/monochrome/DESIGN.md');assert.equal(switched.source,true);assert.equal(switched.url,'/styles/minimalism/monochrome');
 await send('Browser.grantPermissions',{origin,permissions:['clipboardReadWrite','clipboardSanitizedWrite']});
 await send('Page.bringToFront');
 await evaluate("document.querySelector('#copy-design').click()");await new Promise(r=>setTimeout(r,100));
 assert.equal(await evaluate('navigator.clipboard.readText()'),catalog.find(f=>f.slug==='minimalism').variants.find(v=>v.slug==='monochrome').markdown);
 await evaluate("document.querySelector('#copy-path').click()");await new Promise(r=>setTimeout(r,50));assert.equal(await evaluate('navigator.clipboard.readText()'),'styles/minimalism/monochrome/DESIGN.md');
 await evaluate("document.querySelector('#copy-instruction').click()");await new Promise(r=>setTimeout(r,50));assert((await evaluate('navigator.clipboard.readText()')).includes('styles/minimalism/monochrome/DESIGN.md'));
 await evaluate("document.querySelector('[data-view=source]').click()");assert(await evaluate("!document.querySelector('#source-wrap').hidden"));
 await evaluate('history.back()');await new Promise(r=>setTimeout(r,100));assert.equal(await evaluate("document.querySelector('#repo-path').textContent"),'styles/minimalism/editorial/DESIGN.md');
 // Every family must switch all its variants without replacing the shared iframe.
 for(const family of catalog){
  await navigate(origin+'/styles/'+family.slug+'/'+family.variants[0].slug);
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('#showcase')?.contentDocument?.querySelector('#name')"))break;await new Promise(r=>setTimeout(r,30));}
  await evaluate("window.comparisonFrame=document.querySelector('#showcase');comparisonFrame.contentDocument.querySelector('#name').value='Comparison state'");
  await evaluate("document.querySelector('[data-view=source]').click()");
  for(const variant of family.variants){
   await evaluate(`document.querySelector('[data-variant="${variant.slug}"]').click()`);await new Promise(r=>setTimeout(r,40));
   for(let i=0;i<100;i++){if(await evaluate(`document.querySelector('#design-source').textContent.includes(${JSON.stringify('slug: '+variant.slug+'\n')})`))break;await new Promise(r=>setTimeout(r,30));}
   const actual=await evaluate(`({same:comparisonFrame===document.querySelector('#showcase'),theme:comparisonFrame.contentDocument.documentElement.dataset.theme,family:comparisonFrame.contentDocument.documentElement.dataset.family,value:comparisonFrame.contentDocument.querySelector('#name').value,path:document.querySelector('#repo-path').textContent,source:document.querySelector('#design-source').textContent,name:document.querySelector('#variant-name').textContent})`);
   const sourceMatches=actual.source===variant.markdown;delete actual.source;assert(sourceMatches,variant.path+' source content must match');
   assert.deepEqual(actual,{same:true,theme:family.slug+'/'+variant.slug,family:family.slug,value:'Comparison state',path:variant.path,name:variant.name});
  }
 }
 await navigate(origin+'/styles/neumorphism/soft-relief');await new Promise(r=>setTimeout(r,250));
 const familyShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(out+'family-page.png',Buffer.from(familyShot.data,'base64'));
 await navigate(origin+'/');await new Promise(r=>setTimeout(r,250));
 const homeShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(out+'landing-page.png',Buffer.from(homeShot.data,'base64'));
 assert.equal(await evaluate("document.querySelectorAll('.family-card').length"),catalog.length);
 // A real thumbnail must exist for every card, including below-the-fold lazy images.
 for(const image of await evaluate("[...document.querySelectorAll('.family-preview')].map(i=>i.src)")){assert.equal((await fetch(image)).status,200,image);}
}
assert.deepEqual(errors,[]);
if(mode!=='thumbnails') await writeFile(`${out}report${process.argv[3] ? "-"+process.argv[3].replaceAll("/","-").replaceAll(",","_") : ""}.json`,JSON.stringify(report,null,2));
console.log(`Reviewed ${list.length} variants; saved ${out}`);
}finally{await send('Page.close');socket.close();}

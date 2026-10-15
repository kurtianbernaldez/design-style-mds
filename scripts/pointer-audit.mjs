// Local Chrome with a fine desktop pointer (port 9223) + the existing preview server.
// Chrome flags: --headless --remote-debugging-port=9223
// --blink-settings=primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2
// node scripts/pointer-audit.mjs [optional family prefix]
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {pointerProfiles} from '../dist/pointer-profiles.js';
const origin=process.env.PREVIEW_ORIGIN||'http://127.0.0.1:4173';
const chrome=process.env.CHROME_DEBUG_ORIGIN||'http://127.0.0.1:9223';
const {webSocketDebuggerUrl}=await (await fetch(chrome+'/json/new?about:blank',{method:'PUT'})).json();
const socket=new WebSocket(webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map(),errors=[];
socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);if(m.method==='Network.responseReceived'&&m.params.response.status>=400&&!m.params.response.url.endsWith('/favicon.ico'))errors.push(m.params.response.url);});
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});socket.send(JSON.stringify({id:key,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});assert(!r.exceptionDetails,JSON.stringify(r.exceptionDetails));return r.result.value;};
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const settle=()=>evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
async function navigate(path){await send('Page.navigate',{url:origin+path});for(let n=0;n<100;n++){if(await evaluate(`location.href===${JSON.stringify(origin+path)} && !!document.documentElement?.dataset.pointerEffects`))break;await new Promise(r=>setTimeout(r,25));}await evaluate('document.fonts.ready');await settle();}
async function move(x,y){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y});await settle();}
async function region(selector){await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`);await settle();return evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.left+r.width*.55,y:r.top+r.height*.45,width:r.width,height:r.height}})()`);}
const shapes=(mode='page')=>evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(mode==='surface'?'.pointer-effect:not(.pointer-field)':'.pointer-field')});if(!e)return null;const c=getComputedStyle(e,'::before');return {count:document.querySelectorAll(${JSON.stringify(mode==='surface'?'.pointer-effect:not(.pointer-field)':'.pointer-field')}).length,recipe:e.dataset.recipe,x:e.style.getPropertyValue('--px'),y:e.style.getPropertyValue('--py'),display:getComputedStyle(e).display,pointerEvents:getComputedStyle(e).pointerEvents,opacity:c.opacity,width:c.width,background:c.backgroundImage,border:c.borderTopWidth,shadow:c.boxShadow,clip:c.clipPath,hidden:e.getAttribute('aria-hidden')}})()`);
const rects=selector=>evaluate(`JSON.stringify([...document.querySelector(${JSON.stringify(selector)}).children].filter(e=>!e.matches('.pointer-effect,.liquid-body')).map(e=>{const r=e.getBoundingClientRect();return{tag:e.tagName,x:r.x,y:r.y,width:r.width,height:r.height}}))`);
const out='/tmp/design-style-mds-pointer/';await mkdir(out,{recursive:true});
const report=[],kinetics=[];let originalPreference;
const flow=()=>evaluate(`(()=>{const e=document.querySelector('.pointer-field');return {speed:Number(e?.style.getPropertyValue('--speed')||0),stretch:Number(e?.style.getPropertyValue('--flow-stretch')||1),running:document.documentElement.hasAttribute('data-pointer-animating'),x:Number(e?.style.getPropertyValue('--px').replace('px','')||0)}})()`);
async function screenshot(name){const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});if(name)await writeFile(out+name+'.png',Buffer.from(shot.data,'base64'));return shot.data;}
async function sweep(delay){
 await move(220,330);await wait(1450);let peak=0;
 for(let step=1;step<=8;step++){await wait(delay);await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:220+step*62,y:330});peak=Math.max(peak,(await flow()).speed);}
 await wait(80);peak=Math.max(peak,(await flow()).speed);return peak;
}
try {
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
 await send('Emulation.setTouchEmulationEnabled',{enabled:false});
 await send('Emulation.setEmitTouchEventsForMouse',{enabled:false,configuration:'desktop'});
 await send('Emulation.setEmulatedMedia',{features:[{name:'hover',value:'hover'},{name:'pointer',value:'fine'}]});
 await send('Emulation.setDeviceMetricsOverride',{width:1100,height:950,deviceScaleFactor:1,mobile:false});
 await navigate('/preview.html');originalPreference=await evaluate("localStorage.getItem('design-pointer-effects')");await evaluate("localStorage.removeItem('design-pointer-effects')");
 for(const [theme,profile] of Object.entries(pointerProfiles).filter(([t])=>!process.argv[2]||t.startsWith(process.argv[2]))) {
  await navigate('/preview.html?theme='+encodeURIComponent(theme));
  assert.equal(await evaluate('document.documentElement.dataset.pointerMode'),profile.mode,theme+' curated mode');
  if(profile.family==='liquid-glass'){
   await move(450,330);assert.equal(await evaluate("document.querySelectorAll('.pointer-effect,.water-drop').length"),0,'Liquid Glass uses its controls, not a cursor overlay');
   assert(await evaluate("document.querySelector('.workspace-controls>.liquid-body')"));report.push({theme,mode:profile.mode,materialController:true});continue;
  }
  if(profile.mode==='none'){
   assert.equal(await evaluate('document.documentElement.dataset.pointerEffects'),'off',theme+' quiet mode');
   await move(450,330);assert.equal(await evaluate('document.querySelectorAll(".pointer-effect").length'),0,theme+' no tracking decoration');
   assert(await evaluate('document.querySelector("#pointer-toggle").disabled'),theme+' quiet control stays disabled');
   assert(await evaluate('document.querySelector(".pointer-preferences").hidden'),theme+' no unusable preference panel');
   report.push({theme,mode:profile.mode,regions:0});continue;
  }
  assert.equal(await evaluate('document.documentElement.dataset.pointerEffects'),'on',theme+' effects available: '+await evaluate("document.querySelector('#pointer-description').textContent"));
  for(const selector of ['.project-card','.stats','.feature-card']) {
   const r=await region(selector);await move(1,1);const before=await rects(selector);
   await move(r.x,r.y);const a=await shapes(profile.mode);
   assert(a,theme+' '+selector+' must respond');assert.equal(a.recipe,profile.recipe);assert.equal(a.count,1);assert.equal(a.pointerEvents,'none');assert.equal(a.hidden,'true');assert.notEqual(a.display,'none');assert(Number(a.opacity)>0);assert(parseFloat(a.width)>0);
   assert(await evaluate('document.querySelectorAll(".pointer-effect").length<=2'),theme+' bounds decoration count');
   assert.equal(await rects(selector),before,theme+' pointer must not move '+selector+' content');
   await move(r.x+Math.max(31,profile.grid+5),r.y+Math.max(31,profile.grid+5));const b=await shapes(profile.mode);
   assert(b.x!==a.x||b.y!==a.y,theme+' coordinates must respond');
   if(selector==='.project-card' && ['glassmorphism','neumorphism','pixel-art','brutalism'].includes(profile.family)) {
    const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(out+theme.replace('/','--')+'.png',Buffer.from(shot.data,'base64'));
   }
   await move(2,130);
   if(profile.mode==='page')assert(await shapes(),theme+' responds in page margins, outside columns');
   else assert.equal(await shapes(),null,theme+' local material does not add a page follower');
   await evaluate("document.documentElement.dispatchEvent(new PointerEvent('pointerleave'))");assert.equal(await shapes(profile.mode),null,theme+' resets on preview exit');
  }
  report.push({theme,recipe:profile.recipe,mode:profile.mode,regions:3});
 }
 // Test actual speed-dependent input on all optical variants, regardless of the optional family filter.
 for(const theme of Object.keys(pointerProfiles).filter(theme=>/^glassmorphism\//.test(theme))){
  await navigate('/preview.html?theme='+theme);await evaluate('scrollTo(0,0)');await settle();
  const slow=await sweep(85),fast=await sweep(10),moving=await flow();
  assert(fast>slow+.04,theme+' faster input must produce stronger material response: '+JSON.stringify({slow,fast}));
  assert(moving.stretch>1.02,theme+' moving glass exposes speed-dependent geometry');
  assert(moving.running,theme+' inertia continues briefly after input');
  await screenshot(theme.replace('/','--')+'-fast');
  await wait(1900);const still=await flow();
  assert.equal(still.running,false,theme+' animation must stop after settling');
  assert(still.speed<=.001&&Math.abs(still.stretch-1)<.001,theme+' material returns to rest');
  await move(12,260);await wait(1500);assert(await shapes(),theme+' page margin lens remains visible');
  // The field must contribute rendered pixels, not merely exist with nonzero CSS opacity.
  const visible=await screenshot();await evaluate("document.querySelector('.pointer-field').style.visibility='hidden'");await settle();
  const hidden=await screenshot();assert.notEqual(visible,hidden,theme+' page field visibly changes output pixels');
  await evaluate("document.querySelector('.pointer-field').style.removeProperty('visibility')");
  kinetics.push({theme,slow,fast,settled:still});
 }
 // Use actual pointer input to open/close a dialog through the decoration.
 await navigate('/preview.html?theme=glassmorphism/dark-glass');
 await evaluate("document.querySelector('[data-open]').scrollIntoView({block:'center'})");
 const b=await evaluate("(()=>{const r=document.querySelector('[data-open]').getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()");
 await move(b.x,b.y);
 for(const type of ['mousePressed','mouseReleased'])await send('Input.dispatchMouseEvent',{type,button:'left',clickCount:1,...b});
 await settle();assert(await evaluate("document.querySelector('dialog').open"));assert.equal(await shapes(),null,'dialog open clears old reflection');
 const d=await region('dialog');await move(d.x,d.y);assert(await shapes());
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await settle();assert.equal(await shapes(),null);assert.equal(await evaluate("document.querySelector('dialog').open"),false);
 assert(await evaluate("document.activeElement.matches('[data-open]')"),'dialog restores focus');
 const r=await region('.project-card');await move(r.x,r.y);
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await settle();assert.equal(await shapes(),null);assert.equal(await evaluate('document.documentElement.dataset.pointerEffects'),'off');await move(r.x+10,r.y);assert.equal(await shapes(),null);
 await send('Emulation.setEmulatedMedia',{features:[{name:'forced-colors',value:'active'}]});await settle();assert.equal(await evaluate('document.documentElement.dataset.pointerEffects'),'off');
 await send('Emulation.setEmulatedMedia',{features:[]});await settle();
 await evaluate("document.querySelector('#pointer-toggle').click()");await move(r.x+20,r.y);assert.equal(await shapes(),null);
 await navigate('/preview.html?theme=neumorphism/soft-relief');assert.equal(await evaluate('document.documentElement.dataset.pointerEffects'),'off','preference persists');
 await evaluate("document.querySelector('#pointer-toggle').click()");const n=await region('.project-card');await move(n.x,n.y);assert(await shapes('surface'));
 await evaluate('scrollBy(0,20)');await settle();assert.equal(await shapes('surface'),null,'scroll resets');
 await send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});await send('Emulation.setDeviceMetricsOverride',{width:390,height:850,deviceScaleFactor:1,mobile:true});await settle();
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:120,y:200}]});await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await settle();
 assert.equal(await shapes(),null,'touch has no page decoration');assert.equal(await shapes('surface'),null,'touch has no local pointer decoration');assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
 await send('Emulation.setTouchEmulationEnabled',{enabled:false});await send('Emulation.setDeviceMetricsOverride',{width:1100,height:950,deviceScaleFactor:1,mobile:false});
 // Family switching must replace the effect profile without replacing the iframe.
 await send('Page.navigate',{url:origin+'/styles/glassmorphism/dark-glass'});
 for(let i=0;i<100;i++){if(await evaluate("document.querySelector('#showcase')?.contentDocument?.documentElement?.dataset.pointerEffects"))break;await new Promise(r=>setTimeout(r,30));}
 await evaluate("window.sameFrame=document.querySelector('#showcase');sameFrame.contentDocument.querySelector('#name').value='Still here';document.querySelector('[data-variant=light-glass]').click()");await settle();
 assert(await evaluate("sameFrame===document.querySelector('#showcase') && sameFrame.contentDocument.documentElement.dataset.theme==='glassmorphism/light-glass' && sameFrame.contentDocument.querySelector('#name').value==='Still here' && sameFrame.contentDocument.documentElement.dataset.pointerMode==='page'"));
 assert.deepEqual(errors,[]);await writeFile(out+'report.json',JSON.stringify({variants:report,kinetics,checks:['curated page/surface/none modes','real mouse input','no content displacement','bounded decoration count','pointer exit','dialog and focus','reduced motion','forced colors','persistent opt-out','scroll cleanup','touch','same iframe switching','slow versus fast glass sweeps','settling without idle frames','visible page margin pixels'],errors},null,2));
 const active=report.filter(variant=>variant.mode!=='none').length;
 console.log(`Passed pointer audit: ${report.length} curated variants (${active} with tracking × 3 regions), Glassmorphism speed/settling checks, input and preferences. Screenshots: ${out}`);
} finally {
 if(originalPreference!==undefined)await evaluate(originalPreference===null?"localStorage.removeItem('design-pointer-effects')":`localStorage.setItem('design-pointer-effects',${JSON.stringify(originalPreference)})`);
 await send('Page.close');socket.close();
}

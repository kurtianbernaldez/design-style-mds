// Dependency-free browser checks for discovery, navigation, and lazy source loading.
// Start the local preview and Chrome with debugging on 9222 (see README).
import assert from 'node:assert/strict';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
const origin = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4173';
const debug = process.env.CHROME_DEBUG_ORIGIN || 'http://127.0.0.1:9222';
const catalog = JSON.parse(await readFile(new URL('../dist/catalog.json', import.meta.url)));
const out = '/tmp/design-style-mds-library-audit/';
await mkdir(out, {recursive: true});
const {webSocketDebuggerUrl} = await (await fetch(debug + '/json/new?about:blank', {method: 'PUT'})).json();
const socket = new WebSocket(webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, {once: true}));
let id = 0;
const pending = new Map(), errors = [], requests = [], checks = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const promise = pending.get(message.id); pending.delete(message.id);
    message.error ? promise.reject(message.error) : promise.resolve(message.result);
  }
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  if (message.method === 'Network.requestWillBeSent') requests.push(message.params.request.url);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const key = ++id; pending.set(key, {resolve, reject}); socket.send(JSON.stringify({id: key, method, params}));
});
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(expression) {
  for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await pause(40); }
  throw new Error('Timed out: ' + expression);
}
async function navigate(path, ready) {
  await send('Page.navigate', {url: origin + path});
  await until(`location.href === ${JSON.stringify(origin + path)} && document.readyState === 'complete' && (${ready})`);
  await evaluate('document.fonts.ready');
}
async function screenshot(name) {
  const capture = await send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false});
  await writeFile(out + name + '.png', Buffer.from(capture.data, 'base64'));
}
const click = selector => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
try {
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Emulation.setDeviceMetricsOverride', {width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false});
  await navigate('/', "!!document.querySelector('#family-search')");
  assert.equal(await evaluate("document.querySelectorAll('.family-card').length"), catalog.length);
  assert(!requests.some(url => url.endsWith('/DESIGN.md')), 'Home must not download source documents');
  await screenshot('home-desktop');
  await evaluate("document.querySelector('#family-search').value='AXONOMETRIC';document.querySelector('#family-search').dispatchEvent(new Event('input'))");
  assert.deepEqual(await evaluate("[...document.querySelectorAll('.family-title h3')].map(e=>e.textContent)"), ['Isometric']);
  assert.equal(await evaluate("new URLSearchParams(location.search).get('q')"), 'AXONOMETRIC');
  await evaluate("document.querySelector('#family-sort').value='name-desc';document.querySelector('#family-sort').dispatchEvent(new Event('change'))");
  await click('#family-isometric');
  await until("document.activeElement.tagName === 'H1' && scrollY === 0");
  await click('.back-link');
  await until("!!document.querySelector('#family-search')");
  assert.equal(await evaluate("document.querySelector('#family-search').value"), 'AXONOMETRIC');
  assert.equal(await evaluate("document.querySelector('#family-sort').value"), 'name-desc');
  await evaluate("document.querySelector('#family-search').value='no-such-family-xyz';document.querySelector('#family-search').dispatchEvent(new Event('input'))");
  assert(await evaluate("!document.querySelector('.empty-results').hidden && document.querySelectorAll('.family-card').length===0"));
  await click('#clear-search');
  assert.equal(await evaluate('document.activeElement.id'), 'family-search');
  assert.equal(await evaluate("document.querySelectorAll('.family-card').length"), catalog.length);
  await navigate('/?q=sketch&sort=name-asc', "!!document.querySelector('#family-search')");
  assert.equal(await evaluate("document.querySelector('#family-search').value"), 'sketch');
  checks.push('Search, sort, empty results, clear, shareable URL, and return to filtered collection');

  await navigate('/', "!!document.querySelector('#family-mosaic')");
  await evaluate("document.querySelector('#family-mosaic').focus();document.querySelector('#family-mosaic').scrollIntoView({block:'center'})");
  const previousY = await evaluate('scrollY');
  await click('#family-mosaic'); await until("document.activeElement.tagName === 'H1' && scrollY === 0");
  await evaluate('history.back()');
  await until("document.activeElement.id === 'family-mosaic'");
  assert(Math.abs(await evaluate('scrollY') - previousY) < 3, 'Back restores collection scroll');
  assert.equal(await evaluate("document.querySelector('#family-mosaic').tabIndex"), 0);
  checks.push('Route focus, scroll reset, browser Back scroll and keyboard focus restoration');

  await navigate('/styles/doodle/sketchbook', "!!document.querySelector('#showcase')?.contentDocument?.querySelector('#name')");
  await until("document.querySelector('#showcase').contentDocument.documentElement.dataset.pointerMode==='none'");
  assert(await evaluate("document.querySelector('#showcase').contentDocument.querySelector('.pointer-preferences').hidden"));
  const sourceRequests = requests.filter(url => url.endsWith('/DESIGN.md')).length;
  await click('[data-view="source"]');
  await until("document.querySelector('#design-source').textContent.startsWith('---')");
  const expected = await readFile(new URL('../styles/doodle/sketchbook/DESIGN.md', import.meta.url), 'utf8');
  assert.equal(await evaluate("document.querySelector('#design-source').textContent"), expected);
  await click('[data-view="preview"]'); await click('[data-view="source"]');
  await until("document.querySelector('#design-source').textContent.startsWith('---')");
  assert.equal(requests.filter(url => url.endsWith('/DESIGN.md')).length - sourceRequests, 1, 'Cache selected Markdown');
  await evaluate("window.savedFrame=document.querySelector('#showcase');savedFrame.contentDocument.querySelector('#name').value='Retained'");
  await click('[data-variant="whiteboard"]'); await click('[data-variant="field-notes"]');
  await until("document.querySelector('#design-source').textContent.includes('slug: field-notes')");
  assert(await evaluate("savedFrame===document.querySelector('#showcase') && savedFrame.contentDocument.querySelector('#name').value==='Retained'"));
  await evaluate("document.querySelector('[data-variant=field-notes]').focus()");
  await send('Input.dispatchKeyEvent', {type: 'keyDown', key: 'Home', code: 'Home'});
  await send('Input.dispatchKeyEvent', {type: 'keyUp', key: 'Home', code: 'Home'});
  await until("document.querySelector('[data-variant=sketchbook]').getAttribute('aria-selected')==='true'");
  assert.equal(await evaluate('document.activeElement.id'), 'tab-sketchbook');
  checks.push('Lazy Markdown, exact content, cache, rapid switching, preserved input, keyboard tabs');
  await navigate('/preview.html?theme=glassmorphism%2Fdark-glass', "!!document.querySelector('#pointer-toggle')");
  assert(await evaluate("!document.querySelector('.pointer-preferences').hidden"));
  checks.push('Unused pointer preferences hidden; active material preferences remain visible');

  await navigate('/styles/isometric/floating-blocks', "!!document.querySelector('#copy-design')");
  await evaluate("window.savedFetch=window.fetch;window.fetch=(...args)=>String(args[0]).endsWith('floating-blocks/DESIGN.md')?new Promise(resolve=>setTimeout(resolve,400)).then(()=>window.savedFetch(...args)):window.savedFetch(...args)");
  await click('[data-view="source"]'); await click('[data-variant="exploded-layers"]');
  await until("document.querySelector('#design-source').textContent.includes('slug: exploded-layers')");
  await pause(600);
  assert(await evaluate("document.querySelector('#design-source').textContent.includes('slug: exploded-layers')"));
  checks.push('Late source responses cannot overwrite the selected variant');

  await navigate('/styles/gothic/cathedral', "!!document.querySelector('#copy-design')");
  await send('Network.setBlockedURLs', {urls: ['*gothic/cathedral/DESIGN.md']});
  await click('[data-view="source"]');
  await until("!document.querySelector('#retry-source').hidden");
  await send('Network.setBlockedURLs', {urls: []});
  await evaluate("document.querySelector('#retry-source').focus()");
  await click('#retry-source');
  await until("document.querySelector('#design-source').textContent.includes('slug: cathedral')");
  assert.equal(await evaluate('document.activeElement.id'), 'design-source');
  await evaluate("window.originalClipboard=navigator.clipboard.writeText;window.originalExec=document.execCommand;navigator.clipboard.writeText=()=>Promise.reject(new Error('Audit clipboard denied'));document.execCommand=()=>false");
  await click('#copy-design'); await until("!!document.querySelector('.manual-copy[open]')");
  assert.equal(await evaluate("document.querySelector('.manual-copy').getAttribute('aria-label')"), 'Copy manually');
  assert((await evaluate("document.querySelector('.manual-copy textarea').value")).includes('slug: cathedral'));
  await click('.manual-copy button');
  await evaluate('navigator.clipboard.writeText=window.originalClipboard;document.execCommand=window.originalExec');
  checks.push('Failed source request recovery and clipboard-denied manual copy');

  for (const width of [1440, 768, 390, 320]) {
    await send('Emulation.setDeviceMetricsOverride', {width, height: 900, deviceScaleFactor: 1, mobile: false});
    for (const path of ['/', '/styles/mosaic/shard-gallery']) {
      await navigate(path, path === '/' ? "!!document.querySelector('#family-search')" : "!!document.querySelector('#showcase')");
      assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `${path}: shell overflow at ${width}`);
      await screenshot(`${path==='/'?'home':'family'}-${width}`);
    }
  }
  // A 1440px display at 200% zoom exposes 720 CSS pixels. Check equivalent reflow.
  await send('Emulation.setDeviceMetricsOverride', {width: 720, height: 500, deviceScaleFactor: 2, mobile: false});
  for (const path of ['/', '/styles/doodle/sketchbook', '/preview.html?theme=gothic%2Fcathedral', '/preview.html?theme=isometric%2Ffloating-blocks', '/preview.html?theme=mosaic%2Ftessera-court']) {
    await navigate(path, path==='/' ? "!!document.querySelector('#family-search')" : path.startsWith('/styles/') ? "!!document.querySelector('#showcase')" : "!!document.querySelector('#name')");
    assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), path+' at 200% equivalent reflow');
  }
  checks.push('200% equivalent reflow at 720 CSS pixels and device scale 2');
  await send('Emulation.setDeviceMetricsOverride', {width: 320, height: 900, deviceScaleFactor: 1, mobile: false});
  await navigate('/', "!!document.querySelector('#family-search')");
  await evaluate("document.querySelector('.family-title h3').textContent='Averylongunbrokenfamilytitleforalayoutcheck';document.querySelector('#family-search').value='A very long search phrase'");
  assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'));
  await send('Emulation.setEmulatedMedia', {features: [{name: 'prefers-reduced-motion', value: 'reduce'}, {name: 'forced-colors', value: 'active'}]});
  for (const theme of ['doodle/sketchbook','isometric/floating-blocks','gothic/cathedral','mosaic/tessera-court']) {
    await navigate('/preview.html?theme='+encodeURIComponent(theme), "!!document.querySelector('#name')");
    assert(await evaluate("getComputedStyle(document.querySelector('.style-artwork')).display==='none'"));
    await click('[data-open]'); assert(await evaluate("document.querySelector('dialog').open"));
    await send('Input.dispatchKeyEvent', {type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27});
    await send('Input.dispatchKeyEvent', {type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27});
    await until("!document.querySelector('dialog').open");
    await until("document.activeElement.hasAttribute('data-open')");
    assert(await evaluate("getComputedStyle(document.querySelector('.primary')).transitionDuration==='0s'"));
  }
  checks.push('Shell widths 1440/768/390/320, long labels, forced colors, reduced motion, Escape and dialog focus');
  await send('Emulation.setEmulatedMedia', {features: []});
  await navigate('/styles/unknown-family', "!!document.querySelector('.not-found')");
  assert.equal((await fetch(origin+'/styles/unknown-family')).status, 404);
  assert.deepEqual(errors, []);
  await writeFile(out + 'report.json', JSON.stringify({checks, errors}, null, 2));
  console.log(checks.join('\n') + '\nSaved ' + out);
} finally { await send('Page.close'); socket.close(); }

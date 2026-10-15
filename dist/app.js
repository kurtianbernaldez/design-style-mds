import {searchFamilies} from './catalog-tools.js';
const main = document.querySelector('#main');
const feedback = document.querySelector('#feedback');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const label = slug => slug.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join(' ');
let families = [], current, currentFamily, feedbackTimer, sortOrder = 'featured', searchQuery = '', homeLocation = '/';
const sourceCache = new Map();
async function markdownFor(variant) {
  if (!sourceCache.has(variant.path)) {
    sourceCache.set(variant.path, fetch('/' + variant.path).then(response => {
      if (!response.ok) throw new Error('Source unavailable');
      return response.text();
    }).catch(error => { sourceCache.delete(variant.path); throw error; }));
  }
  return sourceCache.get(variant.path);
}
async function showSource() {
  const variant = current;
  const source = document.querySelector('#design-source');
  const retry = document.querySelector('#retry-source');
  source.textContent = 'Loading DESIGN.md…';
  source.setAttribute('aria-busy', 'true');
  if (document.activeElement === retry) source.focus({preventScroll: true});
  retry.hidden = true;
  try {
    const markdown = await markdownFor(variant);
    if (current === variant && source.isConnected) source.textContent = markdown;
  } catch {
    if (current === variant && source.isConnected) {
      source.textContent = 'The source could not load. Check your connection and try again.';
      retry.hidden = false;
    }
  } finally {
    if (current === variant && source.isConnected) source.removeAttribute('aria-busy');
  }
}
function sortedFamilies() {
  return searchFamilies(families, searchQuery, sortOrder);
}
function familyCards(items) {
  return items.map((f,i)=>`<a class="family-card" id="family-${esc(f.slug)}" href="/styles/${esc(f.slug)}" data-route><div class="family-art" data-card-theme="${esc(f.slug)}/${esc(f.variants[0].slug)}"><img class="family-preview" src="/assets/previews/${esc(f.slug)}--${esc(f.variants[0].slug)}.webp" alt="" width="1100" height="850" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async"></div><div class="family-info"><div class="family-title"><h3>${esc(f.name)}</h3><span>${f.variants.length} ${f.variants.length === 1 ? 'variant' : 'variants'}</span></div><p>${esc(f.description)}</p><div class="variant-names">${f.variants.map(v=>`<span>${esc(label(v.slug))}</span>`).join('')}</div><div class="explore-link">Explore ${esc(f.name)} <span aria-hidden="true">↗</span></div></div></a>`).join('');
}
const announce = message => { clearTimeout(feedbackTimer); feedback.textContent = message; feedback.classList.add('visible'); feedbackTimer = setTimeout(()=>feedback.classList.remove('visible'),5000); };
function navigate(url) {
  history.replaceState({...history.state, scrollY, focusId: document.activeElement?.id}, '', location.href);
  history.pushState({},'',url);
  render();
  focusDestination();
}
function focusDestination(restore = false) {
  requestAnimationFrame(() => {
    const saved = restore && history.state;
    const target = (saved?.focusId && document.getElementById(saved.focusId)) || main.querySelector('h1') || main;
    if (target.tabIndex < 0 && !target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({preventScroll: true});
    if (location.hash === '#how-to-use') document.querySelector('#how-to-use')?.scrollIntoView();
    else scrollTo(0, saved?.scrollY || 0);
  });
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[data-route]');
  if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); navigate(link.href); }
});
history.scrollRestoration = 'manual';
window.addEventListener('popstate', () => {
  const previousFamily = currentFamily;
  render();
  if (!currentFamily || previousFamily !== currentFamily) focusDestination(true);
});
function home() {
  currentFamily = null;
  const params = new URLSearchParams(location.search);
  searchQuery = params.get('q') || '';
  sortOrder = ['name-asc', 'name-desc'].includes(params.get('sort')) ? params.get('sort') : 'featured';
  homeLocation = location.pathname + location.search;
  document.title = 'design-style-mds — Visual design library';
  main.innerHTML = `<section class="intro"><p class="eyebrow">THE OPEN DESIGN COLLECTION <span>${families.length} FAMILIES / ${families.flatMap(f=>f.variants).length} SYSTEMS</span></p><div class="intro-row"><h1>Find your<br>visual language<span class="accent-dot">.</span></h1><div class="intro-note"><span class="small-rule"></span><p>A style is a starting point.<br> Find the interpretation that feels right.</p><p class="subtle">Compare the same interface. Choose a complete design system. Make it yours.</p></div></div></section>
  <section class="collection" aria-labelledby="collection-title"><div class="section-label"><h2 id="collection-title">Explore the families</h2><div class="collection-tools"><span>${String(families.length).padStart(2,'0')} collections</span><label class="sort-control"><span>Sort</span><select id="family-sort"><option value="featured">Featured</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option></select></label></div></div><div class="family-grid"></div></section>
  <section id="how-to-use" class="how-to"><div><p class="eyebrow">FROM AN IDEA TO AN INTERFACE</p><h2>A whole system.<br>One Markdown file.</h2><p>Every variant includes typography, color, layout, components, interactions, and accessibility. Take it into your next project.</p></div><ol><li><span>01</span><div><h3>Compare the interpretations</h3><p>Switch variants in one preview. The content stays the same, so the differences are easy to see.</p></div></li><li><span>02</span><div><h3>Choose your direction</h3><p>Read the complete DESIGN.md, then copy or download it.</p></div></li><li><span>03</span><div><h3>Give your agent the system</h3><p>Use the ready-to-copy instruction. Combine systems manually by naming a specific region and its design.</p></div></li></ol></section>`;
  const sort = document.querySelector('#family-sort');
  const tools = document.querySelector('.collection-tools');
  const search = document.createElement('div');
  search.className = 'search-control';
  search.innerHTML = '<label for="family-search">Search styles</label><div><input id="family-search" type="search" placeholder="Try sketch, geometric, or editorial" autocomplete="off" aria-controls="family-results"><button type="button" id="clear-search" hidden>Clear</button></div>';
  tools.before(search);
  const input = search.querySelector('input');
  input.value = searchQuery;
  const grid = document.querySelector('.family-grid');
  grid.id = 'family-results';
  const count = tools.querySelector('span');
  count.id = 'result-count';
  count.setAttribute('role', 'status');
  count.setAttribute('aria-live', 'polite');
  const empty = document.createElement('p');
  empty.className = 'empty-results';
  empty.textContent = 'No styles match. Try a different word or clear your search.';
  grid.after(empty);
  function updateResults(save = true) {
    const items = sortedFamilies();
    grid.innerHTML = familyCards(items);
    count.textContent = searchQuery.trim() ? `${items.length} of ${families.length} families` : `${families.length} families`;
    empty.hidden = items.length > 0;
    search.querySelector('button').hidden = !searchQuery;
    if (save) {
      const next = new URLSearchParams();
      if (searchQuery) next.set('q', searchQuery);
      if (sortOrder !== 'featured') next.set('sort', sortOrder);
      homeLocation = '/' + (next.size ? '?' + next : '');
      history.replaceState(history.state, '', homeLocation);
    }
  }
  input.addEventListener('input', () => { searchQuery = input.value; updateResults(); });
  search.querySelector('button').onclick = () => { searchQuery = input.value = ''; updateResults(); input.focus(); };
  sort.value = sortOrder;
  sort.addEventListener('change',()=>{
    sortOrder = sort.value;
    updateResults();
    announce(sort.options[sort.selectedIndex].text+' order applied');
  });
  updateResults(false);
}
function familyPage(family, variant) {
  const sameFamily = currentFamily === family.slug && document.querySelector('#showcase');
  currentFamily = family.slug;
  if (!sameFamily) {
    main.innerHTML = `<section class="family-heading"><a class="back-link" href="/" data-route>← All styles</a><div class="family-heading-row"><div><p class="eyebrow">DESIGN FAMILY / ${family.variants.length} ${family.variants.length === 1 ? 'INTERPRETATION' : 'INTERPRETATIONS'}</p><h1>${esc(family.name)}</h1></div><p>${esc(family.description)}</p></div></section><div class="comparison-layout"><section class="comparison" aria-label="Compare variants"><div class="variant-tabs" role="tablist" aria-label="${esc(family.name)} variants">${family.variants.map(v=>`<button role="tab" id="tab-${esc(v.slug)}" aria-controls="variant-panel" data-variant="${esc(v.slug)}">${esc(label(v.slug))}</button>`).join('')}</div><section id="variant-panel" role="tabpanel"><div class="preview-toolbar"><div class="view-switch" role="group" aria-label="Content view"><button data-view="preview" aria-pressed="true">Live preview</button><button data-view="source" aria-pressed="false">DESIGN.md</button></div><div class="size-switch" role="group" aria-label="Preview width"><button data-size="full" aria-pressed="true">Fit width</button><button data-size="mobile" aria-pressed="false">Mobile</button></div></div><div id="preview-wrap" class="preview-wrap"><iframe id="showcase" src="/preview.html?theme=${encodeURIComponent(family.slug+'/'+variant.slug)}" title="${esc(variant.name)} interactive preview"></iframe></div><section id="source-wrap" class="source-wrap" aria-label="Complete DESIGN.md" hidden><div class="source-caption">Complete source · ready to copy</div><pre id="design-source" tabindex="0"></pre></section><div class="preview-caption"><span>Common Ground / Shared sample interface</span><span>Same content. Different language.</span></div></section></section><aside class="variant-detail" aria-label="Selected design"><p class="eyebrow">YOUR SELECTED SYSTEM</p><h2 id="variant-name"></h2><p id="variant-description"></p><div id="tags" class="tags"></div><button class="button primary" id="copy-design">Copy DESIGN.md <span aria-hidden="true">⧉</span></button><a class="button" id="download" download>Download file <span aria-hidden="true">↓</span></a><div class="detail-divider"></div><p class="eyebrow">USE WITH YOUR AI AGENT</p><p class="instruction" id="instruction"></p><button class="text-button" id="copy-instruction">Copy instruction ↗</button><details class="expanded-instruction"><summary>More detailed instruction</summary><p id="long-instruction"></p><button class="text-button" id="copy-long">Copy detailed instruction</button></details><div class="path-box"><span>Repository path</span><code id="repo-path"></code><button class="text-button" id="copy-path">Copy path ⧉</button></div><p class="detail-note">A complete, independent system. Copy it as a whole, or give your agent explicit rules for mixing regions.</p></aside></div>`;
    document.querySelectorAll('[data-variant]').forEach(button => button.addEventListener('click',()=>selectVariant(family,button.dataset.variant)));
    document.querySelector('.variant-tabs').addEventListener('keydown', event => {
      const tabs = [...document.querySelectorAll('[data-variant]')]; const index = tabs.indexOf(document.activeElement);
      if (index < 0 || !['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : (index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
      tabs[next].focus(); tabs[next].click();
    });
    document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
      const source = button.dataset.view === 'source';
      document.querySelector('#preview-wrap').hidden = source; document.querySelector('#source-wrap').hidden = !source;
      document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      document.querySelector('.size-switch').hidden = source;
      if (source) showSource();
    }));
    document.querySelectorAll('[data-size]').forEach(button=>button.addEventListener('click',()=>{
      document.querySelector('#preview-wrap').classList.toggle('mobile-preview',button.dataset.size==='mobile');
      document.querySelectorAll('[data-size]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    }));
    document.querySelector('#showcase').addEventListener('load',sendTheme);
    document.querySelector('.back-link').href = homeLocation;
    const retry = document.createElement('button');
    retry.id = 'retry-source'; retry.className = 'button'; retry.textContent = 'Try source again'; retry.hidden = true;
    retry.onclick = showSource; document.querySelector('#source-wrap').append(retry);
    document.querySelector('#copy-design').onclick = async () => {
      const selected = current;
      try { await copy(await markdownFor(selected), `${selected.name} DESIGN.md copied`); }
      catch { announce('The source could not load. Check your connection and try copying again.'); }
    };
    document.querySelector('#copy-path').onclick = ()=>copy(current.path,'Local repository path copied');
    const pathBox = document.querySelector('.path-box'); pathBox.querySelector('span').textContent='Local repository path'; pathBox.querySelector('#copy-path').textContent='Copy local path ⧉';
    const publicBox = document.createElement('div'); publicBox.className='path-box'; publicBox.innerHTML='<span>Public reference</span><a id="github-link" class="instruction" target="_blank" rel="noopener noreferrer"></a><button class="text-button" id="copy-github">Copy GitHub link ↗</button>';
    pathBox.after(publicBox); document.querySelector('#copy-github').onclick = ()=>copy(githubUrl(),'GitHub reference copied');
    document.querySelector('#copy-instruction').onclick = ()=>copy(instruction(),'Agent instruction copied');
    document.querySelector('#copy-long').onclick = ()=>copy(longInstruction(),'Detailed instruction copied');
  }
  current = variant;
  document.title = `${variant.name} — design-style-mds`;
  document.querySelector('#variant-name').textContent = variant.name;
  document.querySelector('#variant-description').textContent = variant.description;
  document.querySelector('#tags').innerHTML = variant.tags.map(t=>`<span>${esc(t)}</span>`).join('');
  document.querySelector('#instruction').textContent = instruction();
  document.querySelector('#long-instruction').textContent = longInstruction();
  document.querySelector('#repo-path').textContent = variant.path;
  const github = document.querySelector('#github-link'); github.href = githubUrl(); github.textContent = githubUrl();
  document.querySelector('#design-source').textContent = '';
  document.querySelector('#retry-source').hidden = true;
  if (!document.querySelector('#source-wrap').hidden) showSource();
  const download = document.querySelector('#download'); download.href = '/'+variant.path; download.download = `${variant.family}-${variant.slug}-DESIGN.md`;
  document.querySelector('#variant-panel').setAttribute('aria-labelledby','tab-'+variant.slug);
  document.querySelectorAll('[data-variant]').forEach(button=> { const selected = button.dataset.variant===variant.slug; button.setAttribute('aria-selected',String(selected)); button.tabIndex = selected?0:-1; });
  sendTheme();
}
function sendTheme() {
  const frame = document.querySelector('#showcase'); if (!frame || !current) return;
  frame.title = `${current.name} interactive preview`;
  frame.contentWindow?.postMessage({type:'set-theme',theme:`${current.family}/${current.slug}`},location.origin);
}
function selectVariant(family, slug) {
  const variant = family.variants.find(v=>v.slug===slug); if (!variant || variant===current) return;
  history.pushState({},'',`/styles/${family.slug}/${slug}`); familyPage(family,variant); announce(`${variant.name} selected`);
}
function githubUrl() { return `https://github.com/kurtianbernaldez/awesome-design-styles/blob/main/${current.path}`; }
function instruction() { return `Use the design system documented at ${githubUrl()} as the visual design system for this project. If your environment cannot open links, ask for the DESIGN.md contents.`; }
function longInstruction() { return `Build this interface using ${current.name} as defined at ${githubUrl()}. Follow its typography, spacing, layout, surface, component, interaction, motion, responsive, and accessibility rules. If your environment cannot open links, ask for the DESIGN.md contents.`; }
async function copy(value, message) {
  const copyOpener = document.activeElement;
  try { await navigator.clipboard.writeText(value); announce(message); }
  catch {
    const field = document.createElement('textarea'); field.value=value; field.className='copy-fallback'; field.setAttribute('aria-label','Text to copy'); document.body.append(field); field.select();
    let success=false; try { success=document.execCommand('copy'); } catch {}
    field.remove();
    copyOpener?.focus();
    if(success) announce(message); else {
      const dialog=document.createElement('dialog'); dialog.className='manual-copy';
      dialog.setAttribute('aria-label','Copy manually');
      dialog.innerHTML='<h2>Copy manually</h2><p>Your browser blocked clipboard access. Select and copy the text below.</p><textarea aria-label="Text to copy" readonly></textarea><form method="dialog"><button class="button">Close</button></form>';
      dialog.querySelector('textarea').value=value; document.body.append(dialog); const opener=document.activeElement;
      dialog.addEventListener('close',()=>{dialog.remove();opener?.focus();}); dialog.showModal(); dialog.querySelector('textarea').select();
    }
  }
}
function render() {
  const parts = location.pathname.split('/').filter(Boolean);
  if (!parts.length) { home(); if(location.hash === '#how-to-use') requestAnimationFrame(()=>document.querySelector('#how-to-use')?.scrollIntoView()); return; }
  const family = families.find(f=>f.slug===parts[1]);
  const variant = family && (parts[2] ? family.variants.find(v=>v.slug===parts[2]) : family.variants[0]);
  if(parts[0]!=='styles' || parts.length>3 || !family || !variant) { currentFamily=null; document.title='Design not found — design-style-mds'; main.innerHTML='<section class="not-found"><p class="eyebrow">404 / DESIGN NOT FOUND</p><h1>That design isn’t here.</h1><a class="button primary" href="/" data-route>Explore available styles</a></section>'; return; }
  familyPage(family,variant);
}
async function load() {
  try { const response=await fetch('/catalog.json'); if(!response.ok) throw new Error('Catalog unavailable'); families=await response.json(); render(); }
  catch { main.innerHTML='<section class="not-found"><h1>The library could not load.</h1><p>Check your connection and try again.</p><button class="button primary" id="retry">Try again</button></section>'; document.querySelector('#retry').onclick=load; }
}
load();

import {pointerProfiles, pointerPosition} from './pointer-profiles.js';
import {advanceSpring} from './liquid-optics.js';
import {samplePointer,pointerEnergy} from './pointer-kinetics.js';

// A viewport-wide decoration follows the mouse; material panels receive extra light.
export function createPointerEffects(root) {
  const fine=matchMedia('(any-hover: hover) and (any-pointer: fine)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const forced=matchMedia('(forced-colors: active)');
  const transparency=matchMedia('(prefers-reduced-transparency: reduce)');
  const contrast=matchMedia('(prefers-contrast: more)');
  const button=document.querySelector('#pointer-toggle');
  const label=document.querySelector('#pointer-description');
  const effect=document.createElement('span');
  effect.className='pointer-effect';
  effect.setAttribute('aria-hidden','true');
  const field=effect.cloneNode();
  field.classList.add('pointer-field');
  const selector='.hero-copy,.project-card,.feature-card,.price-card,.demo-form,.stats,.demo-nav,dialog';
  let profile, surface, frame=0, point, enabled, optedOut=false,last=0;
  const momentum={energy:{value:0,velocity:0}};
  const isGlass=()=>['glassmorphism','liquid-glass'].includes(profile?.family);
  try { optedOut=localStorage.getItem('design-pointer-effects')==='off'; } catch {}

  function clearSurface() {
    effect.remove();
    if(surface) {
      surface.classList.remove('pointer-surface');
      delete surface.dataset.pointerPositioned;
      delete surface.dataset.pointerMaterial;
      for(const key of ['--light-x','--light-y','--shade-x','--shade-y']) surface.style.removeProperty(key);
    }
    surface=null;
  }
  function reset() {
    cancelAnimationFrame(frame);frame=0;point=null;
    for(const spring of Object.values(momentum)){spring.value=0;spring.velocity=0;}
    delete root.dataset.pointerAnimating;
    field.remove();clearSurface();
  }
  function availability() {
    const quiet=!profile||profile.mode==='none';
    const protectedMaterial=isGlass()&&(transparency.matches||contrast.matches);
    enabled=!quiet && (fine.matches || profile.family==='liquid-glass') && !reduced.matches && !forced.matches && !protectedMaterial && !optedOut;
    root.dataset.pointerEffects=enabled?'on':'off';
    root.dataset.pointerMode=profile?.mode||'none';
    button.closest('.pointer-preferences').hidden=quiet;
    button.disabled=quiet || (!fine.matches && profile.family!=='liquid-glass') || reduced.matches || forced.matches || protectedMaterial;
    button.setAttribute('aria-pressed',String(enabled));
    button.textContent=quiet?'Pointer effects: Not used':`${profile.family==='liquid-glass'?'Material motion':'Pointer effects'}: ${enabled?'On':'Off'}`;
    label.textContent=quiet?profile?.rationale||'This style uses standard hover and focus feedback.':reduced.matches?'Off — your system requests reduced motion.':forced.matches||protectedMaterial?'Off — your system requests clearer, higher-contrast surfaces.':!fine.matches&&profile.family!=='liquid-glass'?'Available with a mouse or trackpad.':optedOut?'Off — saved preference. Turn on to restore reflections and motion.':profile.family==='liquid-glass'?'Move or press a glass control. Its material responds; the cursor stays normal.':profile.family==='glassmorphism'?'Move across the preview to sweep light over the glass.':profile.mode==='surface'?`${profile.name} — move over a material surface.`:profile.name;
    reset();
  }
  function setTheme(theme) {
    profile=pointerProfiles[theme];
    if(profile) {
      for(const decoration of [effect,field]) {
        decoration.dataset.recipe=profile.recipe;
        decoration.dataset.motion=profile.motion;
        for(const [key,value] of Object.entries({size:profile.size+'px',stretch:profile.stretch,weight:profile.weight+'px'})) decoration.style.setProperty('--fx-'+key,value);
      }
    }
    availability();
  }
  function paint(now) {
    frame=0;
    if(!point) return;
    const dt=Math.min((now-last)/1000,1/30);last=now;
    const place=(element,pos)=>{
      element.style.setProperty('--px',pos.x+'px');
      element.style.setProperty('--py',pos.y+'px');
      element.style.setProperty('--angle',pos.angle+'deg');
    };
    // Axis-constrained reflections belong to panels; the page effect stays with the mouse.
    const fieldProfile=['horizontal','vertical'].includes(profile.motion)?{...profile,motion:'follow'}:profile;
    let fieldPoint=pointerPosition(fieldProfile,point.x,point.y,innerWidth,innerHeight);
    if(isGlass()){
      const target=pointerEnergy(point,now);
      advanceSpring(momentum.energy,target,dt);
      const energy=Math.max(0,Math.min(1,momentum.energy.value));
      if(point.speed>30)fieldPoint.angle=Math.atan2(point.vy,point.vx)*180/Math.PI;
      field.style.setProperty('--speed',energy.toFixed(4));
      field.style.setProperty('--flow-stretch',(1+energy*.3).toFixed(4));
      effect.style.setProperty('--speed',energy.toFixed(4));
      const flowing=momentum.energy.velocity!==0||momentum.energy.value!==0||target!==0;
      if(flowing){root.dataset.pointerAnimating='';frame=requestAnimationFrame(paint);}else delete root.dataset.pointerAnimating;
    }
    place(field,fieldPoint);
    if(!surface)return;
    const rect=surface.getBoundingClientRect();
    const pos=pointerPosition(profile,point.x-rect.left,point.y-rect.top,rect.width,rect.height);
    place(effect,pos);
    // Light travels over the relief; targets themselves never tilt or move.
    if(profile.family==='neumorphism') {
      const x=-6+pos.dx*6, y=-6+pos.dy*6;
      surface.style.setProperty('--light-x',x+'px');surface.style.setProperty('--light-y',y+'px');
      surface.style.setProperty('--shade-x',-x+'px');surface.style.setProperty('--shade-y',-y+'px');
    }
  }
  document.addEventListener('pointermove',event=>{
    if(!enabled || event.pointerType!=='mouse' || profile.family==='liquid-glass') { reset();return; }
    // Liquid Glass owns its local optical body; the shared renderer supplies its page effect.
    const material=profile.mode==='surface'||['glassmorphism','neumorphism','skeuomorphism','claymorphism','frutiger-aero','web-2.0','y2k'].includes(profile.family);
    const next=material&&!event.target.closest?.('.demo-menu[open]')?event.target.closest?.(selector):null;
    if(next!==surface) {
      clearSurface();surface=next;
      if(surface) {
        if(getComputedStyle(surface).position==='static') surface.dataset.pointerPositioned='';
        surface.classList.add('pointer-surface');
        surface.dataset.pointerMaterial=profile.recipe;
        surface.prepend(effect);
      }
    }
    // Native dialogs live in the top layer; keep the viewport decoration visible there too.
    const host=document.querySelector('dialog[open]')||document.body;
    if(profile.mode!=='surface'&&field.parentElement!==host)host.append(field);
    point=samplePointer(point,event.clientX,event.clientY,performance.now());
    if(!frame){last=performance.now();frame=requestAnimationFrame(paint);}
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',reset);
  document.addEventListener('pointercancel',reset);
  document.addEventListener('keydown',reset);
  document.addEventListener('scroll',reset,{passive:true,capture:true});
  document.addEventListener('visibilitychange',reset);
  document.querySelector('dialog').addEventListener('close',reset);
  document.querySelector('dialog').addEventListener('toggle',reset);
  document.querySelector('.demo-menu').addEventListener('toggle',clearSurface);
  window.addEventListener('blur',reset);
  window.addEventListener('resize',reset);
  for(const query of [fine,reduced,forced,transparency,contrast]) query.addEventListener('change',availability);
  button.addEventListener('click',()=>{
    optedOut=!optedOut;
    try { localStorage.setItem('design-pointer-effects',optedOut?'off':'on'); } catch {}
    availability();
  });
  window.addEventListener('storage',event=>{
    if(event.key==='design-pointer-effects') { optedOut=event.newValue==='off';availability(); }
  });
  return {setTheme,reset};
}

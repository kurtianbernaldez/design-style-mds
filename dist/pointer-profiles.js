// Every interpretation has an explicit pointer policy; decoration is optional.
// Coordinates: --px/--py are local pixels; --angle follows the pointer direction.
const families = {
  'doodle': [
    ['sketchbook','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
    ['whiteboard','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
    ['field-notes','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
  ],
  'isometric': [
    ['floating-blocks','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
    ['exploded-layers','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
    ['wireframe-city','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
  ],
  'gothic': [
    ['cathedral','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
    ['illuminated-folio','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
    ['stone-cloister','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
  ],
  'mosaic': [
    ['tessera-court','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
    ['tile-panel','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
    ['shard-gallery','Native feedback','edge','follow','Stable control feedback without decorative tracking.'],
  ],

  'liquid-glass': [
    ['clear-lens','Flowing caustic','liquid-lens','follow','Cool edge light and clear refraction respond within functional control islands.'],
    ['frosted-controls','Diffused flow','liquid-frost','follow','Diffused light and restrained flex respond on adaptive frosted controls.'],
    ['fluid-dock','Flowing reflection','liquid-dock','follow','Connected dock surfaces flex and refract their background during input and selection.'],
  ],
  minimalism: [
    ['clean-product','Quiet edge','edge','horizontal','A short fine rule follows the pointer along the lower edge.'],
    ['editorial','Reading rule','rule','vertical','A hairline reading guide follows the vertical position in the margin.'],
    ['monochrome','Monochrome aperture','aperture','follow','A small unfilled square tracks the pointer with a precise corner gap.'],
  ],
  brutalism: [
    ['raw-web','Exposed crosshair','crosshair','snap','A hard crosshair jumps between 16px grid intersections.'],
    ['editorial','Registration frame','registration','follow','Offset print-registration corners move as one rigid frame.'],
    ['colorful','Block stamp','blocks','snap','Three hard color blocks step between coarse grid cells.'],
  ],
  glassmorphism: [
    ['dark-glass','Luminous reflection','glass-dark','follow','A cool point reflection and a broad diagonal sheen travel across the glass.'],
    ['light-glass','Raking daylight','glass-light','horizontal','A wide daylight reflection sweeps horizontally with a fine bright leading edge.'],
    ['vibrant-glass','Prismatic lens','glass-prism','follow','A local lens carries separated cyan and pink rims while its specular angle follows the pointer.'],
  ],
  maximalism: [
    ['curated-abundance','Ornamental orbit','ornament','orbit','A double ornamental ring rotates around a small offset focal point.'],
    ['festival-poster','Ticket stripes','stripes','horizontal','A broad band of alternating ticket-like stripes follows the horizontal position.'],
    ['cabinet-of-curiosities','Specimen lens','lens','follow','A double-rimmed inspection circle follows the pointer over each specimen region.'],
  ],
  'neo-brutalism': [
    ['playful-utility','Offset sticker','sticker','follow','A square outline and its hard offset shadow follow the pointer.'],
    ['block-editorial','Sliding print block','blocks','horizontal','A large horizontal print block aligns with the pointer without tilting the content.'],
    ['utility-board','Board locator','registration','snap','Four square locator marks snap to an 8px utility grid.'],
  ],
  skeuomorphism: [
    ['instrument-panel','Metal inspection light','metal','horizontal','A narrow brushed-metal reflection sweeps across the housing.'],
    ['leather-organizer','Stitch tracer','stitch','vertical','A short dashed stitch line follows the pointer down the binding margin.'],
    ['paper-workbench','Paper edge light','paper','follow','Two fine offset paper edges catch the light around the pointer.'],
  ],
  neumorphism: [
    ['soft-relief','Moving relief light','relief','follow','The active slab receives a small opposing shadow and highlight shift as the light position changes.'],
    ['recessed-console','Recessed light well','recess','follow','An inset light-and-shade pair follows the pointer inside the console basin.'],
    ['porcelain-dashboard','Porcelain rim light','porcelain','orbit','A broad porcelain highlight follows the pointer while the outer relief light shifts gently.'],
  ],
  claymorphism: [
    ['soft-play','Soft clay dimple','clay','follow','A broad soft dimple of light and shade tracks across the matte clay.'],
    ['toy-workshop','Molded tile','sticker','snap','A rounded-square molded highlight steps between toy-sized cells.'],
    ['ceramic-studio','Ceramic glaze','porcelain','horizontal','A long restrained glaze reflection travels across the ceramic vessel.'],
  ],
  bauhaus: [
    ['functional-geometry','Circle and bar','bauhaus','follow','A primary-color circle and perpendicular bar move together as a geometric study.'],
    ['typographic-workshop','Typesetter rule','rule','horizontal','A short heavy typesetter rule tracks the pointer along a baseline.'],
    ['modular-exhibition','Exhibit locator','registration','snap','A square exhibit locator jumps between the modular wall cells.'],
  ],
  swiss: [
    ['international-grid','Grid intersection','crosshair','snap','Two fine perpendicular guides locate a point on the typographic grid.'],
    ['typographic-poster','Poster baseline','edge','horizontal','A long red baseline marker follows the horizontal reading position.'],
    ['information-desk','Row index','rule','vertical','A compact indexed rule tracks the current information row.'],
  ],
  'art-deco': [
    ['geometric-elegance','Gilded fan','fan','orbit','Fine gold fan rays pivot slowly around the pointer position.'],
    ['streamline','Polished speedlines','speedlines','horizontal','Three narrow metallic lines glide horizontally like a polished trim reflection.'],
    ['ornamental-marquee','Stepped marquee','deco','follow','A stepped double frame lights around the pointer with a restrained central glint.'],
  ],
  'art-nouveau': [
    ['botanical-lines','Sinuous tracery','ribbons','orbit','Two sinuous curved lines turn gently around the pointer.'],
    ['illustrated-folio','Folio margin flourish','arc','vertical','A fine asymmetric curved flourish follows the folio margin.'],
    ['vienna-geometry','Gilt square rhythm','tiles','snap','Small gilt squares illuminate in a measured ornamental grid.'],
  ],
  'de-stijl': [
    ['orthogonal-fields','Moving intersection','planes','follow','Orthogonal red and blue lines meet at the pointer position.'],
    ['architectural-grid','Room locator','aperture','snap','A heavy rectangular locator locks onto architectural grid cells.'],
    ['typographic-plane','Counterweight bar','blocks','vertical','A small primary-color counterweight moves along the vertical type rail.'],
  ],
  constructivism: [
    ['graphic-assembly','Assembly diagonal','diagonal','follow','Two rigid diagonal registration lines follow the pointer.'],
    ['diagonal-poster','Directional wedge','wedge','orbit','An abstract red directional wedge pivots with the pointer angle.'],
    ['production-bulletin','Serial rail','ticks','vertical','A short column of serial tick marks follows the bulletin rows.'],
  ],
  memphis: [
    ['pattern-play','Pattern window','memphis','orbit','A small window of dots and diagonal lines rotates at the pointer.'],
    ['geometric-toybox','Checker key','tiles','snap','A checker-like square steps through the toybox grid.'],
    ['editorial-collage','Cutout squiggle','ribbons','follow','Two offset graphic curves follow the pointer like a flat collage cutout.'],
  ],
  futurism: [
    ['precision-interface','Targeting reticle','reticle','follow','A fine segmented reticle follows the pointer with a small directional marker.'],
    ['kinetic-type','Velocity streak','speedlines','horizontal','Three directional streaks track horizontal movement without moving the typography.'],
    ['orbital-data','Telemetry orbit','orbit','orbit','A measured partial ring turns around a local telemetry crosshair.'],
  ],
  'retro-futurism': [
    ['orbital-console','Atomic orbit','orbit','follow','Two thin elliptical orbit lines follow the pointer over the console.'],
    ['atomic-lounge','Lounge reflection','arc','horizontal','A broad oval reflection glides across the warm space-age surface.'],
    ['mission-control','Dial locator','radar','snap','A segmented dial highlight steps between instrument positions.'],
  ],
  'mid-century-modern': [
    ['warm-modular','Joinery light','paper','horizontal','A warm double edge-light follows the horizontal joinery.'],
    ['atomic-graphics','Atomic accents','bauhaus','orbit','A small circle and two flat bars rotate as an atomic print accent.'],
    ['woodland-editorial','Timber grain glint','grain','vertical','A restrained group of fine timber-like lines follows the reading margin.'],
  ],
  industrial: [
    ['workshop-panel','Inspection beam','metal','follow','A narrow inspection light crosses the steel surface at the pointer.'],
    ['technical-manual','Drawing crosshair','crosshair','follow','A precise dark drawing crosshair follows the sheet coordinates.'],
    ['assembly-line','Safety locator','stripes','snap','A short safety-stripe marker steps between station positions.'],
  ],
  y2k: [
    ['chrome-pop','Chrome flare','chrome','orbit','A restrained metallic flare turns with the pointer over the chrome.'],
    ['translucent-hardware','Plastic glint','lens','follow','A rounded clear-plastic glint follows the pointer inside the molded housing.'],
    ['digital-flyer','Digital registration','diagonal','snap','Two silver-violet registration streaks step across the flyer grid.'],
  ],
  'frutiger-aero': [
    ['clear-horizon','Clear bubble','bubble','follow','A clear bubble rim and white highlight follow the pointer across the glossy surface.'],
    ['aquatic-workspace','Water caustic','caustic','orbit','Two restrained water-like caustic rings turn around the pointer.'],
    ['nature-portal','Daylight bloom','bloom','horizontal','A broad soft daylight reflection travels across the bright portal panels.'],
  ],
  'frutiger-metro': [
    ['flat-rhythm','Graphic rings','metro','follow','Two flat offset rings follow the pointer as a cropped urban graphic.'],
    ['urban-poster','Poster cutout','wedge','horizontal','A flat geometric wedge moves along the poster’s horizontal axis.'],
    ['wayfinding-tiles','Destination locator','tiles','snap','A compact destination square steps between navigation-grid positions.'],
  ],
  cyberpunk: [
    ['night-terminal','Neon scanner','scan','follow','A short cyan scan line and locator ticks follow the pointer.'],
    ['street-bulletin','Signal offset','glitch','snap','A static pair of misregistered signal blocks jumps between notice-grid cells.'],
    ['diagnostic-console','Diagnostic reticle','reticle','snap','A compact diagnostic reticle snaps to precise terminal coordinates.'],
  ],
  solarpunk: [
    ['organic','Dappled daylight','dapple','follow','A few soft daylight patches follow the pointer over the organic surface.'],
    ['community-garden','Garden light','bloom','orbit','An asymmetric soft ring of warm light follows the communal panel.'],
    ['civic-infrastructure','Resource locator','planes','snap','Two restrained green axes locate a point on the civic information grid.'],
  ],
  vaporwave: [
    ['dream-archive','Pastel echo','echo','follow','Two offset pastel rings create a local visual echo around the pointer.'],
    ['pastel-desktop','Window glint','chrome','horizontal','A narrow pastel window reflection tracks horizontal movement.'],
    ['mall-directory','Tile horizon','tiles','vertical','A flat tiled locator follows the directory’s vertical reading axis.'],
  ],
  synthwave: [
    ['neon-horizon','Horizon rings','radar','follow','A pink partial ring and cyan horizon line track the pointer.'],
    ['sunset-radio','Tuning reflection','speedlines','horizontal','Three warm reflection lines slide along the radio’s tuning axis.'],
    ['vector-arcade','Vector target','crosshair','snap','A hard cyan vector crosshair jumps between arcade-grid positions.'],
  ],
  grunge: [
    ['weathered-print','Ink grain','grain','follow','A small patch of broken ink lines follows the pointer without distressing the text.'],
    ['xerox-zine','Xerox registration','registration','snap','Rough double registration marks step across the photocopied sheet.'],
    ['layered-poster','Pasted edge','paper','vertical','Two misaligned paper-edge rules follow the vertical poster seam.'],
  ],
  'anti-design': [
    ['intentional-disruption','Misregistered pointer','glitch','follow','Two deliberately offset outline fragments follow the pointer without shifting controls.'],
    ['browser-collage','Native locator','aperture','snap','A plain rectangular browser-like locator jumps between coarse cells.'],
    ['typographic-rebellion','Oversized ink rule','rule','horizontal','An unusually long heavy ink rule tracks horizontal movement.'],
  ],
  'wabi-sabi': [
    ['quiet-imperfection','Uneven light','dapple','orbit','A very faint uneven patch of light follows the pointer across the material.'],
    ['ink-and-paper','Dry brush guide','grain','vertical','A small dry-ink line group follows the quiet reading margin.'],
    ['earthen-ledger','Earthen rim','arc','follow','An incomplete warm rim traces the local surface without moving the ledger.'],
  ],
  japandi: [
    ['warm-order','Joinery guide','edge','follow','A short warm rule follows the pointer along the nearest horizontal boundary.'],
    ['gallery-living','Gallery light','bloom','horizontal','A very broad subdued gallery reflection moves across the surface.'],
    ['crafted-workspace','Crafted seam','stitch','snap','A fine joint marker steps between the workspace’s measured grid positions.'],
  ],
  'dark-academia': [
    ['reading-room','Lamplight pool','bloom','follow','A subdued warm pool of reading light follows the pointer.'],
    ['annotated-manuscript','Annotation bracket','registration','vertical','A small paired annotation bracket tracks the manuscript margin.'],
    ['scholarly-journal','Citation rule','rule','horizontal','A fine brass citation rule follows the horizontal reading position.'],
  ],
  'corporate-memphis': [
    ['friendly-explainer','Friendly color loop','metro','follow','Two softly rounded flat color loops follow the pointer.'],
    ['community-story','Story highlight','dapple','horizontal','A broad, quiet group of flat highlights travels across the story region.'],
    ['service-guide','Step locator','sticker','snap','A rounded step marker locks to the service-guide grid.'],
  ],
  'retro-computing': [
    ['desktop-workbench','Selection marquee','marquee','follow','A static dashed selection rectangle follows the pointer without replacing the native cursor.'],
    ['phosphor-terminal','Terminal cell','terminal','snap','A monochrome terminal-cell outline snaps to the character grid.'],
    ['monochrome-desktop','Dither locator','dither','snap','A small one-bit dithered locator steps between desktop pixels.'],
  ],
  'web-1.0': [
    ['document-web','Hypertext rule','edge','horizontal','A simple link-blue rule follows the horizontal document position.'],
    ['personal-homepage','Homepage marquee','marquee','snap','A plain dashed selection frame steps across the homepage boxes.'],
    ['hypertext-index','Index caret','caret','vertical','A small stationary-shaped caret follows the current index row.'],
  ],
  'web-2.0': [
    ['glossy-community','Gloss highlight','gloss','follow','A narrow curved gloss reflection follows the pointer over the rounded panels.'],
    ['social-dashboard','Module shine','metal','horizontal','A small title-strip reflection moves horizontally through the active module.'],
    ['blog-magazine','Editorial gloss','paper','horizontal','A fine paired paper-and-gloss line tracks the magazine baseline.'],
  ],
  'pixel-art': [
    ['grid-adventure','Pixel locator','pixels','snap','Four small pixel squares snap to an 8px logical grid.'],
    ['handheld-rpg','Inventory cursor','caret','snap','A stepped inventory-cursor shape jumps between 16px cells.'],
    ['arcade-scoreboard','Arcade brackets','reticle','snap','Large hard scoreboard brackets snap to 24px grid cells.'],
  ],
  psychedelic: [
    ['fluid-poster','Liquid color rings','ribbons','orbit','Two broad organic color rings turn around the pointer without animating the page background.'],
    ['op-art','Optical aperture','optical','follow','A small static striped aperture follows the pointer; its pattern never scrolls or flashes.'],
    ['flower-power','Organic color pool','bloom','orbit','A broad asymmetrical color pool turns gently with the pointer.'],
  ],
  'pop-art': [
    ['graphic-impact','Halftone spotlight','halftone','follow','A circular halftone patch follows the pointer inside the printed panel.'],
    ['comic-strip','Panel registration','registration','snap','Heavy comic-panel registration corners snap between frame positions.'],
    ['screenprint-poster','Print separation','echo','horizontal','Two flat offset color circles track horizontally like separated print plates.'],
  ],
};

// Page tracking belongs to optical or deliberately digital experiences. Materials
// can react locally without adding a cursor companion to the surrounding page.
// Unlisted families keep normal native hover/focus behavior with no tracking.
const familyPolicies = {
  'doodle': ['none', "Static pen marks and annotations express the drawing process; tracking marks would look like editable content."],
  'isometric': ['none', "The projected geometry is a stable spatial explanation; moving the camera or targets would weaken reading and comparison."],
  'gothic': ['none', "Architectural frames and tracery establish a fixed reading rhythm; decorative pointer motion would interrupt that structure."],
  'mosaic': ['none', "Tessellated ornament belongs to fixed assembled surfaces; cursor-following pieces would imply unsupported editing behavior."],

  'liquid-glass': ['surface', 'Light, deformation, and refraction belong to functional glass controls; the cursor remains normal.'],
  glassmorphism: ['page', 'Moving reflections reveal transparency and connect the glass to its environment.'],
  neumorphism: ['surface', 'Local opposing light and shade explain raised and recessed surfaces.'],
  claymorphism: ['surface', 'A local soft highlight reveals the rounded material without following the reader.'],
  'frutiger-aero': ['page', 'Moving water and daylight reflections belong to this glossy digital environment.'],
  'pixel-art': ['page', 'Discrete pointer geometry expresses the logical pixel grid and game interface convention.'],
  minimalism: ['none', 'The reduced visual system relies on whitespace, type, and clear control feedback.'],
  brutalism: ['none', 'Exposed structure and emphatic static hierarchy provide the character without tracking ornament.'],
  maximalism: ['none', 'The composition already contains abundant detail; a tracking ornament would compete with it.'],
  'neo-brutalism': ['none', 'Hard shadows and pressed states communicate interaction without a floating sticker.'],
  skeuomorphism: ['none', 'Paper and leather remain tactile through texture and pressed controls, without a tracking mark.'],
  bauhaus: ['none', 'Fixed geometric relationships and typographic order are the visual subject.'],
  swiss: ['none', 'The typographic grid and information hierarchy need uninterrupted reading space.'],
  'art-deco': ['none', 'Static architectural ornament supplies the hierarchy; moving frames would dilute it.'],
  'art-nouveau': ['none', 'Drawn botanical lines belong to the composition rather than following the cursor.'],
  'de-stijl': ['none', 'Balanced fixed planes and orthogonal divisions define the composition.'],
  constructivism: ['none', 'The directional print composition already establishes movement through static geometry.'],
  memphis: ['none', 'Pattern and cutout geometry are already expressive without an extra tracking shape.'],
  futurism: ['none', 'Precision and readable telemetry are better served by direct control feedback.'],
  'retro-futurism': ['none', 'Instrument state should be conveyed by real controls rather than a decorative locator.'],
  'mid-century-modern': ['none', 'Warm proportions, materials, and print accents work best as a settled composition.'],
  industrial: ['none', 'Technical information and station hierarchy need stable reading surfaces.'],
  y2k: ['none', 'The dense flyer composition already has sufficient digital ornament.'],
  'frutiger-metro': ['none', 'Flat graphic rhythm and wayfinding remain clear without pointer-following geometry.'],
  cyberpunk: ['none', 'Layered notices already supply visual noise; a tracking signal would reduce readability.'],
  solarpunk: ['none', 'Nature, community content, and accessible controls carry the design without artificial tracking light.'],
  vaporwave: ['none', 'Directory labels and their fixed spatial arrangement should remain the focal point.'],
  grunge: ['none', 'Printed wear, torn edges, and static registration create the texture without moving dirt.'],
  'anti-design': ['none', 'The composition supplies the intentional disruption; the native pointer stays predictable.'],
  'wabi-sabi': ['none', 'Quiet material irregularity and unhurried reading call for stillness.'],
  japandi: ['none', 'Warm order and restrained material details need no decorative tracking.'],
  'dark-academia': ['none', 'Long-form reading and scholarly annotations should remain visually stable.'],
  'corporate-memphis': ['none', 'Illustration and plain service controls provide sufficient guidance and personality.'],
  'retro-computing': ['none', 'A decorative selection box or terminal cell could be mistaken for an actual application state.'],
  'web-1.0': ['none', 'Native links and straightforward document reading are the appropriate interaction language.'],
  'web-2.0': ['none', 'Magazine reading does not benefit from a tracking gloss mark.'],
  psychedelic: ['none', 'The flower and color composition already provides an expressive static experience.'],
  'pop-art': ['none', 'Halftones and print separation belong to the artwork rather than following the pointer.'],
};
const variantPolicies = {
  'skeuomorphism/instrument-panel': ['surface', 'A local inspection light reveals the metal housing.'],
  'art-deco/streamline': ['surface', 'Light can travel along polished trim while the page composition remains still.'],
  'industrial/workshop-panel': ['surface', 'The steel housing supports a restrained local inspection reflection.'],
  'retro-futurism/orbital-console': ['surface', 'A local instrument reflection belongs to the physical console.'],
  'retro-futurism/atomic-lounge': ['surface', 'A broad local reflection describes the polished space-age surfaces.'],
  'y2k/chrome-pop': ['page', 'A moving chrome flare supports the expressive digital metallic environment.'],
  'y2k/translucent-hardware': ['surface', 'The molded housing catches light locally; the surrounding content stays quiet.'],
  'futurism/kinetic-type': ['page', 'A bounded directional streak expresses speed without moving the typography.'],
  'cyberpunk/night-terminal': ['page', 'A restrained scanner extends the fictional terminal display language.'],
  'cyberpunk/diagnostic-console': ['surface', 'The locator belongs inside the active diagnostic display, not in reading margins.'],
  'vaporwave/dream-archive': ['page', 'A bounded pastel echo contributes to the deliberately dreamlike digital scene.'],
  'vaporwave/pastel-desktop': ['surface', 'Only the simulated window surface needs a moving reflection.'],
  'synthwave/neon-horizon': ['page', 'The horizon ring extends the luminous vector environment.'],
  'synthwave/sunset-radio': ['surface', 'Reflections stay on the radio housing and tuning surface.'],
  'synthwave/vector-arcade': ['page', 'A stepped vector target belongs to the arcade interaction language.'],
  'anti-design/intentional-disruption': ['page', 'A bounded misregistration cue is part of the deliberate digital disruption.'],
  'web-1.0/personal-homepage': ['page', 'A restrained marquee references playful personal-web cursor decoration.'],
  'web-2.0/glossy-community': ['surface', 'Rounded glossy modules catch a small local highlight.'],
  'web-2.0/social-dashboard': ['surface', 'The shine belongs only on the active module title strip.'],
  'psychedelic/fluid-poster': ['page', 'Bounded organic rings support the expressive fluid composition.'],
  'psychedelic/op-art': ['page', 'A small static-pattern aperture lets pointer movement explore the optical geometry.'],
};
const quietPolicy = ['none', 'Typography, composition, and normal control states carry this interpretation; decorative tracking would distract from the content.'];

export const pointerProfiles = Object.fromEntries(Object.entries(families).flatMap(([family, variants]) =>
  variants.map(([slug, name, recipe, motion, description], index) => {
    const [mode, rationale] = variantPolicies[`${family}/${slug}`] || familyPolicies[family] || quietPolicy;
    return [`${family}/${slug}`, {
    name, recipe, motion, description, family, mode, rationale,
    size: [96, 144, 72][index], grid: [16, 8, 24][index],
    // Each sibling gets its own geometry as well as an authored recipe and motion.
    stretch: [1, 1.45, .78][index], weight: [1, 2, 1.5][index],
  }]; }),
));

// Material-specific scale and shape decisions override the general three-size rhythm.
Object.assign(pointerProfiles['glassmorphism/dark-glass'], {size:240, stretch:1, weight:1});
Object.assign(pointerProfiles['glassmorphism/light-glass'], {size:320, stretch:1.8, weight:1});
Object.assign(pointerProfiles['glassmorphism/vibrant-glass'], {size:170, stretch:1, weight:1.5});
Object.assign(pointerProfiles['pixel-art/grid-adventure'], {size:48, grid:8, weight:2});
Object.assign(pointerProfiles['pixel-art/handheld-rpg'], {size:48, grid:16, weight:4});
Object.assign(pointerProfiles['pixel-art/arcade-scoreboard'], {size:72, grid:24, weight:4});
Object.assign(pointerProfiles['neo-brutalism/utility-board'], {grid:8});

export function pointerPosition(profile, x, y, width, height) {
  x=Math.max(0,Math.min(width,x)); y=Math.max(0,Math.min(height,y));
  if(profile.motion==='snap') { x=Math.round(x/profile.grid)*profile.grid; y=Math.round(y/profile.grid)*profile.grid; }
  if(profile.motion==='horizontal') y=height*.72;
  if(profile.motion==='vertical') x=Math.min(30,width*.12);
  x=Math.min(width,x);y=Math.min(height,y);
  const dx=width ? x/width-.5 : 0, dy=height ? y/height-.5 : 0;
  return {x:Math.min(width,x), y:Math.min(height,y), dx, dy,
    angle:profile.motion==='orbit' ? dx*70+dy*35 : dx*25};
}

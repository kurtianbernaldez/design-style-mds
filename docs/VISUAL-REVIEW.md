# Visual identity review

The current library contains **129 variants across 43 families, with three interpretations per family**. The [October website audit](WEBSITE-AUDIT.md) records the latest expansion and verification; the dated reviews below retain their original scope. The family research below informed the foundations; [the expansion notes](VARIANT-EXPANSION.md) describe the 70 additional design directions and their validation.

Reviewed 2026-09-15. Scope: all 38 families and 44 complete variants.

## What changed

The old implementation varied token values while sharing almost all silhouettes and component construction. Landing cards reduced each family further to a generic mini-browser. Glass panes were 86–90% opaque and lost their transparency on phones. Neumorphism combined soft shadows with outlined controls and a solid primary button, weakening its continuous-surface identity.

The revision gives each variant explicit composition, material, typography, control, image, and motion rules. One semantic showcase remains shared. Landing images are captures of that actual showcase rather than approximations made from palette tokens. The supplied neumorphism reference informed the opposing-light relief, inset tracks, circular tools, and violet selected state; its artwork and layout were not copied.

## Research and interpretation

Museum collections, design research, original practitioners, and aesthetic archives establish context. These are interpretive design directions, not rigid historical definitions. In particular, Precision Interface is contemporary futuristic UI informed by directional composition; Corporate Vaporwave and Laser Grid supply related visual context for the Vaporwave and Synthwave interpretations. The Frutiger Metro community archive and Japandi retailer philosophy are practical aesthetic references, not historical scholarship. No source images or branded components were copied.

| Variant | Defining relationship carried into the interface | Context source |
|---|---|---|
| [Clean Product Minimalism](../styles/minimalism/clean-product/DESIGN.md) | Practical product minimalism: quiet neutral space, a clear action hierarchy, and restrained containers for actual work. | [NN/g: characteristics of minimalism](https://www.nngroup.com/articles/characteristics-minimalism/) |
| [Editorial Minimalism](../styles/minimalism/editorial/DESIGN.md) | Typography-led minimalism: a magazine-like opening, generous reading space, serif contrast, and almost no card furniture. | [NN/g: characteristics of minimalism](https://www.nngroup.com/articles/characteristics-minimalism/) |
| [Monochrome Minimalism](../styles/minimalism/monochrome/DESIGN.md) | A nearly colorless interface organized by continuous rules, severe alignment, and weight rather than decoration. | [NN/g: characteristics of minimalism](https://www.nngroup.com/articles/characteristics-minimalism/) |
| [Raw Web Brutalism](../styles/brutalism/raw-web/DESIGN.md) | Exposed web structure: utilitarian monospace, blunt borders, ordinary links, and an intentionally unpolished document rhythm. | [NN/g: brutalism and antidesign](https://www.nngroup.com/articles/brutalism-antidesign/) |
| [Editorial Brutalism](../styles/brutalism/editorial/DESIGN.md) | Poster-scale brutalism: compressed oversized type, interrupted reading rhythm, and heavy editorial rules. | [NN/g: brutalism and antidesign](https://www.nngroup.com/articles/brutalism-antidesign/) |
| [Colorful Brutalism](../styles/brutalism/colorful/DESIGN.md) | Confrontational brutalism built from large adjoining color planes and uncompromising dark structure. | [NN/g: brutalism and antidesign](https://www.nngroup.com/articles/brutalism-antidesign/) |
| [Dark Glass](../styles/glassmorphism/dark-glass/DESIGN.md) | Dark, luminous glass with cyan and violet environments visible through smoked panes. | [NN/g: glassmorphism](https://www.nngroup.com/articles/glassmorphism/) |
| [Light Glass](../styles/glassmorphism/light-glass/DESIGN.md) | Airy frosted glass over a cool, visible pastel environment, with dark readable type. | [NN/g: glassmorphism](https://www.nngroup.com/articles/glassmorphism/) |
| [Vibrant Glass](../styles/glassmorphism/vibrant-glass/DESIGN.md) | Expressive translucent glass in a saturated violet, magenta, and teal environment. | [NN/g: glassmorphism](https://www.nngroup.com/articles/glassmorphism/) |
| [Soft Relief Neumorphism](../styles/neumorphism/soft-relief/DESIGN.md) | A continuous pale surface where controls appear pressed into or raised from the same material through opposed soft light and shadow. | [NN/g: skeuomorphism and neumorphism](https://www.nngroup.com/articles/skeuomorphism/) |
| [Instrument Panel Skeuomorphism](../styles/skeuomorphism/instrument-panel/DESIGN.md) | A tactile instrument chassis: physical fabrication explains which parts press, which parts contain information, and which parts are recessed. | [NN/g: skeuomorphism](https://www.nngroup.com/articles/skeuomorphism/) |
| [Soft Play Claymorphism](../styles/claymorphism/soft-play/DESIGN.md) | Inflated, separate clay-like pieces with pillowy volume, rounded corners, and softened inner shading. | [Hype4: claymorphism](https://hype4.academy/articles/design/claymorphism-in-user-interfaces) |
| [Curated Maximalism](../styles/maximalism/curated-abundance/DESIGN.md) | Abundant but curated layering: patterns, varied frames, rich typography, and several complementary visual rhythms. | [Shapero Modern: More is More](https://shaperomodern.com/exhibitions/18-maximalism-more-is-more/) |
| [Playful Neo-Brutalism](../styles/neo-brutalism/playful-utility/DESIGN.md) | Friendly functional modules with thick ink boundaries, flat color, and unmistakable hard offset shadows. | [NN/g: neobrutalism](https://www.nngroup.com/articles/neobrutalism/) |
| [Functional Geometry Bauhaus](../styles/bauhaus/functional-geometry/DESIGN.md) | Functional geometric composition where circles, bars, and primary color organize the interface. | [MoMA: Bauhaus](https://www.moma.org/calendar/exhibitions/303) |
| [International Grid Swiss](../styles/swiss/international-grid/DESIGN.md) | Asymmetric typographic order: a disciplined grid, strong sans-serif hierarchy, and flat, precise information. | [Swiss National Library: International Style](https://www.nb.admin.ch/en/the-international-style-1950-1970) |
| [Geometric Elegance Art Deco](../styles/art-deco/geometric-elegance/DESIGN.md) | Ceremonial geometric elegance through symmetry, stepped frames, widely spaced capitals, and restrained metallic contrast. | [V&A: Art Deco](https://www.vam.ac.uk/articles/an-introduction-to-art-deco) |
| [Botanical Lines Art Nouveau](../styles/art-nouveau/botanical-lines/DESIGN.md) | Flowing line and integrated framing: organic curvature connects typography and surfaces into one ornamental structure. | [V&A: Art Nouveau](https://www.vam.ac.uk/articles/art-nouveau-an-international-style) |
| [Orthogonal Fields De Stijl](../styles/de-stijl/orthogonal-fields/DESIGN.md) | A system of unequal orthogonal fields: heavy dark rails connect primary-color planes into one composition. | [MoMA: De Stijl exhibition catalogue](https://assets.moma.org/documents/moma_catalogue_1798_300159061.pdf) |
| [Graphic Assembly Constructivism](../styles/constructivism/graphic-assembly/DESIGN.md) | Directional graphic assembly: condensed type, red and black wedges, and a forceful poster reading sequence. | [MoMA: Constructivism](https://www.moma.org/collection/terms/constructivism) |
| [Pattern Play Memphis](../styles/memphis/pattern-play/DESIGN.md) | Playful postmodern graphics: patterned edges, contrasting geometric silhouettes, and flat pastel interruptions. | [Design Museum: Memphis](https://designmuseum.org/memphis) |
| [Precision Futurism](../styles/futurism/precision-interface/DESIGN.md) | A contemporary futuristic interface interpreted through acceleration, directional type, and precise technical surfaces. | [MoMA: Futurism collection](https://www.moma.org/collection/terms/futurism) |
| [Orbital Console Retro-Futurism](../styles/retro-futurism/orbital-console/DESIGN.md) | An optimistic space-age console with capsule framing, soft instrument geometry, and warm analog color. | [Design Museum: How did the future look?](https://designmuseum.org/exhibitions/home-futures/how-did-the-future-look) |
| [Warm Modular Mid-Century Modern](../styles/mid-century-modern/warm-modular/DESIGN.md) | Warm domestic modernism: asymmetrical modular construction, modest serif type, and wood-like structural accents. | [NGV: Mid-century design](https://www.ngv.vic.gov.au/explore/collection/collection-on-display/mid-century-design/) |
| [Workshop Industrial](../styles/industrial/workshop-panel/DESIGN.md) | A fabricated workshop interface with dark metal panels, condensed labels, fastening cues, and disciplined safety accents. | [V&A: Modernism collection](https://www.vam.ac.uk/collections/modernism) |
| [Chrome Pop Y2K](../styles/y2k/chrome-pop/DESIGN.md) | Future-pop chrome and glossy plastic, with liquid silver surfaces and compressed italic display type. | [CARI: Y2K Aesthetic](https://cari.institute/aesthetics/y2k-aesthetic) |
| [Clear Horizon Frutiger Aero](../styles/frutiger-aero/clear-horizon/DESIGN.md) | Optimistic digital nature: luminous sky, water, grass, glossy controls, and clear humanist typography. | [CARI: Frutiger Aero](https://cari.institute/aesthetics/frutiger-aero) |
| [Flat Rhythm Frutiger Metro](../styles/frutiger-metro/flat-rhythm/DESIGN.md) | Flat vector-era energy through bold silhouettes, colorful stripes, oversized circles, and rhythmic sans-serif composition. | [Frutiger Aero archive: Frutiger Metro](https://frutiger-aero.org/frutiger-metro) |
| [Night Terminal Cyberpunk](../styles/cyberpunk/night-terminal/DESIGN.md) | Dark urban technical tension with acidic signals, cut corners, tight instrumentation, and dense readable labels. | [BFI: cyberpunk cinema](https://www.bfi.org.uk/features/blade-runner) |
| [Organic Solarpunk](../styles/solarpunk/organic/DESIGN.md) | An optimistic, practical future where communal work, living systems, and useful technology share the same space. | [Solarpunk Community: manifesto](https://re-des.org/a-solarpunk-manifesto/) |
| [Dream Archive Vaporwave](../styles/vaporwave/dream-archive/DESIGN.md) | Pastel digital nostalgia: displaced desktop frames, soft synthetic color, and a wistful archival composition. | [CARI: Corporate Vaporwave](https://cari.institute/aesthetics/corporate-vaporwave) |
| [Neon Horizon Synthwave](../styles/synthwave/neon-horizon/DESIGN.md) | A luminous retro-digital horizon with perspective grids, sunset color, italic display type, and outlined dark panels. | [CARI: Laser Grid](https://cari.institute/aesthetics/laser-grid) |
| [Weathered Print Grunge](../styles/grunge/weathered-print/DESIGN.md) | Weathered printed matter: pasted paper, rough edges, uneven overprint, and strong condensed typography. | [David Carson: designer portfolio](https://www.davidcarsondesign.com/) |
| [Intentional Disruption Anti-Design](../styles/anti-design/intentional-disruption/DESIGN.md) | Intentional disruption of polished conventions through mismatched editorial scale, offbeat alignment, and visible irregular framing. | [NN/g: brutalism and antidesign](https://www.nngroup.com/articles/brutalism-antidesign/) |
| [Quiet Imperfection Wabi-Sabi](../styles/wabi-sabi/quiet-imperfection/DESIGN.md) | Modest, sparse, and gently irregular composition with warm uncoated surfaces and visible breathing room. | [V&A: ceramics and rusticity](https://www.vam.ac.uk/articles/ceramics-a-risky-business) |
| [Warm Order Japandi](../styles/japandi/warm-order/DESIGN.md) | Warm, regular order: quiet modular joinery, natural neutrals, and calm contemporary typography. | [Japandi Supply House: philosophy](https://shopjapandi.com/pages/japandi-supply-house-values) |
| [Reading Room Dark Academia](../styles/dark-academia/reading-room/DESIGN.md) | A bookish, atmospheric reading room with cloth-dark framing, parchment inserts, and literary serif hierarchy. | [Nguyen: Nostalgia in Dark Academia](https://strathprints.strath.ac.uk/84509/) |
| [Friendly Explainer Corporate Memphis](../styles/corporate-memphis/friendly-explainer/DESIGN.md) | Illustration-led, approachable communication through abstract people, flat color, and generous plain typography. | [BUCK: illustration system principles](https://buck.co/work/facebook-alegria) |
| [Desktop Workbench Retro-Computing](../styles/retro-computing/desktop-workbench/DESIGN.md) | A desktop workbench expressed through window title strips, raised beveled buttons, and recessed work areas. | [Computer History Museum: graphical interface](https://www.computerhistory.org/revolution/input-output/14/347/1859) |
| [Document Web 1.0](../styles/web-1.0/document-web/DESIGN.md) | A linked document with ordinary browser-like typography, horizontal rules, and minimal visual machinery. | [CERN: first web document](https://info.cern.ch/hypertext/WWW/TheProject.html) |
| [Glossy Community Web 2.0](../styles/web-2.0/glossy-community/DESIGN.md) | A centered community portal with friendly typography, glossy gel actions, rounded sections, and graded header strips. | [Smashing Magazine: contemporary 2010 design survey](https://www.smashingmagazine.com/2010/03/best-practices-in-modern-web-design-the-ultimate-round-up/) |
| [Grid Adventure Pixel Art](../styles/pixel-art/grid-adventure/DESIGN.md) | A quantized digital interface with pixel typography, stepped edges, hard outlines, and a deliberately limited palette. | [Pixel Joint: pixel art tutorial](https://pixeljoint.com/forum/forum_posts.asp?TID=11299) |
| [Fluid Poster Psychedelic](../styles/psychedelic/fluid-poster/DESIGN.md) | Optical rhythm and swelling display forms organized into a readable fluid poster. | [V&A: poster history](https://www.vam.ac.uk/articles/a-short-history-of-the-poster) |
| [Graphic Impact Pop Art](../styles/pop-art/graphic-impact/DESIGN.md) | Comic-like graphic impact through bold inking, halftone accents, punchy color, and speech-panel framing. | [MoMA: Pop art](https://www.moma.org/collection/terms/pop-art) |

## Assets and verification

Three original generated artworks occupy the same optional imagery slot in the shared workspace: Corporate Memphis, Solarpunk, and Frutiger Aero. Exact built-in image-generation prompts and repository paths are recorded in [artwork-prompts.json](artwork-prompts.json). They are decorative; no task depends on the images loading. Barlow Condensed and Silkscreen are bundled with their original OFL notices in `dist/assets/`. Existing MIT attribution remains unchanged.

The local browser audit captures each variant at 1100px, 390px, and 320px, checks theme selection and page overflow, and exercises the shared dialog and tabs. The family-page journey also verifies preserved input, the selected source path, source view, browser history, and actual clipboard copies. Visual contact sheets support manual comparison across every family. This is a representative Chromium review, not a claim of full assistive-technology or cross-browser certification. Re-run `node scripts/browser-audit.mjs after` against local Chrome with debugging port 9222. Regenerate actual landing images with `node scripts/browser-audit.mjs thumbnails` after intentional visual changes.

### Validation result

- All 44 variants reviewed at 1100px, 390px, and 320px; no document overflow or content extending beyond the viewport.
- Desktop feature regions inspected across all 44 variants.
- Material checks retain glass blur and neumorphic relief at every reviewed width.
- Final glass and font refinements received focused repeat checks.
- Source, path, instruction clipboard copies, preserved input on variant switching, and browser history passed in local Chromium.
- `npm run check`: the full test suite passes, including complete discovery, byte-identical downloads, routes, token contrast, actual glass composites, and real thumbnail assets.

No full screen-reader, cross-browser, or accessibility certification is claimed.

## Liquid Glass addition

Liquid Glass adds three complete interpretations: Clear Lens, Frosted Controls, and Fluid Dock. Their control islands share real backdrop sampling while differing in density, diffusion, composition, and selection behavior. Material reference: [Apple’s design overview](https://developer.apple.com/videos/play/wwdc2025/219/). Optical mechanism: [SVG displacement mapping](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap).

The material lives in a separate decorative child so its silhouette can flex while text and targets stay fixed. Each body has a rounded displacement map generated at resize. A bounded spring changes edge refraction, highlight, and shape after input; the real colored environment shifts gently behind it. Filters use explicit pixel dimensions. A bounded cache of immutable optical strengths works around Chromium caching without cloning graph nodes or regenerating maps during animation.

Verification in local Chromium includes:

- All three variants at 1100px, 390px, and 320px, plus comparison switching, preserved input, source paths, clipboard controls, dialogs, and tabs.
- A high-contrast stripe probe beneath each material, comparing rendered pixels with displacement enabled and zeroed. The curved edges visibly bend the actual backdrop.
- Mouse movement, press deformation, damped settling, stationary text and hit targets, reduced motion, persistent effects-off, and phone layout.
- Unit checks for curved displacement geometry, bounded maps, spring stability at 60/120Hz, and long-frame recovery.

`node scripts/liquid-audit.mjs` runs the optical checks against local Chrome on port 9223 and writes diagnostic captures to `/tmp/design-style-mds-liquid/`. Start that Chrome with `--blink-settings=primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2` for a desktop pointer. This remains a browser approximation; SVG backdrop support varies, so ordinary blur and opaque accessibility fallbacks remain part of every design.

## Pointer motion and curation

The library declares 19 page effects, 20 surface effects, and 78 variants without decorative tracking. Glassmorphism retains moving reflections; Liquid Glass keeps a normal cursor and responds on functional control surfaces. No floating droplet or water trail is rendered. Hybrid mouse input, touch presses, saved preferences, and system accessibility settings have separate behavior.

`node scripts/pointer-audit.mjs` checks all 117 policies and exercises Glassmorphism reflections, ordinary surface responses, keyboard/touch preferences, and comparison switching. The dedicated Liquid Glass audit verifies optical controls.

## Adaptive Liquid Glass review

Based on [Apple's material principles](https://developer.apple.com/videos/play/wwdc2025/219/), the browser implementation uses Clear material for sticky navigation and workspace controls over the dimmed page and uses Regular material for adaptive controls in Frosted Controls and Fluid Dock. Reading cards remain stable. A light feature plane in Fluid Dock and a dark testimonial in Frosted Controls expose meaningful changes in the content beneath navigation.

Small controls adapt fill, ink, ambient rim, and shadow using nine DOM samples and authored gradient estimates. Larger menus/dialogs retain their opening context and tone, with denser fill, more blur, and deeper refraction as they expand. Bodies reveal from their triggers while labels fade without scaling. Pinned Regular navigation has an adaptive scroll-edge fade. Motion opt-out does not disable static contrast adaptation.

This estimates known DOM backgrounds; it does not sample arbitrary media pixels or implement Apple's native renderer. Unbounded imagery needs a scrim or opaque backing. Real optical displacement still comes from the browser's backdrop filter. Accessibility preferences select static or opaque material, and forced colors uses system surfaces.

The local Liquid Glass audit passed actual displacement, press/settle, stable filter caches and targets, adaptive foreground polarity, scroll-edge visibility, growing menus/dialogs, rapid reopen, Escape and focus restoration, reduced motion/transparency, and 320/390px layouts. Captures are in `/tmp/design-style-mds-liquid/`. Pure tests cover geometry, springs, velocity, adaptive hysteresis, and sampled text contrast. Cross-browser and assistive-technology certification remain outside this review.

The supplied interaction sequences also informed the optical profile: a broad convex shoulder bends background detail through the body, while a press swells the material and reduces diffusion before it settles. Small Regular surfaces begin more transparent, increasing backing only for sampled contrast or busy content. Press transparency is bounded by the same contrast check; dense dialogs remain stable. The screenshot reference assets are not included in the repository.

Final validation: `npm run check` passed 32 tests. The pointer audit passed all 117 policies and Glassmorphism input/settling checks; the Liquid Glass audit passed all three revised materials, including clearer press states and expanded-surface behavior.


## Liquid Glass refraction and sticky-header repair

Clear Lens uses a neutral 3.5% reflection, 0.35px scattering before displacement, and continuous scene contours behind the navigation. Its header stays at 12px on desktop and 8px on phones. No opaque scroll-edge layer covers the backdrop of this clear header. The invalid radial highlight was repaired; pointer light now follows a spring, presses stretch and compress the material, and scrolling energizes the pinned lens. Neutral Regular fills remain adaptive in the other variants.

Displacement maps preserve detail up to 1024 × 512 pixels and limit bending by lens thickness so the short header cannot reverse backdrop pixels. Thirteen cached strengths cover resting scale through +24. Labels and hit areas stay stationary.

Validation: `npm run check` passed all five test files. The Chrome liquid audit passed all three variants, sticky positioning at 1100px, 390px and 320px, valid highlight painting, visible displacement through the unmodified navigation, press/settle, fixed labels, native menus/dialogs, and reduced motion/transparency. The finished-nav comparison detected 1540 changed pixels in Clear Lens, 134 in Frosted Controls, and 1190 in Fluid Dock above a 9-channel-value threshold, comparing actual refraction with the same material at zero displacement.


## Liquid Glass embedded layout repair

The tab strip now remains in document flow with 32px before its panel. A navigation offset previously moved relatively positioned Frosted Controls tabs over feature headings and activity content; secondary Fluid Dock tabs now also scroll with their panels. Labels can wrap in the narrowest embedded preview instead of overflowing the content area. Primary navigation keeps its sticky behavior.

Hero and workspace background contours fade at all four paint boundaries, removing the sharp rectangular cutoffs without clipping the optical bodies or controls.

`node scripts/liquid-layout-audit.mjs` passed 108 embedded layouts across outer widths 1440, 1100, 1000, 900, 801, 800, 657, 390 and 320px, all three Liquid Glass variants, Fit width/Mobile modes, and Overview/Recent activity. Checks cover panel separation before and after scrolling, horizontal content bounds, complete iframe containment, and sticky primary navigation. Focused images are saved in `/tmp/design-style-mds-liquid-layout/`. The smallest outer width exposes an inner preview under 280px, covering the tab-label overflow missed by standalone 320px checks.

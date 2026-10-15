# Website audit and style expansion

Reviewed 2026-10-15 against the local repository and its generated website. The library now contains **43 families and 129 complete design systems**. Production hosting and deployment were outside this review.

## Findings and changes

| Priority | Finding | Resolution |
|---|---|---|
| High | Every visit downloaded all 117 full Markdown documents before rendering the catalog. The raw catalog was 2,746,554 bytes. | Publish a metadata-only index. With 129 variants it is 51,224 bytes, a 98.1% reduction. Fetch the selected document only for source view or copying; cache successful requests, retry failures, and ignore stale source responses after switching. Downloads still point to exact generated source files. |
| Medium | Browsing 39 families required scrolling or alphabetical sorting; variant names and tags were not searchable. | Add labeled search across family names, variant names, descriptions, slugs, and tags. Search combines with sorting, exposes a result count and empty state, and persists in the URL. Returning to the collection retains the query and sort. |
| Medium | Client-side navigation replaced content without moving keyboard focus or resetting the page position. | Focus the destination heading and reset scroll on a new page. Browser Back restores the collection position and focused card without removing the card from the tab order. Sibling selection keeps the iframe and sample input intact. |
| Medium | All generated family and variant pages shared the homepage social title and URL, with no canonical URL. | Generate route-specific canonical, Open Graph, and Twitter metadata. Remove hardcoded system counts from the shared social description so counts cannot become stale on expansion. |
| Medium | Quiet previews displayed a disabled pointer-settings button plus a technical explanation, consuming substantial phone space. | Hide the preferences panel when the policy is `none`. Preserve preference controls for styles with actual effects, including system-preference explanations. |
| Low | Mobile copy rendered “point.Find” when the introductory line break was hidden. | Add whitespace that survives the mobile line-break rule. |
| Low | Narrow family titles could compete with the fixed variant count; the JavaScript-disabled notice had no working repository link. | Allow title/count wrapping and long-word breaking. Link the fallback notice directly to the source collection. |
| Low | The manual-copy dialog lacked an accessible name. A source retry could also hide the focused retry button. | Name the copy dialog and move retry focus to the source reading area before hiding the button. |

The raw JSON reduction measures uncompressed asset size, not page-load time or compressed transfer size. The site remains dependency-free and uses the existing static build and shared showcase.

## Curation: four new families, twelve interpretations

The new designs were assessed against their closest existing neighbors using the same hero, workspace, feature regions, pricing, form, and controls. Acceptance requires differences in composition, surface construction, and component treatment; a palette change is insufficient. All variants retain the common semantic content so those differences remain comparable.

| Family | Interpretations and visible distinctions | Closest neighbors and boundary |
|---|---|---|
| [Doodle](../styles/doodle/README.md) | **Sketchbook:** asymmetric pen outlines, notebook margin, handwritten-style display, circled indexes. **Whiteboard:** centered opening, wide marker board, horizontal task groups and dotted connections. **Field Notes:** compact mono titles, observation grid, indexed vertical rows. | Grunge and Anti-Design: clean annotation marks and an intentional reading sequence, without damaged print or deliberately conflicting hierarchy. |
| [Isometric](../styles/isometric/README.md) | **Floating Blocks:** filled axonometric solids and extruded panel faces. **Exploded Layers:** separated planes, wide workspace, staggered vertical feature sequence. **Wireframe City:** line-only spatial atlas, mono labels, shared grid boundaries. | Neo-Brutalism, Industrial, and Retro Futurism: parallel projected geometry and spatial relationships, without sticker shadows as the defining idea, simulated machinery, or perspective horizons. |
| [Gothic](../styles/gothic/README.md) | **Cathedral:** dark tall bays, pointed tracery, serif capitals. **Illuminated Folio:** light rubric headings, decorated initial, narrow index columns. **Stone Cloister:** centered court, pale mineral surfaces, equal pointed bays. | Dark Academia and Art Deco: pointed architectural framing and vertical tracery, without reliance on bookish props, leather, sunbursts, or stepped metallic ornament. |
| [Mosaic](../styles/mosaic/README.md) | **Tessera Court:** small-piece perimeter bands and inset reading fields. **Tile Panel:** larger repeated geometric tiles and equal modules. **Shard Gallery:** fitted angular fragments and an unequal editorial grid. | De Stijl, Memphis, and Pixel Art: joined pieces and visible grout, without unequal primary-color rails, floating confetti, or pixel typography. |

Each interpretation has a complete DESIGN.md, scoped tokens and construction, original SVG ornament, an intentional pointer policy, and a capture of its actual working preview. CSS and SVG supply the artwork; no external images, fonts, or runtime dependencies were added.

The full catalog has no exact duplicate names, source bodies, or preview captures. Tests enforce those checks for future additions. Visual similarity is assessed by inspection; different image hashes alone do not prove design distinctiveness. Existing related families keep their published URLs and remain separate where their material or composition rules provide an identifiable difference.

### Reference context

These interfaces are original contemporary interpretations, not reconstructions of historical artifacts. Pointed arches and tracery are informed by the [V&A introduction to Gothic](https://www.vam.ac.uk/articles/the-gothic-style-an-introduction). The assembly of small tesserae into larger fields is informed by the [Getty introduction to mosaics](https://www.getty.edu/news/a-brief-introduction-to-roman-mosaics/). The [RIBA guide for architectural clients](https://www.riba.org/media/bf1mlz1o/riba-workwithanarchitectforyourdevelopment-2021.pdf) provides context for explanatory architectural drawings. Doodle uses original pen-mark studies. No reference artwork or text was copied into the previews.

## Verification

- `npm run check`: build, JavaScript syntax, complete catalog discovery, all routes and downloads, document coverage, token contrast, material and pointer tests passed. New tests cover search/sort, the metadata size budget, canonical/social metadata, and duplicate names, documents, and preview captures.
- `node scripts/browser-audit.mjs before`: 117 original variants at 1100px, 390px, and 320px; **351 viewport checks**, no overflow or sampled opaque-text contrast failures. Desktop contact sheets were inspected for overlap.
- `node scripts/browser-audit.mjs after doodle,isometric,gothic,mosaic`: all twelve new variants at those three widths; **36 viewport checks** plus desktop feature captures. All 43 families were exercised for sibling switching, exact selected source, preserved iframe/form input, dialogs, tabs, and copy controls.
- `node scripts/library-audit.mjs`: search, sorting, empty results, query restoration, route focus and scroll, lazy loading and cache, delayed-response protection, source retry and focus, and clipboard-denied fallback passed. Shell screenshots were reviewed at 1440px, 768px, 390px, and 320px. Representative routes also passed 200% equivalent reflow at 720 CSS pixels with device scale 2. New-family dialogs were exercised with forced colors and reduced motion, including Escape and return focus. Quiet pointer settings were hidden while active-material preferences remained visible.
- `node scripts/browser-audit.mjs thumbnails`: regenerated all 129 real preview captures after the shared preference-panel change.
- `git diff --check` and direct `node --check` checks for the added browser helper and audit script passed.

The final `node scripts/browser-audit.mjs after` run passed the first 100 variants, then stopped when an Atomic Lounge tab color was sampled during an initial theme transition in a background tab. The audit now brings its target tab to the foreground before capture. The following focused runs passed the failed variant and the remaining 28 variants, completing current-state coverage of **129 variants at three widths (387 viewport checks)**, plus all-family comparison and clipboard checks:

```sh
node scripts/browser-audit.mjs after retro-futurism/atomic-lounge
node scripts/browser-audit.mjs after retro-futurism/mission-control,skeuomorphism,solarpunk,swiss,synthwave,vaporwave,wabi-sabi,web-1.0,web-2.0,y2k
```

No color change was needed for Atomic Lounge. A few initial interaction-audit failures likewise came from missing native key codes or checking before iframe/dialog events completed; the final audit uses native Escape codes and waits for those states, and passes.

Browser evidence is written to `/tmp/design-style-mds-before/`, `/tmp/design-style-mds-after/`, and `/tmp/design-style-mds-library-audit/`. Committed homepage images are generated from the real showcase, not separate mockups. There is no project lint or TypeScript configuration; those checks were not claimed.

## Remaining improvements

1. **Deeper accessibility coverage:** perform manual screen-reader and cross-browser review, especially translucent materials and real browser text enlargement. This review uses Chromium, semantic checks, token tests, and sampled rendered contrast; it is not an accessibility certification.
2. **Progressive rendering:** the site still needs JavaScript to browse. Pre-rendering the collection and design summaries would improve first rendering and discovery when JavaScript fails. The current fallback now links to the complete repository index.
3. **Discovery refinements:** curated tag filters or favorites may become useful as the catalog grows. Search now addresses the immediate navigation gap; evaluate real usage before adding more controls.

No hosting settings, authentication, dependencies, or deployment workflows were changed.

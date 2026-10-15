# Contributing to design-style-mds

Help people choose a coherent visual language they can actually use.

## What you can contribute

- A new style family with a complete first variant.
- A meaningful interpretation of an existing family.
- More precise, usable guidance in an existing DESIGN.md.
- A more faithful or accessible shared preview implementation.

Every current family has at least three complete variants. New families should arrive with three meaningful interpretations and working previews. Further variants must earn their place through differences in philosophy, composition, and behavior.

## Explain the distinction first

In your pull request, describe:

1. The proposed family and variant, intended uses, and cases where it is unsuitable.
2. The design philosophy that makes it different from its closest sibling.
3. How that philosophy changes hierarchy, composition, typography, spacing, surfaces, components, imagery, and interaction.
4. Why those differences deserve an independent complete system.

A palette swap, a single button treatment, or an imitation of a particular company does not qualify. For example, a typography-led reading system and a compact product system can be distinct variants even if both belong to Minimalism.

## Add a complete design

Use `styles/<family>/<variant>/DESIGN.md` and start from [the neutral template](templates/DESIGN.template.md). Customize its organization where helpful; cover its complete subject matter. Do not copy a sibling and change a few values.

Each file begins with lightweight frontmatter:

```yaml
---
name: Your Variant Name
slug: your-variant
family: family-name
description: One sentence explaining this interpretation.
tags:
  - relevant-trait
  - another-trait
---
```

Use lowercase path slugs. The `family` and `slug` must match the directory path. Keep metadata to these five fields. The build reads single-line scalar fields and indented tag lists; keep the description on one line. Visual tokens belong in the Markdown body, not a larger metadata schema.

For a new family, add `styles/<family>/README.md` with a level-one family name, a blank line, and one short description paragraph. Add links to its available variants afterward.

## Quality requirements

A variant must:

- Be visually and philosophically distinct, with an explicit reason to exist.
- Describe an entire interface, including less decorative features such as forms, menus, dialogs, pricing, empty states, and feedback.
- Give concrete token values, approved color pairings, type hierarchy, spacing, layout, and surface rules.
- Specify hover, focus-visible, pressed, selected, disabled, loading, error, and success behavior.
- Include keyboard, semantic markup, focus management, contrast, and reduced-motion guidance.
- Define mobile, intermediate, wide, zoomed, and long-content behavior.
- Explain imagery, illustration, icon, and data visualization conventions or their deliberate absence.
- Include implementation guidance and specific Do/Don't rules.
- Remain usable without another design document or a proprietary asset.

Use original or appropriately licensed assets only, and document third-party licenses if introduced. Never reproduce a brand's identity, exact palette, proprietary font, distinctive component, logo, marketing text, or unique layout. Do not copy sentences from the former brand collection or another author’s design documents. Shared functional accessibility contracts within this original library may be reused; each interpretation still needs its own visual rules. Ordinary aesthetic conventions are welcome; branded reconstruction is not.

## Implement the comparison

Add scoped `[data-theme="family/variant"]` tokens in `dist/themes.css` and the visual construction in `dist/identities.css` or `dist/variants.css`; the Doodle, Isometric, Gothic, and Mosaic families use `dist/expansion.css`. Shared family construction uses `[data-family="family"]`; interpretation-specific overrides use the full theme selector. Use the **existing** `dist/preview.html` and its content. Do not build a separate demo page per variant. Change grid proportions, spacing, type, surfaces, and component styling as the design requires, while retaining the same content, component set, reading order, and working controls.

Liquid Glass’s scoped material construction is in `dist/liquid-glass.css`; `dist/liquid-glass.js` provides optional edge refraction and measures the shared tab marker. Keep its reading surfaces stable and its optical layer confined to functional control groups. `dist/liquid-adaptation.js` estimates backdrop context from DOM colors; `dist/liquid-transitions.js` preserves native semantics during material reveals. Keep Clear separate from Regular, avoid glass inside glass, and test expanded surfaces, contrasting scroll contexts, rapid reopen, keyboard focus, and accessibility preferences. Document browser fallbacks and sampling limits alongside any optical enhancement.

New common components, if necessary, must be added to the shared showcase so every variant can be compared. Keep the outer browser interface neutral. Make the preview agree with the document, including fallback modes, focus indicators, and reduced motion. Avoid dependencies unless native platform features cannot reasonably handle the need.

Choose a pointer policy of `page`, `surface`, or `none` in `dist/pointer-profiles.js`, and explain why it belongs to the interpretation inside its DESIGN.md. A deliberate absence of decorative tracking is valid, especially for quiet, editorial, and information-focused designs. Glassmorphism retains a whole-page reflection; Liquid Glass confines feedback to functional material, with a normal cursor. Tactile materials can react only on the active surface. For an active effect, document concrete geometry, paint, movement, and fallbacks. Reuse `dist/pointer-effects.js` and add a recipe to `dist/pointer-effects.css` only when needed. Page effects continue through margins and section gaps; surface effects stop at the material boundary. Never replace the native cursor, move targets, intercept input, or create an idle animation loop. Verify keyboard use, touch, reduced motion, forced colors, and the saved effects preference.

The build discovers the file automatically. Missing preview themes, invalid metadata, and path mismatches fail the build; empty families never appear as ready. Update the README collection when adding a production family.

## Validate and submit

Run `npm run check`. Preview with `npm run dev` and check:

- Direct family and variant routes, reload, browser back/forward, and unknown URLs.
- Switching all sibling variants in the same preview without resetting sample input.
- Source view, copy, download, repository path, and both agent instructions for the selected variant.
- Keyboard tabs, focus visibility, native validation, menus, dialog Escape/close/focus restoration, and sample pricing actions.
- Mobile and desktop layout, 200% text enlargement, long labels, and reduced motion.
- Contrast for text and controls in default, hover, focus, and selected states; for glass, test final composites and opaque fallbacks.

Include a concise before/after explanation, representative screenshots when practical, and what you actually tested. Do not claim accessibility certification from token checks alone. Keep generated `dist/catalog.json`, `dist/thumbnails.css`, and `dist/styles/` out of the PR; the build recreates them.

Preserve the existing MIT LICENSE and its copyright notice. Contributions are provided under those terms.

## Prove the visual distinction

Describe the family’s defining relationships and cite useful context in the visual review. A new palette on the same components is insufficient. Compare the same hero, workspace, tool controls, feature regions, pricing, and form at desktop and phone widths. Keep material-specific behavior on small screens; reduced-transparency and reduced-motion preferences are separate from responsive layout.

Update the complete DESIGN.md alongside the preview rules in `dist/identities.css`. Regenerate the real landing captures with `node scripts/browser-audit.mjs thumbnails`; do not hand-draw an unrelated thumbnail. Run `npm run check` and the local browser audit documented in README. Preserve bundled font license notices and document any original generated artwork in `docs/artwork-prompts.json`.

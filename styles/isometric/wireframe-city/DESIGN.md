---
name: Wireframe City Isometric
slug: wireframe-city
family: isometric
description: A dark axonometric atlas of outlined structures, indexed cells, and precise unrotated labels.
tags:
  - geometric
  - wireframe
  - dark
  - atlas
---

# Wireframe City Isometric

## Overview

A dark axonometric atlas of outlined structures, indexed cells, and precise unrotated labels. Use this system for creative workspaces, exhibitions, portfolios, or small product sites that benefit from this character. Avoid applying its display ornament to dense operational tables or high-stakes form flows. The working preview uses the same content and controls as every other family.

## Design Philosophy

Make spatial relationships readable with line alone. The interface resembles a measured atlas: indexed groups and parallel edges replace depth shading and atmospheric effects.

### Why this interpretation exists

It uses line-based axonometry and map-like cells, while Floating Blocks uses filled volumes and Exploded Layers uses separated plates. Unlike Cyberpunk, it has no neon or fictional diagnostic UI. The closest outside families are Neo-Brutalism, Industrial, and Retro Futurism. Isometric organizes depth using parallel projected axes and visible planar faces. It avoids sticker shadows, metallic machinery, perspective horizons, and fictional telemetry.

## Core Principles

1. Keep the reading sequence and control purpose clearer than the decoration.
2. Use a 1.2:1 hero split, an outlined workspace, and a continuous three-cell feature grid with shared boundaries.
3. Keep ornament outside labels, input values, and focus outlines.
4. Maintain the same geometry across navigation, content, feedback, and overlays. When space is limited, reduce ornamental extent before reducing type or target size.

## Color System

| Token | Value | Role |
|---|---|---|
| `canvas` | `#142431` | Page ground |
| `surface` | `#1b3040` | Opaque reading and input surface |
| `ink` | `#edf6fc` | Body and headings |
| `muted` | `#bdcedc` | Supporting text |
| `accent` | `#a4dace` | Actions and selection |
| `control-line` | `#8ca6b8` | Control boundary |
| `line` | `#8ca6b8` | Structural line |
| `on-accent` | `#182b35` | Text on accent |
| `error` | `#ffc4cd` | Error text and icon |
| `success` | `#b5e9ce` | Success text and icon |
| `warning` | `#f3d28e` | Warning text and icon |

Use ink and muted on surface for ordinary text. Use on-accent on accent for primary controls and selections. Error, success, and warning pair with surface, an icon, and explicit wording. Control-line on surface defines input edges. These pairs must meet 4.5:1 text and 3:1 boundary contrast; verify final composites and every interaction state. Use solid backgrounds beneath all reading regions. Keep accent coverage below one quarter of the reading area; nonsemantic artwork colors never encode validation. Selection uses accent/on-accent. Do not invert these tokens to invent another mode.

## Typography

Use `ui-monospace,monospace` for display and headings and `system-ui, sans-serif` for body and controls. All fonts are system fonts with generic fallbacks; no external service is required. The geometry must still communicate the style if a named font is unavailable.

| Role | Size | Weight | Line height |
|---|---|---|---|
| Display / H1 | fluid 38–48px | 700 | 1.08 |
| H2 | 28px | 600 | 1.2 |
| H3 | 21px | 650 | 1.3 |
| Body | 16px | 400 | 1.65 |
| Lead | 18px | 400 | 1.6 |
| Label | 14px | 600 | 1.5 |
| Caption | 13px | 400 | 1.5 |
| Numeric summary | 36px | 600 | 1.2 |

Set heading tracking to -0.025em, labels to normal tracking, and short eyebrow labels to 0.08em. Keep prose to 65ch and opening copy to 44ch. Use tabular numbers for comparable values. Preserve native script shaping; use generic language fallbacks and allow headings and long identifiers to wrap. Never rasterize essential text or rely on decorative lettering for controls.

## Spacing

Use a 4px base: 4, 8, 12, 16, 24, 32, 40, 56, 80, 96px. Control padding is 12px vertically and 20px horizontally; labels sit 8px above inputs, related text 16px apart. This variant uses 24px panel padding, 32px major gaps, 64px between sections, and 32px page gutters. At narrow widths use 20px gutters and 24px panel padding. Never compress a control below 44px high to fit an ornament.

## Layout and Grid

Use a 1.2:1 hero split, an outlined workspace, and a continuous three-cell feature grid with shared boundaries. Align statistics to cell edges. Keep data and controls front-facing in all regions. Cap the outer shell at 1160px including gutters. Use CSS Grid and minmax(0, 1fr) for flexible tracks. Keep semantic order as navigation, introduction, workspace, statistics, features, testimonial, pricing, contact, footer. Decoration must not change the tab or reading order.

## Surfaces, Borders, Radius, Shadows, and Depth

Use matte navy surfaces and 1px pale structural lines. No blur, glow, chrome, scanlines, or animated grids. Use a double outside frame only for the workspace and selected plan. Base content corners use `0px`. Default form and dialog corners are square unless the variant's component direction specifies a pen outline. Local menus sit above content at layer 20, toasts at 60, and modal dialogs use the native top layer. Menus and dialogs always have opaque surface backgrounds. Separate a dialog from its backdrop with a 1px control-line border and a dark 55% scrim; decorative framing must fit inside its bounds.

## Components

Use squared controls and mono labels. Tabs use a filled index label with a persistent underline. Feature panels share edges; controls retain their own complete boundary even inside the grid.

### Buttons

Use primary accent/on-accent, secondary surface/ink with control-line edges, and underlined ink text actions. Minimum height is 48px; icon buttons are 44px square with an accessible name. Destructive actions use error on surface and a written destructive label. Hover underlines the label or strengthens its border; pressed adds an inset edge without moving the target. Loading keeps the label and dimensions, adds a textual progress indicator, and sets aria-busy. Disabled controls retain legible muted labels and a dashed boundary with a stated reason nearby.

### Forms

Use visible labels, 16px input text, 48px minimum height, and 20px bottom separation. Textareas start at 112px and can grow. Preserve native select, checkbox, radio, and range semantics; label groups with fieldset/legend and show slider values. Keep guidance outside decorative frames. Validate on blur or submission, retain entered values, associate errors using aria-describedby, and provide a linked error summary for multiple failures. Status messages explain recovery and are announced politely. Placeholders are examples, never labels.

### Cards

Use matte navy surfaces and 1px pale structural lines. No blur, glow, chrome, scanlines, or animated grids. Use a double outside frame only for the workspace and selected plan. Place heading, supporting text, status, and action in that order with 16px internal separation. Use real links for linked content; do not turn a container with nested controls into another link. Passive cards have no hover movement. Keep empty-state copy and loading status in the same content region. Pricing uses the same criteria and order in both plans and a written Recommended badge; never make price emphasis depend on color alone.

### Navigation and Menus

Use a recognizable wordmark followed by ordinary links. Mark the current location with aria-current and a visible underline. On small screens allow the links to wrap onto a second row. Dropdowns use an opaque surface, 8px interior padding, 44px rows, and the variant's border treatment. Escape and outside click dismiss; keyboard dismissal restores trigger focus. Ordinary link menus do not need application-menu roles. Keep decorative icons out of accessible names.

### Tabs

Use squared controls and mono labels. Tabs use a filled index label with a persistent underline. Feature panels share edges; controls retain their own complete boundary even inside the grid. Implement a labeled tablist with aria-selected, aria-controls, and named tabpanels. Only the selected tab is in the sequential tab order; arrows, Home, and End move and activate tabs. Preserve form state during switching. Allow horizontal tab scrolling at narrow widths while retaining readable labels and 44px targets. Selection must have a persistent line or shape in addition to color.

### Modals and Overlays

Use a native dialog with an accessible title, a visible close action, Escape dismissal, initial focus, and return focus to its opener. Width is min(560px, viewport minus 32px), padding 32px on desktop and 24px on phones, maximum height 85dvh with internal scrolling. Keep text and fields rectangular even when the surrounding ornament is pointed, sketched, projected, or tessellated. Do not layer transparent reading surfaces. Preserve the native modal focus boundary and inert background.

### Badges and Feedback

Use 13px labels, 4px by 8px padding, and a visible boundary. Status requires a written name or icon plus text; color alone is insufficient. Announce completed actions through a polite status region without moving focus. Urgent validation can use an error summary. Progress is a real value with a text equivalent; indeterminate progress is a stable message under reduced motion.

## Icons, Imagery, and Illustration

Use original wireframe cubes on parallel 30-degree axes. Faint construction lines remain outside readable regions; spatial artwork contains no fake charts or decorative status readings. Use simple 1.8px outline functional icons at 20–24px. Keep the decorative artwork at a roughly 3:1 ratio, 120px high in the showcase. Decorative SVG has no focusable content and is hidden from assistive technology. Meaningful images require concise alternative text and captions when their source matters. Use original or appropriately licensed work; do not reuse museum imagery or branded illustrations. When images are unavailable, the typography and panel construction must still carry the family identity.

## Data Visualization

Keep data graphics flat and front-facing, including in Isometric. Use labeled axes, units, direct series labels, and distinct line patterns or markers in addition to color. Supply a table or textual summary. Use ink for axes and accent for the primary series; add tested series colors only when necessary. Avoid decorative perspective, tile counts, or pen marks that imply quantitative meaning. Status colors are reserved for their documented semantics.

## Motion and Animation

Use 120ms ease-out color and border transitions for controls. Content does not animate on idle, scroll, or pointer movement. Keep opening and closing overlays immediate; preserve focus and native behavior. Honor prefers-reduced-motion by removing transitions and transforms, while retaining selected-state cues. Never rotate or scale a text label during interaction.

## Pointer Effects

**Pointer policy: none.** The projected geometry is a stable spatial explanation; moving the camera or targets would weaken reading and comparison.

No decorative tracking is used. Keep the native cursor, ordinary link/button feedback, and a visible keyboard outline. Touch receives the same pressed and selected cues as mouse input. No pointer preference toggle is needed for this family; reduced motion and forced colors retain all functional controls.

## Interaction States

- Hover: strengthen an underline or border without adding movement to passive regions.
- Focus-visible: 3px ink outline, 4px offset, and a 3px surface buffer where needed. Never clip it with decorative geometry.
- Pressed: inset edge and stable target geometry; preserve readable foreground/background pairs.
- Selected: persistent rule or frame plus aria-selected/aria-pressed as appropriate.
- Disabled: muted text, dashed border, native disabled behavior, and an explanation when needed.
- Loading: preserve dimensions and label, expose aria-busy and a status message.
- Error and success: icon and text on surface, associated with the affected control; preserve input for recovery.

## Responsive Behavior

At 761–1100px reduce major gaps to 28px where space is tight while keeping the intended composition. At 760px and below collapse hero, features, contact, and pricing to a single column in DOM order. Convert multi-column workspace rows to a vertical list. At 480px and below use a 36–40px heading, 20px gutters, and 24px panel padding; let statistics stack if labels become cramped. Preserve the family's distinctive borders and artwork while reducing their footprint. At 200% zoom and with long labels, allow natural height growth, wrap navigation, and retain full text. Use overflow-wrap:anywhere for long identifiers. Never hide overflow to conceal unreadable controls; only decorative art may be clipped inside its slot.

## Accessibility

Use semantic headings and landmarks, a skip link, native controls, explicit labels, and predictable focus order. Keep body text at 16px or above and interactive targets at least 44px. Verify text and control contrast in actual rendered states, including hover and selected. Respect reduced motion and increased contrast. In forced colors remove ornamental backgrounds and artwork, use Canvas/CanvasText/ButtonText, and keep an explicit Highlight focus outline. Ensure every action works with keyboard and touch. Automated token checks do not establish complete accessibility conformance.

## Implementation Guidance

Use scoped `[data-theme="isometric/wireframe-city"]` tokens with shared `[data-family="isometric"]` construction and explicit variant overrides. This document is complete enough to implement independently; the repository showcase is one representative application. Keep content HTML identical when comparing variants, including forms and dialogs. Use CSS and original SVG for ornament, with no external font, framework, or image dependencies. Make decorative elements noninteractive with pointer-events: none. Check the hero, feature region, pricing, form, menu, and dialog at desktop and 390px/320px widths, and verify reduced motion, forced colors, zoom, and long labels before publishing.

### Do

- Preserve the stated layout, surface construction, and component hierarchy as a coherent system.
- Use original wireframe cubes on parallel 30-degree axes.
- Compare against Neo-Brutalism, Industrial, and Retro Futurism and the two sibling interpretations before accepting a new variant.

### Don't

- Change only the colors and call it a new interpretation.
- Use ornament as a text background or an alternate input hit region.
- Add tracking animation, unrelated 3D material, branded assets, or historical claims unsupported by the actual design.

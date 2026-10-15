---
name: Tessera Court Mosaic
slug: tessera-court
family: mosaic
description: A warm courtyard composition with small tessera borders, inset panels, and continuous reading fields.
tags:
  - tessellated
  - tile
  - craft
  - geometric
---

# Tessera Court Mosaic

## Overview

A warm courtyard composition with small tessera borders, inset panels, and continuous reading fields. Use this system for creative workspaces, exhibitions, portfolios, or small product sites that benefit from this character. Avoid applying its display ornament to dense operational tables or high-stakes form flows. The working preview uses the same content and controls as every other family.

## Design Philosophy

Assemble many small pieces into a calm whole. Tessera borders mark the edges of larger reading fields, giving craft character without making every UI region a decorative tile.

### Why this interpretation exists

Tessera Court emphasizes tiny perimeter pieces. Tile Panel uses larger repeated modules; Shard Gallery uses irregular angular fragments and asymmetric negative space. The closest outside families are De Stijl, Memphis, and Pixel Art. Mosaic uses repeated small tesserae and visible grout to assemble larger fields. It avoids unequal primary-color rails, arbitrary Memphis confetti, and screen-pixel typography.

## Core Principles

1. Keep the reading sequence and control purpose clearer than the decoration.
2. Use a two-column court with a narrow tessera frieze above the opening.
3. Keep ornament outside labels, input values, and focus outlines.
4. Maintain the same geometry across navigation, content, feedback, and overlays. When space is limited, reduce ornamental extent before reducing type or target size.

## Color System

| Token | Value | Role |
|---|---|---|
| `canvas` | `#eee5d5` | Page ground |
| `surface` | `#fff9ee` | Opaque reading and input surface |
| `ink` | `#3e352d` | Body and headings |
| `muted` | `#69594c` | Supporting text |
| `accent` | `#8c422d` | Actions and selection |
| `control-line` | `#8c7763` | Control boundary |
| `line` | `#8c7763` | Structural line |
| `on-accent` | `#ffffff` | Text on accent |
| `error` | `#a1243f` | Error text and icon |
| `success` | `#28603f` | Success text and icon |
| `warning` | `#79500b` | Warning text and icon |

Use ink and muted on surface for ordinary text. Use on-accent on accent for primary controls and selections. Error, success, and warning pair with surface, an icon, and explicit wording. Control-line on surface defines input edges. These pairs must meet 4.5:1 text and 3:1 boundary contrast; verify final composites and every interaction state. Use solid backgrounds beneath all reading regions. Keep accent coverage below one quarter of the reading area; nonsemantic artwork colors never encode validation. Selection uses accent/on-accent. Do not invert these tokens to invent another mode.

## Typography

Use `Georgia,serif` for display and headings and `system-ui, sans-serif` for body and controls. All fonts are system fonts with generic fallbacks; no external service is required. The geometry must still communicate the style if a named font is unavailable.

| Role | Size | Weight | Line height |
|---|---|---|---|
| Display / H1 | fluid 38–66px | 700 | 1.08 |
| H2 | 34px | 600 | 1.2 |
| H3 | 24px | 650 | 1.3 |
| Body | 16px | 400 | 1.65 |
| Lead | 18px | 400 | 1.6 |
| Label | 14px | 600 | 1.5 |
| Caption | 13px | 400 | 1.5 |
| Numeric summary | 36px | 600 | 1.2 |

Set heading tracking to -0.025em, labels to normal tracking, and short eyebrow labels to 0.08em. Keep prose to 65ch and opening copy to 44ch. Use tabular numbers for comparable values. Preserve native script shaping; use generic language fallbacks and allow headings and long identifiers to wrap. Never rasterize essential text or rely on decorative lettering for controls.

## Spacing

Use a 4px base: 4, 8, 12, 16, 24, 32, 40, 56, 80, 96px. Control padding is 12px vertically and 20px horizontally; labels sit 8px above inputs, related text 16px apart. This variant uses 28px panel padding, 32px major gaps, 80px between sections, and 32px page gutters. At narrow widths use 20px gutters and 24px panel padding. Never compress a control below 44px high to fit an ornament.

## Layout and Grid

Use a two-column court with a narrow tessera frieze above the opening. Frame the workspace with a tiled perimeter and keep three equal feature fields separated by broad grout gaps. Cap the outer shell at 1160px including gutters. Use CSS Grid and minmax(0, 1fr) for flexible tracks. Keep semantic order as navigation, introduction, workspace, statistics, features, testimonial, pricing, contact, footer. Decoration must not change the tab or reading order.

## Surfaces, Borders, Radius, Shadows, and Depth

Use opaque ivory panels with a 6px light grout bed and a repeating 12px tessera band. Keep all text inside a quiet inset face with at least 24px clearance from the mosaic border. Base content corners use `0px`. Default form and dialog corners are square unless the variant's component direction specifies a pen outline. Local menus sit above content at layer 20, toasts at 60, and modal dialogs use the native top layer. Menus and dialogs always have opaque surface backgrounds. Separate a dialog from its backdrop with a 1px control-line border and a dark 55% scrim; decorative framing must fit inside its bounds.

## Components

Actions use square terracotta faces and a thin grout-colored inset. Tabs use a short tiled baseline with a solid selected rule. Inputs and badges keep plain boundaries so small tile lines never resemble focus rings.

### Buttons

Use primary accent/on-accent, secondary surface/ink with control-line edges, and underlined ink text actions. Minimum height is 48px; icon buttons are 44px square with an accessible name. Destructive actions use error on surface and a written destructive label. Hover underlines the label or strengthens its border; pressed adds an inset edge without moving the target. Loading keeps the label and dimensions, adds a textual progress indicator, and sets aria-busy. Disabled controls retain legible muted labels and a dashed boundary with a stated reason nearby.

### Forms

Use visible labels, 16px input text, 48px minimum height, and 20px bottom separation. Textareas start at 112px and can grow. Preserve native select, checkbox, radio, and range semantics; label groups with fieldset/legend and show slider values. Keep guidance outside decorative frames. Validate on blur or submission, retain entered values, associate errors using aria-describedby, and provide a linked error summary for multiple failures. Status messages explain recovery and are announced politely. Placeholders are examples, never labels.

### Cards

Use opaque ivory panels with a 6px light grout bed and a repeating 12px tessera band. Keep all text inside a quiet inset face with at least 24px clearance from the mosaic border. Place heading, supporting text, status, and action in that order with 16px internal separation. Use real links for linked content; do not turn a container with nested controls into another link. Passive cards have no hover movement. Keep empty-state copy and loading status in the same content region. Pricing uses the same criteria and order in both plans and a written Recommended badge; never make price emphasis depend on color alone.

### Navigation and Menus

Use a recognizable wordmark followed by ordinary links. Mark the current location with aria-current and a visible underline. On small screens allow the links to wrap onto a second row. Dropdowns use an opaque surface, 8px interior padding, 44px rows, and the variant's border treatment. Escape and outside click dismiss; keyboard dismissal restores trigger focus. Ordinary link menus do not need application-menu roles. Keep decorative icons out of accessible names.

### Tabs

Actions use square terracotta faces and a thin grout-colored inset. Tabs use a short tiled baseline with a solid selected rule. Inputs and badges keep plain boundaries so small tile lines never resemble focus rings. Implement a labeled tablist with aria-selected, aria-controls, and named tabpanels. Only the selected tab is in the sequential tab order; arrows, Home, and End move and activate tabs. Preserve form state during switching. Allow horizontal tab scrolling at narrow widths while retaining readable labels and 44px targets. Selection must have a persistent line or shape in addition to color.

### Modals and Overlays

Use a native dialog with an accessible title, a visible close action, Escape dismissal, initial focus, and return focus to its opener. Width is min(560px, viewport minus 32px), padding 32px on desktop and 24px on phones, maximum height 85dvh with internal scrolling. Keep text and fields rectangular even when the surrounding ornament is pointed, sketched, projected, or tessellated. Do not layer transparent reading surfaces. Preserve the native modal focus boundary and inert background.

### Badges and Feedback

Use 13px labels, 4px by 8px padding, and a visible boundary. Status requires a written name or icon plus text; color alone is insufficient. Announce completed actions through a polite status region without moving focus. Urgent validation can use an error summary. Progress is a real value with a text equivalent; indeterminate progress is a stable message under reduced motion.

## Icons, Imagery, and Illustration

Draw an original small-tile rosette from squares and diamonds with visible gaps. Keep tesserae flat and regular; do not imitate a specific cultural or archaeological motif. Use simple 1.8px outline functional icons at 20–24px. Keep the decorative artwork at a roughly 3:1 ratio, 120px high in the showcase. Decorative SVG has no focusable content and is hidden from assistive technology. Meaningful images require concise alternative text and captions when their source matters. Use original or appropriately licensed work; do not reuse museum imagery or branded illustrations. When images are unavailable, the typography and panel construction must still carry the family identity.

## Data Visualization

Keep data graphics flat and front-facing, including in Isometric. Use labeled axes, units, direct series labels, and distinct line patterns or markers in addition to color. Supply a table or textual summary. Use ink for axes and accent for the primary series; add tested series colors only when necessary. Avoid decorative perspective, tile counts, or pen marks that imply quantitative meaning. Status colors are reserved for their documented semantics.

## Motion and Animation

Use 120ms ease-out color and border transitions for controls. Content does not animate on idle, scroll, or pointer movement. Keep opening and closing overlays immediate; preserve focus and native behavior. Honor prefers-reduced-motion by removing transitions and transforms, while retaining selected-state cues. Never rotate or scale a text label during interaction.

## Pointer Effects

**Pointer policy: none.** Tessellated ornament belongs to fixed assembled surfaces; cursor-following pieces would imply unsupported editing behavior.

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

Use scoped `[data-theme="mosaic/tessera-court"]` tokens with shared `[data-family="mosaic"]` construction and explicit variant overrides. This document is complete enough to implement independently; the repository showcase is one representative application. Keep content HTML identical when comparing variants, including forms and dialogs. Use CSS and original SVG for ornament, with no external font, framework, or image dependencies. Make decorative elements noninteractive with pointer-events: none. Check the hero, feature region, pricing, form, menu, and dialog at desktop and 390px/320px widths, and verify reduced motion, forced colors, zoom, and long labels before publishing.

### Do

- Preserve the stated layout, surface construction, and component hierarchy as a coherent system.
- Draw an original small-tile rosette from squares and diamonds with visible gaps.
- Compare against De Stijl, Memphis, and Pixel Art and the two sibling interpretations before accepting a new variant.

### Don't

- Change only the colors and call it a new interpretation.
- Use ornament as a text background or an alternate input hit region.
- Add tracking animation, unrelated 3D material, branded assets, or historical claims unsupported by the actual design.

---
name: torn-page-divider
description: Recreate realistic hand-torn paper dividers, deckled paper edges, and organic paper rip section transitions using SVG filters (feTurbulence, feDisplacementMap), exposed cotton pulp deckle rims, cast shadows, and fiber fringe. Use whenever creating or customizing torn paper dividers, scrapbooking paper borders, or deckled section dividers in web applications.
---

# Torn Page Divider Skill

This skill provides the comprehensive guide, architectural principles, and ready-to-use code implementations for recreating photorealistic **hand-torn paper dividers** and **deckled edge transitions** between page sections.

## Why Standard Dividers Look Fake vs. Realistic

Most SVG or CSS "torn paper" effects look like synthetic zig-zags or cookie-cutter sawteeth. Photorealistic torn paper mimics the microscopic physical behavior of heavyweight cotton cardstock being torn by hand:

1. **Directional Grain Fibers**: Paper is made of pressed cellulose fibers aligned in a grain direction. Tearing paper across grain produces micro-displacement that is stretched horizontally.
2. **Exposed White Pulp Core (The Deckle Rim)**: When coated or colored paper tears, the outer dye shears off, exposing the uncolored raw inner cotton pulp rim (deckled edge) slightly protruding along the rip.
3. **Natural Diagonal Tear Drift**: Human hands do not tear in a straight horizontal line; hand-tearing naturally drifts diagonally (slanted slope) or steps between fiber plates.
4. **Tactile Contact Cast Shadow**: Heavyweight cardstock has physical thickness (~0.3mm–0.8mm). The top sheet casts a tight contact shadow onto the sheet below it.
5. **Loose Fiber Fringes (Deckle Whisps)**: Microscopic strands of cotton deckle project outward along the edge, captured with dashed fiber lines.

---

## The 5-Layer SVG Stack

A realistic torn divider is built from 5 overlapping SVG layers rendered inside an SVG with `preserveAspectRatio="none"`:

```
[ Top Section Background (fromColor) ]
   │
   ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. Filter Definition (<feTurbulence> + <feDisplacementMap>) │
├─────────────────────────────────────────────────────────────┤
│ 2. Contact Drop Shadow  (translate y +3.5px, blurred, dark) │
├─────────────────────────────────────────────────────────────┤
│ 3. Exposed Cotton Pulp  (white stroke, width ~4px)          │
├─────────────────────────────────────────────────────────────┤
│ 4. Main Torn Sheet Fill (filled polygon to bottom, toColor) │
├─────────────────────────────────────────────────────────────┤
│ 5. Fiber Deckle Whisps  (dashed semi-transparent white lines)│
└─────────────────────────────────────────────────────────────┘
   │
   ▼
[ Bottom Section Background (toColor) ]
```

---

## Core SVG Filter: The Directional Grain Secret

The key to paper-like displacement instead of water/liquid ripples is **anisotropic base frequency** in `<feTurbulence>`:

```xml
<filter id="paper-tear" x="-5%" y="-15%" width="110%" height="140%">
  <!-- Low X frequency (0.025) stretches fibers horizontally; 
       High Y frequency (0.16) creates tight vertical rips -->
  <feTurbulence
    type="fractalNoise"
    baseFrequency="0.025 0.16"
    numOctaves="4"
    result="noise"
    seed="48"
  />
  <feDisplacementMap
    in="SourceGraphic"
    in2="noise"
    scale="6"
    xChannelSelector="R"
    yChannelSelector="G"
    result="tornEdge"
  />
</filter>
```

- **`baseFrequency="0.025 0.16"`**: Horizontally elongates the noise cells, replicating horizontal cellulose grain.
- **`numOctaves="4"`**: Adds fine micro-roughness without excessive GPU overhead.
- **`scale="6"`**: Amount of pixel displacement (4 for fine parchment, 6–8 for heavy cotton cardstock).

---

## Implementation Steps for Any Project

### 1. Structure the HTML / React Wrapper
- Set `backgroundColor: fromColor` on the wrapper container.
- Set `height` between `70px` and `110px` (ideal default: `80px` or `90px`).
- Apply `-1px` top and bottom margins to kill sub-pixel gap lines between sections:
  ```css
  margin-top: -1px;
  margin-bottom: -1px;
  ```
- Make it non-interactive and accessible: `aria-hidden="true"`, `pointer-events-none`, `select-none`.

### 2. Choose or Generate a Tear Polyline
The coordinate space is typically standardized at `viewBox="0 0 1200 100"`.
Each variant has an organic diagonal slant. For example:
- **Variant 1 (Downward Slope)**: Starts at `y=24` on left, slants to `y=56` on right.
- **Variant 2 (Upward Slope)**: Starts at `y=58` on left, climbs to `y=22` on right.
- **Variant 3 (Steep Step Break)**: Starts at `y=18`, drops to `y=60`.

See [tear-geometries.md](./references/tear-geometries.md) for all 6 coordinate paths.

### 3. Compute the Main Fill Polygon
Close the tear path to the bottom edge:
```js
const mainPolygon = `${tearLine} L 1220,115 L -20,115 Z`;
```

### 4. Adjust the Contact Shadow by Target Tone
The shadow must adapt to the background tone it falls on:
- When falling onto **dark/black sections** (`#0D1512`, `#000000`, dark slate):
  Use `rgba(0, 0, 0, 0.65)`.
- When falling onto **light/cream sections** (`#EDE6D3`, `#FDFBF7`, warm white):
  Use warm umber/sepia `rgba(43, 38, 32, 0.35)`.

### 5. Add Variety across Multiple Sections
Never use the same divider shape consecutively:
- Rotate between variants 1 through 6.
- Use `flipped={true}` (`transform: scaleX(-1)`).
- Optionally apply a subtle `skewY(-1deg)` or `skewY(1.2deg)`.

---

## Quick Recipes

### React + Tailwind Component
See the complete implementation in [examples/TornDivider.tsx](./examples/TornDivider.tsx).

Usage:
```tsx
import { TornDivider } from './components/TornDivider';

// Between dark hero and cream content
<Hero />
<TornDivider fromColor="#0D1512" toColor="#EDE6D3" variant={1} height={85} />
<ContentSection />

// Between cream content and dark footer (flipped for natural variety)
<TornDivider fromColor="#EDE6D3" toColor="#0D1512" variant={3} flipped height={90} />
<Footer />
```

### Pure HTML + CSS (Zero-Dependency)
See [examples/torn-divider.html](./examples/torn-divider.html) for a standalone demo you can open directly in any browser.

### Vue 3 SFC
See [examples/TornDivider.vue](./examples/TornDivider.vue) for the Vue 3 component.

---

## Technical Considerations & Edge Cases

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **1px gap/flicker line** | Browser sub-pixel rounding at viewport edges | Set `margin-top: -1px` and `margin-bottom: -1px` on container. Extend polygon 20px beyond bounds (`-20` to `1220`). |
| **Duplicate filter ID collision** | Multiple dividers sharing the same SVG `<filter id="...">` | Generate unique IDs using React `useId()`, nanoid, or instance counters. |
| **Edge clipping during displacement** | Displacement map pushes pixels outside the filter bounding box | Set filter region: `x="-5%" y="-15%" width="110%" height="140%"`. |
| **Distorted fibers on narrow screens** | SVG scaling distorting noise coordinates | Filter coordinates are relative to the element; anisotropic `0.025 0.16` preserves directional look across all viewport widths. |

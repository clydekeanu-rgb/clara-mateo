# Photorealistic Torn Paper Anatomy & SVG Math

This document breaks down the optical physics and SVG filter math used to create convincing torn heavyweight paper.

---

## 1. Physical Anatomy of Torn Heavyweight Paper

When thick, fibrous cotton paper or watercolor paper (e.g., 300gsm Strathmore / Arches) is torn, it does not shear cleanly like plastic or scissors. It exhibits five distinct physical characteristics:

```
                  Top Paper Sheet Surface (fromColor)
───────────────────────────────────────────────────────────────────────
           \                                              /
            \  [3] Main Jagged Torn Edge (toColor)       /
  ▲          \──────────────────────────────────────────/
  │              \                                  /
3.5px             \  [2] White Exposed Pulp Core   /   (0.5–1mm bevel)
  │                \──────────────────────────────/
  ▼                     \                    /
       ░░░░░░░░░░░░░░░░░░ [1] Contact Drop Shadow ░░░░░░░░░░░░░░░░░░░
───────────────────────────────────────────────────────────────────────
               Bottom Paper Sheet Surface (toColor)
```

1. **Fiber Grain Alignment**: Paper fibers are oriented predominantly in the direction of the paper mill's roller conveyor. Tearing perpendicular to or across the grain produces jagged bursts elongated along the grain.
2. **Exposed Bevel (The Deckle Rim)**: Paper is dyed on its surface or through its mass, but the inner matrix consists of white/cream raw cellulose fibers. When torn at an angle, one sheet exposes a 0.5mm–1.5mm wide strip of its inner white pulp before dipping down.
3. **Contact Shadowing**: Because the upper sheet sits on top of the lower sheet, ambient light creates a soft, immediate contact shadow directly below the torn lip.
4. **Deckle Fringe Whisps**: Strands of unsevered cellulose fibers fray out into the void, catching the light as semi-transparent speckles.

---

## 2. SVG Filter Mathematics

### The Directional Grain Filter
Standard SVG `<feTurbulence>` creates uniform isotropic clouds when `baseFrequency` is a single scalar. To simulate aligned cellulose fibers, we supply two different frequencies:

```xml
<filter id="paper-tear" x="-5%" y="-15%" width="110%" height="140%">
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

#### Why `baseFrequency="0.025 0.16"`?
- **X frequency (`0.025`)**: A small value creates long, smooth waves along the horizontal axis (approx. 40px cycle length in coordinate space).
- **Y frequency (`0.16`)**: A value 6.4x higher creates rapid, tight variations along the vertical axis (approx. 6.25px cycle length).
- **Ratio (1 : 6.4)**: Forces displacement to compress horizontally and stretch vertically, creating the look of sheared longitudinal fibers rather than soft watercolor puddles.

#### Why `type="fractalNoise"` vs `turbulence`?
- `fractalNoise` uses fractional Brownian motion where amplitudes are summed smoothly:
  $$\text{Color} = \sum_{i=0}^{\text{octaves}-1} \frac{\text{noise}(2^i \cdot p)}{2^i}$$
  This yields gentle gradient transitions ideal for natural fiber clumping.
- `turbulence` takes the absolute value of the noise, creating sharp creased lines that look more like lightning bolts or cracked glass than torn paper.

#### `feDisplacementMap` Settings
- **`scale="6"`**: Shifts pixels up to $\pm 3\text{px}$ from their nominal vector path.
  - Scale 3–4: Fine notebook paper or receipt paper.
  - Scale 6: Heavyweight 250–300gsm wedding cardstock.
  - Scale 8–10: Rough handmade recycled paper with visible straw/hemp fibers.
- **`xChannelSelector="R"` and `yChannelSelector="G"`**: Decouples the horizontal displacement from the vertical displacement for natural organic chaos.

---

## 3. Layer Stacking and Coordinates

All vectors are plotted on a normalized coordinate grid of `0 0 1200 100`:
- Margin bleed: paths start at `X = -20` and end at `X = 1220` to guarantee complete edge coverage regardless of subpixel rendering.
- Path coordinates stay roughly between `Y = 15` and `Y = 70`, leaving room for the height of the bottom sheet fill.

### Layer 1: Contact Drop Shadow
```xml
<path
  d={tearLine}
  fill="none"
  stroke={shadowColor}
  strokeWidth="6"
  class="opacity-75 blur-[2px]"
  transform="translate(0, 3.5)"
  filter="url(#paper-tear)"
/>
```
- Shifted down by `3.5px` (`transform="translate(0, 3.5)"`).
- Blurred with CSS `filter: blur(2px)` or SVG `<feGaussianBlur stdDeviation="1.5"/>`.
- Width of 6px provides a soft penumbra under the jagged lip.

### Layer 2: The Deckle Rim (Inner Pulp)
```xml
<path
  d={tearLine}
  fill="none"
  stroke="#FFFFFF"
  strokeWidth="4"
  strokeLinecap="round"
  strokeLinejoin="round"
  opacity="0.95"
  filter="url(#paper-tear)"
/>
```
- Placed directly along the tear path with stroke width `4px`.
- Because the top sheet (Layer 3) will be drawn on top, only the bottom ~1.5px to 2px of this stroke will peek out from underneath, mimicking the beveled core!

### Layer 3: Main Body Sheet
```xml
<!-- Closed polygon extending to the bottom -->
<path
  d={`${tearLine} L 1220,115 L -20,115 Z`}
  fill={toColor}
  filter="url(#paper-tear)"
/>
```
- Extends to `Y = 115` to ensure full bleed coverage into the succeeding section.

### Layer 4 & 5: Deckle Whisps & Frayed Fibers
```xml
<path
  d={tearLine}
  fill="none"
  stroke="rgba(255, 255, 255, 0.92)"
  strokeWidth="1.8"
  strokeDasharray="4 6 1 5 7 3 2 4"
  strokeLinecap="round"
  filter="url(#paper-tear)"
/>
<path
  d={tearLine}
  fill="none"
  stroke="rgba(255, 255, 255, 0.65)"
  strokeWidth="1"
  strokeDasharray="2 8 3 6 1 4"
  strokeLinecap="round"
  transform="translate(0, -0.5)"
  filter="url(#paper-tear)"
/>
```
- Non-repeating pseudo-random dash arrays (`4 6 1 5 7 3 2 4`) create irregular broken specks.
- Hugs the exact boundary to give the illusion of loose fibers catching rim lighting.

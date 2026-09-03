# Tear Path Geometries Library

This reference catalogs 6 distinct hand-torn polylines plotted across a standardized `1200 x 100` coordinate space (`viewBox="0 0 1200 100"`).

All lines start at $X = -20$ and terminate at $X = 1220$ to ensure complete bleed coverage on screens with sub-pixel rendering.

---

## The 6 Canonical Profiles

### Variant 1: Skewed Downward Slope
Starts high on the left ($Y = 24$), slants gently down to $Y = 56$ on the right. Simulates a right-handed pull tearing down across the sheet.

```text
M -20,24 L 65,22 L 140,32 L 225,27 L 315,39 L 410,33 L 505,46 L 600,40 L 700,52 L 800,45 L 895,57 L 995,49 L 1095,60 L 1220,54
```

- **Characteristics**: Balanced rhythm with subtle 6–10px micro-plateaus.
- **Best for**: Standard section transitions (e.g., Hero into Intro).

---

### Variant 2: Skewed Upward Slope
Starts low on the left ($Y = 58$), climbs upward across to $Y = 22$ on the right.

```text
M -20,58 L 80,52 L 170,61 L 265,47 L 360,54 L 460,42 L 560,49 L 665,37 L 770,43 L 875,31 L 980,36 L 1090,26 L 1220,30
```

- **Characteristics**: Ascending diagonal with organic dips every 90–100px.
- **Best for**: Upbeat, rising content (e.g., into Gallery or Events Schedule).

---

### Variant 3: Steep Diagonal Break with Dynamic Center Plateau
Starts high ($Y = 18$), makes sharp stepped drops around the center, finishing at $Y = 66$.

```text
M -20,18 L 85,26 L 175,20 L 280,38 L 390,29 L 510,48 L 620,41 L 735,58 L 845,50 L 960,63 L 1080,56 L 1220,66
```

- **Characteristics**: Pronounced angularity and deeper valleys.
- **Best for**: Dramatic contrast shifts (e.g., Light Cream to Deep Night / Black).

---

### Variant 4: Sweeping Diagonal Lift
Starts low ($Y = 62$), makes broad, sweeping spans rising smoothly to $Y = 20$.

```text
M -20,62 L 110,54 L 235,63 L 365,47 L 500,52 L 640,36 L 780,41 L 920,27 L 1060,31 L 1220,20
```

- **Characteristics**: Longer point spans (120–140px between vertices) producing softer, broader curves once displaced by the filter.
- **Best for**: Elegant, calm sections (e.g., Dress Code, Venue details).

---

### Variant 5: Asymmetrical Slanted Shearing
Starts at $Y = 26$, exhibits a rapid drop to $Y = 52$ in the first third, followed by an undulating plateau.

```text
M -20,26 L 75,34 L 160,25 L 260,48 L 380,39 L 510,58 L 650,49 L 790,56 L 930,44 L 1070,49 L 1220,38
```

- **Characteristics**: Asymmetric focal point shifted toward the left side of the page.
- **Best for**: Breaking symmetry when used between symmetrical grid sections.

---

### Variant 6: Natural Hand-Tear Angle with Subtle Wave
Starts mid-height ($Y = 50$), dips down to $Y = 64$, then slopes up to $Y = 24$.

```text
M -20,50 L 90,58 L 195,44 L 310,62 L 435,48 L 565,54 L 700,39 L 835,45 L 970,30 L 1095,35 L 1220,24
```

- **Characteristics**: Most natural human tearing pattern where the paper initially resists, rips down along a fiber crease, then pulls upward to complete the break.
- **Best for**: Final transitions (e.g., Details into RSVP / Footer).

---

## How to Construct Custom Polylines

If you need a new geometry:
1. Keep the grid at `viewBox="0 0 1200 100"`.
2. Start point: `M -20,{Y1}` where $Y_1 \in [20, 60]$.
3. Place 10 to 14 points along the X axis spaced roughly $80\text{px} - 120\text{px}$ apart.
4. Modulate the Y coordinate with alternating small steps ($\pm 5\text{px} - 15\text{px}$) while preserving an overall net slope ($\Delta Y \approx 20\text{px} - 45\text{px}$ across the full width).
5. End point: `L 1220,{Y_end}`.
6. To form the filled polygon for the lower section:
   `d={`${tearLine} L 1220,115 L -20,115 Z`}`

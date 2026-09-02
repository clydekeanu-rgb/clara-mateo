import React, { useId } from 'react';

interface TornDividerProps {
  /** Top section color (e.g. '#0D1512' for night, '#EDE6D3' for cream, 'transparent') */
  fromColor?: string;
  /** Bottom section color (e.g. '#EDE6D3' for cream, '#0D1512' for night) */
  toColor?: string;
  /** Invert horizontally for natural variety */
  flipped?: boolean;
  /** Height in px */
  height?: number;
  /** Variation pattern: 1 through 6 for distinct tearing profiles */
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Optional additional subtle skew angle in degrees (e.g. -1.2, 1.5) */
  skewAngle?: number;
  /** Optional custom pulp edge color (defaults to pure white '#FFFFFF') */
  pulpColor?: string;
  className?: string;
  id?: string;
}

/**
 * Realistic Hand-Torn Heavyweight Cotton Paper Divider
 * Features:
 * - Skewed diagonal rip geometry simulating natural hand-tear angle across the page
 * - 6 distinct organic stretched tear geometries with authentic slopes
 * - Pure crisp white cotton pulp inner core (exposed deckled edge bevel)
 * - Horizontally stretched SVG turbulence for authentic directional paper grain fibers
 * - Realistic contact drop-shadow for tactile depth
 */
export const TornDivider: React.FC<TornDividerProps> = ({
  fromColor = '#0D1512',
  toColor = '#EDE6D3',
  flipped = false,
  height = 90,
  variant = 1,
  skewAngle = 0,
  pulpColor = '#FFFFFF',
  className = '',
  id,
}) => {
  const filterId = useId().replace(/:/g, '-');

  // Skewed and stretched organic rip paths across a 1200px coordinate grid (height 100)
  // Each variant has a distinct diagonal slant/skew simulating real asymmetrical hand tearing
  const tearLines: Record<number, string> = {
    // 1. Skewed Downward Slope (Starts high left y=24, slants down to y=56 on right)
    1: "M -20,24 L 65,22 L 140,32 L 225,27 L 315,39 L 410,33 L 505,46 L 600,40 L 700,52 L 800,45 L 895,57 L 995,49 L 1095,60 L 1220,54",
    // 2. Skewed Upward Slope (Starts lower left y=58, slants up across to y=22 on right)
    2: "M -20,58 L 80,52 L 170,61 L 265,47 L 360,54 L 460,42 L 560,49 L 665,37 L 770,43 L 875,31 L 980,36 L 1090,26 L 1220,30",
    // 3. Steep Diagonal Break with Dynamic Center Plateau (Starts y=18, steps down to y=60)
    3: "M -20,18 L 85,26 L 175,20 L 280,38 L 390,29 L 510,48 L 620,41 L 735,58 L 845,50 L 960,63 L 1080,56 L 1220,66",
    // 4. Sweeping Diagonal Lift (Starts y=62 on left, broad sweeping rise to y=20 on right)
    4: "M -20,62 L 110,54 L 235,63 L 365,47 L 500,52 L 640,36 L 780,41 L 920,27 L 1060,31 L 1220,20",
    // 5. Asymmetrical Slanted Shearing (Starts y=26, sudden drop to y=52, gentle rise to y=42)
    5: "M -20,26 L 75,34 L 160,25 L 260,48 L 380,39 L 510,58 L 650,49 L 790,56 L 930,44 L 1070,49 L 1220,38",
    // 6. Natural Hand-Tear Angle (Starts y=50, dips to y=64, slants up across to y=25)
    6: "M -20,50 L 90,58 L 195,44 L 310,62 L 435,48 L 565,54 L 700,39 L 835,45 L 970,30 L 1095,35 L 1220,24"
  };

  const tearLine = tearLines[variant] || tearLines[1];
  const mainPolygon = `${tearLine} L 1220,115 L -20,115 Z`;

  // Dynamic shadow density based on bottom tone
  const isNightBottom = toColor === '#0D1512' || toColor === 'var(--color-night)' || toColor.toLowerCase().includes('0d1512');
  const shadowColor = isNightBottom ? 'rgba(0, 0, 0, 0.65)' : 'rgba(43, 38, 32, 0.35)';

  // Build transform string with optional horizontal flip and skew
  const transforms = [
    flipped ? 'scaleX(-1)' : '',
    skewAngle !== 0 ? `skewY(${skewAngle}deg)` : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      id={id}
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none z-20 ${className}`}
      style={{
        backgroundColor: fromColor,
        height: `${height}px`,
        marginTop: '-1px',
        marginBottom: '-1px',
        transform: transforms || 'none',
        transformOrigin: 'center center',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="w-full h-full block overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Horizontally-stretched fractal noise filter for directional paper grain fibers */}
          <filter id={`paper-tear-${filterId}`} x="-5%" y="-15%" width="110%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025 0.16"
              numOctaves="4"
              result="noise"
              seed={variant * 37 + 11}
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
        </defs>

        {/* 1. Realistic Cast Contact Shadow directly below the torn edge */}
        <path
          d={tearLine}
          fill="none"
          stroke={shadowColor}
          strokeWidth="6"
          className="opacity-75 blur-[2px]"
          transform="translate(0, 3.5)"
          filter={`url(#paper-tear-${filterId})`}
        />

        {/* 2. Exposed Cotton Pulp Deckle Rim: Sits directly under the rim and slightly protrudes above */}
        <path
          d={tearLine}
          fill="none"
          stroke={pulpColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.95}
          filter={`url(#paper-tear-${filterId})`}
        />

        {/* 3. Top Paper Sheet with stretched jagged displacement */}
        <path
          d={mainPolygon}
          fill={toColor}
          filter={`url(#paper-tear-${filterId})`}
        />

        {/* 4. Organic White Fiber Speckles and Deckle Fringe directly hugging the torn lip */}
        <path
          d={tearLine}
          fill="none"
          stroke="rgba(255, 255, 255, 0.92)"
          strokeWidth="1.8"
          strokeDasharray="4 6 1 5 7 3 2 4"
          strokeLinecap="round"
          filter={`url(#paper-tear-${filterId})`}
        />
        <path
          d={tearLine}
          fill="none"
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="1"
          strokeDasharray="2 8 3 6 1 4"
          strokeLinecap="round"
          transform="translate(0, -0.5)"
          filter={`url(#paper-tear-${filterId})`}
        />
      </svg>
    </div>
  );
};

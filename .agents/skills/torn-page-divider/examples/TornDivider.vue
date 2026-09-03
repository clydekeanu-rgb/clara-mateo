<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  fromColor?: string;
  toColor?: string;
  flipped?: boolean;
  height?: number;
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  skewAngle?: number;
  pulpColor?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fromColor: '#0D1512',
  toColor: '#EDE6D3',
  flipped: false,
  height: 80,
  variant: 1,
  skewAngle: 0,
  pulpColor: '#FFFFFF',
});

// Unique filter identifier for Vue instance
const filterId = `vue-tear-${Math.random().toString(36).slice(2, 9)}`;

const tearLines: Record<number, string> = {
  1: 'M -20,24 L 65,22 L 140,32 L 225,27 L 315,39 L 410,33 L 505,46 L 600,40 L 700,52 L 800,45 L 895,57 L 995,49 L 1095,60 L 1220,54',
  2: 'M -20,58 L 80,52 L 170,61 L 265,47 L 360,54 L 460,42 L 560,49 L 665,37 L 770,43 L 875,31 L 980,36 L 1090,26 L 1220,30',
  3: 'M -20,18 L 85,26 L 175,20 L 280,38 L 390,29 L 510,48 L 620,41 L 735,58 L 845,50 L 960,63 L 1080,56 L 1220,66',
  4: 'M -20,62 L 110,54 L 235,63 L 365,47 L 500,52 L 640,36 L 780,41 L 920,27 L 1060,31 L 1220,20',
  5: 'M -20,26 L 75,34 L 160,25 L 260,48 L 380,39 L 510,58 L 650,49 L 790,56 L 930,44 L 1070,49 L 1220,38',
  6: 'M -20,50 L 90,58 L 195,44 L 310,62 L 435,48 L 565,54 L 700,39 L 835,45 L 970,30 L 1095,35 L 1220,24',
};

const tearLine = computed(() => tearLines[props.variant] || tearLines[1]);
const mainPolygon = computed(() => `${tearLine.value} L 1220,115 L -20,115 Z`);

const isNight = computed(() => {
  const c = props.toColor.toLowerCase();
  return c === '#0d1512' || c === '#000000' || c.includes('night');
});

const shadowColor = computed(() =>
  isNight.value ? 'rgba(0, 0, 0, 0.65)' : 'rgba(43, 38, 32, 0.35)'
);

const transformStyle = computed(() => {
  const parts = [];
  if (props.flipped) parts.push('scaleX(-1)');
  if (props.skewAngle !== 0) parts.push(`skewY(${props.skewAngle}deg)`);
  return parts.join(' ') || 'none';
});
</script>

<template>
  <div
    :id="id"
    class="torn-divider-wrapper"
    :style="{
      backgroundColor: fromColor,
      height: `${height}px`,
      transform: transformStyle,
    }"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      class="torn-divider-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter :id="filterId" x="-5%" y="-15%" width="110%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025 0.16"
            numOctaves="4"
            result="noise"
            :seed="variant * 37 + 11"
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

      <!-- 1. Contact Drop Shadow -->
      <path
        :d="tearLine"
        fill="none"
        :stroke="shadowColor"
        stroke-width="6"
        class="shadow-layer"
        transform="translate(0, 3.5)"
        :filter="`url(#${filterId})`"
      />

      <!-- 2. Exposed Cotton Deckle Rim -->
      <path
        :d="tearLine"
        fill="none"
        :stroke="pulpColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.95"
        :filter="`url(#${filterId})`"
      />

      <!-- 3. Lower Paper Sheet Fill -->
      <path
        :d="mainPolygon"
        :fill="toColor"
        :filter="`url(#${filterId})`"
      />

      <!-- 4. Deckle Fringe & Loose Fibers -->
      <path
        :d="tearLine"
        fill="none"
        stroke="rgba(255, 255, 255, 0.92)"
        stroke-width="1.8"
        stroke-dasharray="4 6 1 5 7 3 2 4"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
      />
      <path
        :d="tearLine"
        fill="none"
        stroke="rgba(255, 255, 255, 0.65)"
        stroke-width="1"
        stroke-dasharray="2 8 3 6 1 4"
        stroke-linecap="round"
        transform="translate(0, -0.5)"
        :filter="`url(#${filterId})`"
      />
    </svg>
  </div>
</template>

<style scoped>
.torn-divider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  user-select: none;
  pointer-events: none;
  z-index: 20;
  margin-top: -1px;
  margin-bottom: -1px;
  transform-origin: center center;
}

.torn-divider-svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
}

.shadow-layer {
  opacity: 0.75;
  filter: blur(2px);
}
</style>

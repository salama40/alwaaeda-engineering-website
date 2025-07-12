<script setup lang="ts">
import SvgNode, { SvgNodeProps } from '../../common/SvgNode.vue'
import { Ref } from 'vue'

defineProps({
  inputLines: {
    type: Array as () => Ref<SvgNodeProps>[],
    required: true,
  },
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="844"
    height="644"
    viewBox="0 0 844 644"
    fill="none"
    class="input-lines-canvas"
  >
    <rect width="100%" height="100%" fill="url(#background_ambience_gradient)" class="background-ambience" />

    <g v-for="(inputLine, index) in inputLines" :key="inputLine.value.path" class="line-group">
      <path
        :d="inputLine.value.path"
        stroke="var(--line-base-color)"
        stroke-width="1"
        stroke-opacity="0.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <path
        :d="inputLine.value.path"
        stroke="url(#energy_flow_gradient)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="energy-flow-line"
        :style="{ 'animation-delay': `${index * 0.15}s` }"
      />

      <path
        :d="inputLine.value.path"
        stroke="var(--pulse-color)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="10 200"
        class="line-pulse"
        :style="{ 'animation-delay': `${index * 0.15}s` }"
      />

      <path
        :d="inputLine.value.path"
        stroke="url(#energy_glow_gradient)"
        stroke-width="8"
        stroke-opacity="0.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="line-main-glow"
        :style="{ 'animation-delay': `${index * 0.15}s` }"
      />

      <SvgNode v-bind="inputLine.value" />
    </g>

    <defs>
      <linearGradient
        id="background_ambience_gradient"
        x1="0%" y1="0%" x2="100%" y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stop-color="#0A111A" stop-opacity="0" />
        <stop offset="50%" stop-color="#122B42" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#0A111A" stop-opacity="0" />
      </linearGradient>

      <linearGradient
        id="energy_flow_gradient"
        x1="88.1032" y1="324.167" x2="843.505" y2="324.167"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stop-color="#41D1FF" stop-opacity="0.5" />
        <stop offset="30%" stop-color="#5B8CCF" stop-opacity="0.8" />
        <stop offset="60%" stop-color="#8E5FF5" stop-opacity="1" />
        <stop offset="90%" stop-color="#FF5BCA" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#41D1FF" stop-opacity="0.5" />
      </linearGradient>

      <linearGradient
        id="energy_glow_gradient"
        x1="88.1032" y1="324.167" x2="843.505" y2="324.167"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stop-color="#41D1FF" stop-opacity="0" />
        <stop offset="30%" stop-color="#8E5FF5" stop-opacity="0.4" />
        <stop offset="70%" stop-color="#FF5BCA" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#41D1FF" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
/* Define brand colors as CSS variables for easy customization */
:root {
  --line-base-color: #1a3a5a; /* A very subtle dark blue for the base line */
  --pulse-color: #8E5FF5; /* Vibrant purple for the moving pulse */
  --light-accent-blue: #2A5D8A; /* Dot color */
  /* Gradients are defined in SVG defs */
}

.input-lines-canvas {
  transform: translate3d(0, 0, 0);
  overflow: visible; /* Crucial for blur and glow effects not to be clipped */
}

.background-ambience {
  animation: background-fade 10s infinite alternate ease-in-out; /* Subtle breathing effect */
}

.line-group {
  /* This group helps with hover effects on individual lines */
  cursor: pointer; /* Indicates interactivity */
}

.line-group:hover .energy-flow-line {
  stroke-width: 4.5; /* Line gets thicker on hover */
  filter: drop-shadow(0px 0px 10px var(--pulse-color)); /* Stronger shadow/glow */
}

.line-group:hover .line-pulse {
  animation-duration: 0.8s; /* Pulse speeds up on hover */
  stroke-width: 6; /* Pulse gets thicker */
}

.line-group:hover .line-main-glow {
  stroke-width: 12; /* Glow expands on hover */
  stroke-opacity: 0.4;
}

.line-group path {
  transition:
    stroke-width 0.3s ease-out,
    filter 0.3s ease-out,
    stroke-opacity 0.3s ease-out; /* Smooth transitions for hover effects */
}

/* Base line - always visible, very subtle */
.line-group > path:nth-child(1) {
  /* This targets the first path element which is our base line */
  animation: line-fade-in 1.5s ease-out forwards;
}

/* Main energy flow line - animated */
.energy-flow-line {
  filter: drop-shadow(0px 0px 5px rgba(91, 140, 207, 0.4));
  animation: draw-and-fade 2.5s ease-out forwards, glow-flicker 4s infinite ease-in-out;
}

/* The moving pulse effect */
.line-pulse {
  animation: move-pulse 2s linear infinite, fade-in-pulse 2s ease-out forwards; /* Continuous movement + initial fade-in */
  filter: blur(2px) drop-shadow(0px 0px 8px var(--pulse-color));
}

/* The main line glow */
.line-main-glow {
  filter: blur(5px);
  animation: fade-in-glow 3s ease-out forwards;
}

/* SvgNode (dots) styling through deep selector */
.input-lines-canvas:deep(.circle-dot) {
  fill: var(--light-accent-blue);
  filter: drop-shadow(0px 0px 10px var(--light-accent-blue)); /* Stronger glow for the dot */
  animation: dot-pulse 1.8s infinite alternate ease-in-out;
  display: block !important;
}

/* Animations */
@keyframes background-fade {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes draw-and-fade {
  0% {
    stroke-dasharray: 0 1000;
    stroke-opacity: 0;
  }
  50% {
    stroke-dasharray: 1000 0;
    stroke-opacity: 0.9;
  }
  100% {
    stroke-dasharray: 1000 0;
    stroke-opacity: 0.8; /* Slight fade after drawing */
  }
}

@keyframes glow-flicker {
  0%, 100% { filter: drop-shadow(0px 0px 5px rgba(91, 140, 207, 0.4)); }
  50% { filter: drop-shadow(0px 0px 8px rgba(91, 140, 207, 0.7)); }
}

@keyframes move-pulse {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -210; } /* Length of the dash + gap for one cycle */
}

@keyframes fade-in-pulse {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1; }
}

@keyframes fade-in-glow {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1; }
}

@keyframes dot-pulse {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.8; }
}

@keyframes line-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Media Queries for responsiveness */
@media (max-width: 767px) {
  .energy-flow-line {
    stroke-width: 2.5;
  }
  .line-pulse {
    stroke-width: 3.5;
  }
  .line-main-glow {
    stroke-width: 6;
    filter: blur(3px);
  }
  .input-lines-canvas:deep(.circle-dot) {
    filter: drop-shadow(0px 0px 6px var(--light-accent-blue));
  }
}
</style>
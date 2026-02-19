<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="24" y="28" class="label title">Ordered, immutable log</text>
      <g v-for="i in 6" :key="i">
        <rect :x="24 + (i - 1) * 48" y="44" width="42" height="36" rx="4" class="box block" />
        <text :x="45 + (i - 1) * 48" :y="65" class="label">{{ i - 1 }}</text>
      </g>
      <path d="M 302 62 L 318 62" stroke="var(--amber)" stroke-width="2" />
      <rect x="308" y="50" width="28" height="24" rx="4" class="box append" />
      <text x="322" y="66" class="label">+</text>
      <text x="160" y="115" class="label small">Durability · Replay from any position</text>
      <circle r="3" fill="var(--red)"><animateMotion dur="2s" repeatCount="indefinite" path="M 300 62 L 316 62" /></circle>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.block { fill: var(--navy-light); stroke: var(--gray); }
.append { fill: var(--red-soft); stroke: var(--red); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.title { font-size: 12px; fill: var(--amber-light); text-anchor: start; }
.label.small { font-size: 10px; }
</style>

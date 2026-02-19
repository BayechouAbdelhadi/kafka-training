<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="90" height="50" rx="8" class="box src" /><text x="65" y="58" class="label">Web App</text>
      <rect x="125" y="30" width="90" height="50" rx="8" class="box src" /><text x="170" y="58" class="label">Services</text>
      <rect x="230" y="30" width="90" height="50" rx="8" class="box src" /><text x="275" y="58" class="label">Devices</text>
      <!-- Data dots flowing down -->
      <circle r="4" fill="var(--red)"><animateMotion dur="2s" repeatCount="indefinite" path="M 65 85 L 65 130" /></circle>
      <circle r="4" fill="var(--amber)"><animateMotion dur="2s" repeatCount="indefinite" path="M 170 85 L 170 130" begin="0.4s" /></circle>
      <circle r="4" fill="var(--amber-light)"><animateMotion dur="2s" repeatCount="indefinite" path="M 275 85 L 275 130" begin="0.8s" /></circle>
      <!-- Question / challenge -->
      <rect x="60" y="140" width="220" height="60" rx="8" class="box challenge" />
      <text x="170" y="168" class="label small">Move, store, many consumers?</text>
      <text x="170" y="182" class="label small">→ Need a central solution</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.src { fill: var(--white); }
.challenge { fill: var(--white); stroke: var(--amber); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 12px; fill: var(--navy); text-anchor: middle; }
.label.small { font-size: 11px; fill: var(--navy); }
</style>

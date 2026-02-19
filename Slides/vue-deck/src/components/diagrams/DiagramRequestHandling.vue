<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="70" height="40" rx="6" class="box client" /><text x="65" y="52" class="label">Producer</text>
      <rect x="220" y="30" width="70" height="40" rx="6" class="box client" /><text x="255" y="52" class="label">Consumer</text>
      <path d="M 105 50 L 135 50" stroke="var(--red)" stroke-width="1.5" />
      <path d="M 185 50 L 218 50" stroke="var(--amber)" stroke-width="1.5" />
      <circle r="3" fill="var(--red)"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 103 50 L 137 50" /></circle>
      <circle r="3" fill="var(--amber)"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 183 50 L 220 50" begin="0.5s" /></circle>
      <rect x="120" y="85" width="120" height="100" rx="8" class="box broker" />
      <text x="180" y="108" class="label title">Broker (leader)</text>
      <text x="180" y="128" class="label small">Produce → log · Fetch → read</text>
      <rect x="135" y="138" width="90" height="36" rx="4" class="box io" />
      <text x="180" y="158" class="label small">I/O threads</text>
      <text x="180" y="172" class="label small">request queue</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.client { fill: var(--navy-light); }
.broker { fill: var(--navy-mid); stroke: var(--amber); }
.io { fill: var(--navy); stroke: var(--gray); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.title { font-size: 12px; fill: var(--amber-light); }
.label.small { font-size: 10px; }
</style>

<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="45" width="120" height="50" rx="6" class="box old" /><text x="90" y="72" class="label">Vn-1 data</text>
      <path d="M 155 70 L 185 70" stroke="var(--amber)" stroke-width="2" />
      <circle r="3" fill="var(--amber)"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 153 70 L 187 70" /></circle>
      <rect x="190" y="45" width="120" height="50" rx="6" class="box new" /><text x="250" y="72" class="label">Vn schema</text>
      <rect x="40" y="120" width="240" height="55" rx="6" class="box tip" />
      <text x="160" y="145" class="label small">Add field with default ✓  Remove field (ignore) ✓</text>
      <text x="160" y="162" class="label small">Consumer upgrades first</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.old { stroke: var(--gray-light); }
.new { stroke: var(--amber); stroke-width: 2; }
.tip { fill: rgba(248, 250, 252, 0.95); stroke: var(--gray-light); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--navy); text-anchor: middle; }
.label.title { font-size: 12px; font-weight: 700; fill: var(--navy); text-anchor: start; }
.label.small { font-size: 10px; fill: var(--navy); }
</style>

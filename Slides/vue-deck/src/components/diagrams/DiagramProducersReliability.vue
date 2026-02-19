<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="100" height="80" rx="8" class="box producer" />
      <text x="80" y="55" class="label">Producer</text>
      <text x="80" y="72" class="label small">acks (0, 1, all)</text>
      <text x="80" y="88" class="label small">Batching</text>
      <text x="80" y="104" class="label small">Idempotence</text>
      <path d="M 135 70 L 185 70" stroke="var(--red)" stroke-width="2" stroke-dasharray="4 3" />
      <circle r="4" fill="var(--red)"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 133 70 L 187 70" /></circle>
      <rect x="190" y="45" width="120" height="50" rx="8" class="box broker" />
      <text x="250" y="68" class="label">Leader + replicas</text>
      <text x="250" y="85" class="label small">acks=all → durable</text>
      <rect x="50" y="150" width="240" height="50" rx="6" class="box tip" />
      <text x="170" y="172" class="label small">Durable production: acks=all + idempotence</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.producer { fill: var(--navy-light); }
.broker { fill: var(--navy-mid); stroke: var(--amber); }
.tip { fill: var(--navy); stroke: var(--red); opacity: 0.9; }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.small { font-size: 10px; }
</style>

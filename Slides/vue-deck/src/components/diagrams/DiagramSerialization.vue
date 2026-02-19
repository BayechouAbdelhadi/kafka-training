<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="50" width="80" height="50" rx="6" class="box" /><text x="60" y="78" class="label">Producer</text>
      <text x="60" y="92" class="label small">object → bytes</text>
      <path d="M 105 75 L 135 75" stroke="var(--amber)" stroke-width="1.5" />
      <circle r="3" fill="var(--amber)"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 103 75 L 137 75" /></circle>
      <rect x="140" y="58" width="60" height="34" rx="4" class="box bytes" /><text x="170" y="78" class="label small">bytes</text>
      <path d="M 205 75 L 235 75" stroke="var(--amber)" stroke-width="1.5" />
      <circle r="3" fill="var(--amber)"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 203 75 L 237 75" begin="0.5s" /></circle>
      <rect x="240" y="50" width="80" height="50" rx="6" class="box" /><text x="280" y="78" class="label">Consumer</text>
      <text x="280" y="92" class="label small">bytes → object</text>
      <text x="170" y="140" class="label hint">Same format on both sides (JSON, Avro, Protobuf)</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.bytes { fill: var(--white); stroke: var(--amber); stroke-width: 2; }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--navy); text-anchor: middle; }
.label.small { font-size: 10px; fill: var(--navy); }
.label.hint { font-size: 10px; fill: var(--gray-light); }
</style>

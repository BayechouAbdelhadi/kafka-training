<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="280" height="80" rx="8" class="box broker" />
      <text x="160" y="42" class="label title">Broker — log.dirs</text>
      <rect x="35" y="55" width="75" height="36" rx="4" class="box dir" /><text x="72" y="75" class="label small">topic-a-0</text>
      <rect x="118" y="55" width="75" height="36" rx="4" class="box dir" /><text x="155" y="75" class="label small">topic-a-1</text>
      <rect x="201" y="55" width="75" height="36" rx="4" class="box dir" /><text x="238" y="75" class="label small">topic-b-0</text>
      <text x="160" y="100" class="label small">.log segments + .index</text>
      <rect x="20" y="118" width="130" height="80" rx="6" class="box segment" />
      <text x="85" y="142" class="label small">00000.log</text>
      <text x="85" y="158" class="label small">00001.log</text>
      <text x="85" y="174" class="label small">00002.log</text>
      <text x="85" y="192" class="label small">append-only segments</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.broker { fill: var(--white); stroke: var(--amber); }
.dir { fill: var(--white); stroke: var(--gray-light); }
.segment { fill: var(--white); stroke: var(--amber); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--navy); text-anchor: middle; }
.label.title { font-size: 12px; font-weight: 700; fill: var(--navy); }
.label.small { font-size: 10px; }
</style>

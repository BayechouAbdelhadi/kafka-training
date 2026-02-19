<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="25" width="130" height="52" rx="6" class="box pattern" />
      <text x="85" y="48" class="label title">At-least-once</text>
      <text x="85" y="64" class="label small">process → commit (may replay)</text>
      <rect x="170" y="25" width="130" height="52" rx="6" class="box pattern" />
      <text x="235" y="48" class="label title">Exactly-once</text>
      <text x="235" y="64" class="label small">transactions / idempotent</text>
      <rect x="20" y="95" width="280" height="70" rx="6" class="box tip" />
      <text x="160" y="120" class="label small">earliest vs latest · one consumer per partition</text>
      <text x="160" y="138" class="label small">multiple groups = multiple use cases</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.pattern { fill: var(--navy-mid); stroke: var(--amber); }
.tip { fill: var(--navy); stroke: var(--gray); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.title { font-size: 12px; fill: var(--amber-light); }
.label.small { font-size: 10px; }
</style>

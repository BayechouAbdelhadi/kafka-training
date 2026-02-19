<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="130" height="48" rx="8" class="box topic" /><text x="85" y="48" class="label title">Topic</text>
      <text x="85" y="62" class="label small">partition · retention · replication</text>
      <rect x="170" y="20" width="130" height="48" rx="8" class="box broker" /><text x="235" y="48" class="label title">Broker</text>
      <text x="235" y="62" class="label small">storage · requests · coordination</text>
      <rect x="20" y="88" width="130" height="48" rx="8" class="box producer" /><text x="85" y="116" class="label title">Producer</text>
      <text x="85" y="130" class="label small">publish · serialize · batch · guarantees</text>
      <rect x="170" y="88" width="130" height="48" rx="8" class="box consumer" /><text x="235" y="116" class="label title">Consumer</text>
      <text x="235" y="130" class="label small">groups · offsets · patterns</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 280px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.topic { stroke: var(--amber); }
.broker { stroke: var(--red); }
.producer { fill: var(--navy-mid); }
.consumer { fill: var(--navy-mid); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.title { font-size: 13px; fill: var(--white); font-weight: 600; }
.label.small { font-size: 9px; }
</style>

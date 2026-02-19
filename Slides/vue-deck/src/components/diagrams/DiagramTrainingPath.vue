<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="20" y="26" class="label title">Training path</text>
      <g v-for="(step, i) in steps" :key="i">
        <rect :x="40" :y="42 + i * 32" width="24" height="24" rx="4" class="box num" />
        <text :x="52" :y="58 + i * 32" class="label num-text">{{ i + 1 }}</text>
        <text :x="78" :y="58 + i * 32" class="label step">{{ step }}</text>
      </g>
      <line x1="52" y1="66" x2="52" y2="158" stroke="var(--navy-light)" stroke-width="1" stroke-dasharray="4 3" />
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
const steps = ['Setup — Run cluster', 'Topics & partitions', 'Producers', 'Consumers & groups', 'Failures']
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 280px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.num { fill: var(--red); stroke: var(--red-soft); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); }
.label.title { font-size: 12px; fill: var(--amber-light); }
.label.num-text { font-size: 11px; fill: var(--white); text-anchor: middle; font-weight: 600; }
.label.step { font-size: 11px; fill: var(--white); }
</style>

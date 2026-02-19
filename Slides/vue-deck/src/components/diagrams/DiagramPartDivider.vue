<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="40" width="160" height="100" rx="12" class="box part-box" />
      <text x="160" y="75" class="label part-num">Part {{ part }}</text>
      <text x="160" y="105" class="label subtitle">{{ subtitle }}</text>
      <line x1="100" y1="120" x2="220" y2="120" stroke="var(--red)" stroke-width="2" opacity="0.6" />
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
defineProps({
  part: { type: [Number, String], default: 1 },
  subtitle: { type: String, default: '' },
})
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 220px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.part-box { fill: var(--navy-mid); stroke: var(--amber); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; text-anchor: middle; }
.part-num { font-size: 18px; fill: var(--amber-light); font-weight: 700; }
.subtitle { font-size: 11px; fill: var(--gray); }
</style>

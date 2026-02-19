<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="35" width="85" height="55" rx="6" class="box" /><text x="72" y="58" class="label">Backward</text>
      <text x="72" y="78" class="label small">new reads old</text>
      <rect x="132" y="35" width="76" height="55" rx="6" class="box" /><text x="170" y="58" class="label">Forward</text>
      <text x="170" y="78" class="label small">old reads new</text>
      <rect x="225" y="35" width="85" height="55" rx="6" class="box full" /><text x="267" y="58" class="label">Full</text>
      <text x="267" y="78" class="label small">both</text>
      <rect x="40" y="115" width="260" height="75" rx="8" class="box tip" />
      <text x="170" y="142" class="label small">Choose by deploy order: consumers first → backward;</text>
      <text x="170" y="158" class="label small">producers first → forward; unknown → full</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.full { stroke: var(--amber); }
.tip { fill: var(--navy-mid); stroke: var(--gray); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.small { font-size: 10px; }
</style>

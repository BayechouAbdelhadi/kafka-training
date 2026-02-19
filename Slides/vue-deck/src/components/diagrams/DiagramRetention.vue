<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="24" y="26" class="label title">Partition log</text>
      <rect x="24" y="38" width="40" height="36" rx="4" class="box old" /><text x="44" y="60" class="label">0</text>
      <rect x="70" y="38" width="40" height="36" rx="4" class="box old" /><text x="90" y="60" class="label">1</text>
      <rect x="116" y="38" width="40" height="36" rx="4" class="box keep" /><text x="136" y="60" class="label">2</text>
      <rect x="162" y="38" width="40" height="36" rx="4" class="box keep" /><text x="182" y="60" class="label">3</text>
      <rect x="208" y="38" width="40" height="36" rx="4" class="box keep" /><text x="228" y="60" class="label">4</text>
      <rect x="254" y="38" width="40" height="36" rx="4" class="box new" /><text x="274" y="60" class="label">5</text>
      <path d="M 44 76 L 44 95" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="3 2" />
      <path d="M 90 76 L 90 95" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="3 2" />
      <text x="160" y="112" class="label small">retention.ms / retention.bytes → cleanup</text>
      <text x="160" y="132" class="label small">delete (default) or compact</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.old { fill: var(--navy-light); opacity: 0.5; }
.keep { fill: var(--navy-mid); stroke: var(--gray); }
.new { fill: var(--red-soft); stroke: var(--red); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.title { font-size: 12px; fill: var(--amber-light); text-anchor: start; }
.label.small { font-size: 10px; }
</style>

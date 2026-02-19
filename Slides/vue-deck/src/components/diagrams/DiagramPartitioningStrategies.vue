<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="20" y="26" class="label title">Partition assignment</text>
      <rect x="30" y="42" width="70" height="44" rx="6" class="box p" /><text x="65" y="66" class="label">key=null</text>
      <text x="65" y="82" class="label small">→ Round robin</text>
      <rect x="130" y="42" width="80" height="44" rx="6" class="box p" /><text x="170" y="66" class="label">key=userId</text>
      <text x="170" y="82" class="label small">→ Same partition</text>
      <rect x="230" y="42" width="80" height="44" rx="6" class="box p" /><text x="270" y="66" class="label">hash(key)</text>
      <text x="270" y="82" class="label small">% numPartitions</text>
      <rect x="30" y="110" width="80" height="50" rx="6" class="box part" /><text x="70" y="138" class="label">P0</text>
      <rect x="120" y="110" width="80" height="50" rx="6" class="box part" /><text x="160" y="138" class="label">P1</text>
      <rect x="210" y="110" width="80" height="50" rx="6" class="box part" /><text x="250" y="138" class="label">P2</text>
      <path d="M 65 86 L 70 108" stroke="var(--gray)" stroke-dasharray="2 2" />
      <path d="M 170 86 L 160 108" stroke="var(--amber)" stroke-width="1.5" />
      <path d="M 270 86 L 250 108" stroke="var(--amber)" stroke-width="1.5" />
      <text x="170" y="185" class="label small">Same key → same partition → ordering</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.p { fill: var(--navy-light); }
.part { fill: var(--navy-mid); stroke: var(--amber); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.title { font-size: 12px; fill: var(--amber-light); text-anchor: start; }
.label.small { font-size: 10px; }
</style>

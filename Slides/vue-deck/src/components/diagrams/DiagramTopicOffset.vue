<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Topic / partition label -->
      <text x="240" y="24" class="label title">Topic partition (one log)</text>
      <text x="240" y="42" class="label hint">Each record has an offset = its position in the partition</text>

      <!-- Log strip -->
      <rect x="24" y="58" width="432" height="72" rx="10" class="track" />

      <!-- Record blocks with offset labels inside or below -->
      <rect x="36" y="68" width="48" height="52" rx="6" class="segment" />
      <text x="60" y="98" class="label offset">0</text>
      <rect x="90" y="68" width="44" height="52" rx="6" class="segment" />
      <text x="112" y="98" class="label offset">1</text>
      <rect x="140" y="68" width="52" height="52" rx="6" class="segment" />
      <text x="166" y="98" class="label offset">2</text>
      <rect x="198" y="68" width="40" height="52" rx="6" class="segment" />
      <text x="218" y="98" class="label offset">3</text>
      <rect x="244" y="68" width="48" height="52" rx="6" class="segment" />
      <text x="268" y="98" class="label offset">4</text>
      <rect x="298" y="68" width="44" height="52" rx="6" class="segment" />
      <text x="320" y="98" class="label offset">5</text>
      <rect x="348" y="68" width="56" height="52" rx="6" class="segment" />
      <text x="376" y="98" class="label offset">6</text>
      <rect x="410" y="68" width="38" height="52" rx="6" class="segment active" />
      <text x="429" y="98" class="label offset">7</text>

      <!-- Explanation line -->
      <text x="240" y="152" class="label explain">Offset: immutable, sequential id — consumers track “read up to here” per partition</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 280px; }
.track { fill: var(--navy-mid); stroke: var(--gray-light); stroke-width: 1.5; }
.segment { fill: var(--white); stroke: var(--gray-light); stroke-width: 1; }
.segment.active { stroke: var(--amber); stroke-width: 1.5; }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; text-anchor: middle; }
.label.title { font-size: 14px; font-weight: 700; fill: var(--white); }
.label.hint { font-size: 11px; fill: var(--gray-light); }
.label.offset { font-size: 12px; font-weight: 600; fill: var(--navy); }
.label.explain { font-size: 10px; fill: var(--gray-light); font-style: italic; }
</style>

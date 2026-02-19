<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="20" y="26" class="label title">Bootstrap servers → cluster</text>
      <rect x="30" y="38" width="80" height="70" rx="8" class="box broker" /><text x="70" y="62" class="label">Broker 1</text>
      <rect x="130" y="38" width="80" height="70" rx="8" class="box broker" /><text x="170" y="62" class="label">Broker 2</text>
      <rect x="230" y="38" width="80" height="70" rx="8" class="box broker" /><text x="270" y="62" class="label">Broker 3</text>
      <path d="M 70 108 L 70 125" stroke="var(--amber)" stroke-width="1.5" />
      <path d="M 170 108 L 170 125" stroke="var(--amber)" stroke-width="1.5" />
      <path d="M 270 108 L 270 125" stroke="var(--amber)" stroke-width="1.5" />
      <rect x="100" y="132" width="140" height="50" rx="8" class="box client" />
      <text x="170" y="155" class="label">Producer / Consumer</text>
      <text x="170" y="172" class="label small">Kafka routes to correct broker</text>
      <circle r="3" fill="var(--red)"><animateMotion dur="2s" repeatCount="indefinite" path="M 170 158 L 170 130" /></circle>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.broker { fill: var(--navy-mid); stroke: var(--amber); }
.client { fill: var(--navy-light); stroke: var(--gray); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.title { font-size: 12px; fill: var(--amber-light); text-anchor: start; }
.label.small { font-size: 10px; }
</style>

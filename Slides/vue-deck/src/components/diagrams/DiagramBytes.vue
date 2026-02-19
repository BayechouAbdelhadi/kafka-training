<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="40" width="100" height="60" rx="8" class="box app" />
      <text x="80" y="68" class="label">App data</text>
      <text x="80" y="88" class="label small">(key, value)</text>
      <path d="M 135 70 L 175 70" stroke="var(--amber)" stroke-width="2" />
      <text x="155" y="62" class="label small">serialize</text>
      <circle r="3" fill="var(--amber)"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 133 70 L 177 70" /></circle>
      <rect x="180" y="45" width="110" height="50" rx="6" class="box bytes" />
      <text x="235" y="72" class="label">Bytes</text>
      <text x="235" y="88" class="label small">0x4A 0x61 0x76 0x61...</text>
      <text x="160" y="135" class="label hint">Broker stores bytes only — no schema</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.app { stroke: var(--amber); }
.bytes { stroke: var(--amber); stroke-width: 2; }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--navy); text-anchor: middle; }
.label.small { font-size: 10px; fill: var(--navy); }
.label.hint { font-size: 10px; fill: var(--gray-light); }
</style>

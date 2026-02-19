<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="50" width="200" height="100" rx="12" class="box cta" />
      <text x="160" y="88" class="label title">00-Setup</text>
      <text x="160" y="110" class="label small">Build the mental model</text>
      <text x="160" y="128" class="label small">from the ground up</text>
      <path d="M 160 155 L 200 155" stroke="var(--amber)" stroke-width="2" />
      <circle r="4" fill="var(--amber)" class="pulse-dot">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 158 155 L 202 155" />
      </circle>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--navy); stroke: var(--navy-light); stroke-width: 1.5; }
.cta { fill: var(--navy-mid); stroke: var(--amber); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; fill: var(--gray); text-anchor: middle; }
.label.title { font-size: 16px; fill: var(--amber-light); font-weight: 700; }
.label.small { font-size: 11px; }
</style>

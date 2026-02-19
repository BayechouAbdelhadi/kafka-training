<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Stream / log metaphor -->
      <path d="M 40 100 Q 160 60 280 100" stroke="var(--gray-light)" stroke-width="3" fill="none" stroke-dasharray="8 6" />
      <circle cx="60" cy="95" r="6" fill="var(--red)" class="dot-move">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 40 100 Q 160 60 280 100" />
      </circle>
      <circle cx="160" cy="70" r="5" fill="var(--amber)" class="dot-move" style="animation-delay: 0.8s">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 40 100 Q 160 60 280 100" />
      </circle>
      <circle cx="250" cy="98" r="5" fill="var(--amber-light)" class="dot-move" style="animation-delay: 1.6s">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 40 100 Q 160 60 280 100" />
      </circle>
      <!-- Central hub -->
      <rect x="130" y="75" width="60" height="50" rx="8" class="box hub" />
      <text x="160" y="102" class="label title">Events</text>
      <text x="160" y="118" class="label small">at scale</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 260px; }
.box { fill: var(--white); stroke: var(--amber); stroke-width: 2; }
.hub { fill: var(--white); }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; fill: var(--navy); text-anchor: middle; }
.label.title { font-size: 14px; fill: var(--amber); font-weight: 600; }
.label.small { font-size: 10px; fill: var(--navy); }
</style>

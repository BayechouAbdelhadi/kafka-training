<template>
  <DiagramStage>
    <svg class="diagram-svg" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-topic" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--red)" />
        </marker>
      </defs>
      <!-- Topic label -->
      <text x="24" y="28" class="label title">Topic: orders</text>
      <!-- Log blocks (append-only) -->
      <g v-for="i in 8" :key="i" class="log-block" :style="{ animationDelay: (i - 1) * 0.15 + 's' }">
        <rect :x="24 + (i - 1) * 38" y="44" width="34" height="42" rx="4" class="box log-block-fill" />
        <text :x="41 + (i - 1) * 38" :y="68" class="label offset">{{ i - 1 }}</text>
      </g>
      <!-- Append arrow + new event -->
      <path d="M 318 65 L 338 65" stroke="var(--amber)" stroke-width="2" marker-end="url(#arrow-topic)" />
      <rect x="340" y="52" width="34" height="26" rx="4" class="box new-event animate-pulse-box">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <text x="357" y="68" class="label offset">+</text>
      <!-- Producers / Consumers labels -->
      <text x="180" y="118" class="label small">Producers append →</text>
      <text x="180" y="168" class="label small">← Consumers read at their own pace</text>
      <!-- Reading indicators -->
      <g class="animate-flow-left" style="animation: diagram-flow-left 3s ease-in-out infinite">
        <circle cx="80" cy="145" r="3" fill="var(--amber)" />
      </g>
      <g class="animate-flow-left" style="animation: diagram-flow-left 3s ease-in-out infinite; animation-delay: 1s">
        <circle cx="200" cy="155" r="3" fill="var(--amber)" />
      </g>
      <g class="animate-flow-left" style="animation: diagram-flow-left 3s ease-in-out infinite; animation-delay: 2s">
        <circle cx="300" cy="148" r="3" fill="var(--amber)" />
      </g>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg {
  width: 100%;
  height: auto;
  max-height: 280px;
}

.box {
  fill: var(--navy);
  stroke: var(--navy-light);
  stroke-width: 1.5;
}
.log-block-fill {
  fill: var(--navy-light);
  stroke: var(--gray);
}
.box.new-event {
  fill: var(--red-soft);
  stroke: var(--red);
}

.label {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 11px;
  fill: var(--gray);
  text-anchor: middle;
}
.label.title {
  font-size: 13px;
  fill: var(--amber-light);
  font-weight: 600;
  text-anchor: start;
}
.label.offset {
  font-size: 10px;
  fill: var(--white);
}
.label.small {
  font-size: 10px;
  fill: var(--gray);
}

.log-block {
  animation: diagram-fade-in 0.6s ease-out backwards;
}
.animate-pulse-box {
  animation: diagram-pulse 1.5s ease-in-out infinite;
}
</style>

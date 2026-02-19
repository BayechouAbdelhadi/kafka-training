<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 420 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-p" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="var(--amber)" />
        </marker>
        <marker id="arr-c" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="var(--amber)" />
        </marker>
      </defs>

      <!-- One horizontal line: Producer — Broker (Topic) — Consumer -->

      <!-- Producer (left) -->
      <rect x="24" y="82" width="80" height="36" rx="8" class="node" />
      <text x="64" y="104" class="label t">Producer</text>

      <!-- Broker (center, wraps Topic) -->
      <rect x="128" y="66" width="164" height="68" rx="10" class="broker" />
      <rect x="158" y="82" width="104" height="36" rx="8" class="hub" />
      <text x="210" y="104" class="label hub-t">Topic</text>
      <text x="210" y="128" class="label hint">Broker (cluster)</text>

      <!-- Consumer (right) -->
      <rect x="316" y="82" width="80" height="36" rx="8" class="node" />
      <text x="356" y="104" class="label t">Consumer</text>

      <!-- Arrows on the same line: Producer → Topic → Consumer -->
      <path d="M 106 100 L 156 100" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#arr-p)" />
      <path d="M 264 100 L 314 100" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#arr-c)" />
      <g><animateMotion dur="1.8s" repeatCount="indefinite" path="M 103 100 L 157 100" /><circle r="4" class="dot" /></g>
      <g><animateMotion dur="1.8s" repeatCount="indefinite" path="M 263 100 L 317 100" begin="0.9s" /><circle r="4" class="dot" /></g>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 280px; }
.node { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.broker { fill: var(--white); stroke: var(--gray-light); stroke-width: 2; }
.hub { fill: var(--white); stroke: var(--amber); stroke-width: 2; }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; text-anchor: middle; }
.label.t { font-size: 12px; font-weight: 600; fill: var(--navy); }
.label.hub-t { font-size: 14px; font-weight: 700; fill: var(--amber); }
.label.hint { font-size: 10px; fill: var(--navy); opacity: 0.85; }
.dot { fill: var(--amber); }
</style>

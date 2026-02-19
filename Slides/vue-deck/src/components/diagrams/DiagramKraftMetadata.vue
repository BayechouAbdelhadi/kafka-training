<template>
  <DiagramStage>
    <svg class="diagram-svg" viewBox="0 0 360 235" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-meta" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="var(--amber)" />
        </marker>
      </defs>
      <!-- KRaft controller (metadata) -->
      <rect x="130" y="20" width="100" height="56" rx="8" class="box controller animate-glow" />
      <text x="180" y="42" class="label title">KRaft</text>
      <text x="180" y="58" class="label small">Metadata (Raft log)</text>
      <text x="180" y="70" class="label small">Leaders, topics, partitions</text>
      <!-- Arrows to brokers -->
      <path d="M 180 82 L 80 130" stroke="var(--amber)" stroke-width="1.5" stroke-dasharray="4 3" fill="none" marker-end="url(#arrow-meta)" />
      <path d="M 180 82 L 180 130" stroke="var(--amber)" stroke-width="1.5" stroke-dasharray="4 3" fill="none" marker-end="url(#arrow-meta)" />
      <path d="M 180 82 L 280 130" stroke="var(--amber)" stroke-width="1.5" stroke-dasharray="4 3" fill="none" marker-end="url(#arrow-meta)" />
      <!-- Metadata flow dots -->
      <circle r="3" fill="var(--amber)" class="meta-dot" style="animation-delay: 0s">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 178 80 L 82 128" />
      </circle>
      <circle r="3" fill="var(--amber)" class="meta-dot" style="animation-delay: 0.5s">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 178 80 L 180 128" />
      </circle>
      <circle r="3" fill="var(--amber)" class="meta-dot" style="animation-delay: 1s">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 178 80 L 278 128" />
      </circle>
      <!-- Brokers -->
      <rect x="20" y="138" width="100" height="72" rx="8" class="box broker" />
      <text x="70" y="162" class="label">Broker 1</text>
      <text x="70" y="185" class="label small">P0 leader</text>
      <rect x="130" y="138" width="100" height="72" rx="8" class="box broker" />
      <text x="180" y="162" class="label">Broker 2</text>
      <text x="180" y="185" class="label small">P1 leader</text>
      <rect x="240" y="138" width="100" height="72" rx="8" class="box broker" />
      <text x="290" y="162" class="label">Broker 3</text>
      <text x="290" y="185" class="label small">P2 leader</text>
      <!-- Clients -->
      <text x="20" y="228" class="label small">Producers & consumers use metadata to find leaders</text>
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
.controller {
  fill: var(--navy-mid);
  stroke: var(--amber);
}
.broker {
  fill: var(--navy-light);
  stroke: var(--gray);
}

.label {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 11px;
  fill: var(--gray);
  text-anchor: middle;
}
.label.title {
  font-size: 12px;
  fill: var(--amber-light);
}
.label.small {
  font-size: 10px;
}

.animate-glow {
  animation: diagram-glow 2.5s ease-in-out infinite;
}
.meta-dot {
  animation: diagram-pulse 1.2s ease-in-out infinite;
}
</style>

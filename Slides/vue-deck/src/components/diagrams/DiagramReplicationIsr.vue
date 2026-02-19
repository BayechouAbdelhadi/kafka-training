<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-replicate" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--amber)" />
        </marker>
      </defs>
      <!-- Partition P0 -->
      <text x="24" y="24" class="label title">Partition P0</text>
      <!-- Leader -->
      <rect x="20" y="48" width="100" height="88" rx="8" class="box leader animate-glow" />
      <text x="70" y="78" class="label">Leader</text>
      <line x1="35" y1="92" x2="105" y2="92" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <line x1="35" y1="106" x2="105" y2="106" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <line x1="35" y1="120" x2="95" y2="120" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <!-- Replicas (same vertical line, stacked) -->
      <rect x="180" y="28" width="100" height="56" rx="8" class="box replica in-sync" />
      <text x="230" y="52" class="label">Replica 1 (ISR)</text>
      <rect x="180" y="96" width="100" height="56" rx="8" class="box replica in-sync" />
      <text x="230" y="120" class="label">Replica 2 (ISR)</text>
      <!-- Leader → Replica 1 -->
      <path d="M 120 92 L 178 56" stroke="var(--amber)" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#arr-replicate)" class="animate-flow-line" />
      <text x="148" y="68" class="label copy">copy</text>
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 118 92 L 180 56" /><circle r="4" fill="var(--amber)" class="animate-pulse-dot" /></g>
      <!-- Leader → Replica 2 -->
      <path d="M 120 92 L 178 124" stroke="var(--amber)" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#arr-replicate)" class="animate-flow-line animate-flow-delay" />
      <text x="148" y="114" class="label copy">copy</text>
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 118 92 L 180 124" begin="0.5s" /><circle r="4" fill="var(--amber)" class="animate-pulse-dot" /></g>
      <!-- ISR label -->
      <text x="230" y="168" class="label small">Replicas copy from leader. In-Sync Replicas (ISR) — safe to promote on leader failure</text>
      <!-- Failure scenario hint -->
      <g class="animate-fade">
        <rect x="20" y="182" width="320" height="36" rx="6" class="box muted" />
        <text x="180" y="200" class="label small">Leader fails → one ISR becomes new leader. No data loss.</text>
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
  fill: var(--white);
  stroke: var(--gray-light);
  stroke-width: 1.5;
}
.leader {
  fill: var(--white);
  stroke: var(--amber);
  stroke-width: 2;
}
.replica {
  fill: var(--white);
  stroke: var(--gray-light);
}
.replica.in-sync {
  stroke: var(--amber);
  stroke-width: 1.5;
}
.box.muted {
  fill: var(--white);
  stroke: var(--gray-light);
  opacity: 0.95;
}

.label {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 11px;
  fill: var(--navy);
  text-anchor: middle;
}
.label.title {
  font-size: 12px;
  font-weight: 700;
  fill: var(--white);
  text-anchor: start;
}
.label.small {
  font-size: 10px;
  fill: var(--navy);
}
.label.copy {
  font-size: 9px;
  fill: var(--amber);
  font-weight: 600;
}

.animate-glow {
  animation: diagram-glow 2s ease-in-out infinite;
}
.animate-flow-line {
  animation: diagram-flow-dash 1.5s linear infinite;
}
.animate-flow-delay {
  animation-delay: 0.3s;
}
@keyframes diagram-flow-dash {
  to { stroke-dashoffset: -20; }
}
.animate-pulse-dot {
  animation: diagram-pulse 1.5s ease-in-out infinite;
}
.animate-fade {
  animation: diagram-fade-in 1s ease-out 0.5s backwards;
}
</style>

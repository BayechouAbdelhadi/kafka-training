<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-pb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="var(--amber)" />
        </marker>
      </defs>

      <!-- Producer (left) -->
      <rect x="24" y="82" width="88" height="36" rx="8" class="node" />
      <text x="68" y="104" class="label t">Producer</text>

      <!-- Cluster (wraps both brokers) -->
      <rect x="124" y="44" width="272" height="112" rx="12" class="cluster" />
      <text x="260" y="68" class="label cluster-t">Cluster</text>

      <!-- Broker 1 (partitions P0, P1 inside) -->
      <rect x="136" y="52" width="120" height="96" rx="10" class="broker" />
      <text x="196" y="76" class="label hint">Broker 1</text>
      <rect x="152" y="88" width="48" height="48" rx="6" class="partition" />
      <text x="176" y="112" class="label p">P0</text>
      <line x1="162" y1="120" x2="198" y2="120" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <line x1="162" y1="128" x2="194" y2="128" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <rect x="208" y="88" width="48" height="48" rx="6" class="partition" />
      <text x="232" y="112" class="label p">P1</text>
      <line x1="218" y1="120" x2="254" y2="120" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <line x1="218" y1="128" x2="250" y2="128" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />

      <!-- Broker 2 (partition P2 inside) -->
      <rect x="264" y="52" width="120" height="96" rx="10" class="broker" />
      <text x="324" y="76" class="label hint">Broker 2</text>
      <rect x="296" y="88" width="48" height="48" rx="6" class="partition" />
      <text x="320" y="112" class="label p">P2</text>
      <line x1="306" y1="120" x2="342" y2="120" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <line x1="306" y1="128" x2="338" y2="128" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />

      <!-- Consumer (right) -->
      <rect x="408" y="82" width="88" height="36" rx="8" class="node" />
      <text x="452" y="104" class="label t">Consumer</text>

      <!-- Arrows: Producer → Broker 1, Broker 2 → Consumer -->
      <path d="M 114 100 L 134 100" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#arr-pb)" />
      <path d="M 386 100 L 406 100" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#arr-pb)" />
      <g><animateMotion dur="1.8s" repeatCount="indefinite" path="M 111 100 L 135 100" /><circle r="4" class="dot" /></g>
      <g><animateMotion dur="1.8s" repeatCount="indefinite" path="M 383 100 L 409 100" begin="0.9s" /><circle r="4" class="dot" /></g>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 360px; }
.node { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.cluster { fill: none; stroke: var(--gray-light); stroke-width: 2; stroke-dasharray: 8 4; }
.broker { fill: var(--white); stroke: var(--gray-light); stroke-width: 2; }
.partition { fill: var(--white); stroke: var(--amber); stroke-width: 1.5; }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; text-anchor: middle; }
.label.t { font-size: 12px; font-weight: 600; fill: var(--navy); }
.label.p { font-size: 11px; font-weight: 700; fill: var(--amber); }
.label.hint { font-size: 10px; fill: var(--navy); opacity: 0.85; }
.label.cluster-t { font-size: 11px; font-weight: 600; fill: var(--gray-light); }
.dot { fill: var(--amber); }
</style>

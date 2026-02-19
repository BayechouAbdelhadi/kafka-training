<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 460 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-sr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--amber)" />
        </marker>
        <filter id="shadow-sr" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-opacity="0.08" />
        </filter>
      </defs>

      <!-- Schema Registry (central) -->
      <rect x="150" y="24" width="160" height="88" rx="10" class="box registry" filter="url(#shadow-sr)" />
      <text x="230" y="52" class="label title">Schema Registry</text>
      <text x="230" y="70" class="label meta">Avro · JSON Schema · Protobuf</text>
      <text x="230" y="88" class="label small">Store &amp; serve schema by ID</text>
      <line x1="180" y1="100" x2="280" y2="100" stroke="var(--gray-light)" stroke-width="1" opacity="0.6" />

      <!-- Producer (left) -->
      <rect x="32" y="148" width="140" height="56" rx="8" class="box client" />
      <text x="102" y="178" class="label client-name">Producer</text>
      <text x="102" y="194" class="label small">serialize · store schema</text>

      <!-- Consumer (right) -->
      <rect x="288" y="148" width="140" height="56" rx="8" class="box client" />
      <text x="358" y="178" class="label client-name">Consumer</text>
      <text x="358" y="194" class="label small">get schema · deserialize</text>

      <!-- Arrow: Producer → Registry (store schema) -->
      <path d="M 172 176 L 200 112" stroke="var(--amber)" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow-sr)" />
      <text x="182" y="138" class="label flow">store schema</text>
      <circle r="4" fill="var(--amber)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 170 174 L 202 114" />
      </circle>
      <!-- Arrow: Registry → Consumer (get schema) -->
      <path d="M 260 112 L 288 176" stroke="var(--amber)" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow-sr)" />
      <text x="268" y="138" class="label flow">get schema</text>
      <circle r="4" fill="var(--amber)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 258 114 L 290 174" begin="0.6s" />
      </circle>

      <text x="230" y="238" class="label hint">Agree on structure · Evolve schemas safely with compatibility rules</text>
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
  max-height: 300px;
}

.box {
  fill: var(--white);
  stroke: var(--gray-light);
  stroke-width: 1.5;
}
.registry {
  stroke: var(--amber);
  stroke-width: 2;
}
.client {
  stroke: var(--navy-light);
}

.label {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 11px;
  fill: var(--navy);
  text-anchor: middle;
}
.label.title {
  font-size: 13px;
  font-weight: 700;
  fill: var(--navy);
}
.label.meta {
  font-size: 10px;
  fill: var(--gray);
}
.label.small {
  font-size: 10px;
  fill: var(--navy);
}
.label.client-name {
  font-size: 12px;
  font-weight: 600;
  fill: var(--navy);
}
.label.flow {
  font-size: 9px;
  font-weight: 600;
  fill: var(--amber);
}
.label.hint {
  font-size: 10px;
  fill: var(--gray-light);
}
</style>

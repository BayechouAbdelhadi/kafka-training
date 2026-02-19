<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 720 440" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-cg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--amber)" />
        </marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.12" />
        </filter>
      </defs>
      <g transform="translate(50, 48)">
      <!-- Topic: Orders (spaced) -->
      <text x="280" y="-8" class="label title">Topic: Orders</text>
      <rect x="0" y="0" width="620" height="56" rx="10" class="box topic" filter="url(#shadow)" />
      <line x1="206" y1="0" x2="206" y2="56" stroke="var(--gray-light)" stroke-width="1" />
      <line x1="414" y1="0" x2="414" y2="56" stroke="var(--gray-light)" stroke-width="1" />
      <text x="103" y="36" class="label part">Partition 0</text>
      <text x="310" y="36" class="label part">Partition 1</text>
      <text x="517" y="36" class="label part">Partition 2</text>

      <!-- Group 1 (left): P0→C1, P1→C2, P2→C1 -->
      <rect x="0" y="88" width="288" height="212" rx="12" class="box group" filter="url(#shadow)" />
      <rect x="24" y="148" width="112" height="60" rx="10" class="box consumer" />
      <text x="80" y="176" class="label consumer-name">Consumer 1</text>
      <text x="80" y="196" class="label small">P0, P2</text>
      <rect x="152" y="148" width="112" height="60" rx="10" class="box consumer" />
      <text x="208" y="176" class="label consumer-name">Consumer 2</text>
      <text x="208" y="196" class="label small">P1</text>
      <path d="M 103 58 L 80 148" stroke="var(--amber)" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#arrow-cg)" />
      <path d="M 310 58 L 208 148" stroke="var(--amber)" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#arrow-cg)" />
      <path d="M 517 58 L 80 148" stroke="var(--amber)" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#arrow-cg)" />
      <text x="144" y="284" class="label group-id">group.id-groupe-1</text>

      <!-- Group 2 (right): P0→C1, P1→C2, P2→C3 -->
      <rect x="332" y="88" width="288" height="212" rx="12" class="box group group2" filter="url(#shadow)" />
      <rect x="356" y="148" width="76" height="60" rx="10" class="box consumer" />
      <text x="394" y="176" class="label consumer-name">Consumer 1</text>
      <text x="394" y="196" class="label small">P0</text>
      <rect x="444" y="148" width="76" height="60" rx="10" class="box consumer" />
      <text x="482" y="176" class="label consumer-name">Consumer 2</text>
      <text x="482" y="196" class="label small">P1</text>
      <rect x="532" y="148" width="76" height="60" rx="10" class="box consumer" />
      <text x="570" y="176" class="label consumer-name">Consumer 3</text>
      <text x="570" y="196" class="label small">P2</text>
      <path d="M 103 58 L 394 148" stroke="var(--amber)" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#arrow-cg)" opacity="0.9" />
      <path d="M 310 58 L 482 148" stroke="var(--amber)" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#arrow-cg)" opacity="0.9" />
      <path d="M 517 58 L 570 148" stroke="var(--amber)" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#arrow-cg)" opacity="0.9" />
      <text x="476" y="284" class="label group-id">group.id-groupe-2</text>

      <text x="310" y="338" class="label tiny">Each group gets a full copy of the topic. Within a group, each partition is assigned to one consumer.</text>
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
  max-height: 480px;
  min-height: 380px;
}

.box {
  fill: var(--white);
  stroke: var(--gray-light);
  stroke-width: 1.5;
}
.topic {
  stroke: var(--amber);
  stroke-width: 2;
}
.group {
  fill: rgba(255, 255, 255, 0.95);
  stroke: var(--amber);
  stroke-width: 2;
}
.group2 {
  fill: rgba(255, 255, 255, 0.9);
  stroke: var(--gray-light);
  stroke-width: 1.5;
}
.consumer {
  stroke: var(--navy-light);
  stroke-width: 1.5;
}

.label {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 12px;
  fill: var(--navy);
  text-anchor: middle;
}
.label.title {
  font-size: 14px;
  font-weight: 700;
  fill: var(--navy);
  text-anchor: start;
}
.label.part {
  font-size: 11px;
  font-weight: 600;
  fill: var(--navy);
}
.label.group-id {
  font-size: 11px;
  font-weight: 700;
  fill: var(--amber);
}
.label.consumer-name {
  font-size: 11px;
  font-weight: 700;
  fill: var(--navy);
}
.label.small {
  font-size: 10px;
  fill: var(--navy);
}
.label.tiny {
  font-size: 9px;
  fill: var(--gray);
  font-style: italic;
  text-anchor: middle;
}
</style>

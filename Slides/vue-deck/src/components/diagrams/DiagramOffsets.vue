<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-off" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--amber)" />
        </marker>
      </defs>

      <!-- Title -->
      <text x="240" y="22" class="label title">Where offsets live · How to commit</text>

      <!-- Where: __consumer_offsets (Kafka internal topic) -->
      <text x="24" y="52" class="label section">Where they live</text>
      <rect x="24" y="60" width="432" height="72" rx="10" class="box storage" />
      <text x="240" y="82" class="label topic-name">__consumer_offsets</text>
      <text x="240" y="98" class="label hint">Internal Kafka topic — one partition per group; stores (group, topic, partition) → offset</text>
      <line x1="144" y1="60" x2="144" y2="132" stroke="var(--gray-light)" stroke-width="1" />
      <line x1="264" y1="60" x2="264" y2="132" stroke="var(--gray-light)" stroke-width="1" />
      <line x1="384" y1="60" x2="384" y2="132" stroke="var(--gray-light)" stroke-width="1" />
      <rect x="56" y="108" width="64" height="20" rx="4" class="box offset" />
      <text x="88" y="122" class="label offset-txt">P0: 5</text>
      <rect x="176" y="108" width="64" height="20" rx="4" class="box offset" />
      <text x="208" y="122" class="label offset-txt">P1: 4</text>
      <rect x="296" y="108" width="64" height="20" rx="4" class="box offset" />
      <text x="328" y="122" class="label offset-txt">P2: 6</text>

      <!-- Consumer + How to commit -->
      <text x="24" y="168" class="label section">How to commit</text>
      <rect x="24" y="176" width="200" height="72" rx="10" class="box consumer" />
      <text x="124" y="202" class="label consumer-name">Consumer</text>
      <text x="124" y="218" class="label small">process messages</text>
      <text x="124" y="234" class="label small">commitSync() / commitAsync()</text>

      <!-- Commit flow: Consumer → __consumer_offsets -->
      <path d="M 224 212 L 312 212 L 312 132" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#arrow-off)" />
      <text x="268" y="202" class="label flow">commit</text>
      <circle r="4" fill="var(--amber)">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 222 212 L 314 132" />
      </circle>

      <!-- Auto vs manual note -->
      <rect x="248" y="176" width="208" height="72" rx="10" class="box note" />
      <text x="352" y="198" class="label small bold">Auto vs manual</text>
      <text x="352" y="214" class="label tiny">enable.auto.commit=true → Kafka commits at intervals</text>
      <text x="352" y="228" class="label tiny">enable.auto.commit=false → you call commitSync/Async after process</text>
      <text x="352" y="242" class="label tiny">Manual: commit only after work done (at-least-once)</text>
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
  max-height: 320px;
}

.box {
  fill: var(--white);
  stroke: var(--gray-light);
  stroke-width: 1.5;
}
.storage {
  stroke: var(--amber);
  stroke-width: 2;
}
.offset {
  fill: var(--amber);
  stroke: var(--amber);
  opacity: 0.9;
}
.consumer {
  stroke: var(--amber);
  stroke-width: 2;
}
.note {
  fill: rgba(248, 250, 252, 0.9);
  stroke: var(--gray-light);
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
.label.section {
  font-size: 11px;
  font-weight: 700;
  fill: var(--amber);
  text-anchor: start;
}
.label.topic-name {
  font-size: 12px;
  font-weight: 700;
  fill: var(--navy);
}
.label.hint {
  font-size: 10px;
  fill: var(--gray);
}
.label.offset-txt {
  font-size: 10px;
  font-weight: 600;
  fill: var(--navy);
}
.label.consumer-name {
  font-size: 12px;
  font-weight: 700;
  fill: var(--navy);
}
.label.small {
  font-size: 10px;
  fill: var(--navy);
}
.label.small.bold {
  font-weight: 700;
}
.label.flow {
  font-size: 10px;
  font-weight: 600;
  fill: var(--amber);
}
.label.tiny {
  font-size: 9px;
  fill: var(--navy);
}
</style>

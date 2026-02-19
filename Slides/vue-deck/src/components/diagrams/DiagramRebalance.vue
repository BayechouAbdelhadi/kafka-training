<template>
  <DiagramStage>
    <svg class="diagram-svg" viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Before -->
      <text x="20" y="22" class="label title">Before: 2 consumers, 3 partitions</text>
      <rect x="20" y="32" width="80" height="42" rx="6" class="box partition" />
      <text x="60" y="55" class="label">P0</text>
      <rect x="110" y="32" width="80" height="42" rx="6" class="box partition" />
      <text x="150" y="55" class="label">P1</text>
      <rect x="200" y="32" width="80" height="42" rx="6" class="box partition" />
      <text x="240" y="55" class="label">P2</text>
      <rect x="50" y="88" width="70" height="38" rx="6" class="box consumer" />
      <text x="85" y="110" class="label">C1: P0,P1</text>
      <rect x="180" y="88" width="70" height="38" rx="6" class="box consumer" />
      <text x="215" y="110" class="label">C2: P2</text>

      <!-- Arrow "new consumer joins" -->
      <path d="M 180 138 L 180 152" stroke="var(--amber)" stroke-width="2" stroke-dasharray="6 4" class="arrow-pulse" />
      <circle r="4" fill="var(--red)" class="dot-join">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 180 136 L 180 154" />
      </circle>
      <text x="180" y="172" class="label small">New consumer joins → rebalance</text>

      <!-- After -->
      <text x="20" y="192" class="label title">After: 3 consumers, 3 partitions</text>
      <rect x="20" y="202" width="80" height="42" rx="6" class="box partition" />
      <text x="60" y="225" class="label">P0</text>
      <rect x="110" y="202" width="80" height="42" rx="6" class="box partition" />
      <text x="150" y="225" class="label">P1</text>
      <rect x="200" y="202" width="80" height="42" rx="6" class="box partition" />
      <text x="240" y="225" class="label">P2</text>
      <rect x="20" y="252" width="70" height="38" rx="6" class="box consumer" />
      <text x="55" y="274" class="label">C1: P0</text>
      <rect x="105" y="252" width="70" height="38" rx="6" class="box consumer" />
      <text x="140" y="274" class="label">C2: P1</text>
      <rect x="190" y="252" width="70" height="38" rx="6" class="box consumer new-c" />
      <text x="225" y="274" class="label">C3: P2</text>
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
  fill: var(--navy);
  stroke: var(--navy-light);
  stroke-width: 1.5;
}
.partition {
  fill: var(--navy-light);
  stroke: var(--gray);
}
.consumer {
  fill: var(--navy-mid);
  stroke: var(--amber);
}
.consumer.new-c {
  stroke: var(--red);
  animation: diagram-fade-in 0.8s ease-out 0.3s backwards;
}

.label {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 11px;
  fill: var(--gray);
  text-anchor: middle;
}
.label.title {
  font-size: 11px;
  fill: var(--amber-light);
  text-anchor: start;
}
.label.small {
  font-size: 10px;
}

.arrow-pulse {
  animation: diagram-pulse 1.2s ease-in-out infinite;
}
.dot-join {
  animation: diagram-pulse 1.2s ease-in-out infinite;
}
</style>

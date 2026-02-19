<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 520 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-append" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="var(--amber)" />
        </marker>
      </defs>

      <!-- Label -->
      <text x="260" y="38" class="label title">Log (append-only)</text>
      <text x="260" y="62" class="label hint">events in order · immutable · no updates</text>

      <!-- Log track (background strip) - much larger -->
      <rect x="32" y="88" width="456" height="120" rx="12" class="track" />

      <!-- Segment blocks: oldest (left) to newest (right) - bigger -->
      <rect x="44" y="100" width="48" height="96" rx="6" class="segment" />
      <rect x="98" y="100" width="38" height="96" rx="6" class="segment" />
      <rect x="142" y="100" width="58" height="96" rx="6" class="segment" />
      <rect x="206" y="100" width="44" height="96" rx="6" class="segment" />
      <rect x="256" y="100" width="52" height="96" rx="6" class="segment" />
      <rect x="314" y="100" width="40" height="96" rx="6" class="segment" />
      <rect x="360" y="100" width="50" height="96" rx="6" class="segment" />
      <rect x="416" y="100" width="56" height="96" rx="6" class="segment active" />

      <!-- Offset labels -->
      <text x="72" y="212" class="label offset">0</text>
      <text x="260" y="212" class="label offset">...</text>
      <text x="444" y="212" class="label offset">N</text>

      <!-- Direction arrow (reversed: points left) -->
      <path d="M 502 148 L 478 148" stroke="var(--amber)" stroke-width="3" stroke-linecap="round" marker-start="url(#arr-append)" />

      <!-- Animated "new event" dot -->
      <g>
        <animateMotion dur="2s" repeatCount="indefinite" path="M 474 148 L 506 148" />
        <circle r="6" fill="var(--amber)" />
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
  min-height: 400px;
  max-height: 420px;
}
.track { fill: var(--navy-mid); stroke: var(--gray-light); stroke-width: 1.5; }
.segment { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.segment.active { stroke: var(--amber); stroke-width: 2.5; }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; text-anchor: middle; }
.label.title { font-size: 18px; font-weight: 700; fill: var(--white); }
.label.hint { font-size: 13px; fill: var(--gray-light); }
.label.offset { font-size: 13px; fill: var(--gray-light); }
</style>

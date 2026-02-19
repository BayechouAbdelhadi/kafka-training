<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 300 380" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--gray-light)" /></marker>
      </defs>

      <!-- Sync: minimal one-liner -->
      <text x="150" y="28" class="label cap">Sync</text>
      <rect x="60" y="42" width="56" height="40" rx="8" class="node" /><text x="88" y="67" class="label t">A</text>
      <path d="M 120 62 L 164 62" stroke="var(--gray-light)" stroke-width="2" stroke-linecap="round" marker-end="url(#arr-g)" />
      <rect x="168" y="42" width="56" height="40" rx="8" class="node" /><text x="196" y="67" class="label t">B</text>
      <text x="150" y="98" class="label hint">request → wait → response</text>

      <!-- Divider -->
      <line x1="40" y1="120" x2="260" y2="120" stroke="var(--gray-light)" stroke-width="1" opacity="0.7" />

      <!-- Event-driven: one clear column -->
      <text x="150" y="148" class="label cap">Event-driven</text>
      <rect x="100" y="158" width="100" height="44" rx="8" class="node" /><text x="150" y="185" class="label t">Producer</text>
      <line x1="150" y1="206" x2="150" y2="232" stroke="var(--amber)" stroke-width="2.5" stroke-linecap="round" />
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 150 206 L 150 232" /><circle r="5" fill="var(--amber)" /></g>
      <rect x="75" y="238" width="150" height="56" rx="8" class="hub" />
      <text x="150" y="265" class="label hub-t">Event log</text>
      <text x="150" y="282" class="label hint">one write</text>
      <line x1="150" y1="298" x2="150" y2="318" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" />
      <line x1="105" y1="294" x2="70" y2="318" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" />
      <line x1="195" y1="294" x2="230" y2="318" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" />
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 150 296 L 150 320" /><circle r="4" fill="var(--amber)" /></g>
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 105 292 L 70 318" begin="0.35s" /><circle r="4" fill="var(--amber)" /></g>
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 195 292 L 230 318" begin="0.7s" /><circle r="4" fill="var(--amber)" /></g>
      <rect x="40" y="322" width="60" height="32" rx="6" class="node" /><text x="70" y="342" class="label t">C1</text>
      <rect x="120" y="322" width="60" height="32" rx="6" class="node" /><text x="150" y="342" class="label t">C2</text>
      <rect x="200" y="322" width="60" height="32" rx="6" class="node" /><text x="230" y="342" class="label t">C3</text>
      <text x="150" y="368" class="label hint">many reads</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 380px; }
.node { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.hub { fill: var(--white); stroke: var(--amber); stroke-width: 2; }
.label { font-family: 'Plus Jakarta Sans', system-ui; text-anchor: middle; }
.cap { font-size: 13px; font-weight: 700; fill: var(--white); letter-spacing: 0.02em; }
.t { font-size: 14px; font-weight: 600; fill: var(--navy); }
.hub-t { font-size: 15px; font-weight: 700; fill: var(--amber); }
.hint { font-size: 10px; fill: var(--gray-light); }
</style>

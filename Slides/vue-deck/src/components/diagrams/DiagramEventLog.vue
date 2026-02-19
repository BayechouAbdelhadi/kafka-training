<template>
  <DiagramStage :show-controls="false">
    <svg class="diagram-svg" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-event" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--amber)" />
        </marker>
      </defs>

      <!-- Left: Producers (symmetric positions) -->
      <rect x="24" y="50" width="96" height="32" rx="8" class="node" />
      <text x="72" y="70" class="label t">App</text>
      <rect x="24" y="94" width="96" height="32" rx="8" class="node" />
      <text x="72" y="114" class="label t">Service</text>
      <rect x="24" y="138" width="96" height="32" rx="8" class="node" />
      <text x="72" y="158" class="label t">Device</text>

      <!-- Arrows: producers → log (converge to hub left center) -->
      <path d="M 120 66 L 168 110" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" />
      <path d="M 120 110 L 168 110" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" />
      <path d="M 120 154 L 168 110" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" />
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 117 66 L 168 110" /><circle r="5" class="dot" /></g>
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 117 110 L 168 110" begin="0.6s" /><circle r="5" class="dot" /></g>
      <g><animateMotion dur="2s" repeatCount="indefinite" path="M 117 154 L 168 110" begin="1.2s" /><circle r="5" class="dot" /></g>

      <!-- Central event log (centered) -->
      <rect x="170" y="60" width="80" height="100" rx="10" class="hub" />
      <text x="210" y="95" class="label hub-t">Event Log</text>
      <line x1="186" y1="112" x2="234" y2="112" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <line x1="186" y1="128" x2="234" y2="128" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />
      <line x1="186" y1="144" x2="227" y2="144" stroke="var(--gray-light)" opacity="0.6" stroke-width="1" />

      <!-- Arrows: log → consumers (diverge from hub right center) -->
      <path d="M 252 110 L 300 66" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#arrow-event)" />
      <path d="M 252 110 L 300 110" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#arrow-event)" />
      <path d="M 252 110 L 300 154" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#arrow-event)" />
      <g><animateMotion dur="1.8s" repeatCount="indefinite" path="M 249 110 L 303 66" begin="0.3s" /><circle r="4" class="dot" /></g>
      <g><animateMotion dur="1.8s" repeatCount="indefinite" path="M 249 110 L 303 110" begin="1s" /><circle r="4" class="dot" /></g>
      <g><animateMotion dur="1.8s" repeatCount="indefinite" path="M 249 110 L 303 154" begin="1.6s" /><circle r="4" class="dot" /></g>

      <!-- Right: Consumers (mirror of left, wider for "Notifications") -->
      <rect x="300" y="50" width="96" height="32" rx="8" class="node" />
      <text x="348" y="70" class="label t">Analytics</text>
      <rect x="300" y="94" width="96" height="32" rx="8" class="node" />
      <text x="348" y="114" class="label t">Notifications</text>
      <rect x="300" y="138" width="96" height="32" rx="8" class="node" />
      <text x="348" y="158" class="label t">Storage</text>
    </svg>
  </DiagramStage>
</template>

<script setup>
import DiagramStage from '../DiagramStage.vue'
</script>

<style scoped>
.diagram-svg { width: 100%; height: auto; max-height: 280px; }
.node { fill: var(--white); stroke: var(--gray-light); stroke-width: 1.5; }
.hub { fill: var(--white); stroke: var(--amber); stroke-width: 2; }
.label { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; text-anchor: middle; }
.label.t { font-size: 12px; font-weight: 600; fill: var(--navy); }
.label.hub-t { font-size: 14px; font-weight: 700; fill: var(--amber); }
.dot { fill: var(--amber); }
</style>

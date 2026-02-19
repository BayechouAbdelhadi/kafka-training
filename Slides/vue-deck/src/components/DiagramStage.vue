<template>
  <div class="diagram-stage" :class="{ 'diagram-paused': paused }">
    <div class="diagram-stage-inner">
      <slot />
    </div>
    <button
      v-if="showControls"
      type="button"
      class="diagram-control"
      :aria-label="paused ? 'Play animation' : 'Pause animation'"
      @click="paused = !paused"
    >
      {{ paused ? '▶' : '⏸' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  showControls: { type: Boolean, default: true },
})

const paused = ref(false)
</script>

<style scoped>
.diagram-stage {
  position: relative;
  width: 100%;
  min-height: 320px;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--navy-mid);
  box-shadow: var(--shadow);
}

.diagram-stage-inner {
  padding: 1rem;
  width: 100%;
  height: 100%;
}

.diagram-paused .diagram-stage-inner :deep([class*="animate-"]) {
  animation-play-state: paused !important;
}

.diagram-control {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--navy-light);
  background: var(--navy);
  color: var(--gray);
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background 0.2s;
}

.diagram-control:hover {
  background: var(--navy-light);
  color: var(--white);
}
</style>

<template>
  <button
    type="button"
    class="nav-btn nav-prev"
    aria-label="Previous slide"
    :disabled="current === 0"
    @click="$emit('prev')"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  </button>
  <button
    type="button"
    class="nav-btn nav-next"
    aria-label="Next slide"
    :disabled="current === total - 1"
    @click="$emit('next')"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  </button>
  <div class="key-hint">← → or Space to navigate</div>
  <div class="counter"><strong>{{ current + 1 }}</strong> / <span>{{ total }}</span></div>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
})

defineEmits(['prev', 'next'])
</script>

<style scoped>
.nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--navy-mid);
  border: 1px solid var(--navy-light);
  color: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.nav-btn:hover {
  background: var(--red);
  border-color: var(--red);
  color: var(--white);
}

.nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
}

.nav-prev {
  left: 1.5rem;
}

.nav-next {
  right: 1.5rem;
}

.nav-btn svg {
  width: 24px;
  height: 24px;
}

.counter {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  font-size: 0.9rem;
  color: var(--gray);
  z-index: 50;
}

.counter strong {
  color: var(--white);
}

.key-hint {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  font-size: 0.8rem;
  color: var(--navy-light);
  z-index: 50;
}
</style>

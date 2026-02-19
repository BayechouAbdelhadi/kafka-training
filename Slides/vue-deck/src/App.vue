<template>
  <div>
    <ProgressBar :progress-percent="progressPercent" />
    <Navigation
      :current="current"
      :total="total"
      @prev="prev"
      @next="next"
    />
    <div class="deck" @click="onDeckClick">
      <component
        v-for="(Comp, i) in slides"
        :key="i"
        :is="Comp"
        :class="slideClass(i)"
      />
    </div>
    <Transition name="fade">
      <div v-if="shownSlideName" class="slide-name-overlay">
        {{ shownSlideName }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProgressBar from './components/ProgressBar.vue'
import Navigation from './components/Navigation.vue'
import { slides, slideNames } from './slides'

const current = ref(0)
const total = computed(() => slides.length)

let clickCount = 0
let clickResetTimer = null
const shownSlideName = ref('')

function onDeckClick() {
  clickCount += 1
  if (clickResetTimer) clearTimeout(clickResetTimer)
  clickResetTimer = setTimeout(() => { clickCount = 0 }, 600)
  if (clickCount >= 5) {
    clickCount = 0
    if (clickResetTimer) clearTimeout(clickResetTimer)
    shownSlideName.value = slideNames[current.value] ?? ''
    setTimeout(() => { shownSlideName.value = '' }, 2500)
  }
}

const progressPercent = computed(() =>
  total.value ? ((current.value + 1) / total.value) * 100 : 0
)

function slideClass(i) {
  if (i === current.value) return 'active'
  if (i < current.value) return 'prev'
  return 'next'
}

function goTo(index) {
  if (index < 0 || index >= total.value) return
  current.value = index
}

function next() {
  goTo(current.value + 1)
}

function prev() {
  goTo(current.value - 1)
}

function onKeydown(e) {
  if (e.target.closest('a')) return
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault()
    next()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prev()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.slide-name-overlay {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: rgba(15, 23, 42, 0.95);
  color: var(--gray-light);
  font-family: ui-monospace, monospace;
  font-size: 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--navy-light);
  z-index: 100;
  pointer-events: none;
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

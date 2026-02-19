<template>
  <div class="progress-wrap">
    <div
      class="progress-bar"
      :style="{ width: progressPercent + '%' }"
    />
  </div>
</template>

<script setup>
defineProps({
  progressPercent: { type: Number, required: true },
})
</script>

<style scoped>
.progress-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--navy-mid);
  z-index: 100;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--red), var(--amber));
  transition: width 0.3s var(--ease);
}
</style>

<template>
  <div
    class="slide"
    :class="[
      { 'slide-with-image': $slots.image },
    ]"
    :data-type="type"
  >
    <div class="slide-inner">
      <h2 class="slide-title"><slot name="title">Title</slot></h2>
      <p v-if="$slots.subtitle" class="slide-subtitle" :class="sublineClass">
        <slot name="subtitle" />
      </p>
      <p v-if="$slots.subline" class="slide-subtitle slide-subline">
        <slot name="subline" />
      </p>
      <div v-if="$slots.body" class="slide-body-wrap">
        <div class="slide-body">
          <slot name="body" />
        </div>
      </div>
      <div v-if="$slots.image" class="slide-image">
        <slot name="image" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'content' },
  sublineClass: { type: String, default: '' },
})
</script>

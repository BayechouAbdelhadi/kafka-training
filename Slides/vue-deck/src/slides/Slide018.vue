<template>
  <SlideFrame type="part">
    <template #title>Producer & Consumer</template>
    <template #subtitle>Producer: publishing, serialization, batching, delivery guarantees · Consumer: group coordination, offset management, consumption patterns</template>
    <template #image>
      <DiagramPartDivider part="Producer & Consumer" subtitle="Producer · Consumer" />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramPartDivider from '@/components/diagrams/DiagramPartDivider.vue'
</script>

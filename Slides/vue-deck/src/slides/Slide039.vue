<template>
  <SlideFrame type="part">
    <template #title>Broker</template>
    <template #subtitle>Storage architecture, request handling, and cluster coordination</template>
    <template #image>
      <DiagramPartDivider part="Broker" subtitle="Storage · Request handling · Coordination" />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramPartDivider from '@/components/diagrams/DiagramPartDivider.vue'
</script>

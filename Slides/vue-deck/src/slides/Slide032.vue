<template>
  <SlideFrame type="content">
    <template #title>Next Step</template>
    <template #body>
      <p><strong>Start with <a href="../Kafka-Internals-Training/00-Setup.md">00-Setup</a>.</strong></p>
      <p>You'll build the mental model <strong>from the ground up</strong> in the same order the problems were solved — and then reinforce it with the CLI.</p>
    </template>
    <template #image>
      <DiagramNextStep />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramNextStep from '@/components/diagrams/DiagramNextStep.vue'
</script>

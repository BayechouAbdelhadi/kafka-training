<template>
  <SlideFrame type="content">
    <template #title>Offset</template>
    <template #body>
      <ul>
        <li>Each record in a partition has an <strong>offset</strong> — an immutable, sequential position (0, 1, 2, …) in that partition’s log.</li>
        <li>Consumers track “read up to which offset” per partition so they can resume or replay from a given position.</li>
        <li>Offsets are unique within a partition; different partitions have their own offset sequences.</li>
      </ul>
      <p>Offset = position of the record in the partition. No in-place updates — the log is append-only.</p>
    </template>
    <template #image>
      <DiagramTopicOffset />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramTopicOffset from '@/components/diagrams/DiagramTopicOffset.vue'
</script>

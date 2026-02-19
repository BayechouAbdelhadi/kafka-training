<template>
  <SlideFrame type="content">
    <template #title>Consumer: Message consumption patterns</template>
    <template #body>
      <ul>
        <li><strong>At-least-once:</strong> Process then commit. If consumer crashes after process but before commit, messages can be reprocessed (duplicates). Simple and common.</li>
        <li><strong>Exactly-once:</strong> Use transactional producer + read_committed + unique keys and idempotent processing, or Kafka Streams with exactly-once semantics. No duplicates, no gaps.</li>
        <li><strong>Consumer position:</strong> <code>earliest</code> (from beginning) vs <code>latest</code> (only new). Replay vs real-time.</li>
        <li><strong>Patterns:</strong> Single consumer per partition (scale with partitions); multiple groups for different use cases (e.g. analytics + notifications).</li>
      </ul>
      <p>Choose the pattern based on your durability and duplicate tolerance; offset management and group coordination support these patterns.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>

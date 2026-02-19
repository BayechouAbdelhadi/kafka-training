<template>
  <SlideFrame type="content">
    <template #title>Consumer groups</template>
    <template #body>
      <ul>
        <li><strong>Group coordination:</strong> <strong>Consumer groups</strong> — in a group, each partition is read by <strong>one</strong> consumer. Kafka coordinates membership and partition assignment; when members join or leave, <strong>rebalance</strong> reassigns partitions.</li>
        <li><strong>Offset management:</strong> Each consumer tracks its position (offset) per partition in <code>__consumer_offsets</code>. Commit after processing (manual or auto) so after restart it resumes from the last committed offset.</li>
        <li>Different groups can read the same topic (e.g. analytics vs notifications). One consumer per partition within a group = scalable consumption.</li>
      </ul>
      <p>Group coordination + offset management enable scalable, replayable, and crash-resilient consumption.</p>
    </template>
    <template #image>
      <DiagramConsumerGroups />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramConsumerGroups from '@/components/diagrams/DiagramConsumerGroups.vue'
</script>

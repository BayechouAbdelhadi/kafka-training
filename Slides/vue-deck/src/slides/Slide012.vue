<template>
  <SlideFrame type="content">
    <template #title>Topic: Partition = scalable log</template>
    <template #body>
      <ul>
        <li><strong>Partition = scalable log:</strong> Each partition is its own <strong>ordered log</strong> on a broker, with its own <strong>offset</strong> sequence. Split the topic to scale reads and writes in parallel.</li>
        <li><strong>Problem:</strong> One machine (and one consumer) can't keep up. <strong>Solution:</strong> More partitions → more parallelism. Order is guaranteed <strong>within each partition</strong>, not across the whole topic.</li>
        <li>To keep order for a given key, send all messages with that key to the same partition (key-based partitioning).</li>
      </ul>
      <p>Partition is the unit of scalability for the log: more partitions mean more throughput and more consumers in a group.</p>
    </template>
    <template #image>
      <DiagramPartitionsBrokers />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramPartitionsBrokers from '@/components/diagrams/DiagramPartitionsBrokers.vue'
</script>

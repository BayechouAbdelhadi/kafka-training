<template>
  <SlideFrame type="content">
    <template #title>Partitioning Strategies: Which Partition Gets the Message?</template>
    <template #body>
      <p>The producer (or Kafka) decides <strong>which partition</strong> a record goes to:</p>
      <ul>
        <li><strong>Round Robin</strong> (e.g. null key): Messages spread evenly; <strong>order is not preserved</strong> across the topic.</li>
        <li><strong>Key-based (hashing):</strong> <code>partition = hash(key) % numPartitions</code>. Same key → same partition → <strong>ordering guaranteed per key.</strong></li>
        <li><strong>Custom:</strong> Your own logic (only when you really need it).</li>
      </ul>
      <p><strong>Default:</strong> Null key → round robin. Non-null key → key-based. Use keys when you need ordering for a given entity (e.g. user id, order id). Keys give you ordering and locality for a logical stream inside a topic.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramPartitioningStrategies from '@/components/diagrams/DiagramPartitioningStrategies.vue'
</script>

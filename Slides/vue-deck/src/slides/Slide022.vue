<template>
  <SlideFrame type="content">
    <template #title>Rebalances: When the Consumer Group Changes</template>
    <template #body>
      <ul>
        <li><strong>What:</strong> Kafka <strong>reassigns partitions</strong> to consumers in a group when something changes — who's in the group, or how many partitions the topic has.</li>
        <li><strong>When it happens:</strong> A new consumer joins; a consumer leaves or crashes; the number of partitions in a subscribed topic changes.</li>
        <li><strong>Why:</strong> So every partition is still read by exactly one active consumer, and load is spread fairly.</li>
        <li><strong>What you notice:</strong> A short pause while assignments change; then consumers resume from their <strong>committed offsets</strong>, so already-committed work isn't processed twice.</li>
      </ul>
      <p>Rebalances are normal — understanding them helps you design for both availability and latency. We'll see them in action in the Consumers chapter.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>

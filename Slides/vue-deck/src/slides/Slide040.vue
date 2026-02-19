<template>
  <SlideFrame type="content">
    <template #title>Log vs Queue</template>
    <template #body>
      <ul>
        <li><strong>Queue:</strong> Messages are typically <strong>removed</strong> when consumed (or delivered to one consumer). Point-to-point; once read, the message is gone. Good for task distribution.</li>
        <li><strong>Log:</strong> Records are <strong>retained</strong>. Consumers read at their own position (offset); data stays so others can read it too, or you can replay. Good for event streaming and multiple consumers.</li>
        <li><strong>Kafka is a log</strong>, not a classic queue: it stores events durably, supports many independent consumers, and replay. You can still get queue-like behavior with a single consumer group per topic.</li>
      </ul>
      <p>Choosing a log means: one write, many reads, and the data stays — which is why Kafka is called an event streaming platform.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>

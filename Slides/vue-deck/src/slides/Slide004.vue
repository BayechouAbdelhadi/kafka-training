<template>
  <SlideFrame type="content">
    <template #title>Why Kafka (2) — From sync to a central event store</template>
    <template #subtitle>Event-driven systems need something in the middle</template>
    <template #body>
      <ul>
        <li><strong>Sync</strong> (request → wait → response): tight coupling, hard to scale.</li>
        <li><strong>Async / event-driven:</strong> producers and consumers are independent; we need something in the middle that <strong>holds and distributes</strong> events.</li>
        <li>That something must be a <strong>central, durable store</strong>: one write, many reads; data retained so multiple consumers can read and replay.</li>
      </ul>
      <p><strong>Kafka is that store</strong> — built for events, durable, scalable. Next: why a <strong>log</strong> (and not a queue) is the right model.</p>
    </template>
    <template #image>
      <DiagramSyncAsync />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramSyncAsync from '@/components/diagrams/DiagramSyncAsync.vue'
</script>

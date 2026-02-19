<template>
  <SlideFrame type="content">
    <template #title>Moving Data Between Systems: The Central Event Log</template>
    <template #body>
      <ul>
        <li><strong>Scenario:</strong> A web app produces events; logging, analytics, and other services all need the same data.</li>
        <li><strong>Problem:</strong> Connecting each producer to each consumer (point-to-point) doesn't scale — and if a consumer is down, data can be lost.</li>
        <li><strong>Solution:</strong> A <strong>central, durable event log.</strong> Producers write once; many consumers read on their own. Data is <strong>stored</strong>, not just passed through.</li>
      </ul>
      <p>That's why Kafka is called an <strong>event streaming platform</strong>, not just a message queue. One write, many reads — and the data stays so you can replay or add new consumers later.</p>
    </template>
    <template #image>
      <DiagramEventLog />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramEventLog from '@/components/diagrams/DiagramEventLog.vue'
</script>

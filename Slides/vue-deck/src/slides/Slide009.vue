<template>
  <SlideFrame type="content">
    <template #title>Organizing the data: Topics</template>
    <template #body>
      <ul>
        <li>Kafka organizes data into <strong>topics.</strong></li>
        <li>A <strong>topic</strong> is a <strong>named, ordered, append-only</strong> stream of events — like a shared notebook: producers add to the end, consumers read at their own pace.</li>
        <li><strong>Fan-out:</strong> Many consumers can read the same topic. <strong>Replay:</strong> You can read again from an earlier position.</li>
        <li>A topic is <strong>logical</strong></li>
      </ul>
      <p><strong>Important:</strong> You never update or delete individual events in a topic. That's what makes replay and multiple consumers possible.</p>
      <p><strong>Next:</strong> How Kafka implements a topic — and what happens when one log isn't enough. Append-only is the contract; replay and multiple consumers follow from it.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramTopicLog from '@/components/diagrams/DiagramTopicLog.vue'
</script>

<template>
  <SlideFrame type="content">
    <template #title>What Is an Event?</template>
    <template #body>
      <ul>
        <li>An <strong>event</strong> is something that <strong>happened</strong> in the system (e.g. "OrderCreated", "UserSignedUp").</li>
        <li>Events are <strong>immutable:</strong> once they occur, they cannot be changed or undone.</li>
        <li>We don't "update" or "delete" events; we <strong>compensate with new events</strong> (e.g. "OrderCancelled").</li>
      </ul>
      <p><strong>Why this matters for Kafka:</strong> A system that stores events should <strong>append only</strong> — no in-place updates. That leads to the concept of a <strong>log</strong>. Immutability and append-only are at the heart of Kafka's design.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>

<template>
  <SlideFrame type="content">
    <template #title>Messages Are Just Bytes</template>
    <template #body>
      <ul>
        <li>Kafka brokers store <strong>everything as bytes.</strong> They don't interpret keys or values, and they don't enforce data types or schemas (by design — keeps brokers simple and format-agnostic).</li>
        <li><strong>What that means for you:</strong> Producers and consumers must <strong>agree</strong> on how to turn application data into bytes and back. If they don't, the consumer can't read the data correctly.</li>
      </ul>
      <p><strong>Next:</strong> Serialization (producer) and deserialization (consumer) — and how to keep formats in sync over time with <strong>schemas.</strong> Brokers are simple pipes; the intelligence is in the clients and in schema management.</p>
    </template>
    <template #image>
      <DiagramBytes />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramBytes from '@/components/diagrams/DiagramBytes.vue'
</script>

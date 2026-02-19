<template>
  <SlideFrame type="content">
    <template #title>The Concept of a Log</template>
    <template #body>
      <ul>
        <li>A <strong>log</strong> is an <strong>ordered, immutable</strong> sequence of records.</li>
        <li>New data is <strong>appended</strong> at the end; existing records are never changed or removed.</li>
        <li>Logs give <strong>durability</strong> (data is persisted) and <strong>replayability</strong> (you can read again from any position).</li>
      </ul>
      <p><strong>Familiar idea:</strong> Write-ahead logs in databases — same principle: order matters, no in-place updates.</p>
      <p><strong>Next:</strong> The first big problem — how to move data between many systems without point-to-point chaos. Kafka is, at its core, a distributed log (or many logs, one per partition).</p>
    </template>
    <template #image>
      <DiagramEventConcept />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramEventConcept from '@/components/diagrams/DiagramEventConcept.vue'
</script>

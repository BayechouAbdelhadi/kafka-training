<template>
  <SlideFrame type="content">
    <template #title>Topic: Retention = log cleanup</template>
    <template #body>
      <ul>
        <li><strong>Retention</strong> controls how long Kafka keeps data in a partition. Only <strong>closed</strong> segments are eligible for <strong>log cleanup</strong>; the active segment is never deleted nor compacted.</li>
        <li><strong>Time-based:</strong> <code>retention.ms</code> — delete closed segments older than X ms.</li>
        <li><strong>Size-based:</strong> <code>retention.bytes</code> — limit total log size per partition.</li>
        <li><strong>Cleanup policies:</strong> <code>delete</code> (default) removes old segments; <code>compact</code> keeps the latest value per key (for log compacted topics).</li>
      </ul>
      <p>Retention and cleanup keep the log bounded so storage doesn't grow forever while still allowing replay within the retention window.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramRetention from '@/components/diagrams/DiagramRetention.vue'
</script>

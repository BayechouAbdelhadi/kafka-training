<template>
  <SlideFrame type="content">
    <template #title>Kafka Architecture: Topics, Producers, Consumers</template>
    <template #body>
      <ul>
        <li>A <strong>topic</strong> is the category/feed name; internally it is <strong>implemented as a log</strong> (we'll split it into partitions next).</li>
        <li><strong>Producers</strong> publish records to topics.</li>
        <li><strong>Consumers</strong> subscribe to topics and process records.</li>
        <li>The machines that hold the data are <strong>brokers</strong>; together they form a <strong>cluster.</strong></li>
      </ul>
      <p><strong>So far:</strong> One topic = one ordered log. When volume grows, a single log becomes a bottleneck. <strong>Next:</strong> Scale by splitting the log into <strong>partitions.</strong> Brokers are the physical layer; topics and partitions are the logical model.</p>
    </template>
    <template #image>
      <DiagramArchitecture />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramArchitecture from '@/components/diagrams/DiagramArchitecture.vue'
</script>

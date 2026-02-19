<template>
  <SlideFrame type="content">
    <template #title>How This Training Follows the Story</template>
    <template #body>
      <ol style="list-style: decimal; padding-left: 1.5rem; margin: 1rem 0;">
        <li style="margin-bottom: 0.5rem;"><strong>Setup</strong> — Run a cluster (e.g. Docker).</li>
        <li style="margin-bottom: 0.5rem;"><strong>Topics & partitions</strong> — Create topics, see logs, leaders, ISR.</li>
        <li style="margin-bottom: 0.5rem;"><strong>Producers</strong> — Durability, acks, batching in practice.</li>
        <li style="margin-bottom: 0.5rem;"><strong>Consumers & groups</strong> — Offsets, scaling, rebalances.</li>
        <li style="margin-bottom: 0.5rem;"><strong>Failures</strong> — Broker crashes, leader election, edge cases.</li>
      </ol>
      <p><strong>One rule:</strong> CLI and concepts first — you'll see Kafka's behavior directly before using it from application code. Same progression as this deck: problem → decision → concept, then hands-on.</p>
    </template>
    <template #image>
      <DiagramTrainingPath />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramTrainingPath from '@/components/diagrams/DiagramTrainingPath.vue'
</script>

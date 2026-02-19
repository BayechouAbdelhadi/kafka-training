<template>
  <SlideFrame type="content">
    <template #title>Cluster Metadata: How Everyone Stays in Sync</template>
    <template #body>
      <p><strong>What is metadata?</strong> The cluster needs a consistent view of things like: which brokers are alive, which topics and partitions exist, and who is the leader for each partition. Producers and consumers use this to route requests to the right broker.</p>
      <ul>
        <li><strong>Before Kafka 3.3:</strong> This metadata was stored in <strong>ZooKeeper</strong> — a separate, independent project (not part of Kafka). Kafka depended on an external ZooKeeper cluster.</li>
        <li><strong>From Kafka 3.3 onward:</strong> Metadata is managed by <strong>Kafka itself</strong> (KRaft mode): some brokers manage metadata and form the <strong>control plane</strong>. A broker can serve both metadata and data (produce/consume) at the same time. No ZooKeeper needed.</li>
      </ul>
      <p>Keeping metadata consistent is what allows correct routing and smooth leader election when brokers or leaders fail.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>

<template>
  <SlideFrame type="content">
    <template #title>Broker: Cluster coordination</template>
    <template #body>
      <ul>
        <li><strong>Cluster coordination</strong> keeps metadata consistent: which brokers are alive, which topics and partitions exist, who is the leader for each partition.</li>
        <li><strong>KRaft</strong> (Kafka Raft): metadata is stored in a Raft log inside Kafka. <strong>Controller</strong> nodes manage metadata; no ZooKeeper.</li>
        <li>Producers and consumers use this metadata to <strong>route requests</strong> to the correct broker (partition leader). When leadership changes, clients refresh metadata and retry.</li>
      </ul>
      <p>Cluster coordination ensures everyone has a consistent view so produce and fetch go to the right broker.</p>
    </template>
    <template #image>
      <DiagramKraftMetadata />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramKraftMetadata from '@/components/diagrams/DiagramKraftMetadata.vue'
</script>

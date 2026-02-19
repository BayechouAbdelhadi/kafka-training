<template>
  <SlideFrame type="content">
    <template #title>Topic: Replication = fault tolerance</template>
    <template #body>
      <ul>
        <li><strong>Replication = fault tolerance:</strong> Each partition is <strong>replicated</strong> across brokers. One broker is the <strong>leader</strong> (handles reads and writes); others hold <strong>replicas.</strong></li>
        <li><strong>ISR</strong> (In-Sync Replicas): replicas that are fully in sync; one of them can become leader on failure with no data loss.</li>
        <li><strong>When the leader fails:</strong> An in-sync replica is promoted; clients refresh metadata and retry — minimal disruption.</li>
      </ul>
      <p>Replication is how the topic (log) stays durable and available when brokers fail.</p>
      <p><strong>Next:</strong> How do clients find out who the leader is and where each partition lives? <strong>Metadata.</strong></p>
      <p class="muted">ISR = the set of replicas that are safe to promote to leader, with no data loss.</p>
    </template>
    <template #image>
      <DiagramReplicationIsr />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramReplicationIsr from '@/components/diagrams/DiagramReplicationIsr.vue'
</script>

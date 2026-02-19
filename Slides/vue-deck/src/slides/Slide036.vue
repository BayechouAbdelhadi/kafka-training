<template>
  <SlideFrame type="content">
    <template #title>Broker: Request handling</template>
    <template #body>
      <ul>
        <li>Brokers handle <strong>produce requests</strong> (writes to leader partition) and <strong>fetch requests</strong> (reads from partition).</li>
        <li><strong>Leader</strong> for a partition serves reads and writes; <strong>replicas</strong> replicate from the leader. Clients send produce/fetch to the partition leader.</li>
        <li>Request handling is <strong>multi-threaded</strong>: network threads accept connections; I/O threads process requests; request queue and response queue decouple them.</li>
        <li><strong>Batching:</strong> Brokers can batch disk writes and network responses for throughput. Fetch requests can specify min bytes and max wait to reduce round-trips.</li>
      </ul>
      <p>Understanding request handling helps with tuning <code>num.network.threads</code>, <code>num.io.threads</code>, and client fetch/produce configs.</p>
    </template>
    <template #image>
      <DiagramRequestHandling />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramRequestHandling from '@/components/diagrams/DiagramRequestHandling.vue'
</script>

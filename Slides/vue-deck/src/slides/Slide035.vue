<template>
  <SlideFrame type="content">
    <template #title>Broker: Storage architecture</template>
    <template #body>
      <ul>
        <li>Each broker stores partition data on disk as <strong>segment files</strong> (log segments + index).</li>
        <li><strong>Log dirs</strong> (<code>log.dirs</code>): one or more directories where the broker writes partition data.</li>
        <li>Each partition is a directory: <strong>topic-partition</strong> with segment files (e.g. <code>00000000000000000000.log</code>) and index files for fast lookups.</li>
        <li>Segments are <strong>append-only</strong>; when a segment is full or time-based roll happens, a new segment is created. Old segments can be deleted by retention/cleanup.</li>
      </ul>
      <p>Understanding storage helps with capacity planning, disk I/O, and tuning retention and segment size.</p>
    </template>
    <template #image>
      <DiagramBrokerStorage />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramBrokerStorage from '@/components/diagrams/DiagramBrokerStorage.vue'
</script>

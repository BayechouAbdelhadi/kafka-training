<template>
  <SlideFrame type="content">
    <template #title>Topic: Segment = how the partition is stored</template>
    <template #body>
      <ul>
        <li>A partition’s log is stored as a sequence of <strong>segment files</strong> on disk (e.g. <code>00000000.log</code>, <code>00000100.log</code>).</li>
        <li>Only one segment is <strong>active</strong> (accepting new writes); older segments are immutable.</li>
        <li><strong>Roll policy:</strong> New segment when size or time limit is reached (<code>log.segment.bytes</code>, <code>log.segment.ms</code>).</li>
        <li>Each segment has a <strong>.log</strong> file (records) and <strong>.index</strong> / <strong>.timeindex</strong> for fast lookup by offset or timestamp.</li>
      </ul>
      <p>Segments allow bounded file sizes, efficient retention/cleanup, and fast reads via indexes.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramBrokerStorage from '@/components/diagrams/DiagramBrokerStorage.vue'
</script>

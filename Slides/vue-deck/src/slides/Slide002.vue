<template>
  <SlideFrame type="content">
    <template #title>Why Kafka (1) — The problem</template>
    <template #subtitle>Data is everywhere; the hard part is moving and storing it</template>
    <template #body>
      <ul>
        <li>Systems produce data everywhere: web apps (clicks, orders), services (logs, metrics), devices (sensors).</li>
        <li>The real challenge is not producing data — it's <strong>moving</strong> it, <strong>storing</strong> it durably, and letting <strong>many consumers</strong> use it without tight coupling or losing messages.</li>
        <li>Point-to-point connections don't scale. We need a dedicated solution for reliable, scalable event distribution.</li>
      </ul>
      <p>That need is why Kafka exists: a system built to move and store events at scale.</p>
    </template>
    <template #image>
      <DiagramDataEverywhere />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramDataEverywhere from '@/components/diagrams/DiagramDataEverywhere.vue'
</script>

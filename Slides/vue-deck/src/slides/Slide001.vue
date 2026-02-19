<template>
  <SlideFrame type="title">
    <template #title>Introduction to Kafka</template>
    <template #subtitle>Data structure · Storage and compute · Clients</template>
    <template #subline>Why events, why a log — then how Kafka is built</template>
    <template #body>
      <ul>
        <li>Why <strong>events</strong> — why a log and how it differs from a queue</li>
        <li>Why <strong>Kafka</strong></li>
        <li><strong>Kafka architecture</strong> — Why Kafka looks the way it does</li>
        <li><strong>Data structure</strong> — log, topic, partition, segment (indexes)</li>
        <li><strong>Storage and compute</strong> — broker, cluster</li>
        <li><strong>Clients</strong> — producer, consumer</li>
      </ul>
    </template>
    <template #image>
      <div class="hero-image-wrap">
        <img src="/kafka.png" alt="Kafka" class="slide-hero-image" />
      </div>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>

<style scoped>
.hero-image-wrap {
  width: fit-content;
  max-width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4);
  background: var(--navy-mid);
}

.slide-hero-image {
  display: block;
  width: auto;
  height: auto;
  max-height: 320px;
  max-width: 420px;
  object-fit: contain;
  vertical-align: middle;
}
</style>

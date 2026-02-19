<template>
  <SlideFrame type="content">
    <template #title>The Controller: What It Is and What It Does</template>
    <template #body>
      <p>In a Kafka cluster, one broker has a special role: the <strong>controller.</strong></p>
      <ul>
        <li><strong>What it is:</strong> The controller is a broker that is elected to manage cluster-wide state. There is <strong>exactly one active controller</strong> at any time.</li>
        <li><strong>Rules:</strong> If the controller broker fails or leaves, the remaining brokers run an election and a new controller is chosen. Only one broker holds the controller role.</li>
        <li><strong>What it does:</strong> The controller is responsible for <strong>partition leadership</strong> (assigning leaders and replicas), <strong>triggering leader election</strong> when a broker or partition leader fails, and keeping <strong>cluster metadata</strong> consistent (brokers, topics, partitions, ISR). It does not serve produce/consume traffic for your data; it coordinates the cluster so that other brokers know who leads which partition.</li>
      </ul>
      <p>Understanding the controller sets you up for the next step: how this metadata is stored and how clients use it to find leaders — <strong>metadata.</strong></p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>
